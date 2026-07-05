import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Splits the full extracted book text into per-chapter files.
 * Place the full text from the user at: content/raw/full-text.txt
 * 
 * Chapter markers expected format:
 *   CHAPTER 1
 *   Embryology of the Genitourinary System
 *   ...content...
 *   CHAPTER 2
 *   Postnatal Care of the Newborn...
 *   ...content...
 */
function splitChapters() {
  const fullTextPath = path.join(__dirname, "..", "content", "raw", "full-text.txt");
  if (!fs.existsSync(fullTextPath)) {
    console.log("No full-text.txt found. Place extracted text at content/raw/full-text.txt");
    console.log("Expected format: CHAPTER N markers followed by chapter content.");
    return false;
  }

  const text = fs.readFileSync(fullTextPath, "utf-8");

  const chapterSlugs = [
    "ch01-embryology", "ch02-postnatal-hydronephrosis", "ch03-uti",
    "ch04-imaging", "ch05-urodynamics", "ch06-urolithiasis",
    "ch07-hypospadias", "ch08-dsd", "ch09-undescended-testis",
    "ch10-acute-scrotum", "ch11-penile-oedema", "ch12-testicular-tumours",
    "ch13-intersex-ethics", "ch14-renal-stones-metabolic", "ch15-prune-belly",
    "ch16-puv", "ch17-exstrophy", "ch18-neuropathic-bladder",
    "ch19-enuresis", "ch20-incontinence", "ch21-transplant",
    "ch22-laparoscopy", "ch23-trauma", "ch24-oncology", "ch25-adolescent",
  ];

  // Try to split by "CHAPTER N" markers
  const chapterRegex = /CHAPTER\s+(\d+)\s*\n([^\n]+(?:\n(?!CHAPTER\s+\d+)[\s\S]*?))(?=CHAPTER\s+\d+|\s*$)/gi;
  const matches = [...text.matchAll(chapterRegex)];

  if (matches.length >= 25) {
    for (const match of matches) {
      const chNum = parseInt(match[1]);
      if (chNum >= 1 && chNum <= 25) {
        const slug = chapterSlugs[chNum - 1];
        const outPath = path.join(__dirname, "..", "content", "raw", slug + ".txt");
        fs.writeFileSync(outPath, match[0].trim());
        console.log("Extracted chapter " + chNum + " -> " + slug + ".txt");
      }
    }
    console.log("\nSplit " + matches.length + " chapters successfully.");
    return true;
  }

  console.log("Could not parse CHAPTER markers. Full text saved at full-text.txt for manual splitting.");
  return false;
}

splitChapters();
