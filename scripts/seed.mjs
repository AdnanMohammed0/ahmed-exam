import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const chapters = [
  { n: 1, t: "Embryology", s: "ch01_embryology" },
  { n: 2, t: "Renal Development and Dysfunction", s: "ch02_renal-development-dysfunction" },
  { n: 3, t: "Imaging", s: "ch03_imaging" },
  { n: 4, t: "Prenatal Diagnosis", s: "ch04_prenatal-diagnosis" },
  { n: 5, t: "Urinary Tract Infection", s: "ch05_urinary-tract-infection" },
  { n: 6, t: "Vesicoureteral Reflux", s: "ch06_vesicoureteral-reflux" },
  { n: 7, t: "Upper Tract Obstruction", s: "ch07_upper-tract-obstruction" },
  { n: 8, t: "Duplication, Ureteroceles, Ectopic Ureters", s: "ch08_duplication-ureteroceles-ectopic-ureters" },
  { n: 9, t: "Posterior Urethral Valves", s: "ch09_posterior-urethral-valves" },
  { n: 10, t: "Cystic Renal Disease", s: "ch10_cystic-renal-disease" },
  { n: 11, t: "Urinary Tract Calculi", s: "ch11_urinary-tract-calculi" },
  { n: 12, t: "Urinary Incontinence", s: "ch12_urinary-incontinence" },
  { n: 13, t: "Neurogenic Bladder", s: "ch13_neurogenic-bladder" },
  { n: 14, t: "Anorectal Malformations / Renal Ectopia", s: "ch14_anorectal-malformations-renal-ectopia" },
  { n: 15, t: "Bladder Exstrophy / Epispadias", s: "ch15_bladder-exstrophy-epispadias" },
  { n: 16, t: "Hypospadias", s: "ch16_hypospadias" },
  { n: 17, t: "The Prepuce", s: "ch17_the-prepuce" },
  { n: 18, t: "Testis, Hydrocoele, Varicocoele", s: "ch18_testis-hydrocoele-varicocoele" },
  { n: 19, t: "Acute Scrotum", s: "ch19_acute-scrotum" },
  { n: 20, t: "Disorders of Sex Development", s: "ch20_disorders-of-sex-development" },
  { n: 21, t: "Genitourinary Malignancies", s: "ch21_genitourinary-malignancies" },
  { n: 22, t: "Pediatric Genitourinary Trauma", s: "ch22_pediatric-genitourinary-trauma" },
  { n: 23, t: "Laparoscopic Pediatric Urology", s: "ch23_laparoscopic-pediatric-urology" },
  { n: 24, t: "Adolescent Urology", s: "ch24_adolescent-urology" },
  { n: 25, t: "Pediatric/Adolescent Gynecology", s: "ch25_pediatric-adolescent-gynecology" },
];

