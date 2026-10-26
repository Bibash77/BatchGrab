# Live website verification — 2026-10-26

**LIVE:** https://project-m1fyy.vercel.app

Owner approved the exact 68-file static ZIP before upload. Vercel reports Ready, production, Vercel Drop; actual dashboard: https://vercel.com/bibs-projects-f9270923/batch-grab/EM4RmkeLGsAnbTyoymXTdx2G9z9G.

| Check | Observed result |
|---|---|
| Anonymous HTTPS | Root and 67 asset/page URLs return 200, without account credentials |
| Candidate integrity | All 67 public file SHA-256 hashes match the approved candidate |
| Pages | 22 HTML pages; canonical/index metadata uses the assigned production origin |
| Documents | 30 demo PDFs accessible and byte-identical |
| Downloads | Both ZIPs match approved bytes; actual browser beta download also matches production release hash |
| Extension ZIP | 60a442a92b7576b633718fba672471c120ac17d4f8b79cf436ae6c4f8975f63d |
| Security headers | CSP, X-Content-Type-Options=nosniff, Referrer-Policy=no-referrer, HSTS present |
| Demo/download indexing | X-Robots-Tag=noindex,nofollow on fixture and download assets |
| English/Japanese | Public pages render with loaded screenshots; Japanese at 645px had no horizontal overflow |
| Small screens | Identical candidate passed local browser checks at 375/768/1440; no separate live Core Web Vitals audit |
| HTTP observations | Median 0.251s, max 0.571s, concurrency four; includes TLS and body transfer; one QA run only |
| Analytics | No analytics provider activated, no extension telemetry; visits/activation not measured |

The platform configuration file was not tested as a public resource; its actual header effects were verified instead. All internal page/image/script/style references point to candidate files. Public appearance remains pre-store free beta, with developer-mode instructions and a clear pending-store-review notice. The browser tool took unusually long to deliver its download-completion event; the download itself completed and its bytes passed verification. No download speed guarantee is inferred.

Raw per-file hashes/HTTP observations and screenshots remain in ignored local marketing/output/launch/. Tests generate QA traffic, not users, installs or revenue. No store review submission or public marketing post has occurred.
