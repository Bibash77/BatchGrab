const fs=require('node:fs'),path=require('node:path');const d=path.resolve(__dirname,'../demo');
const image=(name,attrs='')=>`<img src="/images/001.png?case=${name}" alt="${name}" width="320" height="180" ${attrs}>`;
fs.writeFileSync(path.join(d,'discovery.html'),`<!doctype html><meta charset="utf-8"><title>Permitted discovery fixture</title><h1>Discovery ground truth</h1>
${image('standard')}${image('duplicate')}${image('duplicate')}
<img src="/images/pixel.png" data-src="/images/002.png?case=lazy" alt="Lazy product" width="320" height="180">
<picture><source srcset="/images/003.png?case=responsive-wide 1000w"><img src="/images/001.png?case=responsive-fallback" srcset="/images/004.png?case=responsive-small 300w, /images/005.png?case=responsive-large 1200w" alt="Responsive product" width="320" height="180"></picture>
<div style="width:320px;height:180px;background-image:url('/images/002.png?case=background')">Background product</div>
<a href="/download/policy" download="公開資料.pdf">公開資料</a><a href="/reports.csv">Quarterly data CSV</a><a href="/reports.xlsx">Quarterly workbook XLSX</a>
<iframe src="/discovery-frame.html" title="Accessible same-origin catalogue"></iframe><iframe sandbox src="/discovery-frame.html" title="Blocked opaque-origin frame"></iframe><div id="shadow"></div>
<script>document.querySelector('#shadow').attachShadow({mode:'open'}).innerHTML=${JSON.stringify(image('shadow'))};let n=new Image();n.src='/images/003.png?case=network-only';window.fixtureImage=n;window.addMore=()=>document.body.insertAdjacentHTML('beforeend',${JSON.stringify(image('dynamic'))});</script>`);
fs.writeFileSync(path.join(d,'discovery-frame.html'),`<!doctype html><title>Frame</title>${image('iframe')}`);
fs.writeFileSync(path.join(d,'reports.csv'),'year,revenue\n2026,100\n');
console.log('Created controlled discovery fixtures');
