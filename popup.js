import { t, initLocale, evidenceText as tr } from './i18n.js';
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
    catch { $('status').textContent = t('invalidRegex'); return []; }
    rows = rows.filter(it => matchText([it.url,it.name,it.alt,it.cardTitle].join(' '), regex.startsWith('/') ? regex : `/${regex}/i`));
  }
  return rows.filter(it => state.view === 'all' || state.view === 'images' && it.group === 'Images' || state.view === 'documents' && it.group === 'Documents' || state.view === 'assets' && it.group === 'Images' && ['logo','icon','decorative','thumbnail'].includes(it.category) || state.view === 'review' && it.group === 'Images' && it.category === 'review' || state.view === 'recommended' && (it.group === 'Documents' || it.group === 'Images' && it.category === 'content'));
}
const selected = () => state.items.filter(it => state.selected.has(it.url));
async function persistDraft() {
  const draft = { version: 3, items: state.items.map(item => Object.fromEntries(Object.entries(item).filter(([,v]) => v !== '' && v !== null && v !== false))), selected: [...state.selected], groups: [...state.groups], source: state.source, root: $('folder').value, pattern: $('pattern').value, text: $('text').value, minw: $('minw').value, regex: $('regex').value, extended: $('extendedScan').checked, view: state.view, omitted: state.omitted };
  if (new TextEncoder().encode(JSON.stringify(draft)).length > 2000000) { draft.items = []; draft.selected = []; draft.largeScan = true; }
  await chrome.storage.local.set({ draft });
}
function saveDraft() { clearTimeout(saveTimer); saveTimer = setTimeout(() => persistDraft().catch(e => { $('status').textContent = tr(e.message); }), 200); }
function updateButton() {
  const count = state.selected.size;
  $('go').disabled = busy || !count || count > 500;
  $('go').textContent = busy ? t('saving') : `${t('download')}${count ? ` (${count})` : ''}`;
  $('selectedCount').textContent = t('selected',count);
  $('previewCount').textContent = t('pathCount',count);
  if (!$('advanced').hidden) {
    const rows = count <= 500 ? prepareJobs(selected(), rootFolder()) : [];
    $('preview').replaceChildren(...rows.map(row => { const li = document.createElement('li'); li.textContent = row.path; return li; }));
  }
  if (count > 500) $('status').textContent = t('batchLimit');
  saveDraft();
}
function label(tag, value, className) { const e = document.createElement(tag); e.textContent = value; if (className) e.className = className; return e; }
function render() {
  const visible = shown();
  state.page = Math.max(0, Math.min(state.page, Math.ceil(visible.length / PAGE_SIZE) - 1));
  const start = state.page * PAGE_SIZE, page = visible.slice(start, start + PAGE_SIZE);
  $('list').replaceChildren(...page.map(it => {
    const li = document.createElement('li'); li.className = 'card'; li.dataset.url = it.url;
    const pick = document.createElement('input'); pick.type = 'checkbox'; pick.className = 'pick'; pick.checked = state.selected.has(it.url); pick.setAttribute('aria-label', t('selectFile',it.name));
    pick.addEventListener('change', () => { pick.checked ? state.selected.add(it.url) : state.selected.delete(it.url); updateButton(); });
    const preview = document.createElement('div'); preview.className = 'preview';
    if (it.group === 'Images') {
      const image = document.createElement('img'); image.src = it.previewUrl || it.url; image.alt = it.alt || it.name; image.loading = 'lazy'; image.decoding = 'async'; image.referrerPolicy = 'no-referrer';
      image.addEventListener('error', () => { image.remove(); preview.prepend(label('span', t('noPreview'), 'file-icon')); }, { once: true }); preview.append(image);
    } else preview.append(label('span', it.ext?.toUpperCase() || 'FILE', 'file-icon'));
    preview.append(label('span', tr(it.category || it.group), 'badge'));
    const meta = document.createElement('div'); meta.className = 'meta';
    const filename = label('div', it.name, 'filename'); filename.title = it.name;
    const contentLabel = label('div', it.suggestion ? it.suggestion.uncertain ? t('possible',it.suggestion.text) : it.suggestion.text : (it.group === 'Documents' ? it.nearby || it.text : it.text || it.nearby) || '', 'content-label');
    contentLabel.title = contentLabel.textContent;
    const dimensions = label('div', it.group === 'Images' ? it.w && it.h ? `${it.w} × ${it.h} px` : t('unknownSize') : tr(it.basis), 'dimensions');
    const host = label('div', it.host, 'host'); host.title = it.url;
    const details = document.createElement('details'); details.append(label('summary', t('details')));
    details.append(label('p', tr(it.reason) || t('verifyDocument'), 'reason'));
    const source = document.createElement('a'); source.textContent = t('openSource'); source.href = it.url; source.target = '_blank'; source.rel = 'noopener noreferrer'; source.title = it.url; details.append(source); details.append(label('p', t('foundVia',(it.discoveryMethods || [it.kind]).map(tr).join(', ')) + (it.variantOf ? ' · '+t('alternative',it.variantOf) : ''), 'hint'));
    for (const [field, title] of [['name','Filename'],['folder','Subfolder']]) {
      const wrapper = label('label', t(field === 'name' ? 'filename' : 'subfolder'), field === 'folder' ? 'folder-edit' : '');
      const input = document.createElement('input'); input.type = 'text'; input.value = it[field]; input.dataset.field = field; input.setAttribute('aria-label', t('fieldFor',t(field === 'name' ? 'filename' : 'subfolder'),it.base));
      input.addEventListener('input', () => { it[field] = input.value; if (field === 'name') { filename.textContent = input.value; filename.title = input.value; } updateButton(); });
      wrapper.append(input); details.append(wrapper);
    }
    if (it.suggestion) {
      const review = label('button', t('reviewName'), 'review'); review.addEventListener('click', () => { details.open = true; });
      const note = label('div', `${tr(it.suggestion.kind)}${it.suggestion.uncertain ? ' · '+t('uncertain') : ''}: ${it.suggestion.text}`, 'suggestion');
      note.append(label('div', t('proposed',it.suggestion.name)));
      const use = label('button', t('useName')); use.dataset.acceptName = 'true'; use.addEventListener('click', () => { it.name = it.suggestion.name; it.basis = `${it.suggestion.kind} (accepted)`; details.querySelector('[data-field=name]').value = it.name; filename.textContent = it.name; updateButton(); });
      note.append(use); details.append(note); meta.append(contentLabel, filename, dimensions, host, review, details);
    } else meta.append(contentLabel, filename, dimensions, host, details);
    li.append(pick, preview, meta); return li;
  }));
  $('empty').hidden = !!visible.length; $('resetFilters').hidden=!!visible.length || !state.items.length;
  $('empty').textContent = state.items.length ? t('emptyView') : t('emptyPage');
  $('count').textContent = t('count',visible.length.toLocaleString(),state.items.length.toLocaleString()) + (state.omitted ? ' · '+t('limited') : '');
  $('pageInfo').textContent = visible.length ? t('range',start+1,start+page.length,visible.length.toLocaleString()) : t('zeroResults');
  $('prev').disabled = state.page === 0; $('next').disabled = start + PAGE_SIZE >= visible.length;
  for (const button of $('views').querySelectorAll('button')) button.setAttribute('aria-pressed', String(button.dataset.view === state.view));
  updateButton();
}
function filtersChanged() { state.page = 0; const available = new Set(shown().map(it => it.url)); state.selected = new Set([...state.selected].filter(url => available.has(url))); render(); }
function renderJobs() {
  const n = statuses => state.jobs.filter(j => statuses.includes(j.status)).length;
  const failed = state.jobs.filter(j => j.status === 'interrupted' && !j.retried).length;
  const retried = state.jobs.filter(j => j.status === 'interrupted' && j.retried).length;
  $('queueSummary').textContent = t('queueSummary',n(['complete']),n(['queued','starting','in_progress']),failed)+(retried ? ' · '+t('retriedCount',retried) : '');
  const rows = state.jobs.filter(j => !state.failedOnly || j.status === 'interrupted').slice().reverse();
  $('jobs').replaceChildren(...rows.slice(0,100).map(job => {
    const li = document.createElement('li'); li.dataset.jobId = job.id; li.dataset.status = job.status;
    li.append(label('div', `${t(job.status === 'complete' ? 'complete' : job.status === 'interrupted' ? job.retried ? 'retried' : 'interrupted' : job.status === 'in_progress' ? 'inProgress' : job.status)} · ${job.actualFilename || job.path}`));
    if (job.error) li.append(label('span', tr(job.error), 'error'));
    if (job.status === 'interrupted' && !job.retried) { const retry = label('button',t('retry')); retry.addEventListener('click', async () => { const r = await chrome.runtime.sendMessage({ type:'retry', id:job.id }); if (!r.ok) $('status').textContent = tr(r.error); }); li.append(retry); }
    return li;
  }));
  $('historyNote').textContent = rows.length ? t('historyNote',Math.min(100,rows.length),rows.length) : t('historyEmpty');
}
async function scan() {
  $('scan').disabled = true; $('count').textContent = t('scanCurrent');
  try {
    const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
    if (!tab || !/^https?:/.test(tab.url || '')) throw Error(t('unsupported'));
    const [result] = await chrome.scripting.executeScript({ target:{ tabId:tab.id }, func:scanPage, args:[{extended:$('extendedScan').checked}] });
    const scan = Array.isArray(result.result) ? { items:result.result, omitted:0 } : result.result;
    state.items = (scan?.items || []).map(enrichItem).filter(Boolean); state.omitted = scan?.omitted || 0;
    state.source = tab.url; state.selected.clear(); state.page = 0; $('source').textContent = state.source;
    $('status').textContent = state.omitted || scan?.traversalLimited || scan?.extendedLimited ? t('scanLimited') : t('scanHelp');
    render();
  } catch (e) { state.items=[];state.selected.clear();state.source='';render();$('empty').textContent=t('unsupported');$('empty').hidden=false;$('status').textContent=e.message===t('unsupported') ? e.message : t('scanDenied'); $('count').textContent = t('scanUnavailable'); }
  finally { $('scan').disabled = false; }
}
async function init() {
  const { draft, jobs = [], introDismissed } = await chrome.storage.local.get(['draft','jobs','introDismissed']); state.jobs = jobs; $('onboarding').hidden=!!introDismissed;
  const [tab] = await chrome.tabs.query({ active:true, currentWindow:true });
  if (draft?.version === 3 && draft.source === tab?.url && draft.items?.length) {
    Object.assign(state, { items:draft.items.map(it=>({folder:'',...it})), selected:new Set(draft.selected), groups:new Set(draft.groups), source:draft.source, view:draft.view, omitted:draft.omitted || 0 });
    for (const [id,key] of [['folder','root'],['pattern','pattern'],['text','text'],['minw','minw'],['regex','regex']]) $(id).value = draft[key] || (id === 'minw' ? '0' : '');
    $('source').textContent = state.source; $('extendedScan').checked = !!draft.extended;
  }
  for (const group of [...Object.keys(GROUPS),'Other','Pages']) { const wrapper = label('label',''); const cb = document.createElement('input'); cb.type='checkbox'; cb.checked=state.groups.has(group); cb.addEventListener('change',()=>{cb.checked?state.groups.add(group):state.groups.delete(group);filtersChanged();}); wrapper.append(cb,tr(group));$('groups').append(wrapper); }
  if (state.items.length) render(); else await scan();
  renderJobs(); const result=await chrome.runtime.sendMessage({type:'getJobs'});if(result.ok){state.jobs=result.jobs;renderJobs();}
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
$('go').addEventListener('click',async()=>{busy=true;updateButton();try{clearTimeout(saveTimer);await persistDraft();const r=await chrome.runtime.sendMessage({type:'enqueue',root:rootFolder(),items:selected().map(it=>({...it,source:it.sourcePage || state.source}))});if(!r.ok)throw Error(r.error);$('status').textContent=t('jobsAccepted',r.accepted);$('outcomes').open=true;}catch(e){$('status').textContent=tr(e.message);}finally{busy=false;updateButton();}});
$('failedOnly').addEventListener('click',()=>{state.failedOnly=!state.failedOnly;$('failedOnly').textContent=state.failedOnly?t('allOutcomes'):t('failures');renderJobs();});
$('clearFinished').addEventListener('click',()=>chrome.runtime.sendMessage({type:'clearFinished'}));$('downloads').addEventListener('click',()=>chrome.tabs.create({url:'chrome://downloads/'}));
chrome.storage.onChanged.addListener((changes,area)=>{if(area==='local'&&changes.jobs){const oldFailures=state.jobs.filter(j=>j.status==='interrupted').length;state.jobs=changes.jobs.newValue||[];renderJobs();if(state.jobs.filter(j=>j.status==='interrupted').length>oldFailures)$('outcomes').open=true;}});
(async()=>{await initLocale();await init();})().catch(e=>{$('status').textContent=tr(e.message);});

$('extendedScan').addEventListener('change',saveDraft);
$('exportIndex').addEventListener('click',async()=>{ if (!state.jobs.length) { $('status').textContent=t('noHistory'); return; } const url=URL.createObjectURL(new Blob([sourceIndex(state.jobs)],{type:'text/csv;charset=utf-8'})); try { await chrome.downloads.download({url,filename:'Batch Grab/source-index.csv',conflictAction:'uniquify'}); $('status').textContent=t('exported'); } catch(e) { $('status').textContent=tr(e.message); } finally { setTimeout(()=>URL.revokeObjectURL(url),60000); } });

$('language').addEventListener('change',async()=>{clearTimeout(saveTimer);await persistDraft();await chrome.storage.local.set({uiLanguage:$('language').value});location.reload();});
$('dismissIntro').addEventListener('click',async()=>{$('onboarding').hidden=true;await chrome.storage.local.set({introDismissed:true});});
$('forgetScan').addEventListener('click',async()=>{clearTimeout(saveTimer);state.items=[];state.selected.clear();state.source='';$('source').textContent=t('currentPage');render();clearTimeout(saveTimer);await chrome.storage.local.remove('draft');$('status').textContent=t('clearedScan');});

$('resetFilters').addEventListener('click',()=>{$('text').value='';$('regex').value='';$('minw').value='0';state.groups=new Set([...Object.keys(GROUPS),'Other','Pages']);for(const cb of $('groups').querySelectorAll('input'))cb.checked=true;state.view='all';filtersChanged();});
