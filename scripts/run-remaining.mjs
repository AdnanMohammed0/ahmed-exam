import fs from 'fs';
import { resolve } from 'path';
import { spawn } from 'child_process';

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
      else reject(new Error(`Command exited with code ${code}`));
    });
    child.on('error', reject);
  });
}

async function main() {
  const remaining = CHAPTERS.filter(slug => {
    const reportPath = resolve(ROOT, 'content', 'data', `qa-report-${slug}.txt`);
    return !fs.existsSync(reportPath);
  });

  console.log(`Remaining chapters to run (${remaining.length}): ${remaining.join(', ')}`);

  const results = [];
  for (const slug of remaining) {
    const agent = slugToAgent(slug);
    console.log(`\n====== [${slug}] starting ======\n`);

    try {
      const prompt = `@${agent} Execute all 4 steps on chapter ${slug} from the pediatric urology MCQ bank. Read content/raw/${slug}.txt and content/mcq/${slug}.json. Step 1: Convert recall questions to clinical vignettes. Step 2: Improve distractors (same category, plausibility, homogeneity, no giveaways). Step 3: Enhance explanations with per-option rationales and teaching points. Step 4: Run QA review and write report to content/data/qa-report-${slug}.txt. Overwrite the MCQ file. Return a summary of all changes.`;

      const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
      await runCommand(npx, ['opencode', 'run', prompt, '--auto']);

      console.log(`  [${slug}] OK`);
      results.push({ slug, success: true });
    } catch (err) {
      console.error(`  [${slug}] FAILED: ${err.message.slice(0, 200)}`);
      results.push({ slug, success: false, error: err.message });
    }
  }

  // Summary
  console.log(`\n====== RUN REMAINING SUMMARY ======\n`);
  let ok = 0, fail = 0;
  for (const r of results) {
    console.log(`  ${r.success ? 'OK' : 'FAIL'} ${r.slug}`);
    if (r.success) ok++; else fail++;
  }
  console.log(`\n  ${ok} OK, ${fail} failed`);

  if (fail === 0 && remaining.length > 0) {
    console.log(`\n====== Merging and building ======\n`);
    try {
      await runCommand('node', ['scripts/merge.mjs']);
      const npmCmd = process.platform === 'win32' ? 'npm.cmd' : 'npm';
      await runCommand(npmCmd, ['run', 'build'], { cwd: resolve(ROOT, 'site') });
      console.log(`  Build complete.`);
    } catch (e) {
      console.error(`Failed to merge/build: ${e.message}`);
    }
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
