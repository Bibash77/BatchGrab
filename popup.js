import { GROUPS, buildName, buildFolder, applyFilters, matchText, scanPage, suggest, prepareJobs, enrichItem, sourceIndex } from './lib.js';
const $ = id => document.getElementById(id);
const PAGE_SIZE = 60;
const state = { items: [], selected: new Set(), groups: new Set(Object.keys(GROUPS).concat('Other','Pages')), source: '', jobs: [], view: 'recommended', page: 0, omitted: 0, failedOnly: false };
let saveTimer, searchTimer, busy = false;
const rootFolder = () => buildFolder($('folder').value, { host: state.items[0]?.host || 'page' });
function shown() {
  let rows = applyFilters(state.items, { groups: state.groups, text: $('text').value, minWidth: Number($('minw').value) || 0, regexEnabled: false });
  const regex = $('regex').value.trim();
  if (regex) {
    try { const m = regex.match(/^\/(.*)\/([a-z]*)$/); new RegExp(m ? m[1] : regex, m ? m[2] : 'i'); }
    catch { $('status').textContent = 'Invalid regex. Correct it in Options or clear that field.'; return []; }
    rows = rows.filter(it => matchText([it.url,it.name,it.alt,it.cardTitle].join(' '), regex.startsWith('/') ? regex : `/${regex}/i`));
  }
  return rows.filter(it => state.view === 'all' || state.view === 'images' && it.group === 'Images' || state.view === 'documents' && it.group === 'Documents' || state.view === 'assets' && it.group === 'Images' && ['logo','icon','decorative','thumbnail'].includes(it.category) || state.view === 'review' && it.group === 'Images' && it.category === 'review' || state.view === 'recommended' && (it.group === 'Documents' || it.group === 'Images' && it.category === 'content'));
}
const selected = () => state.items.filter(it => state.selected.has(it.url));
async function persistDraft() {
  const draft = { version: 3, items: state.items.map(item => Object.fromEntries(Object.entries(item).filter(([,v]) => v !== '' && v !== null && v !== false))), selected: [...state.selected], groups: [...state.groups], source: state.source, root: $('folder').value, pattern: $('pattern').value, text: $('text').value, minw: $('minw').value, regex: $('regex').value, extended: $('extendedScan').checked, view: state.view, omitted: state.omitted };
  if (JSON.stringify(draft).length > 4000000) { draft.items = []; draft.selected = []; draft.largeScan = true; }
  await chrome.storage.local.set({ draft });
}
function saveDraft() { clearTimeout(saveTimer); saveTimer = setTimeout(() => persistDraft().catch(e => { $('status').textContent = e.message; }), 200); }
function updateButton() {
  const count = state.selected.size;
  $('go').disabled = busy || !count || count > 500;
  $('go').textContent = busy ? 'Saving jobs…' : `Download Selected${count ? ` (${count})` : ''}`;
  $('selectedCount').textContent = `${count} selected`;
  $('previewCount').textContent = `Final paths (${count})`;
  if (!$('advanced').hidden) {
    const rows = count <= 500 ? prepareJobs(selected(), rootFolder()) : [];
    $('preview').replaceChildren(...rows.map(row => { const li = document.createElement('li'); li.textContent = row.path; return li; }));
  }
  if (count > 500) $('status').textContent = 'Select 500 files or fewer per batch. Use Select this page for smaller batches.';
  saveDraft();
}
function label(tag, value, className) { const e = document.createElement(tag); e.textContent = value; if (className) e.className = className; return e; }
function render() {
  const visible = shown();
  state.page = Math.max(0, Math.min(state.page, Math.ceil(visible.length / PAGE_SIZE) - 1));
  const start = state.page * PAGE_SIZE, page = visible.slice(start, start + PAGE_SIZE);
  $('list').replaceChildren(...page.map(it => {
    const li = document.createElement('li'); li.className = 'card'; li.dataset.url = it.url;
    const pick = document.createElement('input'); pick.type = 'checkbox'; pick.className = 'pick'; pick.checked = state.selected.has(it.url); pick.setAttribute('aria-label', `Select ${it.name}`);
    pick.addEventListener('change', () => { pick.checked ? state.selected.add(it.url) : state.selected.delete(it.url); updateButton(); });
    const preview = document.createElement('div'); preview.className = 'preview';
    if (it.group === 'Images') {
      const image = document.createElement('img'); image.src = it.previewUrl || it.url; image.alt = it.alt || it.name; image.loading = 'lazy'; image.decoding = 'async'; image.referrerPolicy = 'no-referrer';
      image.addEventListener('error', () => { image.remove(); preview.prepend(label('span', 'No preview', 'file-icon')); }, { once: true }); preview.append(image);
    } else preview.append(label('span', it.ext?.toUpperCase() || 'FILE', 'file-icon'));
    preview.append(label('span', it.category || it.group, 'badge'));
    const meta = document.createElement('div'); meta.className = 'meta';
    const filename = label('div', it.name, 'filename'); filename.title = it.name;
    const contentLabel = label('div', it.suggestion ? `${it.suggestion.uncertain ? 'Possible: ' : ''}${it.suggestion.text}` : (it.group === 'Documents' ? it.nearby || it.text : it.text || it.nearby) || '', 'content-label');
    contentLabel.title = contentLabel.textContent;
    const dimensions = label('div', it.group === 'Images' ? it.w && it.h ? `${it.w} × ${it.h} px` : 'Source dimensions unknown' : it.basis, 'dimensions');
    const host = label('div', it.host, 'host'); host.title = it.url;
    const details = document.createElement('details'); details.append(label('summary', 'Details & name'));
    details.append(label('p', it.reason || 'Document label suggestion — verify before saving', 'reason'));
    const source = document.createElement('a'); source.textContent = 'Open source'; source.href = it.url; source.target = '_blank'; source.rel = 'noreferrer'; source.title = it.url; details.append(source); details.append(label('p', `Found via: ${(it.discoveryMethods || [it.kind]).join(', ')}${it.variantOf ? ' · alternative of '+it.variantOf : ''}`, 'hint'));
    for (const [field, title] of [['name','Filename'],['folder','Subfolder']]) {
      const wrapper = label('label', title, field === 'folder' ? 'folder-edit' : '');
      const input = document.createElement('input'); input.type = 'text'; input.value = it[field]; input.dataset.field = field; input.setAttribute('aria-label', `${title} for ${it.base}`);
      input.addEventListener('input', () => { it[field] = input.value; if (field === 'name') { filename.textContent = input.value; filename.title = input.value; } updateButton(); });
      wrapper.append(input); details.append(wrapper);
    }
    if (it.suggestion) {
      const review = label('button', 'Review suggested name', 'review'); review.addEventListener('click', () => { details.open = true; });
      const note = label('div', `${it.suggestion.kind}${it.suggestion.uncertain ? ' · uncertain association' : ''}: ${it.suggestion.text}`, 'suggestion');
      note.append(label('div', `Proposed: ${it.suggestion.name}`));
      const use = label('button', 'Use this name'); use.dataset.acceptName = 'true'; use.addEventListener('click', () => { it.name = it.suggestion.name; it.basis = `${it.suggestion.kind} (accepted)`; details.querySelector('[data-field=name]').value = it.name; filename.textContent = it.name; updateButton(); });
      note.append(use); details.append(note); meta.append(contentLabel, filename, dimensions, host, review, details);
    } else meta.append(contentLabel, filename, dimensions, host, details);
    li.append(pick, preview, meta); return li;
  }));
  $('empty').hidden = !!visible.length;
  $('empty').textContent = state.items.length ? 'No files in this view. Try Images, Review, Site assets or All files; nothing was discarded.' : 'No HTTP(S) files found. Scroll the webpage to load more images, then scan again.';
  $('count').textContent = `${visible.length.toLocaleString()} in view · ${state.items.length.toLocaleString()} found${state.omitted ? ' · scan limit reached' : ''}`;
  $('pageInfo').textContent = visible.length ? `${start + 1}–${start + page.length} of ${visible.length.toLocaleString()}` : '0 results';
  $('prev').disabled = state.page === 0; $('next').disabled = start + PAGE_SIZE >= visible.length;
  for (const button of $('views').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
  updateButton();
}
function filtersChanged() { state.page = 0; const available = new Set(shown().map(it => it.url)); state.selected = new Set([...state.selected].filter(url => available.has(url))); render(); }
function renderJobs() {
  const n = statuses => state.jobs.filter(j => statuses.includes(j.status)).length;
  const failed = state.jobs.filter(j => j.status === 'interrupted' && !j.retried).length;
  const retried = state.jobs.filter(j => j.status === 'interrupted' && j.retried).length;
  $('queueSummary').textContent = `Downloads: ${n(['complete'])} completed · ${n(['queued','starting','in_progress'])} pending · ${failed} failed${retried ? ` · ${retried} retried` : ''}`;
  const rows = state.jobs.filter(j => !state.failedOnly || j.status === 'interrupted').slice().reverse();
  $('jobs').replaceChildren(...rows.slice(0,100).map(job => {
    const li = document.createElement('li'); li.dataset.jobId = job.id; li.dataset.status = job.status;
    li.append(label('div', `${job.status === 'complete' ? 'Completed' : job.status === 'interrupted' ? job.retried ? 'Failed attempt (retried separately)' : 'Failed' : job.status.replace('_',' ')} · ${job.actualFilename || job.path}`));
    if (job.error) li.append(label('span', job.error, 'error'));
    if (job.status === 'interrupted' && !job.retried) { const retry = label('button','Retry'); retry.addEventListener('click', async () => { const r = await chrome.runtime.sendMessage({ type:'retry', id:job.id }); if (!r.ok) $('status').textContent = r.error; }); li.append(retry); }
    return li;
  }));
  $('historyNote').textContent = `${Math.min(100,rows.length)} of ${rows.length} records shown. Completed means Chrome saved the response, not that its content was validated.`;
}
async function scan() {
  $('scan').disabled = true; $('count').textContent = 'Scanning current page…';
  try {
    const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
    if (!tab || !/^https?:/.test(tab.url || '')) throw Error('Open an HTTP(S) webpage and click Batch Grab. Chrome system/store pages cannot be scanned.');
    const [result] = await chrome.scripting.executeScript({ target:{ tabId:tab.id }, func:scanPage, args:[{extended:$('extendedScan').checked}] });
    const scan = Array.isArray(result.result) ? { items:result.result, omitted:0 } : result.result;
    state.items = (scan?.items || []).map(enrichItem).filter(Boolean); state.omitted = scan?.omitted || 0;
    state.source = tab.url; state.selected.clear(); state.page = 0; $('source').textContent = state.source;
    $('status').textContent = state.omitted || scan?.traversalLimited || scan?.extendedLimited ? 'A scan limit was reached. Narrow the source page; some files or page regions were not scanned.' : 'Suggested uses page context. Check Review for uncertain images; review proposed names before applying them.';
    render();
  } catch (e) { $('status').textContent = e.message; $('count').textContent = 'Scan unavailable'; }
  finally { $('scan').disabled = false; }
}
async function init() {
  const { draft, jobs = [] } = await chrome.storage.local.get(['draft','jobs']); state.jobs = jobs;
  const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
  if (draft?.version === 3 && draft.source === tab?.url && draft.items?.length) {
    Object.assign(state, { items:draft.items.map(it=>({folder:'',...it})), selected:new Set(draft.selected), groups:new Set(draft.groups), source:draft.source, view:draft.view, omitted:draft.omitted || 0 });
    for (const [id,key] of [['folder','root'],['pattern','pattern'],['text','text'],['minw','minw'],['regex','regex']]) $(id).value = draft[key] || (id === 'minw' ? '0' : '');
    $('source').textContent = state.source; $('extendedScan').checked = !!draft.extended;
  }
  for (const group of [...Object.keys(GROUPS),'Other','Pages']) { const wrapper = label('label',''); const cb = document.createElement('input'); cb.type='checkbox'; cb.checked=state.groups.has(group); cb.addEventListener('change',()=>{cb.checked?state.groups.add(group):state.groups.delete(group);filtersChanged();}); wrapper.append(cb,group);$('groups').append(wrapper); }
  if (state.items.length) render(); else await scan();
  renderJobs(); await chrome.runtime.sendMessage({type:'getJobs'});
}
$('views').addEventListener('click',e=>{const view=e.target.closest('[data-view]')?.dataset.view;if(view){state.view=view;filtersChanged();}});
$('advancedToggle').addEventListener('click',()=>{$('advanced').hidden=!$('advanced').hidden;document.body.classList.toggle('advanced-open',!$('advanced').hidden);$('advancedToggle').setAttribute('aria-expanded',String(!$('advanced').hidden));updateButton();});
$('scan').addEventListener('click',scan);
$('text').addEventListener('input',()=>{clearTimeout(searchTimer);searchTimer=setTimeout(filtersChanged,120);});
for(const id of ['regex','minw']) $(id).addEventListener('input',filtersChanged);
$('folder').addEventListener('input',updateButton);$('pattern').addEventListener('input',saveDraft);
$('all').addEventListener('click',()=>{shown().forEach(it=>state.selected.add(it.url));render();});
$('pageSelect').addEventListener('click',()=>{shown().slice(state.page*PAGE_SIZE,(state.page+1)*PAGE_SIZE).forEach(it=>state.selected.add(it.url));render();});
$('none').addEventListener('click',()=>{state.selected.clear();render();});
$('prev').addEventListener('click',()=>{state.page--;render();$('scroller').scrollTop=0;});$('next').addEventListener('click',()=>{state.page++;render();$('scroller').scrollTop=0;});
$('smart').addEventListener('click',()=>{shown().filter(it=>it.group==='Documents').forEach(it=>Object.assign(it,suggest(it)));render();});
$('template').addEventListener('click',()=>{const rows=shown();rows.forEach((it,i)=>{it.name=buildName($('pattern').value,it,i+1,rows.length);it.basis='Custom template';});render();});
$('go').addEventListener('click',async()=>{busy=true;updateButton();try{clearTimeout(saveTimer);await persistDraft();const r=await chrome.runtime.sendMessage({type:'enqueue',root:rootFolder(),items:selected().map(it=>({...it,source:it.sourcePage || state.source}))});if(!r.ok)throw Error(r.error);$('status').textContent=`${r.accepted} jobs saved. You can close the popup; keep Chrome running.`;}catch(e){$('status').textContent=e.message;}finally{busy=false;updateButton();}});
$('failedOnly').addEventListener('click',()=>{state.failedOnly=!state.failedOnly;$('failedOnly').textContent=state.failedOnly?'Show all outcomes':'Show failures';renderJobs();});
$('clearFinished').addEventListener('click',()=>chrome.runtime.sendMessage({type:'clearFinished'}));$('downloads').addEventListener('click',()=>chrome.tabs.create({url:'chrome://downloads/'}));
chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local'&&changes.jobs){const oldFailures=state.jobs.filter(j=>j.status==='interrupted').length;state.jobs=changes.jobs.newValue||[];renderJobs();if(state.jobs.filter(j=>j.status==='interrupted').length>oldFailures)$('outcomes').open=true;}});
init().catch(e=>{$('status').textContent=e.message;});

$('extendedScan').addEventListener('change',saveDraft);
$('exportIndex').addEventListener('click',async()=>{ if (!state.jobs.length) { $('status').textContent='No download history to export yet.'; return; } const url=URL.createObjectURL(new Blob([sourceIndex(state.jobs)],{type:'text/csv;charset=utf-8'})); try { await chrome.downloads.download({url,filename:'Batch Grab/source-index.csv',conflictAction:'uniquify'}); $('status').textContent='Source index requested. It includes original URLs and actual outcomes; keep it private if sources contain tokens.'; } catch(e) { $('status').textContent=e.message; } finally { setTimeout(()=>URL.revokeObjectURL(url),60000); } });
