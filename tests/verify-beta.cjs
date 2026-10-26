// Playwright CDP drives actual toolbar popup targets (not exposed as normal tab Pages).
const {chromium}=require('playwright');
const fs=require('node:fs'), path=require('node:path'), assert=require('node:assert/strict');
const {createDemoServer}=require('../scripts/demo-server.cjs');
const root=path.resolve(__dirname,'..'), out=path.join(root,'output/playwright');
const fixtures=JSON.parse(fs.readFileSync(path.join(root,'demo/data.json')));
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function until(fn,description,timeout=60000){const end=performance.now()+timeout;while(performance.now()<end){const v=await fn();if(v)return v;await sleep(100);}throw Error('Timeout: '+description);}
class Popup{
 constructor(browser,targetId,sessionId){this.b=browser;this.targetId=targetId;this.s=sessionId;this.id=0;this.requests=new Map();this.errors=[];
 browser.on('Target.receivedMessageFromTarget',e=>{if(e.sessionId!==this.s)return;const m=JSON.parse(e.message);if(m.id){const r=this.requests.get(m.id);if(r){this.requests.delete(m.id);m.error?r.reject(Error(m.error.message)):r.resolve(m.result);}}if(m.method==='Runtime.exceptionThrown')this.errors.push(m.params.exceptionDetails.text);});}
 async send(method,params={}){const id=++this.id;const answer=new Promise((resolve,reject)=>this.requests.set(id,{resolve,reject}));await this.b.send('Target.sendMessageToTarget',{sessionId:this.s,message:JSON.stringify({id,method,params})});return answer;}
 async eval(expression){const r=await this.send('Runtime.evaluate',{expression,awaitPromise:true,returnByValue:true,userGesture:true});if(r.exceptionDetails)throw Error(r.exceptionDetails.exception?.description||r.exceptionDetails.text);return r.result.value;}
 click(s){return this.eval(`document.querySelector(${JSON.stringify(s)}).click()`);}
 fill(s,v){return this.eval(`(()=>{const e=document.querySelector(${JSON.stringify(s)});e.value=${JSON.stringify(v)};e.dispatchEvent(new Event('input',{bubbles:true}));e.dispatchEvent(new Event('change',{bubbles:true}));})()`);}
 async screenshot(name){const m=await this.send('Page.getLayoutMetrics');const {data}=await this.send('Page.captureScreenshot',{captureBeyondViewport:true,clip:{x:0,y:0,width:680,height:Math.min(m.cssContentSize.height,1800),scale:1}});fs.writeFileSync(path.join(out,name),Buffer.from(data,'base64'));}
 close(){return this.b.send('Target.closeTarget',{targetId:this.targetId});}
}
async function popup(browser,id,page){await page.bringToFront();const {targetInfos}=await browser.send('Target.getTargets',{filter:[{type:'tab',exclude:false}]});const tab=targetInfos.find(t=>t.url===page.url());assert(tab);await browser.send('Extensions.triggerAction',{id,targetId:tab.targetId});const t=await until(async()=>(await browser.send('Target.getTargets')).targetInfos.find(t=>t.url===`chrome-extension://${id}/popup.html`||t.url===`chrome-extension://${id}/ui/popup.html`),'toolbar popup');const {sessionId}=await browser.send('Target.attachToTarget',{targetId:t.targetId,flatten:false});const p=new Popup(browser,t.targetId,sessionId);await p.send('Runtime.enable');await until(()=>p.eval(`document.readyState==='complete'`),'popup loaded');return p;}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
async function run(kind,pageName,base){
 const label=`${kind}-${pageName.replace('.html','')}`;console.log('RUN',label);
 const extension=kind==='batch-grab'?path.join(root,'dist/batch-grab-beta'):(process.env.SMD_EXTENSION||'/private/tmp/batch-grab-comparison/simple-mass-downloader');
 const downloads=path.join(out,label,'downloads');fs.rmSync(downloads,{recursive:true,force:true});fs.mkdirSync(downloads,{recursive:true});
 const profile=fs.mkdtempSync('/private/tmp/bg-verify-');fs.mkdirSync(path.join(profile,'Default'));fs.writeFileSync(path.join(profile,'Default/Preferences'),JSON.stringify({download:{default_directory:downloads,prompt_for_download:false,directory_upgrade:true}})); const context=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,acceptDownloads:true,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--enable-unsafe-extension-debugging']});
 try{
 context.on('console',m=>{if(m.type()==='error')console.log('BROWSER ERROR',m.text());});const browser=await context.browser().newBrowserCDPSession();const info=(await browser.send('Extensions.getExtensions')).extensions.find(e=>e.path===extension);assert(info);
 await browser.send('Browser.setDownloadBehavior',{behavior:'default'}); // Native Chrome prefs preserve extension filename/folder requests; CDP 'allow' overrides them.
 const page=context.pages()[0];if(kind==='smd'){await until(()=>context.pages().some(p=>p.url().includes('gelprec.github.io')),'SMD installation help tab');for(const other of context.pages())if(other!==page)await other.close();} await page.goto(`${base}/${pageName}`);let p=await popup(browser,info.id,page);
 const worker=context.serviceWorkers()[0]||await context.waitForEvent('serviceworker'); const jobs=async()=>await worker.evaluate(async()=> (await chrome.storage.local.get('jobs')).jobs||[]);
 if(kind==='batch-grab'){
 const edge=pageName==='edge-cases.html', count=edge?7:30;
 await until(()=>p.eval(`document.querySelectorAll('#list li[data-url]').length===${count}`),'all PDFs scanned');
 if(edge){for(const id of ['d001','d002']){await p.fill(`#list li[data-url$="${id}.pdf"] input[data-field=name]`,'Edited: Review.txt');await p.fill(`#list li[data-url$="${id}.pdf"] input[data-field=folder]`,'../Reviewed');}}
 else{await p.click('#all');await p.fill('#text','Annual Report');assert.equal(await p.eval(`document.querySelector('#preview').children.length`),1);await p.fill('#text','');assert.equal(await p.eval(`document.querySelector('#preview').children.length`),1);}
 await p.click('#all');const paths=await p.eval(`Array.from(document.querySelectorAll('#preview li'),e=>e.textContent)`);assert.equal(paths.length,count);assert.equal(new Set(paths.map(s=>s.toLowerCase())).size,count);
 if(pageName==='index.html')await p.screenshot('01-smart-naming-preview.png');
 const start=performance.now();await p.click('#go');await until(async()=>(await jobs()).length===count,'durable acceptance');const queuedAtClose=(await jobs()).filter(j=>j.status==='queued').length;assert(queuedAtClose>0,'queued jobs exist at closure');await p.close();await until(async()=>!(await browser.send('Target.getTargets')).targetInfos.some(t=>t.targetId===p.targetId),'real popup destroyed');
 const done=await until(async()=>{const j=await jobs();return j.length===count&&j.every(x=>['complete','interrupted'].includes(x.status))&&j;},'downloads after popup destruction',60000).catch(async e=>{console.log('CHROME STATE',JSON.stringify(await worker.evaluate(()=>chrome.downloads.search({}))));console.log('STALLED',JSON.stringify((await jobs()).map(j=>({status:j.status,path:j.path,actual:j.actualFilename,error:j.error}))));throw e;});const downloadMs=performance.now()-start;
 for(const j of done.filter(j=>j.status==='complete')){const file=path.join(downloads,j.path);assert.equal(j.actualFilename,file);assert(fs.existsSync(file),j.path);assert.equal(fs.readFileSync(file).subarray(0,5).toString(),'%PDF-');}
 const files=walk(downloads).map(f=>path.relative(downloads,f));
 if(!edge){assert.equal(done.filter(j=>j.status==='complete').length,30);assert.equal(files.length,30);for(const r of fixtures){const f=`Batch Grab/${r.section}/${r.expectedName}`;assert(files.includes(f),f);assert(fs.readFileSync(path.join(downloads,f),'utf8').includes(r.title),'right PDF bytes');}}
 else{assert.equal(done.filter(j=>j.status==='complete').length,5);assert.equal(done.filter(j=>j.status==='interrupted').length,2);assert(done.filter(j=>j.status==='interrupted').every(j=>j.error));for(const f of ['Batch Grab/Reviewed/Edited_ Review.pdf','Batch Grab/Reviewed/Edited_ Review (2).pdf','Batch Grab/Safety checks/_CON.pdf','Batch Grab/Safety checks/Budget_ East_West _Draft__.pdf','Batch Grab/Safety checks/Extensionless Policy.pdf'])assert(files.includes(f),f);}
 p=await popup(browser,info.id,page);await until(()=>p.eval(`document.querySelectorAll('#jobs li').length===${count}`),'outcomes on reopen');
 if(pageName==='index.html')await p.screenshot('02-completed-after-popup-closure.png');
 if(edge){assert.equal(await p.eval(`document.querySelector('#list li[data-url$="d001.pdf"] input[data-field=name]').value`),'Edited: Review.txt','submitted edits survive immediate popup closure');await p.screenshot('03-failures-and-edited-names.png');const retry=done.find(j=>j.url.endsWith('/flaky.pdf'));await p.click(`#jobs li[data-job-id="${retry.id}"] button`);const recovered=await until(async()=>{const j=await jobs();return j.length===8&&j.filter(x=>x.status==='complete').length===6&&j;},'failed-row retry');assert(recovered.find(j=>j.id===retry.id).retried);assert(fs.existsSync(recovered.find(j=>j.url.endsWith('/flaky.pdf')&&j.status==='complete').actualFilename));}
 assert.deepEqual(p.errors,[]);
 const result={product:info.name,version:info.version,page:pageName,browser:context.browser().version(),completed:done.filter(j=>j.status==='complete').length,failed:done.filter(j=>j.status==='interrupted').length,queuedAtPopupClose:queuedAtClose,popupDestroyed:true,downloadMs,exactDescriptiveNames:edge?null:30,exactSectionFolders:edge?null:30,paths,jobs:done,files,...(edge?{manualRetryRecovered:true}:{})};fs.writeFileSync(path.join(out,label+'.json'),JSON.stringify(result,null,2));console.log('PASS',label,downloadMs+'ms');return result;
 }
 await until(()=>p.eval(`!document.querySelector('#load-page-links').disabled && !document.querySelector('#resource-extensions-filter').disabled`),'SMD initialized');await p.click('#load-page-links');await until(()=>p.eval(`document.querySelectorAll('[data-resource-checkbox]').length>0`),'SMD scan results',5000).catch(async e=>{console.log('SMD DIAG',await p.eval(`({status:document.querySelector('#health-indicator').textContent,all:document.body.textContent.slice(-1800)})`));throw e;});await p.fill('#resource-extensions-filter','pdf');
 const request=type=>p.eval(`chrome.runtime.sendMessage({protocolVersion:1,requestId:crypto.randomUUID(),type:${JSON.stringify(type)},payload:{}}).then(r=>{if(!r.ok)throw Error(r.error.message);return r.data})`);
 await until(()=>p.eval(`document.querySelectorAll('[data-resource-checkbox]').length===30`),'SMD PDF filter');
 await p.click('#resource-name-mask-trigger');
 await until(()=>p.eval(`!document.querySelector('#resource-name-mask-popup').hidden`),'SMD name popup visible');
 await p.click('[data-name-mask-preset="{text}.{ext}"]');
 await until(async()=>(await request('resource.getSnapshot')).outputOptions.nameMask==='{text}.{ext}','SMD persisted text mask');
 await p.fill('#resource-directory','SMD');
 await until(async()=>(await request('resource.getSnapshot')).outputOptions.directory==='SMD','SMD persisted directory');
 await p.click('#resource-master-check');
 await until(()=>p.eval(`!document.querySelector('#add-and-download-now').disabled`),'SMD selection');
 await p.screenshot('smd-inspect.png');
 const start=performance.now();await p.click('#add-and-download-now');
 await until(async()=>{const snap=await request('download.getSnapshot');return snap.items.length===30&&snap;},'SMD queued');
 const beforeClose=await request('download.getSnapshot');const queuedAtPopupClose=beforeClose.items.filter(j=>j.execution.kind==='queued').length;assert(queuedAtPopupClose>0);
 await p.close();await until(async()=>!(await browser.send('Target.getTargets')).targetInfos.some(t=>t.targetId===p.targetId),'SMD popup destroyed');
 await until(()=>walk(downloads).filter(f=>f.endsWith('.pdf')).length===30,'SMD real downloads',240000);
 await until(async()=>{const rows=await worker.evaluate(()=>chrome.downloads.search({}));return rows.length===30&&rows.every(r=>r.state==='complete');},'SMD Chrome completion');const downloadMs=performance.now()-start; const files=walk(downloads).map(f=>path.relative(downloads,f));
 for(const file of files)assert.equal(fs.readFileSync(path.join(downloads,file)).subarray(0,5).toString(),'%PDF-');
 const exactDescriptiveNames=fixtures.filter(r=>files.some(f=>path.basename(f)===r.expectedName)).length;
 const exactSectionFolders=fixtures.filter(r=>files.some(f=>f.endsWith(`${r.section}/${r.expectedName}`))).length;
 p=await popup(browser,info.id,page);const snapshot=await request('download.getSnapshot');assert(snapshot.items.every(j=>j.execution.kind==='completed'));await p.screenshot(`smd-${pageName.replace('.html','')}-completed.png`);
 const result={product:info.name,version:info.version,page:pageName,browser:context.browser().version(),completed:30,failed:0,popupDestroyed:true,queuedAtPopupClose,downloadMs,exactDescriptiveNames,exactSectionFolders,files,downloadStates:snapshot.items.map(j=>({name:j.naming.finalName,directory:j.directory.value,state:j.execution.kind})),configuration:{extensions:'pdf',nameMask:'{text}.{ext}',directory:'SMD',automaticFolderRules:'none'}};
 fs.writeFileSync(path.join(out,label+'.json'),JSON.stringify(result,null,2));console.log('PASS',label,exactDescriptiveNames,'descriptive names');return result;
 }finally{await context.close();}
}
(async()=>{fs.mkdirSync(out,{recursive:true});const server=createDemoServer({delayMs:350});await new Promise(r=>server.listen(0,'127.0.0.1',r));const results=[];try{const runs=process.env.ONLY_BG?[['batch-grab','index.html'],['batch-grab','descriptive.html'],['batch-grab','edge-cases.html']]:process.env.ONLY_SMD?[['smd','index.html'],['smd','descriptive.html']]:[['batch-grab','index.html'],['batch-grab','descriptive.html'],['batch-grab','edge-cases.html'],['smd','index.html'],['smd','descriptive.html']];for(const [kind,name]of runs)results.push(await run(kind,name,`http://127.0.0.1:${server.address().port}`));fs.writeFileSync(path.join(out,'results.json'),JSON.stringify({generatedAt:new Date().toISOString(),pdfDelayMs:350,results},null,2));console.log('PASS ALL');}finally{await new Promise(r=>server.close(r));}})().catch(e=>{console.error(e);process.exitCode=1;});
