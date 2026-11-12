// The checks CI runs on every pull request and on master, stopping at the first failure:
// 1. Every file the page refers to on its own site exists in public/.
// 2. The page loads nothing from another site: c-f-x is self-hosted, and so is its page.
//    Links a person clicks (<a href>) may point anywhere.
// 3. Wrangler accepts the config and the assets (a dry run, which uploads nothing).
import { readFileSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const html = readFileSync(path.join(root, "public/index.html"), "utf8");
const problems = [];

// Everything the browser fetches by itself: src= attributes, <link href>, and url() in CSS.
const fetched = [
  ...[...html.matchAll(/\ssrc="([^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/<link\b[^>]*\shref="([^"]+)"/g)].map((m) => m[1]),
  ...[...html.matchAll(/url\(([^)]+)\)/g)].map((m) => m[1].replace(/^['"]|['"]$/g, "")),
];
for (const ref of fetched) {
  if (ref.startsWith("data:") || ref.startsWith("#")) continue;
  if (ref === "https://c-f-x.com/") continue; // the canonical address names the page itself
  if (/^[a-z]+:/i.test(ref) || ref.startsWith("//")) {
    problems.push(`the page loads ${ref} from another site`);
  } else if (!existsSync(path.join(root, "public", ref.split(/[?#]/)[0]))) {
    problems.push(`the page refers to ${ref}, which is not in public/`);
  }
}
if (problems.length > 0) {
  for (const p of problems) console.error(`check: ${p}`);
  process.exit(1);
}
console.log(`check: ${fetched.length} references, all on the site and present`);

const dry = spawnSync("npx", ["wrangler", "deploy", "--dry-run"], { cwd: root, stdio: "inherit" });
if (dry.status !== 0) {
  console.error(`check: wrangler's dry run failed (exit ${dry.status})`);
  process.exit(dry.status ?? 1);
}
console.log("check: wrangler accepts the config and the assets");
