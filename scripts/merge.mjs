import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const mcqDir = path.join(__dirname, "..", "content", "mcq");
const outDir = path.join(__dirname, "..", "site", "public", "data");

const files = fs.readdirSync(mcqDir).filter(f => f.endsWith(".json"));
let all = [];

for (const f of files) {
  let raw = fs.readFileSync(path.join(mcqDir, f), "utf-8");
  // Strip BOM if present
  if (raw.charCodeAt(0) === 0xFEFF) raw = raw.slice(1);
  const qs = JSON.parse(raw);
  all = all.concat(qs);
}

all.sort((a, b) => {
  if (a.chapterNumber !== b.chapterNumber) return a.chapterNumber - b.chapterNumber;
  return a.questionNumber - b.questionNumber;
});

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "questions.json"), JSON.stringify(all, null, 2));
console.log("Merged " + all.length + " questions");
