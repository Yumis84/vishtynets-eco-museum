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
| `https://wystynez.ru/p0088.htm` | `Каменные истории` | `kamennye-istorii` seed | **SOURCE-PRESERVING MIGRATION PENDING** |
| `https://wystynez.ru/p84.htm` | Project `Виштынецкие сокровища гномов` | `MUSEUM_ARTICLES:gnome-treasures-project` via `museum-legacy-batch-10.js` | **PUBLIC REPRESENTATION EXISTS; NO DUPLICATE PAGE NEEDED** |
| `https://wystynez.ru/p92.htm` | Educational programme `Виштынецкие сокровища гномов` | existing `MUSEUM_ARTICLES:gnome-treasures` | **PUBLIC REPRESENTATION EXISTS; AUDIT ONLY** |
| `https://wystynez.ru/p0106.htm` | `Неизвестный Виштынец` | `unknown-vishtynets` seed + related pages | **PARTIAL / SOURCE MIGRATION PENDING** |
| `https://wystynez.ru/p0117.htm` | `В гости к камню` project | `anatomy-stone` seed + related pages | **PARTIAL** |
| `https://wystynez.ru/p0122.htm` | Results presentation / `Анатомия камня` | `p0122.html` | **PUBLIC** |
| `https://wystynez.ru/p0121.htm` | Interactive boulder map | `p0121.html` + new map link | **PUBLIC; old interactive implementation intentionally omitted** |
| `https://wystynez.ru/p0120.htm` | `Легенда о камне` project result | `p0120.html` | **PUBLIC** |
| `https://wystynez.ru/p33.htm` | `Кристионас Донелайтис` | `p33.html` | **PUBLIC; media recovery pending** |
| `https://wystynez.ru/Prazdnik--SOSEDI----2018.htm` | `Соседи` 2018 | `Prazdnik--SOSEDI----2018.html` | **PUBLIC** |
| `https://wystynez.ru/p0108.htm` | `Неизвестный Виштынец` meeting, 26.09.2018 | `p0108.html` | **PUBLIC** |
| `https://wystynez.ru/p0116.htm` | Groups `Максим` / `Джек` and memorial opening | `p0116.html` | **PUBLIC; media recovery pending** |

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

**Do not recreate these files.** Further work is audit/provenance/media QA only.

## `p33` verification
Primary source: `https://wystynez.ru/p33.htm`. The page covers the pastor's house and Kristijonas Donelaitis, the poem `Времена года` (1765–1775, translation by D. Brodsky), the 300th anniversary in 2014, the Donelaitis memorial museum in Chistye Prudy, and the 2014 celebration in Krasnolesye. Page-level photo credit: **Э. Барсуков, А. Соколов**. Exact legacy image URLs were not exposed by the current repository capture layer, so none were invented.

## `p92` / `p84` verification
Primary source `p84.htm` describes the project creating the children's/family geology programme, the route to the old quarry, the gnome workshop, equipment, guide workbook and implementation stages. The current repository already contains this material as article `gnome-treasures-project` in `museum-legacy-batch-10.js`, with `legacyUrl` set to `p84.htm`, project period, partners, source notes and credits. Therefore **do not create `p84.html`**. The current app renders `MUSEUM_ARTICLES` in the public Articles reader, so this is a public representation rather than a batch-only inventory row. citeturn0search0turn171file0turn173file0

Primary source `p92.htm` is also represented by the existing `gnome-treasures` article; historical operational conditions remain archival and must not be presented as current commercial terms. citeturn0search1turn171file0

## Media state
- `p0117.htm`: 14 exact URLs
- `p38.htm`: 8
- `p0109.htm`: 4
- `p0125.htm`: 20
- `p0108.htm`: 8
- `p31.htm`: 12
- `Prazdnik--SOSEDI----2018.htm`: representative URLs captured; full extraction pending
- `p0116.htm`: 0 exact URLs currently captured
- `p33.htm`: exact URLs pending
- `p92.htm` / `p84.htm`: exact URLs pending

## Documents / PDFs
- `p0122.htm` brochure: resolved and verified as 9-page PDF.
- Other document links remain subject to source verification.

## Historical `rominten.wystynez.ru`
Direct capture remains unstable. Discovery/indexed references are clues only and are not canonical migration sources. Do not migrate historical text from them until the original source is captured or independently verified.

## Current backlog
1. Recover exact media URLs for `p0116`, `Prazdnik--SOSEDI----2018`, `p33`, `p92/p84` where source access permits.
2. Source-preserving migration of `p0088.htm`, `p0106.htm` and other high-value legacy details — only after duplicate check.
3. Audit `rominten.wystynez.ru`.
4. Complete PDF/document inventory.
5. Dead-link / redirect audit.
6. Encoding / garbled-text audit.
7. Final legacy URL → current representation → evidence matrix.
