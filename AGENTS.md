# c-f-x.com

The landing page of c-f-x, a family of self-hosted tools on Cloudflare. One static page, `public/index.html`, served by Cloudflare Workers Static Assets (`wrangler.jsonc`). No build step. The licence is MIT.

## Start here

| Path | Holds |
|---|---|
| `public/index.html` | The page: markup, styles and its two small scripts in one file |
| `public/fonts/` | Stack Sans Notch (titles) and Krub (body), with their SIL OFL licences |
| `scripts/check.mjs` | `npm run check`, what CI runs |
| `docs/deploy.md` | How the page deploys, and how to undo a deploy |

## Rules

- The trunk is `master`. Work on a branch and open a pull request. The lead merges.
- The page loads nothing from another site: fonts, scripts and styles are served from `public/`. `npm run check` holds it.
- The look comes from the c-f-x brand: neutrals plus the Primary teal `#086A72`, which marks the one primary action. Every colour is a token in the page's `:root`.
- Every tool name links to one place, the same everywhere on the page: the tool's own site once it has one, its public repository until then. A tool whose code is not public yet is plain text.
- Motion is short. Each piece also works without scripts, and `prefers-reduced-motion` turns it off.
- Public text names no vendor known only from research.
- CI runs on GitHub's runners and never deploys. Deploys run from the owner's Mac (`docs/deploy.md`).

## Test strategy

| Command | Checks | Time |
|---|---|---|
| `npm run check` | Every file the page refers to exists, the page loads nothing from another site, and Wrangler's dry run accepts the config and assets | about 1 s (0.9 s on the owner's Mac, 2026-11-12) |

It runs on every pull request and on every push to `master`. A visual change is also looked at in a browser, light and dark, at desktop and phone widths, before it merges.
