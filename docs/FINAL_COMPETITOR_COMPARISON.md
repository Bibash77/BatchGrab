# Batch Grab: final competitive comparison

Observed October 19, 2026. Batch Grab 0.3.1; Chrome for Testing 156.0.8078.4 on macOS. This is a bounded comparison, not a claim of general superiority. No competitor package was changed, paid access bypassed, account created or purchase made.

## Evidence convention

**V — VERIFIED BY BROWSER TEST**: the specified observed behavior/output, not the entire feature family.
**D — VERIFIED BY OFFICIAL DOCUMENTATION**: the publisher documents the capability; execution, quality and paid access are unverified unless separately marked V.
**R — USER-REPORTED**: an individual report, not reproduced and not a prevalence estimate.
**A — ADVERTISED BUT UNVERIFIED**: marketing/visible upgrade promise without an exercised workflow.
**U — UNKNOWN**: not established. “Not implemented” for Batch Grab is a code finding, not a competitor inference.

## Reproducible current observations

| Product | Tested version | Observed free path | Actual file verification |
|---|---|---|---|
| Batch Grab | 0.3.1 | V: content/document cards, separate assets, explicit proposed-name acceptance, background queue | V: gallery 8/8; document fixture 30/30; three-format fixture 3/3; 120-file worker-recovery batch 120/120, all expected source bytes |
| Bulk File Downloader | 1.1.0 | V: gallery initially 7 images + 2 PDFs; tiny-assets toggle exposes 13 total resource URLs. One pixel URL is omitted. Previews, dimensions, search, folder output and Pro prompts work | V: same PNG and PDF completed, byte-identical, under `North Coast/001.png` and `North Coast/d001.pdf` |
| Bulk Image Downloader From URL List | 3.3.0 | V: unsigned side-panel current-page scan, 12 gallery images, 12 catalogue images; creates a 12-URL Pipeline task | U: actual downloaded bytes/names. A trial/task-limit overlay and overlapping layout selection prevented completion of automated task execution; this is an automation limitation, not proof that downloading is broken |
| Original Simple Mass Downloader | 0.906 | V: page scan, gallery, width/height filters; link-text mask; fully functioning free downloader | V: same PNG/PDF byte-identical; separate 30-PDF naming test completed all files |
| Imageye (secondary) | 7.3.5 | V: 11 gallery images, previews, sizes, selection; tiny pixel omitted | V: same PNG pixels/dimensions, different PNG encoding and generated filename; documents not exercised in its image picker |
| DownThemAll (secondary) | 4.16.1 | V: Links and Media selectors, source labels and selection | V: same PNG and PDF completed with source bytes intact |

On the 12-image controlled gallery, Batch Grab's default has six content images and two documents; six assets remain accessible separately. Bulk File Downloader also hides small assets by default, so “only Batch Grab hides icons” would be false. Simple Mass Downloader's existing dimension filters reached the same six large images. The catalogue's small labelled product images need context rather than a universal minimum-size rule.

## Consolidated capability matrix

P0 = correctness; P1 = reasonable category expectation; P2 = possible paid workflow value; P3 = defer. Classes describe our priorities, not whether competing vendors charge.

