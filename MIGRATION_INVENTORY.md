# Legacy migration inventory

Status: **ACTIVE / first verified pass**  
Last updated: 2026-08-18  
Target repository: `Yumis84/vishtynets-eco-museum`

This file tracks material that must be preserved, verified and intentionally migrated from the legacy museum web properties. It is an inventory, not permission to rewrite or silently discard source material.

## Migration rules

- Preserve source URL / provenance for every migrated item.
- Preserve dates, photo credits, document links and historically relevant metadata.
- Do not treat old prices, opening rules, phone details or visitor regulations as current until re-verified.
- Do not rewrite long-form museum articles by default. First capture structure and source material; editorial rewriting requires a separate product/content decision.
- `guest-house-map` and `sauna-map-prototype` remain protected and are not migration targets.

## Legacy properties

| Property | Role | Current audit status |
|---|---|---|
| `https://www.wystynez.ru/` | Main museum site / nature / culture / projects / events / visitor content | Accessible; active audit |
| `https://www.rominten.wystynez.ru/` | Historical Romincka / Rominten material | Linked from main site; direct crawler access currently unreliable; requires separate capture |

## Main navigation / top-level pages

| Legacy URL | Content | Status | Target in new site | Notes |
|---|---|---|---|---|
| `https://www.wystynez.ru/` | Main page / project highlights / section navigation | VERIFIED | Home + Articles + Explore | Legacy footer states © 2004–2024 |
| `https://wystynez.ru/aMy---eto--sotrudniki--Kaliningradskogo--regional_nogo--obcshestvennogo--uchrezhdenija--Vishtyneckij.htm` | About museum, history, mission, contacts | VERIFIED | About / museum article | Source says museum idea originated in 2001; permanent centre now in Krasnolesye |
| `https://wystynez.ru/p95.htm` | Museum services, visitor information, programmes, historical prices | VERIFIED VIA SEARCH INDEX | Visit / programmes | Prices and operating details must be treated as legacy until re-verified |
| `https://wystynez.ru/p40.htm` | Museum exposition | VERIFIED VIA SEARCH INDEX | Exhibitions | Mentions permanent indoor exposition and outdoor `Каменные истории` |
| `https://wystynez.ru/p48.htm` | Legacy map / geographical context | VERIFIED VIA SEARCH INDEX | Map / contextual article | Preserve map/source attribution metadata |
| `https://wystynez.ru/p0008.htm` | Archive of museum events | VERIFIED | Articles / archive | Very high-value source; spans events from 2002 through 2024 |
| `https://wystynez.ru/p10.htm` | Friends / partners | DISCOVERED, FETCH UNSTABLE | About / partners | Re-fetch required |
| `https://wystynez.ru/p39.htm` | Nature section entry | DISCOVERED, FETCH UNSTABLE | Articles / Nature | Re-fetch required |
| `https://wystynez.ru/p45.htm` | Culture section entry | DISCOVERED, FETCH UNSTABLE | Articles / Culture | Re-fetch required |
| `https://www.rominten.wystynez.ru/` | History section entry | DISCOVERED, DIRECT FETCH UNSTABLE | Articles / History | Must be inventoried separately |
| `https://wystynez.ru/p101.htm` | Guest houses / tourism / routes | VERIFIED | Explore / external lodging integration | Contains legacy accommodation/contact data; do not blindly republish as current |
| legacy site material-use page | Terms for use of site materials | DISCOVERED | Legal / provenance | Exact URL to capture in next pass |

## Verified projects / exhibitions / programmes

| Legacy URL | Title / subject | Date / period | New repo representation | Migration state |
|---|---|---|---|---|
| `https://wystynez.ru/p31.htm` | Opening of travelling museum exposition | 22 May 2004 | not yet represented as dedicated article | INVENTORY ONLY |
| `https://wystynez.ru/p0088.htm` | `Каменные истории` | 2015 | `kamennye-istorii` seed exists | NEEDS SOURCE-PRESERVING MIGRATION |
| `https://wystynez.ru/p84.htm` | `Виштынецкие сокровища гномов` | project/programme | not yet fully represented | INVENTORY ONLY |
| `https://wystynez.ru/p0106.htm` | `Неизвестный Виштынец, или по дороге к чуду` | 2018–2019 | `unknown-vishtynets` seed exists | NEEDS SOURCE-PRESERVING MIGRATION |
| `https://wystynez.ru/p0117.htm` | `В гости к камню` project | 2020–2021 | related `anatomy-stone` seed exists | PARTIAL |
| `https://wystynez.ru/p0122.htm` | Presentation of `В гости к камню`; opening of `Анатомия камня` | 22 May 2021 | `anatomy-stone` seed exists | NEEDS SOURCE-PRESERVING MIGRATION |
| `https://wystynez.ru/p0121.htm` | Interactive boulder map | 2021 | not yet captured as canonical route/map dataset | DISCOVERED / RE-FETCH REQUIRED |
| `https://wystynez.ru/p0120.htm` | `Легенда о камне` project result | 20 Apr 2021 | not yet represented | DISCOVERED / RE-FETCH REQUIRED |

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
- a downloadable brochure about boulders / rocks (exact file URL still to capture);
- an interactive boulder map link (exact destination still to capture);
- extended acknowledgements / participant names;
- photo credits: В. Лукошевичус, А. Володина, А. Соколов.

