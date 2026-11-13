# Product pages

Every released c-f-x tool has a page at `c-f-x.com/<tool>/`. This file is the one home of how to make one. It is written for the agent who builds the next page, who may know nothing of how the first two were made.

## Why the pages are like this

- **Where.** The owner, 2026-11-13: "we now want c-f-x.com/<tool-name> --- not github pages" (cfx-kit D-13). plotplot.ai gives each of its tools a page at `plotplot.ai/<tool>/`, and c-f-x follows its outline.
- **The examples.** The owner approved `public/cfx-analytics/index.html` and `public/cfx-mail/index.html` on 2026-11-13 ("both of these look great"). When this file and an example disagree, the example shows what was approved; fix this file.
- **One site.** A page uses the home page's `site.css`, `site.js` and `marks.svg`, and adds no styles or scripts of its own. A need the shared files do not meet goes into them, for every page.
- **The page is the tool's own site.** Once it exists, every link to the tool on c-f-x.com points to `/<tool>/`, and only "View source" points to the repository (`AGENTS.md`, the link rule).

## When a tool gets a page

When it is released: its repository is public, it deploys, and its README follows the family's standard (cfx-kit conventions, section 16). A tool that is not released has no page; the home page shows it with a grey mark and its status "next" or "later".

## Making the page

1. **Gather the facts first.** Read the tool's `README.md`, its `AGENTS.md` and any c-f-x spec that names it (the family's specs live in the private planning repository; ask the lead if you cannot read them). Every claim on the page comes from one of these. A claim you cannot point to does not go on the page.
2. **Copy the template.** `templates/product-page.html` to `public/<tool>/index.html`. Replace every `{{...}}`, and delete every comment that explains the template.
3. **The sections, in this order.** The template has them; keep the order and the class names.

   | Section | Holds | Where it comes from |
   |---|---|---|
   | Waysign | Back to the tools; the tool's row and number; the next tool | the home page's tool list |
   | Hero | The mark, a promise of at most six words, the role, two or three sentences, **Install ↓** and **View source ↗**, the screenshot | the README's bold line and intro |
   | Proof | "`<tool>`, as it runs · commit · date", and four whole numbers | the repository at that commit |
   | Why | The problem, as a headline and one paragraph | the README and the tool's spec |
   | What it answers, or what it does | Six to eight short items, in a person's words | the README's "What it does" |
   | How | Three to five numbered steps, with the shortest real code where it helps | the README's examples |
   | What it doesn't do | Each limit named in a few words, then one plain sentence | the README's "What it does not do" |
   | Install | What you need and what it costs, then `git clone https://github.com/c-f-x/<tool>`, `cd <tool>` and the README's own commands, and the link to every step | the README's Install and `AGENTS.md` |
   | Where it sits | Two or three neighbours, each with how the two work together | a spec or README that ties them; never a guess |

4. **The proof numbers.** Four whole numbers that are true of the commit you name, and that a reader can check: a count of kinds, of SDKs, of deployments, a default the code sets. Never a test count that will change next week, a user count, or anything rounded. Name the commit with `gh api repos/c-f-x/<tool>/commits/master --jq '.sha[0:7]'`. The numbers count up once on the page, from the markup's own values; write the final number.
5. **The screenshot.** The tool's main screen at 1440 pixels wide, with made-up data, saved as `public/<tool>/<screen>.png`. Use the README's screenshot from `docs/images/` in the tool's repository when it has one: `gh api repos/c-f-x/<tool>/contents/docs/images/<file> --jq .content | base64 -d > public/<tool>/<screen>.png`. Give the `<img>` its real width and height, and alt text that says what it shows and that the data is made up.
6. **The mark.** `public/marks.svg` holds a symbol `m-<tool>` for every tool the family has planned. A new tool's mark comes from the c-f-x brand's marks (petals), added as a symbol of the same shape, its tile filled `var(--mk-fill,#086A72)`.
7. **The words.** Plain English: short sentences, one idea each, warm and direct. No em dashes, no hype, no "seamlessly" or "powerful". Say what it does and what it does not. Keep the tool's name whole with `<span class="nowrap">` where it could break at a hyphen. Use `&#8217;` for an apostrophe.
8. **Motion.** Only the template's classes: `rise` makes a block rise into place when it scrolls in, `stagger` with `style="--i:N"` on each item lets a list arrive one item after another, the hero's mark pops in, and the proof numbers count up. `prefers-reduced-motion` turns all of it off. Add no other motion.

## Changing the rest of the site

- **The home page** (`public/index.html`): the tool's mark loses `soon` and turns teal, its status becomes `live`, and its hero tile, its tool-list name, its footer pill and any other mention link to `/<tool>/`.
- **The neighbours' pages:** the page whose waysign names this tool as next links it now; a "where it sits" row that names this tool links to `/<tool>/` and drops "Next.".
- **The other product pages' footers** follow the home page's.

## Checking it

1. `npm run check`, judged by its exit code. It fails when a page or stylesheet refers to a file that is missing, or loads anything from another site.
2. Serve `public/` locally and look at the page yourself, at 1440 and 390 pixels wide, light and dark: nothing overflows, every block ends visible after you scroll, and the proof numbers end on their true values.
3. Show the page to the owner in their browser before it ships (the /showroom skill). The owner decides what people see.

## Shipping it

On a branch, through a pull request with CI green, merged into `master`, then deployed from a clean checkout of `origin/master` as `docs/deploy.md` says. After the deploy, fetch `https://c-f-x.com/<tool>/` and check that it answers 200 with the page.
