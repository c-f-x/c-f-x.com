# Deploying c-f-x.com

The owner's Mac deploys, with the owner's `wrangler login`. CI never deploys, so no Cloudflare API token exists for this repository.

1. Work from a clean checkout of current `origin/master`: `git fetch origin`, `git status` shows nothing, and `git rev-parse HEAD` equals `git rev-parse origin/master`.
2. `npm ci`, then `npm run check`. It ends with Wrangler's dry run, which shows what would upload.
3. `npx wrangler deploy`. It uploads `public/` and attaches the custom domains `c-f-x.com` and `www.c-f-x.com`.
4. Check that `https://c-f-x.com/` and `https://www.c-f-x.com/` answer 200 with the page.

**Undo.** `npx wrangler rollback` returns the Worker to its previous version. To take the site down entirely, `npx wrangler delete` removes the Worker and its custom domains.

**Later.** The family's deploy runner in cfx-kit (`pnpm ops`: the plan, an undo per step, the clean-checkout check, the wait for health) replaces these steps once cfx-kit can be installed from a release.
