// Verified legacy migration batch 18: missing 2016–2017 archive-index records.
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
    content:[{type:'paragraph',text:`Архив событий Виштынецкого экомузея фиксирует «${title}» (${date}). Подробная отдельная страница пока не захвачена; запись ограничена фактами первичного архивного индекса.`}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  record('museum-film-award-2017','Фильм музея — победитель регионального фестиваля документальных фильмов','Музей','Награды и достижения','1 июля 2017',null,'Архивная запись о победе фильма Виштынецкого экомузея в региональном фестивале документальных фильмов.');
  record('legends-concert-2017','Концерт «Легенды»','Культура','Концерты','1 июля 2017',null,'Архивная запись концерта «Легенды» в Виштынецком экомузее.');
  record('experience-of-place-award-2017','Победа в конкурсе «Опыт места»','Музей','Награды и достижения','2017',null,'Музей стал победителем конкурса «Опыт места» Благотворительного фонда Елены и Геннадия Тимченко.');
  record('near-the-forest-exhibition-2017','Рядом с лесом','Культура','Выставки','5–17 февраля 2017',null,'Выставка «Рядом с лесом» в Калининграде.');
  record('breath-of-herbs-2017','Дыхание трав','Культура','Выставки','2 января — 25 февраля 2017','Ирина Губарева','Выставка флористических сюжетов Ирины Губаревой «Дыхание трав».');
  record('forest-and-people-2016','Лес и люди','Культура','Выставки','6 августа 2016 — 14 июля 2017',null,'Выставка «Лес и люди» в музейной хронике.');
  record('stone-runes-whisper-wood-2016','Каменные руны и шепот дерева','Культура','Выставки','2 июля — 5 августа 2016',null,'Выставка «Каменные руны и шепот дерева».');

  const forest=articles.find(article=>article.id==='forest-village');
  if(forest){
    forest.archiveMilestones=[
      ...(forest.archiveMilestones||[]),
      {date:'май 2016',event:'проект «Лесная деревня» стал победителем конкурса «Меняющийся музей в меняющемся мире»'},
      {date:'5–6 августа 2017',event:'финальное событие проекта — праздник «Лесная деревня. Соседи»'}
    ];
  }

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'museum-film-award-2017','legends-concert-2017','experience-of-place-award-2017',
      'near-the-forest-exhibition-2017','breath-of-herbs-2017','forest-and-people-2016','stone-runes-whisper-wood-2016'
    ])];
  }
})();
