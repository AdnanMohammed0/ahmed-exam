import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const essayDir = join(__dirname, '..', 'content', 'essay');
const outputDir = join(__dirname, '..', 'site', 'public', 'data');
const outputFile = join(outputDir, 'essay-questions.json');

if (!existsSync(essayDir)) {
  console.error('Essay directory not found:', essayDir);
  process.exit(1);
}

const files = readdirSync(essayDir).filter(f => f.endsWith('.json')).sort();
let allQuestions = [];
let total = 0;

for (const file of files) {
  const data = JSON.parse(readFileSync(join(essayDir, file), 'utf-8'));
  allQuestions.push(...data);
  total += data.length;
}

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

writeFileSync(outputFile, JSON.stringify(allQuestions, null, 2));
console.log(`Merged ${total} essay questions from ${files.length} chapters`);
