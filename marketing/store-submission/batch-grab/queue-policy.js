// Queue storage is local only. Preserve pending jobs; expire settled attempts.
export const isPending = job => ['queued','starting','in_progress'].includes(job.status);
export function trimHistory(jobs, now = Date.now()) {
  const settled = jobs.filter(j => !isPending(j) && now - Date.parse(j.finishedAt || j.createdAt || 0) < 30 * 86400000).slice(-500);
  const keep = new Set(settled);
  return jobs.filter(j => isPending(j) || keep.has(j));
}
export function minimalItem(item) {
  if (!item || typeof item.url !== 'string' || item.url.length > 8192) throw Error('Invalid or overly long download URL.');
  const url = new URL(item.url);
  if (!/^https?:$/.test(url.protocol) || url.username || url.password) throw Error('Use an HTTP(S) download URL without embedded credentials.');
  let source = '';
  if (typeof item.source === 'string' && item.source.length <= 8192) {
    try { const s = new URL(item.source); if (/^https?:$/.test(s.protocol) && !s.username && !s.password) source = s.href; } catch {}
  }
  return {url:url.href, source, name:String(item.name || '').slice(0,400), ext:String(item.ext || '').slice(0,8), folder:String(item.folder || '').slice(0,1000)};
}
export function ensureQueueBudget(jobs) {
  if (new TextEncoder().encode(JSON.stringify(jobs)).length > 4000000) throw Error('Queue storage limit reached. Clear finished history or use a smaller batch.');
}
