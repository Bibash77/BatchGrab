# Vercel deployment handoff — no deployment yet

Intended account: existing connected owner account. Intended team: biswash166-9736s-projects. Proposed new project: batch-grab. The connected user reports Hobby billing, but the target team's project/domain and eligible plan must be verified before deployment. No paid resource, custom domain or analytics service is authorized.

The API rejected creating the empty project with 403. The owner's first consent link was already expired at the retry. The owner also completed a fresh consent action, but the next request still returned 403 within its 10-minute window. Do not keep repeating consent links. The Vercel web login is open for an authenticated dashboard fallback. The local CLI session also reports an invalid token; no credentials were inspected, printed or replaced.

## Verified empty project — created with owner approval

Owner approved account **ronaldobibash310-8002**, team **bib’s projects**, slug **bibs-projects-f9270923**, **Hobby**, for empty-project creation only.

- Project: **batch-grab**
- Project ID: **prj_WLJ1viALkGAOfKNStBx82yB793HU**
- Dashboard: https://vercel.com/bibs-projects-f9270923/batch-grab
- Assigned production domain: **project-m1fyy.vercel.app**, explicitly **No Deployment**.
- Vercel’s empty-project button generated project-m1fyy automatically; it was renamed to batch-grab in General settings. The generated domain retained its original name.
- No Git connection, site upload, production/preview deployment, analytics activation or paid service.

Separate approval is still required before deployment. Do not claim the assigned domain serves the website. The connector remains attached to the older account; use the authenticated approved browser target unless its connection is separately corrected. Default project Data Preferences currently has “Improve models with this project’s data” checked; no source was uploaded. Review with owner before uploading source if a change is desired.

## After destination approval

1. Create or inspect the single intended Batch Grab project. Avoid linking Git until deployment is approved, because an integration can trigger automatic builds/publication.
2. Read its actual project ID, owning team, plan and assigned project domain from Vercel. Present these and the exact source revision to the owner.
3. Obtain explicit approval for that destination and public static deployment. Do not assume a guessed project-name URL is available.
4. Confirm the intended public support email and approve the policy. Set publicOrigin to the actual approved origin and productionApproved=true. Keep analytics=false and storeVerified=false until their separate prerequisites are satisfied.
5. Build from repository root. vercel.json specifies framework=null, buildCommand=`node marketing/scripts/build-site.cjs`, outputDirectory=`marketing/site`, installCommand empty. VERCEL=1 builds do not depend on a zip utility; production files and screenshots are already in the repository.
6. Production may be indexable only with approved origin/config. Preview deployments remain noindex. No database, functions, paid domain, logs drain or analytics service is needed.
7. Submit the approved deployment and retain its deployment ID. Wait for READY; then test its real HTTPS project domain without privileged auth. Do not weaken deployment protection or another project's settings without explicit approval.
8. Verify landing/help/JA/privacy pages, image loads, ZIP hash, 30 PDF fixture links, robots/sitemap/canonical, expected security headers and small-screen layout. Record measured response timings as test observations, not user conversion or guaranteed performance.

## Manual fallback

In Vercel, choose the intended team → Add New → Project, or create an empty Other/static project. Use the existing Bibash77/BatchGrab repository only when ready for a deployment. Set root directory to repository root and the settings above. Stop before Deploy until the exact destination/config has been approved. No need to enter payment information or purchase a domain. Provide the actual project link so assisted verification can resume.

If an interactive Git import would automatically deploy, do not finish it merely to inspect settings. The prepared site ZIP and committed configuration remain available while authentication/approval is resolved.
