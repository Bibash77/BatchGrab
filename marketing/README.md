# Batch Grab first-customer launch kit

Local preview: http://127.0.0.1:8770/ (restart `node batch-grab/marketing/scripts/serve.cjs` from the project root if needed).

Start with MARKETING_PLAN.md, then CUSTOMER_CHANNELS.md and LAUNCH_CHECKLIST.md. LAUNCH_CONTENT.md contains five complete educational posts, three community drafts, invitation/purchase copy and the recording script. CHROME_STORE_LISTING.md contains copy, permission/privacy drafts and account-dependent steps. FIRST_SALE_TRACKER.csv is deliberately header-only; CURRENT_STATUS.json records the known starting $0/0-customer state.

- `site/`: actual portable static website; no server, API, analytics or payment dependency.
- `dist/batch-grab-launch-site.zip`: deployable static files, including the original beta/demo ZIPs and fictional fixture.
- `dist/batch-grab-0.3.1-store-candidate.zip`: separate icon-only candidate; original verified beta untouched.
- `store-assets/`: three actual-screenshot graphics, small tile and icons.
- `output/playwright/`: real local marketing QA screenshots and pass/fail evidence. QA draft content is not a lead or customer and must never enter the sales tracker.
- `launch-config.json`: public contact email/brand; actual public URL pending. Preview mode is intentionally noindex until approval.

All external publishing, messages, purchases and scheduling still require explicit owner approval. No external action was performed. Support email was supplied by the owner; never scrape or mass-message contacts.
