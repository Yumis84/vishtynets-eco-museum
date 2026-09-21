# Runtime link and encoding audit — 2026-09-21

Author/Agent: CHATGPT-COORD

## Scope

Static/runtime audit of the current museum `main` after legacy runtime activation. This pass intentionally does not modify the protected audio-guide/payment flows.

## Verified

- Every relative stylesheet/script referenced directly by `index.html` exists in the repository.
- Legacy runtime load order is data → extra data → runtime A/B/C/D → reconciliation → application/UI scripts.
- `article-media-v4.js` is loaded dynamically by `articles-v3.js`; the recovered media mappings are therefore wired into the article UI rather than being an orphan file.
- Map POIs are filtered by finite latitude/longitude before Leaflet marker creation; unresolved catalogue-only coordinates are not emitted as `[null,null]`.
- The active source files use UTF-8 declarations at the document boundary and the inspected Russian UI/runtime strings are readable; no mojibake repair was justified by this pass.
- Home opening-hours rendering no longer duplicates seasonal values in application logic. It now reads `MUSEUM_INFO.openingHours` and shows an explicit verification fallback if the configured seasonal value is absent.

## External dependencies / links requiring live QA

- Legacy images under `www.wystynez.ru/sc-pic/`.
- Leaflet assets from unpkg and OpenStreetMap tiles.
- Yandex route links.
- guest-house-map catalogue and raw GitHub guest-house data.
- Legacy source/document links retained for provenance.

These cannot be classified as healthy solely from repository inspection. A failed legacy source link must not be silently replaced with an invented destination.

## Remaining gate

Public/mobile browser QA is still required. Repository/static checks do not prove that GitHub Pages/CDN deployment, remote images, map tiles, dynamic article media, swipe/lightbox behaviour and mobile layout all work in the deployed browser.
