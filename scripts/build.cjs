const fs=require('node:fs'),path=require('node:path'),{execFileSync}=require('node:child_process'),{createHash}=require('node:crypto');
const root=path.resolve(__dirname,'..'),dist=path.join(root,'dist'),unpacked=path.join(dist,'batch-grab-beta');
const runtime=['manifest.json','background.js','lib.js','queue-policy.js','i18n.js','popup.js','popup.html','popup.css','icons','_locales'];
fs.mkdirSync(dist,{recursive:true});fs.rmSync(unpacked,{recursive:true,force:true});fs.mkdirSync(unpacked);
for(const f of runtime)fs.cpSync(path.join(root,f),path.join(unpacked,f),{recursive:true});
const m=JSON.parse(fs.readFileSync(path.join(root,'manifest.json')));if(m.manifest_version!==3||!m.default_locale)throw Error('MV3 and localization required');
const hash=b=>createHash('sha256').update(b).digest('hex');
const walk=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(d,e.name)):[path.join(d,e.name)]);
const files=Object.fromEntries(walk(unpacked).map(f=>[path.relative(unpacked,f),hash(fs.readFileSync(f))]));
for(const kind of ['beta','production']){const zip=path.join(dist,`batch-grab-${m.version}-${kind}.zip`);fs.rmSync(zip,{force:true});execFileSync('/usr/bin/zip',['-qr',zip,...runtime],{cwd:unpacked});}
const zip=path.join(dist,`batch-grab-${m.version}-production.zip`),beta=path.join(dist,`batch-grab-${m.version}-beta.zip`);
fs.writeFileSync(path.join(dist,'build.json'),JSON.stringify({version:m.version,builtAt:new Date().toISOString(),files,zipSha256:hash(fs.readFileSync(beta)),productionZipSha256:hash(fs.readFileSync(zip))},null,2)+'\n');
const demo=path.join(dist,'batch-grab-demo.zip');fs.rmSync(demo,{force:true});execFileSync('/usr/bin/zip',['-qr',demo,'demo','scripts/demo-server.cjs'],{cwd:root});
console.log('Built',zip,'with',Object.keys(files).length,'allowlisted files');
