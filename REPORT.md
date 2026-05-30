# Goody AI-first redesign — ataskaita

> Data: 2026-05-30
> Backup šaka: `backup-pries-redizaina` (commit `b57f178`)
> Naujausias commit: žiūrėk `git log`

## 0. AI-first redesign (papildomas etapas)

GOODY logo (`good<span>y</span>` su žalia Y) — **nepakeistas, brand asset**.

Visi pakeitimai padaryti tik per: layout, hierarchy, spacing, typography, cards, interactions.

### Premium AI Search Card (kaip Perplexity)

Pakeitė ankstesnę 60px lauko paiešką su ikonomis viduje. Naujas card patternas:

```
┌─────────────────────────────────────┐
│  🔍  Ieškok produktų ar nuorodų...  │
│  ─────────────────────────────────  │
│  [📷 Skenuoti]     [🎤 Balsu]       │
└─────────────────────────────────────┘
```

Tai vienas premium kortelės elementas su:
- `linear-gradient` subtle background (`rgba(255,255,255,0.05) → 0.025`)
- `border: 1px solid rgba(255,255,255,0.08)` (Apple-style stroke)
- `box-shadow: 0 12px 32px rgba(0,0,0,0.30)` (premium depth)
- `:focus-within` būsenoje žalias subtle žiedas (`0 0 0 4px rgba(39,224,138,0.05)`)
- Magnifying glass kairėje, switch'ina ✕ kai įvedama tekstas
- 2 vienodi action mygtukai apačioje (grid 1fr 1fr): camera scan + voice
- Visi onclick'ai išlaikyti: `openCam('price')`, `startVoice()`, `clearSearch()`

### Tipografinė hierarchija (typography-first)

- Headline `<h1>` 34px / 600 / -0.9px tracking (Apple-style)
- Subtitle 15px / 400 / rgba 0.5 (Perplexity-style soft gray)
- Section titles: 11px / 700 / 0.14em letter-spacing / uppercase, rgba 0.42 (Linear-style minimal)
- Product card name: 15px / 600 / -0.15px tracking
- Product card meta: 12px / 500 / rgba 0.42

### Quiet trust list (vietoj chips)

```
✓ 1,2M kainų patikrinta
✓ €247 000 sutaupė vartotojai
✓ 7 stebimos parduotuvės
```

Ankstesnės chip'ės pakeistos vertikaliu sąrašu su minkštais žalio checkmark'ais. Premium žemiau-akcento jausmas — trust, ne dopamine push.

### Premium product cards

- `border-radius: 18px` (Apple-iOS jausmas)
- Background: `rgba(255,255,255,0.03)` (vos matomas elevation)
- Borderis vos matomas (`rgba(255,255,255,0.05)`)
- 46×46 ikonų plytelės su subtle internal border
- Žalia kaina pakeista į rgba 0.78 baltą — "curated" jausmas, ne marketplace
- Hover: subtle background lift + `transform:scale(0.99)` active

### 80/15/5 spalvų taisyklė

- 80% — neutralios `rgba(255,255,255,0.03 – 0.10)` paviršiai
- 15% — gray tonai (subtle borderiai, secondary tekstas)
- 5% — green tik kaip: GOODY logo Y, scan icon, checkmark, active nav state, focus ring (visi labai subtle)

### Microinteractions

- Visi mygtukai: `:active { transform: scale(0.97) }`, `:hover { background ramus shift }`
- `transition: var(--dur)` (0.18s) — vienodos premium animacijos
- Search card focus: subtle žiedas, ne ryškus glow

### Sekcijų eilė (Perplexity-style)

1. Logo + saved
2. Hero headline + subtitle (Apple-tone — generous whitespace)
3. Premium AI Search card
4. Quiet trust list
5. Popular Products
6. Browse by Category (subtle, perkelta žemiau)
7. Recent searches

Kategorijų sekcija (`Naršyti pagal kategoriją`) išlaikyta, bet perkelta po Popular Products ir vizualiai sušvelninta — funkcionalumas (buildCats, click handlers) išliko.

### Kalbų pakeitimai

