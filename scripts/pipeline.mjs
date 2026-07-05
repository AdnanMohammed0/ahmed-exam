#!/usr/bin/env node
/**
 * Pipeline orchestrator — runs tutor agents on chapters.
 *
 * Usage:
 *   node scripts/pipeline.mjs                    # all 25 chapters (sequentially)
 *   node scripts/pipeline.mjs ch16_hypospadias   # single chapter
 *   node scripts/pipeline.mjs 1-5                # chapters 1 through 5
 */

import { spawn } from 'child_process';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');

const CHAPTERS = [
  'ch01_embryology', 'ch02_renal-development-dysfunction', 'ch03_imaging',
  'ch04_prenatal-diagnosis', 'ch05_urinary-tract-infection', 'ch06_vesicoureteral-reflux',
  'ch07_upper-tract-obstruction', 'ch08_duplication-ureteroceles-ectopic-ureters',
  'ch09_posterior-urethral-valves', 'ch10_cystic-renal-disease', 'ch11_urinary-tract-calculi',
  'ch12_urinary-incontinence', 'ch13_neurogenic-bladder', 'ch14_anorectal-malformations-renal-ectopia',
  'ch15_bladder-exstrophy-epispadias', 'ch16_hypospadias', 'ch17_the-prepuce',
  'ch18_testis-hydrocoele-varicocoele', 'ch19_acute-scrotum', 'ch20_disorders-of-sex-development',
  'ch21_genitourinary-malignancies', 'ch22_pediatric-genitourinary-trauma',
  'ch23_laparoscopic-pediatric-urology', 'ch24_adolescent-urology',
  'ch25_pediatric-adolescent-gynecology',
];

function parseArgs() {
  const arg = process.argv[2];
  if (!arg) return CHAPTERS;
  if (/^\d+-\d+$/.test(arg)) {
    const [a, b] = arg.split('-').map(Number);
    return CHAPTERS.slice(a - 1, b);
  }
  const ch = CHAPTERS.find(c => c === arg);
  return ch ? [ch] : CHAPTERS;
}

function slugToAgent(slug) {
  const n = slug.match(/ch(\d+)/)[1];
  return `tutor-ch${n.padStart(2, '0')}`;
}

/**
 * Run a command with real-time output streaming.
 * Avoids execSync which crashes on Windows with ETIMEDOUT for long-running tasks.
 */
function runCommand(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    // shell:true is required on Windows for .cmd files (npx.cmd, npm.cmd)
    const child = spawn(cmd, args, {
      cwd: ROOT,
      stdio: 'inherit',
      shell: true,
      ...opts,
    });
    child.on('close', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`Command "${cmd} ${args.join(' ')}" exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function runChapter(slug) {
  const agent = slugToAgent(slug);
  console.log(`\n====== [${slug}] starting ======\n`);

  try {
    const prompt = `@${agent} Execute all 4 steps on chapter ${slug} from the pediatric urology MCQ bank. Read content/raw/${slug}.txt and content/mcq/${slug}.json. Step 1: Convert recall questions to clinical vignettes. Step 2: Improve distractors (same category, plausibility, homogeneity, no giveaways). Step 3: Enhance explanations with per-option rationales and teaching points. Step 4: Run QA review and write report to content/data/qa-report-${slug}.txt. Overwrite the MCQ file. Return a summary of all changes.`;

    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    await runCommand(npx, ['opencode', 'run', prompt, '--auto']);

    console.log(`  [${slug}] OK`);
    return { slug, success: true };
  } catch (err) {
    console.error(`  [${slug}] FAILED: ${err.message.slice(0, 200)}`);
    return { slug, success: false, error: err.message };
  }
}

async function mergeAndBuild() {
  console.log(`\n====== Merging and building ======\n`);
  try {
    await runCommand('node', ['scripts/merge.mjs']);
    const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
    await runCommand(npmCmd, ['run', 'build'], { cwd: resolve(ROOT, 'site') });
    console.log(`  Build complete.`);
  } catch (err) {
    console.error(`  Merge/build failed: ${err.message}`);
    throw err;
  }
}

async function main() {
  const chapters = parseArgs();
  console.log(`Running ${chapters.length} chapters: ${chapters.join(', ')}`);

  const results = [];
  for (const ch of chapters) {
    const r = await runChapter(ch);
    results.push(r);
  }

  // Summary
  console.log(`\n====== SUMMARY ======\n`);
  let ok = 0, fail = 0;
  for (const r of results) {
    console.log(`  ${r.success ? 'OK' : 'FAIL'} ${r.slug}`);
    if (r.success) ok++; else fail++;
  }
  console.log(`\n  ${ok} OK, ${fail} failed`);

  if (fail === 0) {
    await mergeAndBuild();
  } else {
    console.log(`\nSome chapters failed. Fix and re-run individually.`);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