const topicsByChapter = {
  1: ["Embryological origin", "Mesonephros", "Metanephros", "Ureteric bud", "Cloacal division", "Genital tubercle", "Gonadal ridge", "Mullerian duct", "Wolffian duct", "Bladder trigone"],
  2: ["Renal development", "Renal agenesis", "Renal dysplasia", "Renal hypoplasia", "Renal ectopia", "Horseshoe kidney", "Multicystic dysplastic kidney", "Renal function assessment"],
  3: ["Ultrasound", "MCUG", "DMSA scan", "MAG3 renogram", "CT urography", "MRI urography", "Contrast safety", "Radiation protection"],
  4: ["Antenatal screening", "Hydronephrosis grading", "Postnatal workup", "Counselling", "VCUG timing", "MAG3 timing", "Prophylaxis", "Surgical indications"],
  5: ["UTI definition", "E. coli virulence", "Vesicoureteric reflux", "DMSA scarring", "Febrile UTI", "Antibiotic choice", "Prophylaxis", "Urine collection"],
  6: ["Reflux grading", "Spontaneous resolution", "Medical management", "Endoscopic injection", "Ureteral reimplantation", "Reflux nephropathy", "Sibling screening", "Breakthrough UTI"],
  7: ["PUJ obstruction", "UVJ obstruction", "Retrocaval ureter", "Diuretic renogram", "Anderson-Hynes pyeloplasty", "Nephrectomy", "Megaureter", "Obstructive uropathy"],
  8: ["Duplex systems", "Ureterocele", "Ectopic ureter", "Heminephrectomy", "Ureteroureterostomy", "Common sheath reimplant", "Weigert-Meyer rule", "Upper pole obstruction"],
  9: ["PUV embryology", "Antenatal diagnosis", "Postnatal presentation", "Valve ablation", "Bladder dysfunction", "Renal failure", "Vesicostomy", "Long-term follow-up"],
  10: ["MCDK", "Autosomal dominant PKD", "Autosomal recessive PKD", "Tuberous sclerosis", "Von Hippel-Lindau", "Simple cysts", "Cystic dysplasia", "Renal function"],
  11: ["Calcium stones", "Struvite stones", "Cystine stones", "Uric acid stones", "ESWL", "PCNL", "Ureteroscopy", "Metabolic evaluation"],
  12: ["Daytime incontinence", "Urge syndrome", "Voiding postponement", "Dysfunctional voiding", "Urotherapy", "Biofeedback", "Enuresis", "Desmopressin"],
  13: ["Myelomeningocele", "Sacral agenesis", "CIC", "Anticholinergic", "Botulinum toxin", "Augmentation cystoplasty", "Mitrofanoff", "Renal protection"],
  14: ["ARM types", "Renal ectopia", "VACTERL association", "PSARP", "Fecal incontinence", "Urologic screening", "Spinal anomalies", "Long-term outcomes"],
  15: ["Exstrophy spectrum", "Primary closure", "Pelvic osteotomy", "Epispadias repair", "Bladder neck reconstruction", "Continence", "Sexual function", "Quality of life"],
  16: ["Embryology", "Distal repair", "Proximal repair", "Chordee", "TIP urethroplasty", "Two-stage repair", "Complications", "Hormonal therapy"],
  17: ["Phimosis", "Paraphimosis", "Circumcision", "Balanitis", "Balanitis xerotica obliterans", "Preputial adhesions", "Hygiene", "Meatal stenosis"],
  18: ["Undescended testis", "Hydrocoele", "Varicocoele", "Orchidopexy", "Testicular torsion", "Testicular appendix", "Epididymitis", "Inguinal hernia"],
  19: ["Testicular torsion", "Appendix testis torsion", "Epididymitis", "Surgical exploration", "Manual detorsion", "Orchidopexy", "Salvage rates", "Acute scrotum imaging"],
  20: ["46XX DSD", "46XY DSD", "CAH", "AIS", "5-alpha reductase deficiency", "Gonadal dysgenesis", "Gender assignment", "Surgery timing"],
  21: ["Wilms tumour", "Neuroblastoma", "Rhabdomyosarcoma", "Testicular tumours", "Renal cell carcinoma", "Staging", "Chemotherapy", "Radiotherapy"],
  22: ["Renal trauma", "Ureteral injury", "Bladder rupture", "Urethral injury", "Straddle injury", "CT protocol", "Conservative management", "Surgical repair"],
  23: ["Instrumentation", "Port placement", "Pyeloplasty", "Nephrectomy", "Heminephrectomy", "Robotic assistance", "Complications", "Learning curve"],
  24: ["Transitional care", "Adolescent compliance", "Late effects", "Fertility", "Psychosocial", "Self-catheterization", "Body image", "Vocational"],
  25: ["Labial adhesions", "Ovarian cysts", "Vaginal anomalies", "Imperforate hymen", "Vaginal atresia", "Mayer-Rokitansky-Kuster-Hauser", "Pediatric gynecology", "Adolescent gynecology"],
};

const letters = ["a", "b", "c", "d"];

function generateQuestion(ch, idx) {
  const num = idx + 1;
  const id = "ch" + String(ch.n).padStart(2, "0") + "-Q" + String(num).padStart(2, "0");
  const correctIdx = idx % 4;
  const chTopics = topicsByChapter[ch.n] || ["General topic"];
  const topic = chTopics[idx % chTopics.length];

  const options = letters.map((l, li) => ({
    id: l,
    text: li === correctIdx
      ? "This is the correct answer based on current pediatric urology guidelines."
      : "This is a plausible distractor representing a common misconception.",
  }));

  const ages = ["2", "3", "4", "5", "6", "newborn", "8", "10", "12", "14"];
  const age = ages[idx % ages.length];

  return {
    id,
    chapter: ch.t,
    chapterSlug: ch.s,
    chapterNumber: ch.n,
    questionNumber: num,
    stem: "A " + age + "-year-old patient presents with findings related to " + topic + ". What is the most appropriate next step in management?",
    options,
    correctOptionId: letters[correctIdx],
    explanation: topic + ": The correct answer reflects standard pediatric urology practice. The distractors describe alternative approaches that are not first-line in this scenario.",
    topic,
  };
}

function main() {
  const allQuestions = [];

  for (const ch of chapters) {
    for (let i = 0; i < 50; i++) {
      allQuestions.push(generateQuestion(ch, i));
    }
  }

  const outDir = path.join(__dirname, "..", "site", "public", "data");
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, "questions.json"), JSON.stringify(allQuestions, null, 2));

  console.log("Generated " + allQuestions.length + " sample questions");
}

main();
