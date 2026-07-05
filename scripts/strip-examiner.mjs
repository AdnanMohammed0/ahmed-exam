import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const srcDir = path.join(__dirname, "..", "content", "essay-questions");
const outDir = path.join(__dirname, "..", "content", "essay-questions-candidate");

// Ensure output directory exists
fs.mkdirSync(outDir, { recursive: true });

// Patterns identifying sections to remove (multi-line blocks)
const removalPatterns = [
  // EXAMINER'S MARKING GUIDE blocks (with optional numbering)
  /### EXAMINER'S MARKING GUIDE[\s\S]*?(?=\n###\s|(?:\n---|\n━━━|\n##\s|\n$))/g,
  
  // EXAMINER'S MARKING GUIDE with header format
  /\*\*EXAMINER'S MARKING GUIDE\*\*[\s\S]*?(?=\n##\s|\n━━━|\n$)/g,
  
  // Plain MARKING GUIDE blocks
  /### MARKING GUIDE\n+[\s\S]*?(?=\n###\s|(?:\n---|\n━━━|\n##\s|\n$))/g,
  
  // MARKING GUIDE: with colon
  /\*\*MARKING GUIDE:\*\*[\s\S]*?(?=\n##\s|\n━━━|\n$)/g,
  /MARKING GUIDE:[\s\S]*?(?=\n##\s|\n━━━|\n$)/g,
  
  // MODEL ANSWER blocks (with optional subtitle in parentheses)
  /### MODEL ANSWER[\s\S]*?(?=\n---|\n━━━|\n##\s|\n###\s|\n$)/g,
  /\*\*MODEL ANSWER[\s\S]*?\*\*[\s\S]*?(?=\n---|\n━━━|\n##\s|\n###\s|\n$)/g,
  
  // Plain MODEL ANSWER line
  /\nMODEL ANSWER[\s\S]*?(?=\n---|\n━━━|\n##\s|\n###\s|\n$)/,
  
  // DISTINGUISHING FEATURES blocks
  /\*\*DISTINGUISHING FEATURES[\s\S]*?\*\*[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  /### DISTINGUISHING FEATURES[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  
  // COMMON ERRORS blocks
  /\*\*COMMON ERRORS[\s\S]*?\*\*[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  /### COMMON ERRORS[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  
  // FULL MARKING GUIDE blocks
  /\*\*FULL MARKING GUIDE[\s\S]*?\*\*[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  /### FULL MARKING GUIDE[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  
  // ANSWERS & RATIONALE blocks
  /\*\*ANSWERS & RATIONALE[\s\S]*?\*\*[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  /ANSWERS & RATIONALE[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  
  // EXAMINER'S NOTES blocks
  /\*\*EXAMINER'S NOTES[\s\S]*?\*\*[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
  /EXAMINER'S NOTES[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,

  // Longer wrapped MODEL ANSWER: EXAMINER'S MARKING GUIDE patterns
  /EXAMINER'S MARKING GUIDE[\s\S]*?(?=\n---|\n━━━|\n##\s|\n$)/g,
];

// Also remove the "COMMON ERRORS:" standalone lines plus content until next section
function cleanContent(content) {
  let cleaned = content;
  
  for (const pattern of removalPatterns) {
    cleaned = cleaned.replace(pattern, (match) => {
      // Check if this pattern matched at all
      const trimmed = match.trim();
      if (!trimmed) return match;
      return "";
    });
  }
  
  // NOTE: Purposely not removing ─ or ━ characters —
  // they are part of LCV stage headings and separator lines that
  // must be preserved in candidate versions. Removing them would
  // destroy question content.

  
  // Remove empty lines in excess (more than 2 consecutive)
  cleaned = cleaned.replace(/\n{3,}/g, "\n\n");
  
  // Clean up double dashes/separators
  
  return cleaned.trim();
}

// Process all files
const files = fs.readdirSync(srcDir).filter(f => f.endsWith(".md"));

console.log(`Found ${files.length} files to process...`);

let processedCount = 0;
for (const file of files) {
  const srcPath = path.join(srcDir, file);
  const outPath = path.join(outDir, file);
  
  const content = fs.readFileSync(srcPath, "utf8");
  const cleaned = cleanContent(content);
  
  // Only write if we actually removed content
  if (cleaned.length < content.length) {
    fs.writeFileSync(outPath, cleaned, "utf8");
    processedCount++;
    const removed = content.length - cleaned.length;
    console.log(`✓ ${file}: ${(removed / 1000).toFixed(1)}KB removed`);
  } else {
    console.log(`⚠ ${file}: may not have been processed fully`);
    fs.writeFileSync(outPath, cleaned, "utf8");
  }
}

console.log(`\nDone! ${processedCount}/${files.length} files processed.`);
