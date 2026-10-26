# Chrome Web Store listing and publication draft

Prepared 2026-10-22. **Not uploaded, submitted, reviewed or published.** The original verified beta package is unchanged. A separate icon-only store candidate adds brand assets to the manifest; its five other runtime files are byte-identical, and real Chrome load/30-document scanning passed. The owner must approve publisher identity, privacy wording, final distribution/license and submission.

## Listing copy to paste

**Name:** Batch Grab (matches the package name).

**Short description (102 characters):** Download accessible web documents with reviewed names, section folders and a local source/outcome CSV.

**Suggested category:** the relevant productivity/workflow category offered by the current dashboard; inspect current choices, do not fabricate an exact category label.

**Language:** English. **Version:** 0.3.1. **Contact:** ronaldoibibash310@gmail.com. Publisher display name must be confirmed through the owner’s actual developer account; website brand “Batch Grab” is not a claimed registered legal identity.

### Long description

Batch Grab helps you prepare a readable document folder from an accessible webpage.

Open a page containing report or attachment links, scan it, review document names and section folders, select the files you need, and download them through Chrome. The local source-and-outcome CSV connects original page/URL references with actual saved paths and reported outcomes.

Document Handoff beta features:

- Editable filename suggestions from visible link text, relevant nearby labels and page sections.
- Visual file selection, with Documents, Images, Review, Site assets and All files views.
- Advanced type/search/width/regex filters, filename templates and editable subfolders.
- Background jobs that remain after popup closure while Chrome stays running.
- Actual Chrome completed/failed states and manual failed-attempt retry.
- A locally saved CSV with source URLs, names, actual paths, outcomes and timestamps.

Names and classification are rule-based suggestions. Batch Grab does not read inside PDFs or verify document contents. Chrome’s completed status means a response was saved, not that it was the intended file.

Limits: 500 files per batch, 1,000 pending jobs and 10,000 scan results. No combined multi-page collection, spreadsheet/URL import, ZIP, conversion or paywall/CAPTCHA/subscription bypass. Page markup and resource access vary. Browser shutdown/OS suspension and every site/device are not certified.

This is beta 0.3.1. Evaluation is free. A $5 one-time delivered-version Document Handoff offering is being evaluated; payment infrastructure is not active. No subscription, checkout or automatic charge is included. We do not claim customer results or guaranteed savings.

## Single purpose / permission justifications

**Single purpose:** Help users collect and organize downloadable resources from a webpage they invoke the extension on, with reviewable names and a local download-outcome record. Document Handoff is the focused marketing workflow; image selection serves the same collection purpose.

| Permission | Draft justification reflecting actual code |
|---|---|
| activeTab | Temporary access to the page the user invokes Batch Grab on, to read resource URLs and document/image context |
| scripting | Inject the packaged scanner into that authorized page to inspect exposed links, labels and accessible page roots |
| downloads | Start user-selected transfers, inspect Chrome IDs/status/errors/actual filenames and export the local CSV |
| storage | Retain local drafts, selections, job metadata and outcome history so accepted jobs survive popup closure |
| alarms | Periodically wake queue reconciliation and resume/reconcile pending work while Chrome is running |

No persistent all-sites host permission, clipboard permission, account access or AI service is requested by 0.3.1. **Remote code:** No; scanner and runtime are packaged. Fetching source images/files is not loading remotely hosted executable code. No eval/remote script dependency was added.

## Privacy practices — describe handling, not “no data exists”

The extension handles selected page URLs, link/nearby text, headings, image metadata, chosen names/folders, download identifiers, actual paths, status/errors and timestamps. They stay in local extension storage or user-exported files. Original hosts receive ordinary preview/download requests. There is no Batch Grab telemetry/server, ads, cloud account or inference service.

Use the live dashboard definitions to map this honestly. Website content and selected source URLs are handled locally. Do not automatically tick “no data” simply because there is no backend. If the dashboard distinguishes developer collection/transmission from local handling, describe that distinction and use the applicable fields; verify ambiguous categories with store guidance instead of guessing. No payment/financial/account data is handled by the extension. Website contact emails voluntarily sent to the publisher are a separate contact workflow described in the policy.

Owner must review/certify the actual Limited Use/data-use statements. Do not submit certifications blindly or assume this draft guarantees acceptance. [Official privacy fields](https://developer.chrome.com/docs/webstore/cws-dashboard-privacy) and [User Data FAQ, including local-storage privacy-policy requirement](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq).

**Privacy URL after approved hosting:** actual public `privacy.html` URL. The implemented draft explains processing, retention/deletion, original-host requests, CSV sensitivity, optional email contact and inactive payments. Owner still needs to approve final publisher/hosting/contact-retention wording and remove draft-review language before publication. Never use localhost as a store policy URL.

## Graphics and packages prepared

- `store-assets/01-review-names.jpg`, `02-check-outcomes.jpg`, `03-retain-sources.jpg`: 1280×800 full-canvas JPEGs containing unedited real beta screenshots and truthful captions, not fabricated UI.
- `store-assets/small-promo-440x280.jpg`: brand/promise tile, not a fake screenshot or customer claim.
- `store-assets/icon-128.png` and 16/32/48 variants: brand icons.
- `dist/batch-grab-0.3.1-store-candidate.zip`: original runtime with only icon declarations/assets added. Not the same hash as the original beta ZIP; `store-submission/build.json` records the distinction. `store-submission/verification.json` records Chrome load and 30-card scan.
- `site/downloads/batch-grab-0.3.1-beta.zip`: the unchanged, previously verified six-file beta used for free developer-mode evaluation. Keep the packages distinguishable.

[Official image requirements](https://developer.chrome.com/docs/webstore/images): at least one real-experience screenshot, supported 1280×800 or 640×400 dimensions, square corners/full bleed. The dashboard can change and has the final validation; three screenshot assets, a small tile and a 128 icon are supplied here. Do not claim approval of these graphics.

## Owner-account publication sequence

1. Sign into the intended [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole). Confirm publisher/account eligibility and current verification/security requirements. Registration can involve a one-time fee; inspect the actual amount/currency and obtain explicit paid-action approval before paying. None has been paid in this task. [Official registration](https://developer.chrome.com/docs/webstore/register/).
2. Approve final distribution/license and public URLs. Confirm no same-or-higher version has already been published to the intended extension item; if there is one, prepare an appropriately versioned candidate and reverify.
3. Upload the separate store candidate as a **draft** using owner account access. Paste copy, approved privacy URL, permission justifications and graphics. Inspect every preview and dashboard warning.
4. Choose the owner-approved public/unlisted/testing distribution and review instructions. Start with a fictional public fixture, no credentials required. Beta availability does not mean review exemption.
5. Obtain explicit approval for submission/release. Follow the current dashboard review/publish controls; do not click Submit for review/Publish automatically, pay a fee or change visibility without approval. [Official publishing steps](https://developer.chrome.com/docs/webstore/publish).
6. After actual approval/publication, record the literal listing URL, verify installation/description/permissions in a clean profile, and update the website’s installation CTA. Do not invent a store URL or promise a review deadline.

Current blockers are owner account/identity, approved public deployment/policy/distribution terms and explicit submission/publication approval. Draft copy, assets, verified beta and icon-only submission candidate are ready locally; no external store state was created.
