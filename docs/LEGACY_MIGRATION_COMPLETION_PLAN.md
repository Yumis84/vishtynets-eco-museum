# Legacy migration completion plan

Checkpoint: 2026-10-09. Branch: `feature/legacy-migration-completion`. **Audit in progress; no production changes.**

## Verified repository evidence

- Public runtime contains **173 reconciled article records**, but this includes archive-index summaries and provenance/recovery records, not 173 complete transcriptions. Source: `docs/ARTICLE_TEXT_MEDIA_MIGRATION_AUDIT_2026-09-22.md`.
- `falke0039/wystynez` contains preserved source HTML and downloadable PDF files, including `download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf`. Prefer this canonical preservation to unreliable live legacy fetching.
- `docs/STALE_ARCHIVE_STATUS_CLEANUP_2026-09-22.md` supersedes older pending claims: p0121 map destination and p0122 brochure path were recovered; p0108, p0109, p0117, p0120 and p0122 have preserved-archive verification. **Source verification does not imply full-text migration.**
- Existing media audit confirms p103 has 21 exact connected images but its article body remains a short summary. p92 mixed-media attribution is unresolved. Source: `docs/ARTICLE_TEXT_MEDIA_MIGRATION_AUDIT_2026-09-22.md`.

## Priority verification matrix

| Legacy page | Evidence | Current classification | Required next action |
| --- | --- | --- | --- |
| p103 | 21 original images connected; short summary | PARTIAL | Transcribe and structure complete preserved source text; retain credits |
| p0122 | Preserved archive verified; brochure exact path recovered | PARTIAL (full-text parity not proven) | Compare full body, captions, attachments and runtime link |
| p0121 | Exact map destination recovered | PARTIAL (link integration unverified) | Check destination in runtime and map attribution |
| p0120 | Preserved archive verified | PARTIAL (full-text parity not proven) | Compare full body and media |
| p0117 | Preserved archive verified; conservative image subset | PARTIAL | Compare full text; review deferred mixed assets individually |
| p0106 | Historical seed exists | PARTIAL (full-text parity not proven) | Compare preserved source and seed |
| p0108, p0109 | Preserved archive verified; selected media recovered | PARTIAL (full-text parity not proven) | Check body, captions, and all images |
| p92 | 20 mixed-media assets linked; roles not classified | DEFER media classification | Inspect binaries and establish per-image attribution; do not guess |
| rominten.wystynez.ru | Primary pages not reliably recovered | DEFER | Locate reliable preserved source |
| p0087 | Publication catalogue, some exact targets unresolved | PARTIAL | Match downloadable documents to preserved archive |
| p38 | Not established in this checkpoint | UNVERIFIED | Verify actual legacy filename and runtime representation before editing |

**Important:** classifications above are conservative work-queue labels, not a completed page-by-page inventory. Do not compute a completion percentage from them.

## Execution sequence

1. Inventory every dedicated `.htm` source page from `falke0039/wystynez`; match to runtime article records by canonical legacy URL, not title alone. Distinguish archive-index-only entries.
2. Build a machine-checkable CSV/JSON matrix with source URL, target slug, source-body coverage, media count, credit coverage, attachments, verification evidence, and one of FULL / PARTIAL / ARCHIVE-ONLY / DEFER / SKIP. Preserve exact evidence links.
3. Restore **source-faithful text** and associated media in small batches, starting p103 and p0122; avoid AI paraphrases and unsupported historical assertions.
4. Verify PDFs/maps against preserved binary files and real anchor destinations. Never publish obsolete prices, schedules or contacts as current.
5. Run project checks and browser/mobile QA. If unavailable, mark NOT RUN with reason rather than PASS.
6. Update matrix counts, test results and unresolved items in this document before requesting review.

## Acceptance gates

- Every discoverable dedicated source page classified with evidence; totals reconcile with runtime and archive-index records.
- Every FULL record has complete recoverable body, verified gallery, captions and credits.
- All remaining PARTIAL and DEFER records carry explicit blockers.
- Tests and public/mobile QA reported separately, with actual results.
- Review through Draft PR only; do not merge or deploy without approval.

## Current execution status

- [x] Read previous migration and stale-status audits.
- [x] Confirmed preserved donor repository and recovered PDF evidence.
- [x] Created isolated feature branch.
- [ ] Complete page-by-page source/runtime reconciliation.
- [ ] Restore missing article bodies and media.
- [ ] Run automated tests and deployed mobile QA.
- [ ] Final verified counts and closeout.
