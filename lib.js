// Pure helpers: no Chrome APIs here, so they can be unit-tested in Node.

export const GROUPS = {
  Images: ["jpg", "jpeg", "png", "gif", "webp", "avif", "bmp", "svg", "tif", "tiff"],
  Documents: ["pdf", "doc", "docx", "xls", "xlsx", "ppt", "pptx", "txt", "csv", "epub", "mobi"],
  Archives: ["zip", "rar", "7z", "tar", "gz"],
  Media: ["mp3", "wav", "flac", "m4a", "ogg", "mp4", "webm", "mov", "mkv", "avi"],
};

export function parseUrl(u) {
  let url;
  try { url = new URL(u); } catch { return null; }
  let last = url.pathname.split("/").filter(Boolean).pop() || "";
  try { last = decodeURIComponent(last); } catch { /* keep raw */ }
  const dot = last.lastIndexOf(".");
  const hasExt = dot > 0 && last.length - dot <= 6;
  return {
    url: url.href,
    host: url.hostname.replace(/^www\./, ""),
    base: hasExt ? last.slice(0, dot) : last,
    ext: hasExt ? last.slice(dot + 1).toLowerCase() : "",
  };
}

export function groupOf(ext) {
  if (!ext) return "Pages";
  for (const [name, list] of Object.entries(GROUPS)) if (list.includes(ext)) return name;
  return "Other";
}

export function sanitize(s) {
  let clean = String(s).normalize("NFKC")
    .replace(/[\u202a-\u202e\u2066-\u2069]/g, "")
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/^\.+/, "")
    .replace(/[. ]+$/, "")
    .slice(0, 100).replace(/[. ]+$/, "");
  if (/^(con|prn|aux|nul|com[0-9]|lpt[0-9])(?:\.|$)/i.test(clean)) clean = "_" + clean;
  return clean;
}

export function safeFilename(value, ext = "") {
  let name = String(value || "").trim();
  const dot = name.lastIndexOf(".");
  if (ext && dot > 0 && Object.values(GROUPS).flat().includes(name.slice(dot + 1).toLowerCase())) name = name.slice(0, dot);
  name = sanitize(name) || "document";
  return ext ? `${name}.${ext.toLowerCase()}` : name;
}
export function safeFolder(value) {
  return String(value || "").split(/[\\/]/).map(sanitize).filter(Boolean).slice(0, 6).join("/");
}
export function suggest(item) {
  const generic = /^(?:download|view|open|read|click here|english|pdf|document|file)(?:\s+(?:pdf|document|file|now|here))?$/i;
  const clean = (s) => String(s || "").replace(/\s*[([](?:pdf|docx?|xlsx?|pptx?)[)\]]\s*$/i, "").replace(/\s+PDF$/i, "").replace(/\s+/g, " ").trim();
  const link = clean(item.text), nearby = clean(item.nearby);
  const title = link && !generic.test(link) ? link : nearby && !generic.test(nearby) ? nearby : item.base;
  return { name: safeFilename(title, item.ext), folder: sanitize(item.section || "Documents"), basis: title === link ? "Link text" : title === nearby ? "Nearby label" : "Original filename" };
}
export function prepareJobs(items, root = "Batch Grab", occupied = []) {
  const used = new Set(occupied.map((s) => s.normalize("NFKC").toLowerCase()));
  return items.map((item) => {
    const url = new URL(item.url);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) throw new Error("Only HTTP and HTTPS downloads are supported.");
    const ext = item.ext && /^[a-z0-9]{1,8}$/i.test(item.ext) ? item.ext : "";
    let name = safeFilename(item.name, ext);
    const folder = safeFolder([safeFolder(root), safeFolder(item.folder)].filter(Boolean).join("/"));
    const original = name;
    let count = 1, path = [folder, name].filter(Boolean).join("/");
    while (used.has(path.normalize("NFKC").toLowerCase())) {
      count++;
      const suffix = ext ? `.${ext}` : "";
      name = `${suffix ? original.slice(0, -suffix.length) : original} (${count})${suffix}`;
      path = [folder, name].filter(Boolean).join("/");
    }
    used.add(path.normalize("NFKC").toLowerCase());
    return { ...item, url: url.href, name, folder, path };
  });
}

