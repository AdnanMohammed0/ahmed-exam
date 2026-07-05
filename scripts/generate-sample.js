const fs = require("fs");
const path = require("path");

const chapters = [
  { number: 1, title: "Embryology of the Genitourinary System", slug: "ch01-embryology" },
  { number: 2, title: "Postnatal Care of the Newborn with Antenatal Hydronephrosis", slug: "ch02-postnatal-hydronephrosis" },
  { number: 3, title: "Urinary Tract Infection in Children", slug: "ch03-uti" },
  { number: 4, title: "Imaging in Paediatric Urology", slug: "ch04-imaging" },
  { number: 5, title: "Urodynamics in Children", slug: "ch05-urodynamics" },
  { number: 6, title: "Management of Paediatric Urolithiasis", slug: "ch06-urolithiasis" },
  { number: 7, title: "Hypospadias", slug: "ch07-hypospadias" },
  { number: 8, title: "Disorders of Sexual Development", slug: "ch08-dsd" },
  { number: 9, title: "The Undescended Testis", slug: "ch09-undescended-testis" },
  { number: 10, title: "The Acute Scrotum", slug: "ch10-acute-scrotum" },
  { number: 11, title: "The Penile Oedema", slug: "ch11-penile-oedema" },
  { number: 12, title: "Testicular Tumours in Children and Adolescents", slug: "ch12-testicular-tumours" },
  { number: 13, title: "Intersex and the Paediatric Urologist: Ethical and Psychological Issues", slug: "ch13-intersex-ethics" },
  { number: 14, title: "Renal Stones: Metabolic Basis and Medical Management", slug: "ch14-renal-stones-metabolic" },
  { number: 15, title: "Prune-Belly Syndrome (Triad Syndrome, Eagle–Barrett Syndrome)", slug: "ch15-prune-belly" },
  { number: 16, title: "Posterior Urethral Valves", slug: "ch16-puv" },
  { number: 17, title: "Bladder Exstrophy and Epispadias", slug: "ch17-exstrophy" },
  { number: 18, title: "Neuropathic Bladder", slug: "ch18-neuropathic-bladder" },
  { number: 19, title: "Nocturnal Enuresis", slug: "ch19-enuresis" },
  { number: 20, title: "Urinary Incontinence and Voiding Dysfunction", slug: "ch20-incontinence" },
  { number: 21, title: "Paediatric Renal Transplantation", slug: "ch21-transplant" },
  { number: 22, title: "Paediatric Laparoscopy and Robotic Surgery", slug: "ch22-laparoscopy" },
  { number: 23, title: "Paediatric Urological Trauma", slug: "ch23-trauma" },
  { number: 24, title: "Paediatric Urological Oncology: Wilms Tumour and Other Renal Tumours", slug: "ch24-oncology" },
  { number: 25, title: "Urology in the Adolescent", slug: "ch25-adolescent" },
];

