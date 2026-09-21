# Stale archive-status cleanup — 2026-09-22

After the preserved repository became canonical, runtime metadata was checked for claims that were only true during the earlier web-cache migration.

Resolved:
- p0130 / Neighbors 2024 no longer claims a cache miss; preserved source body is available and represented.
- p0122 no longer reports the brochure URL as pending. Exact archive path is recorded.
- p0121 no longer reports map capture as pending. Exact Google My Maps target is recorded.
- p0108, p0109, p0117, p0120 and p0122 records are marked as verified against the preserved archive rather than merely web-summary verified.

This pass is metadata/content-state cleanup. It does not assert FULL migration for pages whose complete long-form text, captions or non-JPG media still require representation.
