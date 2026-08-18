// Verified legacy migration batch 5: archive-index event records from wystynez.ru/p0008.htm.
// These records intentionally contain only facts explicitly present in the primary archive index.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  add({
    id:'ark-photo-exhibition-2021',slug:'ark-photo-exhibition-2021',title:'Фотовыставка «Ковчег»',
    category:'Культура',subcategory:'Выставки',legacyUrl:archive,date:'10 июля 2021 — 10 января 2022',
    author:'Юрий Бутерус и Юлия Алексеева',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись Виштынецкого экомузея о фотовыставке Юрия Бутеруса и Юлии Алексеевой.',
    content:[{type:'paragraph',text:'Архив событий Виштынецкого экомузея фиксирует фотовыставку «Ковчег» Юрия Бутеруса и Юлии Алексеевой, проходившую с 10 июля 2021 года по 10 января 2022 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'macro-world-red-forest-2021',slug:'macro-world-red-forest-2021',title:'Макромир Красного леса',
    category:'Природа',subcategory:'Выставки',legacyUrl:archive,date:'6 апреля — 9 июля 2021',
    author:'Дмитрий Домнин',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музея о выставке Дмитрия Домнина «Макромир Красного леса».',
    content:[{type:'paragraph',text:'Архив событий музея фиксирует выставку Дмитрия Домнина «Макромир Красного леса», проходившую с 6 апреля по 9 июля 2021 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'colors-of-summer-2019',slug:'colors-of-summer-2019',title:'Краски лета',
    category:'Культура',subcategory:'Выставки',legacyUrl:archive,date:'с 15 октября 2019',
    author:'Наталья Урвачёва',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музея о выставке живописи Натальи Урвачёвой «Краски лета».',
    content:[{type:'paragraph',text:'Архив музея фиксирует выставку живописи Натальи Урвачёвой «Краски лета», открытую с 15 октября 2019 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'breath-of-herbs-2019',slug:'breath-of-herbs-2019',title:'Дыхание трав',
    category:'Культура',subcategory:'Выставки',legacyUrl:archive,date:'с 13 октября 2019',
    author:'Ирина Губарева',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Флористические сюжеты Ирины Губаревой — архивная запись выставки Виштынецкого экомузея.',
    content:[{type:'paragraph',text:'Архив событий музея фиксирует выставку «Дыхание трав» — флористические сюжеты Ирины Губаревой, открытую с 13 октября 2019 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'neighbors-2019',slug:'neighbors-2019',title:'Соседи — 2019',
    category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:archive,date:'10 августа 2019',
    author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Международный праздник «Соседи» в Краснолесье — запись из музейной летописи праздника.',
    content:[{type:'paragraph',text:'Музейная летопись фиксирует международный праздник «Соседи», состоявшийся в Краснолесье 10 августа 2019 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'neighbors-2016',slug:'neighbors-2016',title:'Соседи — 2016',
    category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:archive,date:'6 августа 2016',
    author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Международный культурно-фольклорный фестиваль «Соседи» — запись из музейной летописи.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует международный культурно-фольклорный фестиваль «Соседи», состоявшийся 6 августа 2016 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'neighbors-2015',slug:'neighbors-2015',title:'Соседи — 2015',
    category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:archive,date:'8 августа 2015',
    author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Международный культурно-фольклорный фестиваль «Соседи» — запись из музейной летописи.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует международный культурно-фольклорный фестиваль «Соседи», состоявшийся 8 августа 2015 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'rominta-festival-2014',slug:'rominta-festival-2014',title:'Праздник Роминты — 2014',
    category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:archive,date:'16 августа 2014',
    author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Фестиваль «Праздник Роминты» — ранняя запись в музейной летописи будущей серии праздников «Соседи».',
    content:[{type:'paragraph',text:'Архив музея фиксирует фестиваль «Праздник Роминты», состоявшийся 16 августа 2014 года. В архивной летописи праздников он расположен перед последующими ежегодными событиями «Соседи».'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'ark-photo-exhibition-2021','macro-world-red-forest-2021','colors-of-summer-2019','breath-of-herbs-2019',
      'neighbors-2019','neighbors-2016','neighbors-2015','rominta-festival-2014'
    ])];
  }
})();
