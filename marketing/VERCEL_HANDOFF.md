# Vercel deployment handoff — no deployment yet

Intended account: existing connected owner account. Intended team: biswash166-9736s-projects. Proposed new project: batch-grab. The connected user reports Hobby billing, but the target team's project/domain and eligible plan must be verified before deployment. No paid resource, custom domain or analytics service is authorized.

The API rejected creating the empty project with 403. The owner's first consent link was already expired at the retry. The owner also completed a fresh consent action, but the next request still returned 403 within its 10-minute window. Do not keep repeating consent links. The Vercel web login is open for an authenticated dashboard fallback. The local CLI session also reports an invalid token; no credentials were inspected, printed or replaced.

## Authenticated browser destination — owner choice pending

The in-app browser now shows account **ronaldobibash310-8002**, team **bib’s projects**, slug **bibs-projects-f9270923**, badge **Hobby**, with no projects. This is a different account/team from the connector above. Owner approval has been requested to create an empty Batch Grab project there. No project has been created, Git linked or deployment started. Do not treat successful browser login as destination/deployment approval.

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