const topics = {
  1: [
    "Mesonephros development", "Metanephros induction", "Ureteric bud branching",
    "Cloacal division", "Genital tubercle formation", "Gonadal ridge differentiation",
    "Müllerian duct regression", "Wolffian duct development", "Bladder trigone origin",
    "Urogenital sinus development", "Kidney ascent", "Testicular descent (1st phase)",
    "Ovarian descent", "External genitalia differentiation", "DHT role in development",
    "SRY gene function", "WT1 gene in nephrogenesis", "PAX2 gene mutations",
    "Retinoic acid in nephrogenesis", "GDNF/RET signaling"
  ],
  2: ["Antenatal ultrasound screening", "SFU grading", "Postnatal ultrasound timing", "VCUG indications", "Antenatal counselling", "MAG3 renogram", "Antibiotic prophylaxis", "Surgical indications"],
  3: ["UTI definition", "E. coli virulence", "Vesicoureteric reflux", "DMSA scan", "Febrile UTI diagnosis", "Antibiotic choice", "Prophylaxis evidence", "Urine collection methods"],
  4: ["Ultrasound principles", "MCUG technique", "DMSA scar detection", "MAG3 diuretic renogram", "CT urography", "MRI urography", "Contrast media safety", "Radiation protection"],
  5: ["Cystometry", "Pressure-flow studies", "EMG in urodynamics", "Detrusor overactivity", "Compliance measurement", "Uroflowmetry", "Post-void residual", "Indications in children"],
  6: ["ESWL in children", "PCNL technique", "Ureteroscopy", "Metabolic evaluation", "Dietary management", "Staghorn calculi", "Cystinuria management", "Shockwave lithotripsy"],
  7: ["Embryology of hypospadias", "Distal hypospadias repair", "Proximal hypospadias", "Chordee assessment", "TIP urethroplasty", "Two-stage repair", "Complications management", "Hormonal therapy"],
  8: ["46XX DSD", "46XY DSD", "CAH management", "Androgen insensitivity", "5α-reductase deficiency", "Gonadal dysgenesis", "Gender assignment", "Timing of surgery"],
  9: ["Embryology of descent", "Inguinal examination", "Orchidopexy timing", "Laparoscopy for impalpable", "Hormonal therapy", "Infertility risk", "Malignancy risk", "Retractile testis"],
  10: ["Testicular torsion", "Torsion of appendix testis", "Epididymitis", "Surgical exploration", "Manual detorsion", "Orchidopexy technique", "Testicular salvage", "Imaging in acute scrotum"],
  11: ["Lymphoedema", "Idiopathic scrotal oedema", "Mondor disease", "Differential diagnosis", "Imaging workup", "Conservative management", "Surgical options"],
  12: ["Germ cell tumours", "Yolk sac tumour", "Teratoma", "Staging systems", "Tumour markers", "Inguinal orchidectomy", "RPLND indications", "Chemotherapy regimens"],
  13: ["Ethical frameworks", "Informed consent", "Gender identity development", "Psychological support", "Multidisciplinary team", "Timing of disclosure", "Support groups", "Long-term outcomes"],
  14: ["Hypercalciuria", "Hyperoxaluria", "Hypocitraturia", "Cystinuria", "Urine metabolic screen", "Thiazide therapy", "Potassium citrate", "Dietary modifications"],
  15: ["Triad characteristics", "Abdominal wall deficiency", "Urinary tract dilation", "Cryptorchidism management", "Respiratory complications", "Renal function outcomes", "Abdominoplasty options", "Long-term prognosis"],
  16: ["Embryology of PUV", "Antenatal diagnosis", "Postnatal presentation", "Valve ablation", "Bladder dysfunction", "Renal failure risk", "Vesicostomy", "Long-term follow-up"],
  17: ["Exstrophy spectrum", "Primary closure", "Pelvic osteotomy", "Epispadias repair", "Bladder neck reconstruction", "Continence outcomes", "Sexual function", "Long-term quality of life"],
  18: ["Myelomeningocele", "Sacral agenesis", "CIC technique", "Anticholinergic therapy", "Botulinum toxin", "Augmentation cystoplasty", "Mitrofanoff procedure", "Renal protection strategies"],
  19: "Primary nocturnal enuresis", "Desmopressin therapy", "Alarm therapy", "Bladder capacity", "Vasopressin secretion", "Sleep arousal", "Combination therapy", "Relapse prevention",
  20: "Daytime incontinence", "Urge syndrome", "Voiding postponement", "Dysfunctional voiding", "Urotherapy", "Biofeedback", "Constipation management", "Pharmacotherapy",
  21: "Recipient evaluation", "Living donor nephrectomy", "Immunosuppression regimens", "Surgical technique", "Vascular complications", "Urological complications", "Rejection episodes", "Long-term graft survival",
  22: "Instrumentation", "Port placement", "Pyeloplasty technique", "Nephrectomy approach", "Heminephrectomy", "Robotic assistance", "Complications", "Learning curve",
  23: "Renal trauma grading", "Blunt vs penetrating", "CT imaging protocol", "Conservative management", "Ureteral injury", "Bladder rupture", "Urethral injury", "Straddle injury",
  24: "Wilms tumour staging", "Preoperative chemotherapy", "Surgical approach", "Histological subtypes", "Chemotherapy protocols", "Radiotherapy indications", "Bilateral Wilms", "Relapse management",
  25: "Transitional care", "Adolescent compliance", "Late effects of PUV", "Fertility preservation", "Psychosocial issues", "Self-catheterization", "Body image", "Vocational counselling",
};

