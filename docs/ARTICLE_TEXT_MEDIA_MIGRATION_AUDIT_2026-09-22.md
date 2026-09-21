# Article text and photo migration audit — 2026-09-22

## Finding

The public article runtime is not yet a 1:1 preservation of every legacy detail page.

Current runtime contains 173 article records after reconciliation, but they come from different source scopes:

- dedicated legacy detail pages: migrated/seeded articles with a `legacyUrl`; some have fuller reconstructed text and exact media;
- archive index `p0008.htm`: many event records intentionally contain only the archive title/date/short description until a dedicated source page is captured;
- later recovery/status batches: provenance/recovery records, not full article bodies.

Therefore a short article body must not be interpreted as the complete text of the old page.

## Text rule

For every legacy page with a dedicated article, preserve the source text semantically and structurally. Do not replace a recoverable source article with a short AI summary. Keep headings, paragraphs, dates, names, captions, credits and source URL. Modern explanatory text may be added separately, but must not silently replace archival source content.

Records whose only verified source is the archive index may remain concise until their dedicated page is recovered. Mark that state in provenance instead of presenting the summary as a complete migration.

Known example: `museum-mail` currently originates as a short project-brief seed in `museum-data.js`; its 21 exact p103 images have now been connected, but its visible body is still a short reconstructed summary rather than a verified full transcription of p103.

## Photo rule

For each dedicated legacy page:

1. inventory every source-page image URL in source order;
2. preserve page-level and per-image credits without inventing attribution;
3. connect all verified article media to the matching new article;
4. choose a suitable verified source image for the card/hero (do not blindly use the first image);
5. keep all remaining images in the article gallery;
6. preserve mixed media (illustrations/maps/scans) as such rather than relabelling them as photographs.

Do not use generic fallback art as the final state when the old page has recoverable media.

## Current media state

Verified media inventories exist under `data/legacy-media*.json` for a limited audited subset of high-value pages. `article-media-v4.js` connects these recovered sets at runtime. This is not yet complete coverage of all legacy pages.

Recent corrections:
- p103 / «Музейная почта»: 21 exact source images connected; hero changed to a landscape source image instead of the first portrait image.
- p92 / «Виштынецкие сокровища гномов»: 20 exact mixed-media items connected while keeping photo/illustration attribution separate.
- article lightbox supports arrows, swipe, keyboard navigation and image count.

## Completion gate

Migration is not complete until every discoverable dedicated legacy article/page has been classified as one of:

- FULL: source body + all verified media + credits migrated;
- PARTIAL: source identified but text/media still incomplete;
- ARCHIVE-ONLY: only archive-index evidence exists;
- DEFER: primary source cannot currently be recovered;
- SKIP: intentionally not public, with reason.

Next migration work should prioritize PARTIAL dedicated pages before adding more presentation fallbacks.
