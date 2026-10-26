# Reproducible customer-workflow benchmark

October 19, 2026. These are engineering measurements, not observed customer behavior, synthetic purchase scores or revenue predictions. No recruited user or manual usability study took place. All locally generated fixture assets are permitted test content. Public smoke tests saved only one selected file per site.

## A. Product image collection

`gallery.html`: 12 image URLs, six authored as content, six as site assets, plus two PDFs. This ground truth tests our intended triage and is not a random sample of websites.

| Tool | Relevant image coverage | Irrelevant display / configuration | Names and real output |
|---|---|---|---|
| Batch Grab 0.3.1 | All 6 content images, default Suggested also includes 2 documents | 0 of the 6 authored image assets in Suggested; assets retained separately | Explicit review accepts Alpine name and two uncertain card-view names; 8 selected files complete, exact bytes and safe duplicate suffix |
| Bulk File Downloader 1.1.0 | All 6 in initial 7-image result | Initial list also contains banner; tiny toggle exposes 13 total files incl. 2 PDFs | Same target PNG and PDF downloaded byte-identically with original names in page folder |
| Image-list tool 3.3.0 | 12 gallery images scanned | All 6 assets included in collected set; filters visible, not fairly tuned | 12 URLs transferred into Pipeline; output execution unverified |
| SMD 0.906 | All 12 in gallery, then same 6 large images | Two configured min-dimension values (300 × 160) remove authored small assets | Same PNG and PDF completed byte-identically. Masks are available free |

