# Legacy media inventory — first verified pass

Updated: 2026-08-28

This file tracks the image / credit layer of migration from `www.wystynez.ru`.

## Rules

- Preserve the exact legacy media URL whenever it can be extracted from the source page.
- A page-level line such as `Фото: ...` is stored as a **page-level credit**. It is not silently assigned as the individual photographer of every image unless the source explicitly makes that association.
- Captions inferred only from nearby HTML order are marked as pending visual confirmation.
- `cache_miss` means the legacy URL itself is verified from the source HTML, but the current crawler could not fetch the binary image. It does **not** mean the URL was invented or proven dead.
- Decorative / partner / navigation graphics are kept distinct from content photographs where possible.
- A migration batch/inventory row is not proof that a public page exists. Public publication must be verified against the actual product repository/site.

## Machine-readable files

- `data/legacy-media.json`
- `data/legacy-media-batch-2.json`

## Current captured media URLs

### `p0117.htm` — Проект «В гости к камню»
- Exact media URLs captured: **14**.
- Page-level photo credit: **А. Соколов**.
- Exact interactive-map destination is verified as `https://wystynez.ru/p0121.htm` from the source-page link.

### `p38.htm` — «Птицы Красного леса»
- Exact media URLs captured: **8**.
- Author: **Игорь Шелякин**.
- Page-level image credit: **Cliparts, Dinamite SoftWare Group, 2003**.

### `p0109.htm` — «Неизвестный Виштынец» / opening 2019
- Exact media URLs captured: **4**.
- Page-level photo credit: **Юлия Алексеева**.

### `p0125.htm` — «Соседи — 2023»
- Exact media URLs captured: **20**.
- Page-level photo credits: **Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо**.
- Related programme page: `https://wystynez.ru/p0126.htm`.

### `p48.htm` — Виштынецкая возвышенность на карте мира
- Public page `p48.html` is present in `main`.
- Historical image URLs and source attribution are preserved.
- Old interactive mapping is intentionally not copied.

### `p0122.htm` — презентация результатов «В гости к камню»
- Public page `p0122.html` is present in `main`.
- Exact brochure target verified: `https://wystynez.ru/download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf`.
- Brochure: 9-page PDF; cover: `https://wystynez.ru/sc-pic/i2211.jpg`.
- Legacy page-level photo credit: **В. Лукошевичус, А. Володина, А. Соколов**.
- Old interactive boulder-map implementation is not copied.

### `Prazdnik--SOSEDI----2018.htm` — «Соседи» 2018
- Public page `Prazdnik--SOSEDI----2018.html` is now present in `main`.
- Primary source verified: 25 August 2018 event; more than 800 participants.
- Page-level photo credit: **Юлия Алексеева, Татьяна Поломодова, Амаль Самерханова, Светлана Никирина**.
- Representative source media URLs verified: `https://wystynez.ru/sc-pic/i1549.jpg`, `https://wystynez.ru/sc-pic/i1542.jpg`.
- The legacy page contains many additional image references; full image URL inventory remains a separate media-recovery task and is not claimed complete.
- Legacy page references separate «Пресс-релиз и программа праздника» materials; exact target URLs remain unresolved and are not invented.

## Totals in this pass

- Source pages with exact media URL extraction: **7**.
- Exact legacy media URLs captured: **at least 54**.
- Pages with preserved explicit page-level credits: **7**.

## Next media queue

1. Extract remaining media URLs for `Prazdnik--SOSEDI----2018.htm`.
2. Extract media URLs for `p0108.htm` — meeting for «Неизвестный Виштынец».
3. Extract media URLs for `p0116.htm` — reconnaissance groups «Максим» / «Джек» and memorial opening.
4. Extract original maps / graphics from already verified legacy pages where provenance is still incomplete.
5. Extract media from `p33.htm`, `p92.htm`, `p31.htm` and other verified pages.
6. Continue PDF/document inventory.
7. Retry full capture of `p0121.htm` only for provenance/media inventory; do not copy its interactive implementation.
