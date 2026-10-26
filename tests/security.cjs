const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
const root=path.resolve(__dirname,'..'),load=f=>import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(path.join(root,f))).toString('base64'));
(async()=>{
 const {minimalItem,trimHistory,ensureQueueBudget}=await load('queue-policy.js'),{prepareJobs,enrichItem,sourceIndex}=await load('lib.js');
 for(const url of ['javascript:alert(1)','data:text/html,hello','file:///etc/passwd','https://user:secret@example.com/a.pdf'])assert.throws(()=>minimalItem({url}));
 assert.throws(()=>minimalItem({url:'https://example.com/'+ 'x'.repeat(8193)}));
 assert.equal(minimalItem({url:'https://example.com/a.pdf',name:'safe.pdf',previewUrl:'secret',cardTitle:'private'}).cardTitle,undefined);
 assert.equal(minimalItem({url:'https://example.com/a.pdf',source:'https://a:b@example.com'}).source,'');
 const now=Date.now(),history=Array.from({length:600},(_,i)=>({status:'complete',createdAt:new Date(now).toISOString(),id:i}));history.unshift({status:'queued',id:'pending',createdAt:'2000-01-01'});history.push({status:'complete',id:'expired',createdAt:'2000-01-01'});
 const kept=trimHistory(history,now);assert.equal(kept.length,501);assert(kept.some(x=>x.id==='pending'));assert(!kept.some(x=>x.id==='expired'));
 assert.throws(()=>ensureQueueBudget([{url:'x'.repeat(4000001)}]));assert.doesNotThrow(()=>ensureQueueBudget([{url:'https://example.com'}]));
 assert.equal(enrichItem({url:'javascript:alert(1)',kind:'image'}),null);
 for(const name of ['../../x.pdf','CON.pdf','a\\b.pdf','\u202ex.pdf']){const j=prepareJobs([{url:'https://example.com/a.pdf',name,ext:'pdf',folder:'../../safe'}],'../../Batch Grab')[0];assert(!j.path.split('/').includes('..'));assert(j.path.endsWith('.pdf'));}
 assert(sourceIndex([{name:'=IMPORTXML("x")'}]).includes("'=IMPORTXML"));
 const m=JSON.parse(fs.readFileSync(path.join(root,'manifest.json')));assert.equal(m.manifest_version,3);assert(!m.host_permissions);assert(!m.externally_connectable);assert(m.content_security_policy.extension_pages.includes("script-src 'self'"));
 for(const file of ['popup.js','background.js','i18n.js','queue-policy.js']){const s=fs.readFileSync(path.join(root,file),'utf8');assert(!/innerHTML|eval\(|new Function/.test(s),file);}
 const en=JSON.parse(fs.readFileSync(path.join(root,'_locales/en/messages.json'))),ja=JSON.parse(fs.readFileSync(path.join(root,'_locales/ja/messages.json')));assert.deepEqual(Object.keys(en),Object.keys(ja));for(const k of Object.keys(en)){assert(ja[k].message);assert.deepEqual(en[k].message.match(/\$\d/g),ja[k].message.match(/\$\d/g)?.sort((a,b)=>en[k].message.indexOf(a)-en[k].message.indexOf(b))||null);}
 console.log('PASS security: schemes, credentials, paths, metadata minimization, retention, queue byte limit, CSV, CSP and locale parity');
})().catch(e=>{console.error(e);process.exitCode=1});
