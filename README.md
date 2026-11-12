# c-f-x.com

The landing page of [c-f-x](https://c-f-x.com): a family of self-hosted tools for a solo developer or a small team. Each tool runs on your own Cloudflare account, and every product you make can use it.

The page is one static file, `public/index.html`, with its fonts beside it. Cloudflare Workers serves it. There is no build step.

## Work on it

```bash
npm install
npm run dev     # serves the page locally, the way Cloudflare does
npm run check   # what CI runs
```

`npm run check` fails when the page refers to a file that is missing, or loads anything from another site, and when Wrangler rejects the config.

## The tools

Each tool has its own repository in [github.com/c-f-x](https://github.com/c-f-x). The shared rules and code are in [cfx-kit](https://github.com/c-f-x/cfx-kit).

## Licence

The code is MIT ([LICENSE](LICENSE)). The fonts, Stack Sans Notch and Krub, are under the SIL Open Font License 1.1; their licences are in `public/fonts/`.
