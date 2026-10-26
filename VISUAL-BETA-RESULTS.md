# Batch Grab 0.3.0 — implementation and verification

Completed October 19, 2026, Asia/Tokyo. This release addresses the actual screenshot's asset-heavy technical interface. It does not establish monetization or superiority across all downloader tasks. No payments were implemented.

## Delivered implementation

[Chrome beta ZIP](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/dist/batch-grab-0.3.0-beta.zip>) · [installation and reproducible commands](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/README.md>) · [live visual demo](http://127.0.0.1:8766/gallery.html).

The previous implementation gave every scanned resource the same filename/subfolder form, did not retain image alt/card context, and put SVG controls next to useful files. The scanner also discarded image-specific metadata when the same URL had already been found as an anchor. Rendering every row and its inputs made large lists unnecessarily expensive.

The actual replacement is a compact image/document card picker with previews, dimensions, labels, filenames and source hosts. Download Selected stays in the footer. Regex, original type/width filters, templates, root folder and subfolders are optional under Options. The original document naming, scanning, filtering and background download queue remain functional.

Suggested selects likely content images/documents. Review holds uncertain or hidden images. Site assets holds likely logos, icons/arrows, thumbnails and decorations. Images/All files preserve access to the original results. Classification explains its rule and does not mean an asset has no value. Large SVG artwork is retained as content when supported by context; SVG is not treated as synonymous with icon.

The scanner now captures alt/title text, captions, nearby product/card headings and bounded structured metadata. Page-image metadata is associated by exact image URL. Labels from a card containing multiple images are explicitly uncertain. Image suggestions do not replace filenames until the user accepts them. Arbitrary page titles are not propagated across unrelated images. Document suggestions still use link/nearby labels and remain editable.

The picker paginates at 60 cards, lazy-loads previews, debounces search and caps oversized scans explicitly. It no longer builds thousands of editing forms or path-preview rows during ordinary selection. Download completion still comes from Chrome's actual download records, with saved paths, errors and manual retry. Resolved retry attempts are distinguished from unresolved failures.

## Final acceptance evidence

The current source, unpacked distribution and build manifest hashes agree. **42 helper assertions passed**, followed by **all five controlled browser cases**, **all three public-page smoke tests**, and the supported **three-competitor task comparison**. Earlier test-harness corrections remain in separate run directories; the final passing runs are linked below.

Tests used the installed Playwright library and Chrome for Testing 156.0.8078.4 on macOS. Toolbar popups were opened through real extension actions with active-tab authority, then inspected/driven using Playwright CDP. No test host permissions or product-code shims were added. Downloaded files were checked on disk against their actual Chrome paths and expected content.

| Controlled case | Observed result |
|---|---|
| Mixed gallery | 12 images classified as 6 content, 1 logo, 2 icons, 1 thumbnail and 2 decorative assets. Default view showed the 6 content images plus 2 documents; Site assets showed the other 6 images. |
| Names and files | Accepted `Alpine Lake at Dawn.png`; two reviewed card-title names became `Field Camera Kit.png` and `Field Camera Kit (2).png`. All 8 selected gallery files completed with exact expected source bytes. |
| Uncertain association | Two views sharing a card title were labelled uncertain; original names were retained until explicit acceptance. |
| Compact action | Download Selected stayed within the available popup viewport (up to 600 pixels high) without scrolling, including when Options and outcomes were expanded together. Options was closed initially. |
| Small product photos | All 12 small labelled catalogue photos stayed in Suggested; size alone did not hide them. |
| 5,000 images | 5,000 distinct image URLs retained; at most 60 cards rendered. Pagination, search, selection clearing and the explicit 500-file download cap passed. |
| Existing documents | All 30 PDFs completed with exact expected descriptive filenames/section folders and identical source bytes. |
| Failure and retry | Seven links produced five completions and two reported failures. The temporary failure recovered on retry; the missing file remained failed. The summary then showed one unresolved failure and one retried attempt. |
| Actual popup closure | The real popup target was destroyed with pending jobs still queued; the 8-file gallery and 30-PDF batches completed afterward. Submitted edits survived reopening. |

In the final 5,000-image run, opening/scanning/draft readiness measured approximately **1.35 seconds**, the next-page DOM update **8 ms**, and filtered search **207 ms**. These are single-run diagnostic timings on this machine, including automation/debounce overhead—not human usability, p95 latency, memory or cross-device benchmark claims.

[Final controlled results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-beta.json>).

## Public pages and actual downloads

No credentials, access-control bypass or bulk site crawl was used. Only one selected file per public page was downloaded in each final smoke test.

| Page | Verified behavior and boundary |
|---|---|
| [NASA Image of the Day](https://www.nasa.gov/image-of-the-day/) | Scanned current DOM images, selected an image from the main page rather than hidden navigation, accepted its alt-based name, and saved a real JPEG with a recognized header and matching requested filename. The page yielded many hidden/uncertain images; these remain reviewable rather than being declared garbage. |
| [Books to Scrape catalogue](https://books.toscrape.com/) | Detected 20 product images as content, accepted the first book's alt-based name and saved `A Light in the Attic.jpg` (9,876 bytes in the recorded run). This site explicitly invites scraping and is a public sandbox, not evidence that every commercial retailer works. |
| [IRS Form W-9 document page](https://www.irs.gov/forms-pubs/about-form-w-9) | Detected four document links and separated surrounding site assets. Saved `Form W-9.pdf` with the actual Chrome completed state and a `%PDF-` header. No form was filled or submitted. |

The NASA alt text was a long description; accepting it produced a long, safely truncated filename. That is a demonstrated naming limitation, not a claim of perfect title extraction. Users can review/edit it. Public-page results vary as the pages change. Downloadability does not itself establish reuse rights for an image; source references are retained in the test records. [NASA media guidance](https://www.nasa.gov/nasa-brand-center/images-and-media/).

[Final public-page results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-public.json>).

## Equivalent supported competitor tasks

Published extension packages were loaded unchanged into separate test profiles. No subscription was bought, paid feature unlocked or competitor code modified. Competitors are not included in our extension/demo ZIPs.

The common controlled gallery contains 12 images (including icons/decorations and a useful large SVG) and two PDF links. The equivalent file tasks were to identify/select/download the same PNG and, where supported by the observed picker, the same PDF. The tests verified saved files and Chrome completion states; PNGs were compared as both encoded bytes and decoded pixels where necessary.

| Product / tested version | Verified visible experience on the same gallery | Verified output |
|---|---|---|
| Batch Grab 0.3.0 | Suggested: 6 content images + 2 documents. Reviewable names, previews and fixed footer action. Other 6 images separately available. | Reviewed PNG name and organized PDFs; original file bytes preserved. |
| [Imageye 7.3.5](https://chromewebstore.google.com/detail/image-downloader-imageye/agionbommeaifngbhincahgmoflcikhm) | Visual previews with dimensions/source/type; found 11 images, omitting the 1×1 pixel. The ordinary picker exposed the logo/arrows too. Selection and the Download action worked. | Saved `imgi_3_001.png` under the default page-title folder. Its PNG encoding changed, but dimensions and decoded RGBA pixels were identical to the source. No PDF download was exercised in its image-only picker. |
| [Simple mass downloader 0.906](https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed) | Load Page Links → visual gallery exposed 12 images, dimensions and selection. Setting the existing width/height filters reduced it to the same 6 large content images in this fixture. | `001.png` and `d001.pdf` completed with exact source bytes. |
| [DownThemAll 4.16.1](https://chromewebstore.google.com/detail/downthemall/nljkibfhlpcnanjgbnlnbjecgicbjkge) | Regular selector exposed document links; Media tab showed 12 image rows, with source URLs, alt-derived labels, filters and masks. | `001.png` and `d001.pdf` completed with exact source bytes. |

**Verified distinction:** Batch Grab makes content/document triage and explicit evidence-based naming review the initial workflow. It does not uniquely provide image grids, filters, file selection, naming masks or downloading. SMD's free dimension filters reached the same six large images after configuration. The small-product fixture demonstrates why Batch Grab also uses card context, but equivalent small-catalogue behavior was not benchmarked across all competitors.

**Advertised/unverified distinction:** Imageye's package includes upgrade copy advertising Smart Filter and Image Studio, and a Smart Filter control. That control was not visible in the tested mode/profile. The reported final task leaves that hidden control alone; no Pro purchase or paid-filter behavior was verified. Conversion, ZIP, paid tiers, deep scanning, all advanced folder rules and all competitor failure-recovery flows were not exhaustively exercised. Missing coverage is not evidence of missing capability.

No acquisition, willingness-to-pay, conversion, revenue, user-time-saved or general superiority estimate follows from these UI tests.

[Final three-competitor results](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-competitors.json>).

## Actual browser screenshots

Current primary picker, with filenames reviewed and files selected:

![Visual picker and always-visible Download Selected](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/gallery-picker.png>)

Separated site assets:

![Site assets remain available separately](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/site-assets-separated.png>)

Real public catalogue workflow:

![Public catalogue in Batch Grab](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/public-books-catalogue-picker.png>)

Real comparator gallery after applying its supported filters:

![Simple Mass Downloader image gallery and dimension filters](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/comparison-smd-filtered.png>)

Additional public-page, completion, failure, large-list, Imageye and DownThemAll screenshots are in the same output directory. Run-specific source screenshots/downloads/JSON are retained beneath it.

## Remaining limitations

- Heuristics can misclassify an unlabelled logo or a small useful photo. Unknown and hidden images are not proven decorative; use Review or Images. This is not semantic image recognition.
- Offscreen/lazy resources absent from the DOM require scrolling and rescanning. Arbitrary CSS backgrounds, inline/data/blob resources, shadow DOM, iframe traversal, whole-site crawling and streaming video are outside the implemented scanner.
- Unknown source dimensions and formats are not invented. Some extensionless image endpoints retain extensionless names. Neither a saved HTTP 200 response nor Chrome's completed state proves it is the intended document; test fixtures/public smoke tests inspect content separately.
- Metadata may describe a product rather than a particular view. Exact URL association and explicit acceptance reduce guessing but do not guarantee a correct title.
- The scanner caps combined results at 10,000, renders 60 cards per page, and supports 500 downloads per batch/1,000 pending. Very large drafts exceeding 4 MB are rescanned on reopening. History remains local until cleared.
- Popup closure is verified. Browser shutdown/suspension, every file format, every website and non-Chrome browsers are not certified. This remains a developer-mode beta, not a Web Store release.
- The comparison is a small set of supported tasks, not an exhaustive competitor benchmark. Its commercial value is unvalidated; no payments or proven-monetization claim is part of this delivery.
