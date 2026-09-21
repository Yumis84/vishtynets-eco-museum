# Article gallery/runtime cache correction — 2026-09-22

Two runtime issues were found during the preserved-archive migration:

1. `openArticle()` rendered only `a.images.slice(0,6)`. The lightbox correctly navigated images present in the DOM, but images 7+ were never rendered, so a 21-image migrated gallery was effectively limited to six gallery items plus the hero.
2. The top-level cache keys in `index.html` had not advanced with recent nested runtime changes. In particular, `articles-v3.js?v=2` could keep an older loader even though that loader now points to `article-media-v4.js?v=6`. `app.js?v=14` could similarly hide recent article-reader/favorite changes.

Correction:
- article galleries now render the complete verified `a.images` collection;
- `app.js` cache key -> v15;
- `articles-v3.js` cache key -> v3;
- `app.css` cache key -> v13.

This is required for the archive migration rule that all verified article media remain accessible to the visitor.
