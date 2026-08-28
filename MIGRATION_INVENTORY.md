# Legacy migration inventory

Status: **ACTIVE / reconciled with current main**  
Last updated: 2026-08-28  
Target repository: `Yumis84/vishtynets-eco-museum`

## Migration rules
- Preserve source URL / provenance for every migrated item.
- Preserve dates, photo credits, document links and historically relevant metadata.
- Do not treat old prices, opening rules, phone details or visitor regulations as current until re-verified.
- A legacy batch/inventory row is never proof of public publication.
- Before creating a public page, search actual `main` by legacy filename, page ID and title. If equivalent public representation exists, audit it instead of creating a duplicate.
- For every material distinguish: **source captured / metadata saved / public page exists / public link verified**.
- `p0121.htm`: preserve content, do not copy old interactive map; use new museum map. Boulder markers await owner data.

## Verified projects / exhibitions / programmes

| Legacy URL | Subject | New repo representation | Status |
|---|---|---|---|
| `https://wystynez.ru/p31.htm` | Opening of travelling museum exposition, 2004 | `p31.html` | **PUBLIC** |
| `https://wystynez.ru/p0088.htm` | `Каменные истории` | `p0088.html` | **PUBLIC; 8 exact source media URLs** |
| `https://wystynez.ru/p84.htm` | Project `Виштынецкие сокровища гномов` | `MUSEUM_ARTICLES:gnome-treasures-project` via `museum-legacy-batch-10.js` | **PUBLIC REPRESENTATION EXISTS; NO DUPLICATE PAGE NEEDED** |
| `https://wystynez.ru/p92.htm` | Educational programme `Виштынецкие сокровища гномов` | existing `MUSEUM_ARTICLES:gnome-treasures` | **PUBLIC REPRESENTATION EXISTS; AUDIT ONLY** |
| `https://wystynez.ru/p0106.htm` | `Неизвестный Виштынец` | `p0106.html` + related pages | **PUBLIC; 10 exact source media URLs captured** |
| `https://wystynez.ru/p0117.htm` | `В гости к камню` project | `anatomy-stone` seed + related pages | **PARTIAL** |
| `https://wystynez.ru/p0122.htm` | Results presentation / `Анатомия камня` | `p0122.html` | **PUBLIC** |
| `https://wystynez.ru/p0121.htm` | Interactive boulder map | `p0121.html` + new map link | **PUBLIC; old interactive implementation intentionally omitted** |
| `https://wystynez.ru/p0120.htm` | `Легенда о камне` project result | `p0120.html` | **PUBLIC** |
| `https://wystynez.ru/p48.htm` | Geographical context / Vishtynets Upland | `p48.html` | **PUBLIC** |
| `https://wystynez.ru/p33.htm` | `Кристионас Донелайтис` | `p33.html` | **PUBLIC; media recovery pending** |
| `https://wystynez.ru/Prazdnik--SOSEDI----2018.htm` | `Соседи` 2018 | `Prazdnik--SOSEDI----2018.html` | **PUBLIC; 42 exact source media URLs** |
| `https://wystynez.ru/p0108.htm` | `Неизвестный Виштынец` meeting, 26.09.2018 | `p0108.html` | **PUBLIC; 8 exact media URLs** |
| `https://wystynez.ru/p0116.htm` | Groups `Максим` / `Джек` and memorial opening | `p0116.html` | **PUBLIC; 13 exact source media URLs** |

## Archive index

Canonical legacy archive: `https://wystynez.ru/p0008.htm`.

The current site already provides the archive index as structured **Хронология музея** in `menu-v3.js`. **Do not create `p0008.html`.** Individual detail pages are migrated only when a genuine public gap is demonstrated.

## Current public detail-page set

- `p0121.html`
- `p48.html`
- `p0120.html`
- `p0122.html`
- `Prazdnik--SOSEDI----2018.html`
- `p0108.html`
- `p0116.html`
- `p31.html`
- `p33.html`
- `p0088.html`
- `p0106.html`

**Do not recreate these files.** Further work is audit/provenance/media QA only.

## `p0106` verification
Primary source: `https://wystynez.ru/p0106.htm`. The source confirms the project `Неизвестный Виштынец или по дороге к чуду`, supported by the Presidential Grants Foundation in 2018; project period 1 June 2018–30 June 2019; planned museum exposition, viewing platform, postcards/museum post and travelling photo exhibition; team, partners and historical financial figures. Exact source media captured: `i1595.png`, `i1596.jpg`, `i1597.jpg`, `i1598.jpg`, `i1599.jpg`, `i1601.jpg`, `i1602.jpg`, `i1603.jpg`, `i1604.png`, `i1695.jpg`. Logos are tracked separately from content photographs.

## Media state
- `p0117.htm`: 14 exact URLs
- `p38.htm`: 8
- `p0109.htm`: 4
- `p0125.htm`: 20
- `p0108.htm`: 8
- `p31.htm`: 12
- `p0088.htm`: 8
- `p0106.htm`: 10
- `Prazdnik--SOSEDI----2018.htm`: 42 exact URLs
- `p0116.htm`: 13 exact URLs
- `p33.htm`: exact URLs pending
- `p92.htm` / `p84.htm`: exact URLs pending

## Documents / PDFs
- `p0122.htm` brochure: resolved and verified as 9-page PDF.
- Other document links remain subject to source verification.

## Historical `rominten.wystynez.ru`
Direct capture remains unstable. Discovery/indexed references are clues only and are not canonical migration sources. Do not migrate historical text from them until the original source is captured or independently verified.

Current web discovery confirms the main `wystynez.ru` still exposes historical Rominten/Romincka content through pages such as `p40.htm` (museum exposition) and `p0008.htm` (event archive), so these are preferred canonical sources where the dedicated `rominten.wystynez.ru` host is unavailable. The separate historical-host migration remains **DEFER** until direct source capture is possible.

## Current backlog
1. Recover exact media URLs for `p33` and `p92/p84` where source access permits.
2. Audit `rominten.wystynez.ru` historical-site capture/relevance; do not duplicate material already represented on `wystynez.ru`.
3. Complete PDF/document inventory.
4. Dead-link / redirect audit.
5. Encoding / garbled-text audit.
6. Final legacy URL → current representation → evidence matrix.
7. Final mobile QA of article photo presentation: hero/top image + contextual galleries + fullscreen lightbox/swipe, without moving historical images where source placement is not known.
