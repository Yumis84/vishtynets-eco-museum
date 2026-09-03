# Legacy migration inventory

Status: **ACTIVE / verified migration pass in progress**  
Last updated: 2026-09-02  
Target repository: `Yumis84/vishtynets-eco-museum`

> **2026-09-02 progress:** the repository already contains legacy migration batches through `museum-legacy-batch-71.js`. This pass continues from that state rather than creating duplicate archive records. Exact legacy media URLs were additionally captured for `p0108.htm`, `p0116.htm`, `p0092.htm` and `p48.htm`; see `docs/MEDIA_CAPTURE_2026-09-02.md` and `docs/LEGACY_MEDIA_INVENTORY.md`.

This file tracks material that must be preserved, verified and intentionally migrated from the legacy museum web properties. It is an inventory, not permission to rewrite or silently discard source material.

## Migration rules

- Preserve source URL / provenance for every migrated item.
- Preserve dates, photo credits, document links and historically relevant metadata.
- Do not treat old prices, opening rules, phone details or visitor regulations as current until re-verified.
- Do not rewrite long-form museum articles by default. First capture structure and source material; editorial rewriting requires a separate product/content decision.
- `guest-house-map` and `sauna-map-prototype` remain protected and are not migration targets.

## Verified progress ledger

| Area | Current state as of 2026-09-02 |
|---|---|
| Legacy structured batches | `museum-legacy-batch-1.js` through `museum-legacy-batch-71.js` already present on `main`; do not duplicate these records |
| Event archive | `p0008.htm` verified; historical event records have already been split across legacy batches; remaining work is source-detail verification and final integration |
| Media inventory | Exact media URL inventories exist for multiple key pages; 2026-09-02 added 37 exact URLs across four queued pages |
| `В гости к камню` | Primary pages `p0117.htm` and `p0122.htm` verified; brochure and interactive map remain unresolved as binary/destination captures |
| Interactive boulder map | Legacy target `p0121.htm` confirmed from source-page link; direct page capture still unavailable |
| Boulder brochure | PDF itself has now been located at `https://wystynez.ru/download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf`; the source page's exact download href should still be preserved when connector access exposes it |
| Current operational data | Must remain separate from archival migration and be re-verified later |
| Rominten history site | Still blocked/unstable for direct capture; requires separate recovery path |

## Legacy properties

| Property | Role | Current audit status |
|---|---|---|
| `https://www.wystynez.ru/` | Main museum site / nature / culture / projects / events / visitor content | Accessible; active audit |
| `https://www.rominten.wystynez.ru/` | Historical Romincka / Rominten material | Linked from main site; direct crawler access currently unreliable; requires separate capture |

## Main navigation / top-level pages

| Legacy URL | Content | Status | Target in new site | Notes |
|---|---|---|---|---|
| `https://www.wystynez.ru/` | Main page / project highlights / section navigation | VERIFIED | Home + Articles + Explore | Legacy footer states © 2004–2024 |
| `https://wystynez.ru/aMy---eto--sotrudniki--Kaliningradskogo--regional_nogo--obcshchestvennogo--uchrezhdenija--Vishtyneckij.htm` | About museum, history, mission, contacts | VERIFIED | About / museum article | Source says museum idea originated in 2001; permanent centre now in Krasnolesye |
| `https://wystynez.ru/p95.htm` | Museum services, visitor information, programmes, historical prices | VERIFIED VIA SEARCH INDEX | Visit / programmes | Prices and operating details must be treated as legacy until re-verified |
| `https://wystynez.ru/p40.htm` | Museum exposition | VERIFIED VIA SEARCH INDEX | Exhibitions | Mentions permanent indoor exposition and outdoor `Каменные истории` |
| `https://wystynez.ru/p48.htm` | Legacy map / geographical context | VERIFIED | Map / contextual article | 11 exact image URLs captured; preserve source attribution |
| `https://wystynez.ru/p0008.htm` | Archive of museum events | VERIFIED | Articles / archive | Very high-value source; spans events from 2002 through 2024 |
| `https://wystynez.ru/p10.htm` | Friends / partners | DISCOVERED, FETCH UNSTABLE | About / partners | Re-fetch required |
| `https://wystynez.ru/p39.htm` | Nature section entry | DISCOVERED, FETCH UNSTABLE | Articles / Nature | Re-fetch required |
| `https://wystynez.ru/p45.htm` | Culture section entry | DISCOVERED, FETCH UNSTABLE | Articles / Culture | Re-fetch required |
| `https://www.rominten.wystynez.ru/` | History section entry | DISCOVERED, DIRECT FETCH UNSTABLE | Articles / History | Must be inventoried separately |
| `https://wystynez.ru/p101.htm` | Guest houses / tourism / routes | VERIFIED | Explore / external lodging integration | Contains legacy accommodation/contact data; do not blindly republish as current |
| legacy site material-use page | Terms for use of site materials | DISCOVERED | Legal / provenance | Exact URL still needs capture |

