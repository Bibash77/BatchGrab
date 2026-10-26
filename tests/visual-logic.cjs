const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict');
(async()=>{const lib=await import('data:text/javascript;base64,'+Buffer.from(fs.readFileSync(path.join(__dirname,'../lib.js'),'utf8')).toString('base64'));
const row=(x={})=>({url:'https://example.com/001.png',base:'001',ext:'png',group:'Images',w:640,h:360,...x});
for(const [input,expected]of [[row(),'content'],[row({base:'arrow_left',ext:'svg',w:24,h:24}),'icon'],[row({base:'sharethis',ext:'svg',w:32,h:32}),'icon'],[row({alt:'Brand logo'}),'logo'],[row({decorative:true}),'decorative'],[row({w:1,h:1}),'decorative'],[row({base:'thumb',w:96,h:64}),'thumbnail'],[row({base:'thumb',w:96,h:144,cardTitle:'Product A',cardImages:1}),'content'],[row({base:'drawing',ext:'svg',caption:'Systems diagram'}),'content'],[row({w:0,h:0}),'review'],[row({linkedPage:'https://youtube.com/watch?v=123'}),'thumbnail']])assert.equal(lib.classifyImage(input).category,expected);
const alt=lib.imageSuggestion(row({category:'content',alt:'Alpine Lake'}));assert.equal(alt.name,'Alpine Lake.png');assert(alt.reviewRequired);assert.equal(alt.kind,'Alt text');
const uncertain=lib.imageSuggestion(row({category:'content',cardTitle:'Field Camera Kit',cardImages:2}));assert(uncertain.uncertain);assert.equal(uncertain.kind,'Nearby card title');
assert.equal(lib.imageSuggestion(row({category:'icon',alt:'Left navigation arrow'})),null);
assert.equal(lib.imageSuggestion(row({category:'content'})),null);assert.equal(lib.classifyImage(row({notVisible:true})).category,'review');
console.log('PASS: 19 visual classification and evidence-review assertions');})();
