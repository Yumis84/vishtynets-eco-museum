# Priority original-text restoration — 2026-10-09

Source: `falke0039/wystynez` pinned commit `ba42a20180cc475e176c8b98606568580b754171`.
Artifact: `data/legacy-restored-priority.json`. This supplies source transcription, **not a FULL media migration claim**.

## Exact scope

| Source | Existing article id | Mode | Source text blocks | Text characters | Source anchors |
| --- | --- | --- | ---: | ---: | ---: |
| p103.htm | `museum-mail` | replace | 19 | 3476 | 0 |
| p0122.htm | `anatomy-stone` | replace | 20 | 4901 | 5 |
| p0120.htm | `legend-of-stone-contest` | replace | 22 | 8525 | 2 |
| p0117.htm | `v-gosti-k-kamnyu` | replace | 36 | 5731 | 5 |
| p0106.htm | `unknown-vishtynets` | replace | 35 | 4099 | 7 |
| p0108.htm | `unknown-vishtynets-meeting-2018` | replace | 11 | 3700 | 1 |
| p0109.htm | `unknown-vishtynets-opening-2019` | replace | 13 | 3511 | 1 |
| p0121.htm | `anatomy-stone` | append | 8 | 1110 | 2 |
| p0087.htm | `museum-publications-index` | replace | 59 | 5384 | 29 |
| p38.htm | `birds-red-forest` | replace | 11 | 2446 | 0 |
| p92.htm | `gnome-treasures` | replace | 18 | 3245 | 2 |

## Extraction and editorial decisions

- Read source bytes as UTF-8, not the malformed HTML charset declaration. Repaired `charset=utf-8>` to `charset=utf-8">` **in memory only**, before parsing. The source files were not modified. Each record records the original byte SHA-256 and source line numbers.
- Retained each SiteCraft leaf text block (`div`, `li`, `p`, or heading with `p` + numeric class) in DOM order. Nested layout containers were excluded to avoid counting their descendant text twice. Native `li` blocks are essential: p0106 has activity and partner lists, p0117/p0122 partner lists.
- Removed only named global navigation items (home, nature, history, culture, about, services, exposition, event archive, friends) and empty layout elements. p38 has navigation midway through its DOM; these are excluded too.
- Preserved source words, spelling errors, dates, contacts, authors, complete literary works and captions verbatim. HTML entities are decoded, nonbreaking/formatting spaces normalized, and source `<br>` becomes a newline. Typographical errors such as p0120 “Легеда” and Latin-looking accented `ë` remain source-faithful. No generated historical text or summaries were introduced.
- All selected source text blocks are retained, including project news sidebars, historic budgets, historic event agendas, postal captions, source bibliographies and operational statements. They must be rendered under an explicit archival notice; those visitor rules, invitation language and contact details are **historical**, not current advice.
- p0120 contains both complete winning legends, the list of awards and drawing attribution. p0087 contains the complete publication catalogue, not a single book. Its pre-existing individual publication records are not deleted or duplicated by this change.
- p38 is **Птицы Красного леса**, by Игорь Шелякин. The source photography/illustration credit is retained exactly at page level; no newly inferred per-image authorship.
- p92 keeps separate source credits for the colour illustration by Rien Poortvliet, black-and-white illustrations by Виктория Ветивер, photos by Алексей Соколов / Владимир Драх / Ирина Ковардо, and text by А. Соколов. Text restoration does not establish which specific file belongs to each creator.
- No dedicated p0121 record exists in `MUSEUM_ARTICLES` after reconciliation. The existing `anatomy-stone` article already references p0121 via `linkedInteractiveMap`; its p0121 transcription uses `mode: append` with a distinct editorial section title, preserving source boundaries and avoiding a new duplicate. p0122 uses replacement. Apply replacements before appends, or process JSON array in order.
- Existing image/gallery data is not replaced here. A terminal gallery block is supplied for replacements; p0121 append has no additional gallery to avoid repeating p0122 media.

## Links and rendering contract

`content` uses existing `paragraph` / `heading` / `gallery` types. Text blocks have `sourceLine`; anchored text additionally has `runs: [{text, href?}]`. Concatenated run text equals block text. Render escaped text and safe anchors, preserving newlines (e.g. `white-space: pre-line`). Never render original HTML.

`sourceLinks` preserves `originalHref`, resolved `href`, source line, and text. Some source links are image-only and have an empty text label; `imageOnly` explicitly records this. Render an appropriate source/resource link rather than dropping these anchors. Image map links and the project/grant links must not disappear merely because they have no anchor text.

Verified local donor asset paths use raw GitHub URLs pinned to the donor commit. Relative HTML links use a pinned GitHub source-page URL (readable HTML source), not raw HTML text advertised as a working website. Absolute original links are retained verbatim; their availability is not asserted. Runtime may map known HTML source targets to existing article routes without losing originalHref provenance. No unknown URL has been guessed.

The p0122 brochure and p0120 contest PDF paths exist in the donor; p0121 preserves the exact Google My Maps anchor. External p0087 download destinations remain archival evidence until individually checked. No binaries are copied, in accordance with the storage policy.

## Checks actually performed

- Parsed all 11 donor files as UTF-8 with malformed declaration repaired in memory: PASS.
- Checked all nonempty visible body text nodes have a SiteCraft text-class ancestor: PASS, no text outside the extraction model on these 11 pages.
- Inspected per-page extracted text-block sequence, including both p0120 legends, p0106 native lists, p38 identity and p92 credit scope.
- JSON parse and run concatenation equality for all linked text blocks: PASS.
- Unicode replacement-character check across all extracted text: PASS.
- Existing target IDs reconciled by executing source runtime bundles in a stubbed DOM VM: PASS for ten distinct article IDs; p0121 appends to existing anatomy-stone.
- Browser/mobile rendering, remote link fetches and complete media parity: NOT RUN by this extraction task. Final integration and checks belong to the coordinating change; these records remain conservative PARTIAL until those checks provide evidence.
