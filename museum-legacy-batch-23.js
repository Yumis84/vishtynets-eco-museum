// Verified legacy migration batch 23: archive-index correction from direct p0008.htm HTML verification.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  add({
    id:'gnome-treasures-exhibition-spb-2014',slug:'gnome-treasures-exhibition-spb-2014',
    title:'Выставка «Виштынецкие сокровища гномов» в Санкт-Петербурге',
    category:'Музей',subcategory:'Выставки',legacyUrl:archive,date:'19 февраля 2014',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись Виштынецкого экомузея об открытии в Санкт-Петербурге выставки «Виштынецкие сокровища гномов».',
    content:[{type:'paragraph',text:'Прямо прочитанный HTML архивной страницы p0008.htm фиксирует открытие в Санкт-Петербурге выставки «Виштынецкие сокровища гномов» 19 февраля 2014 года. Более подробное содержание в текущем проходе не восстановлено, поэтому запись не расширяется догадками.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['gnome-treasures-project']
  });

  add({
    id:'donelaitis-300-krasnolesye-2014',slug:'donelaitis-300-krasnolesye-2014',
    title:'300-летие Кристионаса Донелайтиса в Краснолесье',
    category:'Культура',subcategory:'Литература и наследие',legacyUrl:archive,date:'1 января 2014',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись о праздновании 300-летнего юбилея Кристионаса Донелайтиса в Краснолесье.',
    content:[{type:'paragraph',text:'Архив событий музея фиксирует празднование 300-летнего юбилея Кристионаса Донелайтиса в посёлке Краснолесье 1 января 2014 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['donelaitis']
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum) museum.articleIds=[...new Set([...(museum.articleIds||[]),'gnome-treasures-exhibition-spb-2014','donelaitis-300-krasnolesye-2014'])];
})();
