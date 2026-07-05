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
 * Run a command and return a Promise.
 * Pipes output to both the parent process stdio and an optional log file.
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

  if (remaining.length === 0) {
    console.log("All chapters already processed.");
    process.exit(0);
  }

  const CONCURRENCY = 3;
  let index = 0;
  let active = 0;
  const results = [];

  function runNext() {
    if (index >= remaining.length && active === 0) {
      printSummary();
      return;
    }

    while (active < CONCURRENCY && index < remaining.length) {
      const slug = remaining[index++];
      active++;
      runChapter(slug);
    }
  }

  function runChapter(slug) {
    const agent = slugToAgent(slug);
    console.log(`[START] ${slug}`);
    const prompt = `@${agent} Execute all 4 steps on chapter ${slug} from the pediatric urology MCQ bank. Read content/raw/${slug}.txt and content/mcq/${slug}.json. Step 1: Convert recall questions to clinical vignettes. Step 2: Improve distractors (same category, plausibility, homogeneity, no giveaways). Step 3: Enhance explanations with per-option rationales and teaching points. Step 4: Run QA review and write report to content/data/qa-report-${slug}.txt. Overwrite the MCQ file. Return a summary of all changes.`;

    const logFile = resolve(ROOT, 'content', 'data', `tutor-run-${slug}.log`);
    const outStream = fs.createWriteStream(logFile);

    const npx = process.platform === 'win32' ? 'npx.cmd' : 'npx';
    const child = spawn(npx, ['opencode', 'run', prompt, '--auto'], { cwd: ROOT });

    // Tee output: log file + console (with { end: false } to avoid closing process.stdout early)
    child.stdout.pipe(outStream);
    child.stderr.pipe(outStream);
    child.stdout.pipe(process.stdout, { end: false });
    child.stderr.pipe(process.stderr, { end: false });

    child.on('close', (code) => {
      active--;
      outStream.end();
      if (code === 0) {
        console.log(`[SUCCESS] ${slug}`);
        results.push({ slug, success: true });
      } else {
        console.error(`[FAILED] ${slug} (exit code ${code})`);
        console.error(`  Full output logged to: ${logFile}`);
        results.push({ slug, success: false, code });
      }
      runNext();
    });
  }

  async function printSummary() {
    console.log(`\n====== SUMMARY ======\n`);
    let ok = 0, fail = 0;
    for (const r of results) {
      console.log(`  ${r.success ? 'OK' : 'FAIL'} ${r.slug}`);
      if (r.success) ok++; else fail++;
    }
    console.log(`\n  ${ok} OK, ${fail} failed`);

    if (fail === 0) {
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

  runNext();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
