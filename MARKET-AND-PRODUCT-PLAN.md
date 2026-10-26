# Batch Grab: market research and product plan

Research date: October 16, 2026, Asia/Tokyo. Decision document, not an implementation claim.

## 1. Recommendation

Proceed with a short, gated validation of **a document collection workspace for people who repeatedly assemble reports, spreadsheets, and supporting files from websites**. Do not yet invest in a general-purpose paid downloader or payment infrastructure.

Proposed promise: **Collect a project’s web documents, give them useful names, retain their sources, and see exactly what finished and what needs attention.**

The core can remain entirely local. Files travel from source websites to the user’s computer; no AI API, proxy service, hosted database, or cloud file storage is necessary. Payment and license delivery can be separate from file processing.

This is a testable positioning choice, not a discovered empty market. Existing tools already offer many proposed features. Our chance is a measurably easier, more dependable workflow for a narrow customer group. If users prefer existing free products after a fair comparison, stop or change the target job.

## 2. Research scope and confidence

Reviewed current publisher listings, developer documentation, several individual user issues, adjacent products, and all five files of the local prototype. Ran small Node probes against its actual helper code. No browser extension was installed or benchmarked in this research; no customers were interviewed, contacted, or charged.

Evidence labels:

- **Verified listing/documentation:** what an official page currently states; functionality and privacy declarations remain publisher claims unless independently tested.
- **User report:** an individual’s experience or request; useful for identifying failure modes, not estimating prevalence.
- **Code finding:** directly observed in the local implementation; browser consequences may still require runtime reproduction.
- **Hypothesis/proposal:** our recommendation, not established customer demand.

Store user counts are rounded snapshots. They are not monthly active users, purchasers, revenue, or a pool of customers we can inherit. Users overlap across products, so adding counts would overstate a market estimate. No reliable revenue, conversion, search-volume, or market-size data was established. Prior-chat claims about average extension revenue and expected income are excluded.

## 3. The original “dead extension” thesis needs correction

