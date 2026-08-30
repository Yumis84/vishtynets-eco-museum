# Legacy media inventory — verified migration pass

Updated: 2026-08-28

This file tracks the image / credit layer of migration from `www.wystynez.ru`.

## Rules
- Preserve exact legacy media URLs whenever extracted from the source page.
- Page-level `Фото:` credits remain page-level unless the source explicitly assigns an individual image.
- `cache_miss` means the URL was verified in source HTML but binary retrieval failed; it is not proof that the URL is dead.
- A legacy batch/inventory row is never proof of public publication.
- Before creating a public page, check the actual `main` repository for an existing representation.
- For each material distinguish: source captured / metadata saved / public page exists / public link verified.

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
- Source verified: **25 August 2018**; more than 800 participants.
- Page-level photo credit: **Юлия Алексеева, Татьяна Поломодова, Амаль Самерханова, Светлана Никирина**.
- **42 exact media URLs** captured from the primary page HTML and stored in `data/legacy-media-Prazdnik--SOSEDI----2018.json`.
- Public page now presents the photographs in contextual groups between text sections and uses the common fullscreen lightbox/swipe viewer.
- Exact press-release/program file targets remain unresolved; no link is invented.

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
- **13 exact media URLs** recovered from the primary source and stored in `data/legacy-media-p0116.json`.
- Media are integrated contextually; no URLs or individual credits were invented.

### `p31.htm` — открытие передвижной экспозиции, 2004
- Public page `p31.html` exists in `main`.
- Primary source verified: `https://wystynez.ru/p31.htm`.
- Event date: **22 May 2004**, Museum of Kristijonas Donelaitis, Chistye Prudy.
- Exact legacy media URLs captured: **12** and stored in `data/legacy-media-p31.json`.
- Page-level photo credit: **В. Гусев, Э. Барсуков**.
- No individual photographer assignment was inferred.
- The page preserves the historical exposition story, 160 exhibits, partners, project support and acknowledgements; current visitor information is not inferred from the 2004 source.

### `p0088.htm` — «Каменные истории», 2015
- Public page `p0088.html` exists in `main`.
- Primary source verified.
- Exact legacy media URLs captured: **8** and stored in `data/legacy-media-p0088.json`.
- The existing current-site route `Каменные истории` is not duplicated by another route/page.

### `p0106.htm` — «Неизвестный Виштынец или по дороге к чуду»
- Public page `p0106.html` exists in `main`.
- Primary source verified.
- Exact legacy media URLs captured: **10** and stored in `data/legacy-media-p0106.json`.
- Existing related `unknown-vishtynets` materials were checked before publication; no duplicate page was created.

### `p84.htm` — «Виштынецкие сокровища гномов»
- No separate `p84.html` is required.
- The source is already represented publicly by the existing `gnome-treasures-project` article with the exact legacy URL `https://www.wystynez.ru/p84.htm`.
- Do not create a duplicate legacy page unless the public representation is later shown to be incomplete.

### `p92.htm` — образовательная программа «Виштынецкие сокровища гномов»
- Public page `p92.html` exists in `main`.
- Primary source verified; exact legacy media URLs are still unresolved.
- Illustration and photo credits are preserved as page-level metadata; no image URL is invented.

### `p33.htm` — Кристионас Донелайтис
- Public page `p33.html` exists in `main`.
- Primary source verified; exact legacy media URLs are still unresolved.
- Page-level photo credits are preserved; no image URL is invented.

## Archive index

### `p0008.htm` — «Архив наших событий»
- No separate `p0008.html` is to be created.
- The current site already provides the archive as structured **Хронология музея** in `menu-v3.js`.
- Individual detail pages are migrated only when a genuine public gap is demonstrated.

## Totals
- Verified source/detail materials represented publicly or through an existing public article: **13+**.
- Exact legacy media URLs captured in the tracked media layer: **at least 129**.
- The total includes the newly recovered **42** URLs for `Prazdnik--SOSEDI----2018` and **13** for `p0116`.
- Pages with explicit page-level photo credits preserved: all migrated pages where the source provides them.

## Remaining media / migration queue
1. Media recovery for `p33.htm` and `p92.htm`.
2. Media/provenance audit for other verified legacy pages.
3. `rominten.wystynez.ru` historical-site capture/relevance audit.
4. Original maps / graphics with incomplete provenance.
5. PDF/document inventory and unresolved press-release/program targets.
6. Dead-link / redirect audit.
7. Encoding / garbled-text audit.
8. Final KEEP / MIGRATE / SKIP / DEFER matrix.
9. Final public-site mobile QA, including contextual galleries and fullscreen viewer.
