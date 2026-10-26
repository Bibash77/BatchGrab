const {chromium,fs,path,assert,root,out,until,popup}=require('./browser-helpers.cjs');
const runDir=path.join(out,'public-'+new Date().toISOString().replace(/[:.]/g,'-'));fs.mkdirSync(runDir,{recursive:true});
async function run(label,url,group){
 console.log('PUBLIC',label);const folder=path.join(runDir,label);fs.mkdirSync(folder);const downloads=path.join(folder,'downloads');fs.mkdirSync(downloads);const profile=fs.mkdtempSync('/private/tmp/bg-public-');fs.mkdirSync(path.join(profile,'Default'));fs.writeFileSync(path.join(profile,'Default/Preferences'),JSON.stringify({download:{default_directory:downloads,prompt_for_download:false}}));
 const extension=path.join(root,'dist/batch-grab-beta');const c=await chromium.launchPersistentContext(profile,{channel:'chromium',headless:true,args:[`--disable-extensions-except=${extension}`,`--load-extension=${extension}`,'--enable-unsafe-extension-debugging']});let result={label,url,group};
 try{
 const browser=await c.browser().newBrowserCDPSession();const info=(await browser.send('Extensions.getExtensions')).extensions.find(e=>e.path===extension);await browser.send('Browser.setDownloadBehavior',{behavior:'default'});const page=c.pages()[0];await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
 await page.locator(group==='Images'?'img':'a[href$=".pdf"]').first().waitFor({state:'attached',timeout:20000});
 if(group==='Images')await page.waitForFunction(()=>Array.from(document.images).some(i=>i.naturalWidth>=100),{timeout:20000});
 await page.screenshot({path:path.join(folder,'source-page.png'),fullPage:false});let p=await popup(browser,info.id,page);const worker=c.serviceWorkers()[0]||await c.waitForEvent('serviceworker');const data=()=>worker.evaluate(()=>chrome.storage.local.get(['draft','jobs']));
 const draft=await until(async()=>{const d=(await data()).draft;return d?.source===page.url()&&d.items?.length&&d;},'public scan');
 result.found=draft.items.length;result.images=draft.items.filter(i=>i.group==='Images').length;result.documents=draft.items.filter(i=>i.group==='Documents').length;result.classification=Object.fromEntries(['content','logo','icon','thumbnail','decorative','review'].map(k=>[k,draft.items.filter(i=>i.category===k).length]));
 if(result.classification.review>0){await p.click('[data-view=review]');result.reviewViewCount=await p.eval(`document.querySelector('#count').textContent`);await p.click('[data-view=recommended]');}result.initialView=await p.eval(`document.querySelector('#count').textContent`);await p.screenshot(`public-${label}-picker.png`);
 const mainImages=await page.evaluate(()=>Array.from(document.querySelectorAll('main img'),i=>i.currentSrc||i.src));result.mainImageUrls=mainImages;const candidates=draft.items.filter(i=>i.group===group&&(group!=='Images'||i.category==='content'&&(label!=='nasa-gallery'||mainImages.includes(i.url))));
 const chosen=group==='Documents'?candidates.find(i=>/fw9\.pdf/i.test(i.url))||candidates[0]:candidates.find(i=>i.w>=300&&i.h>=160&&i.ext!=='svg')||candidates.find(i=>i.ext!=='svg');assert(chosen,'supported public file found');
 if(group==='Documents')await p.click('[data-view=documents]');
 else await p.click('[data-view=images]');
 // Locate a scanned file using the visible source URL, never an invented website selector.
 const find=`Array.from(document.querySelectorAll('#list .card')).find(e=>e.dataset.url===${JSON.stringify(chosen.url)})`;
 // Public lists may span pages. Search by its exact URL to make the chosen row visible.
 await p.fill('#text',chosen.url);await until(()=>p.eval(`!!(${find})`),'chosen public row');
 if(chosen.suggestion){await p.eval(`(${find}).querySelector('.review').click()`);await p.eval(`(${find}).querySelector('[data-accept-name]').click()`);result.nameEvidence=chosen.suggestion;}
 const expectedName=await p.eval(`(${find}).querySelector('[data-field=name]').value`);result.expectedName=expectedName;result.sourceFile=chosen.url;result.dimensionSource={w:chosen.w||null,h:chosen.h||null};await p.eval(`(${find}).querySelector('.pick').click()`);await p.click('#go');
 const job=await until(async()=>{const jobs=(await data()).jobs||[];return jobs.length&&jobs[0].status!=='queued'&&jobs[0].status!=='starting'&&jobs[0].status!=='in_progress'&&jobs[0];},'public download outcome',60000);
 result.job=job;
 assert.equal(job.status,'complete',job.error);assert(fs.existsSync(job.actualFilename));assert.equal(path.basename(job.actualFilename),expectedName);const bytes=fs.readFileSync(job.actualFilename);result.bytes=bytes.length;result.fileHeader=bytes.subarray(0,12).toString('hex');assert(bytes.length>100);
 if(group==='Documents')assert.equal(bytes.subarray(0,5).toString(),'%PDF-');else assert(bytes[0]===0xff&&bytes[1]===0xd8||bytes.subarray(0,8).toString('hex')==='89504e470d0a1a0a'||bytes.subarray(8,12).toString()==='WEBP','recognized raster-image header');
 await p.eval(`document.querySelector('#outcomes').open=true`);await p.screenshot(`public-${label}-outcome.png`);result.status='passed';console.log('PASS PUBLIC',label,result.expectedName);return result;
 }catch(e){result.status='limited';result.error=e.message;console.log('PUBLIC LIMIT',label,e.message);return result;}finally{fs.writeFileSync(path.join(folder,'result.json'),JSON.stringify(result,null,2));await c.close();}
}
(async()=>{const results=[];for(const args of [['nasa-gallery','https://www.nasa.gov/image-of-the-day/','Images'],['books-catalogue','https://books.toscrape.com/','Images'],['irs-documents','https://www.irs.gov/forms-pubs/about-form-w-9','Documents']]){if(!process.env.PUBLIC_CASE||args[0]===process.env.PUBLIC_CASE)results.push(await run(...args));}fs.writeFileSync(path.join(runDir,'results.json'),JSON.stringify(results,null,2));fs.writeFileSync(path.join(out,'latest-public.json'),JSON.stringify({run:path.basename(runDir),results},null,2));console.log('PUBLIC RESULTS',runDir);})();
