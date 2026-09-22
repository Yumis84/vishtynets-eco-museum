# Source-batch and media-inventory reconciliation — 2026-09-22

The generated runtime had become more accurate than several source migration batches and JSON inventories. This checkpoint removes that contradiction.

- Source batches 6 and 9 now match the reconciled runtime state rather than retaining old cache-miss/pending assumptions.
- Batch 15 (Museum Mail) now uses 20 real article photos i0911–i0930, landscape hero i0914, preserved-archive URLs, and excludes 2px SiteCraft dividers i0909/i0910.
- p103, p33, p92 and p31 JSON inventories were rebuilt from direct preserved HTML evidence.
- p33 old inferred i0037–i0063 set is replaced by the 13 direct p33 JPGs.
- p92 old inferred 20-image sequence is replaced by 12 direct JPGs; mixed PNGs remain intentionally unclassified.
- p31 old inferred 13-image sequence is replaced by 4 direct JPGs; PNGs remain subject to semantic classification.
- p0117 source batch records the recovered Google My Maps target and preserved brochure path.

No archive binaries were copied to the product repository.
