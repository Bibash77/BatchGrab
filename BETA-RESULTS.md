# Smart Naming and Organized Downloads — beta delivery

Version **0.2.0**, completed October 18, 2026. This is implementation and verification, not another market study. No payment infrastructure was built. **$5 one-time remains an unvalidated price hypothesis.**

## Deliverables

- `dist/batch-grab-0.2.0-beta.zip`: ready-to-load Chrome MV3 extension ZIP; unzip, then use Chrome's **Load unpacked** on the extracted folder.
- `dist/batch-grab-beta/`: the same six runtime files already unpacked.
- `dist/batch-grab-demo.zip`: 30 valid fictional PDFs, two comparison pages, failure/naming cases and a local server.
- `README.md`: installation, live-demo instructions, behavior, limitations and reproducible commands.
- `FIRST-SALE-PLAN.md`: one narrow real-customer experiment and a genuine $5 purchase definition.
- `output/playwright/results.json`: recorded passing cases, build hashes and the comparison-repeat limitation. Individual case JSON files and real screenshots are beside it.

The local demo was started at **http://127.0.0.1:8765/**. Restart it with `node batch-grab/scripts/demo-server.cjs` from the project parent directory if the process has stopped. Install the extension in the Chrome browser you use for the demonstration; the demo webpage alone cannot install it.

## What works

The current-page scanner retains document/image/archive/media detection, file-type filtering, text/regex filtering, minimum image width, filename templates and folder tokens. Documents are the initial filter. All matching rows are rendered, and changing filters removes hidden selections.

For documents, the beta captures visible anchor text, a nearby row/card document label, and the closest section heading. Deterministic rules suggest descriptive filenames and section folders. Both are editable. The final-path preview applies extension preservation, unsafe/reserved-name sanitization and numbered duplicate resolution. Chrome handles collisions with files already on disk, and the actual saved path is shown afterward.

The background worker persists the entire batch before acknowledgement. Submission does not block the serialized completion queue: a slow Chrome download-start call cannot hold all other outcome updates. Chrome download IDs, actual paths, completed/interrupted states and error codes are saved independently of the popup. Failed downloads can be retried manually. Submitted edits are explicitly persisted before enqueueing.

The prototype license stub and 25-file paywall were removed. The beta does not imply that a paid license system exists.

## Acceptance results

**All three final beta browser cases passed against the packaged extension**, plus **23 helper assertions** covering naming safety, duplicate paths, extension preservation, templates, groups, regex and image-width filtering. The packaged runtime hashes match source files.

| Final beta case | Measured result |
|---|---|
| Mixed-label library: 30 PDFs | 30 completed, 0 failed; 30 exact expected names and 30 exact section-folder placements; PDF bytes matched their document titles. |
| All-descriptive control: 30 PDFs | 30 completed, 0 failed; 30 exact names and section folders. |
| Edge cases: 7 links | 5 completed, 2 failures correctly reported. Manual retry of the temporary failure produced a sixth completed file; the missing file remained failed. |
| Genuine popup closure | Popup target was destroyed with 29 jobs still queued on each 30-file beta page; every file subsequently completed. Edge-case closure also retained pending jobs. |
| Edit persistence | An immediately closed/reopened popup retained the submitted edited filename. The downloaded file used its sanitized name and correct `.pdf` extension despite a typed `.txt` suffix. |
| Filename safety | Duplicate edited names became `Edited_ Review.pdf` and `Edited_ Review (2).pdf`; `CON` became `_CON.pdf`; unsafe punctuation and parent-path segments were neutralized. |
| Failure UI | Real Chrome interrupted states/error codes appeared after reopening. API start acceptance was not counted as completion. |

The tests used the existing Playwright library and **Chrome for Testing 156.0.8078.4**, isolated profiles, actual toolbar actions and actual downloaded files. Playwright CDP accessed toolbar popups because they are not normal tab Pages. No host permissions or product code were added just for testing. Native Chrome download preferences were used: a generic CDP download override would suppress extension naming and invalidate a filename test.

