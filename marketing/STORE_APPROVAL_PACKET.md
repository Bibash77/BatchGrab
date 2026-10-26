# Chrome Web Store approval packet — Batch Grab 0.4.0

Prepared 2026-10-26. This file is proposed form content, not a submitted declaration.

## Exact package

File: `../dist/batch-grab-0.4.0-production.zip`
Version: 0.4.0
SHA-256: `60a442a92b7576b633718fba672471c120ac17d4f8b79cf436ae6c4f8975f63d`
14 allowlisted production files. No test pages, browser profiles, user records, payments or telemetry sender.

Authenticated publisher observed: `ronaldobibash310@gmail.com`.
Publisher dashboard: https://chrome.google.com/webstore/devconsole/29920f8c-2190-438e-a8aa-0b336da3e75a
The owner enabled two-step verification and the explicitly approved ZIP upload succeeded. Draft item: `mbeiingcdkhboociiidafkphfefkngoi`.
Draft URL: https://chrome.google.com/webstore/devconsole/29920f8c-2190-438e-a8aa-0b336da3e75a/mbeiingcdkhboociiidafkphfefkngoi/edit
Package page confirms 0.4.0, English/Japanese and activeTab/scripting/downloads/storage/alarms; it explicitly states the item is not published. Owner subsequently approved unpublished listing edits. English/Japanese descriptions, Tools, prepared icon/screenshots/tile, single purpose, all five explanations and remote code=No are saved. Final data selections and certifications remain untouched. Public support/privacy URLs await actual website deployment. No review submission or publication has occurred.

The public support address in existing source is `ronaldoibibash310@gmail.com`, which differs from the publisher address. The owner explicitly confirmed keeping the original public support address ronaldoibibash310@gmail.com. Do not replace it with the account address.

## Listing

Name: Batch Grab
Default locale: English; Japanese localization supplied.
Price: Free. No in-app purchase, account, checkout or subscription.
Category: Tools (observed live dashboard option under Productivity).
Short description: Preview and download webpage images and documents. Review filenames, organize folders, and check actual download results.
Full English/Japanese listing text: CHROME_STORE_LISTING.md (use the exact sections as written).
Screenshots: store-assets/01-collect-images.jpg, 02-organize-documents.jpg, 03-check-outcomes.jpg, 04-japanese.jpg; 1280×800 each. They show actual interface captures on fictional fixtures. Optional tile: small-promo-440x280.jpg. Icon: icon-128.png, 96px content with 16px transparent padding.

Support website and privacy URL: pending an approved and live HTTPS origin. Required final paths are /faq.html and /privacy.html. No invented URL or local URL should be submitted as a public policy.

## Exact single-purpose text

Batch Grab lets the user select accessible image and document resources on the webpage they invoke it on, review filenames and folders, download the selected files, and inspect actual Chrome download outcomes. Advanced filters and a local source/outcome CSV support that same file-collection task.

## Exact permission justifications

| Permission | Draft justification |
|---|---|
| activeTab | Grants temporary access to the webpage where the user explicitly opens Batch Grab, so the extension can identify accessible image and document resources. No persistent all-sites access is requested. |
| scripting | Executes the packaged DOM scanner in the invoked page to read resource links, labels, image dimensions and nearby context for the file picker and naming suggestions. |
| downloads | Starts user-selected downloads, reads completion/error and saved-path information for those jobs, and saves a CSV only when the user explicitly requests it. |
| storage | Stores the last scan draft, preferences and accepted download jobs in the user's local Chrome profile so the popup can reopen and accepted work can continue. |
| alarms | Periodically reconciles accepted download jobs with Chrome's download records when the popup is closed or the worker restarts. |

Host permissions: none declared. No optional broad host permissions. Remote code: **No**. All executable JS is packaged in the ZIP; remote images are preview data, not executable extension code.

## Data handling statement for owner approval

The extension reads current-page URLs, resource URLs, link/nearby labels, headings, image context and dimensions when invoked. It stores a local page draft and local download-job metadata including source URLs, filenames/folders, requested and actual paths, Chrome download IDs, statuses, errors and timestamps. Labels/source URLs can incidentally contain personal information or access tokens. Source requests and image previews go to their original hosts; there is no Batch Grab collection server, analytics SDK, cloud naming service or account system.

Finished/failed history is capped at 500 attempts and 30 days, pruned on worker startup/queue activity. Pending jobs remain. The last scan can be cleared in Options; settled history can be cleared independently. Uninstall clears extension storage but does not delete physical downloads, CSV exports or Chrome's own records. CSV export is explicit and local; the user must review private source URLs and paths before sharing.

Proposed purpose-limitation certifications: no sale of user data; no unrelated transfer, advertising, profiling or credit/lending use. Information is used only for the user-facing file collection functionality. The owner must personally confirm these certifications and publisher/account declarations before submission.

## Data category mapping — inspect the current form before certifying

Confirmed handling to disclose: **website content** (page labels/resource metadata), **current-page/resource URLs** (the dashboard may group this under web history), and **download interactions/history** (may fall under user activity). This is limited to invoked pages and extension downloads, not a browser-wide history collector.

The extension does not deliberately request names/contact details, financial/payment data, health data, messages, precise location, passwords or cookies. It can nevertheless retain incidental sensitive text or signed URL query parameters from the chosen page. Do not tick a blanket “no data handled” declaration just because storage is local. Check the actual dashboard category definitions and how incidental local content is classified; record the exact selections and show them to the owner before final certification/submission. Unobserved category selections remain unresolved rather than being fabricated.

[Official privacy-form guidance](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) explains the purpose, permission and remote-code fields. [Google's user-data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq) explicitly requires disclosure even for local handling.

## Minimal manual fallback

1. In the observed publisher dashboard, click New item → Select file and choose the exact production ZIP above. This creates a draft only.
2. Confirm Batch Grab / 0.4.0 after server-side validation. Record the new item ID and draft URL.
3. Fill listing, actual category/languages, and upload the four screenshots/icon. Save draft; do not press Submit for review.
4. Fill single purpose, five permission justifications and remote code = No. Review actual data-category definitions and record proposed selections for owner review.
5. Add the verified public support/privacy URLs after website deployment. Confirm the intended support email and publisher verification fields yourself; do not invent legal identity data.
6. Show the complete saved draft and exact privacy selections to the owner. Request explicit approval before Submit for review or automatic publication settings. Review/submission status stays NOT STARTED until the site reports otherwise.