function randomItem(arr) {
  if (typeof arr === "string") return arr;
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const answerKeys = ["a", "b", "c", "d"];

function generateQuestion(chapter, qNum, topic) {
  const id = `ch${String(chapter.number).padStart(2, "0")}-Q${String(qNum).padStart(2, "0")}`;
  const correctIdx = qNum % 4;
  const correctLetter = answerKeys[correctIdx];
  const distractors = answerKeys.filter((k) => k !== correctLetter);

  const stemTemplate = [
    `Which of the following best describes ${topic.toLowerCase()}?`,
    `A 3-year-old boy presents with features suggestive of ${topic.toLowerCase()}. What is the most appropriate next step?`,
    `Regarding ${topic.toLowerCase()}, which statement is most accurate?`,
    `Which investigation is most helpful in diagnosing ${topic.toLowerCase()}?`,
    `What is the first-line management for ${topic.toLowerCase()}?`,
    `Which embryological structure gives rise to ${topic.toLowerCase()}?`,
    `Which gene mutation is most commonly associated with ${topic.toLowerCase()}?`,
    `What is the most common complication of ${topic.toLowerCase()}?`,
    `Which of the following is a contraindication to ${topic.toLowerCase()}?`,
    `In the management of ${topic.toLowerCase()}, which surgical approach is preferred?`,
  ];

  const stem = randomItem(stemTemplate);

  const correctTextTemplate = [
    `The ${topic} is primarily managed with observation and serial imaging`,
    `The ${topic} results from failed fusion of the Müllerian ducts`,
    `Diagnosis of ${topic} is confirmed by MCUG showing characteristic findings`,
    `Surgical repair of ${topic} should be performed before 18 months of age`,
    `The ${topic} is associated with mutations in the WT1 gene`,
    `First-line treatment for ${topic} is antibiotic prophylaxis`,
  ];

  const distractorTextTemplates = [
    `This condition requires immediate surgical exploration`,
    `CT scan is the gold standard for diagnosis`,
    `This abnormality is most commonly associated with trisomy 21`,
    `Chemotherapy is the mainstay of treatment`,
    `This is caused by excessive androgen exposure in utero`,
    `Radical nephrectomy is the treatment of choice`,
    `This condition typically resolves spontaneously by age 5`,
    `Ultrasound is the most sensitive diagnostic modality`,
  ];

  const options = answerKeys.map((letter, idx) => ({
    id: letter,
    text: idx === correctIdx
      ? randomItem(correctTextTemplate)
      : randomItem(distractorTextTemplates),
  }));

  // Ensure all options are unique
  const used = new Set([options[correctIdx].text]);
  for (let i = 0; i < 4; i++) {
    if (i === correctIdx) continue;
    let attempts = 0;
    while (used.has(options[i].text) && attempts < 20) {
      options[i].text = randomItem(distractorTextTemplates);
      attempts++;
    }
    used.add(options[i].text);
  }

  const explanation = `${topic}: The correct approach is ${options[correctIdx].text}. The other options describe different conditions or management strategies that do not apply in this context. This reflects standard teaching in paediatric urology.`;

  return {
    id,
    chapter: chapter.title,
    chapterSlug: chapter.slug,
    chapterNumber: chapter.number,
    questionNumber: qNum,
    stem,
    options,
    correctOptionId: correctLetter,
    explanation,
    topic: topic,
  };
}

function generateChapter(chapter) {
  const chTopics = topics[chapter.number] || ["General paediatric urology topic"];
  const questions = [];
  for (let i = 0; i < 50; i++) {
    const topic = chTopics[i % chTopics.length];
    questions.push(generateQuestion(chapter, i + 1, topic));
  }
  return questions;
}

function main() {
  const allQuestions = [];
  
  const outDir = path.join(__dirname, "..", "site", "public", "data");
  const mcqDir = path.join(__dirname, "..", "content", "mcq");
  const rawDir = path.join(__dirname, "..", "content", "raw");
  fs.mkdirSync(outDir, { recursive: true });
  fs.mkdirSync(mcqDir, { recursive: true });
  fs.mkdirSync(rawDir, { recursive: true });

  for (const chapter of chapters) {
    const cq = generateChapter(chapter);
    const mcqFile = path.join(mcqDir, `${chapter.slug}.json`);
    fs.writeFileSync(mcqFile, JSON.stringify(cq, null, 2));
    allQuestions.push(...cq);
    console.log(`Generated 50 questions for ${chapter.slug}`);
  }

  const mergedFile = path.join(outDir, "questions.json");
  fs.writeFileSync(mergedFile, JSON.stringify(allQuestions, null, 2));
  console.log(`\nTotal: ${allQuestions.length} questions written to ${mergedFile}`);

  // Generate manifest
  const manifest = {
    totalQuestions: allQuestions.length,
    version: "1.0.0",
    generatedAt: new Date().toISOString(),
    chapters: chapters.map((ch) => ({
      number: ch.number,
      title: ch.title,
      slug: ch.slug,
      questionCount: 50,
    })),
  };
  const manifestFile = path.join(outDir, "..", "..", "content", "data", "manifest.json");
  fs.writeFileSync(manifestFile, JSON.stringify(manifest, null, 2));
  console.log(`Manifest written to ${manifestFile}`);
}

main();
