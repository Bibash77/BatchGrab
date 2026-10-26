# Owner launch checklist — free 0.4.0

## Prepared locally

- [x] MV3 extension, minimal permissions, packaged code only.
- [x] Free-first English/Japanese popup and bilingual essential website pages.
- [x] Canonical runtime ZIP with icons/locales; separate demo and website archives.
- [x] Actual workflow screenshots and store listing drafts.
- [x] Static Vercel configuration, honest pre-store beta CTA.
- [x] Preview noindex, production canonical/robots/sitemap generation with explicit origin/approval gate.
- [x] Local-only measurement hooks and separate opt-in extension measurement design; no telemetry enabled.

See docs/RELEASE_0.4.0.md and verification JSON for actual test outcomes. Prepared does not mean submitted or deployed.

## Owner account/access and explicit approvals required

1. Review publisher identity, support contact and privacy policy, especially eventual Vercel logs/retention and support correspondence handling. Approve public distribution of the free 0.4.0 build.
2. Choose/confirm the real Vercel project and HTTPS origin using your account. Do not invent an available project URL or purchase a domain. Avoid automatic production deploys before this approval.
3. In marketing/launch-config.json set productionApproved=true and publicOrigin to that approved HTTPS origin. Keep analytics=false and storeVerified=false until their separate conditions are met.
4. Import Bibash77/BatchGrab into Vercel with root directory the repository root, framework Other/static, no install command, build command `node marketing/scripts/build-site.cjs`, output `marketing/site`. Use vercel.json. Set PUBLIC_ORIGIN to the approved origin. Preview deployments stay noindex even with approved config; only production generates indexable metadata. LAUNCH_PUBLIC=1 is for explicitly approved local production builds.
5. With explicit deployment approval, deploy, then independently check HTTPS, headers, all links, direct beta ZIP/hash, Japanese pages, robots/sitemap/canonical and preview isolation. Local configuration validation is not a Vercel service deployment test.
6. Sign into Chrome Web Store developer dashboard. Owner completes registration/verification and any fee shown. Approve upload/submission/publication. Upload dist/batch-grab-0.4.0-production.zip, listing/screenshots and real policy/support URLs. Review dashboard disclosures against SECURITY_AND_PRIVACY.md.
7. After store approval, verify the public listing's product, publisher, version and install behavior. Set chromeStoreUrl to the exact canonical listing URL and storeVerified=true, rebuild and deploy with approval. A syntactically valid URL is not evidence of a real listing.
8. Recheck current community rules/account eligibility, approve exact drafts and destinations, then publish manually or authorize assisted posting. No public posts or external messages have been sent by this work.
9. For optional analytics, separately approve provider/plan/data handling and implement the reviewed adapter, update privacy text and inspect network payloads. Current build rejects analytics=true. Extension measurement remains design-only and disabled.

## Can be automated locally now

`npm test`; `node scripts/build.cjs`; browser suites with available Chrome/Playwright; `node tests/verify-package.cjs`; `node marketing/scripts/build-site.cjs`; website browser verification; store asset capture and candidate preparation. These do not require public launch.

## Real-user follow-through

Use incoming volunteers and permitted placements. Track actual task completion, failures and repeat tasks in a private copy of ACTIVE_USER_TRACKER.csv. First milestones: 10 confirmed successful users; 50 and 100 users with confirmed activity in a stated trailing 28-day window. No website click or QA test establishes those milestones.
