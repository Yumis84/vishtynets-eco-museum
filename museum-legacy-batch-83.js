// Verified legacy migration batch 83: source-preserving migration of p48.htm (geographical context page).
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(a=>a.id));
  const add=a=>{if(!existing.has(a.id)){articles.push(a);existing.add(a.id)}};

  add({
    id:'vishtynets-upland-map-context',
    slug:'vishtynets-upland-map-context',
    title:'Виштынецкая возвышенность на карте мира',
    category:'Природа',
    subcategory:'География',
    legacyUrl:'https://www.wystynez.ru/p48.htm',
    date:'2006',
    author:null,
    archival:true,
    deck:'Географический материал старого сайта о положении Виштынецкой возвышенности, её ландшафте и Роминтской пуще.',
    hero:'https://wystynez.ru/sc-pic/i0441.jpg',
    images:[
      {src:'https://wystynez.ru/sc-pic/i0429.jpg',caption:'Виштынецкая возвышенность на карте мира',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0431.png',caption:'Карта-схема положения Виштынецкой возвышенности',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0433.png',caption:'Россия',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0435.png',caption:'Литва',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0437.png',caption:'Польша',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0139.jpg',caption:'Музейно-информационный центр Виштынецкого экомузея в посёлке Краснолесье',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0438.png',caption:'На холмах Виштынецкой возвышенности',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0439.png',caption:'На холмах Виштынецкой возвышенности',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0441.jpg',caption:'Физическая карта / спутниковый контекст Виштынецкой возвышенности',credit:'Google'},
      {src:'https://wystynez.ru/sc-pic/i0442.png',caption:'В пуще Роминтер Хайде',credit:null},
      {src:'https://wystynez.ru/sc-pic/i0443.png',caption:'Виштынецкое озеро',credit:null}
    ],
    relatedPoiIds:['poi_museum','poi_vishtynets_lake'],
    content:[
      {type:'paragraph',text:'Виштынецкая возвышенность расположена на юго-востоке Калининградской области, вблизи юго-восточного берега Балтийского моря, в месте соприкосновения границ России, Литвы и Польши.'},
      {type:'paragraph',text:'Возвышенность приурочена к северным склонам Балтийской гряды и вместе с Судувской возвышенностью в Литве и Сувалкской возвышенностью в Польше образует единый обособленный массив. Максимальная высота Виштынецкой возвышенности на исходной странице указана как 242,0 м, Сувалкской — 309,0 м.'},
      {type:'paragraph',text:'Старая страница показывает положение территории на картах и связывает географический контекст с музейно-информационным центром Виштынецкого экомузея в Краснолесье.'},
      {type:'paragraph',text:'На фотографии из космоса единый лесной массив пущи Роминтер Хайде на возвышенности обозначен тёмно-зелёным цветом; чёрно-синие вкрапления — озёра, среди которых крупнейшим на снимке является Виштынецкое озеро.'},
      {type:'paragraph',text:'При подготовке страницы использованы материалы сайта Google и «Географического атласа Калининградской области». Калининград, 2002.'},
      {type:'paragraph',text:'© КРОУ «Виштынецкий экомузей», 2006.'}
    ],
    migrationStatus:'verified_source_detail',
    sourceScope:'dedicated_primary_page',
    sourceNotes:['Проверено по первичной legacy-странице p48.htm 28 августа 2026 года.','Оригинальная карта/схемы сохранены как изображения; отдельную интерактивную карту старого сайта не переносили.','Источники страницы: Google; «Географический атлас Калининградской области», 2002.']
  });

  const museum=points.find(p=>p.id==='poi_museum');
  if(museum) museum.articleIds=[...new Set([...(museum.articleIds||[]),'vishtynets-upland-map-context'])];
  const lake=points.find(p=>p.id==='poi_vishtynets_lake');
  if(lake) lake.articleIds=[...new Set([...(lake.articleIds||[]),'vishtynets-upland-map-context'])];
})();
