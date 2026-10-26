# Batch Grab 0.3.1 — Visual picker beta

A working local Chrome extension for selecting useful images and documents, reviewing names, and tracking actual downloads. No payments, account system, AI API or telemetry. The UI changes are not evidence of willingness to pay.

## Install or update

1. Unzip `dist/batch-grab-0.3.1-beta.zip`, or use the existing `dist/batch-grab-beta` folder.
2. Open `chrome://extensions`, enable Developer mode, choose **Load unpacked**, and select the folder containing `manifest.json`.
3. If that exact unpacked folder is already loaded, click **Reload** on its extension card. Disable older duplicate installations.
4. Confirm the popup header says **Visual picker · beta 0.3.1**. This is an unpacked beta, not a signed/store-approved release.

## The primary workflow

Open a normal webpage, then click Batch Grab. **Suggested** shows likely content images and documents. **Images** shows all detected images, **Documents** isolates documents, **Review** exposes uncertain/hidden images, **Site assets** collects likely logos/icons/thumbnails/decorations, and **All files** preserves the original full scanner output.

Cards show previews, labels, current filenames, dimensions when known, and source hosts. Select the files you want, then use the always-visible **Download Selected** action. **Select matching** applies to every result in the current filtered view; **Select this page** selects up to 60 cards. Changing views/filters removes selections that no longer match. The 500-file batch limit is explicit; a larger selection disables download.

Open **Details & name** on a card to inspect its source and edit the filename. Image-name proposals explain their evidence: alt text, figure caption, image title, exact image-associated metadata, or nearby card title. **Use this name** is an explicit acceptance action. Uncertain associations are labelled “Possible”/“uncertain association”; no page-wide title is applied indiscriminately to every image.

**Options** holds the original file-type filters, minimum image width, regex filter, filename templates, root folder, per-card subfolders and final-path preview. Existing templates support `{n} {name} {ext} {host} {date}`. Document naming from visible link text/nearby labels remains available. Existing disk files are preserved with Chrome's uniquify behavior; actual saved paths appear in outcomes.

Download outcomes includes **Export source & outcome CSV**: a local spreadsheet-safe index of original pages/URLs, requested and actual saved paths, statuses and failures. It can contain private source tokens; export it only when appropriate. No upload occurs.

The background queue persists acceptance and tracks Chrome download IDs/completion/errors independently of the popup. Close and reopen the popup after starting a batch; keep Chrome running. Failed attempts can be retried. The summary distinguishes unresolved failures from attempts already retried. “Completed” means Chrome saved the response, not that the response contents were validated.

## Live demonstration

The updated demo was started at **http://127.0.0.1:8766/gallery.html**. To start it again from the project parent directory:

```sh
PORT=8766 node batch-grab/scripts/demo-server.cjs
```

Pages:

- `/gallery.html`: six generated content images (including a large SVG diagram), six site assets, two PDFs, and reviewable image names.
- `/catalogue.html`: twelve small product photos that should remain discoverable because their cards provide context.
- `/large-gallery.html`: 5,000 distinct image URLs for pagination/search testing.
- `/index.html`: the original 30-PDF document demonstration.
- `/discovery.html`: responsive/lazy sources, CSS background, detached loaded image, open shadow DOM, same-origin and blocked frames, Japanese PDF, CSV and XLSX links.
- `/edge-cases.html`: duplicate/unsafe names, extensionless PDF hints, missing/temporary failures and retry.

The ZIP `dist/batch-grab-demo.zip` includes these pages, generated PNG/SVG/PDF assets and the server. It contains no competitor extension or public-site downloads. In an extracted demo ZIP, run `PORT=8766 node scripts/demo-server.cjs`.

The current delivery reports are in `docs/`, starting with `FINAL_FEATURE_STRATEGY.md` and `TEST_RESULTS.md`. `VISUAL-BETA-RESULTS.md` retains the 0.3.0 snapshot. The previous `BETA-RESULTS.md` documents the older 0.2 release.

## Rebuild and reproduce

From the project parent directory, using the existing Node/Playwright dependencies:

