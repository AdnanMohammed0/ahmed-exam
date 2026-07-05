import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const essayDir = join(__dirname, '..', 'content', 'essay');
const outputDir = join(__dirname, '..', 'site', 'public', 'data');

if (!existsSync(outputDir)) mkdirSync(outputDir, { recursive: true });

const files = readdirSync(essayDir).filter(f => f.endsWith('.json')).sort();
const result = [];

for (const file of files) {
  const raw = readFileSync(join(essayDir, file), 'utf-8').replace(/^\uFEFF/, '');
  const questions = JSON.parse(raw);
  if (questions.length === 0) continue;

  const chapterInfo = {
    chapterNumber: questions[0].chapterNumber || 0,
    chapterSlug: questions[0].chapterSlug || file.replace('.json', ''),
    chapterTitle: questions[0].chapter || file.replace('.json', '')
  };

  const formatted = {
    ...chapterInfo,
    questions: questions.map(q => ({
      id: q.id,
      type: q.format || 'SEQ',
      difficulty: q.difficulty || 'BOARD',
      title: q.title || q.topic || 'Untitled',
      questionText: formatQuestionText(q),
      markingGuide: formatMarkingGuide(q),
      discriminators: q.distinguishingFeatures || [],
      commonErrors: extractCommonErrors(q)
    }))
  };

  result.push(formatted);
}

function formatQuestionText(q) {
  if (q.format === 'EMQ') {
    let text = `Theme: ${q.theme || ''}\n\n`;
    text += `Options:\n${(q.options || []).join('\n')}\n\n`;
    text += `Scenarios:\n`;
    for (const stem of (q.stems || [])) {
      text += `${stem.number}. ${stem.text}\n`;
    }
    return text;
  }

  let text = '';
  if (q.scenario) text += `${q.scenario}\n\n`;
  for (const part of (q.parts || [])) {
    text += `(${part.letter}) ${part.instruction ? '[' + part.instruction.toUpperCase() + '] ' : ''}${part.text} [${part.marks} marks]\n`;
  }
  return text.trim();
}

function formatMarkingGuide(q) {
  let guide = q.markingGuide || '';
  if (q.modelAnswer) {
    guide += `\n\n─── MODEL ANSWER ───\n${q.modelAnswer}`;
  }
  return guide;
}

function extractCommonErrors(q) {
  if (q.commonErrors && Array.isArray(q.commonErrors)) return q.commonErrors;
  if (q.markingGuide) {
    const lines = q.markingGuide.split('\n').filter(l => l.toLowerCase().includes('error') || l.toLowerCase().includes('trap') || l.toLowerCase().includes('common'));
    return lines.length > 0 ? lines : ['See marking guide for examiner notes'];
  }
  return ['See marking guide for examiner notes'];
}

writeFileSync(join(outputDir, 'essays.json'), JSON.stringify(result, null, 2));
console.log(`Converted ${result.length} chapter essay banks`);
