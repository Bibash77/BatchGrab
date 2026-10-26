let messages = {}, evidence = {};
export async function initLocale() {
 const {uiLanguage} = await chrome.storage.local.get('uiLanguage');
 const locale = uiLanguage || (chrome.i18n.getUILanguage().startsWith('ja') ? 'ja' : 'en');
 const [en,local] = await Promise.all(['en',locale].map(async code => (await fetch(chrome.runtime.getURL(`_locales/${code}/messages.json`))).json()));
 messages = local; evidence = Object.fromEntries(Object.keys(en).filter(k=>k.startsWith('evidence')).map(k=>[en[k].message,k]));
 document.documentElement.lang = locale; document.getElementById('language').value = locale;
 for (const el of document.querySelectorAll('[data-i18n]')) el.textContent=t(el.dataset.i18n);
 for (const attr of ['placeholder','aria-label']) for (const el of document.querySelectorAll(`[data-i18n-${attr}]`)) el.setAttribute(attr,t(el.getAttribute(`data-i18n-${attr}`)));
}
export function t(key,...values) { return (messages[key]?.message || key).replace(/\$(\d+)/g,(_,n)=>String(values[Number(n)-1] ?? '')); }
export function evidenceText(value) { return evidence[value] ? t(evidence[value]) : value; }