```sh
node batch-grab/scripts/make-demo.cjs
node batch-grab/scripts/make-visual-demo.cjs
node batch-grab/scripts/make-discovery-demo.cjs
node batch-grab/tests/naming.cjs
node batch-grab/tests/visual-logic.cjs
node batch-grab/scripts/build.cjs
node batch-grab/tests/verify-visual.cjs
node batch-grab/tests/public-pages.cjs
node batch-grab/tests/compare-visual.cjs
node batch-grab/tests/verify-discovery.cjs
node batch-grab/tests/verify-lifecycle.cjs
node batch-grab/tests/benchmark-smd-documents.cjs
node batch-grab/tests/benchmark-primary.cjs
node batch-grab/tests/benchmark-scribd.cjs
```

`verify-visual.cjs` is the current browser acceptance suite; `verify-beta.cjs` retains the historical 0.2 selectors and is not the current suite. Testing uses Playwright's CDP API for real toolbar popups (not ordinary tabs), active-tab actions, isolated profiles and native Chrome download preferences. Tested on macOS with Chrome for Testing **156.0.8078.4**. The installed Playwright CLI was unavailable in the offline cache, so the existing Playwright library was used; no new automation package was installed.

Competitor testing expects unmodified published builds extracted under `/private/tmp/batch-grab-comparison/imageye`, `simple-mass-downloader`, and `dta`; they are not distributed here. PNG pixel-equivalence checks in the comparison script use the already available Python/Pillow. Product runtime has no Python dependency. Comparison output differentiates a byte-identical download from a re-encoded but pixel-identical PNG.

Each acceptance/public/comparison run gets a new directory under `output/playwright/visual-v0.3`. The `latest-*.json` pointers summarize the latest respective runs; prior attempts remain separate. Screenshots at that directory's top level show the latest matching workflow. Temporary browser profiles live under the system temporary directory.

## Limits

Classification uses filenames, labels, dimensions and DOM context, not semantic image recognition. A large unlabelled logo can be misclassified; a useful small unlabelled image can land in Site assets. Review/Images/All files keep uncertain assets accessible. Hidden images are not equated with decorative images.

The scanner reads HTTP(S) DOM resources, currentSrc, common lazy attributes, ordinary srcset/picture candidates, open shadow roots, accessible same-origin frames, document links and bounded JSON-LD metadata. Options can include computed CSS backgrounds and already-loaded image resource entries, with uncertain candidates in Review. It does not automatically scroll, combine pages, evaluate arbitrary page scripts, access closed shadows/cross-origin frames, or download streaming video. Mixed data-URL srcsets and complex comma-containing candidate URLs are not fully supported. Some unloaded images will need scrolling and a rescan. Unknown source dimensions/formats are not invented; image URLs without a known original extension can retain an extensionless name.

There is a 10,000 combined-result scan limit, 60 rendered cards per page, 500 files per batch and 1,000 pending jobs. Scans over the 4 MB draft-cache threshold are rescanned on reopening; queued jobs are still stored separately. Discovery traversal is bounded to 80 roots and 50,000 inspected elements; extended CSS scanning is bounded to 20,000 elements per root, with limit warnings. History/drafts persist locally until cleared/uninstalled. Clearing extension data loses them. An actual worker stop/restart with 120 files and popup closure passed. Browser shutdown/suspend recovery and non-Chrome browsers remain uncertified.

Permissions remain activeTab, scripting, downloads, storage and alarms. No broad host permission, clipboard access, cloud proxy or external naming service was added.

## Repository layout and launch materials

This repository contains the extension at its root. Commands above originally run from the project parent can be run from this repository by removing the `batch-grab/` prefix (for example, `node tests/naming.cjs`).

The prepared marketing website, launch checklist, channel shortlist and content drafts are in [`marketing/`](marketing/README.md). The website remains in preview mode; pushing this repository does not deploy it or activate payments. Test browser profiles and downloaded output are excluded. Verification reports describe prior runs; browser tests require a local Playwright installation and Chrome for Testing. Marketing screenshot regeneration uses the original local evidence output; prepared website screenshots and archives are included.
