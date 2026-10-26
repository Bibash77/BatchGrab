# First-user measurement — no fabricated adoption

As of 2026-10-26: zero confirmed real activations or active-user measurements. Engineering fixture downloads and QA website visits are excluded. Unknown results remain blank. Website clicks cannot establish extension installation or use.

## Definitions

- Qualified visitor: has a real, permitted current-page image or document collection task in desktop Chrome.
- Activation: a real person successfully saves their intended sample from their own task and confirms usable files/names. An install, accepted job or fixture test is not activation. Count each person once.
- Active user: a unique consenting participant with at least one confirmed successful real download task in the trailing 28 days. Always report period and measurement coverage.
- Repeat user: a participant with successful real tasks on at least two distinct dates in the trailing 28 days. Repeat use is separate from installation and initial activation.
- Retained participant: activated participant who returns in a specified later cohort window (for example days 7–14). Report numerator and denominator; silence is unknown, not automatic failure or success.

## First 10: manual, voluntary follow-up

Use owner-approved public posts and incoming volunteers. Explain that this is a free extension and that feedback is optional. Offer the small-task onboarding guide. Ask only: task type (images/documents), whether intended files saved correctly, any redacted error, and whether they used it again on a later date. Do not request browsing URLs, filenames, screenshots containing client data or document uploads. A tester may voluntarily share a redacted result.

With explicit participant consent, assign a local tester code and record confirmation date/task type/outcome. Keep identities and consent records outside the public repo under ignored `marketing/private/`. Never publish a participant list. Delete contact information when no longer needed; honor deletion requests. Aggregate public reports must distinguish self-reported results from directly observed consented sessions. No guaranteed conversion threshold or timeline.

`ACTIVE_USER_TRACKER.csv` is a header-only schema, not a populated lead list. Use a private copy. Legacy FIRST_SALE_TRACKER.csv remains empty and is not the current goal.

## Website funnel

Current build emits memory-only `batchgrab:metric` events and a memory array for QA. It transmits nothing and stores no visitor ID. Events: page_view, guide_open, install_intent, store_cta (only verified real listing), beta_download. These are local hooks, not collected analytics. Campaigns are an allowlist; no arbitrary referrer/URL/filename is included. Metrics reset when the page is unloaded.

After owner approval, choose the smallest suitable analytics service and confirm plan limits. Vercel Web Analytics is a candidate; review its identifier, endpoint, data-region/retention and plan terms first. An approved adapter could listen to events and send only event name, allowlisted campaign and interface language. Unique visits would be the provider's estimate, not installed or active users. Pageview handling must strip query strings, omit fixture/download paths and avoid recording source/browsing content. Update public privacy text before enabling; validate network payloads, then re-run checks. Do not set analytics=true in the current config; the build deliberately rejects it until that integration is implemented and approved.

Reference: [Vercel privacy](https://vercel.com/docs/analytics/privacy-policy), [Web Analytics](https://vercel.com/docs/analytics/using-web-analytics). These are candidates, not services activated by this work.

## Optional future extension measurement — design only, disabled

Requires separate owner approval, implementation review and informed opt-in. Core functionality must work without consent. Count a task only after at least one actual Chrome completion; include a bounded task count and coarse day/version only. Never include visited URLs, source hosts, file names, paths, document contents, titles, errors containing URLs or download IDs.

Deduplicated activation/retention needs some linkage. A random resettable installation token is pseudonymous, not anonymous; disclose that precisely. Consider a rotating 28-day token with no cross-window linkage, short raw-event retention and aggregate reporting only. It cannot support permanent lifetime-unique users; report that limitation. Provide an off/reset control, remove queued events on withdrawal, avoid IP retention/fingerprinting, rate-limit ingestion and define cost caps/deletion. No endpoint, token generation, event sender or extension permission has been added in 0.4.0.

## Reporting discipline

Report: channel → measured visits (if available) → install-intent clicks → voluntary trials → confirmed activations → repeat tasks. Use “not measured” for unavailable stages. Store dashboard user counts, if later available, have their own definitions and must not be relabeled as successful tasks. Goals of 10, 50 and 100 are milestones, not forecasts or observed counts.
