// Verified legacy migration batch 13: recent archive exhibitions + source-preserving enrichments.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const byId=id=>articles.find(article=>article.id===id);
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  // Recent exhibitions that were present in the verified archive chronology but had not yet
  // been represented as standalone catalogue records.
  add({
    id:'rominta-railways-2024',slug:'rominta-railways-2024',title:'Железные дороги Роминтской пущи',
    category:'История',subcategory:'Выставки',legacyUrl:archive,date:'с 1 мая 2024',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись Виштынецкого экомузея о выставке «Железные дороги Роминтской пущи».',
    content:[
      {type:'paragraph',text:'Архив событий Виштынецкого экомузея фиксирует выставку «Железные дороги Роминтской пущи», открытую с 1 мая 2024 года.'},
      {type:'paragraph',text:'На текущем этапе отдельная подробная legacy-страница выставки не захвачена, поэтому запись сохраняет только факты, явно подтверждённые музейным архивом.'}
    ],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'vitaly-khvaley-exhibition-2023',slug:'vitaly-khvaley-exhibition-2023',title:'Персональная выставка Виталия Хвалея',
    category:'Культура',subcategory:'Выставки',legacyUrl:archive,date:'8 мая 2023 — 30 апреля 2024',author:'Виталий Хвалей',archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Персональная выставка художественных работ Виталия Хвалея в выставочном зале Виштынецкого экомузея.',
    content:[
      {type:'paragraph',text:'Архив музея фиксирует персональную выставку художественных работ Виталия Хвалея, проходившую с 8 мая 2023 года по 30 апреля 2024 года.'},
      {type:'paragraph',text:'Выставка также упоминается в музейном материале о празднике «Соседи — 2023», где выставочный зал музея продолжал работать во время программы праздника.'}
    ],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_plus_related_page'
  });

  add({
    id:'rominta-cosmos-photo-2022',slug:'rominta-cosmos-photo-2022',title:'РОМИНТА, часть первая «КОСМОС»',
    category:'Культура',subcategory:'Фотовыставки',legacyUrl:archive,date:'с 6 августа 2022',author:'Юлия Алексеева',archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Фотовыставка Юлии Алексеевой «РОМИНТА, часть первая КОСМОС» — запись музейной хроники.',
    content:[
      {type:'paragraph',text:'Архив событий музея фиксирует фотовыставку Юлии Алексеевой «РОМИНТА, часть первая КОСМОС», открытую с 6 августа 2022 года.'},
      {type:'paragraph',text:'Подробная отдельная страница выставки пока не захвачена; запись не дополняется неподтверждёнными описаниями или индивидуальными изображениями.'}
    ],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  // Enrich the 2018 meeting with the participant list explicitly present on the source page.
  const meeting=byId('unknown-vishtynets-meeting-2018');
  if(meeting){
    meeting.participantsLegacy=[
      'представители администрации и общественности Нестеровского района',
      'Я. А. Лян — специалист по связям с общественностью Нестеровского района',
      'А. К. Самерханова — природный парк «Виштынецкий»',
      'Р. Р. Кадремятов — природный парк «Виштынецкий»',
      'Н. Д. Кулясов — природный парк «Виштынецкий»',
      'А. И. Акинин — Экологический центр ЕКАТ-Калининград',
      'А. В. Самсонкин — Экоцентр «Роминта»',
      'Яромир Краевский — Ландшафтный парк Пущи Роминской, Польша',
      'Н. Ю. Берберова — Управление дорожного хозяйства Калининградской области'
    ];
    meeting.sourceMediaStatus='source_page_contains_images_exact_urls_pending_media_pass';
  }

  // Enrich the WWII / memorial article with exact chronology and source-specific image-credit separation.
  const scouts=byId('scouts-maxim-jack');
  if(scouts){
    scouts.sourceDetails={
      maximGroupSize:20,
      maximInsertion:'ночь с 16 на 17 августа 1944',
      jackGroupSize:11,
      jackInsertion:'ночь с 26 на 27 июля 1944',
      jointActionPeriod:'с середины октября по 12 ноября 1944',
      raidArea:'озеро Виштынецкое и Роминтская пуща',
      memorialOpening:'17 июля 2020',
      memorialLocationContext:'один из основных маршрутов природного парка «Виштынецкий», вблизи бывшего государственного охотничьего дома Роминтен (Рейхсягерхоф)'
    };
    scouts.imageCreditScopes=[
      {credit:'Айтель Ланге',scope:'explicit historical image credit on source page'},
      {credit:'Татьяна Поломодова',scope:'photos from the 17 July 2020 memorial-opening event'}
    ];
    scouts.sourceMediaStatus='source_page_contains_historical_and_event_images_exact_urls_pending_media_pass';
  }

  const neighbors2018=byId('neighbors-2018');
  if(neighbors2018){
    neighbors2018.programHighlights=[
      'ярмарка и ремесленные мастер-классы',
      'шестичасовая концертная программа коллективов Калининградской области и национальных автономий',
      'фотовыставка Юлии Алексеевой «Роминта. Музыка леса»',
      'музейная почта',
      'путешествие по Роминтской пуще к горе Дозор, гигантскому валуну и озеру Мариново',
      'путешествие к родникам и истокам реки Синей',
      'литературная гостиная библиотеки Краснолесья',
      '«Роминтский стол» и совместное завершение праздника'
    ];
    neighbors2018.sourceMediaStatus='large_source_gallery_exact_urls_pending_media_pass';
    neighbors2018.sourceCreditPolicy='Коллективный фотокредит страницы не назначается автоматически каждому отдельному изображению.';
  }

  const mapArticle=byId('vishtynets-upland-map-world');
  if(mapArticle){
    mapArticle.sourceVisuals=[
      'схема положения территории в Европе и Калининградской области',
      'физическая карта юго-восточной части Калининградской области',
      'фотография холмов Виштынецкой возвышенности',
      'космический снимок единого лесного массива Роминтер Хайде',
      'изображения музейно-информационного центра и ландшафта'
    ];
    mapArticle.sourceMediaProvenance=[
      'материалы сайта www.google.com, как указано на legacy-странице',
      'Географический атлас Калининградской области — Калининград, 2002'
    ];
    mapArticle.sourceMediaStatus='visual_roles_verified_exact_sc_pic_urls_pending';
  }

  const donelaitis=byId('donelaitis');
  if(donelaitis){
    donelaitis.sourceVisuals=[
      'пасторский дом',
      'портрет/изображение Кристионаса Донелайтиса',
      'иллюстративный блок по поэме «Времена года»',
      'мемориальный музей Кристионаса Донелайтиса в Чистых Прудах',
      'празднование 300-летнего юбилея в Краснолесье в 2014 году'
    ];
    donelaitis.sourceMediaStatus='visual_roles_and_page_credits_verified_exact_urls_pending';
  }

  const gnomes=byId('gnome-treasures');
  if(gnomes){
    gnomes.illustrationCredits=[
      {credit:'Rien Poortvliet',source:'цветной рисунок из книги «Skrzaty», Warszawa, 1990'},
      {credit:'Виктория Ветивер',source:'чёрно-белые рисунки и страницы путеводителя программы, 2012'}
    ];
    gnomes.sourceVisuals=[
      'иллюстрации гномов и страницы рабочей тетради',
      'путешествие по Краснолесью и поиск камня',
      'мастерская по обработке камня',
      'наблюдение шлифов камня под микроскопом',
      'схема/изображение проезда к музею'
    ];
    gnomes.sourceMediaStatus='credits_and_visual_roles_verified_exact_urls_pending';
  }

  const travelling=byId('travelling-exposition-2004');
  if(travelling){
    travelling.expositionStats={historicalAndNaturalObjects:160,artPhotosApprox:100};
    travelling.partners=[
      'Калининградский областной историко-художественный музей',
      'КРОО «Экоцентр «Роминта»»',
      'Ландшафтный парк «Пуща Роминска» (Польша)',
      'КРМО «Экологическая группа «ГИД»»'
    ];
    travelling.projectSupport='Датско-российский Фонд местного развития Нестеровского района в рамках датско-российского проекта по приграничному сотрудничеству и развитию местного сообщества';
    travelling.sourceVisuals=[
      'открытие экспозиции в музее Кристионаса Донелайтиса',
      'фрагменты экспозиции и посетители',
      'экспонаты и фотоматериалы',
      'фотографии церемонии открытия'
    ];
    travelling.sourceMediaStatus='page_credits_and_visual_roles_verified_exact_urls_pending';
  }

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'rominta-railways-2024','vitaly-khvaley-exhibition-2023','rominta-cosmos-photo-2022'
    ])];
  }
})();
