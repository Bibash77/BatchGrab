const {chromium,fs,path,assert,root,out,until,popup,walk,createDemoServer}=require('./browser-helpers.cjs');
const {createHash}=require('node:crypto');
const hash=b=>createHash('sha256').update(b).digest('hex');
const RUN=process.env.RUN_ID||new Date().toISOString().replace(/[:.]/g,'-');
const runDir=path.join(out,RUN);fs.mkdirSync(runDir,{recursive:true});
async function run(name,base){
 console.log('RUN',name);const dir=path.join(runDir,name);fs.mkdirSync(dir,{recursive:true});
 const downloads=path.join(dir,'downloads');fs.mkdirSync(downloads);const profile=fs.mkdtempSync('/private/tmp/bg-visual-');fs.mkdirSync(path.join(profile,'Default'));fs.writeFileSync(path.join(profile,'Default/Preferences'),JSON.stringify({download:{default_directory:downloads,prompt_for_download:false}}));
 const extension=path.join(root,'dist/batch-grab-beta');const c=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--enable-unsafe-extension-debugging']});
 let result={case:name};try{
 const browser=await c.browser().newBrowserCDPSession();const info=(await browser.send('Extensions.getExtensions')).extensions.find(e=>e.path===extension);assert(info);await browser.send('Browser.setDownloadBehavior',{behavior:'default'});
 const page=c.pages()[0];await page.goto(base+'/'+name+'.html',{waitUntil:'load'});
 const begin=performance.now();let p=await popup(browser,info.id,page);
 const worker=c.serviceWorkers()[0]||await c.waitForEvent('serviceworker');
 const data=()=>worker.evaluate(()=>chrome.storage.local.get(['draft','jobs']));
 await until(async()=>{const d=await data();return d.draft?.source===page.url()&&(d.draft.items?.length || name==='large-gallery'&&d.draft.largeScan);},'scan and draft');
 result.scanAndDraftMs=performance.now()-begin;result.browser=c.browser().version();result.version=info.version;
 let draft=(await data()).draft;
 if(name==='large-gallery'){
  assert.equal(await p.eval(`document.querySelector('#count').textContent.includes('5,000')`),true);result.largeDraftNotCached=!!draft.largeScan;
  assert.equal(await p.eval(`document.querySelectorAll('#list .card').length`),60);
  const next=performance.now();await p.click('#next');await until(()=>p.eval(`document.querySelector('#pageInfo').textContent.startsWith('61–')`),'next page');result.pageSwitchMs=performance.now()-next;
  await p.click('#all');assert.equal(await p.eval(`document.querySelector('#selectedCount').textContent`),'5000 selected');assert(await p.eval(`document.querySelector('#go').disabled`));await p.click('#none');await p.click('#pageSelect');assert.equal(await p.eval(`document.querySelector('#selectedCount').textContent`),'60 selected');
  const search=performance.now();await p.fill('#text','Catalogue item 04999');await until(()=>p.eval(`document.querySelectorAll('#list .card').length===1`),'large-list search');result.searchMs=performance.now()-search;assert.equal(await p.eval(`document.querySelector('#selectedCount').textContent`),'0 selected');
  await p.fill('#text','');await until(()=>p.eval(`document.querySelectorAll('#list .card').length===60`),'clear large-list search');
  await p.screenshot('large-gallery.png');result.images=5000;result.maxRenderedCards=60;result.batchLimitVerified=true;result.searchVerified=true;
 }else if(name==='catalogue'){
  assert.equal(draft.items.filter(i=>i.category==='content').length,12);assert.equal(await p.eval(`document.querySelectorAll('#list .card').length`),12);await p.screenshot('catalogue-picker.png');result.smallProductPhotosInSuggested=12;
 }else{
  if(name==='gallery'){
   const images=draft.items.filter(i=>i.group==='Images');assert.equal(images.length,12);result.classification=Object.fromEntries(['content','logo','icon','thumbnail','decorative','review'].map(k=>[k,images.filter(i=>i.category===k).length]));
   assert.equal(result.classification.content,6);assert.equal(result.classification.logo,1);assert.equal(result.classification.icon,2);assert.equal(result.classification.thumbnail,1);assert.equal(result.classification.decorative,2);
   assert.equal(await p.eval(`document.querySelectorAll('#list .card').length`),8);assert(await p.eval(`document.querySelector('#advanced').hidden`));assert(await p.eval(`(()=>{const b=document.querySelector('#go').getBoundingClientRect();return b.top>=0&&b.bottom<=innerHeight})()`));
   assert.equal(await p.eval(`document.querySelector('#list .card[data-url$="001.png"] [data-field=name]').value`),'001.png');
   for(const id of ['001','004','005']){await p.click(`#list .card[data-url$="${id}.png"] .review`);if(id==='004')assert((await p.eval(`document.querySelector('#list .card[data-url$="004.png"] .suggestion').textContent`)).includes('uncertain'));await p.click(`#list .card[data-url$="${id}.png"] [data-accept-name]`);}
   await p.click('[data-view=assets]');assert.equal(await p.eval(`document.querySelectorAll('#list .card').length`),6);await p.screenshot('site-assets-separated.png');await p.click('[data-view=images]');await p.screenshot('images-picker.png');await p.click('[data-view=recommended]');await p.click('#all');await p.screenshot('gallery-picker.png');assert(await p.eval(`Array.from(document.querySelectorAll('#list .preview img')).some(i=>i.complete&&i.naturalWidth>0&&i.getBoundingClientRect().top<innerHeight)`));result.loadedPreviewVerified=true;
   result.suggestedItems=8;result.assetItems=6;result.uncertainNamesRequireAcceptance=true;await p.click('#advancedToggle');await p.eval(`document.querySelector('#outcomes').open=true`);assert(await p.eval(`document.querySelector('#go').getBoundingClientRect().bottom<=innerHeight`));result.actionVisibleWithPanelsExpanded=true;await p.click('#advancedToggle');await p.eval(`document.querySelector('#outcomes').open=false`);assert(await p.eval(`document.querySelector('#queueSummary').getBoundingClientRect().bottom<=document.querySelector('footer').getBoundingClientRect().top`));result.outcomesVisibleAboveFooter=true;result.actionVisibleWithoutScrolling=true;
  }else if(name==='index'){
   await p.click('[data-view=documents]');assert.equal(await p.eval(`document.querySelectorAll('#list .card').length`),30);await p.click('#all');await p.screenshot('document-picker.png');
  }else{
   await p.click('[data-view=documents]');await until(()=>p.eval(`document.querySelectorAll('#list .card').length===7`),'edge documents');await p.click('#advancedToggle');
   for(const id of ['d001','d002']){await p.click(`#list .card[data-url$="${id}.pdf"] summary`);await p.fill(`#list .card[data-url$="${id}.pdf"] [data-field=name]`,'Edited: Review.txt');await p.fill(`#list .card[data-url$="${id}.pdf"] [data-field=folder]`,'../Reviewed');}await p.click('#all');
  }
  const start=performance.now();await p.click('#go');const count=name==='gallery'?8:name==='index'?30:7;
  await until(async()=>(await data()).jobs?.length===count,'durable acceptance');const before=(await data()).jobs;result.queuedAtClose=before.filter(j=>j.status==='queued').length;assert(result.queuedAtClose>0);await p.close();await until(async()=>!(await browser.send('Target.getTargets')).targetInfos.some(t=>t.targetId===p.targetId),'real popup destroyed');
  const jobs=await until(async()=>{const j=(await data()).jobs||[];return j.length===count&&j.every(x=>['complete','interrupted'].includes(x.status))&&j;},'download completion',60000);result.downloadMs=performance.now()-start;
  for(const j of jobs.filter(j=>j.status==='complete')){assert.equal(j.actualFilename,path.join(downloads,j.path));assert(fs.existsSync(j.actualFilename));let local=new URL(j.url).pathname;if(local==='/download/policy')local='/files/d001.pdf';assert.equal(hash(fs.readFileSync(j.actualFilename)),hash(fs.readFileSync(path.join(root,'demo',local))));}
  result.completed=jobs.filter(j=>j.status==='complete').length;result.failed=jobs.filter(j=>j.status==='interrupted').length;
  if(name==='gallery'){
   assert.equal(result.completed,8);for(const f of ['Alpine Lake at Dawn.png','Field Camera Kit.png','Field Camera Kit (2).png'])assert(jobs.some(j=>j.path==='Batch Grab/'+f));result.acceptedNameOutputsVerified=true;
  }else if(name==='index'){
   assert.equal(result.completed,30);const expected=JSON.parse(fs.readFileSync(path.join(root,'demo/data.json')));for(const row of expected)assert(jobs.some(j=>j.path===`Batch Grab/${row.section}/${row.expectedName}`));result.exactNamesAndFolders=30;
  }else{
   assert.equal(result.completed,5);assert.equal(result.failed,2);assert(jobs.filter(j=>j.status==='interrupted').every(j=>j.error));assert(jobs.some(j=>j.path==='Batch Grab/Reviewed/Edited_ Review (2).pdf'));assert(jobs.some(j=>j.path.endsWith('/_CON.pdf')));
  }
  p=await popup(browser,info.id,page);await until(()=>p.eval(`document.querySelectorAll('#jobs li').length===${count}`),'outcomes on reopen');await p.eval(`document.querySelector('#outcomes').open=true`);await p.screenshot(name+'-outcomes.png');
  if(name==='edge-cases'){const failed=jobs.find(j=>j.url.endsWith('/flaky.pdf'));await p.click(`#jobs [data-job-id="${failed.id}"] button`);await until(async()=>{const j=(await data()).jobs;return j.length===8&&j.filter(j=>j.status==='complete').length===6;},'manual retry');await until(()=>p.eval(`document.querySelector('#queueSummary').textContent.includes('1 failed')&&document.querySelector('#queueSummary').textContent.includes('1 retried')`),'accurate unresolved failure summary');result.retryRecovered=true;result.retrySummaryVerified=true;}
  result.popupClosureVerified=true;result.jobs=jobs;
 }
 assert.deepEqual(p.errors,[]);result.status='passed';console.log('PASS',name);return result;
 }catch(e){result.status='failed';result.error=e.stack;throw e;}finally{fs.writeFileSync(path.join(dir,'result.json'),JSON.stringify(result,null,2));await c.close();}
}
(async()=>{const server=createDemoServer({delayMs:180});await new Promise(r=>server.listen(0,'127.0.0.1',r));let results=[];try{for(const name of (process.env.CASES||'gallery,catalogue,large-gallery,index,edge-cases').split(','))results.push(await run(name,`http://127.0.0.1:${server.address().port}`));fs.writeFileSync(path.join(runDir,'results.json'),JSON.stringify({run:RUN,generatedAt:new Date().toISOString(),results},null,2));fs.writeFileSync(path.join(out,'latest-beta.json'),JSON.stringify({run:RUN,results},null,2));console.log('PASS ALL',runDir);}finally{await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});
