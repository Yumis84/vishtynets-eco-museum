# AGENT HANDOFF: Complete historical museum migration (2026-10-09)

**Purpose:** Standalone execution brief for ChatGPT Work, Codex, Claude, and future agents. Start here, then read the linked audits. This file is the operational task brief, **not** proof that migration is complete.

## Project and authoritative sources

The museum has **TWO DISTINCT LEGACY SOURCES**, not one:

1. **Preserved GitHub archive (PRIMARY working source for migration):** [falke0039/wystynez](https://github.com/falke0039/wystynez). This repository holds restored original SiteCraft HTML pages, original images and downloadable documents. Its `SITE-AUDIT.md` reports **130 HTML pages** and warns about malformed charset declarations in many originals. Use this repository first to obtain source texts, image references, captions and exact document links. The current migration is **already copying/reconstructing content from this GitHub archive**; do not restart from zero or unnecessarily re-scrape it.
2. **Original legacy website (SECOND source for cross-checking and missing evidence):** `https://www.wystynez.ru/` / `https://wystynez.ru/` (legacy museum site; do not confuse the domain spelling with `vishtynets.ru`). Use it for comparing pages and recovering any missing assets or metadata where accessible. Its historical `rominten.wystynez.ru` subdomain requires separate reliable source verification. Network access and old encoding may be unreliable. **Never silently substitute a search snippet for a full original page.**

**Destination and only production site:** `https://vishtynets.ru/`, code repository [Yumis84/vishtynets-eco-museum](https://github.com/Yumis84/vishtynets-eco-museum), `main` published via GitHub Pages. **Do not touch production, DNS, CNAME, Pages settings or main.**

Three entry domains `krasnolesye39.ru`, `краснолесье39.рф`, `krasnolesye39.online` have **separate GitHub Pages repositories** and redirect to the museum. Their setup is a different finished phase (pending final DNS/HTTPS checks), not part of this migration. Do not edit them.

Other related projects such as `guest-house-map` and `sauna-map-prototype` are out of scope. Museum audio guide and booking integrations must remain intact.

## Starting checkpoint: what was actually established

- Last production `main` commit observed: `b5555db1c005f452ea89b971814bf39565893597` (2026-09-22), PR #69, reconciling migration source batches and media inventories. Recheck for concurrent changes before working.
- Existing source/runtime includes **173 reconciled article records**, but that is **NOT** 173 fully migrated articles. Some entries are archive-index-only summaries or provenance records. No trustworthy overall migration percentage exists yet.
- Source batches `museum-legacy-batch-*.js`, `data/legacy-media*.json`, `article-media-v4.js` and other runtime files already contain substantial recovered content. Read and reconcile them instead of duplicating articles.
- Original site event index `p0008.htm` covers historical events (2002–2024). Its short listings are not automatically full detail-page transcriptions.
- Preserved archive contains `download/Broshjura-Valuny-Vishtyneckoj-vozvyshennosti.pdf`, `download/Polozhenie-o-konkurse-Legenda-o-kamne.pdf` and other originals. Previous claims that the p0122 brochure or p0121 map URL were unknown are **outdated**; see `docs/STALE_ARCHIVE_STATUS_CLEANUP_2026-09-22.md`.
- p103 («Музейная почта»): 21 exact original images are linked, but article text is still a short summary rather than verified complete source transcription.
- p92: 20 mixed-media items are linked, but classification/attribution of photography, illustration and diagrams is not fully established.
- Some pages p0108, p0109, p0117, p0120, p0122 are marked verified against the preserved archive, **which does not mean all text/media were migrated**.
- The GitHub archive audit lists `p38.htm`; inspect its actual content and mapping, rather than assume its title from prior informal plans.
- Existing audit documents may contain superseded statements. Treat newer evidence with verifiable file/commit references as stronger, document discrepancies.

## Mandatory reading (in this order)

1. This file and `docs/LEGACY_MIGRATION_COMPLETION_PLAN.md`.
2. `docs/ARTICLE_TEXT_MEDIA_MIGRATION_AUDIT_2026-09-22.md`.
3. `docs/STALE_ARCHIVE_STATUS_CLEANUP_2026-09-22.md`.
4. `docs/LEGACY_MIGRATION_FINAL_MATRIX.md` and `MIGRATION_INVENTORY.md`.
5. `docs/LEGACY_MEDIA_INVENTORY.md`, `docs/LEGACY_RECOVERY_EVIDENCE_2026-09-21.md`, `docs/RUNTIME_LINK_ENCODING_AUDIT_2026-09-21.md`.
6. Preserved archive `falke0039/wystynez/SITE-AUDIT.md`, source `.htm` pages and media.
7. Current runtime source, build scripts, existing tests, package scripts and GitHub workflows.

## Execution mandate

**Do the work, not merely produce another plan.** Work autonomously in the existing branch `feature/legacy-migration-completion` and update [Draft PR #70](https://github.com/Yumis84/vishtynets-eco-museum/pull/70). Do not create redundant branches/PRs if this branch remains usable. Check branch state and concurrent edits first.

### Phase A: exhaustive reconciliation

Inventory all 130 HTML source pages reported by preserved `SITE-AUDIT.md` (verify count independently, distinguish navigation, duplicates, index pages and dedicated articles). Parse source carefully: legacy charset may be malformed and source may be Windows-1251. Do not corrupt Cyrillic text.

Create a durable machine-readable inventory (`docs/legacy-migration-matrix.csv` or `data/legacy-migration-matrix.json`) plus readable summary. For each canonical source page include: original GitHub path and live legacy URL; title/date; type (article/event/navigation/archive index); new runtime slug; source text coverage; source image count vs mapped images; captions/credits; document/map anchors; evidence links; verification date; precise next action; status FULL, PARTIAL, ARCHIVE-ONLY, DEFER or SKIP (with reason). Include runtime-only and archive-index-only entries separately. Avoid comparing 130 source HTML files directly to 173 runtime records as if the populations were identical.

### Phase B: restoration

Prioritize p103, p0122, p0120, p0117, p0106, p0108, p0109, p0121, p0087, p92, then remaining verified PARTIAL pages; verify p38 identity. Restore **full original text** wherever recoverable: headings, paragraph order, dates, names, captions, original attributions and links. Never replace long original texts with generated summaries. Any new editorial prose must be clearly separated. Avoid duplicate canonical articles.

Preserve all verified images, correct hero/gallery selection and source order; do not call an illustration a photo or fabricate authorship. For large original media, follow `docs/LEGACY_ARCHIVE_STORAGE_POLICY_2026-09-22.md`; avoid dumping donor binaries into the modern repo. Recover original PDF and map targets from the preserved archive and verify runtime links.

Treat historical visitor prices, opening hours, phone numbers, accommodation terms and service rules as **historical only**, not current operational data.

### Phase C: verification and acceptance

Run available automated tests, lint/build checks and static validation; verify runtime links and article/image counts; perform real public desktop/mobile QA if tooling permits. Report actual PASS/FAIL/NOT RUN, never invent test results. Test gallery/lightbox, Russian encoding, archive navigation, source credits and PDF/map links. Keep audio guide, visitor info, museum map and other existing functions working.

Update matrix with exact FULL/PARTIAL/ARCHIVE-ONLY/DEFER/SKIP counts, reconciled denominators, and remaining blockers. No percentage unless derived from explicit reconciled scope.

### Phase D: review and handoff

Commit logical, reviewable batches to `feature/legacy-migration-completion`; update Draft PR #70 with summary, changed pages, evidence, tests, remaining blockers and accurate status. **Never merge PR, push main, deploy or change live site without explicit approval.**

Use AI Agent Hub for coordination if available and authorized: check available Project Spaces first; only write to an appropriate museum-specific space if one exists and permission is confirmed. Do **not** put museum operational context into unrelated AI AGENT HUB, SHAVALLEYA or STUDENT-AGENCY spaces. GitHub is the authoritative handoff when a museum Project Space is absent. If another agent is involved, share PR and this brief, not secrets.

## Completion criteria

- All recoverable dedicated source pages are reconciled and classified with evidence.
- FULL means faithful original text plus verified associated media, captions, credits and working links.
- Remaining partial/deferred entries have specific reasons, not vague 'later'.
- Runtime and published/mobile checks are explicitly reported.
- Draft PR contains tested changes; no production modification.
- Final answer gives real counts, changes, blockers and PR URL.

## Work already performed in this branch

- Branch `feature/legacy-migration-completion` created from `main`.
- Initial `docs/LEGACY_MIGRATION_COMPLETION_PLAN.md` added.
- Draft PR #70 opened. **At this checkpoint no article body restoration or automated QA was performed.**
