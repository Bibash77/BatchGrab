# Launch checklist — ready locally, approval still required

Prepared 2026-10-22, Asia/Tokyo. Public beta contact supplied by owner: **ronaldoibibash310@gmail.com**. Website brand: **Batch Grab**; confirm the actual Chrome developer publisher identity separately. No deployment, public post, external message, paid action, payment infrastructure or external schedule was created.

## Completed locally

- [x] Inspect 0.3.1 source, six-file build hash and existing browser verification evidence; rerun 42 naming/classification helper assertions.
- [x] Product-focused static landing page, beta installation/download, screenshot walkthrough, pricing/interest page, FAQ/privacy draft and five useful guides.
- [x] Copy real product screenshots unchanged; label fictional fixture data and limitations.
- [x] Versioned original beta ZIP and demo ZIP downloadable from the static site; original product ZIP SHA verified.
- [x] No active checkout, card input, order registration, server form submission, cookies, analytics or testimonial/customer counter.
- [x] Optional local draft text → copy / save text / open email composer. User must send manually. No email sent by the operator or QA.
- [x] Twelve current public venues documented, including exclusions, rule sources, permission status, draft and next step for each.
- [x] Three venue-specific drafts; five educational posts; warm invitation, purchase ask and recording script.
- [x] Chrome Store listing/privacy/permission draft; three real-screenshot graphics, promo tile and icon sizes.
- [x] Separate icon-only submission candidate; unchanged JS/HTML/CSS runtime, clean Chrome load, exact permissions and 30-document scan.
- [x] Header-only FIRST_SALE_TRACKER.csv; unknown data left blank, known $0/0-customer baseline separate. QA excluded.

## Local preview / reproducible commands

From the existing project root:

```sh
python3 batch-grab/marketing/scripts/prepare-pages.py
node batch-grab/marketing/scripts/build-site.cjs
node batch-grab/marketing/scripts/serve.cjs
```

Open `http://127.0.0.1:8770/`. The serving process is loopback-only, not a public deployment. It can be restarted with the command above. Static deployed pages do not require Node, Python, a database, API key or model service. Development/test commands use the dependencies already installed in this workspace.

QA / store assets:

```sh
node batch-grab/marketing/scripts/verify-site.cjs
node batch-grab/marketing/scripts/capture-store-assets.cjs
node batch-grab/marketing/scripts/prepare-store.cjs
node batch-grab/marketing/scripts/verify-store.cjs
node batch-grab/marketing/scripts/build-site.cjs --check-launch
```

The last command intentionally exits 2 while preview mode/public URL are unresolved. That is an honest launch gate, not a failed product test. `output/playwright/verification.json` and `store-submission/verification.json` record actual executed results. Earlier test-harness corrections handled lazy screenshot loading and CSS-uppercase text assertions; final passing checks are not a fake customer trial.

## Owner decisions before the public launch

- [ ] **Approve distribution and software-use terms.** The evaluation exposes the full workflow. Confirm permission to publish the executable beta/demo; do not invent a restrictive or open-source license. No payment enforcement exists.
- [ ] **Approve the privacy/contact draft**, including publisher identity, contact retention/deletion handling and actual host logs. Current policy explicitly remains a draft; remove draft-review language only after approval. Local processing still needs accurate store disclosure.
- [ ] **Choose/authorize the public host and hostname.** No public URL has been invented or provisioned. Confirm a free account/plan; do not select a paid upgrade or purchase a domain without separate approval.
- [ ] **Approve deployment** of the reviewed static archive. Approval to prepare assets is not approval to make them public.
- [ ] **Approve C01 and C02 separately** by exact draft and placement. Recheck live rules/account/flair requirements. Scheduling a post is also an external publishing action needing approval.

## Recommended deployment path: Cloudflare Pages Direct Upload

