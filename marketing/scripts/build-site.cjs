const fs=require('node:fs'),path=require('node:path'),{createHash}=require('node:crypto'),{execFileSync}=require('node:child_process');
const base=path.resolve(__dirname,'..'),product=path.resolve(base,'..'),source=path.join(base,'src'),site=path.join(base,'site');
const config=JSON.parse(fs.readFileSync(process.env.BATCH_GRAB_CONFIG || path.join(base,'launch-config.json'))),hash=b=>createHash('sha256').update(b).digest('hex');
const build=JSON.parse(fs.readFileSync(path.join(product,'dist/build.json')));
config.version=build.version;
if(config.analytics!==false)throw Error('Analytics needs a separately approved integration. This build supports local hooks only.');
if(config.storeVerified && !/^https:\/\/chromewebstore\.google\.com\/detail\/[a-z0-9-]+\/[a-p]{32}$/.test(config.chromeStoreUrl||''))throw Error('Verified canonical store URL required');
const origin=process.env.PUBLIC_ORIGIN||config.publicOrigin;
const isProduction=process.env.VERCEL_ENV==='preview' ? false : (process.env.VERCEL_ENV==='production'||process.env.LAUNCH_PUBLIC==='1'||config.mode==='public');
const approved=config.productionApproved===true;
config.mode=isProduction&&approved?'public':'preview';config.publicOrigin=origin||'';
if(config.mode==='public'){
 const u=new URL(origin);if(u.protocol!=='https:'||u.username||u.password||u.pathname!=='/'||u.search||u.hash)throw Error('Public origin must be the approved HTTPS origin without path, credentials or query');
 config.publicOrigin=u.origin;
}
for(const [f,expected]of Object.entries(build.files))if(hash(fs.readFileSync(path.join(product,f)))!==expected)throw Error('Source/release mismatch: '+f);
const zip=`batch-grab-${build.version}-beta.zip`;if(hash(fs.readFileSync(path.join(product,'dist',zip)))!==build.zipSha256)throw Error('Release hash mismatch');
// Clean output prevents stale preview/pricing assets leaking into a new deployment.
fs.rmSync(site,{recursive:true,force:true});fs.mkdirSync(site,{recursive:true});fs.cpSync(source,site,{recursive:true});fs.rmSync(path.join(site,'posts.json'),{force:true});fs.mkdirSync(path.join(site,'assets'),{recursive:true});
const screenshotMap={'images-picker.png':'images-picker.png','gallery-picker.png':'gallery-picker.png','document-picker.png':'document-picker.png','document-outcomes.png':'index-outcomes.png','source-index-outcomes.png':'source-index-outcomes.png'};
const screenshotHashes={};
for(const [dest,file]of Object.entries(screenshotMap)){// Screenshots are approved source assets; test output must not mutate hosted content.
const b=fs.readFileSync(path.join(site,'assets',dest));screenshotHashes[dest]=hash(b);}
fs.writeFileSync(path.join(site,'launch-config.js'),'window.LAUNCH_CONFIG='+JSON.stringify(config).replace(/</g,'\\u003c')+';\n');
fs.mkdirSync(path.join(site,'downloads'),{recursive:true});for(const f of [zip,'batch-grab-demo.zip'])fs.copyFileSync(path.join(product,'dist',f),path.join(site,'downloads',f));
fs.mkdirSync(path.join(site,'fixture/files'),{recursive:true});let fixture=fs.readFileSync(path.join(product,'demo/index.html'),'utf8').replace('</title>','</title><meta name="robots" content="noindex,nofollow">');fixture=fixture.replace(/<a href="(?:descriptive|edge-cases)\.html">.*?<\/a>/g,'');fs.writeFileSync(path.join(site,'fixture/index.html'),fixture);
for(const f of fs.readdirSync(path.join(product,'demo/files')))if(/^d\d{3}\.pdf$/.test(f))fs.copyFileSync(path.join(product,'demo/files',f),path.join(site,'fixture/files',f));
const pages=fs.readdirSync(site).filter(f=>f.endsWith('.html')),esc=v=>v.replace(/[&"<>]/g,c=>({'&':'&amp;','"':'&quot;','<':'&lt;','>':'&gt;'}[c]));
for(const f of pages){const file=path.join(site,f);let html=fs.readFileSync(file,'utf8');if(config.mode==='public'){
 const url=config.publicOrigin+'/'+(f==='index.html'?'':f);html=html.replace('noindex,nofollow','index,follow').replace('</head>',`<link rel="canonical" href="${esc(url)}"><meta property="og:url" content="${esc(url)}"><meta property="og:image" content="${config.publicOrigin}/assets/gallery-picker.png"></head>`);
 const stem=f.replace(/-ja(?=\.html)/,'');if(pages.includes(stem.replace('.html','-ja.html'))){html=html.replace('</head>',`<link rel="alternate" hreflang="en" href="${config.publicOrigin}/${stem==='index.html'?'':stem}"><link rel="alternate" hreflang="ja" href="${config.publicOrigin}/${stem.replace('.html','-ja.html')}"></head>`);}
}fs.writeFileSync(file,html);}
fs.writeFileSync(path.join(site,'robots.txt'),config.mode==='public'?`User-agent: *\nAllow: /\nDisallow: /fixture/\nDisallow: /downloads/\nSitemap: ${config.publicOrigin}/sitemap.xml\n`:'User-agent: *\nDisallow: /\n');
if(config.mode==='public')fs.writeFileSync(path.join(site,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+pages.filter(f=>!['pricing.html','demo.html'].includes(f)).map(f=>`<url><loc>${config.publicOrigin}/${f==='index.html'?'':f}</loc></url>`).join('')+'</urlset>\n');
const blockers=[];if(!approved)blockers.push('Owner production/privacy approval pending');if(!config.publicOrigin)blockers.push('Verified approved public origin pending');if(!config.storeVerified)blockers.push('Store submission/approval and real listing URL pending; honest ZIP beta fallback available');
fs.writeFileSync(path.join(base,'build-report.json'),JSON.stringify({productVersion:build.version,mode:config.mode,publicOrigin:config.publicOrigin,productZipSha256:build.zipSha256,screenshotHashes,launchBlockers:blockers,analytics:false,measurement:'Memory-only hooks; no transmitted events',paymentsActive:false,formsTransmit:false},null,2)+'\n');
// Hosted builds serve the static directory directly; do not depend on a host zip binary.
if(process.env.VERCEL!=='1'){fs.mkdirSync(path.join(base,'dist'),{recursive:true});const archive=path.join(base,'dist/batch-grab-launch-site.zip');fs.rmSync(archive,{force:true});execFileSync('/usr/bin/zip',['-qr',archive,'.'],{cwd:site});}
console.log(`Built ${pages.length} pages in ${config.mode} mode. No external deployment.`);
if(process.argv.includes('--check-launch')&&(config.mode!=='public'||!approved))process.exitCode=2;
