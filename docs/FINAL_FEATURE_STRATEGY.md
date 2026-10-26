# Feature strategy and commercial decision

**CONDITIONAL GO for a limited Document Handoff beta. Do not launch a broad paid downloader or build more infrastructure yet.** There is working software and a narrow fixture advantage; no buyer, willingness to pay or commercial advantage has been measured.

## One customer, one job, one offering

Target a self-purchasing independent research consultant or document preparer who repeatedly assembles 20–100 public reports, policies or tender attachments for a client. Qualify by their next real task: direct accessible PDF/CSV/XLSX links, weak source filenames or generic Download links, labels on the page that identify the documents, a local handoff folder, and a need to retain the sources. Prefer a person who controls their Chrome installation and can spend $5. Exclude protected-document extraction, complex procurement logins, whole-site crawling, academic reference management and supplier image conversion jobs.

Typical systems to test are public organization report libraries, policy directories and government attachment pages. The IRS page is a verified simple document example, not evidence that every tender portal works. Obtain each tester's actual page before claiming support. These customers have not yet been recruited or interviewed.

**Selected paid offering to test: Document Handoff — reviewed descriptive filenames, section folders and a source/outcome index for an accessible document batch. $5 once for perpetual use of the delivered version.** Do not promise lifetime website support or future upgrades. This is the sole offering, not separate naming/ZIP/import subscriptions.

The benefit beyond basic downloading is reducing manual identification/renaming and assembling a traceable client folder. In the authored fixture, Batch Grab matched 30 intended names while SMD's saved Link text mask matched 15, both with 30 successful files. The export connects page → original URL → actual saved path/status. This is a measurable engineering distinction. It remains unknown whether a real customer values it more than free masks, manual edits or a simple spreadsheet.

## Why this choice, and why not the other requested features?

| Capability | Decision | Evidence and cost consequence |
|---|---|---|
| Accurate selection, extensions, errors/retry, recovery | P0, free correctness | Must work for every user. Never charge to reveal a failed download or to make the free version reliable |
| Current-page visual scanning/filtering | P1, preserve | Mature free competitors already do this; not a paid differentiation claim |
| Responsive/lazy/background/root coverage | P1, implemented safely | Reproduced missing URLs; local rules, no server/site adapters. Unknown alternatives stay Review |
| Context names + section folders + source/outcome export | P2 candidate, beta implemented without paywall | Narrow handoff result is demonstrable; independent real-page advantage and purchase still unproven |
| Multi-page collection / reusable tasks | P1 next only if trials block | Free SMD already has tabs; no reason to charge merely for matching it. Crawling adds permissions, pacing and saved-state complexity |
| Spreadsheet URL/name import | P1 for a different segment; defer | Already offered elsewhere; absent actual customer need/verified advantage for our narrow job |
| ZIP | P3 now | Existing OS can ZIP a folder; browser fetching creates CORS/auth/memory/error handling work. Not a first-sale necessity |
| Resize, conversion, perceptual dedup, AI, scheduling | P3 | Stronger specialist competitors and more maintenance; unrelated to the named-document handoff experiment |

We implemented the tiny source-index component as useful evaluation functionality. We did not implement a speculative paid task platform. There is **no defensible proven paid moat** yet. The proper next investment is three real tasks, not matching the largest competitor's feature inventory.

## Free and paid boundary hypothesis

Free should retain resource discovery, visual previews, all-files access, filtering, individual filename/folder edits, safe suffixes/extensions, completed/error status, manual retry and basic local history. Keep the same honest technical safety caps; no hidden failure/paywall traps.

A future $5 Document Handoff edition could bundle applying contextual document names/section organization with exporting a handoff index. Let evaluation users try the whole workflow before buying. Current 0.3.1 has these functions available for evaluation, with **no payment gate or licensing enforcement**. Do not call the download exclusive, retroactively restrict copies already given free, or claim anyone has bought it. Final commercial terms and any gating require a separate decision after trials. A voluntary delivered-version software license can test a first purchase without a license server; willingness to pay may be low when an evaluation copy is unrestricted.

## Prices worth testing, not demand estimates

| One-time price | Role in the experiment |
|---|---|
| $3 | Fallback only if a user demonstrates value but specifically rejects $5; fees/support consume a large portion |
| **$5** | First actual offer: low commitment, one scoped delivered version, zero API/inference hosting cost |
| $9 | Test later if independent tasks show an advantage and users return; competes directly with BFD's advertised broader $9 bundle |
| $19 | Defer until repeated use or a materially stronger team/handoff workflow is observed; no present support for this price |

Do not fabricate conversion rates or interpret installs as purchasers. Subscriptions are not justified by this version: running locally is not new monthly delivered value. Maintenance includes browser changes, page markup, download edge cases, customer support, documentation and distribution. Near-zero runtime hosting does not mean zero cost.

Illustrative cost model only: contribution per sale = price − actual payment fee − refunds − support time × the founder's chosen hourly cost. At an assumed $20/hour, 15 minutes of support costs $5 before fees. That makes a $5 sale unattractive if each sale needs that much support. This is arithmetic under an explicit assumption, not an actual margin estimate. Track support minutes; avoid site-specific promises and ads until revenue covers them.

## Decision gates

1. Recruit three qualified volunteers with current allowed document batches. Compare against their best configured free option; alternate tool order.
2. Record actual files/names/cleanup time, source-index usefulness, errors and next-use date. Any content defect is fixed free.
3. Ask for an actual $5 delivered-version purchase after a successful task. Praise or a checkout click is not payment.
4. CONDITIONAL GO becomes GO only after a genuine buyer pays, receives the version and keeps the purchase, and the work can be repeated with manageable support. A single sale meets the revenue goal only for that month.
5. If three well-matched trials show no meaningful benefit or buyers consistently prefer the free tool, stop this paid feature hypothesis. If the blocker is specifically combining pages, validate that requirement before a narrow follow-on build. Do not pivot automatically into another feature list.

See FIRST_CUSTOMER_PLAN.md for the exact outreach/delivery experiment. No outreach, purchases, billing or external license infrastructure was performed in this work.
