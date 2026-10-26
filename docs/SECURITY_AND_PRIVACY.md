# Batch Grab 0.4.0 security and privacy review

Reviewed 2026-10-26. Engineering review, not an independent penetration test or store approval.

## Scope and findings

Reviewed manifest, background queue, scanner/helpers, popup DOM, locales, build allowlist, static website and release archive. Runtime remains Manifest V3, with all executable code packaged locally. No remote JavaScript, eval, external naming API, payment code or account service. An explicit extension CSP permits scripts/connects from self only, prohibits objects and base URL changes. Remote image previews remain permitted; their ordinary network requests must be disclosed.

The popup renders labels, names, errors and suggestions with textContent/createElement rather than HTML injection. Resource discovery permits HTTP(S); queue validation separately rejects javascript/data/file URLs and embedded URL credentials. New source links include noopener/noreferrer. Preview images use no-referrer. Downloads still contact original hosts and Chrome manages their sessions.

Filename handling normalizes Unicode, strips control/bidirectional overrides and forbidden characters, removes dot traversal segments, handles reserved Windows names, preserves known extensions, bounds folder depth and avoids collisions. Chrome's uniquify handles existing disk files; actual saved paths are recorded. CSV cells neutralize formula prefixes. A source label is not trusted as a filesystem path or executed as markup.

Confirmed reliability/privacy fixes:

- Finished history previously grew indefinitely. It now retains at most 500 settled attempts and 30 days, pruned during queue saves/startup. Pending jobs are preserved. This is activity-based expiry, not a guaranteed wall-clock deletion scheduler.
- Queued jobs previously copied entire scanned items. New jobs retain only URL, source page, safe name/folder/extension and operational queue fields.
- Queue metadata has a 4 MB admission limit; draft caching is limited to 2 MB measured in UTF-8 bytes. Oversized scans remain usable in memory but rescan after closing.
- Failed durable enqueue/retry persistence rolls back memory state. The storage-failure regression verifies rejection with zero download starts.
- Local storage access is restricted to TRUSTED_CONTEXTS; runtime job commands require the extension popup sender. There is no externally_connectable declaration.
- Users can clear the saved page scan separately from job history. Completed/failed job history can be cleared without deleting physical downloads. Scan failures no longer leave stale selectable files visible.

## Permissions

| Permission | Necessary behavior |
|---|---|
| activeTab | Temporary access to the page the user invokes |
| scripting | Run the packaged scanner in that page's isolated world |
| downloads | Start transfers, read Chrome completion/error/path information, export CSV |
| storage | Local scan draft, language/onboarding preferences and durable queue |
| alarms | Periodic reconciliation of accepted download jobs |

No persistent all-sites host permission, cookies API, browsing history API, clipboard permission, webRequest, tabs permission, external messaging or web-accessible runtime resources are requested. The popup can query the active tab under activeTab; scanning Chrome system/store pages is unsupported.

## Data inventory and retention

Local: last page URL, discovered resource URLs, page labels/context, selected resources, proposed names/folders, requested/actual paths, download IDs/statuses/errors/timestamps, language and onboarding dismissal. Job metadata is minimized for new jobs; existing beta records remain subject to retention pruning. Draft remains until replaced/cleared/uninstall; settled history uses the cap above. Pending jobs are not automatically deleted. Preferences last until changed/uninstall.

Network: previews/downloads contact source sites, not a Batch Grab collection endpoint. Manual support email uses the user's mail provider. Source/outcome CSV is an explicit local export and may reveal tokens/private paths. Removing the extension does not remove exported/downloaded files or Chrome's own records. The website currently has no telemetry requests or remote forms; future hosting request logs must be described accurately before launch.

## Known limitations and residual risks

Chrome may save a login/error response as a completed file. Content is not validated. Classification, nearby titles and MIME/extension hints can be wrong. Unknown image formats can remain extensionless. Query strings are intentionally preserved because changing signed URLs breaks access; therefore local data/exports may contain tokens. Opening image previews can contact hosts before selection. A click to download is an explicit external request.

Full browser shutdown/OS suspension and older Chrome versions down to the declared minimum are not certified. Service-worker stop/restart and popup closure are tested on Chrome for Testing 156.0.8078.4. A download started in the narrow window before its ID is durably recorded is conservatively marked interrupted on restart; users must inspect Chrome Downloads before retrying, rather than risking an automatic duplicate.

No automated scanner proves absence of all secrets or vulnerabilities. Release verification checks an exact file allowlist, matching hashes, suspicious credential patterns and archive paths. Runtime has no third-party dependencies. The package contains no tests, reports, demo documents, profiles, contact lists or tracker data.

## Official policy references checked

- [MV3 requirements](https://developer.chrome.com/docs/webstore/program-policies/mv3-requirements)
- [Extension CSP](https://developer.chrome.com/docs/extensions/reference/manifest/content-security-policy)
- [Storage API access levels](https://developer.chrome.com/docs/extensions/reference/api/storage)
- [User data FAQ](https://developer.chrome.com/docs/webstore/program-policies/user-data-faq): local handling still needs accurate disclosure/privacy policy.
- [Store images](https://developer.chrome.com/docs/webstore/images): prepared padded PNG icons and real-workflow screenshots.

Owner must review public publisher identity, privacy text, host logs/retention and dashboard disclosure categories before submission. No publisher identity or legal compliance approval is inferred from the brand name.
