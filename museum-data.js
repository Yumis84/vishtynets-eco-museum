window.MUSEUM_INFO={
  name:'Калининградское региональное общественное учреждение «Виштынецкий эколого-исторический музей»',
  shortName:'Виштынецкий экомузей',
  address:'Калининградская область, Нестеровский муниципальный округ, пос. Краснолесье, ул. Школьная, 5А',
  phone:'+7 (906) 212-68-23',
  email:'wystynez@bk.ru',
  vk:'https://vk.com/public63127132',
  legacySite:'https://www.wystynez.ru/',
  openingHours:{winter:'Ноябрь–март: 10:00–17:00',summer:'Апрель–октябрь: 10:00–18:00',closed:'Понедельник — выходной'},
  ticketPrices:null,
  verifiedAt:'2026-08-16'
};

window.MUSEUM_POINTS=[
  {
    id:'poi_museum',slug:'vishtynets-eco-museum',name:'Виштынецкий экомузей',category:'Музей',categories:['Музей','Культура','История'],
    lat:54.394535,lng:22.374779,address:'пос. Краснолесье, ул. Школьная, 5А',
    shortDescription:'Музейно-информационный центр Роминтской пущи и Виштынецкой возвышенности.',
    articleIds:['about-museum','kamennye-istorii','museum-mail'],photos:['https://www.wystynez.ru/sc-pic/i1665.jpg'],photoCredits:[],
    sourceUrls:['https://visit-kaliningrad.ru/entertainment/culture/museums/wystynez-eco-museum/'],coordinateStatus:'pending_final_verification',status:'active'
  },
  {
    id:'poi_tokarevka_bridge',slug:'tokarevka-railway-bridge',name:'Железнодорожный мост в Токаревке',category:'Мосты',categories:['Мосты','История','Архитектура'],
    lat:54.416483,lng:22.39593,address:'пос. Токаревка, юго-западнее поселка',
    shortDescription:'Арочный железнодорожный мост через реку Красную, построенный в 1901 году.',
    articleIds:['forest-village'],photos:[],photoCredits:[],
    sourceUrls:['https://visit-kaliningrad.ru/entertainment/sights/bridges/zheleznodorozhnyy-most-cherez-reku-krasnuyu/','https://mapio.org/pic/p-22257724/'],coordinateStatus:'verified_external',status:'active'
  },
  {
    id:'poi_viewpoint',slug:'vishtynets-upland-viewpoint',name:'Смотровая площадка «Виштынецкая возвышенность»',category:'Смотровые площадки',categories:['Природа','Смотровые площадки'],
    lat:null,lng:null,address:'окрестности пос. Краснолесье, над долиной истоков реки Синей',
    shortDescription:'Площадка проекта «Неизвестный Виштынец» с видом на долину истоков реки Синей.',
    articleIds:['unknown-vishtynets'],photos:[],photoCredits:[],sourceUrls:['https://www.wystynez.ru/p0109.htm'],coordinateStatus:'unresolved',status:'catalog_only'
  },
  {
    id:'poi_sinyaya_sources',slug:'sinyaya-river-sources',name:'Долина истоков реки Синей',category:'Реки и родники',categories:['Природа','Реки и родники','Маршруты'],
    lat:null,lng:null,address:'окрестности пос. Краснолесье',
    shortDescription:'Ландшафтная долина родников и истоков реки Синей рядом с Краснолесьем.',
    articleIds:['forest-village','unknown-vishtynets'],photos:[],photoCredits:[],sourceUrls:['https://www.wystynez.ru/p0108.htm'],coordinateStatus:'unresolved',status:'catalog_only'
  }
];

