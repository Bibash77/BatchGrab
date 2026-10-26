# Discovery gap: URL-level findings and fixes

October 19, 2026. The user's exact page is [Scribd document 406910954 / Search](https://www.scribd.com/document/406910954/Search). This comparison inspects ordinary exposed page resources. It does not authorize or demonstrate downloading the protected document. No login, paywall/DRM/CAPTCHA bypass, scrolling, document download or original-URL guessing occurred.

## Same-page reproduction

Both unmodified BFD 1.1.0 and Batch Grab 0.3.1 were loaded in the **same fresh Chrome profile and tab**. We waited seven seconds after DOM readiness, opened BFD, collected its virtual result rows, closed it, opened Batch Grab, awaited its saved draft, and evaluated the archived 0.3.0 scanner on that same tab. The main page anchor URL set and image currentSrc URL set stayed identical before/after both scans. Anchor/image counts and resource timing counts are preserved. This establishes comparability for these exposed resources, not a frozen page/iframe/network replay.

The final browser state had 141 anchors and 103 image elements. Observed unique sets:

| Scanner / view | Unique URL count | Meaning |
|---|---:|---|
| BFD displayed resources after exposing tiny assets | 186 | File/image candidates, not verified successful downloads |
| Batch Grab 0.3.1 All files | 301 | 184 image URLs + 117 page links; raw total includes navigation |
| Batch Grab 0.3.1 Images | 184 | Includes responsive variants and review candidates |
| Batch Grab 0.3.1 Suggested | 1 | One likely content image by heuristic; not an entitlement or download recommendation for protected content |
| Original 0.3.0 scanner, same state | 212 | 95 image records + 117 page links, including one invalid image inference |
| BFD URLs absent from Batch Grab 0.3.1 | 0 | Zero in this run |

The final matched run exposed **186**, close to the user's 189, but the historical 189-versus-30 numbers were not exactly reproduced. Login/scroll/filter/version state of the original observation remains unknown. An earlier fresh run on this same URL returned 246 BFD URLs and 388 Batch Grab URLs; recommendation content changed between runs. That variability is why totals from separate visits cannot prove a scanner defect. Within each run the main-page image set remained stable.

### What actually changed

Compared with the archived scanner, the new URL set adds **90 responsive candidate URLs** and removes one false image URL: an empty img source previously resolved to the Scribd webpage itself. This is a correctness fix, not extra coverage. A representative responsive pair is a 149×198 document-card image and its explicit 298×396 srcset alternative; other additions include a 2× fallback banner. Those alternatives are different URLs, **not necessarily different photos or useful documents**. We did not fetch each to prove content equivalence or downloadability.

Batch Grab has 115 URLs not shown by BFD, primarily ordinary Scribd/support/social/app navigation links. They remain in All files/Pages for compatibility, not Suggested. No claim of 115 additional useful files is justified. BFD also labels some Scribd route links as inferred documents; a route label is not evidence of a direct downloadable PDF.

The final image classification was 1 content, 169 review and 14 thumbnails, with no logo/icon/decorative labels in that particular scan. This is heuristic output, not independently labelled ground truth. The result shows why uncertain resources should remain reviewable rather than being deleted or marketed as newly recovered documents.

[Every URL, set membership, method and category](</Users/macbookairm4/Desktop/projects/Money Making small apps/docs/evidence/scribd-url-comparison.csv>) · [raw page state and scanner records](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-scribd.json>). Screenshots: [BFD on Scribd](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/scribd-bfd.png>) and [Batch Grab on the same page](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/scribd-batch-grab.png>). No protected file was saved.

## Controlled discovery ground truth

`discovery.html` provides reproducible ordinary images, duplicates, a lazy alternative, responsive candidates, CSS artwork, a detached-but-loaded image, open shadow image, accessible and opaque-origin frames, and three document formats.

| Mode | Unique candidates |
|---|---:|
| Archived 0.3.0 scanner | 7 |
| 0.3.1 ordinary scan | 13 |
| 0.3.1 optional extended scan | 15 |

The controlled normal scan adds shadow/frame/lazy/responsive sources; extended adds background and resource-timing candidates. Exact URL duplicates collapse once. A dynamically inserted image appears on rescan. The inaccessible sandbox frame remains inaccessible. Visible DOM evidence is not overwritten by later network/background sightings. These are URL-coverage assertions; fixture alternatives often deliberately share source bytes and are not counted as unique artistic works.

The extension actually saved the fixture PDF, CSV and XLSX with exact source bytes and correct suffixes. `公開資料.pdf` and its exported source/outcome CSV passed. Discovery-only alternatives are not labelled “download tested” merely because their URLs appear.

## Discovery method decisions

| Method | Implemented / evidence | Filename and relevance | Permissions / cost |
|---|---|---|---|
| Standard img/currentSrc | Preserved, browser tested | Original URL basename; alt/context review | Existing activeTab+scripting; low |
| Direct document anchors | Preserved; PDF/CSV/XLSX bytes tested | Link/nearby label and section; hints preserve extension | No new permission; low |
| Common lazy attributes | Added; placeholder does not suppress real alternative | Unknown dimensions, Review; not automatic scroll | No new permission; low |
| srcset/picture | Added; main Scribd coverage gap | Retain alternatives, mark variantOf; original vs resized cannot always be inferred | No new permission; moderate parsing limits |
| CSS backgrounds | Optional; controlled fixture passes | No invented caption/size; Review, can include decorations | No new permission; bounded computed-style cost |
| Arbitrary JS URL extraction | Deferred | Strings can be stale, protected or unrelated; do not eval scripts | High ambiguity/maintenance; no business justification |
| Already-loaded image resources | Optional performance entries, not interception | Review; removed resources may be stale or duplicates | No webRequest/debugger permission; bounded data already exposed to page |
| Accessible iframe content | Added, same-origin only | Preserve frame source page | No new permission; inaccessible/unloaded frames counted |
| Open shadow DOM | Added with root bound | Element context may be limited | No new permission; closed roots excluded |
| Duplicate URLs | Exact dedup with method union | Distinct CDN transforms retained for review | Low; no unsafe blanket query stripping |
| CDN / pixel duplicates | Explicit variant relation only | No automatic perceptual equivalence claim | Perceptual/canonical normalization deferred |
| Decorative assets | Existing rule separation retained | Still available under assets/all files | No new permission |
| Dynamic changes | Manual rescan tested | Snapshot replaces draft, so edits can be replaced | No permanent observer/continuous crawl |
| Scroll-only images | User scroll + rescan | Can't discover absent/generated URLs in advance | Automated scrolling deferred |
| Extensionless links | Download/type hints preserved | Supported PDF hint tested; unknown type stays unknown | No HEAD probing or new host permission |

All implemented methods run in Manifest V3 through user-invoked scripting. [Chrome activeTab documentation](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab) describes this temporary page access. Broad cross-origin crawling would require additional permissions and UX; it was not added.

## Limits

80 roots, 50,000 traversal elements, 20,000 CSS elements per root, 10,000 combined URLs; reached limits are reported. Not a full srcset/CSS parser; mixed data URL sets, escaped CSS/image-set/pseudo-elements and complex comma-containing candidate URLs can be missed. No same-content dedup, resource body sniffing, whole-page network audit or access to browser-inaccessible frames. Scanning finds candidates, not universal downloadability, rights or authenticity.