export function buildName(pattern, item, n, total, now = new Date()) {
  const pad = String(n).padStart(String(total).length, "0");
  const date = now.toISOString().slice(0, 10);
  let out = String(pattern || "{name}")
    .replace(/\{n\}/g, pad)
    .replace(/\{name\}/g, item.base)
    .replace(/\{ext\}/g, item.ext)
    .replace(/\{host\}/g, item.host)
    .replace(/\{date\}/g, date);
  out = sanitize(out) || `file-${pad}`;
  if (item.ext && !out.toLowerCase().endsWith("." + item.ext)) out += "." + item.ext;
  return out;
}

export function buildFolder(pattern, item, now = new Date()) {
  const date = now.toISOString().slice(0, 10);
  return String(pattern || "")
    .replace(/\{host\}/g, item.host)
    .replace(/\{date\}/g, date)
    .split("/")
    .map(sanitize)
    .filter(Boolean)
    .join("/");
}

export function matchText(url, query, regexEnabled = true) {
  const q = (query || "").trim();
  if (!q) return true;
  const m = regexEnabled && q.match(/^\/(.+)\/([a-z]*)$/i);
  if (m) {
    try { return new RegExp(m[1], m[2] || "i").test(url); } catch { return true; }
  }
  return url.toLowerCase().includes(q.toLowerCase());
}

export function applyFilters(items, { groups, text, minWidth, regexEnabled = true }) {
  return items.filter((it) => {
    if (!groups.has(it.group)) return false;
    if (!matchText([it.url, it.text, it.nearby, it.name, it.alt, it.caption, it.cardTitle, it.metadataName?.text].filter(Boolean).join(" "), text, regexEnabled)) return false;
    if (minWidth > 0 && it.kind === "image" && it.w && it.w < minWidth) return false;
    return true;
  });
}

