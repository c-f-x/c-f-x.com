# Product pages

Each released tool gets a page at `c-f-x.com/<tool>/`, as plotplot.ai gives each of its tools a page at `plotplot.ai/<tool>/`. The page is the tool's own site: once it exists, every link to the tool on c-f-x.com points there, and its "View source" button points to the repository.

`public/cfx-analytics/index.html` is the worked example. A new page copies it and keeps its sections, in this order:

| Section | Holds |
|---|---|
| Waysign | Back to the tools; the tool's row and number, as on the home page; the next tool |
| Hero | The mark, a short promise as the headline, the tool's role in a few words, two or three sentences on what it does, **Install ↓** and **View source ↗**, and the screenshot of its main screen with alt text |
| Proof | "`<tool>`, as it runs · commit · date", and four numbers that are true of the commit named, each with the source a reader could check |
| Why | The problem it solves, as a headline and one paragraph |
| What it answers | Six to eight things it does, each in a person's words |
| How | Numbered parts, one per face of the tool, with the shortest real code where it helps |
| What it doesn't do | The limits, each named in a few words, then said plainly |
| Install | What you need and what it costs, then the commands, starting with `git clone https://github.com/c-f-x/<tool>` and `cd <tool>`, and the link to every step |
| Where it sits | Its neighbours in the family, with their marks; a tool not released yet keeps its grey mark and plain name |

The page shares `site.css`, `site.js` and `marks.svg` with the home page, so a product page has no styles or scripts of its own. Copy is checked like the home page's: short sentences, no claim a reader cannot check. `npm run check` fails when a page refers to a file that is missing or loads anything from another site.