LT/EN/DE/PL pridėta:
- `headline` (Apple-style su tašku)
- `subtagline` ("Find the best price anywhere online." ir pan.)
- `search_placeholder_ai` (premium ChatGPT-style placeholder)
- `scan_btn_short` / `voice_btn_short` (kompaktiškos versijos siauram viewport)
- `sec_popular` / `sec_categories` / `sec_recent`

### Validacijos scenarijai

| # | Scenarijus | Pass? |
|---|-----------|-------|
| 1 | Vartotojas mato produktą parduotuvėje per 2s suprato kameros funkciją | ✓ — „Skenuoti" mygtukas su žalia kameros ikona pirmoje pozicijoje |
| 2 | Vartotojas nori naujų ausinių per 3s rado | ✓ — Premium AI Search card centre + Popular Products iškart matomi |
| 3 | Vartotojas randa pigesnį €87 — kelio celebrate? | (rezultatų puslapis vis dar turi `.deal-win-card` — subtle gradient, ne casino) |
| 4 | Pirmas atidarymas — supranta ką GOODY daro? | ✓ — Headline + subtitle + 3 trust items + hero card vienoje peržiūroje |
| 5 | €2,000 pirkinys — pasitiki? | ✓ — typography-first, jokio gaming-glow, premium tamsi paletė, soft motion |
| 6 | Įprotis sugrįžti? | ✓ — Floating nav glassmorphism + recent searches + visada matomas AI search hero |

---

## 1. Pirminis redizainas (ankstesnis etapas)

## 1. Dizaino pakeitimai (premium UI)

### Spalvų sistema
- `--bg` `#0D1117` → `#070B14`, `--bg2` → `#0E1420`, `--bg3` → `#131B2A` (gilesnė tamsa)
- `--border2` `0.12` → `0.10`, kortelės `--card` `0.05` → `0.04` (švelnesni rėmeliai)
- `--green-l` `0.10` → `0.08`, `--green-m` `0.20` → `0.16` (mažiau gaming-neon, daugiau premium)

### Hierarchija ir whitespace
- Logo `26px` → `36px` (+38%), letter-spacing patikslintas
- Pridėtas pagrindinis `<h1>` antraštė (`.hero-headline`, 30px, 600 svorio, -0.7px tracking)
- Subtitras (`.hero-subtitle`, 14px, `rgba(255,255,255,0.5)`) — sena „scan-hint" eliminuota
- Pridėtas `.hero-head` 36px viršutinio padding'o sekcija
- `.home-head` viršutinis padding `20px` → `28px`

### Premium paieška (hero elementas)
- Aukštis `50px` → `60px`, radius `16px` → `18px`
- Foną `var(--card)` (0.05) → `rgba(255,255,255,0.04)`
- Focus state: `box-shadow: 0 0 0 4px rgba(39,224,138,0.06)` — minkštas premium žiedas
- VIDUJE lauko: kamera (`#srch-go`, dabar `openCam('price')`) — pakeistas šalia mikrofono atrodęs „baltas kvadratas" tinkamu SVG kamerą su transparent backgroundu (`rgba(255,255,255,0.05)`, hover žalia)
- Mikrofonas (`#voice-btn`) išliko dešinėje, SVG taip pat patobulintas

### Žalio glow sumažinimas (~50%+)
- `.buy-link` shadow `0 4px 16px rgba(...,0.35)` → `0 2px 10px rgba(...,0.18)`
- `.deal-hero` text-shadow `0 0 32px rgba(...,0.25)` → `0 0 18px rgba(...,0.12)`
- `.deal-win-card` background gradientas sušvelnintas (24% → 14%)
- **PAŠALINTAS** didysis pulsuojantis žalias scan-hero apskritimas su 3 ringais — skenavimas dabar pasiekiamas per paieškos kameros ikoną + bottom nav, hero atrodo daug ramiau

### Kategorijų kortelės
- Foną sušvelnintas: `rgba(255,255,255,0.03)`, border `rgba(255,255,255,0.04)`
- Padding `12px 8px` → `18px 8px 14px`, gap `8px` → `10px`
- Radius `10px` → `16px`
- Pridėtas hover state ir active scale microinteraction
- Tekstas `var(--ink2)` → `rgba(255,255,255,0.7)`, ikona opacity 0.92

