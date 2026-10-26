# Batch Grab 0.4.0

**Website and free beta:** [project-m1fyy.vercel.app](https://project-m1fyy.vercel.app/) · [Install instructions](https://project-m1fyy.vercel.app/beta.html). Chrome Web Store review/publication is still pending.

[日本語](README-JA.md) · [Public launch status](LAUNCH_STATUS.md)

A free, local-first Chrome extension for collecting useful webpage images and organizing web documents. English and Japanese UI. No account, payments, AI service or extension telemetry.

## Install the beta

Download `dist/batch-grab-0.4.0-beta.zip`, unzip it, open `chrome://extensions`, enable Developer mode and **Load unpacked** the folder containing `manifest.json`. Alternatively load `dist/batch-grab-beta/`. This is not a store-approved release. The production submission ZIP is `dist/batch-grab-0.4.0-production.zip`.

Open a normal HTTP(S) webpage → click Batch Grab → preview/select images or documents → **Download Selected** → inspect results. Wait for the jobs-saved confirmation before closing the popup, and keep Chrome running. Switch English/日本語 from the header. First-run guidance can be dismissed.

Suggested separates likely content from site assets; Images, Documents, Review and All files keep other candidates accessible. Image cards show previews, dimensions when known, source hosts and reviewable name suggestions. Details & name lets you edit names. Options preserves filters, regex, templates, folders, extended discovery and final path previews. Export source/outcome CSV is an advanced local action.

## Demo and development

From this repository root:

```sh
node scripts/demo-server.cjs
# Open the printed localhost URL; gallery.html, catalogue.html and index.html are useful starting pages.
node scripts/build.cjs
npm test
npm run test:browser
node marketing/scripts/build-site.cjs
node marketing/scripts/verify-site.cjs
node marketing/scripts/serve.cjs
```

Browser tests use Playwright 1.64.1 and Chrome for Testing with extension debugging/CDP support. Dependencies are development-only; the extension itself needs none. Existing browser tests were retained, with separate security, locale and storage-failure coverage. Reinstall dev dependencies if working from a fresh clone; browser availability must be configured locally. No competitor packages are distributed.

## Limits and data

Only resources exposed on the current HTTP(S) page: document/image links, responsive candidates, common lazy attributes, open shadow roots and accessible same-origin frames. Optional CSS backgrounds and loaded image resources appear as uncertain candidates. No protected-content bypass, cross-origin-frame access, closed shadows, crawling, automatic scrolling, document-content understanding, ZIP conversion or streaming-video capture.

Classification and naming use heuristics. Review ambiguous associations. “Completed” means Chrome saved a response, not that its contents were validated. Full browser shutdown and OS suspension recovery are not certified.

Limits: 500 files per batch, 1,000 pending jobs, 10,000 scan results, 60 rendered cards per page; traversal limits remain bounded. Drafts above 2 MB are not cached; they rescan on reopening. Queue metadata is bounded at 4 MB. Completed/failed history is capped at 500 attempts and 30 days, pruned during queue activity/startup; pending jobs remain. Options → Clear saved scan and Clear finished history give local deletion controls. Uninstall does not delete downloaded/exported files or Chrome's own download records.

Preview images and downloads contact source hosts. Local URLs, labels and paths may contain sensitive information. Review exported CSV before sharing. No Batch Grab backend or extension analytics exists.

## Launch material

- [Release report](docs/RELEASE_0.4.0.md)
- [Security audit and permissions](docs/SECURITY_AND_PRIVACY.md)
- [Free-first marketing plan](marketing/MARKETING_PLAN.md)
- [Owner launch checklist](marketing/LAUNCH_CHECKLIST.md)
- [Activation and retention definitions](marketing/MEASUREMENT_PLAN.md)
- [Store listing](marketing/CHROME_STORE_LISTING.md)

The website is prepared for static Vercel hosting via `vercel.json`. It remains preview/noindex until the owner approves production/privacy details and supplies the real public origin. Chrome Store CTAs require a verified real listing URL; otherwise the ZIP beta is offered honestly. No store submission, deployment, outreach, adoption or revenue is implied by this repository.

Historical 0.3.x builds and reports are retained as historical evidence, not the current offer. The earlier $5 experiment is superseded by the free launch.
