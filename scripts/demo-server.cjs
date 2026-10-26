const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
function createDemoServer({ delayMs = 120, streamMs = 0 } = {}) {
  const root = path.resolve(__dirname, '../demo');
  let flaky = 0;
  return http.createServer((req, res) => {
    const url = new URL(req.url, 'http://localhost');
    let pathname = decodeURIComponent(url.pathname);
    if (pathname === '/') pathname = '/index.html';
    if (pathname === '/missing.pdf') { res.writeHead(404); res.end('Intentionally missing PDF'); return; }
    if (pathname === '/flaky.pdf' && flaky++ === 0) { res.writeHead(503); res.end('Intentional temporary failure'); return; }
    if (pathname === '/flaky.pdf' || pathname === '/download/policy') pathname = '/files/d001.pdf';
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep)) { res.writeHead(403); res.end(); return; }
    fs.readFile(file, (error, bytes) => {
      if (error) { res.writeHead(404); res.end(); return; }
      const ext = path.extname(file);
      const send = () => { res.writeHead(200, { 'Cache-Control': 'no-store', 'Content-Type': ext === '.csv' ? 'text/csv; charset=utf-8' : ext === '.xlsx' ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' : ext === '.pdf' ? 'application/pdf' : ext === '.json' ? 'application/json' : ext === '.png' ? 'image/png' : ext === '.svg' ? 'image/svg+xml' : 'text/html; charset=utf-8', ...(ext === '.pdf' ? { 'Content-Disposition': `attachment; filename="${path.basename(file)}"` } : {}) }); if (streamMs && ['.png','.pdf'].includes(ext)) { res.write(bytes.subarray(0,8)); setTimeout(()=>res.end(bytes.subarray(8)),streamMs); } else res.end(bytes); };
      if (['.pdf','.png','.svg'].includes(ext)) setTimeout(send, delayMs); else send();
    });
  });
}
module.exports = { createDemoServer };
if (require.main === module) { const server = createDemoServer(); server.listen(Number(process.env.PORT || 8765), '127.0.0.1', () => console.log(`Demo ready: http://127.0.0.1:${server.address().port}`)); }
