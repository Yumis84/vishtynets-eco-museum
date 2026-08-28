# Legacy media inventory — verified migration pass

Updated: 2026-08-28

This file tracks the image / credit layer of migration from `www.wystynez.ru`.

## Rules
- Preserve exact legacy media URLs whenever extracted from the source page.
- Page-level `Фото:` credits remain page-level unless the source explicitly assigns an individual image.
- `cache_miss` means the URL was verified in source HTML but binary retrieval failed; it is not proof that the URL is dead.
- A legacy batch/inventory row is never proof of public publication.
- Before creating a public page, check the actual `main` repository for an existing representation.

## Verified public/detail materials

### `p0117.htm` — Проект «В гости к камню`
- Exact media URLs captured: **14**.
- Page-level photo credit: **А. Соколов**.
- Interactive-map destination verified as `https://wystynez.ru/p0121.htm`; old implementation is not copied.

### `p38.htm` — «Птицы Красного леса»
- Exact media URLs captured: **8**.
- Author: **Игорь Шелякин**.
- Page-level image credit: **Cliparts, Dinamite SoftWare Group, 2003**.

### `p0109.htm` — «Неизвестный Виштынец» / opening 2019
- Exact media URLs captured: **4**.
- Page-level photo credit: **Юлия Алексеева**.

### `p0125.htm` — «Соседи — 2023`
- Exact media URLs captured: **20**.
- Page-level photo credits: **Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо**.
- Related programme page: `https://wystynez.ru/p0126.htm`.

### `p48.htm` — Виштынецкая возвышенность на карте мира
- Public page `p48.html` exists in `main`.
- Historical image URLs and source attribution preserved; old interactive mapping not copied.

### `p0122.htm` — результаты проекта «В гости к камню»
- Public page `p0122.html` exists in `main`.
- Exact brochure verified: `https://wystynez.ru/download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf` (9 pages).
- Cover: `https://wystynez.ru/sc-pic/i2211.jpg`.
- Page-level photo credit: **В. Лукошевичус, А. Володина, А. Соколов**.

### `Prazdnik--SOSEDI----2018.htm` — «Соседи» 2018
- Public page `Prazdnik--SOSEDI----2018.html` exists in `main`.
- Source verified: 25 August 2018; more than 800 participants.
- Page-level photo credit: **Юлия Алексеева, Татьяна Поломодова, Амаль Самерханова, Светлана Никирина**.
- Representative exact media: `https://wystynez.ru/sc-pic/i1549.jpg`, `https://wystynez.ru/sc-pic/i1542.jpg`.
- Remaining image URLs and exact press-release/program targets are still recovery work.

### `p0108.htm` — встреча 26.09.2018, «Неизвестный Виштынец`
- Public page `p0108.html` exists in `main`.
- Primary source verified: `https://wystynez.ru/p0108.htm`.
- Source date: **26 September 2018**.
- Page-level photo credit: **Юлия Алексеева, Александр Самсонкин**.
- Exact source media URLs captured: **8**.
- Individual photographer/caption assignments are intentionally not inferred.

### `p0116.htm` — разведчики «Максим» / «Джек» и открытие мемориала
- Public page `p0116.html` exists in `main`.
- Primary source verified: `https://wystynez.ru/p0116.htm`.
- Source event date: **17 July 2020** for the memorial opening.
- Page-level photo credit: **Татьяна Поломодова**; historical object photograph credit: **Айтель Ланге**.
- `data/legacy-media-p0116.json` currently contains **no exact image URLs**; therefore no image URLs were invented during page migration.
- The public page preserves the historical narrative, source references, memorial project context, participants and credits while explicitly marking the missing media extraction as pending.

### `p31.htm` — открытие передвижной экспозиции, 2004
- Public page `p31.html` now exists in `main`.
- Primary source verified: `https://wystynez.ru/p31.htm`.
- Event date: **22 May 2004**, Museum of Kristijonas Donelaitis, Chistye Prudy.
- Exact legacy media URLs captured: **12** and stored in `data/legacy-media-p31.json`.
- Page-level photo credit: **В. Гусев, Э. Барсуков**.
- No individual photographer assignment was inferred.
- The page preserves the historical exposition story, 160 exhibits, partners, project support and acknowledgements; current visitor information is not inferred from the 2004 source.

## Totals
- Verified source/detail pages represented publicly: **10**.
- Exact legacy media URLs captured for these tracked pages: **at least 74**; `p0116` adds none until exact URLs are recovered.
- Pages with explicit page-level photo credits preserved: **10**.

## Next media / migration queue
1. Remaining media URLs for `Prazdnik--SOSEDI----2018.htm`.
2. `p0116.htm` exact media extraction, if source HTML/binary access permits; do not invent URLs.
3. `rominten.wystynez.ru` historical-site capture/relevance audit.
4. Original maps / graphics with incomplete provenance.
5. Media from `p33.htm`, `p92.htm` and other verified legacy pages.
6. PDF/document inventory.
7. Dead-link/redirect audit.
8. Final KEEP/SKIP/DEFER matrix.