Small catalogue: all 12 labelled small product photos stayed Suggested in Batch Grab. BFD and image-list scans each returned 12. No distinct image-resolution advantage was established here. On [Books to Scrape](https://books.toscrape.com/), Batch Grab found 20 content photos and saved `A Light in the Attic.jpg`, 9,876 bytes, valid JPEG. Competitors were not run on this public catalogue in this phase.

### Time and interactions

Primary comparator scan-ready timings are per-run automation diagnostics including popup/scanner waits: BFD roughly 0.3–0.4 s; image-list tool roughly 1.0–1.3 s. They are not comparable human task times. Native popup versus side-panel initialization, polling and warm-up differ. No speed ranking follows.

The one-file download path in the scripts uses BFD search → select row → download. SMD uses Load page links → gallery → width → height → select → download. Batch Grab's existing-default file selection → download is two actions, with two additional name-review actions if accepting a proposal. Opening the extension adds an action for every tool. These are scripted paths, not minimum human click counts; SMD supports direct selection without gallery/size filtering and all tools can have shortcuts. A fair real-user trial must measure setup, review, saving and cleanup together.

## B. Multi-page collection

Batch Grab still replaces the current page draft on rescan and does not combine results from several pages. It can perform separate batches, retain their download history and export their sources, but it has no combined pre-download collection. This is a real limitation; no “multi-page” feature was fabricated by opening tabs in automation.

SMD documents an existing all/left/right/selected-tabs scanner; BFD offers linked-page crawling as Pro; the image-list tool exposes page-list, delay, depth, continuous and append controls. Their multi-page completion, duplicate handling and total interactions were not executed end to end here. Thus no completion percentage or time saving is reported for workflow B. Competitor paid access and side-panel task-flow automation limit the comparison. Adding a crawler before real customers need it would increase permission, pacing and support complexity.

Real-user protocol: choose three user-authorized catalogue pages with known overlapping images; identify a ground-truth unique set first; run SMD's tabs scan, the image-list tool's supported list scan and separate Batch Grab batches; log missing/extra URL sets, naming corrections and actual completed files. This is an outstanding validation, not a passed test.

## C. Document collection: implemented advantage and its boundary

Same authored 30-PDF page, half with descriptive link text, half with generic “Download PDF” and a descriptive nearby label.

| Tool and configuration | Files completed | Intended descriptive basenames | Intended section folders |
|---|---:|---:|---:|
| Batch Grab, existing contextual suggestions | 30/30 | 30/30 | 30/30 across 3 sections |
| Original SMD, Link text `{text}.{ext}` mask explicitly enabled and saved before starting | 30/30 | 15/30 | Not configured/tested; do not claim unavailable |
| BFD free, separate two-file gallery task | 1 PDF/1 PDF | Original `d001.pdf`, not the intended nearby-label title | Page folder works; full 30-file contextual comparison not run |
| Image-list side-panel, document page | 0 images scanned | Not a document-download result | No PDF task exercised |

All 30 SMD outputs were checked against their source bytes. Its other 15 names were generic with safe conflict suffixes, such as `Download PDF (3).pdf`. It did not fail to download. This is a **15-name difference in an authored fixture**, not proof of 15 corrections avoided in a customer's work. A user can manually edit names in SMD, use different page attributes/masks or use another free tool. Fixture design favors nearby-label extraction; independent real pages are essential.

Additional Batch Grab test: `discovery.html` delivers an extensionless hinted PDF named `公開資料.pdf`, plus CSV and genuine XLSX fixtures. 3/3 finished with exact source bytes and expected suffixes. The local source/outcome CSV was itself saved to disk and checked for Japanese text, original URL and completed status.

Public [IRS W-9 page](https://www.irs.gov/forms-pubs/about-form-w-9): four documents detected, `Form W-9.pdf` saved with a PDF header. [NASA Image of the Day](https://www.nasa.gov/image-of-the-day/): real JPEG saved; its accepted alt-derived name was overly long and safely truncated. These are coverage examples, not supported-site guarantees or automatic correctness of returned content.

Failures: seven edge links yielded five completions and two explicit failures. A manual retry recovered the temporary server error, leaving one unresolved missing file. Popup closure with queued jobs passed. Source rows retain actual completed paths and errors; source export is not content authentication or an academic citation manager.

## D. Spreadsheet-driven downloads

Batch Grab has no import/paste URL+filename pairing interface. Do not recommend it to someone whose primary input is a spreadsheet today. Its new CSV is an **output audit**, not an import feature.

BFD Pro documents CSV filename mappings; the image-list guide documents spreadsheet filename lists and paid CSV task import. Neither was unlocked, so pairing, malformed rows, duplicate-row policy and failed-row export remain unverified. SMD's free clipboard/local URL import is documented; paired filename-column handling is UNKNOWN. A small local CSV + standard download-script workflow is a free technical alternative, but no such script was benchmarked in this task. Import alone therefore has no established paid moat; it is deferred rather than sold as unique.

## E. Large batches and lifecycle

Batch Grab retains 5,000 distinct image URLs, renders at most 60 cards, supports page selection and filtered search, and disables a selected batch exceeding 500. The final run's exact diagnostics are in [the acceptance JSON](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-beta.json>). A separate 120-file run closed the popup, stopped the actual service worker after confirmed Chrome IDs, reopened it, and verified **120 completed files, exact source bytes, correct paths and no duplicate Chrome records**. This tests worker interruption with a running browser; it does not certify OS suspend or browser shutdown.

BFD displayed 5,000 and showed the 50-free/Pro gate after Select All → Download. We did not pay or start those 5,000 downloads. Its virtual list was not exhaustively scrolled for all source URLs because the first bounded CDP request exceeded 15 s; the rerun records that limitation rather than weakening output assertions. The image-list tool returned 2,000 images in its recorded current-page scan of the same 5,000-image fixture. This is an observed scan result, not a universal tier cap or a completed 2,000-file download. Neither competitor's large-batch recovery was verified.

No heap snapshots, peak browser RSS, p95 latency, crash endurance, battery or low-end hardware study was performed. 60 cards bounds our DOM work; it does not establish a universal memory advantage.

## Raw evidence

[Controlled acceptance](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-beta.json>); [public downloads](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-public.json>); [discovery + CSV/XLSX/Japanese output](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-discovery.json>); [120-file worker restart](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-lifecycle.json>); [SMD naming comparison](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-smd-documents.json>); [primary competitors](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/final-primary.json>). Missing measurements are deliberately left unverified.
