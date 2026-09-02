# Legacy media inventory — verified migration pass

Updated: 2026-09-02

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
- `data/legacy-media-batch-3.json` / `data/legacy-media-context-batch-3.json`
- `data/legacy-media-batch-4.json`
- `data/legacy-media-batch-5.json`
- `docs/MEDIA_CAPTURE_2026-09-02.md`

## Current captured media URLs

### `p0117.htm` — Проект «В гости к камню»

- Exact media URLs captured: **14**.
- Page-level photo credit: **А. Соколов**.
- Includes project photographs, map/exposition-related images and support/partner graphics.
- Exact interactive-map destination is verified as `https://wystynez.ru/p0121.htm` from the source-page link.
- Direct capture of `p0121.htm` still returns a cache miss.
- The results page `p0122.htm` explicitly exposes an anchor «Скачать брошюру», but the linked download target is not exposed by the current search/crawl layer, so the exact brochure URL remains unresolved.

### `p38.htm` — «Птицы Красного леса`

- Exact media URLs captured: **8**.
- Author: **Игорь Шелякин**.
- Page-level image credit: **Cliparts, Dinamite SoftWare Group, 2003**.
- Nearby labels include `Серая цапля`, `Удод`, `Выпь`, `Малый подорлик`; image/caption associations remain subject to visual confirmation.

### `p0109.htm` — «Неизвестный Виштынец» / opening 2019

- Exact media URLs captured: **4**.
- Page-level photo credit: **Юлия Алексеева**.
- `i1711.jpg` is adjacent to the explicit source caption about the central lake model and is a strong hero-image candidate.

### `p0125.htm` — «Соседи — 2023`

- Exact media URLs captured: **20**.
- Page-level photo credits: **Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо**.
- Seventeen JPG event-gallery images are connected to the migrated article; individual photographer assignment remains blank because the source gives only collective page-level credit.
- Related programme page: `https://wystynez.ru/p0126.htm`.

### `p0108.htm` — «Неизвестный Виштынец», meeting 26 September 2018

- Exact media URLs captured: **8**.
- Page-level credits: **Юлия Алексеева, Александр Самсонкин**.
- All 8 exact `sc-pic` URLs are recorded in `docs/MEDIA_CAPTURE_2026-09-02.md`.

### `p0116.htm` — reconnaissance groups «Максим» / «Джек`

- Exact media URLs captured: **13**.
- Page-level credit: **Татьяна Поломодова**.
- Explicit historical image credit: **Айтель Ланге** for the Reichsjagerhof image context.
- Exact URLs are recorded in `docs/MEDIA_CAPTURE_2026-09-02.md`.

### `p0092.htm` — project «Лесная деревня`

- Exact media URLs captured: **5**.
- The page itself exposes project images and related graphics; no individual photographer assignment is inferred where the source does not provide one.

### `p48.htm` — geographic/map page

- Exact media URLs captured: **11**.
- Source attribution preserved: Google materials and *Географический атлас Калининградской области* (Kaliningrad, 2002).
- The map graphics are historical/source material and must not be silently re-authored.

## 2026-09-02 capture result

This pass added **37 exact legacy media URLs** across four previously queued pages (`p0108`, `p0116`, `p0092`, `p48`). The URLs were extracted from the legacy HTML image anchors. The crawler returned cache misses for the binary files, so the URLs are preserved as verified provenance rather than marked dead.

## Remaining media blockers

1. `p92.htm` — «Виштынецкие сокровища гномов»: indexed text is available, but the current crawl path returns unsupported media type before exposing image anchors.
2. `p33.htm` — Кристионас Донелайтис: direct crawl remains unstable.
3. `p31.htm` — travelling exposition: direct crawl currently has a Unicode decoding error.
4. `Prazdnik--SOSEDI----2018.htm`: page-level credits and contexts are verified, exact media URLs remain pending.
5. `p0121.htm`: dedicated interactive boulder-map page is verified as a legacy target but direct capture remains unavailable.
6. `p0122.htm`: brochure anchor is verified, exact download target remains unresolved.
