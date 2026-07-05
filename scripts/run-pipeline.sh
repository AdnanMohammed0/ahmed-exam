#!/usr/bin/env bash
set -euo pipefail

# Paediatric Urology MCQ Generation Pipeline
# Run from project root
# Usage: bash scripts/run-pipeline.sh

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==========================================="
echo "  Paediatric Urology MCQ Pipeline"
echo "==========================================="

# Step 1: Split chapter text (if full-text.txt exists)
echo ""
echo "[1/5] Splitting chapter text..."
node scripts/split-chapters.mjs

# Step 2: Generate MCQs using sub-agents (parallel execution)
echo ""
echo "[2/5] Generating MCQs for all 25 chapters..."
echo "  Each chapter uses its dedicated agent .opencode/agents/mcq-writer/<slug>.md"
echo "  Run agents in parallel batches of 5:"
echo ""
for i in $(seq 1 5 25); do
  end=$((i + 4))
  if [ $end -gt 25 ]; then end=25; fi
  echo "  Batch: chapters $i-$end"
  for ch in $(seq $i $end); do
    slug=$(printf "ch%02d" $ch)
    # Map numerical chapter to slug
    case $ch in
      1) s="ch01-embryology" ;; 2) s="ch02-postnatal-hydronephrosis" ;;
      3) s="ch03-uti" ;; 4) s="ch04-imaging" ;; 5) s="ch05-urodynamics" ;;
      6) s="ch06-urolithiasis" ;; 7) s="ch07-hypospadias" ;; 8) s="ch08-dsd" ;;
      9) s="ch09-undescended-testis" ;; 10) s="ch10-acute-scrotum" ;;
      11) s="ch11-penile-oedema" ;; 12) s="ch12-testicular-tumours" ;;
      13) s="ch13-intersex-ethics" ;; 14) s="ch14-renal-stones-metabolic" ;;
      15) s="ch15-prune-belly" ;; 16) s="ch16-puv" ;;
      17) s="ch17-exstrophy" ;; 18) s="ch18-neuropathic-bladder" ;;
      19) s="ch19-enuresis" ;; 20) s="ch20-incontinence" ;;
      21) s="ch21-transplant" ;; 22) s="ch22-laparoscopy" ;;
      23) s="ch23-trauma" ;; 24) s="ch24-oncology" ;;
      25) s="ch25-adolescent" ;;
    esac
    echo "    - Running agent for $s"
    opencode run "mcq-writer-$s"
  done
  echo "  (batch complete)"
done

# Step 3: Run QA validation
echo ""
echo "[3/5] Running QA validation..."
opencode run "qa-validator"

# Step 4: Merge all chapters
echo ""
echo "[4/5] Merging all chapters..."
opencode run "merge-builder"

# Step 5: Build website
echo ""
echo "[5/5] Building website..."
cd site
npm run build
cd "$ROOT"

echo ""
echo "==========================================="
echo "  Pipeline complete!"
echo "  Site: site/dist/"
echo "  Data: site/public/data/questions.json"
echo "==========================================="