window.MUSEUM_ARTICLES=[
  {
    id:'about-museum',slug:'about-museum',title:'О Виштынецком экомузее',category:'Музей',subcategory:'О музее',legacyUrl:'https://www.wystynez.ru/',date:'2001 — настоящее время',author:null,
    deck:'Музей возник по инициативе группы друзей и постепенно вырос из передвижной фотовыставки в музейно-информационный центр Роминтской пущи.',
    hero:'https://www.wystynez.ru/sc-pic/i1665.jpg',images:[],relatedPoiIds:['poi_museum'],archival:false,
    content:[
      {type:'paragraph',text:'Калининградское региональное общественное учреждение «Виштынецкий эколого-исторический музей» возникло в 2001 году по инициативе группы друзей и единомышленников.'},
      {type:'paragraph',text:'Первые выставки создавались на общественных началах. Первая фотовыставка начала путешествовать по музеям Калининградской области примерно с 2002 года и постепенно превратилась в музейную экспозицию.'},
      {type:'paragraph',text:'Постоянная экспозиция располагается в Краснолесье в здании бывшей школы. Музей одновременно является музейно-информационным центром для гостей Роминтской пущи.'},
      {type:'paragraph',text:'Миссия музея связана с просвещением, единством человека и земли, сохранением природного и культурного потенциала Виштынецкой возвышенности.'}
    ],migrationStatus:'seed_from_project_brief'
  },
  {
    id:'kamennye-istorii',slug:'kamennye-istorii',title:'Каменные истории',category:'Музей',subcategory:'Экспозиции',legacyUrl:'https://www.wystynez.ru/p0088.htm',date:'2015',author:null,
    deck:'Открытая экспозиция о геологическом наследии Виштынецкой возвышенности и истории камня.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
    content:[
      {type:'paragraph',text:'«Каменные истории» — открытая экспозиция 2015 года, посвящённая геологическому наследию Виштынецкой возвышенности.'},
      {type:'paragraph',text:'Экспозиция рассказывает о ледниковых валунах, происхождении горных пород и использовании камня человеком.'},
      {type:'paragraph',text:'Отдельные темы посвящены межевым камням, старым квартальным столбам и каменному мощению.'}
    ],migrationStatus:'seed_from_project_brief'
  },
  {
    id:'museum-mail',slug:'museum-mail',title:'Музейная почта',category:'Проекты',subcategory:'Музейная почта',legacyUrl:'https://www.wystynez.ru/p103.htm',date:'2014',author:null,
    deck:'История музейных открыток и возможности отправить привет из Роминтской пущи.',hero:'https://www.wystynez.ru/sc-pic/i0911.jpg',
    images:[
      {src:'https://www.wystynez.ru/sc-pic/i0911.jpg',caption:null,credit:'Э. Барсуков'},
      {src:'https://www.wystynez.ru/sc-pic/i0912.jpg',caption:null,credit:'Э. Барсуков'},
      {src:'https://www.wystynez.ru/sc-pic/i0913.jpg',caption:null,credit:'Э. Барсуков'},
      {src:'https://www.wystynez.ru/sc-pic/i0914.jpg',caption:null,credit:'Э. Барсуков'}
    ],relatedPoiIds:['poi_museum','poi_tokarevka_bridge'],archival:true,
    content:[
      {type:'paragraph',text:'«Музейная почта» — отдельное направление Виштынецкого экомузея. Посетитель может выбрать музейную открытку и отправить привет из Роминтской пущи.'},
      {type:'paragraph',text:'Проект связан с музейными открытками, почтовым ящиком и сохранением визуальной памяти о территории.'},
      {type:'gallery'},
      {type:'paragraph',text:'В новом цифровом музее эта история сохраняется как самостоятельный материал, связанный с другими проектами, местами и архивными фотографиями.'}
    ],migrationStatus:'seed_from_project_brief'
  },
  {
    id:'forest-village',slug:'forest-village',title:'Лесная деревня',category:'Туризм',subcategory:'Местные предложения',legacyUrl:'https://www.wystynez.ru/p0090.htm',date:'2016–2017',author:null,
    deck:'Местные жители, маршруты и жизнь Роминтской пущи: Краснолесье, истоки Синей, Токаревский мост и мастерские.',hero:'https://www.wystynez.ru/sc-pic/i1423.jpg',
    images:[
      {src:'https://www.wystynez.ru/sc-pic/i1423.jpg',caption:null,credit:'Александр Матвеев, Алексей Соколов, Эдуард Барсуков'},
      {src:'https://www.wystynez.ru/sc-pic/i1405.jpg',caption:null,credit:'Александр Матвеев, Алексей Соколов, Эдуард Барсуков'},
      {src:'https://www.wystynez.ru/sc-pic/i1430.jpg',caption:null,credit:'Александр Матвеев, Алексей Соколов, Эдуард Барсуков'}
    ],relatedPoiIds:['poi_tokarevka_bridge','poi_sinyaya_sources'],archival:true,
    content:[
      {type:'paragraph',text:'«Лесная деревня» связана с местными жителями и жизнью Роминтской пущи. Проект объединяет прогулки, экскурсии, мастерские и знакомство с местной культурой.'},
      {type:'paragraph',text:'Среди направлений — экскурсия по Краснолесью, прогулка к истокам реки Синей, родники, липовая аллея, визит к пчеловоду, мастерская «Зелёная кухня», мастер-класс «Лесной талисман» и местная кухня.'},
      {type:'gallery'},
      {type:'paragraph',text:'Отдельные маршруты связывали Краснолесье с рекой Красной, Токаревским железнодорожным мостом и другими местами Роминтской пущи.'}
    ],migrationStatus:'seed_from_project_brief'
  },
  {
    id:'unknown-vishtynets',slug:'unknown-vishtynets',title:'Неизвестный Виштынец, или по дороге к чуду',category:'Проекты',subcategory:'Озеро Виштынецкое',legacyUrl:'https://www.wystynez.ru/p0106.htm',date:'2018–2019',author:null,
    deck:'Проект об озере Виштынецком, его ландшафте, подводном мире и дороге к природному памятнику.',hero:null,images:[],relatedPoiIds:['poi_museum','poi_viewpoint','poi_sinyaya_sources'],archival:true,
    content:[
      {type:'paragraph',text:'Проект «Неизвестный Виштынец или по дороге к чуду» реализовывался в 2018–2019 годах.'},
      {type:'paragraph',text:'В рамках проекта создавались музейная экспозиция об озере Виштынецком, рельефный макет дна озера, подводные фотографии, интерактивные элементы, смотровая площадка, фотовыставка, музейные открытки и образовательные материалы.'}
    ],migrationStatus:'seed_from_project_brief'
  },
  {
    id:'anatomy-stone',slug:'anatomy-stone',title:'Анатомия камня',category:'Проекты',subcategory:'В гости к камню',legacyUrl:'https://www.wystynez.ru/p0122.htm',date:'2021',author:null,
    deck:'Итоговая экспозиция проекта «В гости к камню» о минералогическом составе валунов Виштынецкой возвышенности.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
    content:[
      {type:'paragraph',text:'«Анатомия камня» связана с проектом «В гости к камню» и была представлена в 2021 году.'},
      {type:'paragraph',text:'Темы экспозиции — минералогический состав валунов, крупные валуны Виштынецкой возвышенности, легенды, экспедиции и интерактивная карта камней.'}
    ],migrationStatus:'seed_from_project_brief'
  }
];
