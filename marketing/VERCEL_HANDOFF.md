# Vercel deployment — production live

Owner approved the exact static production ZIP and target before upload. The website is **LIVE** at https://project-m1fyy.vercel.app. Independent anonymous HTTPS verification passed; see LIVE_VERIFICATION.md and LAUNCH_STATUS.md.

## Verified target

- Browser account: ronaldobibash310-8002
- Team: bib’s projects / bibs-projects-f9270923, observed Hobby
- Project: batch-grab
- Project ID: prj_WLJ1viALkGAOfKNStBx82yB793HU
- Dashboard: https://vercel.com/bibs-projects-f9270923/batch-grab
- Deployment: https://vercel.com/bibs-projects-f9270923/batch-grab/EM4RmkeLGsAnbTyoymXTdx2G9z9G
- Generated deployment URL: https://batch-grab-2i31vgofl-bibs-projects-f9270923.vercel.app
- Public production origin: https://project-m1fyy.vercel.app
- Vercel status: Ready, Production, Vercel Drop

The empty-project control originally assigned project-m1fyy; the project was renamed to batch-grab, while its domain retained the original generated name. No custom domain is needed.

## Exact approved release

68-file static ZIP SHA-256 **e52fde389ce61c9c54045ea1f684a8b0ac1c02d83175d1d7abd5f6d414a749b2**, 489,505 bytes. Source content revision ba1b1b65c9a21bafce1cae245d42861b96d46f49. Uploaded through the existing project’s Choose a file to deploy control, then Deploy to Production after explicit approval. All 67 public assets match the candidate hashes; the 68th file is platform configuration, whose actual header effects were verified.

No Git integration, automatic build pipeline, paid upgrade, custom domain purchase, database, function or analytics activation was added. Vercel Web Analytics remains disabled. The default project Data Preferences setting was observed checked; it was not changed. Upload contains only public static distribution files, not browser profiles, contacts or credentials.

## Rebuilding and future updates

Repository launch-config.json now records the approved public origin and production state; analytics=false and storeVerified=false. The real store URL remains unknown and must not be guessed. Repository-root static build remains `node marketing/scripts/build-site.cjs`, output marketing/site. Preview environment builds stay noindex. Root vercel.json retains repository build settings.

The approved browser upload was a separate static directory with root-level vercel.json: framework=null, buildCommand empty, installCommand empty, outputDirectory='.', and the same security headers. Do not upload the repository-root vercel.json alone with the flat static directory, because its output path differs. Local candidate and hash manifest remain in ignored marketing/output/launch/.

Future deployments need explicit approval for their concrete artifact/destination. Use the same existing project; do not create a duplicate or enable Git accidentally. Verify HTTPS, files/download hashes, headers, both languages and honest store status after deployment.

## Historical authentication context

The connected MCP account is still biswash166-9736 context (original team slug biswash166-9736s-projects), not the approved browser account. It returned 403 despite consent attempts; local CLI token was invalid. Those failures were resolved for this deployment by the owner-authenticated browser, without inspecting or replacing credentials. Do not repeat consent loops or use the connector’s different team for Batch Grab updates.
