# Legacy media inventory — first verified pass

Updated: 2026-08-19

This file tracks the image / credit layer of migration from `www.wystynez.ru`.

## Rules

- Preserve the exact legacy media URL whenever it can be extracted from the source page.
- A page-level line such as `Фото: ...` is stored as a **page-level credit**. It is not silently assigned as the individual photographer of every image unless the source explicitly makes that association.
- Captions inferred only from nearby HTML order are marked as pending visual confirmation.
- `cache_miss` means the legacy URL itself is verified from the source HTML, but the current crawler could not fetch the binary image. It does **not** mean the URL was invented or proven dead.
- Decorative / partner / navigation graphics are kept distinct from content photographs where possible.

## Machine-readable files

- `data/legacy-media.json`
- `data/legacy-media-batch-2.json`

## Current captured media URLs

### `p0117.htm` — Проект «В гости к камню»

- Exact media URLs captured: **14**.
- Page-level photo credit: **А. Соколов**.
- Includes project photographs, map/exposition-related images and support/partner graphics.
- Exact interactive-map destination is verified as `https://wystynez.ru/p0121.htm` from the source-page link.
- Direct capture of `p0121.htm` still returns a cache miss.
- The results page `p0122.htm` explicitly exposes an anchor «Скачать брошюру», but the linked download target is not exposed by the current search/crawl layer, so the exact brochure URL remains unresolved.

### `p38.htm` — «Птицы Красного леса»

- Exact media URLs captured: **8**.
- Author: **Игорь Шелякин**.
- Page-level image credit: **Cliparts, Dinamite SoftWare Group, 2003**.
- Source text provides nearby labels for `Серая цапля`, `Удод`, `Выпь`, `Малый подорлик`; likely image/caption associations are stored as pending final visual confirmation.
- Four likely content images have now been connected to the migrated article gallery while retaining the page-level credit wording.

### `p0109.htm` — «Неизвестный Виштынец» / opening 2019

- Exact media URLs captured: **4**.
- Page-level photo credit: **Юлия Алексеева**.
- `i1711.jpg` is adjacent to the explicit source caption `Центральный экспонат новой экспозиции - макет озера Виштынецкое` and is a strong candidate for the migrated article hero image.

### `p0125.htm` — «Соседи — 2023»

- Exact media URLs captured: **20** (page graphics + event photographs).
- Page-level photo credits: **Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо**.
- Seventeen JPG event-gallery images are now connected to the migrated article; individual photographer assignment remains intentionally blank because the legacy page gives only the collective page-level credit.
- The source also exposes a separate programme page: `https://wystynez.ru/p0126.htm`. This should be preserved as a related legacy page / programme asset rather than silently merged away.

## Totals in this pass

- Source pages with exact media URL extraction: **4**.
- Exact legacy media URLs captured: **46**.
- Pages with preserved explicit page-level credits: **4**.

## Next media queue

1. Extract media URLs for `p0108.htm` — meeting for «Неизвестный Виштынец» (page credit: Юлия Алексеева, Александр Самсонкин).
2. Extract media URLs for `p0116.htm` — reconnaissance groups «Максим» / «Джек» and memorial opening (opening-event credit: Татьяна Поломодова; historical photo credit Айтель Ланге explicitly appears in source text).
3. Extract media URLs for `Prazdnik--SOSEDI----2018.htm` (page credits already known from the legacy page).
4. Extract original maps / graphics from `p48.htm` while preserving source attribution to the Geographic Atlas of Kaliningrad Region (2002) and the Google materials cited on the old page.
5. Extract media from `p33.htm` (Донелайтис), `p92.htm` (Виштынецкие сокровища гномов), `p31.htm` (travelling exposition) and other verified pages.
6. Resolve the exact brochure download target on `p0122.htm`.
7. Retry full capture of `p0121.htm`.
