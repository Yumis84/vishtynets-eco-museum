# Legacy migration QA — 2026-10-09

## Executed checks

| Check | Result | Evidence |
|---|---|---|
| JSON parse for restoration/media/matrix summary | PASS | `data/legacy-restored-priority.json`, `data/legacy-restored-media.json`, `docs/legacy-migration-matrix-summary.json` |
| CSV parse and row count | PASS | `docs/legacy-migration-matrix.csv`, 268 rows |
| JavaScript syntax | PASS | `app.js`, `article-media-v4.js`, `articles-v3.js`, `museum-legacy-restored.js`, build/export scripts with `node --check` |
| Local script references in `index.html` | PASS | all non-remote script files exist |
| Runtime bundle evaluation in stub DOM | PASS | 173 reconciled article records; restoration patches applied to canonical IDs; no duplicate article IDs |
| Archival cover safety rule | PASS | archival records without a verified legacy image now render no cover; thematic fallback art is not used as historical evidence |
| Donor text extraction and Unicode replacement check | PASS | priority extraction report; pinned donor commit `ba42a20180cc475e176c8b98606568580b754171` |

## Not run / blockers

- Public desktop/mobile browser QA: **NOT RUN**. The available Playwright package has no installed Chromium executable in this environment; no successful browser assertion is claimed.
- Full remote image/PDF/gallery fetch sweep: **NOT RUN** in this checkpoint. Repository mappings are source-pinned, but remote availability is not inferred from source presence.
- `rominten.wystynez.ru`: **DEFER**. Tested live root response matched the main legacy-site response shape; it is not reliable evidence for the historical subsection. Dedicated primary/reliable archive capture remains required.
- `FULL` statuses: intentionally none. The matrix uses `PARTIAL` until exact source-to-runtime media parity and public rendering are verified.

No production, `main`, DNS, Pages settings, audio guide or booking files were changed.
