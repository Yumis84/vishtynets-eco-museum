# Legacy migration inventory

Status: **ACTIVE / reconciled with current main**  
Last updated: 2026-08-28  
Target repository: `Yumis84/vishtynets-eco-museum`

This is an inventory and provenance register, not permission to rewrite or discard source material.

## Migration rules

- Preserve source URL / provenance for every migrated item.
- Preserve dates, photo credits, document links and historically relevant metadata.
- Do not treat old prices, opening rules, phone details or visitor regulations as current until re-verified.
- Do not rewrite long-form museum articles by default. First capture source material; editorial rewriting requires a separate decision.
- A legacy batch/inventory row is never proof of public publication.
- Before creating a public page, search the actual `main` repository by legacy filename, page ID and title. If an equivalent public representation exists, audit it instead of creating a duplicate.
- For every material distinguish: **source captured / metadata saved / public page exists / public link verified**.
- `p0121.htm`: preserve content, do not copy the old interactive map; use the new museum map. Boulder markers await owner data.
- `guest-house-map` and `sauna-map-prototype` remain protected.

## Legacy properties

| Property | Role | Current audit status |
|---|---|---|
| `https://www.wystynez.ru/` | Main museum site / nature / culture / projects / events / visitor content | Accessible; active audit |
| `https://www.rominten.wystynez.ru/` | Historical Rominten / Romincka material | Direct retrieval unstable; separate capture required |

## Main navigation / top-level pages

| Legacy URL | Content | New-site status |
|---|---|---|
| `https://www.wystynez.ru/` | Main page / project highlights / section navigation | Home + Articles + Explore |
| `https://wystynez.ru/aMy---eto--sotrudniki--Kaliningradskogo--regional_nogo--obcshestvennogo--uchrezhdenija--Vishtyneckij.htm` | About museum, history, mission, contacts | About / museum article |
| `https://wystynez.ru/p95.htm` | Museum services / visitor information / historical prices | Inventory; current data must be re-verified |
| `https://wystynez.ru/p40.htm` | Museum exposition | Exhibitions; source-preserving audit pending |
| `https://wystynez.ru/p48.htm` | Legacy map / geographical context | **PUBLIC: `p48.html`** |
| `https://wystynez.ru/p0008.htm` | Archive of museum events | **PUBLIC FUNCTION: existing `Хронология музея` in `menu-v3.js`; do not create duplicate `p0008.html`** |
| `https://wystynez.ru/p10.htm` | Friends / partners | Discovery; fetch unstable |
| `https://wystynez.ru/p39.htm` | Nature section entry | Discovery; fetch unstable |
| `https://wystynez.ru/p45.htm` | Culture section entry | Discovery; fetch unstable |
| `https://www.rominten.wystynez.ru/` | History section entry | Direct fetch unstable; separate capture required |
| `https://wystynez.ru/p101.htm` | Guest houses / tourism / routes | Inventory; current business data requires re-verification |

## Verified projects / exhibitions / programmes

| Legacy URL | Title / subject | New repo representation | Status |
|---|---|---|---|
| `https://wystynez.ru/p31.htm` | Opening of travelling museum exposition | none | **INVENTORY ONLY** |
| `https://wystynez.ru/p0088.htm` | `Каменные истории` | `kamennye-istorii` seed | **SOURCE-PRESERVING MIGRATION PENDING** |
| `https://wystynez.ru/p84.htm` | `Виштынецкие сокровища гномов` | none | **INVENTORY ONLY** |
| `https://wystynez.ru/p0106.htm` | `Неизвестный Виштынец` | `unknown-vishtynets` seed + related pages | **PARTIAL / SOURCE MIGRATION PENDING** |
| `https://wystynez.ru/p0117.htm` | `В гости к камню` project | `anatomy-stone` seed + related pages | **PARTIAL** |
| `https://wystynez.ru/p0122.htm` | Results presentation / `Анатомия камня` | `p0122.html` | **PUBLIC** |
| `https://wystynez.ru/p0121.htm` | Interactive boulder map | `p0121.html` + new map link | **PUBLIC; old interactive implementation intentionally omitted** |
| `https://wystynez.ru/p0120.htm` | `Легенда о камне` project result | `p0120.html` | **PUBLIC** |
| `https://wystynez.ru/Prazdnik--SOSEDI----2018.htm` | `Соседи` 2018 | `Prazdnik--SOSEDI----2018.html` | **PUBLIC** |
| `https://wystynez.ru/p0108.htm` | `Неизвестный Виштынец` meeting, 26.09.2018 | `p0108.html` | **PUBLIC** |
| `https://wystynez.ru/p0116.htm` | Groups `Максим` / `Джек` and memorial opening | `p0116.html` | **PUBLIC; media recovery pending** |

## Current public detail-page set

The following dedicated legacy-detail pages are verified as existing in current `main`:

- `p0121.html`
- `p48.html`
- `p0120.html`
- `p0122.html`
- `Prazdnik--SOSEDI----2018.html`
- `p0108.html`
- `p0116.html`

**Do not recreate these files.** Further work on them is audit/provenance/media QA only.

## Event archive

Canonical legacy archive: `https://wystynez.ru/p0008.htm`.

The current site already provides the archive index as structured **Хронология музея** in `menu-v3.js`, grouped by year and covering the legacy event timeline. Therefore the archive index itself does not need another HTML page. Individual detail pages are migrated only when a genuine public gap is demonstrated.

## Asset / provenance state

Tracked media inventories currently exist for several migrated pages. Known exact URL counts include:

- `p0117.htm`: 14
- `p38.htm`: 8
- `p0109.htm`: 4
- `p0125.htm`: 20
- `p0108.htm`: 8
- `Prazdnik--SOSEDI----2018.htm`: representative URLs captured; full extraction pending
- `p0116.htm`: **0 exact URLs currently captured**; do not invent replacements

Page-level photo credits must not be reassigned to individual images without explicit source evidence.

## Documents / PDFs

- `p0122.htm` brochure: **resolved** — `https://wystynez.ru/download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf`, verified as 9-page PDF.
- Other document links remain subject to source verification.

## Historical `rominten.wystynez.ru`

Discovery references exist for historical pages such as `p40.htm` and `p37.htm`, but direct capture is unstable. Third-party/indexed references are discovery clues only and are not canonical migration sources. Do not migrate historical text from them until the original source is captured or independently verified.

## Current backlog

1. Audit `rominten.wystynez.ru` capture/relevance.
2. Recover remaining exact media URLs for `Prazdnik--SOSEDI----2018.htm` and `p0116.htm` where source access permits.
3. Source-preserving migration of `p31.htm`, `p0088.htm`, `p84.htm`, `p0106.htm` and other high-value legacy details — only after duplicate check.
4. Complete PDF/document inventory.
5. Dead-link / redirect audit.
6. Encoding / garbled-text audit.
7. Final legacy URL → current representation → evidence matrix.

## Completion assessment

- Legacy discovery: **in progress**
- Archive index: **represented; detail crawl incomplete**
- Recent projects: **partial, several dedicated pages public**
- Images: **partial**
- PDFs/downloads: **partial; p0122 brochure resolved**
- `rominten.wystynez.ru`: **incomplete**
- Dead-link / redirect audit: **not complete**
- Encoding audit: **not complete**
- Final migration matrix: **not complete**