## Verified projects / exhibitions / programmes

| Legacy URL | Title / subject | Date / period | New repo representation | Migration state |
|---|---|---|---|---|
| `https://wystynez.ru/p31.htm` | Opening of travelling museum exposition | 22 May 2004 | legacy batch / media context exists | SOURCE TEXT/IMAGES STILL NEED FINAL CAPTURE |
| `https://wystynez.ru/p0088.htm` | `Каменные истории` | 2015 | legacy seed/batch exists | NEEDS FINAL SOURCE-PRESERVING INTEGRATION |
| `https://wystynez.ru/p84.htm` | `Виштынецкие сокровища гномов` | project/programme | legacy records exist | SOURCE TEXT VERIFIED; MEDIA CRAWL BLOCKED |
| `https://wystynez.ru/p0106.htm` | `Неизвестный Виштынец, или по дороге к чуду` | 2018–2019 | legacy records exist | PRIMARY SOURCE VERIFIED |
| `https://wystynez.ru/p0117.htm` | `В гости к камню` project | 2020–2021 | legacy records + media inventory | PRIMARY SOURCE VERIFIED / INTEGRATION REMAINS |
| `https://wystynez.ru/p0122.htm` | Presentation of `В гости к камню`; opening of `Анатомия камня` | 22 May 2021 | legacy records + media inventory | PRIMARY SOURCE VERIFIED |
| `https://wystynez.ru/p0121.htm` | Interactive boulder map | 2021 | legacy target confirmed | CONTENT CAPTURE BLOCKED |
| `https://wystynez.ru/p0120.htm` | `Легенда о камне` project result | 20 Apr 2021 | legacy page captured/recorded | FINAL MEDIA/INTEGRATION CHECK REQUIRED |
| `https://wystynez.ru/p0108.htm` | Meeting for `Неизвестный Виштынец` | 26 Sep 2018 | media URLs captured 2026-09-02 | VERIFIED SOURCE + MEDIA URL INVENTORY |
| `https://wystynez.ru/p0116.htm` | `Максим` / `Джек` reconnaissance project | 2020 | media URLs captured 2026-09-02 | VERIFIED SOURCE + MEDIA URL INVENTORY |
| `https://wystynez.ru/p0092.htm` | `Лесная деревня` project | 2016–2017 | media URLs captured 2026-09-02 | VERIFIED SOURCE + MEDIA URL INVENTORY |

### `В гости к камню` source metadata to preserve

Verified legacy page `p0117.htm` contains:

- project period: 1 Sep 2020 – 31 May 2021;
- project total budget and grant/co-financing figures;
- team names and roles;
- partners;
- image material;
- photo credit: А. Соколов;
- links to the results presentation, boulder map and competition results.

The results page `p0122.htm` additionally contains:

- opening of exhibition `Анатомия камня` on 22 May 2021;
- a downloadable brochure about boulders / rocks;
- an interactive boulder map link;
- extended acknowledgements / participant names;
- photo credits: В. Лукошевичус, А. Володина, А. Соколов.

The brochure itself has been located at:

`https://wystynez.ru/download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf`

The PDF is a 2021 museum publication and must be preserved as a separate document object, not flattened into article text.

## Event archive

Canonical legacy archive entry point:

- `https://wystynez.ru/p0008.htm`

