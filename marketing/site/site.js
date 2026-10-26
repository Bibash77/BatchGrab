'use strict';
const config=window.LAUNCH_CONFIG||{},ja=document.documentElement.lang==='ja';
const notice=document.getElementById('previewNotice');
notice.textContent=config.mode==='public'?(ja?'無料 · 0.4.0':'Free · 0.4.0'):(ja?'プレビュー — 一般公開前':'Preview — not publicly launched');
// Only a verified real listing can replace beta access. Never infer a store URL from an ID.
if(config.storeVerified===true && /^https:\/\/chromewebstore\.google\.com\/detail\/[a-z0-9-]+\/[a-p]{32}$/.test(config.chromeStoreUrl||'')){
 for(const a of document.querySelectorAll('.install-cta')){a.href=config.chromeStoreUrl;a.textContent=ja?'Chromeに追加（無料）':'Add to Chrome — free';a.dataset.metric='store_cta';}
 for(const e of document.querySelectorAll('.store-status'))e.textContent=ja?'Chromeウェブストアからインストールできます。':'Install through the verified Chrome Web Store listing.';
}
// Measurement hooks are local memory only. No requests, persistent IDs or browsing content.
// An owner-approved adapter is required before any analytics are sent.
const allowed=['direct','reddit_extensions','reddit_smallbusiness','github','store','search','showhn'];
const campaign=new URLSearchParams(location.search).get('utm_source');
const channel=allowed.includes(campaign)?campaign:'direct';
window.BATCH_GRAB_METRICS=[];
function metric(event){const record={event,channel,language:ja?'ja':'en'};window.BATCH_GRAB_METRICS.push(record);document.dispatchEvent(new CustomEvent('batchgrab:metric',{detail:record}));}
metric('page_view');
for(const a of document.querySelectorAll('a[data-metric]'))a.addEventListener('click',()=>metric(a.dataset.metric));
for(const a of document.querySelectorAll('a[href$=".html"]')){const u=new URL(a.href,location.href);if(channel!=='direct'&&u.origin===location.origin&&!u.pathname.startsWith('/fixture/')){u.searchParams.set('utm_source',channel);a.href=u.href;}}
