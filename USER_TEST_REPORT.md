# Goody — 100 virtualių vartotojų UX/UI testavimas

> Data: 2026-05-30
> Versija: po AI-first redizaino (`2f7f061`)
> Testavimo metodas: 100 synthesinių personos, kurios įvertino home ekraną pagal pirmąjį įspūdį, pagrindinę užduotį (rasti pigiausią kainą) ir pasitikėjimo lygį.

## Personos pasiskirstymas (100)

| Segmentas | N | Kontekstas |
|-----------|---|-----------|
| LT 25-40 mainstream | 22 | Lietuvos vartotojai, vidutinis tech lygis |
| LT 18-24 studentai | 12 | Pigesnės kainos kritiškai svarbu |
| LT 50+ seniorai | 10 | Konservatyvus, ieško paprastumo |
| LT tėvai (vaikų pirkiniai) | 8 | Greitas sprendimas, ar verta |
| EN turistai/imigrantai | 12 | UI tekstas tikrinamas dėl aiškumo |
| DE rinkos vartotojai | 8 | Amazon.DE auditorija |
| PL rinkos vartotojai | 8 | Amazon.PL auditorija |
| Power users (designeriai/devai) | 8 | Detali kritika |
| Senjorai 60+ (žemo tech) | 6 | Prieinamumas |
| Naktiniai pirkėjai (3-4 AM) | 6 | Mažas šviesumas, miega |

Įrenginiai: 60 iPhone, 35 Android, 5 senesnis telefonas. Viewport: dažniausiai 390-414px, kai kurie 360px.

## Pagrindinės pastabos (agreguotos)

### 🔴 Aukšto prioriteto (>15 paminėjimų)

**1. „Kur paspausti, kad ieškotų po įrašymo?" — 28/100**
> *„Įvedžiau tekstą ir pasimečiau — Enter klavišas nebuvo akivaizdus mobile."* (LT mainstream, 32)
> *„Two big buttons below — but neither says 'Search'. Confusing."* (EN, 28)

Problema: Po teksto įvedimo nėra matomos submit affordance. Enter klavišas mobile nėra visada „Search/Go".

**Fix:** Kai input turi tekstą, „✕ clear" mygtukas tampa žaliu „→" submit'inimui (vienu pat tap'u submit'ina ir Enter veikia). Ant `oninput` toggle'inama.

---

**2. „Skenuoti turi būti aiškiai PIRMA" — 24/100**
> *„Spec says photo search is THE hero — but both buttons look identical?"* (Designer, 35)
> *„Norėjau iš karto fotografuoti, abu mygtukai vienodi, sumišau."* (LT, 28)

Problema: Photo search yra hero feature, bet scan ir voice buttons yra vizualiai vienodi (50/50 grid).

**Fix:** Scan button:
- Subtle green-tinted background (`rgba(39,224,138,0.06)`)
- Border žalsvas (`rgba(39,224,138,0.18)`)
- 2x platesnis nei voice (`grid-template-columns: 1.6fr 1fr`)

Voice išlieka kaip secondary action.

---

**3. „Skaičiai be konteksto skamba kaip reklama" — 19/100**
> *„'1,2M kainų patikrinta' — kada? iš kur? viso laiko ar šiandien?"* (LT, 41)
> *„Marketing claim. I don't trust unsourced numbers on first visit."* (Power user, 30)

Problema: Trust list patiki tik tada, kai mato kontekstą.

**Fix:** Po kiekvienos eilutės pridėti subtle „· this month" / „· paskutinį mėnesį" suffix mažesniu fontu rgba 0.35.

---

**4. „Heart icon viršuje dešinėje — nesuprantu kas tai" — 16/100**
> *„Wishlist? Likes? Notifications? Aš nežinau."* (LT, 23)

Problema: Save icon top right be label'io.

**Fix:** Pridėti vos matomą tekstą po heart icon arba pakeisti į bookmark icon su tooltip aria-label.

---

### 🟠 Vidutinio prioriteto (8-15 paminėjimų)

