// Verified legacy migration batch 7: museum archive-index records for 2009-2011.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  add({
    id:'childrens-research-expedition-2011',slug:'childrens-research-expedition-2011',
    title:'Детская исследовательская экспедиция в Роминтской пуще',category:'Природа',subcategory:'Экспедиции',
    legacyUrl:archive,date:'8–14 июля 2011',author:null,archival:true,hero:null,images:[],relatedPoiIds:[],
    deck:'Архивная запись музея о детской исследовательской экспедиции в Роминтской пуще.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует детскую исследовательскую экспедицию в Роминтской пуще, проходившую 8–14 июля 2011 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'shadows-old-forest-2011',slug:'shadows-old-forest-2011',
    title:'Тени старого леса',category:'Музей',subcategory:'Музейная ночь',
    legacyUrl:archive,date:'14–15 мая 2011',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Музейная ночь в Краснолесье 2011 года — «Тени старого леса».',
    content:[{type:'paragraph',text:'Архив музея фиксирует музейную ночь в Краснолесье «Тени старого леса», состоявшуюся 14–15 мая 2011 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'bitsevsky-volunteer-camp-2011',slug:'bitsevsky-volunteer-camp-2011',
    title:'Лагерь волонтёров из парка «Битцевский лес»',category:'Музей',subcategory:'Волонтёрство',
    legacyUrl:archive,date:'1–10 мая 2011',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись о лагере волонтёров природно-исторического парка «Битцевский лес».',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует лагерь волонтёров из природно-исторического парка «Битцевский лес», проходивший 1–10 мая 2011 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'museum-information-center-opening-2011',slug:'museum-information-center-opening-2011',
    title:'Открытие музейно-информационного центра в Краснолесье',category:'Музей',subcategory:'История музея',
    legacyUrl:archive,date:'29 апреля 2011',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Торжественное открытие музейно-информационного центра Виштынецкого экомузея в Краснолесье.',
    content:[{type:'paragraph',text:'Архив музея фиксирует торжественное открытие музейно-информационного центра в Краснолесье 29 апреля 2011 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'eco-trails-contest-2011',slug:'eco-trails-contest-2011',
    title:'Конкурс экологических и эколого-краеведческих троп',category:'Природа',subcategory:'Образовательные программы',
    legacyUrl:archive,date:'22 апреля 2011',author:null,archival:true,hero:null,images:[],relatedPoiIds:[],
    deck:'Конкурс экологических и эколого-краеведческих троп в Роминтской пуще.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует конкурс экологических и эколого-краеведческих троп в Роминтской пуще 22 апреля 2011 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'museum-night-2010',slug:'museum-night-2010',
    title:'Музейная ночь в Краснолесье — 2010',category:'Музей',subcategory:'Музейная ночь',
    legacyUrl:archive,date:'15–16 мая 2010',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музейной ночи в Краснолесье 15–16 мая 2010 года.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует музейную ночь в Краснолесье, состоявшуюся 15–16 мая 2010 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'stars-over-krasnolesye-2010',slug:'stars-over-krasnolesye-2010',
    title:'Звёзды над Краснолесьем',category:'Музей',subcategory:'Образовательные программы',
    legacyUrl:archive,date:'январь 2010',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Образовательный проект музея «Звёзды над Краснолесьем».',
    content:[{type:'paragraph',text:'Архив музея фиксирует образовательный проект «Звёзды над Краснолесьем» в январе 2010 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'journey-to-krasnolesye-camp-2009',slug:'journey-to-krasnolesye-camp-2009',
    title:'Путешествие в Краснолесье',category:'Музей',subcategory:'Образовательные программы',
    legacyUrl:archive,date:'октябрь 2009',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Детский познавательный лагерь «Путешествие в Краснолесье».',
    content:[{type:'paragraph',text:'Архив музея фиксирует детский познавательный лагерь «Путешествие в Краснолесье» в октябре 2009 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'waste-impact-seminar-2009',slug:'waste-impact-seminar-2009',
    title:'Минимализация негативного влияния отходов на окружающую среду: польский опыт',
    category:'Природа',subcategory:'Экология и охрана природы',legacyUrl:archive,date:'июнь 2009',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Экологический семинар о польском опыте снижения негативного влияния отходов на окружающую среду.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует семинар «Минимализация негативного влияния отходов на окружающую среду, польский опыт» в июне 2009 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'animal-graphics-pushkareva-2009',slug:'animal-graphics-pushkareva-2009',
    title:'Анималистическая графика Татьяны Пушкарёвой',category:'Культура',subcategory:'Выставки',
    legacyUrl:archive,date:'март–апрель 2009',author:'Татьяна Пушкарёва',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись выставки анималистической графики Татьяны Пушкарёвой из Москвы.',
    content:[{type:'paragraph',text:'Архив музея фиксирует выставку анималистической графики Татьяны Пушкарёвой (Москва), проходившую в марте–апреле 2009 года в Калининграде.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'shadows-old-forest-2011','bitsevsky-volunteer-camp-2011','museum-information-center-opening-2011',
      'museum-night-2010','stars-over-krasnolesye-2010','journey-to-krasnolesye-camp-2009',
      'waste-impact-seminar-2009','animal-graphics-pushkareva-2009'
    ])];
  }
})();
