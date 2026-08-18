// Verified legacy migration batch 8: earliest archive-index records, 2002-2007.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  const records=[
    {
      id:'lomonosov-readings-2007',slug:'lomonosov-readings-2007',title:'Участие в юношеских Ломоносовских чтениях',
      category:'Музей',subcategory:'Образовательные программы',date:'август 2007',
      deck:'Участие воспитанницы Виштынецкого экомузея в пятых юношеских Ломоносовских чтениях.'
    },
    {
      id:'international-volunteer-camp-2007',slug:'international-volunteer-camp-2007',title:'Международный лагерь волонтёров — 2007',
      category:'Музей',subcategory:'Волонтёрство',date:'август 2007',
      deck:'Международный лагерь волонтёров, отмеченный в архиве музея в августе 2007 года.'
    },
    {
      id:'children-school-forest-2006',slug:'children-school-forest-2006',title:'Дети, школа, лес',
      category:'Культура',subcategory:'Выставки',date:'с 31 августа 2006',
      deck:'Выставка о детях и школе в посёлке Краснолесье.'
    },
    {
      id:'gruss-aus-rominten-2006',slug:'gruss-aus-rominten-2006',title:'Привет из Роминтен — Gruss aus Rominten',
      category:'История',subcategory:'Выставки',date:'15 августа — 4 сентября 2006',
      deck:'Выставка Виштынецкого экомузея в Калининградском Немецко-Русском доме.'
    },
    {
      id:'my-world-my-land-2006',slug:'my-world-my-land-2006',title:'Мой мир — моя земля',
      category:'Музей',subcategory:'Образовательные программы',date:'февраль — сентябрь 2006',
      deck:'Конкурс детских творческих работ «Мой мир — моя земля».'
    },
    {
      id:'museum-world-ocean-exposition-2006',slug:'museum-world-ocean-exposition-2006',title:'Экспозиция Виштынецкого экомузея в Музее Мирового океана',
      category:'Музей',subcategory:'Экспозиции',date:'22 марта — 24 апреля 2006',
      deck:'Экспозиция Виштынецкого экомузея в Калининграде в Музее Мирового океана.'
    },
    {
      id:'museums-russia-domain-2006',slug:'museums-russia-domain-2006',title:'Портал «Музеи России» предоставил музею домен',
      category:'Музей',subcategory:'История музея',date:'2006',
      deck:'Архивная запись о предоставлении Виштынецкому экомузею домена порталом «Музеи России» к девятилетию портала.'
    },
    {
      id:'crossroads-memory-wilhelm-louise-2005',slug:'crossroads-memory-wilhelm-louise-2005',title:'Перекрёсток памяти — Вильгельм и Луиза',
      category:'История',subcategory:'Выставки',date:'с 24 сентября 2005',
      deck:'Выставка «Перекрёсток памяти — Вильгельм и Луиза».'
    },
    {
      id:'chistye-prudy-exposition-2005',slug:'chistye-prudy-exposition-2005',title:'Экспозиция Виштынецкого экомузея в Чистых Прудах — 2005',
      category:'Музей',subcategory:'Экспозиции',date:'июнь — ноябрь 2005',
      deck:'Экспозиция Виштынецкого экомузея в посёлке Чистые Пруды.'
    },
    {
      id:'kgtu-exposition-2005',slug:'kgtu-exposition-2005',title:'Экспозиция Виштынецкого экомузея в Калининграде — 2005',
      category:'Музей',subcategory:'Экспозиции',date:'март — май 2005',
      deck:'Экспозиция Виштынецкого экомузея в музее КГТУ в Калининграде.'
    },
    {
      id:'scientific-expedition-upland-2004',slug:'scientific-expedition-upland-2004',title:'Научная экспедиция по Виштынецкой возвышенности — 2004',
      category:'Природа',subcategory:'Экспедиции',date:'август 2004',
      deck:'Научная экспедиция по Виштынецкой возвышенности, отмеченная в архиве музея.'
    },
    {
      id:'photo-plein-air-red-forest-2004',slug:'photo-plein-air-red-forest-2004',title:'Фотоплэнер в Красном лесу',
      category:'Культура',subcategory:'Фотография',date:'июль 2004',
      deck:'Фотоплэнер в Красном лесу, зафиксированный в музейном архиве событий.'
    },
    {
      id:'tselau-lost-world-2002',slug:'tselau-lost-world-2002',title:'Целау — затерянный мир',
      category:'Природа',subcategory:'Выставки',date:'октябрь 2002 — июнь 2005',
      deck:'Фотовыставка об уникальном верховом болоте Калининградской области в Историко-художественном музее.'
    },
    {
      id:'rominten-between-past-future-2002',slug:'rominten-between-past-future-2002',title:'Роминтенская пуща — между прошлым и будущим',
      category:'История',subcategory:'Выставки',date:'февраль 2002 — январь 2004',
      deck:'Одна из ранних больших фотовыставок Виштынецкого экомузея о Роминтенской пуще.'
    }
  ];

  records.forEach(record=>add({
    ...record,legacyUrl:archive,author:null,archival:true,hero:null,images:[],relatedPoiIds:[],
    content:[{type:'paragraph',text:`Архив Виштынецкого экомузея фиксирует событие «${record.title}» (${record.date}). В текущем проходе отдельная подробная страница не захвачена, поэтому запись содержит только сведения, подтверждённые музейной архивной лентой.`}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  }));

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'lomonosov-readings-2007','international-volunteer-camp-2007','children-school-forest-2006',
      'my-world-my-land-2006','museum-world-ocean-exposition-2006','museums-russia-domain-2006',
      'chistye-prudy-exposition-2005','kgtu-exposition-2005'
    ])];
  }
})();
