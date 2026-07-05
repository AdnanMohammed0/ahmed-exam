$base = "C:\Users\Adnan\Desktop\mmm"
Set-Location $base

# Remove old agent files
Remove-Item "$base\.opencode\agents\mcq-writer\*.md" -Exclude "template.md" -Force

# Book chapter slugs
$chapters = @(
    "ch01_embryology",
    "ch02_renal-development-dysfunction",
    "ch03_imaging",
    "ch04_prenatal-diagnosis",
    "ch05_urinary-tract-infection",
    "ch06_vesicoureteral-reflux",
    "ch07_upper-tract-obstruction",
    "ch08_duplication-ureteroceles-ectopic-ureters",
    "ch09_posterior-urethral-valves",
    "ch10_cystic-renal-disease",
    "ch11_urinary-tract-calculi",
    "ch12_urinary-incontinence",
    "ch13_neurogenic-bladder",
    "ch14_anorectal-malformations-renal-ectopia",
    "ch15_bladder-exstrophy-epispadias",
    "ch16_hypospadias",
    "ch17_the-prepuce",
    "ch18_testis-hydrocoele-varicocoele",
    "ch19_acute-scrotum",
    "ch20_disorders-of-sex-development",
    "ch21_genitourinary-malignancies",
    "ch22_pediatric-genitourinary-trauma",
    "ch23_laparoscopic-pediatric-urology",
    "ch24_adolescent-urology",
    "ch25_pediatric-adolescent-gynecology"
)

$template = Get-Content "$base\.opencode\agents\mcq-writer\template.md" -Raw

foreach ($s in $chapters) {
    $content = $template -replace "{slug}", $s
    Set-Content -Path "$base\.opencode\agents\mcq-writer\$s.md" -Value $content
}

Write-Output "Created $($chapters.Count) agent files"