PDF headers, expected actual paths, correct title bytes, queue persistence and browser completion states were asserted. Browser shutdown, operating-system suspend/restart recovery and every supported file format/site have not been certified. Expected favicon/fixture HTTP 404 responses are not extension runtime exceptions.

## Exact free-downloader comparison

Comparator: **original Simple mass downloader 0.906**, fetched as its published Chrome package, extracted without changing it and loaded in a separate isolated browser profile. Package SHA-256: `dfe662171b34dfbc21d96941a82dbe243eb6b34de99b1e6ffc35d12e9a6e046f`. It is not redistributed in our beta ZIP. [Original listing](https://chromewebstore.google.com/detail/simple-mass-downloader/abdkkegmcbiomijcbdaodaflgehfffed).

Both tools used the same locally served PDFs, opaque file URLs, page markup and intended output names. The server introduced a 350 ms delay per PDF request. The mixed page has 15 descriptive anchors and 15 generic “Download PDF” anchors beside descriptive labels. The control page gives all 30 anchors descriptive text. These are authored fixtures, not a random sample of real websites.

For a fair configured comparison, SMD used its existing **Link text** mask (`{text}.{ext}`), PDF filtering, select-all, and one manually specified `SMD` folder. The test confirmed its saved mask and directory before enqueueing; it did not leave the comparator in its less helpful original-filename default. Its real popup was also closed during pending downloads.

| Recorded completed-run outcome | Batch Grab | Free SMD 0.906 |
|---|---:|---:|
| Mixed page: correct descriptive filenames | **30/30** | **15/30** |
| Mixed page: correct section-folder placements | **30/30** | **0/30** under the tested single-folder configuration |
| Control page: correct descriptive filenames | **30/30** | **30/30** |
| Control page: correct section-folder placements | **30/30** | **0/30** under the tested configuration |
| Files completed in each passing 30-file case | **30/30** | **30/30** |
| Pending jobs survived popup closure in passing cases | Yes | Yes |

**Measured difference:** the nearby-label rule recovered the 15 names missing from generic anchor text. **Parity:** descriptive-anchor naming and popup-independent downloading already exist in the free tool. SMD has advanced naming, folder-rule and editing capabilities; these tests did not exhaust those features. They do not establish that SMD cannot achieve the same organization with additional configuration/manual work.

**Repeat limitation:** two later SMD mixed-page attempts timed out under the test's 240-second limit. The first repeat had 24 files when inspected; the latest had 8. Their cause is unconfirmed. The successful-run JSON records and completed screenshots are retained, while the comparator download directory now contains partial repeat output. See `output/playwright/COMPARISON-REPEATS.md`. The summary combines recorded passing sessions; it is **not a claim that the last uninterrupted five-case run passed**. Final beta cases were rerun successfully after the queue fix. No reliability or speed advantage is inferred from the comparator timeouts; raw durations are diagnostic, not a repeatable performance benchmark.

We have not measured user task time, review effort, willingness to pay, conversion or production-site accuracy. The fixture result justifies testing the specific nearby-label workflow with real document collectors. It does not justify general superiority or a sales forecast.

## Demonstration screenshots

Actual preview from the packaged beta:

![Editable names, folders and resolved final paths](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/01-smart-naming-preview.png>)

Actual completed results after destroying and reopening the popup:

![Completed downloads after popup closure](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/02-completed-after-popup-closure.png>)

Actual failure reporting and edited-name workflow:

![Failed downloads and retry controls](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/03-failures-and-edited-names.png>)

## First genuine purchase

Use the invitation and evidence log in `FIRST-SALE-PLAN.md`. Recruit three opted-in independent document collectors with a current naming/organization task; test the same small task with their free tool and Batch Grab; count actual corrections and time; then offer the delivered version for **$5 once** if they prefer it. A prototype compliment or conditional promise is not revenue.

Payment setup is deliberately deferred. After an actual buyer asks to proceed, use an authorized existing invoice/payment-link service and deliver the versioned license/build with clear scope and refund terms. Count success only after a genuine target buyer pays for the delivered software and keeps the purchase. One $5 sale meets the $1 threshold for that month; subsequent months require additional sales.
