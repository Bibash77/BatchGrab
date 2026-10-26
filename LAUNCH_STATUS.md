# Batch Grab launch status

Checked 2026-10-26 (Asia/Tokyo). States: NOT STARTED, PREPARED, AWAITING APPROVAL, SUBMITTED, LIVE, BLOCKED.

| Component | State | Evidence / next step |
|---|---|---|
| Extension 0.4.0 release | PREPARED | 14-file production ZIP; hash below; runtime unchanged |
| Vercel website | LIVE | https://project-m1fyy.vercel.app — owner-approved production upload; Ready plus independent unauthenticated verification |
| English/Japanese discovery and onboarding | LIVE | Published, correct assets; local responsive suite passed at 375/768/1440; live Japanese render checked at 645px with no overflow |
| Free beta download | LIVE | Public browser download completed; exact release SHA-256 verified |
| Public privacy/support/FAQ | LIVE | English/Japanese policy, source-host/local-storage/retention limits and Vercel/Gmail disclosures verified |
| Chrome Web Store item | PREPARED | Draft mbeiingcdkhboociiidafkphfefkngoi, 0.4.0, English/Japanese, Tools, prepared assets and five explanations saved |
| Chrome website URLs | PREPARED | Live homepage, /faq.html and /privacy.html saved in unpublished draft |
| Publisher contact verification | BLOCKED | Google shows public contact ronaldoibibash310@gmail.com as Unverified; owner needs access to that exact inbox. Asked whether the address is accessible or a typo. No substitute address chosen |
| Final privacy declarations / certifications | AWAITING APPROVAL | Data categories and all three certifications untouched; exact proposed mapping in STORE_APPROVAL_PACKET.md; owner must review publisher trader/non-trader declaration |
| Chrome review submission | NOT STARTED | No review submitted or public listing URL known; requires completed verification and explicit review-submission approval |
| Store publication | NOT STARTED | No automatic/publication action approved |
| Analytics | PREPARED | Memory-only website hooks; no transmitted events or extension telemetry; Vercel Web Analytics not enabled |
| Marketing placements | PREPARED | Three exact drafts in marketing/THREE_LAUNCH_PLACEMENTS.md; site links now real |
| Marketing posts | AWAITING APPROVAL | No Reddit post/comment or external outreach published |

## Verified release and deployment

- Repository: https://github.com/Bibash77/BatchGrab
- Production ZIP: dist/batch-grab-0.4.0-production.zip, version **0.4.0**, 14 production files.
- Extension/beta ZIP SHA-256: **60a442a92b7576b633718fba672471c120ac17d4f8b79cf436ae6c4f8975f63d**.
- Approved static upload ZIP SHA-256: **e52fde389ce61c9c54045ea1f684a8b0ac1c02d83175d1d7abd5f6d414a749b2**, 68 files, 489,505 bytes.
- Content source revision: ba1b1b65c9a21bafce1cae245d42861b96d46f49. Site configuration in repository is now synchronized to the approved public origin.
- Vercel account: ronaldobibash310-8002; team **bib’s projects / bibs-projects-f9270923**, observed Hobby.
- Existing project: **batch-grab**, **prj_WLJ1viALkGAOfKNStBx82yB793HU**.
- Deployment dashboard: https://vercel.com/bibs-projects-f9270923/batch-grab/EM4RmkeLGsAnbTyoymXTdx2G9z9G
- Observed deployment URL: https://batch-grab-2i31vgofl-bibs-projects-f9270923.vercel.app
- Production origin: **https://project-m1fyy.vercel.app**.
- Source: Vercel Drop. No Git integration, paid service, domain purchase, database, function or analytics activation performed.
- Store draft: https://chrome.google.com/webstore/devconsole/29920f8c-2190-438e-a8aa-0b336da3e75a/mbeiingcdkhboociiidafkphfefkngoi/edit
- Store public URL: unknown; not invented.

## Test evidence

Independent HTTPS checks passed for **67 published files** (all uploaded public assets except the platform configuration file), including **22 pages**, images, both language policies, robots/sitemap, two ZIPs and **30 PDFs**. All file hashes match the approved candidate. CSP, nosniff, no-referrer and HSTS verified on every response; fixture/download noindex headers verified. Root route also matches index.html. Browser beta download completed and independently matches the release hash. Live English and Japanese pages and visible image loads checked.

The release-check requests had a median 0.251s and maximum 0.571s at concurrency four, including TLS/body transfer. These are one-run observations, not Core Web Vitals, load-test results or guaranteed performance. Browser tool completion for the download took unusually long despite the successful small-file HTTP checks; no general download-time claim is made.

Existing local browser suite passed after production configuration: 22 pages at 375/768/1440, zero broken links/errors/external requests, 30 working PDFs, exact downloaded ZIP hash, SEO/preview separation. The verifier now restores the configured mode after its isolated SEO checks. Prior extension naming/visual/security/storage rollback, five fixture workflows and English/Japanese toolbar/Unicode tests remain passed as recorded in docs/RELEASE_0.4.0.md and earlier launch verification; no runtime change required retesting them again.

Raw local results/screenshots: marketing/output/launch/live-verification.json, live-home.png, live-home-ja.png, store-contact-email-handoff.png and store-remaining-requirements.png. Local test outputs are excluded from Git. Concise public evidence: marketing/LIVE_VERIFICATION.md.

## Remaining owner actions

1. Complete Google’s contact-email verification for the exact confirmed public support inbox. It differs from the signed-in publisher address ronaldobibash310@gmail.com. No codes, credentials or private inbox contents need to be shared. If the contact was a typo, provide an explicit correction before any website/store changes or replacement deployment.
2. Review the publisher's existing trader/non-trader declaration and any required address/identity fields personally. No legal identity facts or declarations were invented or changed.
3. Review exact listing/privacy/permissions in STORE_APPROVAL_PACKET.md; grant separate approval for final certifications and review submission. Current distribution settings observed: Free of charge, Public, All regions; unchanged. No approval for automatic publication has been assumed.
4. Approve exact marketing content/destination separately before public posting. Store CTA remains honest developer-mode beta access until a real approved store URL is verified.

## Actual adoption

Visits, install CTA events, installations, weekly active and returning users: **not measured / no confirmed real-user records**. Successful real users: **zero confirmations recorded**. Revenue: **zero confirmed**; no payments collected or infrastructure built. All agent verification traffic/downloads are QA and excluded from adoption.
