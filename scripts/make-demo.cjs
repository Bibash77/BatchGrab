const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '../demo');
const groups = {
  'Finance and Governance': ['2025 Annual Report', '2025 Audited Financial Statements', '2026 Operating Budget', 'Q1 2026 Performance Review', 'Board Meeting Minutes - March 2026', '2025 Community Impact Report', '2026 Capital Investment Plan', '2025 Grant Funding Summary', '2026 Risk Register', '2025 Procurement Spend Review'],
  'Policies and Compliance': ['Information Security Policy v3', 'Supplier Code of Conduct 2026', 'Data Retention Schedule', 'Accessibility Statement 2026', 'Health and Safety Handbook', 'Privacy Notice - Customer Services', 'Business Continuity Plan 2026', 'Environmental Management Policy', 'Whistleblowing Procedure', 'Records Management Guidelines'],
  'Projects and Procurement': ['Riverside Library - Tender Specification', 'Riverside Library - Pricing Schedule', 'Community Hub - Site Survey', 'Community Hub - Design Brief', 'Transport Upgrade - Project Timeline', 'Transport Upgrade - Technical Drawings', 'Supplier Onboarding Checklist', 'Maintenance Contract - Service Levels', 'Tender Clarification Bulletin 02', 'Contract Award Notice - Facilities 2026']
};
function pdf(title) {
  const esc = s => s.replace(/[\\()]/g, '\\$&');
  const stream = `BT /F1 16 Tf 50 740 Td (${esc(title)}) Tj 0 -30 Td /F1 11 Tf (Fictional Batch Grab demonstration document. No real organization.) Tj ET`;
  const objs = ['<< /Type /Catalog /Pages 2 0 R >>', '<< /Type /Pages /Kids [3 0 R] /Count 1 >>', '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>', '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>', `<< /Length ${Buffer.byteLength(stream)} >>\nstream\n${stream}\nendstream`];
  let out = '%PDF-1.4\n', offsets = [0];
  objs.forEach((obj, i) => { offsets.push(Buffer.byteLength(out)); out += `${i + 1} 0 obj\n${obj}\nendobj\n`; });
  const xref = Buffer.byteLength(out);
  out += `xref\n0 6\n0000000000 65535 f \n${offsets.slice(1).map(n => String(n).padStart(10, '0') + ' 00000 n \n').join('')}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF\n`;
  return out;
}
fs.mkdirSync(path.join(root, 'files'), { recursive: true });
let rows = [], i = 0;
for (const [section, titles] of Object.entries(groups)) for (const [j, title] of titles.entries()) {
  const id = `d${String(++i).padStart(3, '0')}`;
  rows.push({ id, title, section, generic: j >= 5, href: `files/${id}.pdf`, expectedName: `${title}.pdf` });
  fs.writeFileSync(path.join(root, 'files', `${id}.pdf`), pdf(title));
}
fs.writeFileSync(path.join(root, 'data.json'), JSON.stringify(rows, null, 2));
function page(allDescriptive = false) {
  return `<!doctype html><html lang="en"><meta charset="utf-8"><title>Northbridge Community Trust — Document Library (demo)</title><style>body{font:16px/1.6 system-ui;max-width:960px;margin:40px auto;background:#f6f8fb;color:#17243a}header,section{background:white;padding:24px 32px;margin:20px 0;border-radius:12px}li{margin:14px 0}a{color:#2256c5}small{color:#59667a}h1{line-height:1.2}</style><header><small>FICTIONAL DEMONSTRATION · 30 valid PDF files</small><h1>Northbridge Community Trust<br>Document library</h1><p>Open Batch Grab, review names and folders, select all, then download. You can close its popup while the batch runs.</p><p>Some links have descriptive text; others say “Download PDF” beside a document label. The file URLs intentionally contain opaque IDs.</p><nav><a href="${allDescriptive ? 'index.html' : 'descriptive.html'}">${allDescriptive ? 'Mixed-label page' : 'All-descriptive control page'}</a> · <a href="edge-cases.html">Failure and naming checks</a></nav></header>${Object.keys(groups).map(section => `<section><h2>${section}</h2><ul>${rows.filter(r => r.section === section).map(r => `<li data-document><strong>${r.title}</strong><br><a type="application/pdf" href="${r.href}">${r.generic && !allDescriptive ? 'Download PDF' : r.title}</a> <small>· PDF · 1 KB</small></li>`).join('')}</ul></section>`).join('')}</html>`;
}
fs.writeFileSync(path.join(root, 'index.html'), page());
fs.writeFileSync(path.join(root, 'descriptive.html'), page(true));
fs.writeFileSync(path.join(root, 'edge-cases.html'), `<!doctype html><html lang="en"><meta charset="utf-8"><title>Batch Grab edge cases</title><body><h1>Explicit failure and naming checks</h1><section><h2>Safety checks</h2><ul>
<li><strong>Annual Review</strong> <a href="files/d001.pdf">Download PDF</a></li>
<li><strong>Annual Review</strong> <a href="files/d002.pdf">Download PDF</a></li>
<li><strong>CON</strong> <a href="files/d003.pdf">Download PDF</a></li>
<li><strong>Budget: East/West &lt;Draft&gt;?</strong> <a href="files/d004.pdf">Download PDF</a></li>
<li><strong>Extensionless Policy</strong> <a href="download/policy" download="policy.pdf">Download PDF</a></li>
<li><strong>Missing Report</strong> <a href="missing.pdf">Download PDF</a></li>
<li><strong>Temporary Failure</strong> <a href="flaky.pdf">Download PDF</a></li>
</ul></section><p><a href="index.html">Return to demo</a></p></body></html>`);
console.log('Created 30 valid PDFs, mixed/descriptive pages, edge cases, and expected-name data.');
