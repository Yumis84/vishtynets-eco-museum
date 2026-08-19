// Verified legacy migration batch 17: missing 2018–2020 archive-index records.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://wystynez.ru/p0008.htm';
  const record=(id,title,category,subcategory,date,author,deck)=>add({
    id,slug:id,title,category,subcategory,legacyUrl:archive,date,author:author||null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],deck,
    content:[{type:'paragraph',text:`Архив событий Виштынецкого экомузея фиксирует «${title}» (${date}). На текущем этапе отдельная подробная legacy-страница не захвачена, поэтому запись сохраняет только факты из первичного архивного индекса.`}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  record('river-cradle-action-2020','Акция «Речная колыбель»','Природа','Экологические события','21 августа 2020',null,'Архивная запись экологической акции Виштынецкого экомузея.');
  record('nepal-exhibition-2020','Путешествие в Непал','Культура','Выставки','4 февраля 2020 — 4 апреля 2021','Эдуард Карлецкий','Выставка Эдуарда Карлецкого «Путешествие в Непал».');
  record('dances-near-red-forest-2019','Концерт «Танцы возле Красного леса»','Культура','Концерты','24 августа 2019',null,'Архивная запись музейного концерта «Танцы возле Красного леса».');
  record('unknown-vishtynets-photo-exhibition-2019','Фотовыставка «Неизвестный Виштынец»','Культура','Фотовыставки','16 июня 2019','Юлия Алексеева','Фотовыставка Юлии Алексеевой, открытая одновременно с итоговым событием проекта «Неизвестный Виштынец».');
  record('tambovtseva-rominta-2019','Роминтская пуща','Культура','Выставки','6 апреля — 15 июня 2019','Людмила Тамбовцева','Выставка живописи Людмилы Тамбовцевой «Роминтская пуща».');
  record('rominta-music-forest-2018','Роминта. Музыка леса','Культура','Фотовыставки','25 августа 2018 — 31 марта 2019','Юлия Алексеева','Фотовыставка Юлии Алексеевой «Роминта. Музыка леса», открытая во время праздника «Соседи — 2018».');
  record('tambovtseva-magic-flowers-2018','Магия цветов','Культура','Выставки','22 июля — 24 августа 2018','Людмила Тамбовцева','Выставка живописи Людмилы Тамбовцевой «Магия цветов».');
  record('kupala-motifs-2018','Концерт «Купальские мотивы»','Культура','Концерты','7 июля 2018',null,'Архивная запись концерта «Купальские мотивы».');
  record('irena-piltite-tapestries-2018','Вчера, сегодня и всегда','Культура','Выставки','9 июня — 20 июля 2018','Ирена Пилтите','Выставка гобеленов литовской художницы Ирены Пилтите «Вчера, сегодня и всегда».');
  record('voice-of-donelaitis-2018','Голос Донелайтиса','Культура','Литературные события','1 января 2018',null,'Литературные чтения «Голос Донелайтиса».');

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'river-cradle-action-2020','nepal-exhibition-2020','dances-near-red-forest-2019',
      'unknown-vishtynets-photo-exhibition-2019','tambovtseva-rominta-2019','rominta-music-forest-2018',
      'tambovtseva-magic-flowers-2018','kupala-motifs-2018','irena-piltite-tapestries-2018','voice-of-donelaitis-2018'
    ])];
  }
})();
