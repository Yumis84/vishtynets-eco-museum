# Preserved HTML media reconciliation — 2026-09-22

Direct parsing of the preserved HTML in `falke0039/wystynez` exposed several errors in earlier search-derived inventories.

Corrections:
- p0090 / forest-village: preserved HTML references 30 JPG content images; `i1272.jpg` was missing from the prior 29-photo set and is now included.
- p33 / donelaitis: the preserved page uses `i0290…i0306` JPGs. The older `i0037…i0063` mapping was not the p33 source set and has been replaced.
- p31 / travelling exposition: preserved p31 HTML directly references four JPGs (`i0349, i0985, i0278, i0986`) plus PNG material. The previous 13-JPG mapping was not the direct p31 set and has been replaced conservatively with the verified JPGs.
- p92 / gnome program: direct HTML has 12 JPGs (`i0743…i0753` plus `i0661`), not the previously inferred i0754–i0762 sequence. The gallery is corrected to the direct source set.
- p0093 / Neighbors 2016: 16 JPGs are directly referenced and now have a dedicated recovered-media mapping.

Already-correct direct source sets were reconfirmed for p24, p0108, p0116 and p0125.

Rule: when preserved HTML and earlier web/search inventory disagree, the preserved repository is authoritative. PNG/SiteCraft support assets remain excluded until their semantic role is verified.
