import { writeFileSync, readdirSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const mcqDir = join(__dirname, '..', 'content', 'mcq');
const essayDir = join(__dirname, '..', 'content', 'essay');
const outputDir = join(__dirname, '..', 'site', 'public', 'data');

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

// Merge MCQs
const mcqFiles = readdirSync(mcqDir).filter(f => f.endsWith('.json')).sort();
let mcqTotal = 0;
const mcqByChapter = {};

for (const file of mcqFiles) {
  const slug = file.replace('.json', '');
  const raw = readFileSync(join(mcqDir, file), 'utf-8').replace(/^\uFEFF/, '');
  const data = JSON.parse(raw);
  mcqByChapter[slug] = data;
  mcqTotal += data.length;
}

// Merge essay questions
const essayFiles = readdirSync(essayDir).filter(f => f.endsWith('.json')).sort();
let essayTotal = 0;
const essayByChapter = {};

for (const file of essayFiles) {
  const slug = file.replace('.json', '');
  const rawEssay = readFileSync(join(essayDir, file), 'utf-8').replace(/^\uFEFF/, '');
  const data = JSON.parse(rawEssay);
  essayByChapter[slug] = data;
  essayTotal += data.length;
}

// Build unified chapter structure
const unified = [];
for (const slug of Object.keys(mcqByChapter).sort()) {
  const mcqs = mcqByChapter[slug] || [];
  const essay = essayByChapter[slug] || [];
  const chapterInfo = mcqs.length > 0 ? {
    chapter: mcqs[0].chapter,
    chapterSlug: mcqs[0].chapterSlug,
    chapterNumber: mcqs[0].chapterNumber
  } : essay.length > 0 ? {
    chapter: essay[0].chapter,
    chapterSlug: essay[0].chapterSlug,
    chapterNumber: essay[0].chapterNumber
  } : { chapter: slug, chapterSlug: slug, chapterNumber: 0 };

  unified.push({
    ...chapterInfo,
    mcqs,
    essay
  });
}

writeFileSync(join(outputDir, 'unified-exam.json'), JSON.stringify(unified, null, 2));
writeFileSync(join(outputDir, 'essay-questions.json'), JSON.stringify(
  Object.values(essayByChapter).flat(), null, 2
));

console.log(`Unified exam: ${mcqTotal} MCQs + ${essayTotal} essay questions across ${unified.length} chapters`);