This is an actionable static-upload option, not a newly created infrastructure dependency. The site is buildless and has no runtime functions. The owner needs a Cloudflare account and an available Pages project name. [Official Direct Upload](https://developers.cloudflare.com/pages/get-started/direct-upload/) and [current limits](https://developers.cloudflare.com/pages/platform/limits/) explain the dashboard ZIP/folder workflow. Confirm free-plan eligibility and current dashboard controls; no paid plan has been selected.

1. After explicit deployment approval, sign into the owner’s Cloudflare dashboard, open Workers & Pages and the Pages Direct Upload / drag-and-drop path, and choose an available project name. Do not enter credentials in chat or save API tokens in project files.
2. Obtain/confirm the actual intended HTTPS project URL from the account UI. In `launch-config.json`, set `publicOrigin` to that URL (include any base path), keep the supplied contact email, and change `mode` to `public` only after the privacy/content approval. Keep analytics false and payments inactive.
3. Update approved privacy wording in `scripts/prepare-pages.py`, regenerate pages, rebuild and run `--check-launch` plus local verification. Public mode generates canonical tags and permits indexing of marketing pages; fixture pages remain noindex. The QA script checks robots/canonical tags against the configured mode; keep the same functionality assertions.
4. Upload **only** `dist/batch-grab-launch-site.zip` (its root contains index.html), or the contents of `site/`. Do not upload the marketing tracker, drafts, raw local test output, profiles, source reports, or the whole workspace.
5. Review the exact deployment target and click Deploy only within the owner-approved launch scope. Record the literal returned URL. Check the live homepage, beta ZIP SHA, email-composer target, FAQ/privacy and fixture. No example/localhost links should appear in public posts.
6. If final hostname cannot be known until the provider creates an initial deployment, explicitly obtain approval for that preview/noindex deployment first; then update to the actual URL, rebuild, and publish the approved public version. Do not present a guessed hostname as live.

The static archive is portable; Sites or another owner-approved static host can also serve it. Do not automatically use GitHub Pages for a sales-oriented website: [GitHub’s limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits) restrict online-business/commercial-transaction hosting. GitHub README/releases can still be a separately approved documentation/distribution route.

## Exact publication steps for the two selected channels

### C01: r/smallbusiness Q4 promotion thread

1. Use the owner’s Reddit account. Open the actual [Q4 thread](https://www.reddit.com/r/smallbusiness/comments/1wwpjlw/promote_your_business_thread_for_q4_2026/) and re-read its text and current sidebar rules.
2. Replace `APPROVED_SITE_URL` in the C01 draft with the verified live URL; retain `utm_source=smallbusiness_q4_2026`. Keep free-beta, proposed-price, developer-mode and limitations wording.
3. Show the final comment for explicit approval. Post **one comment in that thread**, not a standalone promotion or market-research post. No questionnaire/tester recruitment or pain-point request in the comment.
4. Save the actual permalink/date to the tracker. Check logged-out visibility. If filtered/removed, stop and inspect the rule/moderation result; no repeated reposts or account switching. Any moderator message needs separate approval.
5. Respond only to relevant opt-ins with authorized, task-specific help. Do not DM everybody who comments or collect private client material.

### C02: r/chrome_extensions, Self Promotion

1. Recheck the [live community rules](https://www.reddit.com/r/chrome_extensions/), post composer, flair and account eligibility. If permission is unclear, prepare a moderator question rather than assume it.
2. Suggested title: **Batch Grab beta: reviewed names and a source index for web document folders**. Use Self Promotion flair if available; do not disguise maker affiliation as a user recommendation.
3. Use C02 copy, one actual document-picker image, and the verified link with `utm_source=chrome_extensions_launch`. Include the free evaluation/proposed $5/no checkout and developer-mode limitations.
4. Obtain explicit approval for that final post before Publish or any scheduling. One post, no vote requests or burst cross-posts.
5. Save permalink/date; qualify volunteers by an actual upcoming permitted document batch. Review the free alternative fairly, and do not call general feedback purchase intent.

No content has been uploaded or scheduled on an external account in this task. Browser tools can assist once the owner is logged in and gives the relevant concrete approval. Do not ask for passwords or paste auth tokens into files.

## What can be automated vs. what requires the owner

| Action | Can be automated locally? | Account / approval requirement |
|---|---|---|
| Build pages, package site, hash checks, screenshots, link/form/mobile QA | Yes, scripts provided | No public action |
| Generate store graphics and icon-only candidate | Yes, completed | No upload/publication |
| Prepare text and campaign URLs | Yes | Public URL must be real; drafts still need approval |
| Public hosting upload/deploy | Can assist through approved tools/UI | Owner host access + explicit launch approval; no paid upgrade |
| Upload a Chrome Store draft | Can assist after account access | Owner publisher/account eligibility; any registration fee separately approved |
| Submit/release extension | Can assist | Approved copy/privacy/distribution + explicit submit/publish approval |
| Reddit posts, replies, modmail, email or scheduling | Can assist individually | Logged-in owner account and explicit action/message approval; never mass DM |
| Interpret actual opt-in emails and update tracker | Local bookkeeping with owner-supplied evidence | No mailbox access assumed; private data kept outside published site |
| Set up invoice/payment link or collect $5 | Deferred | Separate authorization, owner seller account, terms/fees/refund/delivery approval |
| Count visits | Not currently implemented | Use approved host aggregates only if available/defined; no hidden analytics |

## First sale and monthly follow-through

Use the trial and purchase ask in LAUNCH_CONTENT.md. A source draft, download, favorable answer, unpaid invoice or owner test is not revenue. After the first genuine cleared $5 software purchase, record delivery, fees, refunds and support minutes. Confirm it was for use, not a favor/donation.

A $5 gross sale meets the $1 goal for that month only. Ask permission for a factual case study and one relevant introduction, then seek a new legitimate buyer next month through the same permitted route. No automatic repeat billing or repeated charging for the same perpetual-version license. Unknown results stay blank.

## Current remaining gates

Public host/actual URL, final policy/distribution approval, owner publication accounts and approval of exact posts. Payment infrastructure is intentionally inactive; a real purchase cannot be cleared until a separately approved payment route exists. The delivered pages, local beta access, channel shortlist, launch copy, store candidate and tracker are ready for that controlled launch sequence.
