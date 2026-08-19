// Verified legacy migration batch 20: connect exact Forest Village media inventory without over-attributing or rendering unverified legacy graphics.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const forest=articles.find(article=>article.id==='forest-village');
  if(!forest)return;

  forest.sourceMediaStatus='39_exact_legacy_media_urls_captured_visual_role_review_pending';
  forest.sourceMediaInventoryFile='data/legacy-media-batch-5.json';
  forest.sourceMediaCount=39;
  forest.sourceMediaCreditScope='page_level_collective';
  forest.photoCredits=['Александр Матвеев','Алексей Соколов','Эдуард Барсуков'];
  forest.mediaDisplayPolicy='Keep current verified hero/gallery images; do not automatically display every captured file until its visual role is checked because legacy PNG files may be decorative graphics.';
})();