Google’s documented sequence distinguishes browser incompatibility from store removal: MV2 was disabled broadly in 2025, support ended for Chrome 139 onward, and remaining MV2 listings were removed August 31, 2026. Thus August 2026 was not the first date these extensions stopped functioning. [Chrome timeline](https://developer.chrome.com/docs/extensions/develop/migrate/mv2-deprecation-timeline).

However, **Simple mass downloader by George Prec is currently listed**, version 0.906, updated August 10, 2026. Its FAQ explicitly describes a recent Manifest V3 migration. The earlier statement that the product was simply dead is no longer a sound basis for investment. I should have verified this before presenting the replacement opportunity. [Original listing](https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed), [developer FAQ](https://gelprec.github.io/faq.html).

There is historical evidence of disruption: an August 2025 user wanted its sequential and multi-tab downloads back. That supports a temporary compatibility problem, not permanent abandonment or willingness to pay. [Contemporaneous discussion](https://www.reddit.com/r/chrome/comments/1j6ne35/megathread_manifest_v3_extension_alternatives/).

I found no primary evidence explaining why George Prec’s migration took the time it did, or establishing commercial failure, unprofitability, a security ban, or developer abandonment. Those explanations would be speculation. The defensible account is platform disruption followed by a documented migration.

Also avoid confusing similarly named products. The paid site simplemassdownloader.com links to extension ID `akleeoemmhoghpglhmbannnecclchbhb`, published by **ProductivityImprover**. The original George Prec extension ID is `abdkkegmcbiomijcbdaodaflgehfffed`. Different publishers and IDs: do not attribute the paid site’s pricing or behavior to the original, or infer a relationship. [Separate paid listing](https://chromewebstore.google.com/detail/simple-mass-downloader/akleeoemmhoghpglhmbannnecclchbhb).

The broader lesson is to maintain platform compatibility, preserve users’ settings during upgrades, and publish an honest supported-sites and limitations page. MV3 support is an entry requirement, not a durable advantage.

## 4. Competitive landscape

Snapshots observed on the research date; consult linked listings before purchase or launch.

| Product | Evidence and existing strengths | Consequence for Batch Grab |
|---|---|---|
| Original Simple mass downloader, George Prec | 100,000 users, 4.6/5, 411 ratings. Lists extraction from tabs and other inputs, filtering, naming, folder organization, and queue management. | Our current prototype is substantially behind it. “Filters and renames files” is not differentiation. |
| DownThemAll! | 200,000 users, 3.8/5, 265 ratings. Free/open source; offers queues, naming masks, and reusable filters. | Strong zero-price alternative for power users. |
| Imageye | 2,000,000 users, 4.8/5, 16.8K ratings; updated October 13, 2026. Lists image filtering, conversion, side panel, and selection capture. | Avoid leading with generic image downloading. |
| Download All Images, ID `nnffbdeachhbpfapjklmpnmjcgamcdmm` | 200,000 users, 4.1/5, 288 ratings. Lists ZIP, advanced image discovery, filtering, duplicate handling, and multi-tab work. | ZIP and broader image scanning are existing features, not a new category. |
| Simple Mass Downloader, ProductivityImprover | Separate paid product: 10,000 users, 3.2/5, 12 ratings. Site advertises 300 initial free credits, $39.90/30-day project pass, and $149/year plan. | A price anchor and direct competitor, not evidence that customers actually buy at those prices. |
| Bulk Image Downloader desktop application | Advertises gallery automation and a paid license, currently $29.95 sale / $39.95 normal, including a year of upgrades. | Paid convenience exists as an offer; desktop installation can be friction. Does not establish our sales potential. |
| Bulk PDF Downloader, ID `flpckiejbjlkjgfohcoognkaogiacjnh` | 4.6/5, 181 ratings; lists PDF scanning, selection, progress, and speed options. | “All PDFs in one click” is also occupied. |
| Bulk Image Downloader From URL List | Lists CSV/TXT inputs, filename construction, saved tasks, scheduling, ZIP, and reports. | Spreadsheet import and naming alone are not defensible either. |
| save-in | Its repository describes routing, local history, batch source handling, and source-link sidecars. | Provenance is not exclusively ours. Benchmark this adjacent workflow too. |
| Zotero / SingleFile | Zotero captures research metadata and available PDFs; SingleFile preserves complete webpages and supports batch operations. | Position around loose project files; do not rebuild citation management or page archiving. |

Sources: [original SMD](https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed), [DownThemAll](https://chromewebstore.google.com/detail/downthemall/nljkibfhlpcnanjgbnlnbjecgicbjkge), [Imageye](https://chromewebstore.google.com/detail/image-downloader-imageye/agionbommeaifngbhincahgmoflcikhm), [Download All Images](https://chromewebstore.google.com/detail/download-all-images/nnffbdeachhbpfapjklmpnmjcgamcdmm), [paid SMD site](https://www.simplemassdownloader.com/), [BID pricing](https://bulkimagedownloader.com/download), [PDF competitor](https://chromewebstore.google.com/detail/bulk-pdf-downloader-%E2%80%93-dow/flpckiejbjlkjgfohcoognkaogiacjnh), [URL-list competitor](https://chromewebstore.google.com/detail/bulk-image-downloader-fro/kekkjfalendfifgchoceceoahjnejmgf), [save-in](https://github.com/gyng/save-in), [Zotero](https://www.zotero.org/support/quick_start_guide), [SingleFile](https://github.com/gildas-lormeau/SingleFile).

The category has substantial adoption and substantial competition. It is not proven to have an underserved paying segment. A feature checklist cannot resolve that uncertainty.

## 5. Problems worth investigating

| Observed signal | Product implication | What remains uncertain |
|---|---|---|
| DownThemAll issue #622, September 28, 2026: user wants missing/incomplete downloads revisited. | Reconcile the batch against actual outcomes, offer retry-failed-only, and preserve unresolved entries. | Frequency, reproducibility, and whether another tool already solves their case. |
| Issue #594, December 9, 2025: user reports names becoming `unnamed.png` and unwanted manual renaming. | Capture meaningful page metadata, show filename previews, preserve the final actual filename. | Site-specific cause and general incidence. |
| Issue #619, September 4, 2026: user reports apparently downloaded but unusable tiny files. | Treat successful transfer and correct file content as separate questions. | This report does not prove an HTML-login response or any particular root cause. |
| Original SMD documentation describes dynamically generated URLs and thumbnails without exposed originals. | Show what was discoverable and why an original could not be identified; avoid fabricated original URLs. | Which target sites expose enough information to improve reliably. |
| Downloaders document repeated Save As prompts. | Explain output-mode choices and browser settings before a large run. | How often users have this setting enabled. |

Sources: [#622](https://github.com/downthemall/downthemall/issues/622), [#594](https://github.com/downthemall/downthemall/issues/594), [#619](https://github.com/downthemall/downthemall/issues/619), [SMD quick start](https://gelprec.github.io/quick_start_v2.html), [DownThemAll listing](https://chromewebstore.google.com/detail/downthemall/nljkibfhlpcnanjgbnlnbjecgicbjkge).

These are qualitative signals, not a representative review analysis. They justify experiments around reliability and organization; they do not justify saying all competitors are unreliable.

## 6. Customer choice and the actual paid job

Recommended initial segment: independent analysts, consultants, and small research/operations teams collecting public company reports, vendor documents, public procurement attachments, or public datasets into project folders.

Their proposed job: “I have several pages of relevant files. I need the right documents, understandable names, a source index, and a clear list of anything missing, so I can hand the folder to someone else.” This segment is selected for repeated work and deliverable quality; its willingness to pay remains untested.

| Segment | Fit | Decision |
|---|---|---|
| Analysts/consultants collecting public documents | Repeated projects, mixed formats, organization matters | First interviews and beta |
| Procurement/research operations | Multi-file packages, completeness matters | Include if pages expose direct links; no portal-specific promises |
| Students downloading occasional handouts | Clear utility; likely price pressure and strong free alternatives | Useful free users, secondary revenue hypothesis |
| Designers collecting images | Large visible market but mature alternatives | Secondary mode after document validation |
| E-commerce image collectors | Repeated need, but dynamic sites and adapters increase maintenance | Revisit only with committed paying testers |
| Citation-focused academics | Zotero already addresses a broader job | Integrate through simple exports later; do not compete head-on |
| Video downloaders or whole-site archivists | Different delivery and product scope | Exclude from initial positioning |

Illustrative workflow, not a tested supported-site claim:

1. User opens six company report-library pages and explicitly adds those pages to a project.
2. Batch Grab identifies exposed PDF/XLSX/CSV candidates and retains page title, link text, and source page.
3. User filters a reporting period and previews names such as `Acme/2025/Annual-report.pdf`.
4. It displays 42 chosen entries, known duplicates, uncertain file types, and naming conflicts.
5. Browser-managed downloads run; the user can leave the workspace UI.
6. The final result shows 39 transfers complete, two requiring login, and one interrupted. Content checks, where available, have a separate status.
7. A local index maps files to sources and outcomes. The user fixes the login and retries only relevant failures.
8. On the next project, the same naming/filter recipe can be reused.

That sequence is the proposed reason to switch. It needs to beat alternatives in task time and errors; describing it attractively is insufficient.

## 7. Current prototype audit

Inspected `manifest.json`, `lib.js`, `popup.js`, `popup.html`, and `popup.css`. Existing useful pieces include MV3, click-triggered scanning, basic file grouping, plain-text/regex URL filtering, naming tokens, folder patterns, and individual browser downloads. It uses local assets and has no implemented external license endpoint.

### Release blockers

| Finding | Code location | Required behavior |
|---|---|---|
| Queue lives in popup JavaScript. Dismissing it destroys that execution context and can prevent remaining items starting. Already-started Chrome downloads are a separate matter. | `popup.js:88`, manifest popup action | Persist jobs and dispatch from an event-driven background coordinator; reconcile on wake. |
| It counts API calls that start downloads, without retaining IDs or tracking final outcomes. | `popup.js:101` | Track queued, starting, in-progress, complete, interrupted, canceled, and uncertain states. |
| Filter changes leave old selections active; download uses all selected URLs, including hidden ones. | `popup.js:13`, `popup.js:89` | Clearly show hidden selected items and require an explicit reviewed selection scope. |
| Only 500 results render, but “Select all shown” selects every filtered result. | `popup.js:24`, `popup.js:176` | Distinguish visible-page selection from all matching entries; review exact count before starting. |
| No active-transfer concurrency bound. Waiting 80 ms between starts does not limit ongoing downloads. | `popup.js:111` | Start the next transfer based on active count and completion, with per-host limits. |
| No job persistence, restart reconciliation, or cancel-remaining control. | `popup.js:8`, download loop | Persist job state before dispatch; make cancel and recovery unambiguous. |
| Pro accepts any key beginning `DEV-`; payment endpoint is empty. | `popup.js:5`, `popup.js:118` | Remove the shortcut from distributed builds; choose licensing only after paid demand. |

### Scanner, naming, and usability gaps

- A `/download?id=55` endpoint is classified as Pages and hidden by default, even if it serves a PDF. Add candidate evidence and optional type verification rather than treating suffixes as truth. (`lib.js:10`, `lib.js:25`)
- Link text, `download` attribute, title, alt text, and source page title are not captured. These are essential for useful document naming. (`lib.js:95`)
- A URL first discovered as an anchor loses image dimensions when the same URL appears as an image. Merge metadata rather than retaining only the first record. (`lib.js:93`)
- Invalid regex silently matches everything. Show a validation error and prevent accidental broad selection. (`lib.js:71`)
- Unknown image width passes a minimum-width filter, and links to images do not get dimensions. Offer explicit “include unknown size” behavior. (`lib.js:80`)
- Scanner misses CSS backgrounds, alternate `srcset` candidates, open shadow roots, unmaterialized lazy content, and frames. Add only discovery methods needed by validated workflows. (`lib.js:86`)
- No refresh scan, pasted URL list, multi-page project, saved recipe, source index, download history, or deduplication across runs.
- Filename sanitization leaves Windows reserved names such as `CON`; total path length and collisions are not reviewed. Date tokens use UTC rather than the user’s local day. (`lib.js:31`, `lib.js:43`)
- Tokens in the filename field do not create nested folders: slashes are sanitized. Nested folders belong in the folder field. This corrects an example in the pasted chat.
- All scan failures show essentially one blocked-page explanation, which can hide other causes. Provide accurate failure classes and a retry action. (`popup.js:167`)
- Configuration and selections mostly reset when the popup reopens; storage currently persists only the license.
- No packaging documentation, meaningful browser validation, or compatibility matrix is present in this directory. Prior-chat test claims could not be verified from saved tests here.

Small direct helper probes confirmed: invalid regex returns true, unknown width passes a positive size threshold, extensionless endpoints classify as Pages, `CON` survives sanitization, and a shared anchor/image URL remains only a link with no image dimensions. These checks do not establish browser download reliability.

Chrome documents automatic popup dismissal and supports observing download outcomes separately. [Popup lifecycle](https://developer.chrome.com/docs/extensions/develop/ui/add-popup), [downloads API](https://developer.chrome.com/docs/extensions/reference/api/downloads).

## 8. What should be free, paid, and deferred

Free must establish trust and finish a useful job. Do not sell correctness, successful recovery from our bugs, or basic safety as premium features.

| Capability | Priority | Packaging | Reason |
|---|---|---|---|
| Reliable queue, completion states, cancel, retry-failed-only | P0 | Free and paid | Fundamental product quality |
| Exact selection review, sensible errors, filename sanitation | P0 | Free and paid | Prevent unintended downloads |
| Current-page document discovery and basic filters | P0 | Free | Immediate useful result |
| Basic naming preview and folders under Downloads | P0 | Free | User can inspect outcome |
| Basic local source/outcome report | P0 | Free | A user must be able to understand failures and retrieve their record |
| Explicit multi-page projects | P1 | Pro after trial | Reduces repeated setup |
| Save/reuse recipes for filters, naming, and folder rules | P1 | Pro | Repeated work is the upgrade reason |
| Link-text/page-title naming, search-and-replace, metadata overrides | P1 | Pro advanced controls; basic descriptive names free | Less manual cleanup |
| CSV mapping `url,filename,folder,project` | P1 | Pro | Fits prepared collection work; already exists elsewhere, so usability must win |
| History with skip-previously-collected suggestions | P1 | Pro | Saves effort on repeat collections |
| Rich CSV/JSON project manifest and local HTML index | P1 | Pro richer formats; basic report free | Makes collected files usable as a deliverable |
| ZIP output | P2 | Decide from beta | Helpful but not unique; separate fetching/size constraints |
| One-level discovery into user-selected detail pages | P2 | Pro only if needed | Could expose relevant documents; permission and request costs need limits |
| Lazy-image capture, CSS images, `srcset`, visual grouping | P2 | Later image workflow | Valuable to images, not first revenue test |
| Content hashing of accessible bytes | P2 | Advanced option | Detect identical content and changes only when bytes can be read |
| Folder picker outside Downloads | P2 | Optional engine | Useful, but different permissions and lifetime requirements |
| Site adapters | P2 | Only for repeatedly requested sites | Maintenance grows with every supported site |
| AI naming, cloud sync, monitoring, unattended browser-closed scheduling, native helper, streaming video | Deferred | No initial commitment | Add cost and complexity without established demand |

Do not implement the entire table at once. The first paid experiment needs reliable collection plus one repeat-work bundle: multi-page project + naming recipe + source index. CSV import can follow if interviews demonstrate prepared lists are the primary job.

## 9. Architecture that preserves self-sufficiency

### Browser-managed mode: initial release

- Popup is a launcher; a full extension tab provides the project workspace. A side panel can be added if browsing-with-review is proven useful.
- Scanner returns candidates with source page, source tab, visible text, original URL, media metadata, and discovery method.
- A local planner applies filters, builds names, identifies collisions, and freezes the approved selection into a job.
- Store jobs/items in IndexedDB; use local extension storage for small preferences and entitlement. Do not store project URLs in sync storage by default.
- A Manifest V3 service worker registers download listeners at startup, dispatches a bounded number of browser downloads, and records download IDs.
- Resume coordinator activity from relevant events and alarms. Do not rely on an in-memory loop or on keeping the worker permanently alive. Chrome can terminate idle workers; persist state and reconcile it on wake. [Worker lifecycle](https://developer.chrome.com/docs/extensions/develop/concepts/service-workers/lifecycle).
- Reconcile “starting” entries after a crash using recorded IDs and narrowly matched browser download records. Ambiguous cases need review; do not promise perfect exactly-once dispatch across every crash boundary.
- Only inspect/manipulate downloads belonging to Batch Grab jobs. A broad browser permission is not a reason to inventory unrelated download history.
- Per-item states include `queued`, `starting`, `in_progress`, `complete`, `interrupted`, `canceled`, `needs_attention`. Content verification has a separate field: `not_checked`, `metadata_checked`, `bytes_checked`, or `mismatch`.

### Discovery and type evidence

Use filename suffix, anchor `type`, `download` attribute, visible text, and image metadata as hints. For uncertain document candidates offer a user-triggered probe with the narrow host access it needs. HEAD can be unsupported or misleading; redirects and MIME types can be wrong. Any fallback GET must be bounded and canceled when no longer needed; Range may be ignored.

Do not crawl or probe every navigation link by default. Restrict to reviewed candidates and explicit selected pages. Extra probing can consume signed URLs or trigger server behavior, so allow it to be skipped.

### Permissions

Keep the current-page baseline near `activeTab`, `scripting`, `downloads`, and `storage`; add only implemented supporting APIs. Multi-tab scanning requires access to those origins: `activeTab` on one page does not silently authorize every open tab or every CDN. Offer per-origin optional access and an explicit page list. Permission denial should preserve the rest of the workflow. [activeTab](https://developer.chrome.com/docs/extensions/develop/concepts/activeTab), [optional permissions](https://developer.chrome.com/docs/extensions/reference/api/permissions).

Extension-side cross-origin fetching for type probes, ZIP, or byte checks requires suitable host permission or a permissible server CORS response. Content-script requests remain subject to the page origin’s restrictions. Keep all such requests local and direct; host permission does not bypass authentication. Validate messages, job membership, and requested origins rather than exposing an arbitrary privileged fetch bridge. [Network requests](https://developer.chrome.com/docs/extensions/develop/concepts/network-requests).

### ZIP and direct-folder modes are separate projects

Browser-managed mode does not automatically expose saved file bytes to the extension. It can track transfer status and available metadata, but cannot claim to parse every resulting PDF or compute a hash of every file.

ZIP requires fetching readable bytes, buffering or streaming safely, and a suitable execution context. Package libraries locally, estimate memory use, cap work, and offer normal downloads when the archive cannot be built. A tab-based ZIP engine must say the tab needs to remain open; a future offscreen engine needs its own justified lifetime design and tests. Never promise arbitrary-size background ZIPs.

The initial Downloads-based engine creates relative subfolders. Writing elsewhere can use a user-authorized directory picker in a supported visible context, not an arbitrary filesystem path. Folder permissions must be rechecked and interruption handled. This mode also needs readable response bytes and has different persistence constraints. [File System Access](https://developer.chrome.com/docs/capabilities/web-apis/file-system-access).

### Local data lifecycle

Store necessary metadata, not passwords or exported cookies. Retain URL query strings privately when necessary for requests; signed URLs can be secrets. Redact sensitive query parameters in shareable reports by default, label redacted URLs as potentially non-reusable, and let users explicitly export full original URLs if needed. Never change the actual request URL just to simplify deduplication.

Provide delete-project, clear-history, retention controls, and user-initiated export. Local storage is not a compliance certification. Google requires accurate data-handling disclosures even for local processing. [User Data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq).

## 10. Limits we should explain instead of promising away

| Case | Honest product behavior |
|---|---|
| Exposed direct PDF/image/archive/media URLs | Primary supported path, subject to source-server behavior |
| Logged-in direct links | May work through browser-managed cookies; CSRF, POST workflows, expiring links, and additional headers can still fail |
| Downloads with no extension | Candidate detection and type evidence can improve coverage; ambiguous entries remain visible for review |
| Detail pages containing download links | Optional bounded scan later; no whole-site recursion promise |
| Lazy/infinite scrolling | Capture already loaded content, offer bounded manual rescan; no guarantee of an entire feed |
| Frames and shadow DOM | Traverse accessible content only when permitted; report skipped areas |
| Full-resolution images | Prefer originals actually exposed by the page; never pretend a thumbnail is an original |
| Blob/data/generated files | Separate handling if justified; current scanner excludes them |
| DRM/segmented streams, CAPTCHA, unavailable access, paywalls | Unsupported by the proposed general file collector |
| Expired URL after restart | Keep entry, explain that a fresh page scan or login is needed |
| Pause/resume | Available only when supported by the browser and source; otherwise retry starts again |
| Browser closed or computer asleep | Work is interrupted; reconcile on return, never claim browser-independent operation |
| Save As prompt setting enabled | Explain browser behavior; do not promise silent control over it |
| Correct content vs completed transfer | Distinguish status from type/content confidence; never label unchecked files as verified |
| Safari/mobile/Firefox/Edge/Brave | Chrome desktop first; only advertise another browser after testing or porting it |

## 11. Pricing and license proposal

Start with **a $29 one-time Pro experiment**, rather than a subscription. This is a hypothesis, not an optimized market price. Sell saved repeat-work setup and organized project output. Charging more merely to remove an inconvenient per-batch cap is weak against free established tools.

Recommended packaging for validation:

- Free: useful current-page downloads, reliable queue, recovery, basic descriptive names and report. Remove the prototype’s 25-file cap during beta so it does not distort reliability tests.
- Pro evaluation: enable the full repeat-work bundle for a clearly disclosed 14-day trial after the first successful batch. No card required; trial expiry must not block recovery of existing jobs or export of existing data.
- Pro purchase: $29 for the purchased major version, with 12 months of updates. Explain the exact term at checkout: installed licensed functionality remains unlocked afterward; future compatibility cannot be guaranteed forever. Future major upgrades are optional. Avoid an undefined “lifetime” maintenance promise.
- Reconsider $19 versus $29 only after real objections. Test sequentially with comparable cohorts; a tiny A/B test will be noisy.

For a light infrastructure option, issue digitally signed entitlement files/keys after payment and verify signatures locally using a bundled public key. Keep the private signing key outside the extension. This removes an ongoing runtime license API requirement, but payment collection and automated delivery still need a provider or fulfillment process. Offline licenses are harder to revoke after refunds and are shareable. Treat those as deliberate tradeoffs, not piracy-proof security.

If online checks are later justified, cache entitlement and provide a clearly defined offline grace period. Never send downloaded files, project URLs, or page content for license validation. Avoid creating a full account system merely to sell the first few copies. Payment-provider eligibility, delivery, refund behavior, and actual fees must be checked before integrating any provider.

## 12. Economics without invented forecasts

The following are **illustrative cohort calculations**, not estimates of likely performance or monthly recurring revenue. An activated user finishes a useful batch; repeat users finish another project on a later occasion; buyers are a subset of repeat users.

| Hypothetical new-install cohort | Activation | Repeat among activated | Purchase among repeat | Buyers | Gross at $29 |
|---|---:|---:|---:|---:|---:|
| 1,000 | 40% | 30% | 5% | 6 | $174 |
| 5,000 | 50% | 35% | 8% | 70 | $2,030 |
| 10,000 | 60% | 40% | 10% | 240 | $6,960 |

Formula: installs × activation × repeat-use rate × purchase rate × price. Paid sales require new cohorts; a one-time model does not produce subscription MRR.

For a deliberately conservative planning example only, reserve 10% of gross for payment/refund friction: $29 becomes $26.10 before tax, support, acquisition, and development. This is not a quoted provider fee. If support averages 10 minutes per sale valued internally at $30/hour, another $5 of labor leaves $21.10 before other costs. At that contribution, recovering an assumed $1,500 of build effort requires about 72 sales. All inputs are replaceable assumptions.

Low hosting cost does not mean passive income. Site breakage, browser updates, user support, store review, and distribution are likely to dominate costs. Track those costs from the first beta.

## 13. Validation plan before broad development

### Step A: interview the job, not the feature list

Find 12–15 relevant people through existing contacts and communities where research/operations work is discussed. No outreach has been sent. Conduct the initial sessions before implementing premium features. Ask for public or sanitized examples only.

Questions:

1. Show the last real occasion you collected multiple web files. What was the deliverable?
2. How many pages/files and how often does this recur?
3. What do you currently use, including scripts and free extensions?
4. Where did names, missing files, duplicates, or login problems cost time?
5. What manual cleanup remained after downloading?
6. Would a source index matter to the person receiving the folder?
7. After a working demonstration, will you use it on your next real job?
8. After it succeeds, will you buy the $29 package now? Record actual purchases separately from verbal interest.

Do not count compliments, email signups, or “I would pay” as paid validation.

### Step B: benchmark actual alternatives

Compare Batch Grab with original SMD and DownThemAll for the document workflow; add Zotero when citations matter, save-in for routing/provenance, and Imageye only for image-specific tasks. Do not imply these comparisons were already performed.

Build 20 target-workflow cases: public report indexes, procurement attachments, course handouts, direct dataset listings, extensionless endpoints, redirects, and mixed-format pages. Add controlled fixtures for auth expiry, HTML returned under a PDF name, 404/429/503, duplicate URLs, filename collisions, and interruption. Keep failure fixtures separate from representative success-rate denominators.

Record browser/version, product/version, source page/date, expected files established manually, discovery precision/recall, total collection-plus-cleanup time, correctly named usable files, unresolved failures, permission prompts, and user interventions. Redact private identifiers.

Proposed pass condition, chosen in advance: at least 30% lower median collection-plus-cleanup time than the best relevant alternative, with no reduction in expected usable-file completion and no unintended selected files. This is a decision threshold, not a promised result.

### Step C: real beta and payment

Recruit approximately 20 qualified beta users with a current task. Observe first success and later repeat use; let people complete a working job before presenting the price. Use voluntary local diagnostic export and consented interviews initially, rather than uploading browsing data for analytics. A self-selected beta is still not representative of the entire store audience.

Precommitted directional gates:

- In interviews, at least five participants show a recent recurring task with meaningful cleanup cost and agree to test. Otherwise revise the segment before premium work.
- Of 20 qualified beta users, at least 12 complete a useful first batch, at least eight return for another real task within 14 days, and at least five independently purchase at $29 without custom work bundled in.
- For the controlled supported-flow fixture set, no known hidden-selection or silent-completion errors remain; all restart/recovery cases pass.
- For public target pages, aim for at least 95% of manually established eligible direct files collected successfully, with failures explicitly reported. Publish sample size and per-site failures; this is a gate, not a universal reliability claim.
- If payment is weak, allow one additional two-week experiment on the strongest evidenced workflow. Avoid repeatedly moving thresholds to justify more building.

Five beta purchases would justify another small iteration, not prove a scalable business. Repeat the finding with users outside personal contacts before investing heavily in acquisition.

## 14. Implementation sequence and estimates

These are focused work estimates for one developer, not commitments; permissions and authentic-site failures can expand them. Interview recruitment and Chrome Web Store review have external delays. Re-estimate after the queue prototype.

| Stage | Approximate effort | Deliverable / exit gate |
|---|---|---|
| 0. Validate the customer and task | 2–4 workdays plus recruiting time | Interview evidence, 20-case benchmark set, one chosen workflow; do not build payments |
| 1. Repair the engine | 4–6 workdays | Persistent jobs, outcome tracking, concurrency, cancellation, recovery, correct selection |
| 2. Make document collection useful | 3–5 workdays | Rich scanner metadata, extensionless candidate review, naming preview, basic report, workspace UI |
| 3. Implement the smallest paid workflow | 3–5 workdays | Selected-page projects, reusable recipe, rich local source index; swap in CSV import only if evidence favors it |
| 4. Beta and measure | At least 2 calendar weeks | Actual task comparisons, repeat use, bug fixes, real purchase offers |
| 5. Commercial release only after gates | 2–4 workdays plus review | Signed licenses, checkout/delivery tests, accurate listing, privacy/support materials |

Allow roughly 4–6 calendar weeks for a serious first decision if recruitment goes reasonably well. Stop early if interviews or benchmarking undermine the premise. Do not spend that whole period coding without observing users.

Suggested engineering tickets, in dependency order:

1. Define candidate/job/item schemas, failure classes, and upgrade migrations.
2. Fix selection semantics and add a reviewed batch summary.
3. Move orchestration out of popup; persist/reconcile jobs and owned download IDs.
4. Implement true global/per-host concurrency, cancel, interrupted states, and bounded retries.
5. Add a full workspace and restore views from persisted state.
6. Enrich scanner metadata and merge duplicate candidate observations.
7. Add document-type evidence, permission-aware inspection, and honest uncertainty labels.
8. Add naming/folder preview, collision handling, local dates, and cross-platform sanitation.
9. Export basic local outcomes; richer project index after source/privacy decisions.
10. Build only the repeat-work features the initial interviews select.
11. Run browser/system fixtures, public-page benchmark, and beta.
12. Integrate payment and licensing after purchase evidence; strip development unlocks.

## 15. Verification requirements

Meaningful tests must cover the failure modes that make a collection untrustworthy:

- A 600-result scan must distinguish displayed items from all matches; no accidental extra files.
- Filtering after selection must clearly expose any hidden selected entries before starting.
- Invalid regex must produce an error, not a broadened match.
- Shared link/image observations must merge dimensions and source metadata.
- Extensionless file URLs, redirects, query strings, and signed URL ordering must be preserved correctly.
- Windows reserved names, long paths, Unicode/Japanese names, same-name files, and local-date boundaries must behave predictably.
- Closing the launcher/workspace must not lose the browser-managed queue.
- Simulated worker termination, browser restart, and a dispatch-boundary crash must reconcile outcomes without silently duplicating ambiguous items.
- A start API success followed by a network failure must never appear as a completed download.
- 429/503 failures get bounded backoff; authentication failures request user action; user-canceled entries do not restart automatically.
- A PDF-looking URL returning HTML must show mismatch when byte checks are available; metadata-only paths must stay labeled as such.
- Denied/revoked host permission and inaccessible frames must degrade gracefully.
- A completed item is not redownloaded when retrying only failures.
- A project export must avoid leaking signed query parameters by default; full-fidelity export remains an explicit option.
- Network inspection must show no project content leaving for analytics or licensing.
- In Chrome on macOS and Windows, verify filenames, prompts, restricted pages, and browser download events. Test Edge/Brave separately before advertising support.
- Keyboard navigation, labels, focus, screen-reader result counts, large lists, and zoom must support the full flow.
- Before charging, verify checkout, signed entitlement import, offline unlock, refund policy handling, and update-expiry behavior.

## 16. Distribution and operational plan

Lead with the chosen job: **“Collect and organize web documents for a project.”** Supporting copy can explain PDFs, spreadsheets, selected pages, useful filenames, and source indexing. A generic “download anything from any website” promise would invite unsupported use cases.

Initial acquisition experiments:

1. A 45–60 second demonstration using an owned test page with realistic filenames and an intentionally failed file. Show review, naming, source index, and retry.
2. Three useful guides: collecting report-library PDFs; organizing mixed procurement attachments; importing URL/filename lists. Use only tested examples and explain limitations.
3. A transparent comparison with original SMD and DownThemAll, after running the shared benchmark. Acknowledge their strengths and free status.
4. Voluntary beta recruitment in relevant analyst/research communities, with permission where required. No unsolicited messages have been sent by this research.
5. Chrome store screenshots showing a completed project and source index, rather than merely a large list of detected URLs.

Track the funnel from listing visits to installs where aggregate store data permits, then first useful batch, repeat project, paid purchase, refund, and support burden through consented beta methods. State missing denominators. Avoid claiming store visibility or SEO traffic before it exists.

Do not pay for ads until a relevant cohort repeatedly uses and buys the product. Test one channel at a time with a small predetermined spend cap only after authorization to spend. Price minus fees, refunds, and support must bound acquisition cost.

Maintenance: monthly browser compatibility checks, a small regression set for supported workflows, package dependency updates, and a visible changelog. Review source-site issues weekly during beta. Add site-specific behavior only when several relevant users need it; bundle executable adapters in reviewed extension updates rather than remotely executing replacement code.

Support should request browser/product version, a public or sanitized example, expected result, and actual failure state. Diagnostics stay local until the user explicitly exports them. Budget time for support and track minutes per active user and sale.

Store preparation must include icons, accurate screenshots, support contact, privacy notice, paid-feature disclosure, and a narrow statement of purpose. Avoid trademark confusion with Simple Mass Downloader. Confirm the Batch Grab name is suitable before branding spend; availability and trademark clearance were not researched here. [Store policies](https://developer.chrome.com/docs/webstore/program-policies/policies).

## 17. Risks and decision

| Risk | Response / stop signal |
|---|---|
| Free tools already solve the task | Require a measured advantage on real jobs; stop if there is none |
| Customers download once, never return | Prefer project-value pricing; do not assume subscription retention |
| A competitor adds the workflow | Compete through specific user knowledge, sensible defaults, and tested support; recognize there is no strong technical moat yet |
| Site-specific fixes consume the business | Keep explicit generic scope and a limited supported workflow set |
| “Verified” overpromises content integrity | Separate transfer outcome, metadata checks, and byte checks |
| Broad permissions reduce trust | Optional per-origin access and a useful minimal-permission baseline |
| Local licensing is shared | Accept limited sharing initially; do not compromise usability chasing piracy |
| One-time sales fail to fund maintenance | Measure support cost, define update terms, adjust future pricing only with evidence |
| Distribution is weaker than product quality | Run channel experiments before expanding scope |

**Decision today:** retain the prototype as a starting point, correct its reliability problems, and validate one paid document-collection job. There is enough evidence of utility to justify a small experiment. There is not yet enough evidence to promise revenue, broad demand, or superiority over existing tools. The next investment should earn those conclusions through benchmarks, repeat use, and actual purchases.
