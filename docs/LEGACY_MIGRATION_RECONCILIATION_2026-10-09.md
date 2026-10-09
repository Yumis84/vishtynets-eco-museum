# Legacy migration reconciliation — 2026-10-09

Machine-readable matrix: `docs/legacy-migration-matrix.csv`. Donor commit: `ba42a20180cc475e176c8b98606568580b754171`.

The preserved donor contains **130 HTML rows**; the matrix adds **138 runtime-only rows** so the populations are not falsely treated as identical. Current runtime contains **173 reconciled article records**.

## Current classification

| Status | Count | Meaning |
|---|---:|---|
| ARCHIVE-ONLY | 231 | No source/runtime representation yet or archive-index evidence only |\n| PARTIAL | 34 | Source identified; text/media/public verification remains |\n| SKIP | 3 | Navigation/support or intentionally excluded |\n
`FULL` is intentionally zero at this checkpoint: source text restoration and repository mappings are implemented, but final source-media parity and public desktop/mobile rendering have not yet been verified.

The matrix records exact source byte hashes, titles, source image/document counts, runtime block/media counts, source paths and next actions. `rominten.wystynez.ru` remains a separate DEFER workstream because the live host currently mirrors the main site response for the tested root and cannot be treated as reliable historical evidence.
