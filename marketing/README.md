# Batch Grab free launch kit — 0.4.0

The current offer is a free image/document collection extension. The earlier $5 material in archive/ and legacy 0.3.1 ZIPs is historical, not the active launch.

Start with LAUNCH_CHECKLIST.md, MARKETING_PLAN.md, CHROME_STORE_LISTING.md and MEASUREMENT_PLAN.md. The existing CUSTOMER_CHANNELS.md is the earlier source shortlist; current conditional placements and free drafts are in LAUNCH_CONTENT.md. Recheck rules before posting.

`src/` contains the existing site's static source/design, now free-first. `locales/en.json` and `locales/ja.json` supply core onboarding content; `scripts/prepare-pages.py` generates essential bilingual pages and the retained educational articles. `site/` is the deployable static output. `../vercel.json` configures Vercel from the repository root. `launch-config.json` defaults to unapproved preview with no store URL and no analytics. Do not enable production with a fictional origin.

Local commands from repository root:

```sh
python3 marketing/scripts/prepare-pages.py
node marketing/scripts/build-site.cjs
node marketing/scripts/serve.cjs
node marketing/scripts/verify-site.cjs
node marketing/scripts/capture-store-assets.cjs
node scripts/build.cjs
node marketing/scripts/prepare-store.cjs
node tests/verify-package.cjs
```

Store capture updates icon source assets, so rebuild the extension afterward. Site screenshots are actual controlled-fixture captures, committed under src/assets for reproducible website builds; refresh them only from current browser evidence. No AI-created product screenshots.

No deployments, store submissions, posts, email campaigns, measurements or payments are performed by these scripts. Website measurement hooks remain in page memory; they are not a collected analytics service. Tracker templates contain no users/results. Place any actual participant data under ignored private/ and obtain consent.
