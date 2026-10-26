# Batch Grab 0.4.0 — free launch candidate

Prepared and tested October 26, 2026. The goal is 10 real successful users, then 50–100 active users. Those are goals, not observed results. No deployment, store submission, public promotional post, external message or adoption claim is made.

## Delivered

- Free-first Chrome extension with English/Japanese locale files, language selector and first-run guidance. Existing scanner, classifications, image previews, document naming, optional filters/templates/folders, CSV and actual outcome tracking remain.
- Better unsupported/empty states, stale scan removal on scan failure, reset filters action, selection feedback and visible results after job acceptance. Download remains visible with expanded options/outcomes in the tested popup size.
- Retention cap and queue metadata minimization, trusted-context storage, sender checks, protocol/credential checks, byte-budget admission, and rollback on failed durable storage. See SECURITY_AND_PRIVACY.md.
- Production ZIP with root manifest, explicit CSP, icons, packaged code and locales only. Canonical unpacked beta and store candidate match the reviewed runtime; historical 0.3.1 artifacts remain separately named.
- Existing website updated to free images/documents positioning, 22 static pages including essential English/Japanese pages and five retained useful guides. No purchase-interest form or checkout. Verified-store CTA gating; honest ZIP beta until a real listing exists.
- Vercel root config and production SEO generation. Preview isolation, canonical/hreflang, sitemap/robots, static privacy/support pages and actual screenshots. Production origin/approval remain unconfigured intentionally.
- Local-only website event hooks, inactive analytics integration plan, opt-in extension measurement design, blank private-use tracker template, current store copy, launch drafts and 10/50/100-user plan.

## Verification results

Browser: Chrome for Testing 156.0.8078.4; Playwright 1.64.1 using the repository's existing CDP/native toolbar test harness. The CLI wrapper could not fetch its package in the restricted environment; no new automation was installed. This does not prevent the existing Playwright library tests.

| Check | Observed result |
|---|---|
| Existing pure naming/filter safety assertions | 23 passed |
| Existing visual/evidence helper assertions | 19 passed |
| New security helper coverage | Schemes/credentials, path traversal, queue minimization/byte cap, history retention, CSV formula prefixes, CSP and en/ja key/placeholder parity passed |
| Storage failure regression | Rejected enqueue, zero download starts, no orphaned memory jobs |
| Gallery | 6 content images separated from 6 assets; uncertain names require acceptance; 8 suggested files saved with verified outputs |
| Product catalogue | 12 context-labelled small images remain in Suggested |
| Large controlled gallery | 5,000 images, 60 rendered cards; oversized draft not cached; search/page switching and selection limit passed |
| 30-document fixture | 30 exact intended names/folders and byte-verified outputs; popup closure passed |
| Failure fixture | Deliberate missing/temporary failures visible; one temporary failure manually recovered; unresolved versus retried summary correct |
| Worker lifecycle | 120 actual completed files after popup closure and real worker stop/restart; no duplicate Chrome downloads |
| Japanese workflow | Real toolbar language change/persistence, completion text, regex error/reset, unsupported page, scan deletion preserving jobs, and actual Unicode output 公開資料.pdf passed |
| Browser DOM safety | Hostile label remained text; unsafe schemes excluded/rejected; zero unexpected downloads |
| Discovery regression | Responsive/lazy variants, open roots/accessible frames, extended sources, real PDF/CSV/XLSX bytes and Japanese names passed |
| Public smoke tasks | NASA gallery image, Books to Scrape catalogue image and IRS Form W-9 PDF each downloaded successfully |
| Website | All 22 pages checked at 375/768/1440 widths; zero broken internal links, page errors or external requests; direct beta ZIP hash matched |
| Website SEO/config | Synthetic approved production config generated canonical/hreflang/robots/sitemap; staging stayed noindex even with approved config; preview build restored afterward |
| Store CTA | Synthetic configuration wiring passed without contacting the example URL. No real store listing was verified |
| Store candidate | Loads in Chrome, localized manifest/version 0.4.0, 4 icons, 5 exact permissions, 30 document cards |
| Release archive | 14 allowlisted files, source/package hashes match, store ZIP identical, no tests/profiles/docs/contact data and no credential patterns found |

A controlled large-list run observed roughly 732 ms to scan/render/cache decision, 10 ms page switching and 206 ms search on this machine. These are engineering observations from one fixture run, not production latency guarantees or human task-time savings.

Accessibility checks include semantic labels, one H1 per webpage, image alternatives, skip navigation, visible focus styles, bounded popup action position and responsive overflow. This is not a full WCAG audit or screen-reader certification. Japanese browser UI was tested; source labels, filenames and native Chrome errors are not translated.

Early iterations caught the expanded-panel action overflowing, a test waiting for an intentionally uncached large draft, stale download suffixes in reused test output, and test expectations that confused All files with Documents. Fixes/corrected test setup were followed by passing runs. Initial failures are not hidden or counted as successful verifications.

## Evidence locations

Sanitized machine-readable summary: RELEASE_VERIFICATION.json. Package files/hashes: PACKAGE_VERIFICATION.json. Full local run JSON, screenshots and actual test downloads remain under ignored output/playwright/visual-v0.3/ and marketing/output/playwright/. These contain controlled/public test data and are not user adoption records. Current actual screenshots are committed in marketing/src/assets and store-assets.

Website test output: marketing/output/playwright/verification.json. Candidate test output: marketing/store-submission/verification.json. Deployment ZIP: marketing/dist/batch-grab-launch-site.zip. Complete launch bundle: marketing/dist/batch-grab-free-launch-0.4.0.zip.

## Remaining limitations

No restricted-content bypass, crawling, automatic scrolling, cross-origin frame access, closed-shadow access, document-content understanding, streaming capture or format conversion. Classification/labels can be wrong. A saved response can be a login/error page; important contents need checking. Unknown image formats can remain extensionless. Full Chrome shutdown/OS sleep recovery and older supported Chrome versions are not certified. Website analytics and opt-in extension measurement are not enabled. Vercel service build/deployment and Web Store review have not been performed.

## Exact owner actions

1. Review publisher identity and privacy/support wording, including chosen host logs/retention. Approve free production distribution.
2. Provide/select the real Vercel project/origin and approve external deployment. Follow marketing/LAUNCH_CHECKLIST.md; productionApproved and PUBLIC_ORIGIN are gated, preview deployments stay non-indexable.
3. Use the owner Chrome developer account to review/upload/submit the production ZIP and store assets; registration/verification or fees require the owner's action/approval.
4. After approval/public listing, verify the real listing URL and set chromeStoreUrl + storeVerified before changing installation CTAs. No fabricated URL or unpacked ID.
5. Approve exact community drafts/destinations before any posting or external outreach. Recheck rules/account eligibility.
6. Keep analytics off unless separately approved and implemented. Use voluntary manual successful-task confirmations for the first 10; define active/repeat use separately.

The brief explicitly reserves deployment, submission and outreach for owner approval. All feasible local implementation and verification have been completed; no real users, successful deployment or store acceptance are inferred.
