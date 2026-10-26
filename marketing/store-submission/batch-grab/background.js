import { prepareJobs } from './lib.js';
const CONCURRENCY = 3;
let jobs = [];
let chain = Promise.resolve();
const save = () => chrome.storage.local.set({ jobs });
function reconcile(job, download) {
  if (!download) { job.status = 'interrupted'; job.error = 'Chrome no longer has this download record.'; return; }
  job.status = download.state;
  job.actualFilename = download.filename;
  job.error = download.error || '';
  job.finishedAt = download.endTime || '';
}
const ready = (async () => {
  jobs = (await chrome.storage.local.get('jobs')).jobs || [];
  for (const job of jobs) {
    if (job.status === 'starting') {
      job.status = 'interrupted';
      job.error = 'Download start could not be confirmed after worker restart. Check Downloads before retrying.';
    } else if (job.status === 'in_progress') {
      const [download] = await chrome.downloads.search({ id: job.downloadId });
      reconcile(job, download);
    }
  }
  await save();
})();
async function pump() {
  let active = jobs.filter(j => ['starting', 'in_progress'].includes(j.status)).length;
  for (const job of jobs) {
    if (active >= CONCURRENCY) break;
    if (job.status !== 'queued') continue;
    job.status = 'starting';
    active++;
    await save();
    // Do not hold the serialized state queue while Chrome resolves a network start.
    // Completion events for other jobs must remain free to reconcile and refill it.
    chrome.downloads.download({ url: job.url, filename: job.path, conflictAction: 'uniquify' }).then(
      downloadId => serial(async () => {
        job.downloadId = downloadId;
        const [download] = await chrome.downloads.search({ id: downloadId });
        reconcile(job, download); // Also catches completion before the ID callback.
        await save();
        await pump();
      }),
      error => serial(async () => {
        job.status = 'interrupted';
        job.error = error.message;
        await save();
        await pump();
      })
    );
  }
}
function serial(fn) {
  const result = chain.then(async () => { await ready; return fn(); });
  chain = result.catch(error => console.error('Batch Grab queue:', error));
  return result;
}
chrome.runtime.onMessage.addListener((message, sender, respond) => {
  if (sender.id !== chrome.runtime.id) return;
  serial(async () => {
    if (message.type === 'enqueue') {
      if (!Array.isArray(message.items) || !message.items.length || message.items.length > 500) throw new Error('Select between 1 and 500 files per batch.');
      if (jobs.filter(j => ['queued', 'starting', 'in_progress'].includes(j.status)).length + message.items.length > 1000) throw new Error('Queue limit reached. Wait for current downloads to finish.');
      const batchId = crypto.randomUUID();
      const occupied = jobs.filter(j => ['queued', 'starting', 'in_progress'].includes(j.status)).map(j => j.path);
      const added = prepareJobs(message.items, message.root, occupied).map(item => ({ ...item, id: crypto.randomUUID(), batchId, status: 'queued', createdAt: new Date().toISOString() }));
      jobs.push(...added);
      await save(); // Durable acknowledgement: popup may close immediately after the reply.
      await chrome.alarms.create('queue-reconcile', { periodInMinutes: 1 });
      await pump();
      return { batchId, accepted: added.length };
    }
    if (message.type === 'retry') {
      const old = jobs.find(j => j.id === message.id && j.status === 'interrupted' && !j.retried);
      if (!old) throw new Error('Only failed downloads can be retried once per attempt.');
      if (jobs.filter(j => ['queued', 'starting', 'in_progress'].includes(j.status)).length >= 1000) throw new Error('Queue limit reached.');
      jobs.push({ ...old, id: crypto.randomUUID(), status: 'queued', error: '', downloadId: undefined, actualFilename: '', finishedAt: '', createdAt: new Date().toISOString() });
      old.retried = true;
      await save();
      await pump();
    }
    if (message.type === 'clearFinished') { jobs = jobs.filter(j => ['queued', 'starting', 'in_progress'].includes(j.status)); await save(); }
    return { jobs };
  }).then(data => respond({ ok: true, ...data }), error => respond({ ok: false, error: error.message }));
  return true;
});
chrome.downloads.onChanged.addListener(delta => {
  serial(async () => {
    const job = jobs.find(j => j.downloadId === delta.id);
    if (!job) return;
    const [download] = await chrome.downloads.search({ id: delta.id });
    reconcile(job, download);
    await save();
    await pump();
  });
});
chrome.alarms.onAlarm.addListener(() => serial(async () => {
  for (const job of jobs.filter(j => j.status === 'in_progress')) {
    const [download] = await chrome.downloads.search({ id: job.downloadId });
    reconcile(job, download);
  }
  await save();
  await pump();
}));
serial(pump);
chrome.runtime.onStartup.addListener(() => serial(pump));
