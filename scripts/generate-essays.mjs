import fs from 'fs';
import { resolve } from 'path';

const ROOT = resolve(import.meta.dirname, '..');
const OUT_FILE = resolve(ROOT, 'site', 'public', 'data', 'essays.json');

const essays = [
  {
    chapterNumber: 10,
    chapterSlug: "ch10_cystic-renal-disease",
    chapterTitle: "Cystic Renal Disease",
    questions: [
      {
        id: "ch10-E01",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 1 — ARPKD vs ADPKD Differentiation",
        questionText: `QUESTION 1 — Autosomal Recessive vs Autosomal Dominant Polycystic Kidney Disease [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A 2-day-old neonate is evaluated in the neonatal intensive care unit for abdominal distension and severe hypertension. Antenatal history is notable for bilateral echogenic kidneys with oligohydramnios. On examination, there are large, firm, bilateral flank masses.

(a) Enumerate the clinical and genetic features that distinguish Autosomal Recessive Polycystic Kidney Disease (ARPKD) from Autosomal Dominant Polycystic Kidney Disease (ADPKD) in a neonate. [6 marks]
(b) Outline the initial medical and supportive management for a neonate presenting with severe ARPKD. [5 marks]
(c) Explain the pathological process responsible for hepatic involvement in ARPKD, and describe its long-term clinical manifestations. [5 marks]
(d) Justify the role of genetic counselling and prenatal diagnosis for a family with a child diagnosed with ARPKD. [4 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [6 marks] — Award 1 mark per valid point up to 6.
Expected answers:
• ARPKD is autosomal recessive (PKHD1 gene, chromosome 6p) whereas ADPKD is autosomal dominant (PKD1 on chromosome 16p, PKD2 on chromosome 4q). [1]
• In ARPKD, the recurrence risk for siblings is 25%; in ADPKD, it is 50% if a parent is affected. [1]
• Presentation of ARPKD is typically neonatal with bilateral masses, pulmonary hypoplasia, and oligohydramnios. ADPKD typically presents in adulthood, though rare infantile cases exist. [1]
• Ultrasound in ARPKD shows bilateral, symmetric, microcystic enlargement with loss of corticomedullary differentiation. ADPKD shows macrocysts of varying sizes with normal renal tissue interspaced. [1]
• Liver involvement is universal in ARPKD (biliary dysgenesis, congenital hepatic fibrosis) but manifests as liver macrocysts (typically later in life) in ADPKD. [1]
• Parents of an ARPKD child are obligate carriers with normal kidneys; in ADPKD, one parent is usually affected and will show renal cysts on ultrasound. [1]
Examiner note: Candidates often confuse the genetics. Emphasize that parental renal ultrasound is a key, cost-effective diagnostic test to rule out ADPKD.

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Respiratory support: mechanical ventilation if pulmonary hypoplasia or splinting from abdominal distension is present. [1]
• Aggressive blood pressure control: first-line therapy is typically an ACE inhibitor (e.g., enalaprilat/enalapril) to target the hyper-reninemic state. [1]
• Fluid and electrolyte monitoring: manage hyponatremia (frequently dilutional) and monitor for hyperkalemia. [1]
• Nutritional support: high-calorie feeding (nasogastric or gastrostomy if needed) due to early satiety from mechanical compression. [1]
• Early nephrectomy: bilateral or unilateral nephrectomy as a last resort in cases of severe respiratory compromise to allow diaphragmatic excursion. [1]

(c) [5 marks] — Award 1 mark per point.
Expected answers:
• Pathology: Ductal plate malformation of the liver leading to dilated biliary channels and congenital hepatic fibrosis. [1]
• Hepatosplenomegaly: progressive enlargement of both liver and spleen. [1]
• Portal hypertension: fibrotic liver tissue obstructs portal venous flow. [1]
• Esophageal/gastric varices: risk of life-threatening upper gastrointestinal hemorrhage. [1]
• Hypersplenism: sequestration of platelets and red blood cells leading to thrombocytopenia and anemia. [1]

(d) [4 marks] — Award 1 mark per point.
Expected answers:
• Recurrence risk: counseling that each future pregnancy carries a 1-in-4 (25%) risk of ARPKD. [1]
• Carrier screening: sibling risk of being asymptomatic carriers (2/3 of unaffected siblings). [1]
• Prenatal diagnostics: discussion of chorionic villus sampling (CVS) or amniocentesis for PKHD1 mutations if parental mutations are known. [1]
• Pre-implantation genetic diagnosis (PGD): option to select unaffected embryos during IVF. [1]

MODEL ANSWER:
ARPKD is a progressive fibrocystic disease affecting the kidneys and liver. In a neonate, it presents as bilaterally enlarged echogenic kidneys with severe neonatal hypertension, whereas ADPKD typically presents in adulthood with macroscopic cysts. Management in the NICU requires respiratory support, aggressive blood pressure control with ACE inhibitors, and nutritional optimization. The hepatic lesion in ARPKD is congenital hepatic fibrosis, leading to portal hypertension and varices in childhood. Genetic counseling is vital to discuss the 25% recurrence risk and options for prenatal mutation analysis.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Mentioning the PKHD1 gene and fibrocystin protein.
• Emphasizing that parental renal ultrasound is the most immediate way to rule out ADPKD (since ADPKD parents will almost certainly have cysts visible by age 30).
• Discussing the role of ACE inhibitors as the specific pathophysiological choice for hypertension in ARPKD.`,
        discriminators: [
          "Citing the PKHD1 gene and fibrocystin protein.",
          "Recommending parental renal ultrasound as a fast, cost-effective screening tool to differentiate neonatal ADPKD from ARPKD.",
          "Specifying ACE inhibitors as the drug class of choice due to hyper-reninemic hypertension in ARPKD."
        ],
        commonErrors: [
          "Confusing the inheritance patterns or chromosome locations of PKHD1 and PKD1/PKD2.",
          "Suggesting early liver transplantation for portal hypertension before attempting medical/endoscopic management of varices."
        ]
      },
      {
        id: "ch10-E02",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 2 — Multicystic Dysplastic Kidney (MCDK) Management",
        questionText: `QUESTION 2 — Multicystic Dysplastic Kidney (MCDK)                    [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A prenatal ultrasound at 20 weeks gestational age identifies a left multicystic dysplastic kidney (MCDK). The right kidney appears normal in size and echogenicity, with normal amniotic fluid volume. The pregnancy proceeds to term without complication.

(a) Describe the ultrasound features that define a multicystic dysplastic kidney and distinguish it from severe hydronephrosis. [5 marks]
(b) Outline the postnatal evaluation and imaging protocol for this child, including the rationale for each study. [5 marks]
(c) Discuss the natural history of unilateral MCDK and the current consensus on surgical vs. non-operative management. [5 marks]
(d) State the risk and clinical significance of contralateral anomalies in patients with a unilateral MCDK. [5 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Multiple non-communicating cysts of variable sizes. [1]
• Absence of identifiable renal pelvis on ultrasound. [1]
• Absence of normal renal parenchyma surrounding or between the cysts. [1]
• Non-medial, random arrangement of cysts (unlike hydronephrosis where dilated calyces converge on a central pelvis). [1]
• Lack of vascular flow in the main renal artery on Doppler interrogation. [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Postnatal ultrasound at 4–6 weeks: to confirm the diagnosis (earlier scan may miss contralateral pathology due to neonatal dehydration). [1]
• Assess contralateral kidney size: looking for compensatory hypertrophy (length > 95th percentile). [1]
• DMSA scan (optional/discretionary): to confirm lack of function in the affected kidney if diagnosis is in doubt. [1]
• Micturating Cystourethrogram (MCU): no longer routine; indicated only if the contralateral kidney is hydronephrotic, small, or if there is a history of UTIs. [1]
• Blood pressure and urine dipstick: baseline screen for renal insufficiency/hypertension. [1]

(c) [5 marks] — Award 1 mark per point.
Expected answers:
• Natural history: spontaneous involution occurs in the majority of cases (approx. 50% within 5 years, and up to 75% long term). [1]
• Non-operative management is the standard of care: serial ultrasounds until involution is confirmed or growth stabilizes. [1]
• Indications for nephrectomy: pain, recurrent UTI, rapid cyst growth causing mass effect, or persistent hypertension (rare). [1]
• Historical malignancy concern: Wilms tumor or RCC risk in MCDK is extremely low, matching the general population; routine prophylactic nephrectomy is not justified. [1]
• Discharge threshold: once involution is complete or compensatory growth of the contralateral kidney is stable (usually by age 2–5). [1]

(d) [5 marks] — Award 1 mark per point.
Expected answers:
• Contralateral anomalies are common: seen in up to 30–40% of cases. [1]
• Vesicoureteral reflux (VUR) is the most common contralateral anomaly (~15–20%). [1]
• Contralateral ureteropelvic junction obstruction (UPJO) is present in 5–10% of cases. [1]
• Solitary kidney function: the contralateral normal kidney must be protected; risk of long-term CKD/hypertension if it is damaged. [1]
• Hypertrophy: a lack of compensatory hypertrophy in the contralateral kidney suggests underlying dysfunction/dysplasia. [1]

MODEL ANSWER:
A left MCDK is characterized on ultrasound by multiple non-communicating cysts of varying size with no visible renal pelvis or functioning parenchyma. Postnatal evaluation includes a baseline ultrasound at 4-6 weeks to confirm the diagnosis and assess the contralateral kidney for compensatory hypertrophy and associated anomalies (such as VUR or UPJO, which occur in up to 40%). Management is conservative, as most MCDKs undergo spontaneous involution. Prophylactic nephrectomy is not indicated unless complications like hypertension, pain, or recurrent infection arise.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Noting that a postnatal scan should be delayed to 4-6 weeks to allow transient neonatal dehydration to resolve (which can underestimate contralateral hydronephrosis).
• Discussing the concept of compensatory hypertrophy (contralateral kidney length >2 standard deviations above the mean) as an indicator of a healthy solitary unit.
• Specifying that MCU is reserved only for patients with contralateral abnormalities on ultrasound.`,
        discriminators: [
          "Stating that the first postnatal ultrasound should be delayed to 4-6 weeks to avoid false negatives from neonatal dehydration.",
          "Defining compensatory hypertrophy quantitatively (>2 SD or >95th percentile for age).",
          "Explaining that MCU is no longer routine and only indicated if the contralateral kidney is abnormal."
        ],
        commonErrors: [
          "Recommending routine nephrectomy to prevent malignant transformation (an outdated concept).",
          "Ordering an immediate cystography (MCU) in all newborns with unilateral MCDK."
        ]
      },
      {
        id: "ch10-E03",
        type: "SAQ",
        difficulty: "FOUNDATION",
        title: "SAQ 1 — Juvenile Nephronophthisis",
        questionText: `SAQ 1 — Juvenile Nephronophthisis                                [8 marks]

A 10-year-old child presents with progressive fatigue, polyuria, polydipsia, and mild anemia. Blood tests reveal elevated serum creatinine and urea. Urinalysis shows no hematuria or proteinuria, and renal ultrasound shows normal to small-sized kidneys with increased echogenicity and loss of corticomedullary differentiation.

(a) State the most likely diagnosis and its genetic inheritance pattern. [2 marks]
(b) List three key clinical or histopathological features of this condition. [3 marks]
(c) State three associated extra-renal anomalies that may occur. [3 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [2 marks]
• Diagnosis: Juvenile Nephronophthisis (NPHP). [1]
• Genetic inheritance: Autosomal Recessive. [1]

(b) [3 marks] — Award 1 mark per valid point (max 3):
• Presentation with polyuria, polydipsia, and anemia out of proportion to renal failure. [1]
• Tubulointerstitial nephritis characterized by tubular basement membrane disruption/splitting. [1]
• Progressive interstitial fibrosis and tubular atrophy. [1]
• Medullary cysts (typically small, at the corticomedullary junction, though not always present early). [1]
• Normal or small kidney size on ultrasound (distinguishing it from polycystic diseases). [1]

(c) [3 marks] — Award 1 mark per valid point (max 3):
• Senior-Løken syndrome (retinitis pigmentosa / retinal dystrophy). [1]
• Joubert syndrome (cerebellar vermis hypoplasia / "molar tooth sign" on MRI, ataxia). [1]
• Cogan syndrome (ocular motor apraxia). [1]
• Mainzer-Saldino syndrome (skeletal dysplasia / cone-shaped epiphyses). [1]
• Congenital hepatic fibrosis. [1]

COMMON ERRORS SEEN IN EXAMS:
• Confusing nephronophthisis with Medullary Cystic Kidney Disease (MCKD), which is autosomal dominant and presents later in adulthood.
• Suggesting that large kidneys are typical (in NPHP, kidneys are small or normal-sized, unlike ARPKD/ADPKD).`,
        discriminators: [
          "Differentiating NPHP from Medullary Cystic Kidney Disease by genetic pattern (AR vs AD).",
          "Mentioning specific syndromic names like Senior-Løken or Joubert."
        ],
        commonErrors: [
          "Confusing NPHP with autosomal dominant medullary cystic kidney disease.",
          "Describing large cystic kidneys on ultrasound."
        ]
      },
      {
        id: "ch10-E04",
        type: "SAQ",
        difficulty: "BOARD",
        title: "SAQ 2 — TSC2/PKD1 Contiguous Gene Deletion Syndrome",
        questionText: `SAQ 2 — TSC2/PKD1 Contiguous Gene Deletion Syndrome               [10 marks]

A 3-month-old infant is found to have severe, bilateral renal cysts on ultrasound during evaluation for infantile spasms. The family history is negative for renal disease.

(a) What genetic condition should be suspected, and what is its molecular basis? [3 marks]
(b) Outline three clinical manifestations of Tuberous Sclerosis Complex (TSC) that may be seen in this patient. [3 marks]
(c) Explain the prognosis and long-term renal management for this child. [4 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Suspected condition: TSC2/PKD1 contiguous gene deletion syndrome. [1]
• Molecular basis: Deletion of adjacent genes TSC2 (Tuberous Sclerosis 2) and PKD1 (Polycystic Kidney Disease 1) located on chromosome 16p13.3. [2]

(b) [3 marks] — Award 1 mark per point (max 3):
• Infantile spasms / seizures. [1]
• Cortical tubers or subependymal nodules in the brain on MRI. [1]
• Cardiac rhabdomyomas (often regress spontaneously but visible on echocardiography). [1]
• Dermatological findings: ash-leaf spots (hypomelanotic macules), facial angiofibromas (later in childhood). [1]

(c) [4 marks] — Award 1 mark per point:
• Prognosis: Much more rapid progression to end-stage renal disease (ESRD) compared to typical ADPKD or TSC alone (often in childhood or adolescence). [1]
• Serial ultrasound/MRI to monitor cyst growth and scan for renal angiomyolipomas (AMLs). [1]
• Aggressive management of hypertension (ACE inhibitors). [1]
• Treatment of TSC features: mTOR inhibitors (e.g., everolimus) which can reduce both astrocytomas/AMLs and slow cyst expansion. [1]

COMMON ERRORS SEEN IN EXAMS:
• Diagnosing simple ADPKD without explaining the contiguous gene syndrome which accounts for the early, severe phenotype combined with neurologic features.
• Suggesting that renal cysts in TSC are always benign and do not lead to renal failure.`,
        discriminators: [
          "Naming the specific chromosomal locus: 16p13.3.",
          "Identifying the therapeutic role of mTOR inhibitors (everolimus/sirolimus) in targeting the TSC pathway."
        ],
        commonErrors: [
          "Failing to mention the 'contiguous' nature of the deletion.",
          "Underestimating the speed of progression to ESRD in these patients."
        ]
      },
      {
        id: "ch10-E05",
        type: "LCV",
        difficulty: "DISTINCTION",
        title: "LCV 1 — Evolving Neonatal Mass and Hypertension",
        questionText: `LONG CASE QUESTION 1 — Cystic Renal Disease                      [Total: 35 marks]
Time allowed: ~40 minutes

─── STAGE 1: PRESENTATION ───────────────────────────────
A male infant is delivered at 36 weeks gestation to a 28-year-old G1P0 mother. Antenatal scans at 28 weeks revealed bilaterally enlarged, echogenic kidneys and moderate oligohydramnios. At birth, the infant has immediate respiratory distress, low APGAR scores (3 at 1 min, 5 at 5 mins), and a distended abdomen with large, bilateral, ballotable flank masses.

Q1a. Detail your immediate resuscitation and management steps in the delivery room. [5 marks]
Q1b. List your differential diagnoses for bilateral echogenic kidneys in a newborn. [5 marks]

─── STAGE 2: INVESTIGATION RESULTS ──────────────────────
The infant is intubated, ventilated, and transferred to the NICU. A chest X-ray shows small lung volumes and a small left pneumothorax. A renal ultrasound confirms symmetrical, massive enlargement of both kidneys (lengths > 8 cm, normal is ~4 cm) with diffuse microcysts, loss of corticomedullary junction, and a normal urinary bladder. Blood pressure is 105/65 mmHg (high for a neonate).

Q2a. Interpret these findings and state the most likely diagnosis, including the genetic gene locus. [5 marks]
Q2b. Outline the management of severe neonatal hypertension in this scenario, highlighting the preferred drug class. [5 marks]

─── STAGE 3: MANAGEMENT DECISION ────────────────────────
At 3 weeks of life, the infant is successfully extubated. However, he remains dependent on nasogastric feeds due to vomiting and abdominal distension. Blood tests show: Sodium 131 mmol/L, Potassium 4.8 mmol/L, Urea 12 mmol/L, Creatinine 110 µmol/L (declining from birth but still elevated). The parents are anxious about his long-term kidney function and survival.

Q3a. Discuss the counseling you would provide to the parents regarding the long-term renal and hepatic prognosis. [5 marks]
Q3b. Formulate a long-term multidisciplinary monitoring and follow-up plan for this child. [5 marks]

─── STAGE 4: COMPLICATION / FOLLOW-UP ───────────────────
At age 4, the child is growing along the 10th percentile. He has persistent stage 2 CKD. On routine physical exam, the liver is palpable 4 cm below the costal margin, and the spleen tip is felt. A complete blood count shows: Hemoglobin 102 g/L, Platelets 85 x 10^9/L, WBC 4.2 x 10^9/L.

Q4a. Explain the mechanism behind these hematological findings and outline the management of this new complication. [5 marks]`,
        markingGuide: `FULL MARKING GUIDE WITH MODEL ANSWERS

STAGE 1:
Q1a. [5 marks]
• Endotracheal intubation and mechanical ventilation (high risk of pulmonary hypoplasia). [1]
• Insertion of an orogastric tube to decompress the stomach and minimize abdominal splinting. [1]
• Avoid aggressive high-pressure ventilation to minimize risk of pneumothorax/barotrauma. [1]
• Obtain umbilical arterial and venous access for blood gas monitoring and fluid infusion. [1]
• Urgent chest X-ray to confirm tube placement and check for pneumothorax. [1]

Q1b. [5 marks]
• Autosomal Recessive Polycystic Kidney Disease (ARPKD) — most common cause. [1]
• Neonatal Autosomal Dominant Polycystic Kidney Disease (ADPKD). [1]
• Bilateral Multicystic Dysplastic Kidneys (MCDK) (lethal, but possible). [1]
• Congenital Nephrotic Syndrome (Finnish type) — kidneys can appear large and echogenic. [1]
• Diffuse renal infiltration (e.g., leukemia, congenital tumors) or renal vein thrombosis (usually unilateral/asymmetric). [1]

STAGE 2:
Q2a. [5 marks]
• Interpretation: The symmetrical microcystic enlargement and loss of corticomedullary differentiation on USS, combined with oligohydramnios and pneumothorax, is pathognomonic for ARPKD. [2]
• Diagnosis: Autosomal Recessive Polycystic Kidney Disease (ARPKD). [1]
• Gene locus: PKHD1 gene on chromosome 6p21.1-p12. [2]

Q2b. [5 marks]
• Diagnosis: Hypertensive urgency/crisis in a neonate. [1]
• Preferred drug class: Angiotensin-Converting Enzyme (ACE) Inhibitors (e.g., IV Enalaprilat, oral Enalapril) or Angiotensin Receptor Blockers (ARBs). [1]
• Rationale: ARPKD is associated with hyperactivation of the renin-angiotensin-aldosterone system (RAAS) due to cystic compression of renal vasculature causing ischemia. [1]
• Monitoring: Carefully monitor serum creatinine and potassium, as acute decline in GFR can occur. [1]
• Secondary line: Calcium channel blockers (e.g., Amlodipine) or vasodilators if ACE inhibitors are contraindicated or insufficient. [1]

STAGE 3:
Q3a. [5 marks]
• Renal survival: High early neonatal mortality (~20-30% due to pulmonary complications). If the child survives the first month, 10-year survival is >80%. [1]
• Progressive renal failure: Gradual decline in GFR; about 50% will require renal replacement therapy (dialysis or transplantation) by age 10-15. [1]
• Hepatic prognosis: Portal hypertension and liver fibrosis are progressive. While liver function (synthetic function) remains normal, portal hypertension leads to splenomegaly and varices. [1]
• Parental screening: Suggest performing renal ultrasounds on parents to exclude adult-onset ADPKD in the child. [1]
• Genetic recurrence: Advise that ARPKD is recessive with a 25% recurrence risk in future pregnancies. [1]

Q3b. [5 marks]
• Pediatric Nephrology: Monitor kidney function, blood pressure, electrolytes, and growth. [1]
• Pediatric Gastroenterology/Hepatology: Monitor liver function tests, spleen size, and perform surveillance endoscopies. [1]
• Nutritionist: Formulate high-calorie enteral feeds to treat growth failure and manage CKD diet. [1]
• Genetics: For parental carrier testing and prenatal counseling. [1]
• Care coordination: Transition planning to pediatric/adult care and psychosocial support for families. [1]

STAGE 4:
Q4a. [5 marks]
• Mechanism: Thrombocytopenia and anemia are due to hypersplenism secondary to portal hypertension. Portal vein congestion from hepatic fibrosis causes splenomegaly, leading to sequestration of platelets and red blood cells. [2]
• Management:
  - Doppler ultrasound of the portal system to assess flow and spleen size. [1]
  - Surveillance upper endoscopy (EGD) to screen for esophageal varices. [1]
  - Beta-blockers (e.g., Propranolol) for primary prophylaxis of variceal bleeding, or endoscopic band ligation. [1]
  - Avoid splenectomy if possible due to post-splenectomy sepsis risk; reserve for extreme thrombocytopenia or symptomatic splenomegaly. [1]

MODEL ANSWER:
Resuscitation of a neonate with suspected ARPKD involves immediate intubation to manage pulmonary hypoplasia, avoiding high pressure to prevent pneumothorax, and inserting an OG tube for gastric decompression. The diagnostic findings point to ARPKD (PKHD1 gene, chromosome 6). Hypertension is driven by RAAS activation and is managed with ACE inhibitors. If the child survives the neonatal period, long-term survival is good (~80% at 10 years), though progressive CKD and portal hypertension are expected. Hepatosplenomegaly and cytopenias reflect hypersplenism from portal congestion; this requires endoscopic screening for esophageal varices and beta-blocker prophylaxis.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Outlining the respiratory resuscitation strategy that avoids barotrauma (low tidal volume ventilation).
• Citing the exact chromosome location of PKHD1 (6p21).
• Recognizing that hypersplenism (splenic sequestration) causes thrombocytopenia/anemia, and identifying variceal bleeding as the major liver-related mortality risk.`,
        discriminators: [
          "Detailing low-volume ventilation strategies to prevent pneumothorax in pulmonary hypoplasia.",
          "Explaining the RAAS-driven mechanism of hypertension in ARPKD.",
          "Emphasizing that synthetic liver function (INR, Albumin) remains normal in congenital hepatic fibrosis, despite severe portal hypertension and cytopenias."
        ],
        commonErrors: [
          "Performing a liver biopsy immediately to diagnose portal hypertension (non-invasive ultrasound and endoscopy are preferred).",
          "Confusing thrombocytopenia with bone marrow suppression rather than splenic sequestration."
        ]
      },
      {
        id: "ch10-E06",
        type: "EMQ",
        difficulty: "BOARD",
        title: "EMQ 1 — Diagnosis of Cystic Renal Diseases",
        questionText: `EMQ 1 — Theme: Diagnosis of Cystic Renal Diseases

OPTIONS (each option may be used once, more than once, or not at all):
A. Autosomal Recessive Polycystic Kidney Disease (ARPKD)
B. Autosomal Dominant Polycystic Kidney Disease (ADPKD)
C. Multicystic Dysplastic Kidney (MCDK)
D. Nephronophthisis (NPHP)
E. Medullary Sponge Kidney (MSK)
F. Simple Renal Cyst
G. Tuberous Sclerosis Complex (TSC)
H. Glomerulocystic Kidney Disease (GCKD)
I. Von Hippel-Lindau Disease (VHL)
J. Bardet-Biedl Syndrome

For each of the following clinical scenarios, select the single most appropriate option from the list above:

1. A 3-year-old child presents with developmental delay, polydactyly, retinitis pigmentosa, obesity, and small kidneys with multiple cortical and medullary cysts on ultrasound.
2. A 2-month-old infant is found on ultrasound to have multiple non-communicating cysts of varying sizes in the left flank, with no visible normal renal parenchyma or renal pelvis. The contralateral kidney is normal.
3. An 8-year-old boy presents with hematuria and flank pain. Renal ultrasound shows nephrocalcinosis and cystic dilatation of the collecting ducts (giving a "brush-like" appearance on intravenous urography).
4. A 12-year-old girl with mild chronic kidney disease is evaluated for progressive polyuria and anemia. Ultrasound shows small, echogenic kidneys with multiple small cysts at the corticomedullary junction.
5. A 6-month-old infant with infantile spasms is found to have massive bilateral renal enlargement and multiple cysts. Genetic testing reveals a deletion on chromosome 16p13.3.`,
        markingGuide: `ANSWERS & RATIONALE:
1. J [Bardet-Biedl Syndrome] — This is a classic ciliopathy characterized by obesity, polydactyly, retinitis pigmentosa, learning difficulties, and renal cysts/dysplasia. ARPKD (A) would show early severe hypertension and congenital hepatic fibrosis without skeletal/dermatological anomalies.
2. C [Multicystic Dysplastic Kidney (MCDK)] — The classic unilateral presentation of multiple non-communicating cysts with absent renal pelvis and normal contralateral kidney is pathognomonic for MCDK. Severe hydronephrosis (which is a common wrong answer) would show communicating cysts converging on a central dilated pelvis.
3. E [Medullary Sponge Kidney (MSK)] — MSK is characterized by ectasia of the collecting ducts, predisposing to nephrocalcinosis and calculi. The "brush-like" appearance on contrast imaging is diagnostic. MSK is usually benign and rarely causes CKD, unlike nephronophthisis (D).
4. D [Nephronophthisis (NPHP)] — Polyuria, anemia out of proportion to CKD stage, and small echogenic kidneys with corticomedullary junction cysts in a child of this age are classic for juvenile NPHP. Autosomal dominant MCKD presents similarly but in older adults.
5. G [Tuberous Sclerosis Complex (TSC)] — The combination of infantile spasms (neurologic) and bilateral cystic disease is caused by the contiguous deletion of the TSC2 and PKD1 genes on chromosome 16p. Simple ADPKD (B) does not present with seizures or infantile spasms.`,
        discriminators: [
          "Correctly linking the ciliopathy phenotype (polydactyly, retinitis pigmentosa) to Bardet-Biedl syndrome.",
          "Distinguishing Medullary Sponge Kidney from other cystic diseases by its classic 'brush-like' urography appearance and nephrocalcinosis."
        ],
        commonErrors: [
          "Selecting ADPKD for the TSC2/PKD1 deletion due to the presence of PKD1.",
          "Confusing MCDK with severe hydronephrosis on ultrasound."
        ]
      }
    ]
  },
  {
    chapterNumber: 11,
    chapterSlug: "ch11_urinary-tract-calculi",
    chapterTitle: "Urinary Tract Calculi",
    questions: [
      {
        id: "ch11-E01",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 1 — Pediatric Metabolic Stone Workup",
        questionText: `QUESTION 1 — Metabolic Evaluation in Pediatric Urolithiasis        [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A 5-year-old girl is diagnosed with a 6 mm stone in the left renal pelvis after presenting with hematuria and abdominal pain. Her family history is negative for nephrolithiasis.

(a) Justify why every child with a documented urinary tract stone requires a complete metabolic evaluation, and outline the initial screening tests. [5 marks]
(b) Describe the protocol for a 24-hour urine collection in a young child, including the substances that must be measured. [5 marks]
(c) Explain how you would interpret the urine calcium-to-creatinine ratio in a child, and state the age-specific cut-off values. [5 marks]
(d) Outline the dietary and medical management for a child diagnosed with idiopathic hypercalciuria. [5 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Rationale: Unlike adults, over 50–70% of children with urolithiasis have an underlying metabolic abnormality. [1]
• High recurrence rate: Identifying the metabolic defect allows targeted therapy to prevent recurrence. [1]
• Initial blood screening tests: Serum electrolytes, calcium, phosphate, uric acid, creatinine, bicarbonate, and PTH. [1]
• Urinalysis and culture: Check pH (cystine/uric acid stones form in acid urine; struvite in alkaline), inspect for crystals, and rule out UTI. [1]
• Stone analysis: Infrared spectroscopy of any passed stone (gold standard). [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Protocol: Collect all urine over 24 hours, starting after the first void of day 1 (discarded) and including the first void of day 2. [1]
• Pediatric challenge: Use bag collection or bladder catheterization in non-toilet trained children if essential, otherwise encourage timed voids. [1]
• Measured solutes: Calcium, Oxalate, Uric acid, Citrate, Cystine, Sodium, Potassium. [1]
• Creatinine measurement: Used to verify completeness of the 24-hour collection (expected 15-20 mg/kg/day). [1]
• Urine volume: High urine volume is key; low output is a risk factor. [1]

(c) [5 marks] — Award 1 mark per point.
Expected answers:
• Rationale: Spot urine calcium/creatinine ratio is a useful screening tool when 24-hour collection is impractical. [1]
• Interpretation: Hypercalciuria is defined as ratio > cut-off. [1]
• Age < 6 months: cut-off is > 0.8 (or >0.6 depending on guideline). [1]
• Age 6–12 months: cut-off is > 0.6. [1]
• Age > 2 years: cut-off is > 0.2 (or >0.21 mg/mg). [1]

(d) [5 marks] — Award 1 mark per point.
Expected answers:
• Hydration: Increase fluid intake to achieve urine output > 1.5–2 L/m²/day. [1]
• Dietary sodium restriction: High sodium intake increases renal calcium excretion (competes in proximal tubule). [1]
• Normal calcium intake: Avoid calcium restriction as it increases oxalate absorption (risk of calcium oxalate stones) and affects bone mineralization. [1]
• Citrate supplementation: Potassium citrate alkalinizes urine and inhibits calcium crystallization. [1]
• Thiazide diuretics: (e.g., Hydrochlorothiazide) increases distal tubule calcium reabsorption, reducing urine calcium. Reserved for dietary failures. [1]

MODEL ANSWER:
Every child with urolithiasis needs a metabolic workup because up to 70% have an underlying biochemical cause. Evaluation includes serum chemistries, spot urine calcium-to-creatinine ratio (hypercalciuria is >0.2 in children >2 years), and 24-hour urine collection (measuring calcium, oxalate, citrate, cystine, uric acid). Management of idiopathic hypercalciuria involves maintaining high fluid intake, restricting sodium, avoiding calcium restriction (which increases oxalate absorption), and using thiazide diuretics in refractory cases.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Emphasizing that calcium restriction is contraindicated in children due to bone growth requirements and the risk of hyperoxaluria.
• Citing the exact age-dependent cut-offs for spot urine calcium/creatinine ratios.
• Noting that 24-hour urine creatinine must be calculated (15-20 mg/kg) to verify that the collection is complete.`,
        discriminators: [
          "Explicitly warning against dietary calcium restriction in growing children.",
          "Providing the correct age-specific cut-offs for calcium-to-creatinine ratio.",
          "Using 24-hour urine creatinine excretion to confirm completeness of collection."
        ],
        commonErrors: [
          "Recommending low-calcium diets for children with hypercalciuria.",
          "Failing to check PTH levels to rule out primary hyperparathyroidism."
        ]
      },
      {
        id: "ch11-E02",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 2 — Surgical Management of Ureteral Calculi",
        questionText: `QUESTION 2 — Surgical Management of Ureteral Calculi              [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A 4-year-old boy presents with acute right flank pain and vomiting. An ultrasound shows a 9 mm stone lodged in the mid-ureter with moderate hydroureteronephrosis. Urinalysis is negative for leukocytes and nitrites.

(a) Discuss your indications for active intervention vs. conservative management (medical expulsive therapy) in this child. [5 marks]
(b) Compare the roles, success rates, and limitations of Extracorporeal Shockwave Lithotripsy (ESWL) and Ureteroscopy (URS) for this stone. [5 marks]
(c) Outline the steps of a rigid ureteroscopy in this child, including patient positioning, safety measures, and stone fragmentation. [6 marks]
(d) State the common complications of ureteroscopy and how to avoid them. [4 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Conservative management indications: Stone size < 5 mm has a high chance (>80%) of spontaneous passage. [1]
• Medical Expulsive Therapy (MET): Off-label use of alpha-blockers (e.g., Tamsulosin) can be considered if pain is controlled and there is no infection. [1]
• Indications for active intervention: Stone size > 6 mm (low passage rate), intractable pain, persistent vomiting, solitary kidney, or clinical signs of infection. [1]
• The patient's stone is 9 mm: high likelihood of failure of conservative management, warranting active intervention. [1]
• Urgent intervention criteria: Obstructing stone with fever/leukocytosis (requires urgent decompression with JJ stent or nephrostomy). [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• ESWL success: ~70–80% for mid-ureteric stones. Non-invasive, but requires general anesthesia in a 4-year-old. [1]
• ESWL limitations: Lower stone-free rate for hard stones (e.g., calcium oxalate monohydrate, cystine) and risk of steinstrasse. [1]
• URS success: >90% stone-free rate in a single setting. [1]
• URS limitations: Invasive, requires specialized pediatric instruments (6F-7.5F ureteroscopes), and carry risk of ureteral injury. [1]
• Clinical choice: Mid-ureteral 9 mm stone is ideally suited for URS, which offers the highest single-procedure success. [1]

(c) [6 marks] — Award 1 mark per point.
Expected answers:
• Positioning: Lithotomy position under general anesthesia. [1]
• Cystoscopy and Guidewire: Pass a cystoscope, identify the right ureteric orifice, and advance a safety guidewire into the renal pelvis under fluoroscopy. [1]
• Scope insertion: Introduce a pediatric semi-rigid ureteroscope (6F/7.5F) over a working wire alongside the safety wire. [1]
• Dilation: Avoid forceful dilation of the orifice; if narrow, place a temporary double-J stent and return in 2 weeks (passive dilation). [1]
• Fragmentation: Use a Holmium:YAG laser fiber (200 micron) to dust or fragment the stone. [1]
• Extraction: Use a nitinol stone basket to extract larger fragments, leaving a double-J stent to prevent postoperative colic. [1]

(d) [4 marks] — Award 1 mark per point.
Expected answers:
• Ureteral perforation/avulsion: Avoided by keeping a safety guidewire in place and never advancing the scope without clear vision. [1]
• Ureteral stricture: Avoided by minimizing scope size, avoiding thermal injury from the laser (proper irrigation), and limiting operating time. [1]
• Vesicoureteral reflux (VUR): Avoided by avoiding active dilation of the ureterovesical junction. [1]
• Postoperative sepsis: Avoided by administering perioperative antibiotics, maintaining low-pressure irrigation, and stenting. [1]

MODEL ANSWER:
A 9 mm mid-ureteral stone in a 4-year-old is unlikely to pass spontaneously and warrants intervention. Semi-rigid URS offers a >90% success rate, superior to ESWL. Under general anesthesia in the lithotomy position, a safety wire is advanced. A pediatric ureteroscope is introduced. Fragmentation is performed using a Holmium:YAG laser. To prevent complications like perforation or stricture, active dilation is avoided, safety wires are maintained, and a post-procedure double-J stent is left in place.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Outlining the concept of passive dilation: stenting and returning in 2 weeks if the ureterovesical junction is too narrow for the scope, rather than balloon dilating.
• Specifying the importance of maintaining a safety guidewire throughout the entire URS procedure.
• Discussing the risk of thermal injury to the ureter from the laser and the need for continuous irrigation.`,
        discriminators: [
          "Recommending passive dilation (stenting and returning 2 weeks later) if the ureteric orifice is narrow.",
          "Emphasizing the role of the safety guidewire to maintain access to the kidney.",
          "Discussing the use of low-pressure irrigation to prevent pyelorenal backflow and sepsis."
        ],
        commonErrors: [
          "Attempting to force a large adult ureteroscope into a child's ureter.",
          "Neglecting to place a safety wire, risking loss of access during perforation."
        ]
      },
      {
        id: "ch11-E03",
        type: "SAQ",
        difficulty: "FOUNDATION",
        title: "SAQ 1 — Cystinuria Diagnosis and Management",
        questionText: `SAQ 1 — Cystinuria in Children                                   [8 marks]

A 6-year-old boy presents with recurrent urinary tract stones. Stone analysis reveals a cystine composition.

(a) Describe the genetic defect and inheritance pattern of cystinuria. [3 marks]
(b) Outline the diagnostic tests used to identify cystine in the urine. [2 marks]
(c) List three medical management strategies to prevent cystine stone recurrence. [3 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Genetic defect: Mutation in SLC3A1 (chromosome 2) or SLC7A9 (chromosome 19) genes. [1]
• Affects the basic amino acid transporter in the proximal renal tubule and small intestine. [1]
• Inheritance pattern: Autosomal recessive (most common, though some SLC7A9 heterozygotes show mild hypercystinuria). [1]

(b) [2 marks] — Award 1 mark per point:
• Sodium cyanide-nitroprusside screening test (turns urine purple/magenta in the presence of cystine). [1]
• Microscopic examination of urine sediment showing pathognomonic hexagonal cystine crystals. [1]
• Quantitative 24-hour urine amino acid chromatography (shows elevated cystine, lysine, ornithine, arginine - COLA). [1]
(max 2)

(c) [3 marks] — Award 1 mark per point:
• Aggressive hydration: fluid intake to maintain high urine volume (typically > 3 L/day or 1.5-2 L/m²/day, including waking up at night to drink). [1]
• Urine alkalinization: maintain urine pH > 7.5 using potassium citrate (increases cystine solubility). [1]
• Thiol-binding drugs: (e.g., Tiopronin/alpha-mercaptopropionylglycine or D-penicillamine) which form a soluble disulfide complex with cystine. [1]
• Dietary sodium and protein restriction: reduces cystine excretion. [1]

COMMON ERRORS SEEN IN EXAMS:
• Recommending urine acidification (cystine is less soluble in acid; alkalinization to pH >7.5 is crucial).
• Recommending standard stone hydration without specifying that the child must wake up during the night to maintain dilute urine.`,
        discriminators: [
          "Identifying the COLA amino acids (Cystine, Ornithine, Lysine, Arginine).",
          "Explaining that tiopronin acts by converting cystine to a more soluble drug-cysteine complex."
        ],
        commonErrors: [
          "Suggesting urine acidification instead of alkalinization.",
          "Failing to specify the goal urine pH (>7.5)."
        ]
      },
      {
        id: "ch11-E04",
        type: "SAQ",
        difficulty: "BOARD",
        title: "SAQ 2 — Diagnostic Evaluation of Hypercalciuria",
        questionText: `SAQ 2 — Hypercalciuria Diagnostic Evaluation                     [10 marks]

A 3-year-old child presents with microscopic hematuria and dysuria. An ultrasound shows medullary nephrocalcinosis but no discrete stones.

(a) Define hypercalciuria based on a 24-hour urine collection. [2 marks]
(b) Differentiate between absorptive and renal hypercalciuria using the calcium loading test. [4 marks]
(c) Explain the clinical association between hypercalciuria, hematuria, and nephrocalcinosis. [4 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [2 marks]
• Urinary calcium excretion > 4 mg/kg/24 hours (on a regular diet). [2]

(b) [4 marks] — Award 1 mark per point:
• Absorptive hypercalciuria: characterized by increased intestinal calcium absorption. [1]
• Fasting urine calcium is normal, but calcium loading causes a significant rise in urinary calcium. [1]
• Renal hypercalciuria: characterized by a primary renal tubule defect in calcium reabsorption. [1]
• Fasting urine calcium remains elevated despite calcium restriction or during fasting. [1]

(c) [4 marks] — Award 1 mark per point:
• Hematuria: micro-crystals of calcium oxalate/phosphate cause mechanical trauma to the renal tubular cells and urothelium. [2]
• Nephrocalcinosis: deposition of calcium crystals (typically calcium phosphate) within the renal parenchyma/medullary pyramids. [1]
• Pathophysiology: high calcium concentration exceeds solubility in the medullary collecting ducts, leading to interstitial deposition (Randall's plaques). [1]

COMMON ERRORS SEEN IN EXAMS:
• Diagnosing hypercalciuria on a single spot urine calcium/creatinine ratio without verifying with a 24-hour collection (spot is a screen, 24-hour is definitive).
• Failing to realize that hematuria can occur in hypercalciuria even in the absence of radiographically visible stones.`,
        discriminators: [
          "Explaining the pathophysiology of micro-crystal trauma leading to hematuria.",
          "Stating the specific threshold value of >4 mg/kg/day."
        ],
        commonErrors: [
          "Relying solely on spot ratio for diagnosis without confirming with 24h collection.",
          "Confusing medullary nephrocalcinosis with nephrolithiasis."
        ]
      },
      {
        id: "ch11-E05",
        type: "LCV",
        difficulty: "DISTINCTION",
        title: "LCV 1 — Evolving Pediatric Urolithiasis",
        questionText: `LONG CASE QUESTION 1 — Pediatric Urolithiasis                     [Total: 35 marks]
Time allowed: ~40 minutes

─── STAGE 1: PRESENTATION ───────────────────────────────
A 7-year-old boy presents to the emergency department with a 12-hour history of severe, colicky left-sided abdominal and flank pain, accompanied by nausea and non-bilious vomiting. He has no fever. On examination, he is in distress and has left costovertebral angle tenderness.

Q1a. Formulate your initial diagnostic approach, including the preferred imaging modality. [5 marks]
Q1b. Outline your immediate medical management plan to address his symptoms. [5 marks]

─── STAGE 2: INVESTIGATION RESULTS ──────────────────────
A renal ultrasound reveals an 8 mm echogenic shadow-casting focus in the left proximal ureter, causing moderate hydroureteronephrosis. The right kidney and bladder are normal. Urinalysis shows 50 RBCs/hpf and is negative for nitrites and leukocytes. Serum creatinine is 55 µmol/L (normal for age).

Q2a. Evaluate the likelihood of spontaneous passage for this stone and discuss your options for surgical intervention. [5 marks]
Q2b. The patient undergoes left semi-rigid ureteroscopy. During the procedure, the ureteric orifice is found to be too narrow to allow the 7.5F scope to pass safely. State your intraoperative plan. [5 marks]

─── STAGE 3: MANAGEMENT DECISION ────────────────────────
A double-J stent is placed, and the patient returns 2 weeks later. Ureteroscopy is now successful. The stone is fragmented with a Holmium laser, and fragments are basketed. A postoperative stent is placed and removed 1 week later. Analysis of the stone reveals it is composed of 100% Calcium Oxalate Monohydrate. A 24-hour urine collection shows: Volume 1.2 L, Calcium 3.5 mg/kg/day (normal <4), Citrate 150 mg/g creatinine (low, normal >400), Oxalate 95 mg/1.73m²/day (elevated, normal <45).

Q3a. Interpret this metabolic profile and identify the most likely metabolic diagnosis. [5 marks]
Q3b. Formulate a medical and dietary management strategy based on these findings. [5 marks]

─── STAGE 4: COMPLICATION / FOLLOW-UP ───────────────────
Six months post-procedure, the child returns with recurrent left loin discomfort. A renal ultrasound shows persistent moderate left hydronephrosis. A MAG3 renogram demonstrates a differential function of 42% on the left with an obstructed drainage curve that does not clear with furosemide. A retrograde pyelogram reveals a 5 mm narrowing in the proximal ureter at the site of the previous stone impaction.

Q4a. Identify this late complication, explain its etiology, and discuss the surgical management options. [5 marks]`,
        markingGuide: `FULL MARKING GUIDE WITH MODEL ANSWERS

STAGE 1:
Q1a. [5 marks]
• History: ask about family history of stones, dietary habits, and history of UTIs. [1]
• Physical exam: check for signs of peritonitis, fluid status, and temperature. [1]
• Preferred imaging: Renal ultrasound is the initial study of choice in children to avoid ionizing radiation. [2]
• Alternative imaging: Low-dose non-contrast CT abdomen/pelvis (NCCT) is the gold standard for stone detection and is indicated if ultrasound is inconclusive. [1]

Q1b. [5 marks]
• Analgesia: Intravenous Non-Steroidal Anti-Inflammatory Drugs (NSAIDs, e.g., Ketorolac) are first-line as they reduce ureteral spasm. [2]
• Opioids: (e.g., Morphine) if NSAIDs are insufficient or contraindicated. [1]
• Intravenous fluids: Hydrate at maintenance rate (avoid over-hydration as it can worsen pain by increasing renal pelvic pressure). [1]
• Antiemetics: (e.g., Ondansetron) to control vomiting and allow oral intake. [1]

STAGE 2:
Q2a. [5 marks]
• Spontaneous passage: An 8 mm proximal ureteric stone in a 7-year-old has a low chance (<20%) of passing spontaneously. Active intervention is required. [2]
• Surgical options:
  - Ureteroscopy (URS) with laser lithotripsy (preferred). [1]
  - Extracorporeal Shockwave Lithotripsy (ESWL) (reasonable alternative but lower stone-free rate for proximal stones). [1]
  - Percutaneous Nephrolithotripsy (PCNL) is not indicated for a standard 8 mm ureteric stone. [1]

Q2b. [5 marks]
• Step 1: Do not force the scope (risks ureteral tear, avulsion, or stricture). [1]
• Step 2: Place a safety guidewire under fluoroscopic guidance. [1]
• Step 3: Insert a 4.7F or 5F Double-J stent into the ureter. [2]
• Step 4: Abort the procedure and schedule a repeat ureteroscopy in 10-14 days. The stent will perform 'passive dilation' of the ureter. [1]

STAGE 3:
Q3a. [5 marks]
• Metabolic profile: Normal calcium, low citrate (hypocitraturia), and severely elevated oxalate (hyperoxaluria). [2]
• Diagnosis: Primary Hyperoxaluria (PH) (likely Type 1 due to severity, caused by AGXT gene mutation) or Secondary (enteric) Hyperoxaluria. [2]
• Interpretation: Citrate is an inhibitor of calcium crystallization; low levels combined with high oxalate drive calcium oxalate monohydrate stone formation. [1]

Q3b. [5 marks]
• High fluid intake: Maintain urine output > 2 L/day (requires drinking overnight). [1]
• Pyridoxine (Vitamin B6) trial: cofactor for AGXT; reduces oxalate production in ~30% of PH Type 1 patients. [1]
• Alkalinization: Potassium citrate to increase urine pH and provide citrate (crystallization inhibitor). [1]
• Dietary changes: Restrict high-oxalate foods (spinach, chocolate, nuts) if enteric, though less effective in primary hyperoxaluria. [1]
• Novel therapies: (For PH1) Lumasiran (RNA interference agent that targets glycolate oxidase, reducing oxalate levels). [1]

STAGE 4:
Q4a. [5 marks]
• Complication: Left ureteric stricture. [1]
• Etiology: Ischemic injury to the ureteric wall from chronic stone impaction, or mechanical/thermal trauma during ureteroscopy/laser fragmentation. [2]
• Management options:
  - Endoscopic: Ureteric balloon dilation or endoureterotomy (lower success, ~50-60%). [1]
  - Surgical: Ureteroureterostomy (excision of stricture and primary anastomosis) or ureteric reimplantation if distal (robotic or open). [1]

MODEL ANSWER:
A 7-year-old with a symptomatic 8 mm proximal ureteric stone requires analgesia with NSAIDs, antiemetics, and a renal ultrasound. Spontaneous passage is unlikely. If ureteroscopy access is narrow, a DJ stent is placed for passive dilation. The metabolic profile showing hyperoxaluria and hypocitraturia suggest Primary Hyperoxaluria, managed with high fluid volume, potassium citrate, pyridoxine, and potentially lumasiran. The late presentation of hydronephrosis and obstruction indicates a ureteric stricture, requiring balloon dilation or ureteroureterostomy.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Recognizing that NSAIDs are superior to opioids for renal colic because they directly inhibit prostaglandin-mediated ureteral contraction.
• Correctly diagnosing Primary Hyperoxaluria from the metabolic values and highlighting pyridoxine and lumasiran as specific therapies.
• Explaining the pathophysiology of ureteric stricture post-impaction (ischemia from stone pressure vs. laser thermal injury).`,
        discriminators: [
          "Explaining that NSAIDs reduce renal pelvic pressure by decreasing GFR and relaxing ureteric smooth muscle.",
          "Identifying Primary Hyperoxaluria Type 1 and mentioning advanced therapies like Lumasiran.",
          "Distinguishing between ischemic stricture from stone impaction versus procedural stricture from laser thermal injury."
        ],
        commonErrors: [
          "Attempting balloon dilation of the ureterovesical junction acutely to force the scope in.",
          "Over-hydrating the patient during acute colic, which increases back-pressure and exacerbates pain."
        ]
      },
      {
        id: "ch11-E06",
        type: "EMQ",
        difficulty: "BOARD",
        title: "EMQ 1 — Pediatric Urolithiasis Options",
        questionText: `EMQ 1 — Theme: Pediatric Urolithiasis Options

OPTIONS (each option may be used once, more than once, or not at all):
A. Calcium Oxalate Monohydrate
B. Calcium Oxalate Dihydrate
C. Calcium Phosphate (Apatite)
D. Magnesium Ammonium Phosphate (Struvite)
E. Uric Acid
F. Cystine
G. Xanthine
H. Ammonium Acid Urate
I. Matrix Stone
J. Silica Stone

For each of the following clinical scenarios, select the single most appropriate option from the list above:

1. A 12-year-old girl with a history of myelomeningocele and a reconstructed bladder presents with a large staghorn calculus. Urine culture grows Proteus mirabilis.
2. A 3-year-old child on a ketogenic diet for intractable epilepsy presents with hematuria and multiple radiolucent stones in the bladder.
3. A 6-month-old infant with distal renal tubular acidosis (RTA) presents with bilateral nephrocalcinosis and alkaline urine (pH 7.8).
4. A 9-year-old child with a history of recurrent stones passes a stone that is yellow-brown, hard, and shows hexagonal crystals on urine microscopy.
5. A 5-year-old boy with severe malabsorption due to short bowel syndrome presents with multiple radio-opaque left renal stones.`,
        markingGuide: `ANSWERS & RATIONALE:
1. D [Magnesium Ammonium Phosphate (Struvite)] — Proteus is a urea-splitting organism that produces urease, converting urea to ammonia and raising urine pH. This drives the precipitation of struvite (triple phosphate) stones, common in neurogenic/reconstructed bladders.
2. E [Uric Acid] — Ketogenic diets cause systemic acidosis, leading to low urine pH. In highly acidic urine, uric acid (which is radiolucent) becomes insoluble and precipitates.
3. C [Calcium Phosphate (Apatite)] — Distal RTA (Type 1) is characterized by an inability to acidify urine, systemic acidosis, and hypercalciuria. The alkaline urine pH (>6.0) promotes calcium phosphate precipitation, causing nephrocalcinosis.
4. F [Cystine] — Hexagonal crystals are pathognomonic for cystine. Cystine stones are faint radio-opaque (due to sulfur content) and yellow-brown/ground-glass in appearance.
5. A [Calcium Oxalate Monohydrate] — Short bowel syndrome leads to malabsorption of fat. Intraluminal fat binds calcium, leaving oxalate free to be absorbed in the colon (enteric hyperoxaluria), leading to calcium oxalate monohydrate stones.`,
        discriminators: [
          "Linking Proteus infection in a reconstructed bladder to Struvite stones.",
          "Recognizing the metabolic mechanism of enteric hyperoxaluria in short bowel syndrome leading to Calcium Oxalate Monohydrate."
        ],
        commonErrors: [
          "Selecting Uric Acid for the RTA patient (RTA causes Calcium Phosphate stones due to high urine pH).",
          "Confusing Uric Acid (radiolucent) with Cystine (semi-opaque) stones."
        ]
      }
    ]
  },
  {
    chapterNumber: 12,
    chapterSlug: "ch12_urinary-incontinence",
    chapterTitle: "Urinary Incontinence",
    questions: [
      {
        id: "ch12-E01",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 1 — Dysfunctional Voiding vs Overactive Bladder",
        questionText: `QUESTION 1 — Pediatric Incontinence and Dysfunctional Voiding   [Total: 22 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
An 8-year-old girl is brought to the clinic by her mother due to daytime wetting and urinary urgency. She has suffered from three culture-confirmed urinary tract infections over the past 2 years. Her bowel movements occur every 3-4 days and are hard.

(a) Differentiate between the clinical presentations of Dysfunctional Voiding (DV) and Overactive Bladder (OAB) in children. [6 marks]
(b) Describe the role of uroflowmetry and post-void residual (PVR) measurements in distinguishing these two conditions. [6 marks]
(c) Outline the initial conservative management (standard urotherapy) for this child, incorporating bowel management. [6 marks]
(d) State the indications for, and common side effects of, anticholinergic medications in the treatment of OAB. [4 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [6 marks] — Award 1 mark per point.
Expected answers:
• Overactive Bladder (OAB) is characterized by urinary urgency, frequency, and urge incontinence. [1]
• OAB patients often use holding maneuvers (e.g., Vincent's curtsy — squatting with heel pressed against the perineum) to abort detrusor contractions. [1]
• Dysfunctional Voiding (DV) is characterized by habitual contraction of the external urethral sphincter during voiding. [1]
• DV presentation includes hesitancy, straining, a weak/interrupted stream, and a feeling of incomplete emptying. [1]
• UTI risk: both increase risk, but DV has a stronger association with recurrent UTIs and vesicoureteral reflux due to high voiding pressures. [1]
• Constipation (BBD — Bladder Bowel Dysfunction) is commonly associated with both, but muscle dyssynergia in DV is strongly linked to pelvic floor hypertonicity. [1]

(b) [6 marks] — Award 1 mark per point.
Expected answers:
• Uroflowmetry in OAB: typically shows a normal, bell-shaped curve, or a rapid, high-amplitude "tower" flow curve. [2]
• Uroflowmetry in DV: shows a "staccato" flow curve (fluctuating flow rate due to intermittent external sphincter contractions) or an interrupted curve. [2]
• Post-void residual (PVR): OAB patients usually have minimal or no residual urine. [1]
• PVR in DV: typically elevated due to incomplete emptying from bladder-sphincter dyssynergia. [1]

(c) [6 marks] — Award 1 mark per point.
Expected answers:
• Timed voiding: voiding on a schedule (every 2-3 hours) rather than waiting for urgency. [1]
• Proper posture: feet supported on a stool, knees apart to relax the pelvic floor. [1]
• Adequate hydration: drink water evenly throughout the day (avoid caffeine/carbonated drinks which irritate the detrusor). [1]
• Bowel bowel dysfunction (BBD) management: treat constipation aggressively with laxatives (e.g., Polyethylene glycol) to achieve soft daily stools. [2]
• Rationale for bowel treatment: rectosigmoid distension mechanically compresses the bladder and alters detrusor reflexes. [1]

(d) [4 marks] — Award 1 mark per point.
Expected answers:
• Indications: Urge incontinence/OAB refractory to standard urotherapy. [1]
• Medications: Oxybutynin (antimuscarinic) is first-line; Solifenacin or Mirabegron (beta-3 agonist) are alternatives. [1]
• Side effects: Dry mouth, constipation (which can worsen BBD), blurred vision, flushing, and heat intolerance. [1]
• Central side effects: Cognitive changes or behavior issues (especially with oxybutynin, which crosses the blood-brain barrier). [1]

MODEL ANSWER:
In children, OAB presents with urgency, frequency, and holding maneuvers (Vincent's curtsy) with a tower-shaped uroflow curve and low residual. Dysfunctional voiding involves sphincter contraction during voiding, leading to hesitancy, straining, a staccato flow curve, and high PVR. Initial management is standard urotherapy (timed voiding, proper posture, hydration) and bowel management to treat constipation (BBD). Anticholinergics (e.g., oxybutynin) are indicated for refractory OAB, but side effects include dry mouth, constipation, and cognitive changes.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Correctly describing the flow curves: "tower" for OAB/detrusor overactivity and "staccato" for dysfunctional voiding.
• Emphasizing that treating constipation is the single most important first step in managing bladder dysfunction (the Bladder-Bowel Dysfunction construct).
• Noting that anticholinergics can exacerbate constipation, thereby worsening bladder symptoms if bowel management is neglected.`,
        discriminators: [
          "Defining the 'staccato' flow curve in DV and the 'tower' curve in OAB.",
          "Highlighting the physiological link between rectal distension and detrusor overactivity (BBD).",
          "Warning that anticholinergic therapy can worsen constipation, paradoxically exacerbating bladder dysfunction."
        ],
        commonErrors: [
          "Prescribing anticholinergics to a child with dysfunctional voiding and a high PVR (risks urinary retention).",
          "Initiating invasive urodynamics (cystometrogram) before attempting conservative urotherapy."
        ]
      },
      {
        id: "ch12-E02",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 2 — Biofeedback and Refractory Incontinence",
        questionText: `QUESTION 2 — Biofeedback and Refractory Daytime Incontinence    [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A 9-year-old boy presents with refractory daytime urinary incontinence. He has undergone 6 months of structured urotherapy and bowel management without improvement. A pelvic ultrasound shows a normal upper tract and a post-void residual of 70 mL (bladder capacity estimated at 180 mL). Uroflowmetry shows a staccato pattern.

(a) Define "refractory daytime incontinence" in this context and list the investigations required before escalating therapy. [5 marks]
(b) Explain the mechanism and protocol of pelvic floor biofeedback therapy for dysfunctional voiding. [5 marks]
(c) Justify when you would perform a video-urodynamic study (UDS) in a child with refractory daytime wetting. [5 marks]
(d) State the role of Neuromodulation (e.g., transcutaneous parasacral TENS) in pediatric bladder dysfunction. [5 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Refractory daytime incontinence: Failure to achieve dryness after 3-6 months of documented standard urotherapy. [1]
• Rule out compliance issues: verify the family is adhering to timed voiding and bowel regimen. [1]
• Investigations:
  - Repeat renal ultrasound: to rule out upper tract deterioration (hydronephrosis) and check bladder wall thickness. [1]
  - Repeated uroflowmetry with PVR: to confirm persistence of the staccato pattern and high residuals. [1]
  - Urine culture: to rule out chronic low-grade infection. [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Mechanism: Biofeedback uses visual or auditory signals of pelvic floor muscle activity to teach the child how to relax the external sphincter during voiding. [2]
• Protocol: Surface EMG patches are placed on the perineum (pelvic floor) and abdomen. [1]
• Interactive games: The child controls a game on a screen by contracting/relaxing their pelvic floor (e.g., flying a plane over obstacles). [1]
• Goal: Achieve pelvic floor relaxation during voiding, converting a staccato flow to a smooth, bell-shaped flow. [1]

(c) [5 marks] — Award 1 mark per point.
Expected answers:
• Video-UDS is invasive and reserved for refractory cases with:
  - Upper tract changes (hydronephrosis, scarring on DMSA) or recurrent febrile UTIs. [1]
  - Suspicion of neurogenic bladder (occult spinal dysraphism). [1]
  - Failed biofeedback and pelvic floor therapy. [1]
  - Suspicion of anatomic obstruction (e.g., posterior urethral valves, syringocele). [1]
  - Assessment of detrusor-sphincter dyssynergia (DSD) vs. dysfunctional voiding. [1]

(d) [5 marks] — Award 1 mark per point.
Expected answers:
• Neuromodulation: Parasacral transcutaneous electrical nerve stimulation (TENS) or percutaneous tibial nerve stimulation (PTNS). [1]
• Mechanism: Electrical stimulation of the S3 sacral nerve roots modulates bladder afferent pathways, reducing detrusor overactivity. [2]
• Indication: Refractory OAB/urge incontinence. [1]
• Efficacy: ~60-70% improvement rate, non-invasive, well-tolerated by children. [1]

MODEL ANSWER:
Refractory daytime incontinence is defined by failure of 3-6 months of urotherapy. Initial evaluation includes ultrasound, PVR, and uroflow. Biofeedback uses surface EMG electrodes to teach the child pelvic floor relaxation during voiding. Video-UDS is reserved for cases with febrile UTIs, hydronephrosis, or suspected neurogenic etiology. Parasacral TENS is a non-invasive option that modulates sacral afferent nerves to inhibit detrusor overactivity.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Emphasizing that biofeedback is only effective for dysfunctional voiding (external sphincter dyssynergia) and is not indicated for pure overactive bladder.
• Differentiating between the terms "Detrusor Sphincter Dyssynergia" (reserved for neurogenic patients) and "Dysfunctional Voiding" (reserved for non-neurogenic patients).
• Outlining the safety and non-invasive nature of TENS compared to invasive urodynamics.`,
        discriminators: [
          "Distinguishing 'Detrusor Sphincter Dyssynergia' (neurogenic) from 'Dysfunctional Voiding' (non-neurogenic).",
          "Clarifying that biofeedback targets sphincter relaxation during voiding, not detrusor contractions.",
          "Specifying that video-UDS is indicated if there is a suspicion of occult spinal dysraphism."
        ],
        commonErrors: [
          "Ordering urodynamics as a first-line test for daytime wetting.",
          "Using biofeedback for children who do not have coordination/staccato voiding issues."
        ]
      },
      {
        id: "ch12-E03",
        type: "SAQ",
        difficulty: "FOUNDATION",
        title: "SAQ 1 — Primary vs Secondary Enuresis",
        questionText: `SAQ 1 — Nocturnal Enuresis                                      [8 marks]

A 7-year-old boy is brought to the clinic for bedwetting. He has never achieved a period of dryness lasting longer than 2 weeks.

(a) Define "Primary Nocturnal Enuresis" and distinguish it from "Secondary Nocturnal Enuresis". [3 marks]
(b) List three key components of the history that must be obtained. [3 marks]
(c) State two first-line management options for primary nocturnal enuresis. [2 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Primary Nocturnal Enuresis: Bedwetting in a child who has never achieved a period of nighttime dryness lasting at least 6 consecutive months. [2]
• Secondary Nocturnal Enuresis: Bedwetting that recurs after a period of established dryness of at least 6 months. [1]

(b) [3 marks] — Award 1 mark per point:
• Bowel habits: screen for constipation/fecal incontinence (associated with bladder capacity/incontinence). [1]
• Daytime symptoms: check for urgency, frequency, or daytime wetting (monosymptomatic vs. non-monosymptomatic enuresis). [1]
• Sleep history: sleep apnea, snoring, or deep sleep patterns (adenotonsillar hypertrophy can cause enuresis). [1]
• Fluid intake patterns: high fluid intake before bed. [1]
• Developmental/psychological stressors (especially in secondary enuresis). [1]
(max 3)

(c) [2 marks] — Award 1 mark per point:
• Enuresis Alarm: first-line, highest long-term cure rate (~70-80%), requires high family commitment. [1]
• Desmopressin (DDAVP): synthetic vasopressin analog, reduces urine production overnight. High immediate efficacy but high relapse rate on discontinuation. [1]

COMMON ERRORS SEEN IN EXAMS:
• Recommending pharmacotherapy (Desmopressin) without screening for daytime symptoms (if daytime symptoms exist, it is non-monosymptomatic and requires urotherapy first).
• Failing to emphasize that alarm therapy requires several weeks to be effective and requires parent participation.`,
        discriminators: [
          "Differentiating monosymptomatic from non-monosymptomatic enuresis based on daytime symptoms.",
          "Mentioning the association between adenotonsillar hypertrophy/obstructive sleep apnea and nocturnal enuresis."
        ],
        commonErrors: [
          "Prescribing desmopressin without restricting fluid intake (risks hyponatremic seizures).",
          "Initiating alarm therapy in a child who is not motivated."
        ]
      },
      {
        id: "ch12-E04",
        type: "SAQ",
        difficulty: "BOARD",
        title: "SAQ 2 — Giggle Incontinence",
        questionText: `SAQ 2 — Giggle Incontinence                                     [10 marks]

A 10-year-old girl is referred for episodes of complete bladder emptying that occur exclusively during laughter. She has normal voiding patterns and is dry at all other times.

(a) Define this condition and state its suspected pathophysiology. [3 marks]
(b) Outline the diagnostic evaluation required to confirm this diagnosis. [3 marks]
(c) Discuss the management options available for this condition. [4 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Condition: Giggle Incontinence (Enuresis Risoria). [1]
• Pathophysiology: Unclear, but thought to be either:
  - A form of cataplexy (sudden loss of muscle tone, including the urethral sphincter, triggered by emotion/laughter). [1]
  - Laughter-induced detrusor hyperreflexia/uninhibited detrusor contraction. [1]

(b) [3 marks] — Award 1 mark per point:
• Complete history to confirm that incontinence occurs ONLY with giggling/laughter. [1]
• Normal urinalysis and urine culture to rule out UTI. [1]
• Renal/bladder ultrasound with post-void residual to confirm normal anatomy and complete emptying under normal circumstances. [1]
• Uroflowmetry showing a normal bell-shaped curve. [1]

(c) [4 marks] — Award 1 mark per point:
• Reassurance: it often improves spontaneously with age/puberty. [1]
• Scheduled voiding: empty the bladder before activities likely to cause laughter. [1]
• Pharmacotherapy: Methylphenidate (Ritalin) is the most effective drug (thought to enhance urethral sphincter tone via central adrenergic pathways). [1]
• Anticholinergics: (e.g., Oxybutynin) may be tried if detrusor overactivity is suspected, though success rates are lower than with methylphenidate. [1]

COMMON ERRORS SEEN IN EXAMS:
• Treating this as typical overactive bladder and prescribing long courses of anticholinergics without success.
• Ordering invasive urodynamic testing (which is rarely diagnostic and highly stressful).`,
        discriminators: [
          "Identifying Methylphenidate as a specific treatment option and explaining its mechanism.",
          "Recognizing the relationship between giggle incontinence and cataplexy."
        ],
        commonErrors: [
          "Misdiagnosing the condition as neurogenic bladder.",
          "Failing to reassure the patient that the condition is self-limiting in many cases."
        ]
      },
      {
        id: "ch12-E05",
        type: "LCV",
        difficulty: "DISTINCTION",
        title: "LCV 1 — Evolving Daytime Wetting and UTIs",
        questionText: `LONG CASE QUESTION 1 — Pediatric Incontinence                   [Total: 35 marks]
Time allowed: ~40 minutes

─── STAGE 1: PRESENTATION ───────────────────────────────
An 8-year-old girl is referred to the pediatric urology clinic due to persistent daytime urinary incontinence and urgency. She has a history of three febrile UTIs, all requiring oral antibiotics. Her mother reports that the child frequently squats and presses her heel against her crotch when she feels the urge to void. Her bowels move twice a week with hard, painful stools.

Q1a. Define the holding maneuver described and explain its physiological purpose. [5 marks]
Q1b. Formulate the initial diagnostic assessment you would perform in the clinic. [5 marks]

─── STAGE 2: INVESTIGATION RESULTS ──────────────────────
Urinalysis is negative. Renal ultrasound reveals a normal upper tract bilaterally, but the bladder wall is thickened (4 mm when full, normal <2 mm) with a post-void residual of 65 mL. Uroflowmetry is performed twice, demonstrating a staccato pattern with a peak flow of 12 mL/s (low for age) and an average flow of 6 mL/s.

Q2a. Interpret these findings and state the most likely diagnosis. [5 marks]
Q2b. Explain how the bowel habit (constipation) interacts with the bladder function in this child. [5 marks]

─── STAGE 3: MANAGEMENT DECISION ────────────────────────
The child is diagnosed with Bladder-Bowel Dysfunction (BBD) secondary to dysfunctional voiding. Initial therapy is discussed with the family.

Q3a. Outline a comprehensive first-line conservative management plan (standard urotherapy and bowel management). [5 marks]
Q3b. The parents ask if they should start prophylactic antibiotics. Discuss your clinical decision regarding antibiotic prophylaxis. [5 marks]

─── STAGE 4: COMPLICATION / FOLLOW-UP ───────────────────
After 4 months of compliance with urotherapy and laxatives, the child's constipation is resolved, but she continues to have daytime wetting episodes and a persistent staccato flow with 50 mL residual on ultrasound.

Q4a. Formulate your next-line treatment strategy for this refractory dysfunctional voiding. [5 marks]`,
        markingGuide: `FULL MARKING GUIDE WITH MODEL ANSWERS

STAGE 1:
Q1a. [5 marks]
• Holding maneuver: Vincent's Curtsy (squatting with heel pressed against the perineum). [2]
• Physiological purpose: The heel exerts direct pressure on the perineum and external urethral sphincter. [1]
• Sphincter activation: This triggers a reflex relaxation of the detrusor muscle (the guard reflex) via pudendal afferent pathways, temporarily aborting an uninhibited detrusor contraction. [2]

Q1b. [5 marks]
• Voiding diary: A 3-day record of fluid intake, voided volumes, and incontinence episodes. [1]
• Bowel diary: Record stool frequency and consistency (Bristol Stool Chart). [1]
• Urinalysis/Culture: To rule out active UTI. [1]
• Physical examination: Check abdomen for fecal loading, inspect perineum, and perform a detailed neurologic exam of the lower extremities and sacral dermatomes (rule out tethered cord). [2]

STAGE 2:
Q2a. [5 marks]
• Interpretation: The combination of daytime wetting, holding maneuvers, thickened bladder wall, staccato flow, and elevated PVR in the presence of constipation is classic for Bladder-Bowel Dysfunction (BBD) with Dysfunctional Voiding. [3]
• Diagnosis: Dysfunctional Voiding (DV) with BBD. [2]

Q2b. [5 marks]
• Mechanical compression: A distended rectum compresses the posterior bladder wall, reducing functional bladder capacity. [1]
• Sensory alteration: Chronic rectal distension blunts bladder filling sensation. [1]
• Shared innervation: Pelvic floor hypertonicity is shared. Contraction of the anal sphincter to prevent fecal soilage leads to habitual contraction of the external urethral sphincter. [2]
• Reflex dysregulation: Chronic rectal distension alters detrusor reflexes, promoting detrusor overactivity or impairing contractility. [1]

STAGE 3:
Q3a. [5 marks]
• Timed voiding: Void every 2-3 hours by the clock. [1]
• Bio-mechanical posture: Sitting with feet flat on a stool, knees apart, leaning slightly forward to fully relax the pelvic floor. [1]
• Hydration: Adequate water intake, avoiding caffeine, chocolate, and carbonated beverages. [1]
• Bowel management: High-dose PEG-3350 (polyethylene glycol) to disimpact, followed by maintenance laxatives to achieve 1-2 soft stools (Bristol type 4) daily. [2]

Q3b. [5 marks]
• Clinical decision: Prophylactic antibiotics are not routinely indicated unless there is high-grade VUR or recurrent febrile UTIs despite active BBD management. [2]
• Rationale: Recurrent UTIs in BBD are driven by urinary stasis (PVR) and fecal loading. Correcting the BBD is the most effective way to prevent UTIs. [2]
• Recommendation: Treat the BBD first; if febrile UTIs recur despite compliance, low-dose prophylaxis (e.g., Nitrofurantoin) can be initiated temporarily. [1]

STAGE 4:
Q4a. [5 marks]
• Step 1: Initiate Pelvic Floor Biofeedback therapy (gold standard for refractory dysfunctional voiding). [2]
• Step 2: Refer to a specialized physical therapist to teach pelvic floor relaxation. [1]
• Step 3: Rule out occult spinal dysraphism by performing a lumbosacral MRI if neurological signs develop or if therapy completely fails. [1]
• Step 4: Avoid anticholinergics as first-line for DV, as they can increase PVR and worsen constipation, though they can be combined with biofeedback/CIC if detrusor overactivity is co-existent. [1]

MODEL ANSWER:
The child presents with Bladder-Bowel Dysfunction, characterized by the Vincent's curtsy holding maneuver, thickened bladder wall, staccato flow, and constipation. Constipation exacerbates detrusor overactivity via mechanical compression and reflex dysfunction. First-line management involves timed voiding, posture correction, and aggressive laxative therapy. Prophylactic antibiotics are reserved for recurrent febrile UTIs. For refractory dysfunctional voiding, pelvic floor biofeedback is the treatment of choice.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Explaining the guard reflex: how pudendal nerve stimulation from perineal pressure inhibits pelvic nerve detrusor activation.
• Emphasizing that BBD is a combined entity and that treating the bladder without treating the bowel is destined to fail.
• Recognizing that anticholinergics are contraindicated in pure dysfunctional voiding with elevated PVR due to the risk of urinary retention.`,
        discriminators: [
          "Explaining the neurological pathways of the guard reflex (pudendal-pelvic reflex inhibition).",
          "Emphasizing that bladder therapy will fail unless constipation is aggressively resolved first.",
          "Warning that anticholinergics should be avoided in children with high residuals (DV) unless combined with biofeedback/catheterization."
        ],
        commonErrors: [
          "Prescribing anticholinergics immediately without addressing the high PVR and constipation.",
          "Ordering a CT scan of the spine instead of an MRI to rule out occult spinal dysraphism."
        ]
      },
      {
        id: "ch12-E06",
        type: "EMQ",
        difficulty: "BOARD",
        title: "EMQ 1 — Pediatric Voiding Dysfunction",
        questionText: `EMQ 1 — Theme: Pediatric Voiding Dysfunction

OPTIONS (each option may be used once, more than once, or not at all):
A. Overactive Bladder (OAB)
B. Dysfunctional Voiding (DV)
C. Underactive Bladder (Detrusor Underactivity)
D. Hinman-Allen Syndrome (Non-neurogenic neurogenic bladder)
E. Giggle Incontinence
F. Extraordinary Daytime Urinary Frequency
G. Primary Monosymptomatic Nocturnal Enuresis (PMNE)
H. Post-micturition Dribbling
I. Vaginal Reflux
J. Ectopic Ureter

For each of the following clinical scenarios, select the single most appropriate option from the list above:

1. A 4-year-old boy presents with a sudden onset of voiding every 10–15 minutes during daytime hours only. He is dry at night, has a normal urinalysis, normal ultrasound, and the symptoms resolve completely during sleep.
2. A 9-year-old girl experiences urine leakage shortly after voiding when she stands up. Uroflowmetry is normal, and she is dry at all other times.
3. An 11-year-old boy with severe daytime wetting and fecal staining is found to have bilateral hydronephrosis, trabeculated bladder, and high post-void residuals. Neurologic examination and spinal MRI are entirely normal.
4. A 6-year-old girl has urgency, frequency, and urge incontinence. She is observed to squat and press her heel against her perineum during urgency episodes. Uroflowmetry shows a high-amplitude, rapid flow.
5. An 8-year-old girl with a history of recurrent UTIs shows a staccato voiding pattern with high post-void residuals on multiple clinic visits. She has no neurological abnormalities.`,
        markingGuide: `ANSWERS & RATIONALE:
1. F [Extraordinary Daytime Urinary Frequency] — Also known as pollakiuria. It is a benign, self-limiting condition typically occurring in young children (4-8 years), characterized by sudden frequency (up to every 10 mins) without UTIs, daytime wetting, or nocturnal symptoms. It is often triggered by stress.
2. I [Vaginal Reflux] — This is a common cause of post-micturition dribbling in young girls. Urine pooling in the vagina during voiding leaks out when the child stands up. It is managed by posture correction (sitting backward on the toilet or spreading legs wide).
3. D [Hinman-Allen Syndrome (Non-neurogenic neurogenic bladder)] — This is the most severe form of non-neurogenic voiding dysfunction. It mimics a neurogenic bladder (trabeculation, hydronephrosis, renal failure) but has no organic neurological cause; it is a severe behavioral/psychological dyssynergia.
4. A [Overactive Bladder (OAB)] — The combination of urgency, frequency, urge incontinence, Vincent's curtsy, and a normal or tower flow is classic for OAB.
5. B [Dysfunctional Voiding (DV)] — Habitual contraction of the external sphincter during voiding leads to a staccato flow and high PVR, placing the child at risk for UTIs. Unlike Hinman-Allen, it has not progressed to upper tract hydronephrosis and renal injury.`,
        discriminators: [
          "Recognizingpollakiuria (Extraordinary Daytime Urinary Frequency) by its classic daytime-only presentation and nighttime resolution.",
          "Distinguishing Hinman-Allen syndrome from simple dysfunctional voiding based on the presence of upper tract changes and bladder trabeculation."
        ],
        commonErrors: [
          "Selecting Ectopic Ureter for post-micturition dribbling (ectopic ureter causes continuous dampness, not just post-void leakage).",
          "Selecting neurogenic bladder for Hinman-Allen syndrome (Hinman-Allen has normal MRI/neurology)."
        ]
      }
    ]
  },
  {
    chapterNumber: 13,
    chapterSlug: "ch13_neurogenic-bladder",
    chapterTitle: "Neurogenic Bladder",
    questions: [
      {
        id: "ch13-E01",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 1 — Urodynamic Risk Factors in Myelomeningocele",
        questionText: `QUESTION 1 — Neurogenic Bladder in Myelomeningocele              [Total: 22 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A 2-month-old infant with a repaired lumbar myelomeningocele is referred for urologic evaluation. Renal ultrasound shows normal kidneys and bladder.

(a) Justify the timing of the initial urodynamic study (UDS) in this infant, and list the key parameters measured. [5 marks]
(b) Explain the clinical significance of a Detrusor Leak Point Pressure (DLPP) > 40 cm H2O. [5 marks]
(c) Define "Detrusor-Sphincter Dyssynergia" (DSD) and explain its pathophysiological consequence on the upper urinary tract. [6 marks]
(d) Outline your management strategy for a child identified as having a "hostile" neurogenic bladder. [6 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Timing: The initial UDS should be performed early (within the first 2-3 months of life) to establish a baseline. [1]
• Silent deterioration: Normal ultrasound does not rule out a hostile bladder that will cause renal damage. [1]
• Measured parameters: Bladder capacity (compared to expected capacity for age). [1]
• Bladder compliance: Change in volume per change in pressure (normal is highly compliant). [1]
• Detrusor leak point pressure (DLPP) and presence of uninhibited detrusor contractions. [1]
• Electromyography (EMG) of the pelvic floor/external sphincter to check for coordination. [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• DLPP is the pressure at which urine leakage occurs around the catheter. [1]
• DLPP > 40 cm H2O is the critical threshold for upper tract deterioration. [2]
• Pathophysiology: High pressure exceeds the ureteral peristaltic pressure, obstructing bolus transport. [1]
• Long-term risk: Leads to hydronephrosis, vesicoureteral reflux, renal dysplasia/scarring, and eventually renal failure. [1]

(c) [6 marks] — Award 1 mark per point.
Expected answers:
• DSD definition: Involuntary contraction of the external urethral sphincter during a detrusor contraction. [2]
• Neuro-anatomy: Caused by a spinal cord lesion between the brainstem (pontine micturition center) and the sacral cord (S2-S4). [1]
• High voiding pressure: Voiding against an closed sphincter generates high intravesical pressures. [1]
• Bladder remodeling: Leads to detrusor hypertrophy, trabeculation, diverticula, and bladder wall ischemia. [1]
• VUR and UTI: Promotes vesicoureteral reflux and facilitates UTI development due to incomplete emptying. [1]

(d) [6 marks] — Award 1 mark per point.
Expected answers:
• Clean Intermittent Catheterization (CIC): Initiate immediately to empty the bladder and keep pressures low. [2]
• Anticholinergic therapy: (e.g., Oxybutynin) to relax the detrusor, increase compliance, and lower storage pressures. [2]
• Surveillance: Repeat ultrasound every 3–6 months and repeat UDS at 1 year or if ultrasound changes. [1]
• Surgical options: If medical therapy fails (persistent high pressures or hydronephrosis), consider botulinum toxin injection, vesicostomy, or bladder augmentation. [1]

MODEL ANSWER:
In myelomeningocele, early UDS (within 2-3 months) is justified to identify high-risk bladder parameters before ultrasound changes occur. A DLPP > 40 cm H2O represents a critical pressure threshold that overcomes ureteral transport, leading to hydronephrosis and renal damage. DSD is the involuntary contraction of the sphincter during detrusor activation, causing trabeculation and VUR. A hostile bladder is managed with CIC and anticholinergics, with surgical options reserved for medical failures.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Citing McGuire's landmark 1981 study establishing the >40 cm H2O DLPP threshold for renal injury.
• Distinguishing between DSD (neurogenic) and dysfunctional voiding (non-neurogenic/behavioral).
• Explaining that compliance is calculated as dV/dP and noting that a compliance <10 mL/cm H2O is considered abnormal in older children.`,
        discriminators: [
          "Citing McGuire's 1981 paper establishing the >40 cm H2O DLPP threshold.",
          "Distinguishing between neurogenic DSD and non-neurogenic dysfunctional voiding.",
          "Providing the mathematical formula for bladder compliance (dV/dP) and its significance."
        ],
        commonErrors: [
          "Waiting for hydronephrosis to develop on ultrasound before ordering the first UDS (renal damage may already be underway).",
          "Confusing detrusor leak point pressure with abdominal leak point pressure."
        ]
      },
      {
        id: "ch13-E02",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 2 — Reconstructive Options in Neurogenic Bladder",
        questionText: `QUESTION 2 — Reconstructive Surgical Options                         [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
An 8-year-old girl with spina bifida has a small, trabeculated bladder with poor compliance on urodynamics. She has recurrent febrile UTIs and progressive bilateral hydronephrosis despite compliance with CIC and high-dose oral oxybutynin. Her family wishes to discuss surgical reconstruction to achieve dryness and protect her kidneys.

(a) Discuss the indications and surgical options for bladder augmentation (cystoplasty), highlighting the preferred bowel segment. [5 marks]
(b) Outline the concept and technique of the Mitrofanoff principle for continent urinary diversion. [5 marks]
(c) State the common long-term complications associated with bladder augmentation and how they are managed. [6 marks]
(d) Describe the management of a patient who presents with acute abdominal pain, fever, and oliguria post-bladder augmentation. [4 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Indications: Small capacity, poorly compliant bladder that is refractory to maximal medical therapy (CIC + anticholinergics/Botox) and causing upper tract deterioration or intractable incontinence. [1]
• Surgical options: Clam ileocystoplasty (bladder is bivalved and a detubularized patch of bowel is anastomosed to it). [1]
• Preferred segment: Ileum (typically 20–25 cm harvested 15 cm proximal to the ileocecal valve). [1]
• Why detubularization is key: Detubularizing the bowel interrupts coordinated contractions, preventing high-pressure spikes. [1]
• Alternatives: Sigmoid colon, stomach (gastrocystoplasty - rarely used due to hematuria-dysuria syndrome), or ureterocystoplasty (if megaureter is available). [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Mitrofanoff principle: Creating a catheterizable channel between the bladder and the skin using a narrow conduit. [1]
• Continence mechanism: The channel is implanted into the bladder wall using a tunnel (submucosal tunnel / valvular mechanism) so that bladder filling compresses the channel and prevents leakage. [2]
• Preferred conduit: Appendix (apendicovesicostomy). [1]
• Alternative conduit: Yang-Monti channel (a tube constructed from reconfigured short segments of detubularized ileum) or ureter. [1]

(c) [6 marks] — Award 1 mark per point.
Expected answers:
• Mucus production: Bowel segments continue to produce mucus, predisposing to bladder calculi. Managed by daily bladder irrigations. [1]
• Bladder stones: Occur in up to 30% of augmented patients. Treated endoscopically or via open cystolitholapaxy. [1]
• Electrolyte abnormalities: Ileum/colon absorb ammonium and chloride, leading to metabolic acidosis. Managed with oral bicarbonate if severe. [1]
• Urinary tract infections: High rates of bacteriuria; treat only symptomatic UTIs, not asymptomatic colonization. [1]
• Malignancy: Increased risk of adenocarcinoma at the enterovesical junction (long latency period, >10-15 years). Requires screening cystoscopy starting 10 years post-op. [1]
• Spontaneous bladder perforation: Life-threatening complication. [1]

(d) [4 marks] — Award 1 mark per point.
Expected answers:
• Suspicion: Spontaneous bladder perforation (peritonitis from urine leakage). [1]
• Immediate diagnostic step: Urgent CT cystogram (looking for intraperitoneal contrast extravasation) or ultrasound. [1]
• Resuscitation: IV fluids, broad-spectrum antibiotics, and insertion of a large-bore urethral/Mitrofanoff catheter to decompress the bladder. [1]
• Definitive management: Emergency laparotomy and surgical repair of the perforation. Conservative management (catheter drainage) is only tried in small extraperitoneal leaks. [1]

MODEL ANSWER:
Bladder augmentation is indicated for a hostile bladder refractory to medical therapy. Clam ileocystoplasty using detubularized ileum is the standard. The Mitrofanoff principle uses a catheterizable conduit (like the appendix) with a submucosal tunnel valve. Long-term complications include mucus plug formation, stones, hyperchloremic metabolic acidosis, UTI, and malignancy. Acute abdominal pain with oliguria post-augmentation suggests spontaneous perforation, requiring urgent CT cystogram and emergency laparotomy.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Emphasizing that detubularization of the bowel segment is mandatory to prevent high-pressure peristaltic waves in the augmented bladder.
• Stating that the risk of malignancy is an enterovesical junction adenocarcinoma and that surveillance cystoscopy is recommended long-term.
• Recognizing that spontaneous perforation is often due to ischemia, over-distension, or catheter trauma, and presents as a surgical emergency.`,
        discriminators: [
          "Explaining the biophysical reason for detubularization (preventing peristaltic pressure spikes).",
          "Identifying the specific malignancy type (adenocarcinoma at the anastomosis) and the need for long-term screening.",
          "Recognizing that bladder perforation post-augmentation is a surgical emergency with high mortality if missed."
        ],
        commonErrors: [
          "Prescribing antibiotics for asymptomatic bacteriuria in a patient on CIC with an augmented bladder.",
          "Performing a simple abdominal X-ray to rule out bladder perforation (CT cystogram is the imaging of choice)."
        ]
      },
      {
        id: "ch13-E03",
        type: "SAQ",
        difficulty: "FOUNDATION",
        title: "SAQ 1 — Latex Allergy in Spina Bifida",
        questionText: `SAQ 1 — Latex Allergy in Spina Bifida                                [8 marks]

Children with myelomeningocele have an extremely high prevalence of latex allergy, estimated at up to 40–50%.

(a) Explain why patients with spina bifida are uniquely predisposed to developing latex allergy. [3 marks]
(b) Outline three clinical precautions that must be taken when managing these patients in the operating room. [3 marks]
(c) List two cross-reactive foods that a latex-allergic child should avoid. [2 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Chronic exposure: Repeated early exposure to latex-containing medical devices (catheters, gloves, surgical barriers) during multiple operations from birth. [1]
• Mucosal exposure: Intermittent catheterization (CIC) exposes the urethral mucosa directly to latex (if latex catheters are used). [1]
• Genetic/atopic predisposition: High rates of atopy in this population combined with barrier disruption. [1]

(b) [3 marks] — Award 1 mark per point:
• Declare "Latex-Free Room" with signage; schedule as the first case of the day to allow airborne latex particles to settle. [1]
• Use non-latex gloves (nitrile, neoprene) for all personnel (surgeons, scrub nurses, anesthesiologists). [1]
• Use latex-free catheters, IV tubing, syringes, and anesthesia masks/bags. [1]
• Avoid any rubber stoppers on medication vials (draw up meds directly without piercing rubber if possible). [1]

(c) [2 marks] — Award 1 mark per point (max 2):
• Banana [1]
• Avocado [1]
• Kiwi [1]
• Chestnut [1]
• Papaya [1]

COMMON ERRORS SEEN IN EXAMS:
• Assuming that a negative history of allergic reaction in a spina bifida patient means they are not allergic (every spina bifida patient must be treated as latex-allergic regardless of history or test results).
• Using standard gloves but avoiding latex catheters (all equipment must be latex-free).`,
        discriminators: [
          "Stating that every patient with spina bifida must be treated as latex-allergic from birth.",
          "Correctly naming the cross-reactive foods (latex-fruit syndrome)."
        ],
        commonErrors: [
          "Failing to treat a spina bifida patient as latex-allergic because they have 'no history' of reaction.",
          "Neglecting the scheduling detail (first case of the day is best to avoid airborne allergens)."
        ]
      },
      {
        id: "ch13-E04",
        type: "SAQ",
        difficulty: "BOARD",
        title: "SAQ 2 — Botulinum Toxin in Neurogenic Bladder",
        questionText: `SAQ 2 — Botulinum Toxin A in Neurogenic Bladder                     [10 marks]

Botulinum Toxin A (Botox) is increasingly used in the management of pediatric neurogenic bladder.

(a) Describe the mechanism of action of Botulinum Toxin A in the bladder. [3 marks]
(b) List two specific clinical indications for injecting Botox into the detrusor muscle. [3 marks]
(c) State the typical technique of administration and the expected duration of effect. [4 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Botox cleaves SNAP-25 (a synaptosomal-associated protein). [1]
• This blocks the presynaptic release of acetylcholine at the neuromuscular junction (parasympathetic efferent pathways). [1]
• Result: Flaccid paralysis of the detrusor muscle, reducing detrusor pressure and increasing bladder compliance. [1]

(b) [3 marks] — Award 1 mark per point (max 3):
• Detrusor overactivity/poor compliance refractory to oral anticholinergic medications. [1]
• Severe side effects from oral anticholinergic medications preventing adequate dosing. [1]
• Intractable urinary incontinence in a patient on CIC due to detrusor spasms. [1]
• Alternative to bladder augmentation in patients with moderate compliance issues. [1]

(c) [4 marks]
• Technique: Performed under general anesthesia. Cystoscopy is performed, and a flexible needle is used to inject Botox into the detrusor muscle. [1]
• Injection sites: 20-30 sites across the detrusor wall, sparing the trigone (to prevent vesicoureteral reflux). [1]
• Typical dose: 10 units/kg (up to a maximum of 200-300 units). [1]
• Duration of effect: Transient; typically lasts between 6 to 9 months, requiring repeat injections. [1]

COMMON ERRORS SEEN IN EXAMS:
• Injecting the trigone (which can cause reflux or alter bladder sensation).
• Suggesting that Botox is a permanent cure (it requires repeated injections).`,
        discriminators: [
          "Naming the target protein SNAP-25.",
          "Specifying the exclusion of the trigone from the injection field."
        ],
        commonErrors: [
          "Failing to mention that patients must be on CIC (as Botox can cause complete urinary retention).",
          "Suggesting the effect lasts indefinitely."
        ]
      },
      {
        id: "ch13-E05",
        type: "LCV",
        difficulty: "DISTINCTION",
        title: "LCV 1 — Evolving Spina Bifida Patient",
        questionText: `LONG CASE QUESTION 1 — Neurogenic Bladder                       [Total: 35 marks]
Time allowed: ~40 minutes

─── STAGE 1: PRESENTATION ───────────────────────────────
A female infant is born with a lumbosacral myelomeningocele. The defect is repaired within 24 hours of birth. At 4 weeks of age, she is referred to the pediatric urology service. Physical exam shows a soft abdomen, bilateral clubfoot deformities, and absent perineal sensation with patulous anus. A baseline renal ultrasound is normal.

Q1a. Formulate your initial urological management and monitoring plan for this infant. [5 marks]
Q1b. The parents ask if a normal ultrasound means her kidneys are safe. Explain your rationale for urodynamic testing. [5 marks]

─── STAGE 2: INVESTIGATION RESULTS ──────────────────────
At 2 months of age, a urodynamic study is performed. The results show: Bladder capacity of 20 mL (expected ~35 mL), poor compliance, and detrusor contractions peaking at 65 cm H2O. Leakage occurs around the catheter at 55 cm H2O (DLPP). EMG shows active pelvic floor muscle contraction during detrusor spikes.

Q2a. Interpret these UDS findings and classify this bladder pattern. [5 marks]
Q2b. Outline your immediate therapeutic interventions based on this UDS. [5 marks]

─── STAGE 3: MANAGEMENT DECISION ────────────────────────
The child is started on CIC four times daily and oral oxybutynin. She does well for several years, with serial ultrasounds showing normal kidneys. However, at age 8, she develops recurrent febrile UTIs. A repeat ultrasound shows bilateral hydronephrosis (SFU grade 3) and a thickened, trabeculated bladder wall. A DMSA scan shows 40% function on the left with a new upper pole scar, and 60% on the right. A repeat UDS confirms persistent poor compliance and a DLPP of 50 cm H2O despite maximal anticholinergic dosing.

Q3a. Discuss the surgical options available at this stage to protect her renal function and achieve continence. [5 marks]
Q3b. The family chooses a bladder augmentation with a catheterizable channel. Outline the operative planning, including the tissue segments you will use. [5 marks]

─── STAGE 4: COMPLICATION / FOLLOW-UP ───────────────────
Five years post-operatively, the patient (now 13) is dry on CIC via a Mitrofanoff channel. She is brought to the emergency department with a 24-hour history of severe lower abdominal pain, fever (38.8°C), and vomiting. Her mother reports that she has had very little urine output from her Mitrofanoff channel today. On examination, she is tachycardic, has a rigid, tender abdomen with guarding, and appears septic.

Q4a. State your primary differential diagnosis, list your immediate diagnostic investigations, and outline your emergency management. [5 marks]`,
        markingGuide: `FULL MARKING GUIDE WITH MODEL ANSWERS

STAGE 1:
Q1a. [5 marks]
• Baseline evaluation: Renal ultrasound at 4 weeks to check for hydronephrosis/ectopia. [1]
• Initiate Clean Intermittent Catheterization (CIC) if there is incomplete emptying (residual >10-20 mL). [1]
• Schedule a baseline Urodynamic Study (UDS) at 2-3 months of age. [2]
• Monitor for UTIs: obtain urine culture if symptomatic (fever, foul-smelling urine, lethargy). [1]

Q1b. [5 marks]
• Normal ultrasound does not guarantee safety: it only shows anatomy at a single point in time. [1]
• Silent dysfunction: Over 50% of infants with spina bifida have high-pressure bladder storage (hostile bladder) that is initially asymptomatic. [2]
• Preventative care: Identifying high DLPP (>40 cm H2O) or poor compliance early allows starting CIC/anticholinergics to prevent hydronephrosis and scarring. [2]

STAGE 2:
Q2a. [5 marks]
• Interpretation: The bladder is small, poorly compliant, and has high pressures (DLPP 55 cm H2O). [2]
• Detrusor-Sphincter Dyssynergia (DSD): EMG shows sphincter activity during contractions. [1]
• Classification: Hostile / High-risk neurogenic bladder. [2]

Q2b. [5 marks]
• Clean Intermittent Catheterization (CIC): Initiate immediately (every 4 hours). [2]
• Anticholinergic medication: Start oral Oxybutynin (0.1 mg/kg/dose, tid) to lower detrusor pressure and improve compliance. [2]
• Parent education: Teach parents how to perform aseptic CIC and recognize signs of UTI. [1]

STAGE 3:
Q3a. [5 marks]
• Refractory hostile bladder: failed medical therapy with new renal scar and hydronephrosis. [1]
• Surgical options:
  - Botulinum Toxin A injection (transient, good temporary option). [1]
  - Cutaneous Vesicostomy (temporary diversion to decompress, but causes incontinence). [1]
  - Bladder Augmentation (enterocystoplasty) + Continent Catheterizable Conduit (Mitrofanoff). [2]
  - Urinary diversion (ileal conduit - rarely first-line in children). [1]

Q3b. [5 marks]
• Bladder Augmentation: Clam ileocystoplasty using a 20-25 cm segment of detubularized ileum. [2]
• Catheterizable Channel: Mitrofanoff appendicovesicostomy using the appendix. [2]
• Alternative conduit: If appendix is absent/short, use a Yang-Monti ileal channel. [1]

STAGE 4:
Q4a. [5 marks]
• Primary diagnosis: Spontaneous bladder perforation post-bladder augmentation. [1]
• Diagnostic investigations:
  - Urgent CT cystogram (gold standard) or ultrasound to check for free fluid and contrast leak. [1]
  - Serum electrolytes and creatinine (check for absorption of urine solutes causing high creatinine/potassium). [1]
  - Blood and urine cultures. [1]
• Emergency management:
  - Resuscitate with IV fluids and broad-spectrum antibiotics. [1]
  - Decompress the bladder immediately by placing catheters in both the urethra and the Mitrofanoff channel. [1]
  - Emergency laparotomy and surgical repair of the perforation. [1]
  (max 5)

MODEL ANSWER:
Urological management of a myelomeningocele infant starts with ultrasound and early urodynamics to rule out a hostile bladder (DLPP > 40 cm H2O). If identified, treatment with CIC and oxybutynin is initiated. If medical therapy fails and hydronephrosis/renal scarring occurs, bladder augmentation (clam ileocystoplasty) and a Mitrofanoff channel are indicated. In an adolescent presenting with peritonitis and sepsis post-augmentation, spontaneous bladder perforation must be suspected, diagnosed via CT cystogram, and treated with fluid resuscitation, broad-spectrum antibiotics, decompression, and immediate surgical exploration.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Recognizing that normal neonatal ultrasound can coexist with high-pressure bladder storage.
• Explaining that the absorption of urine solutes (urea, creatinine) across the peritoneal membrane in a bladder leak can falsely elevate serum values, mimicking acute kidney injury.
• Highlighting that asymptomatic bacteriuria is normal in augmented bladders and should not be treated unless clinical signs of UTI (fever, pain) are present.`,
        discriminators: [
          "Explaining that a normal ultrasound does not rule out bladder hostility.",
          "Recognizing that peritoneal absorption of urine mimics acute kidney injury on lab tests (pseudorenal failure).",
          "Emphasizing that asymptomatic bacteriuria is the norm in patients on CIC with augmented bladders."
        ],
        commonErrors: [
          "Treating the patient for simple gastroenteritis or UTI without ruling out bladder perforation.",
          "Relying on a simple bladder ultrasound to rule out a leak (ultrasound may show free fluid but cannot localize the perforation; CT cystogram is required)."
        ]
      },
      {
        id: "ch13-E06",
        type: "EMQ",
        difficulty: "BOARD",
        title: "EMQ 1 — Neurogenic Bladder Conditions",
        questionText: `EMQ 1 — Theme: Neurogenic Bladder Conditions

OPTIONS (each option may be used once, more than once, or not at all):
A. Detrusor-Sphincter Dyssynergia (DSD)
B. Detrusor Areflexia (Lower Motor Neuron Bladder)
C. Detrusor Overactivity (Upper Motor Neuron Bladder)
D. Autonomic Dysreflexia
E. Bladder Augmentation Perforation
F. Bladder Calculus
G. Hyperchloremic Metabolic Acidosis
H. Hypochloremic Metabolic Alkalosis
I. Gastrocystoplasty Hematuria-Dysuria Syndrome
J. Latex Anaphylaxis

For each of the following clinical scenarios, select the single most appropriate option from the list above:

1. A 15-year-old boy with a T4 spinal cord injury undergoes cystoscopy. During the procedure, his blood pressure spikes to 180/110 mmHg, and he develops severe sweating, bradycardia, and a flushing of the face.
2. A 10-year-old child who underwent bladder augmentation using a stomach patch (gastrocystoplasty) presents with severe perineal skin excoriation and burning pain during voiding.
3. An 8-year-old girl with a repaired myelomeningocele who performs CIC presents with recurrent alkaline urine and hematuria. An ultrasound shows a mobile, shadowing 2 cm shadow-casting mass in the bladder.
4. A 6-month-old infant with sacral agenesis is found to have a large-capacity, thin-walled bladder that empties only with Credé maneuver (manual pressure). Urodynamics show flat detrusor pressures during filling and voiding.
5. A 9-year-old child with a reconstructed bladder (ileocystoplasty) presents with progressive fatigue. Lab results show pH 7.28, Sodium 140 mmol/L, Potassium 4.0 mmol/L, Chloride 115 mmol/L (normal 98-106), and Bicarbonate 16 mmol/L.`,
        markingGuide: `ANSWERS & RATIONALE:
1. D [Autonomic Dysreflexia] — Triggered by noxious stimuli (like bladder distension or cystoscopy) in patients with spinal cord lesions above T6. It leads to uninhibited sympathetic discharge causing severe hypertension, while vagal response causes bradycardia and flushing above the lesion.
2. I [Gastrocystoplasty Hematuria-Dysuria Syndrome] — Gastric mucosa continues to secrete acid in the bladder, leading to chemical cystitis, hematuria, and severe dysuria/skin excoriation, especially in patients who are continent. Treated with H2 blockers or proton pump inhibitors.
3. F [Bladder Calculus] — Patients with augmented bladders on CIC have a high risk (~30%) of bladder stones due to mucus accumulation, urinary stasis, and chronic colonization with urea-splitting bacteria.
4. B [Detrusor Areflexia (Lower Motor Neuron Bladder)] — Sacral agenesis disrupts the sacral reflex arc (S2-S4), leading to a flaccid, non-contractile detrusor that does not contract during filling, typical of lower motor neuron injury.
5. G [Hyperchloremic Metabolic Acidosis] — Ileal segments used in cystoplasty absorb ammonium and chloride from urine in exchange for bicarbonate and sodium, leading to a chronic hyperchloremic metabolic acidosis.`,
        discriminators: [
          "Recognizing the physiological mechanism of Autonomic Dysreflexia and its immediate trigger.",
          "Identifying the metabolic profile of hyperchloremic metabolic acidosis caused by intestinal bladder augmentation."
        ],
        commonErrors: [
          "Selecting detrusor overactivity for the sacral agenesis infant (sacral agenesis causes lower motor neuron/areflexic patterns).",
          "Selecting simple UTI for the bladder calculus patient."
        ]
      }
    ]
  },
  {
    chapterNumber: 14,
    chapterSlug: "ch14_anorectal-malformations-renal-ectopia",
    chapterTitle: "Anorectal Malformations / Renal Ectopia",
    questions: [
      {
        id: "ch14-E01",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 1 — VACTERL Association and ARM Screening",
        questionText: `QUESTION 1 — VACTERL Association and ARM Screening                [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A newborn male infant is diagnosed with an anorectal malformation (imperforate anus) at birth. On examination, a perineal fistula is absent, and the abdomen is moderately distended.

(a) Define the VACTERL association and list the specific diagnostic criteria required to establish this diagnosis. [5 marks]
(b) Outline the immediate urologic screening and evaluation protocol for this newborn within the first 24-48 hours. [5 marks]
(c) Justify why a spinal ultrasound is performed in these infants, and state the age-limit for its accuracy. [5 marks]
(d) Explain the concept of the sacral ratio and describe how it is measured on radiographs. [5 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• VACTERL stands for: Vertebral anomalies, Anal atresia, Cardiac defects, Tracheoesophageal fistula, Renal anomalies, and Limb defects. [1]
• Diagnostic criteria: Typically requires the presence of at least three of these features to confirm the association. [1]
• Vertebral: e.g., hemivertebrae, sacral agenesis. [1]
• Renal: e.g., solitary kidney, renal ectopia, hydronephrosis, VUR. [1]
• Limb: e.g., radial dysplasia, polydactyly, syndactyly. [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Renal ultrasound: perform within 24-48 hours to screen for renal agenesis, ectopia, or hydronephrosis. [2]
• Urinalysis: inspect for meconium (indicates a rectourinary fistula: rectourethral or rectovesical). [1]
• Spine plain films: to assess for sacral agenesis or vertebral anomalies. [1]
• Baseline renal function (serum creatinine) and electrolyte monitoring. [1]

(c) [5 marks] — Award 1 mark per point.
Expected answers:
• Rationale: Screen for spinal dysraphism or tethered spinal cord, which is highly associated with ARMs (especially high malformations). [2]
• Consequence of tethered cord: Can lead to progressive neurogenic bladder, urinary incontinence, and lower extremity neurologic deficits if untreated. [1]
• Age-limit: Accurate only up to 3–6 months of age. [1]
• Rationale for age limit: After 3-6 months, ossification of the posterior vertebral arches prevents acoustic penetration; MRI is required thereafter. [1]

(d) [5 marks] — Award 1 mark per point.
Expected answers:
• Significance: The sacral ratio is a quantitative measure of sacral development, which correlates with pelvic floor muscle quality and fecal/urinary continence. [2]
• Measurement: Measured on anteroposterior (AP) and lateral pelvic radiographs. [1]
• Calculation: Ratio of the distance from the top of the sacrum to the coccyx divided by the distance between the iliac crests (on AP) or other bony landmarks. [1]
• Interpretation: Normal ratio is >0.74 on AP (or >0.77 on lateral). A low ratio (<0.4) indicates significant sacral hypoplasia and predicts poor long-term continence. [1]

MODEL ANSWER:
VACTERL association requires at least three features: Vertebral, Anal, Cardiac, TE fistula, Renal, and Limb anomalies. Newborns with ARM need immediate renal ultrasound to exclude CAKUT anomalies and urinalysis to check for meconium (fistula screen). Spinal ultrasound screens for tethered cord, but is only accurate up to 3-6 months due to vertebral ossification. The sacral ratio is a radiological index of sacral development that correlates with long-term continence; a ratio <0.4 indicates severe hypoplasia.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Explicitly listing the vertebral and limb anomalies most common in VACTERL (hemivertebrae, radial ray anomalies).
• Explaining that spinal ultrasound becomes ineffective after 6 months because the posterior arches of the vertebrae ossify, blocking the sound waves.
• Detailing how to calculate the sacral ratio and stating the clinical correlation with long-term sphincter control and pelvic nerve plexus integrity.`,
        discriminators: [
          "Listing radial ray dysplasia as the classic limb anomaly in VACTERL.",
          "Explaining the physical limitation of ultrasound in ossified vertebrae (why MRI is needed post-6 months).",
          "Providing the numerical values for normal (>0.7) vs. abnormal (<0.4) sacral ratio."
        ],
        commonErrors: [
          "Confusing VACTERL with a genetic syndrome (it is a non-random association with unknown etiology, usually sporadic).",
          "Ordering an MCU immediately in a newborn before stabilizing and checking the anatomy on ultrasound."
        ]
      },
      {
        id: "ch14-E02",
        type: "SEQ",
        difficulty: "BOARD",
        title: "SEQ 2 — Rectourethral Fistula Management",
        questionText: `QUESTION 2 — Rectourethral Fistula in Anorectal Malformations     [Total: 20 marks]
Time allowed: ~25 minutes

CLINICAL SCENARIO:
A 6-month-old boy with a high anorectal malformation and a rectourethral prostatic fistula is scheduled for definitive reconstruction. He had a diverting colostomy performed on day 2 of life.

(a) Describe the classification of rectourinary fistulas in male infants with anorectal malformations. [5 marks]
(b) Outline the surgical steps of a Posterior Sagittal Anorectoplasty (PSARP - Peña procedure) for rectourethral fistula. [5 marks]
(c) Discuss the intraoperative urological precautions that must be taken during a PSARP, specifically regarding the urinary tract. [5 marks]
(d) Formulate the postoperative urologic follow-up and monitoring plan for this child. [5 marks]`,
        markingGuide: `EXAMINER'S MARKING GUIDE

(a) [5 marks] — Award 1 mark per point.
Expected answers:
• Rectoperineal fistula: opening is on the perineum (low anomaly). [1]
• Rectourethral bulbar fistula: fistula enters the membranous/bulbar urethra. [1]
• Rectourethral prostatic fistula: fistula enters the prostatic urethra (high anomaly). [1]
• Rectovesical (bladder neck) fistula: fistula enters the bladder neck (highest anomaly in males). [1]
• Urologic association: The higher the fistula, the higher the rate of associated renal and sacral anomalies. [1]

(b) [5 marks] — Award 1 mark per point.
Expected answers:
• Position: Prone jackknife position. [1]
• Incision: Midline sagittal incision from the coccyx to the perineum. [1]
• Exposure: Divide the parasagittal fibers, muscle complex, and levator muscle strictly in the midline. [1]
• Fistula identification: Expose the rectum, mobilize its anterior wall, and dissect down to the fistula where it joins the urethra. [1]
• Separation and closure: Ligate and divide the fistula close to the urethra (avoid leaving a diverticulum), then reconstruct the muscle sphincter complex around the newly placed rectum (anoplasty). [1]

(c) [5 marks] — Award 1 mark per point.
Expected answers:
• Catheterization: Place a urethral Foley catheter before positioning the patient. This acts as a palpable guide during dissection. [2]
• Avoid urethral injury: Dissect strictly in the plane between the rectum and the posterior urethra; the Foley catheter helps localize the urethral wall. [1]
• Safe ligation: Do not close the fistula too tightly against the urethra (risk of urethral stricture) or too far away (risk of a urethral diverticulum/UTIs). [1]
• Continuous bladder drainage: Leave the urethral catheter in place for 5–7 days post-op to allow the urethral closure to heal without extravasation. [1]

(d) [5 marks] — Award 1 mark per point.
Expected answers:
• Monitor voiding: Check for stream quality, hesitancy, or urine retention post-catheter removal. [1]
• Screen for urethral stricture: indicated if there is straining, weak stream, or recurrent UTIs. [1]
• Long-term bladder surveillance: Monitor for neurogenic bladder (due to spinal dysraphism or intraoperative pelvic nerve injury). [1]
• Kidney monitoring: Repeat renal ultrasound at 1 year and check renal function. [1]
• Continence assessment: At age 3-4, assess both fecal and urinary continence. [1]

MODEL ANSWER:
Rectourinary fistulas in males are classified as perineal, bulbar, prostatic, or bladder neck. A PSARP is performed in the prone jackknife position to divide the muscle complex in the midline and ligate the fistula. Intraoperative safety requires a urethral catheter to guide dissection and prevent urethral injury. Postoperatively, the catheter remains for 5-7 days, and long-term follow-up monitors for urethral stricture, neurogenic bladder, and renal growth.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Emphasizing that placing a Foley catheter is the single most important safety measure for identifying the urethra during anterior rectal dissection.
• Discussing the complication of a residual urethral diverticulum if the fistula is ligated too far from the urethra, which can act as a reservoir for stasis and stones.
• Highlighting that surgical dissection must remain strictly in the midline to avoid injuring the pelvic splanchnic nerves.`,
        discriminators: [
          "Highlighting the role of the urethral catheter as an intraoperative physical landmark.",
          "Explaining the risk of a urethral diverticulum vs. stricture depending on the site of fistula ligation.",
          "Explaining that midline dissection protects pelvic autonomic nerves."
        ],
        commonErrors: [
          "Omitting the urethral catheter during a PSARP, risking complete urethral transection.",
          "Failing to monitor for late-onset neurogenic bladder post-operatively."
        ]
      },
      {
        id: "ch14-E03",
        type: "SAQ",
        difficulty: "FOUNDATION",
        title: "SAQ 1 — Crossed Fused Renal Ectopia",
        questionText: `SAQ 1 — Crossed Fused Renal Ectopia                               [8 marks]

Crossed fused renal ectopia is the second most common fusion anomaly of the kidney.

(a) Describe the anatomical configuration of crossed fused renal ectopia. [3 marks]
(b) List three associated urological complications or anomalies that may occur. [3 marks]
(c) Outline the standard management for an asymptomatic child with this condition. [2 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Both kidneys are located on the same side of the midline. [1]
• The ectopic kidney crosses the midline and its upper pole is fused to the lower pole of the orthotopic (normal) kidney. [1]
• The ureter of the ectopic kidney crosses back over the midline to enter the bladder at its normal position (contralateral ureteric orifice). [1]

(b) [3 marks] — Award 1 mark per point:
• Vesicoureteral reflux (VUR) (most common associated anomaly, up to 20-30%). [1]
• Ureteropelvic Junction Obstruction (UPJO) in either kidney. [1]
• Urinary tract stones (due to anomalous drainage/stasis). [1]
• Urinary tract infections. [1]
• Multicystic dysplasia in the ectopic unit. [1]
(max 3)

(c) [2 marks] — Award 1 mark per point:
• Conservative/non-operative management: Serial ultrasounds to monitor for hydronephrosis and check renal growth. [1]
• Clinical follow-up: Investigate for UTI or stones only if symptomatic; routine surgical separation of the fused kidneys is NOT indicated. [1]

COMMON ERRORS SEEN IN EXAMS:
• Suggesting that the ectopic kidney's ureter enters the bladder on the ectopic side (the ureter always crosses back to insert in its embryologically correct position on the contralateral side).
• Recommending surgical separation of the kidneys (which is technically challenging, unnecessary, and risks renal devascularization).`,
        discriminators: [
          "Emphasizing that the ectopic ureter crosses the midline to insert normally in the bladder.",
          "Clearly stating that surgical separation is contraindicated."
        ],
        commonErrors: [
          "Confusing crossed fused ectopia with horseshoe kidney (horseshoe kidney is bilateral, joined at the lower poles across the midline).",
          "Suggesting prophylactic surgical separation."
        ]
      },
      {
        id: "ch14-E04",
        type: "SAQ",
        difficulty: "BOARD",
        title: "SAQ 2 — Persistent Cloaca",
        questionText: `SAQ 2 — Persistent Cloaca                                      [10 marks]

Persistent Cloaca is the most complex anorectal malformation in female infants.

(a) Define a persistent cloaca and describe its anatomical features. [3 marks]
(b) State the immediate management steps required in the neonatal period. [3 marks]
(c) Outline the urological and gynecological considerations for long-term reconstruction. [4 marks]`,
        markingGuide: `MARKING GUIDE:

(a) [3 marks]
• Persistent Cloaca: A malformation where the rectum, vagina, and urinary tract fuse into a single common channel. [2]
• The child has a single perineal opening located where the urethra should be. [1]

(b) [3 marks] — Award 1 mark per point:
• Decompress the urinary tract: catheterization of the common channel or vesicostomy if catheterization fails. [1]
• Decompress hydrocolpos: (a dilated, urine-filled vagina which compresses the trigone). Requires vaginal catheterization or vaginostomy. [1]
• Divert the fecal stream: divide colostomy to prevent fecal contamination of the urinary tract. [1]

(c) [4 marks] — Award 1 mark per point:
• Length of the common channel: key prognostic factor. Channels < 3 cm are amenable to primary posterior sagittal reconstruction (PSARVUP). Channels > 3 cm often require abdominal access or vaginal replacement. [1]
• Urinary continence: highly dependent on sacral development and sphincter quality. Many require clean intermittent catheterization (CIC) long-term. [1]
• Gynecological function: reconstruct the vagina to allow menstrual outflow and future sexual function. [1]
• Multidisciplinary approach: long-term follow-up involving pediatric urology, pediatric surgery, gynecology, and psychology. [1]

COMMON ERRORS SEEN IN EXAMS:
• Failing to recognize hydrocolpos in a newborn with cloaca, which can cause ureteral obstruction and renal failure due to mechanical compression of the trigone.
• Performing a simple colostomy without checking for urinary retention or hydrocolpos.`,
        discriminators: [
          "Identifying hydrocolpos as a critical neonatal emergency that must be decompressed.",
          "Distinguishing management based on the common channel length (<3 cm vs. >3 cm)."
        ],
        commonErrors: [
          "Neglecting to evaluate or decompress a hydrocolpos in the newborn.",
          "Assuming normal urinary continence post-reconstruction."
        ]
      },
      {
        id: "ch14-E05",
        type: "LCV",
        difficulty: "DISTINCTION",
        title: "LCV 1 — Evolving Anorectal Malformation",
        questionText: `LONG CASE QUESTION 1 — Anorectal Malformation                 [Total: 35 marks]
Time allowed: ~40 minutes

─── STAGE 1: PRESENTATION ───────────────────────────────
A male infant is born at 39 weeks. Physical examination reveals an imperforate anus with no visible perineal fistula. Urinalysis performed at 12 hours of life reveals microscopic particles of meconium.

Q1a. Explain what the presence of meconium in the urine indicates, and list the urological anomalies you must immediately screen for. [5 marks]
Q1b. Formulate your neonatal surgical and medical management plan for this patient. [5 marks]

─── STAGE 2: INVESTIGATION RESULTS ──────────────────────
The patient undergoes a high-sigmoid loop colostomy on day 2. VACTERL screening is performed. Spinal ultrasound shows a normal conus medullaris. Echocardiogram is normal. Plain X-rays show a normal sacrum (sacral ratio 0.8) and normal vertebrae. At 6 months of age, prior to definitive pull-through surgery, a distal colostogram is performed by injecting contrast into the mucous fistula.

Q2a. Describe the purpose of a distal colostogram and how you would interpret the findings. [5 marks]
Q2b. The colostogram reveals a rectourethral bulbar fistula. Contrast the anatomy, surgical difficulty, and prognosis of a bulbar fistula with a rectoprostatic fistula. [5 marks]

─── STAGE 3: MANAGEMENT DECISION ────────────────────────
The child undergoes a Posterior Sagittal Anorectoplasty (PSARP) and ligation of the rectourethral bulbar fistula. A Foley catheter is placed intraoperatively and left in place.

Q3a. Justify the duration of catheter drainage post-operatively, and describe how you would verify healing before catheter removal. [5 marks]
Q3b. During the surgery, the rectal wall is found to be densely adherent to the posterior urethra. Outline your surgical steps to safely separate the tissues and avoid urethral injury. [5 marks]

─── STAGE 4: COMPLICATION / FOLLOW-UP ───────────────────
Three years after his PSARP, the child is undergoing toilet training. His mother reports that he strains to void, has a weak, spraying stream, and has suffered from two urinary tract infections. On exam, he has a palpable bladder.

Q4a. Identify the most likely urological complication, outline the diagnostic tests to confirm it, and discuss its management. [5 marks]`,
        markingGuide: `FULL MARKING GUIDE WITH MODEL ANSWERS

STAGE 1:
Q1a. [5 marks]
• Meconium in urine: Pathognomonic for a rectourinary fistula (rectourethral prostatic, bulbar, or rectovesical). [2]
• Associated anomalies to screen:
  - Renal agenesis/solitary kidney. [1]
  - Hydronephrosis (UPJO/UVJO). [1]
  - Vesicoureteral reflux (VUR). [1]

Q1b. [5 marks]
• Keep the patient nil per os (NPO) and start intravenous fluids. [1]
• Insert an orogastric tube for bowel decompression. [1]
• Perform a high-sigmoid loop colostomy on day 2 to divert feces and prevent sepsis/urinary contamination. [2]
• Initiate broad-spectrum antibiotics to prevent ascending UTI/urosepsis. [1]

STAGE 2:
Q2a. [5 marks]
• Purpose: The distal colostogram is the gold standard imaging study to identify the exact location of the rectourinary fistula. [2]
• Technique: Contrast is injected under pressure into the distal mucous fistula. [1]
• Interpretation: The height of the fistula relative to the pelvic floor/pubococcygeal line determines whether the anomaly is high, intermediate, or low, guiding the surgical approach. [2]

Q2b. [5 marks]
• Bulbar fistula: Enters the membranous/bulbar urethra. Low/intermediate anomaly, lower surgical risk, and excellent prognosis for fecal and urinary continence. [2]
• Prostatic fistula: Enters the prostatic urethra. High anomaly, more difficult dissection, higher risk of neurogenic bladder/urethral injury, and lower rate of fecal continence. [3]

STAGE 3:
Q3a. [5 marks]
• Duration: Foley catheter should remain in place for 5-7 days. [1]
• Justify: Allows the urethral suture line to heal in a dry environment, preventing urine extravasation and fistulization. [2]
• Verification: Perform a retrograde urethrogram (RUG) or voiding cystourethrogram (VCUG) around the catheter to confirm healing without extravasation before removal. [2]

Q3b. [5 marks]
• Safety wire/catheter: Verify that the urethral Foley catheter is palpable. [1]
• Dissection plane: Dissect strictly in the midline using the electrical stimulator (Peña muscle stimulator) to identify the sphincter center. [1]
• Direct visualization: Dissect under magnification; separate the rectum from the urethra by dissecting from the rectal side (using the submucosal rectal plane if needed). [2]
• Closure: Close the urethral defect with 5-0 or 6-0 absorbable suture without tension. [1]

STAGE 4:
Q4a. [5 marks]
• Diagnosis: Urethral stricture (at the site of fistula ligation) or urethral diverticulum. [1]
• Diagnostic tests:
  - Uroflowmetry with post-void residual. [1]
  - Retrograde Urethrogram (RUG) and VCUG (to visualize the stricture/diverticulum). [1]
  - Cystoscopy for direct visualization. [1]
• Management:
  - Stricture: Endoscopic urethral dilation or direct vision internal urethrotomy (DVIU) for short strictures; urethroplasty for long, recurrent strictures. [1]

MODEL ANSWER:
Meconium in the urine indicates a rectourinary fistula. Neonatal care requires NPO, IV fluids, antibiotics, and a colostomy. A distal colostogram at 6 months identifies the fistula location (e.g., bulbar vs. prostatic). The pull-through involves midline dissection guided by a Foley catheter. Catheter drainage is maintained for 5-7 days to allow urethral healing. A child presenting with straining and UTIs post-PSARP should be evaluated for a urethral stricture via RUG/VCUG, treated with dilation or urethroplasty.

DISTINGUISHING FEATURES OF AN EXCELLENT ANSWER:
• Explaining that a prostatic fistula is associated with poorer sphincter development and lower sacral ratios, leading to worse fecal and urinary continence compared to bulbar fistulas.
• Recommending a retrograde urethrogram around the catheter before removal to objectively confirm that the urethral repair is healed.
• Noting that the rectal stimulator is used to map the muscle sphincter complex, helping the surgeon keep the pull-through centered.`,
        discriminators: [
          "Comparing bulbar and prostatic fistulas in terms of sacral ratio and pelvic muscle quality.",
          "Recommending a cystogram/urethrogram before catheter removal to check for leaks.",
          "Explaining how the use of the Peña muscle stimulator assists in keeping the dissection strictly in the midline."
        ],
        commonErrors: [
          "Removing the urethral catheter early (within 48 hours), leading to urethrocutaneous fistula.",
          "Performing a rectal pull-through without a colostomy in a prostatic fistula."
        ]
      },
      {
        id: "ch14-E06",
        type: "EMQ",
        difficulty: "BOARD",
        title: "EMQ 1 — Fusion and Ectopia Anomalies",
        questionText: `EMQ 1 — Theme: Fusion and Ectopia Anomalies

OPTIONS (each option may be used once, more than once, or not at all):
A. Crossed Fused Renal Ectopia
B. Crossed Non-Fused Renal Ectopia
C. Horseshoe Kidney
D. Pelvic Kidney (Simple Ectopia)
E. Solitary Kidney (Renal Agenesis)
F. Supernumerary Kidney
G. Thoracic Kidney
H. Retroperitoneal Fibrosis
I. Duplicated Collecting System
J. Medullary Sponge Kidney

For each of the following clinical scenarios, select the single most appropriate option from the list above:

1. A 5-year-old child presents with a palpable midline lower abdominal mass. An ultrasound shows both kidneys are fused at their lower poles across the midline, with the parenchymal bridge lying anterior to the aorta.
2. A 2-year-old girl is found to have both kidneys on the right side of the abdomen. The left kidney's upper pole is fused to the right kidney's lower pole, and its ureter crosses back over the spine to insert into the left side of the bladder.
3. During a routine prenatal scan, the left renal fossa is found to be empty. Postnatal ultrasound reveals a small, rotated kidney located in the pelvis, superior to the urinary bladder. The contralateral kidney is normal.
4. A 10-year-old boy presents with left flank pain. A retrograde pyelogram shows a duplicated system, with the upper pole ureter presenting a classic "cobra-head" deformity in the bladder wall and causing hydronephrosis.
5. An asymptomatic 1-year-old child is found to have a kidney located in the posterior mediastinum on a chest radiograph performed for suspected pneumonia.`,
        markingGuide: `ANSWERS & RATIONALE:
1. C [Horseshoe Kidney] — Fusion of the lower poles across the midline is the classic horseshoe kidney configuration. The parenchymal bridge (isthmus) is typically trapped under the inferior mesenteric artery (IMA), which prevents further ascent.
2. A [Crossed Fused Renal Ectopia] — The location of both kidneys on one side with fusion (typically upper-to-lower pole) and a ureter that crosses back to insert normally on the contralateral side is pathognomonic.
3. D [Pelvic Kidney (Simple Ectopia)] — Simple ectopia is characterized by a kidney that fails to ascend but remains on its embryologically correct side of the body (unlike crossed ectopia).
4. I [Duplicated Collecting System] — A duplicated system with an ectopic upper pole ureter is often associated with a ureterocele, which displays the classic "cobra-head" (or spring-onion) sign on contrast imaging.
5. G [Thoracic Kidney] — Thoracic ectopia is the rarest form of renal ectopia, where the kidney ascends through the diaphragmatic foramen of Bochdalek into the posterior mediastinum. It is usually benign and asymptomatic.`,
        discriminators: [
          "Recognizing that the inferior mesenteric artery restricts the ascent of a horseshoe kidney.",
          "Distinguishing crossed fused ectopia from simple pelvic ectopia based on midline crossing of the ureter."
        ],
        commonErrors: [
          "Selecting Crossed Fused Ectopia for horseshoe kidney (horseshoe kidney is bilateral, not unilateral).",
          "Selecting Renal Agenesis for simple pelvic kidney."
        ]
      }
    ]
  }
];

fs.writeFileSync(OUT_FILE, JSON.stringify(essays, null, 2), 'utf8');
console.log(`Successfully generated essays database with ${essays.length} chapters.`);
