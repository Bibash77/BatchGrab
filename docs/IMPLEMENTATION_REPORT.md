# Batch Grab 0.3.1 implementation report

The starting screenshot exposed arrows/SVG assets and technical filename/folder controls as ordinary results. Version 0.3.0 had already replaced that with a visual picker and separate Suggested, Images, Documents, Review, Site assets and All files views. We inspected the six runtime files, manifest, queue, scanner/naming helpers, test harness, fixture generators, earlier plans and 0.2/0.3 reports. The unmodified 0.3.0 baseline passed 42 helper assertions and all five controlled browser cases before edits. Prior findings were not treated as proof of current correctness.

## Changes delivered

- **Discovery:** retain ordinary image/currentSrc and document scanning; add common lazy-source alternatives, ordinary picture/srcset alternatives, accessible same-origin documents and open shadow roots. Exact URL dedup records all discovery methods and source page. No guessed CDN original URLs, blanket query removal or code execution.
- **Optional expanded scan:** Options checkbox includes computed CSS `background-image` URLs and already-loaded image resource timing entries. It inspects current data; it does not intercept new network traffic, request broad permissions, scroll, crawl or probe links. Additional candidates have unknown dimensions and remain in Review until inspected.
- **Visible evidence wins:** the same URL later seen in CSS/network history does not overwrite visible DOM dimensions/context or wrongly hide that image. Responsive alternatives retain their parent URL and show the discovery method in Details & name.
- **Bounds:** 10,000 results, 80 roots, 50,000 traversal elements, 20,000 CSS elements per root. The UI reports a reached traversal/extended limit instead of implying completeness. Large lists still render only 60 cards.
- **Draft storage:** new provenance exposed an oversized 5,000-image draft. Omitting empty/null/false fields when caching and restoring safe defaults keeps this fixture persistent without increasing the 4 MB cache guard or requesting more storage. Oversized drafts still rescan on reopening.
- **Local source/outcome CSV:** Download outcomes has an explicit Export action. It exports source page, original URL, name, requested path, actual Chrome saved filename, status, error and timestamps. CSV quoting, BOM/Unicode and formula-leading cell escaping are tested. It is a source index, not proof of content authenticity, citation correctness or rights.
- **Fixtures and harness:** added discovery, CSV/XLSX/Japanese output, source-export and streaming worker-lifecycle tests. Test-CDP errors now clear rejected requests rather than leaving dangling timeout rejections. Demo server supports typed CSV/XLSX and optional streaming for recovery tests. Product runtime has no test shim or new dependency.
- **Release:** manifest 0.3.1; source and unpacked runtime copied by the whitelist build; versioned ZIP and demo ZIP generated. Competitor packages and downloaded public media are excluded.

## Preserved behavior

Visual previews/dimensions/source, classification, explicit image-name review, editable individual names, all-files access, type/text/width/regex filters, templates, root/subfolders and final-path preview remain. Selection is scoped correctly when views/filters change. Existing exact-extension preservation, unsafe/reserved names, Unicode sanitization, batch duplicate suffixes and Chrome conflict handling remain.

The durable background queue, actual Chrome IDs/outcomes, local history, failure display/manual retry and reconciliation behavior remain. The runtime background manager was reviewed and did not require a new rewrite. A real service-worker stop with confirmed IDs and pending jobs passed 120-file recovery. A download still in the ambiguous `starting` state after a worker crash is marked interrupted for manual inspection, rather than risking duplicate transfers. This path is intentionally conservative and was not confused with the confirmed-ID recovery test.

## Verification summary

[Five final controlled cases](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-beta.json>); [New discovery and output test](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-discovery.json>); [Actual worker lifecycle](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-lifecycle.json>); [Public smoke tests](</Users/macbookairm4/Desktop/projects/Money Making small apps/batch-grab/output/playwright/visual-v0.3/latest-public.json>). Naming/classification helper assertions remain 23 + 19 = 42. TEST_RESULTS.md lists commands and limitations. Comparator packages remain unchanged outside the repository under system temp paths.

## Remaining risks and deliberately absent features

- No automatic multi-page accumulation, named reusable tasks, spreadsheet input, ZIP, resize/convert, perceptual dedup or payment/licensing system.
- Source candidates can be stale, inaccessible, session-dependent, variants of the same picture or irrelevant. Review is intentional. Headers/dimensions of unrequested alternatives are not fabricated.
- Same-origin frames/open shadows only; closed roots, opaque/cross-origin frames and arbitrary embedded scripts are not read. DOM changes require rescan. Some lazy images appear only after user scrolling.
- The common srcset parser is not a full WHATWG parser; mixed data-URL sets are skipped, complex comma-containing URLs may be missed. CSS escaped/pseudo-element/image-set URL cases are incomplete. No “every image” promise.
- Long alt text can still produce an overly verbose filename. Names remain reviewable; exact metadata/nearby context can also be misleading.
- Chrome complete means bytes saved, not a verified PDF/image or absence of an HTML login response. Tests independently inspect source bytes/headers on the tested files; runtime does not authenticate content.
- Browser shutdown, OS suspension, disk exhaustion, huge persistent histories and cross-browser operation remain uncertified. Recent unsubmitted UI edits use a 200 ms draft debounce; durable accepted jobs do not depend on that timer.
- Source exports can contain private URLs/tokens and local filesystem paths. They stay local, and no telemetry/API was added. Recorded request checks are not an audit of every Chrome background connection.
- Developer-mode install/update is friction and a trust issue. The package is not a signed CRX or Web Store-reviewed release. Permission/security declarations and a reviewed distribution path matter before broader sales.

No P2 uniqueness, customer demand, profitability or revenue has been proven by these engineering changes. The commercial outcome remains CONDITIONAL GO for real-task evaluation.
