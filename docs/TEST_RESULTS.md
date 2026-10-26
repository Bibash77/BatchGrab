# Executed test results and reproduction

October 19, 2026. Chrome for Testing **156.0.8078.4**, installed Playwright 1.64.1 library, macOS. Tests load unpacked MV3 extensions in isolated temporary profiles. Native toolbar popups are opened using active-tab extension actions and driven through Playwright/CDP. No product mock, test-only host permission, paid-license bypass or new browser automation installation was used.

## Baseline and final acceptance

The unchanged 0.3.0 build first passed 23 naming/safety/filter assertions, 19 classification/review assertions and five controlled cases. It is retained as the original ZIP for discovery comparisons. Final 0.3.1 helper tests also passed all **42** assertions.

| Executed suite | Final observed result | Artifact |
|---|---|---|
| Existing controlled browser regression | **5/5 passed**: gallery, small catalogue, 5,000 images, 30 PDFs, edge failures/retry | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-beta.json>) |
| Expanded discovery/output/privacy | **Passed**: old/new/extended URL sets, duplicate dedup, dynamic rescan, frame/shadow bounds, visible evidence retained, source export, Japanese PDF, CSV/XLSX bytes, no unexpected recorded context requests | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-discovery.json>) |
| Actual worker interruption | **Passed**: 120/120 files, pending queue during stop, popup destroyed, worker restarted, exact actual paths/bytes, no duplicate Chrome download records | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-lifecycle.json>) |
| Public smoke tests | **3/3 passed**: NASA, Books to Scrape, IRS; real output name + header + completed record | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-public.json>) |
| Repeated secondary/free comparators | **3/3 supported download paths verified**: Imageye PNG pixels; SMD and DTA PNG/PDF bytes | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-competitors.json>) |
| SMD full document naming comparison | **30/30 bytes completed**, saved Link text mask, 15/30 intended names versus Batch Grab 30/30 | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-smd-documents.json>) |
| Primary competitors | BFD: five fixture scans, two exact file downloads and 50-free gate observed. Image-list tool: five scans, task handoff/trial UI observed; output execution **unverified** | [results + separate limitations](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/final-primary.json>) |
| Exact Scribd discovery | Same fresh tab; stable main anchor/image URL sets; BFD 186 URLs all represented in Batch Grab; no protected-document download | [results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-scribd.json>) |

Final 5,000-image scan/open/draft readiness was **1256 ms**, next-page update **7.9 ms**, search **208.6 ms** in this run. At most 60 cards rendered; selecting 5,000 disabled Download and selecting one page chose 60. These are single-run machine diagnostics with automation/debounce overhead, not human speed, memory, percentile or competitor superiority measurements.

The original gallery completes 8 files after closing the popup with queued work; reviewed PNG names and duplicate suffixes match. All 30 document names and section paths match independently generated fixture data. Edge case initial outcome is 5 complete / 2 failed; temporary failure retry yields a sixth completion and one unresolved missing file. Error text and the retried-attempt summary are asserted. Chrome uniquify is enabled; disk files aren't overwritten.

New output checks compare actual on-disk bytes to fixture source bytes, not merely button clicks or accepted enqueue responses. The source-index CSV itself is located via Chrome's completed record and read from disk. Japanese names, quoting/formula-leading text and BOM/Unicode output are covered. The XLSX is a genuine small workbook ZIP fixture, not renamed HTML.

## Exact commands

Run from the project parent directory shown in the file links, using existing dependencies:

```sh
node batch-grab/scripts/make-demo.cjs
node batch-grab/scripts/make-visual-demo.cjs
node batch-grab/scripts/make-discovery-demo.cjs
node batch-grab/tests/naming.cjs
node batch-grab/tests/visual-logic.cjs
node batch-grab/scripts/build.cjs
node batch-grab/tests/verify-visual.cjs
node batch-grab/tests/verify-discovery.cjs
node batch-grab/tests/verify-lifecycle.cjs
node batch-grab/tests/public-pages.cjs
node batch-grab/tests/compare-visual.cjs
node batch-grab/tests/benchmark-smd-documents.cjs
node batch-grab/tests/benchmark-primary.cjs
node batch-grab/tests/benchmark-scribd.cjs
```

