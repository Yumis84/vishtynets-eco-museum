// Verified legacy migration batch 23: archive-index correction for a previously omitted 2009 Gnomes exhibition.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  if(articles.some(article=>article.id==='gnome-treasures-exhibition-spb-2009'))return;
  const article={
    id:'gnome-treasures-exhibition-spb-2009',slug:'gnome-treasures-exhibition-spb-2009',
    title:'Выставка «Виштынецкие сокровища гномов» в Санкт-Петербурге',
    category:'Музей',subcategory:'Выставки',legacyUrl:'https://www.wystynez.ru/p0008.htm',date:'июнь 2009',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись Виштынецкого экомузея о выставке «Виштынецкие сокровища гномов» в Санкт-Петербурге.',
    content:[{type:'paragraph',text:'Архив событий Виштынецкого экомузея фиксирует открытие в Санкт-Петербурге выставки «Виштынецкие сокровища гномов» в июне 2009 года. Более подробное содержание в текущем проходе по первоисточнику не восстановлено, поэтому запись не расширяется догадками.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['gnome-treasures-project']
  };
  articles.push(article);
  const museum=points.find(point=>point.id==='poi_museum');
  if(museum) museum.articleIds=[...new Set([...(museum.articleIds||[]),article.id])];
})();