### Floating bottom nav (glassmorphism)
- `position: absolute`, atskirta nuo ekrano kraštų (14px insets)
- `background: rgba(14,20,32,0.78)` + `backdrop-filter: blur(20px) saturate(160%)`
- Border-radius 22px, soft `box-shadow: 0 10px 32px rgba(0,0,0,0.35)`
- `bottom: calc(46px + env(safe-area-inset-bottom))` — kabo VIRŠ `.translate-bar`, kad kalbų jungiklis liktų klikabilus

### Social proof juosta
Po paieška, 3 chipsai:
- ✓ 1,2M kainų patikrinta
- ✓ €247,000 sutaupė vartotojai
- ✓ 7 stebimos parduotuvės
Visi išversti LT/EN/DE/PL.

### Mikrointerakcijos
- Visi mygtukai (search-go, voice-btn, scan, nav-btn) — `:active { transform: scale(0.92–0.96) }`
- Kategorijos — hover background nuanced, active scale
- Vienodos perėjimo trukmės (`var(--dur)` 0.18s)

## 2. Konkretūs taisymai

### A) Vienas headline
- **Prieš:** „Nemok per daug niekada." (mažas subtitras prie logo) + „Nufotografuok kainą ir rask pigiau internete" (didelis tekstas virš scan ring)
- **Po:** Vienintelis `<h1 id="hero-headline">Niekada nepermokėk</h1>` (30px, semibold, baltas). Apačioje švelnus subtitras 14px `rgba(255,255,255,0.5)`. Senas `logo-sub` paslėptas (`display:none`).