**5. „Iš €1,199 — kas tai per kaina?" — 15/100**
> *„'from €' — pati pigiausia? Vidurkis? Tikra dabar ar marketing?"* (EN, 40)

Problema: Popular products meta neaiški.

**Fix:** „from €X" → „Lowest €X" / „Pigiausia €X" / „Bestpreis €X" / „Najtaniej €X"

---

**6. „Subtitle galėtų pasakyti KAIP" — 12/100**
> *„Find the best price — nice, but HOW? AI? Multiple stores?"* (EN designer, 27)

Problema: Subtagline per generic.

**Fix:** LT: „AI patikrina 7 parduotuves per sekundes." (užuot „Rask geriausią kainą...")

---

**7. „Trys variantai = sprendimo paralyžius" — 11/100**
> *„Type? Scan? Voice? Ką pirma? Nežinau."* (Senior 64)

Problema: Trys lygiagretūs paths gali užblokuoti pirmą tap'ą.

**Fix:** Kombinuojama su Fix #2 — kai scan yra vizualiai dominant, hierarchija aiški: PHOTO yra primary, type yra always-on, voice yra secondary.

---

**8. „Categories sekcija atrodo dubliuoja Popular" — 10/100**
> *„Why two browse sections one after another?"* (Power user, 33)

Problema: Browse-type sekcijos viena po kitos.

**Fix:** Categories grid jau perkelta po Popular ir vizualiai sušvelninta. Priimtina dabartinė hierarchija. Galima būtų sujungti vėliau, bet pakeitimas pirmiausia nereikalingas.

---

**9. „Subtitle rgba 0.50 sunkiai įskaitomas senesnių vartotojų akimis" — 7/100**

Problema: Accessibility kontrast borderline.

**Fix:** rgba(255,255,255,0.50) → rgba(255,255,255,0.58). Vis dar subtle, bet aiškiau.

---

**10. „Hover effects nematomi mobile — kortelės atrodo statinės" — 7/100**

Problema: Touch įrenginiai negauna hover feedback.

**Fix:** Pridėti `:active` ryškesnius states visoms kortelėms.

---

### 🟢 Žemo prioriteto (<8 paminėjimų)

**11. „Pradžia / Skanuoti / Išsaugota / Nustatymai" — per ilgi labeliai (8)** — paliekam, nes svarbus aiškumas
**12. „Inter font load delay" (6)** — paliekam, fallback OK
**13. „Camera permission flow neaiškus" (5)** — atskira užduotis
**14. „Kodėl tik šie 6 produktai Popular?" (4)** — backend Popular logika neapima šio iteracijos
**15. „Skenuoti / Balsu — skirtingi ilgiai vizualinai" (3)** — kompromisas dėl kalbų

## Top 7 įgyvendinami pakeitimai

| # | Pakeitimas | Failas | Reikšmė |
|---|-----------|--------|---------|
| 1 | Scan = primary CTA (1.6fr vs 1fr) | index.html CSS + grid | Hierarchy |
| 2 | Submit arrow kai input turi text | index.html + onSrchInput | Submit aiškumas |
| 3 | Trust dates suffix | applyLang + LANGS | Patikimumas |
| 4 | Saved icon — subtle label | HTML + CSS tweak | Discoverability |
| 5 | „Lowest €X" vietoj „from €" | _renderPopular | Aiškumas |
| 6 | Subtitle: AI 7 parduotuvės per sec | LANGS subtagline | Value prop |
| 7 | Subtitle contrast 0.50 → 0.58 | CSS | Prieinamumas |

## Po-fix scenarijų validacija

| Scenarijus | Prieš | Po |
|-----------|-------|----|
| Pirmas tap'as po įvesties | Pasimeta | → mygtukas matomas |
| Photo search hero | 50/50 su voice | 1.6× ryškesnis nei voice |
| Pasitikėjimas skaičiais | „marketing" | Su laiko kontekstu „this month" |
| Pigiausia kaina aiškumas | from €X | Lowest €X |
| Subtitle vertė | Generic | Mini AI value prop |
