'use strict';
const config=window.LAUNCH_CONFIG||{};
const notice=document.getElementById('previewNotice');
if(config.mode==='preview')notice.textContent='Local launch preview · Free beta evaluation · Payments are not active';
else notice.textContent='Beta 0.3.1 · Free evaluation · Payments are not active';
const email=config.contactEmail||'';
if(email){
 const a=document.createElement('a');a.href='mailto:'+email;a.textContent=email;
 const box=document.getElementById('publisherContact');box.textContent=(config.publisherName||'Batch Grab')+' · ';box.append(a);
 for(const e of document.querySelectorAll('[data-contact-placeholder]')){const link=a.cloneNode(true);e.replaceChildren(link);}
}
// Attribution is carried in the draft only: no cookies, storage, analytics or requests.
const params=new URLSearchParams(location.search);
const source=(params.get('utm_source')||'direct').replace(/[^a-z0-9_-]/gi,'').slice(0,64)||'direct';
if(source!=='direct')for(const a of document.querySelectorAll('a[href$=".html"],a[href*=".html#"]')){
 const u=new URL(a.href,location.href);if(u.origin===location.origin&&!u.pathname.includes('/fixture/')){u.searchParams.set('utm_source',source);a.href=u.href;}
}
const steps=[
 ['assets/document-picker.png','Review the proposed names.','Scan your current page and open Documents. Check names derived from link text, relevant nearby labels and section headings. You can edit them before saving.'],
 ['assets/document-picker.png','Select, then submit the jobs.','Choose the documents you need and click Download Selected. Wait for the jobs-saved confirmation before closing the popup. Selecting files alone does not start a batch.'],
 ['assets/document-outcomes.png','Inspect the real outcomes.','The beta records Chrome’s completed and interrupted downloads and actual saved paths. The controlled 30-PDF batch completed after popup closure; this is fixture evidence, not a customer result.'],
 ['assets/source-index-outcomes.png','Keep the source with the result.','Export source & outcome CSV from Download outcomes. This screenshot is the separate PDF/CSV/XLSX fixture. The local index includes original URLs, actual paths, status and failures; check sensitive links before sharing.']
];
for(const button of document.querySelectorAll('[data-demo]'))button.addEventListener('click',()=>{
 const n=Number(button.dataset.demo),step=steps[n];
 document.getElementById('demoImage').src=step[0];document.getElementById('demoImage').alt='Actual beta screenshot: '+step[1];
 document.getElementById('demoTitle').textContent=step[1];document.getElementById('demoText').textContent=step[2];document.getElementById('demoNumber').textContent='Step 0'+(n+1)+' / 04';
 for(const b of document.querySelectorAll('[data-demo]'))b.setAttribute('aria-pressed',String(b===button));
});
const form=document.getElementById('requestForm');let prepared='';
if(form){
 const status=document.getElementById('formStatus');
 form.addEventListener('input',()=>{if(prepared){prepared='';document.getElementById('requestResult').hidden=true;document.getElementById('requestOutput').textContent='';document.getElementById('emailRequest').disabled=true;status.textContent='Details changed. Prepare a fresh draft before copying or opening email.';}});
 form.addEventListener('submit',e=>{
  e.preventDefault();if(!form.reportValidity())return;
  const url=document.getElementById('publicURL').value.trim();
  if(url){try{const u=new URL(url);if(!['http:','https:'].includes(u.protocol)||u.username||u.password)throw Error();}catch{status.textContent='Use only an HTTP(S) public URL without embedded credentials, or leave the URL blank.';return;}}
  prepared=['Batch Grab beta / Document Handoff interest — draft only','Role: '+document.getElementById('role').value,'Files in next batch: '+document.getElementById('fileCount').value,'Task: '+document.getElementById('task').value.trim(),'Public source page: '+(url||'Not shared'),'Interest: '+document.getElementById('interest').value,'Channel: '+source,'I understand evaluation is free, the $5 one-time price is proposed and no payment or order has been submitted.'].join('\n\n');
  document.getElementById('requestOutput').textContent=prepared;document.getElementById('requestResult').hidden=false;
  status.textContent='Draft prepared on this device. No request, interest registration or payment has been sent.';
  document.getElementById('emailRequest').disabled=!email;
  document.getElementById('contactStatus').textContent=email?'You may open an email draft to '+email+'. Review it and send manually if you choose. No message has been sent by this page.':'Contact email is not configured in this local preview. Nothing has been sent.';
 });
 document.getElementById('copyRequest').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(prepared);status.textContent='Draft copied. Nothing has been sent.';}catch{const r=document.createRange();r.selectNodeContents(document.getElementById('requestOutput'));getSelection().removeAllRanges();getSelection().addRange(r);status.textContent='Copy permission was unavailable. Draft selected; copy it manually. Nothing has been sent.';}});
 document.getElementById('saveRequest').addEventListener('click',()=>{const url=URL.createObjectURL(new Blob([prepared],{type:'text/plain;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='batch-grab-interest-draft.txt';a.click();setTimeout(()=>URL.revokeObjectURL(url),30000);status.textContent='Local draft download requested. Nothing has been sent.';});
 document.getElementById('emailRequest').addEventListener('click',()=>{if(!email||!prepared)return;location.href='mailto:'+email+'?subject='+encodeURIComponent('Batch Grab beta / Document Handoff')+'&body='+encodeURIComponent(prepared);status.textContent='Email draft requested. Review and send manually in your mail app; this page has not sent a message.';});
}
