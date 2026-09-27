// Guards the landing page against drifting from its README section map.
// Run with `node check.mjs`; exits non-zero and lists problems on failure.
import { existsSync, readFileSync } from "node:fs";

const problems = [];
const read = (file) => {
  if (!existsSync(file)) { problems.push(`${file} is missing`); return ""; }
  return readFileSync(file, "utf8");
};

const readme = read("README.md");
const page = read("index.html");

if (page) {
  // Every section id listed in the README map must exist on the page.
  const ids = [...readme.matchAll(/^\|\s*`#([\w-]+)`/gm)].map((m) => m[1]);
  if (ids.length === 0) problems.push("README section map lists no `#id` rows");
  for (const id of ids) {
    if (!page.includes(`id="${id}"`)) problems.push(`README maps #${id}, but index.html has no id="${id}"`);
  }

  if (!/<title>[^<]+<\/title>/.test(page)) problems.push("index.html has no <title>");

  for (const bad of ["TODO", "TBD", "lorem ipsum", "__"]) {
    if (page.toLowerCase().includes(bad.toLowerCase())) problems.push(`index.html contains placeholder text "${bad}"`);
  }

  const storeLinks = [...page.matchAll(/https:\/\/apps\.apple\.com\/[^"]+/g)].map((m) => m[0]);
  if (storeLinks.length === 0) problems.push("index.html has no App Store link");
  for (const link of storeLinks) {
    if (link !== "https://apps.apple.com/app/id6796313306") problems.push(`unexpected App Store link: ${link}`);
  }

  // Scoring numbers are never published; "pts" or "points" would be a sign they crept in.
  if (/\b\d+\s*(pts|points)\b/i.test(page)) problems.push("index.html publishes a point value");
}

if (problems.length) {
  console.error("Landing page check failed:\n- " + problems.join("\n- "));
  process.exit(1);
}
console.log("Landing page check passed.");