The committed/generated demo already includes `reports.xlsx`; make-discovery-demo regenerates the HTML/CSV, leaving that workbook intact. Browser tests start ephemeral local fixture servers. Restricted environments may require approval to launch Chrome/connect to public sites. No package installation is needed on this configured workspace. Competitor benchmarks need the unchanged published packages extracted under `/private/tmp/batch-grab-comparison/bfd`, `biul`, `simple-mass-downloader`, `imageye`, `dta`; packages are not redistributed. Their recorded versions are in comparison outputs. PNG pixel-equivalence uses the already installed Python/Pillow; product runtime does not.

The CLI skill was used with the established repository fallback: installed Playwright library/CDP because the CLI package was unavailable in the offline cache and native toolbar popups require special targeting. Historic `verify-beta.cjs` uses 0.2 selectors and is not the current acceptance suite. Root `npm test` remains an unrelated placeholder; do not report it as a passed test.

## Real screenshots

[Visual picker and selected names](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/gallery-picker.png>) · [Assets separated](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/site-assets-separated.png>) · [Additional discovery candidates in Review](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/discovery-review.png>) · [Source-index action and actual outcomes](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/source-index-outcomes.png>) · [120-file recovery outcomes](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/lifecycle-120-completed.png>) · [SMD Link text mask](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/smd-document-text-mask.png>) · [BFD free/Pro batch prompt](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/primary-bfd-batch-limit.png>) · [BFD Scribd scan](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/scribd-bfd.png>) · [Batch Grab same-page scan](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/scribd-batch-grab.png>).

Public page and competitor screenshots are in the same evidence directory; run-specific downloaded files and JSON remain in subdirectories. The directory name `visual-v0.3` is retained for test compatibility even though current manifest is 0.3.1.

## Failed attempts and honest boundaries

Earlier attempts are retained. A large draft exceeded its cache threshold after adding metadata; product compaction fixed it and the full suite passed. A recovery harness initially waited for three simultaneously in-progress IDs on files that completed too quickly; a streaming fixture now provides a real interruptible transfer. Another harness compared the stress fixture to `001.png` instead of the actual `006.png`; it now uses each job's actual source pathname. Assertions still require exact source bytes and 120 completions.

SMD's first mask test read the changed input before its async output setting saved, producing original filenames; after waiting for the supported setting, 15 correct descriptive names were observed. The final report uses the latter fair comparison. BFD popup closure is handled as normal behavior. Its 5,000-row virtual-list walk exceeded a CDP request timeout; large count/gate are observed but a complete 5,000-URL BFD set is not claimed.

The image-list tool's side-panel-to-Pipeline transition worked, but overlays/intercepted clicks blocked automated completion. No force-click, license-state edits or paid-feature unlocking was used. It remains unknown whether the desired download succeeds through a fully operated Basic/Trial task. Do not classify those harness failures as a competitor defect or claim a completed spreadsheet/ZIP test.

No paid competitor features, end-to-end combined multi-page downloads, spreadsheet URL/name pairing, every import variant, OS shutdown/suspend, browser-wide traffic audit, peak memory/endurance or real-customer usability/conversion study was certified. The privacy test recorded local fixture context requests plus actual manifest permissions; ordinary previews/downloads still contact their source hosts. Complete means Chrome saved a response; runtime does not validate its contents.

## Build

Install [the unpacked beta folder](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/dist/batch-grab-beta>) or unzip [0.3.1 release ZIP](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/dist/batch-grab-0.3.1-beta.zip>). Load the folder containing manifest.json through `chrome://extensions` → Developer mode → Load unpacked; reload/disable older duplicate installs and verify header **beta 0.3.1**. This is not a signed CRX/store release. The whitelist contains only six runtime files. [Build SHA-256 manifest](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/dist/build.json>) records runtime and ZIP hashes; final delivery verification compares source/unpacked files and archive contents.

Local demo: [gallery](http://127.0.0.1:8767/gallery.html), [30 PDFs](http://127.0.0.1:8767/index.html), [discovery fixture](http://127.0.0.1:8767/discovery.html). Restart with `PORT=8767 node batch-grab/scripts/demo-server.cjs` if needed. No payments are implemented. The commercial decision is CONDITIONAL GO, subject to real-task and retained-purchase evidence.