The page contains **dozens of dated museum events from 2002 through 2024**. Existing legacy batches already record many of these items. The archive should remain structured metadata rather than one giant article.

Recent items visible in the archive include:

- `Железные дороги Роминтской пущи` — from 1 May 2024;
- `Соседи` — 5 Aug 2023;
- Vitaly Khvaley exhibition — 8 May 2023 to 30 Apr 2024;
- Julia Alekseeva photo exhibition `РОМИНТА, часть первая КОСМОС` — from 6 Aug 2022;
- project `В гости к камню` results — 22 May 2021.

## Content already seeded in the new repository

The current site already includes prototype records in `museum-data.js` / `museum-extra-data.js` and many dedicated `museum-legacy-batch-*.js` records. Prototype summaries must not be mistaken for full source-preserving migration until their source URL and media/document provenance are attached.

## Historical `rominten.wystynez.ru` branch

The main museum site links the History navigation directly to `www.rominten.wystynez.ru`.

Direct retrieval is currently unreliable in the audit environment, but indexed references confirm historical pages existed at least for:

- `http://www.rominten.wystynez.ru/p40.htm` — imperial hunting lodge / Rominten material;
- `http://www.rominten.wystynez.ru/p37.htm` — Göring-era hunting estate / historical hunting material.

These references are discovery clues only, not canonical migration sources. The original historical site must be captured directly before its text is migrated.

## Tourist / lodging content

`https://wystynez.ru/p101.htm` contains a legacy accommodation directory and links to tourism / routes / Lake Vishtynets material.

Important rule: this is useful as an inventory of names and historical links, but phone numbers, availability, businesses and accommodation descriptions can change. Current business data must be re-verified rather than copied blindly.

The separate `guest-house-map` product remains protected and must not be modified as part of this museum migration.

## Assets and provenance

The old site relies heavily on image files under paths such as `https://www.wystynez.ru/sc-pic/...`.

For each migrated article we still need to capture:

- hero image URL;
- inline image URLs;
- original dimensions where possible;
- caption;
- photographer / credit;
- source page;
- duplicate-image usage across pages;
- whether the image is still reachable.

The exact URL layer has now been expanded substantially. See `docs/LEGACY_MEDIA_INVENTORY.md` for the current ledger and `docs/MEDIA_CAPTURE_2026-09-02.md` for the latest capture.

## PDFs / downloadable documents

Known documents include:

- `https://wystynez.ru/download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf` — 2021 boulder brochure, now located;
- `Музейный гид` 2013 online version referenced from the About/publication material;
- book/publication material around `Природа Калининградской области. Ключевые природные комплексы`.

Remaining document work: capture exact source hrefs/metadata where the source page exposes them and preserve each document as a separate archival object.

## Current migration backlog

1. Complete the internal URL graph for pages still unstable or not directly captured.
2. Capture `rominten.wystynez.ru` directly, including historical pages and images.
3. Capture the remaining media queues (`p92`, `p33`, `p31`, `Prazdnik--SOSEDI----2018.htm`).
4. Recover the content/data behind `p0121.htm` interactive boulder map.
5. Preserve the 2021 boulder brochure as a document object with provenance.
6. Complete page → image → caption → credit mapping and visual confirmation where binaries become reachable.
7. Reconcile existing `museum-legacy-batch-1..71` records with the final source map; do not create duplicate records.
8. Replace prototype-only records with source-preserving records where the dedicated primary page has now been verified.
9. Finalize legacy URL → new article/POI/route/document → status mapping.
10. Only after archival migration is complete: re-verify current visitor information, then perform editorial/design/current-content work.

## Current completion assessment

- Legacy site discovery: **advanced, not final**
- Main navigation: **mostly discovered**
- Event archive: **structured legacy batches exist; source-detail reconciliation remains**
- Major projects: **primary sources captured for many key projects; final integration remains**
- Media URL inventory: **substantially expanded; exact binary reachability remains limited**
- PDFs/downloads: **boulder brochure located; other documents incomplete**
- `rominten.wystynez.ru`: **incomplete / access unstable**
- Dead-link / redirect audit: **not complete**
- Encoding/garbled-text audit: **not complete**
- Final migration mapping: **not complete**