// Runs in the active page. No network requests, scripts evaluated, or automatic scrolling.
export function scanPage(options = {}) {
  const seen = new Map(), cardCache = new WeakMap(), headingCache = new WeakMap();
  const LIMIT = 10000;
  let omitted = 0;
  const roots = [], scanned = new Set();
  let blockedFrames = 0, inspected = 0, extendedLimited = false;
  const collect = root => {
    if (!root || scanned.has(root) || scanned.size >= 80) return;
    scanned.add(root); roots.push(root);
    for (const el of root.querySelectorAll('*')) {
      if (++inspected > 50000) break;
      if (el.shadowRoot) collect(el.shadowRoot);
      if (el.tagName === 'IFRAME') { try { if (el.contentDocument) collect(el.contentDocument); else blockedFrames++; } catch { blockedFrames++; } }
    }
  };
  collect(document);
  let baseDocument = document;
  const absolute = (raw) => { if (!raw) return ''; try { const u = new URL(raw, baseDocument.baseURI); return /^https?:$/.test(u.protocol) ? u.href : ''; } catch { return ''; } };
  const visible = (el) => el && !!el.getClientRects().length && el.ownerDocument.defaultView.getComputedStyle(el).visibility !== 'hidden';
  const text = (el) => visible(el) ? (el.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 220) : '';
  const add = (raw, kind, extra = {}) => {
    const url = absolute(raw); if (!url) return;
    const method = extra.discovery || kind;
    const previous = seen.get(url);
    if (previous) {
      previous.discoveryMethods = [...new Set([...previous.discoveryMethods, method])];
      if (kind === 'image') {
        // A network/background sighting must not replace visible DOM evidence.
        if (previous.kind !== 'image' || method === 'img' && (previous.notVisible || !extra.notVisible)) Object.assign(previous, extra, { kind });
      } else for (const [k,v] of Object.entries(extra)) if (!previous[k] && v) previous[k] = v;
      return;
    }
    if (seen.size >= LIMIT) { omitted++; return; }
    seen.set(url, { url, kind, sourcePage: baseDocument.URL, ...extra, discoveryMethods: [method] });
  };
  const sectionName = (el) => {
    const section = el.closest('section,article,fieldset');
    if (!section) return '';
    if (!headingCache.has(section)) headingCache.set(section, text(section.querySelector('h1,h2,legend')));
    return headingCache.get(section);
  };
  const cardFor = (el) => {
    const card = el.closest('figure,article,[itemtype*="Product"],[data-product],.product_pod,.product,.card,li');
    if (!card) return { title: '', caption: '', images: 0 };
    if (!cardCache.has(card)) cardCache.set(card, { title: text(card.querySelector('h1,h2,h3,h4,[itemprop="name"],.title')), caption: text(card.querySelector('figcaption')), images: card.querySelectorAll('img').length });
    return cardCache.get(card);
  };
  for (const root of roots) {
  baseDocument = root.ownerDocument || root;
  // Associate metadata only by exact resolved image URL. Never apply page-wide names indiscriminately.
  const metadata = new Map();
  let visited = 0;
  const visit = (node, depth = 0) => {
    if (!node || typeof node !== 'object' || depth > 5 || visited++ > 1500) return;
    if (Array.isArray(node)) { node.slice(0, 100).forEach(n => visit(n, depth + 1)); return; }
    const types = [].concat(node['@type'] || []);
    if (types.some(t => /^(Product|ImageObject|Photograph|CreativeWork)$/.test(t)) && typeof node.name === 'string') {
      const images = [].concat(node.image || [], types.includes('ImageObject') ? node.contentUrl || node.url || [] : []);
      for (const image of images) { const url = absolute(typeof image === 'string' ? image : image?.url || image?.contentUrl); if (url) metadata.set(url, { text: node.name.slice(0,220), kind: 'Structured metadata', uncertain: false }); }
    }
    for (const value of Object.values(node)) if (typeof value === 'object') visit(value, depth + 1);
  };
  for (const script of Array.from(root.querySelectorAll('script[type="application/ld+json"]')).slice(0, 20)) {
    if (script.textContent.length > 100000) continue;
    try { visit(JSON.parse(script.textContent)); } catch { /* invalid metadata isn't a scan failure */ }
  }
  const ogImage = absolute(root.querySelector('meta[property="og:image"]')?.content);
  const pageTitle = root.querySelector('meta[property="og:title"]')?.content || baseDocument.title || '';
  if (ogImage && pageTitle && !metadata.has(ogImage)) metadata.set(ogImage, { text: pageTitle.slice(0,220), kind: 'Page image metadata', uncertain: true });
  root.querySelectorAll('a[href]').forEach(a => {
    const row = a.closest('li,tr,dd,[data-document],.document,.document-card') || a.parentElement;
    let nearby = '';
    if (row) nearby = text(row.querySelector('[data-document-title],strong,h3,h4,th,.title')) || text(row).replace(text(a), '').replace(/\s*[·|—-]?\s*(?:PDF\s*)?\d+(?:\.\d+)?\s*(?:KB|MB)\s*$/i,'').trim();
    const image = a.querySelector('img');
    add(a.getAttribute('href'), 'link', { text: text(a), nearby, section: sectionName(a), downloadName: a.getAttribute('download') || '', mime: a.getAttribute('type') || '', ...(image ? { previewUrl: absolute(image.currentSrc || image.src), linkedOriginal: /\.(jpe?g|png|webp|avif|gif|svg)(?:[?#]|$)/i.test(a.href), alt: image.alt || '' } : {}) });
  });
  root.querySelectorAll('img').forEach(image => {
    const url = absolute(image.currentSrc || image.getAttribute('data-src') || image.getAttribute('data-original') || image.getAttribute('data-lazy-src') || image.src); if (!url) return;
    const card = cardFor(image), parentLink = image.closest('a[href]');
    add(url, 'image', { previewUrl: url, notVisible: !visible(image), w: image.naturalWidth || 0, h: image.naturalHeight || 0, alt: (image.alt || '').slice(0,220), imageTitle: (image.title || '').slice(0,220), caption: card.caption, cardTitle: card.title, cardImages: card.images, section: sectionName(image), decorative: image.getAttribute('aria-hidden') === 'true' || image.getAttribute('role') === 'presentation', inNavigation: !!image.closest('nav,header,footer,button,[role="button"],[role="navigation"]'), linkedPage: parentLink ? absolute(parentLink.href) : '', metadataName: metadata.get(url) || null, discovery: 'img' });
    const candidates = [];
    for (const attr of ['src','data-src','data-original','data-lazy-src']) if (image.getAttribute(attr)) candidates.push([image.getAttribute(attr), attr === 'src' ? 'source fallback' : 'lazy attribute']);
    const sets = [image.getAttribute('srcset'), image.getAttribute('data-srcset'), ...Array.from(image.closest('picture')?.querySelectorAll('source[srcset]') || [], e => e.getAttribute('srcset'))];
    for (const set of sets.filter(s => s && !s.includes('data:'))) for (const part of set.split(/,\s*/)) { const raw = part.trim().split(/\s+/)[0]; if (raw && !raw.startsWith('data:')) candidates.push([raw, 'responsive candidate']); }
    for (const [raw, method] of candidates) { const candidate = absolute(raw); if (!candidate || candidate === url) continue; add(candidate, 'image', { previewUrl: candidate, w: 0, h: 0, alt: image.alt || '', cardTitle: card.title, cardImages: card.images, variantOf: url, discovery: method, notVisible: true }); }
  });
  // An exact metadata association is useful for linked originals as well as <img> URLs.
  for (const item of seen.values()) if (!item.metadataName && metadata.has(item.url)) item.metadataName = metadata.get(item.url);
  root.querySelectorAll('video[src],audio[src],source[src]').forEach(m => add(m.src, 'media'));
  if (options.extended) {
    let count = 0;
    for (const el of root.querySelectorAll('*')) {
      if (++count > 20000) { extendedLimited = true; break; }
      const background = baseDocument.defaultView.getComputedStyle(el).backgroundImage;
      for (const match of background.matchAll(/url\(["']?([^"')]+)["']?\)/g)) add(match[1], 'image', { discovery: 'CSS background', previewUrl: absolute(match[1]), w: 0, h: 0, notVisible: true });
    }
    for (const entry of baseDocument.defaultView.performance.getEntriesByType('resource')) {
      if (['img','css'].includes(entry.initiatorType) && /\.(png|jpe?g|webp|avif|gif|svg)(?:[?#]|$)/i.test(entry.name)) add(entry.name, 'image', { discovery: 'Loaded resource', previewUrl: entry.name, w: 0, h: 0, notVisible: true });
    }
  }
  }
  return { items: Array.from(seen.values()), omitted, limit: LIMIT, roots: roots.length, blockedFrames, traversalLimited: inspected > 50000 || roots.length >= 80, extendedLimited };
}

export function classifyImage(item) {
  const words = [item.base, item.alt, item.imageTitle].filter(Boolean).join(' ').toLowerCase();
  const max = Math.max(item.w || 0, item.h || 0), min = Math.min(item.w || 0, item.h || 0);
  if (/\b(logo|brandmark|logotype)\b/.test(words.replace(/[_-]/g,' '))) return { category: 'logo', reason: 'Logo wording in filename or image label' };
  if (/(?:^|[\s_/-])(arrow(?:_left|_right)?|chevron|icon|favicon|sprite|sharethis|spinner)(?:[\s_.-]|$)/i.test(words) || (item.ext === 'svg' && max > 0 && max <= 96)) return { category: 'icon', reason: 'Icon wording or small SVG dimensions' };
  if (item.decorative || (max > 0 && max <= 4)) return { category: 'decorative', reason: item.decorative ? 'Page marks this image as decorative' : 'Tracking-sized image' };
  if (item.notVisible) return { category: 'review', reason: item.variantOf ? 'Alternative source resolution; dimensions and relevance need review' : item.discovery === 'CSS background' || item.discovery === 'Loaded resource' ? 'Additional image source; relevance and downloadability need review' : 'Image is in hidden page markup; review its relevance' };
  if (item.inNavigation && max > 0 && max <= 160) return { category: 'icon', reason: 'Small navigation/control image' };
  if (item.linkedOriginal) return { category: 'content', reason: 'Link points to an image file' };
  if (/\b(?:hqdefault|mqdefault|hq720)\b/i.test(words.replace(/[_-]/g,' ')) || /(?:youtube\.com\/watch|youtu\.be\/)/i.test(item.linkedPage || '')) return { category: 'thumbnail', reason: 'Thumbnail wording or linked video card' };
  if (item.metadataName || item.caption || (item.cardTitle && item.cardImages <= 2)) return { category: 'content', reason: 'Image belongs to a labelled content/product card' };
  if (/\bthumb(?:nail)?\b/i.test(words.replace(/[_-]/g,' '))) return { category: 'thumbnail', reason: 'Thumbnail wording without a specific content-card association' };
  if (max >= 300 && min >= 160 && !item.inNavigation) return { category: 'content', reason: 'Large image outside navigation' };
  if (max > 0 && max <= 240) return { category: 'thumbnail', reason: 'Small image; may still be useful' };
  return { category: 'review', reason: 'Insufficient size or context to classify confidently' };
}

export function imageSuggestion(item) {
  const descriptive = s => s && s.trim().length > 3 && !/^(image|photo|picture|img|untitled|logo|next|previous|arrow|\d+)(?:[\s_\d.-]*)$/i.test(s.trim());
  let evidence;
  if (descriptive(item.alt)) evidence = { text: item.alt, kind: 'Alt text', uncertain: false };
  else if (item.metadataName && descriptive(item.metadataName.text)) evidence = item.metadataName;
  else if (descriptive(item.caption)) evidence = { text: item.caption, kind: 'Figure caption', uncertain: item.cardImages > 1 };
  else if (descriptive(item.imageTitle)) evidence = { text: item.imageTitle, kind: 'Image title', uncertain: false };
  else if (descriptive(item.cardTitle)) evidence = { text: item.cardTitle, kind: 'Nearby card title', uncertain: true };
  if (!evidence || ['logo','icon','decorative'].includes(item.category)) return null;
  return { ...evidence, name: safeFilename(evidence.text, item.ext), reviewRequired: true };
}

export function enrichItem(raw) {
  const parsed = parseUrl(raw.url); if (!parsed || !/^https?:/.test(parsed.url)) return null;
  const hinted = parseUrl(`https://hint.invalid/${raw.downloadName || ''}`)?.ext;
  if (!Object.values(GROUPS).flat().includes(parsed.ext)) {
    if (hinted && Object.values(GROUPS).flat().includes(hinted)) parsed.ext = hinted;
    else if (raw.mime === 'application/pdf') parsed.ext = 'pdf';
    else if (raw.kind === 'image') {
      const format = new URL(raw.url).searchParams.get('format');
      if (GROUPS.Images.includes(format)) parsed.ext = format;
    }
  }
  const item = { ...raw, ...parsed, group: raw.kind === 'image' ? 'Images' : groupOf(parsed.ext) };
  if (item.group === 'Images') {
    Object.assign(item, classifyImage(item));
    item.suggestion = imageSuggestion(item);
    item.name = buildName('{name}', item, 1, 1); item.folder = ''; item.basis = 'Original filename';
  } else Object.assign(item, item.group === 'Documents' ? suggest(item) : { name: buildName('{name}', item, 1, 1), folder: '', basis: 'Original filename' });
  return item;
}

// Spreadsheet-safe local audit index. URLs may contain private tokens: export is explicit.
export function sourceIndex(jobs) {
  const fields = ['source','url','name','path','actualFilename','status','error','createdAt','finishedAt'];
  const cell = v => { let text = String(v ?? ''); if (/^(?:\s*[=+@-]|[\t\r\n])/.test(text)) text = "'" + text; return '"' + text.replace(/"/g, '""') + '"'; };
  return '\ufeff' + [fields, ...jobs.map(j => fields.map(k => j[k]))].map(row => row.map(cell).join(',')).join('\r\n');
}
