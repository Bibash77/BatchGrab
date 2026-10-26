const fs=require('node:fs'),path=require('node:path'),os=require('node:os'),{execFileSync}=require('node:child_process');
const base=path.resolve(__dirname,'..'),product=path.resolve(base,'..'),version=JSON.parse(fs.readFileSync(path.join(product,'manifest.json'))).version;
const verification=JSON.parse(fs.readFileSync(path.join(product,'docs/RELEASE_VERIFICATION.json')));if(verification.status!=='passed'||verification.version!==version)throw Error('Current release verification required');
const stage=fs.mkdtempSync(path.join(os.tmpdir(),'batch-grab-launch-kit-'));
function add(from,dest){const target=path.join(stage,dest);fs.mkdirSync(path.dirname(target),{recursive:true});fs.copyFileSync(from,target);}
try{
for(const f of ['README.md','MARKETING_PLAN.md','LAUNCH_CONTENT.md','CHROME_STORE_LISTING.md','LAUNCH_CHECKLIST.md','MEASUREMENT_PLAN.md','ACTIVE_USER_TRACKER.csv','CURRENT_STATUS.json','DELIVERY_VERIFICATION.json','launch-config.json','CUSTOMER_CHANNELS.md'])add(path.join(base,f),f);
for(const f of ['RELEASE_0.4.0.md','RELEASE_VERIFICATION.json','SECURITY_AND_PRIVACY.md','PACKAGE_VERIFICATION.json'])add(path.join(product,'docs',f),'docs/'+f);
add(path.join(product,`dist/batch-grab-${version}-production.zip`),`batch-grab-${version}-production.zip`);add(path.join(base,'dist/batch-grab-launch-site.zip'),'batch-grab-launch-site.zip');add(path.join(product,'vercel.json'),'vercel.json');
for(const f of ['01-collect-images.jpg','02-organize-documents.jpg','03-check-outcomes.jpg','04-japanese.jpg','small-promo-440x280.jpg','icon-128.png'])add(path.join(base,'store-assets',f),'store-assets/'+f);
const zip=path.join(base,`dist/batch-grab-free-launch-${version}.zip`);fs.rmSync(zip,{force:true});execFileSync('/usr/bin/zip',['-qr',zip,'.'],{cwd:stage});const entries=execFileSync('/usr/bin/unzip',['-Z1',zip],{encoding:'utf8'}).trim().split('\n');if(entries.some(f=>/\.git\/|\/private\/|\/output\//.test(f)))throw Error('Unwanted archive entry');fs.copyFileSync(zip,path.join(base,'dist/batch-grab-launch-kit.zip'));console.log('Packaged current free launch kit:',zip);
}finally{fs.rmSync(stage,{recursive:true,force:true});}