These names, links, credits and project metadata must not be lost during migration.

## Event archive

Canonical legacy archive entry point:

- `https://wystynez.ru/p0008.htm`

The page contains **dozens of dated museum events from 2002 through 2024**. Current first-pass structure detected:

- exhibitions;
- concerts;
- festivals (`Соседи`, `Праздник Роминты` etc.);
- museum projects;
- expeditions;
- volunteer camps;
- educational events;
- publications;
- museum openings / travelling exhibitions;
- contests;
- historical and environmental seminars.

Recent items visible in the archive include:

- `Железные дороги Роминтской пущи` — from 1 May 2024;
- `Соседи` — 5 Aug 2023;
- Vitaly Khvaley exhibition — 8 May 2023 to 30 Apr 2024;
- Julia Alekseeva photo exhibition `РОМИНТА, часть первая КОСМОС` — from 6 Aug 2022;
- project `В гости к камню` results — 22 May 2021.

**Migration decision:** do not flatten this archive into one giant article. It should become structured archive/event metadata so it can be searched and filtered later.

## Content already seeded in the new repository

The current site already includes short prototype records in `museum-data.js` / `museum-extra-data.js` for:

- About museum;
- `Каменные истории`;
- `Музейная почта`;
- `Лесная деревня`;
- `Неизвестный Виштынец`;
- `Анатомия камня`;
- Lake Vishtynets;
- nature monuments;
- legends of Rominta / Lake Vishtynets;
- churches of the Red Forest area;
- book `Природа Калининградской области. Ключевые природные комплексы`.

Most of these records are explicitly marked `migrationStatus:'seed_from_project_brief'`. Treat them as **prototype summaries**, not completed migration.

## Historical `rominten.wystynez.ru` branch

The main museum site links the History navigation directly to `www.rominten.wystynez.ru`.

Direct retrieval is currently unreliable in the audit environment, but external indexed references confirm that historical pages existed at least for:

- `http://www.rominten.wystynez.ru/p40.htm` — imperial hunting lodge / Rominten material;
- `http://www.rominten.wystynez.ru/p37.htm` — Göring-era hunting estate / historical hunting material.

These third-party references are **discovery clues only**, not canonical migration sources. The original historical site must be captured directly before its text is migrated.

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

Known credits already present in the new prototype include А. Соколов, Э. Барсуков, Александр Матвеев and others. These must be verified per source page rather than inferred globally.

## PDFs / downloadable documents

Known downloadable/document leads:

- boulder / rock brochure linked from `p0122.htm` — exact file URL still unresolved;
- `Музейный гид` 2013 online version referenced from the About page;
- book/publication material around `Природа Калининградской области. Ключевые природные комплексы`.

PDF/document crawling remains incomplete and is a priority for the next pass.

## Current migration backlog

Priority order:

1. Capture complete internal URL graph from `www.wystynez.ru`.
2. Capture `rominten.wystynez.ru` directly, including all historical pages and images.
3. Resolve downloadable PDFs / brochure links.
4. Build image inventory with page → image → credit mapping.
5. Convert `p0008.htm` event archive into structured event records with title/date/source URL.
6. Re-verify current visitor information before publishing prices/rules/contacts as current facts.
7. Replace `seed_from_project_brief` records only after their legacy source payload has been captured and provenance attached.
8. Prepare final migration mapping: legacy URL → new article/POI/route/document → status.

## Current completion assessment

- Legacy site discovery: **in progress**
- Main navigation: **mostly discovered**
- Event archive: **entry page verified; detail crawl incomplete**
- Projects: **major recent projects identified; detail crawl incomplete**
- Images: **partial**
- PDFs/downloads: **incomplete**
- `rominten.wystynez.ru`: **incomplete / access unstable**
- Dead-link / redirect audit: **not complete**
- Encoding/garbled-text audit: **not complete**
- Final migration plan: **not yet complete**