| Capability / priority | Batch Grab 0.3.1 | Bulk File Downloader | Bulk Image Downloader URL List | Original SMD |
|---|---|---|---|---|
| Current-page scanning — P1 | V: images, anchors, documents | V: mixed resources | V: image scanning | V: page resources |
| Multi-page collection — P1, later | Not implemented; scan separately | D/A: linked-page Pro crawl, not exercised | V: list/depth/delay/stack controls visible; D: combined scans; execution U | D: active/all/left/right tabs, not executed here |
| Discovery coverage — P0 | V: explicit fixture URL set; extended candidates reviewable | V: fixture URL set, broad mixed discovery | V: fixture image sets; returned 2,000 from 5,000-image page in tested scan | V: gallery image set; D: open shadow roots, dynamic limitations |
| Useful prioritization — P1 | V: context categories and separate Review | V: tiny-assets toggle and ordering | V: dimension/domain/filter controls; filtering quality U | V: dimensions reduce gallery 12 to 6 |
| Previews — P1 | V: lazy, 60 cards/page | V: preview rows, virtual list | V: result/table/thumbnail controls; side-panel grid stayed empty in task attempt | V: visual gallery |
| Filename intelligence — P2 | V: nearby labels, sections; alt/caption/metadata review | D/A: Pro templates/CSV mappings; no contextual advantage established | D: filename constructor/lists; pairing accuracy U | V: link-text mask; D: alt/title/URL masks and batch rename |
| Folder organization — P1 | V: editable root/section folders | V: page-derived batch folder; D: Pro naming controls | D: task/domain/URL folders | D: favorite/automatic folders and masks |
| CSV / URL import — P1 for list-first segment | Not implemented | D/A: Pro list/CSV | V: paste field and task handoff; D: CSV task import Pro | D: clipboard/local files; paired filename CSV U |
| ZIP — P3 for this experiment | Not implemented | A/D: Pro | D: task ZIP | U; do not infer absent |
| Conversion/resizing — P3 | Not implemented; preserves bytes | U | D: local JPEG/WebP/PNG, resize, EXIF/watermark | U |
| Duplicates — P0 exact; P3 perceptual | V: exact URL dedup, safe duplicate output names; no pixel/CDN dedup | V: URL list exposure; D/A: variants grouped in tool, general accuracy U | D: exact URL and Pro perceptual checks; execution U | D: collected resources; pixel/CDN behavior U |
| Recovery — P0 | V: actual errors, manual retries, popup closure, worker restart | V: two completed files; A/D: Pro auto-retry | D: guide says failed rows must be rerun; landing page claims retries, conflict unresolved | D: pause/resume/retry; gallery/doc completion V |
| Saved tasks — P2 only if recurring | V: one page draft and local history; no named task library | U beyond observed queue/history | V: saved scan records and Pipeline task; D: task export/import | D: saved options; reusable task semantics U |
| Source reports — P2 candidate | V: source URL + actual path/status/error CSV | U | D: CSV task/result exports, ZIP report; exact handoff parity U | D: selected-link export; actual-path/status audit parity U |
| Privacy — P0 | V: no granted persistent origins; fixture request log; local source index | V: permissions API; D: privacy statements conflict with current license page | V: cookies/tabs and broad origins granted in package profile; D: account for Pro/AI, local ordinary tasks | D: store declares no collection; not independently audited |
| Ease of use — P1 | V: initial triage and visible download button | V: compact list; downloads close popup into outcomes | V: task creation changes side-panel to multi-step Pipeline | V: more controls, supported masks; human learnability U |
| Free limits — P1 clarity | V: 500/batch, 1,000 pending, 10,000 scan cap, 60 rendered | V: 5,000 selection triggers first-50-free / Pro gate | V: trial UI says one URL/run; Basic free mode offered; actual Basic limits U | D: no paid tier listed; not a verified infinite batch guarantee |
| Premium price | $5 proposed; no gate/payment | V/D: $9 once; +$2.99 Turbo advertised | D: timed passes below | No paid price found in current official sources |

## Price and terms evidence

Bulk File Downloader's [current home/pricing](https://bulkfiledownloads.com/) and observed upgrade panel offer $9 one-time Pro, plus optional $2.99 Turbo. CSV rename/import, linked pages, ZIP and auto-retry remain unexercised paid promises. Its [older landing page](https://bulkfiledownloads.com/batch-link-downloader) still says no premium, crawling or ZIP, and its [privacy policy](https://bulkfiledownloads.com/privacy) says no local storage/servers. Those statements conflict with current pricing/license documentation and observed local queue storage. Prefer current UI for the offer; do not assert a completed privacy audit.

The image-list competitor's [shop](https://bulkimagedownloaderurllist.com/shop/) lists $1.99 day, $4.99 week, $9.99 month, $24.99 three months, $39.99 six months and $64.99 year. These are advertised term prices, not verified purchases. Automatic renewal, taxes, refunds and final checkout totals are UNKNOWN. Its [guide](https://bulkimagedownloaderurllist.com/bulk-image-downloader-from-url-list-a-chrome-extension-guide/) distinguishes Basic Free from Try PRO (one URL/task run); its [landing page](https://bulkimagedownloaderurllist.com/) and [store listing](https://chromewebstore.google.com/detail/bulk-image-downloader-fro/kekkjfalendfifgchoceceoahjnejmgf) disagree about some limits and retries. No account was used. AI Studio is a separate optional account service; it is not needed for ordinary downloading according to the publisher.

[Original SMD FAQ](https://gelprec.github.io/faq.html), [quick start](https://gelprec.github.io/quick_start_v2.html) and [current listing](https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed) show an active MV3 free competitor. It has not “died.” Store user counts are adoption snapshots, not purchasers or revenue, and do not support a revenue projection.

## Real complaint evidence and commercial consequence

R: [DownThemAll #594](https://github.com/downthemall/downthemall/issues/594) describes unwanted `unnamed.png` output; R: [#622](https://github.com/downthemall/downthemall/issues/622) asks for incomplete/missing-file recovery. Neither was reproduced as a current competitor defect. D: SMD's own FAQ explains generic filenames, link-text masks and inaccessible dynamically generated originals. These support testing naming/reconciliation jobs, not declaring a market gap or willingness to pay.

## Evidence files and boundaries

[Consolidated primary comparator results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/final-primary.json>) retains completed scan observations and separate failed automation attempts. [Repeated SMD/Imageye/DownThemAll downloads](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-competitors.json>); [Fair SMD link-text naming test](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-smd-documents.json>). Run-specific files contain URLs, real output paths and bytes. Screenshots: `primary-bfd-gallery.png`, `primary-bfd-batch-limit.png`, `primary-biul-gallery.png`, and the Pipeline screenshot in the primary run directory.

No controlled human time study, paid-feature execution, subscription purchase, account privacy audit, whole-site benchmark or conversion measurement occurred. Screens with a feature name do not prove that feature works. Capabilities not exercised remain D/A/U even when a competitor has a sophisticated UI.
