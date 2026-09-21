// Runtime reconciliation for duplicate recovery records created during historical migration passes.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const aliases={
    'unknown-vishtynets-project':'unknown-vishtynets',
    'visit-the-stone-results-2021':'anatomy-stone',
    'stone-project-results-2021':'anatomy-stone',
    'legacy-exhibition-history-p40':'museum-exposition',
    'travelling-exposition-opening-2004':'travelling-exposition-2004',
    'legacy-exhibition-opening-2004':'travelling-exposition-2004',
    'unknown-vishtynets-event-2018':'unknown-vishtynets-meeting-2018',
    'visit-the-stone-project':'v-gosti-k-kamnyu',
    'stone-visit-project':'v-gosti-k-kamnyu',
    'legend-of-stone-contest-2021':'legend-of-stone-contest',
    'legend-stone-2021':'legend-of-stone-contest',
    'maxim-jack-memorial-2020':'scouts-maxim-jack'
  };
  const remap=id=>aliases[id]||id;
  for(let i=articles.length-1;i>=0;i--){
    if(aliases[articles[i]?.id])articles.splice(i,1);
  }
  articles.forEach(article=>{
    if(Array.isArray(article.relatedArticleIds))article.relatedArticleIds=[...new Set(article.relatedArticleIds.map(remap))];
  });
  points.forEach(point=>{
    if(Array.isArray(point.articleIds))point.articleIds=[...new Set(point.articleIds.map(remap))];
  });
  window.MUSEUM_LEGACY_RUNTIME_ALIASES=aliases;
})();