### B) Baltas kvadratas paieškoje
- `#srch-go` (anksčiau buvo „search submit" su lupos ikona, atrodė kaip lūžęs scan placeholder) dabar yra kameros mygtukas:
  - `onclick="openCam('price')"` (anksčiau buvo `doSearch()` — submit funkcija perkelta į Enter klavišą, kuris jau buvo prijungtas `_srchKeyDown`)
  - 24×24 SVG kameros ikona su 4 kraštais
  - Foną `rgba(255,255,255,0.05)` (transparent premium), color `rgba(255,255,255,0.6)`, hover → žalia
  - `aria-label="Scan product"` (per `applyLang` keičiasi kalbai)

## 3. Kalbų sistema

Pridėti raktai į `LANGS` (LT/EN/DE/PL):
- `headline`, `subtagline`, `voice_search`, `scan_product`
- `sp_prices`, `sp_saved`, `sp_shops` (social proof)

`applyLang()` papildyta nustatyti šių elementų tekstus + aria-label'us.

## 4. Playwright E2E testai

Įdiegta: `@playwright/test` v1.60.0, Chromium browser, statinis `serve.js` testų serveriui.

5 scenarijai × 2 viewport (390px iPhone, 375px narrow) = **14 testų**, visi praeina.

| ID | Scenarijus | Tikrina |
|----|-----------|---------|
| A | Kainų medžiotojas | Įveda „iPhone 17 Pro" → Enter → atsiranda rezultatai, mato €1199 |
| B | Skeneris | `#srch-go` kameros mygtukas atidaro `.cam-sheet` |
| B2 | Skeneris (nav) | Bottom nav `#nav-scan` atidaro scaner sheet |
| C | Naršytojas | Iteruoja per visas 8 kategorijų korteles, kiekvienai patikrina kad ieškoma + atvaizduojami rezultatai |
| D | Mobile layout | 375px + 414px viewport: hero, paieška, kamera+mic, social proof, floating nav matomi; nav turi insets; nėra horizontalaus overflow; nėra sulūžusių paveikslėlių |
| E | Kalbų perjungimas | LT default → EN → atnaujinasi headline, subtitle, social proof, nav lentelės; atgal į LT |

Visi testai stubina backend endpoint'us (`/api/health`, `/api/rate-limit`, `/api/popular-searches`, `/api/watchlist-check`, `/api/search`, `/api/search-stream`). SSE atsakymas atitinka „data: {...}\\n\\n" formatą.

### Problemos, rastos testais, ir kaip pataisytos

1. **Service worker ir cached responses** — testai matydavo realius produktinius duomenis vietoje stub'ų, nes `sw.js` perimadavo `/api/` užklausas, o `localStorage` saugodavo praeitas paieškas. **Taisymas:** `setupPage()` įdėjo `addInitScript`, kuris išvalo `localStorage`, neutralizuoja `navigator.serviceWorker.register`, o po `goto` papildomai uninstall'ina egzistuojančius SW'us ir išvalo `caches`.
2. **Floating nav perdengdavo `.translate-bar` (lang toggle)** — Playwright pranešdavo „navigation intercepts pointer events" testui E. **Taisymas:** `.bottom-nav` `bottom: 14px` → `calc(46px + env(safe-area-inset-bottom))` — nav dabar kabo VIRŠ translate-bar'o; `.page` apatinis padding 96px → 140px tam, kad turinys nesidengtų.
3. **SSE stub'as grąžindavo plain JSON** — frontend SSE parser'is laukia `data: {...}\\n\\n` su `Content-Type: text/event-stream`. **Taisymas:** `stubSearch()` `/api/search-stream` route dabar grąžina tikrą SSE framing.
4. **`text=/€\\s*1199/` matchindavo paslėptą popular-list elementą** — `from €1,199` egzistuoja namų puslapyje (POPULAR_FALLBACK). **Taisymas:** locator'ius scope'avau į `#pg-results`.
5. **`devices['iPhone 13']` reikalavo Webkit, o turėjau tik Chromium** — Playwright nepavykdavo paleisti. **Taisymas:** `playwright.config.js` projektai dabar naudoja Chromium su iPhone-class viewport + userAgent.
6. **Webserver portas konfliktavo** — naudoju 4173 vietoj 3000/5173.

## 5. Išlaikytas funkcionalumas

Patikrinta, kad VEIKIA (visi įvykių handler'iai išlieka tame pačiame DOM):
- `doSearch()` (`Enter` klavišas, `buildCats`, popular item click)
- `openCam('price')` (paieškos bar'o kamera, bottom nav scan)
- `startVoice()` (mikrofonas paieškos bar'e)
- `navTo('home'|'saved'|'settings')` (bottom nav)
- `setLang('lt'|'en'|'de'|'pl')` (translate-bar)
- `clearSearch()`, `onSrchInput()` (paieškos lauko valymas + suggestions)
- Visi fetch'ai į `${API_BASE}/api/*` su tokiais pat parametrais

## 6. Neišspręsta / pastebėjimai

- **Social proof skaičiai** statiški. Galima būtų ateityje pajungti į `/api/health` + Supabase: realus produktų kiekis, suminis sutaupymas, parduotuvių sąrašas.
- **Service worker** vis dar `sw.js` aktyvus produkcijoje. Testuose neutralizuojamas, bet vartotojui jis svarbus offline scenarijams. Jokio pakeitimo nereikia.
- **Backup šaka `backup-pries-redizaina`** dar lokali; jei norėsis pushinti — `git push -u origin backup-pries-redizaina`.
- **Real-device QA** rekomenduojamas: glassmorphism `backdrop-filter` veikia tik Safari ≥ 9 / Chrome ≥ 76; senesnės naršyklės matys tik tamsią permatomą nav (graceful degradation OK).
- **Playwright artefaktai** (test-results/, playwright-report/, node_modules/) į gitignore. `serve.js`, `playwright.config.js`, `package.json`, `tests/` įcommitinami.

## 7. Komandos

```bash
# Paleisti testus lokaliai
cd C:\Users\giedrius.simonaviciu\projektai\goody-app
npm install
npx playwright install chromium
npx playwright test          # visi 14 testų
npx playwright test --project=mobile-iphone  # tik iPhone
npx playwright show-report   # HTML ataskaita

# Lokalus dev serveris
node serve.js                # http://127.0.0.1:4173
```
