// Verified legacy migration batch 9: programme pages and source-preserving enrichments.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const byId=id=>articles.find(article=>article.id===id);
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};

  add({
    id:'neighbors-2023-program',slug:'neighbors-2023-program',
    title:'Программа праздника «Соседи — 2023»',
    category:'Культура',subcategory:'Праздники и местные сообщества',
    legacyUrl:'https://www.wystynez.ru/p0126.htm',date:'5 августа 2023',author:null,archival:true,
    deck:'Подробная архивная программа праздника «Соседи — 2023»: ярмарка, мастерские, лекции, экскурсия, концерт и вечерний кинопоказ.',
    hero:null,images:[],relatedPoiIds:['poi_museum','poi_sinyaya_sources'],
    content:[
      {type:'paragraph',text:'Отдельная страница старого сайта сохраняет подробную программу праздника «Соседи — 2023», прошедшего 5 августа в Краснолесье.'},
      {type:'paragraph',text:'На территории музея были запланированы открытие праздника, ярмарка и угощения местных жителей, ремесленные мастерские и площадка проекта «Вкусы Виштынецкой возвышенности».'},
      {type:'paragraph',text:'В конференц-зале музея проходила лекционная программа: о местных продуктах рассказывала географ Лариса Станченко, о дарах леса — директор музея Алексей Соколов, об использовании инвазивных растений в кулинарии — эколог Мария Кохановская; Юлия Бардун и Наталья Добровольская представляли подготовку книги «Вкусы Виштынецкой возвышенности».'},
      {type:'paragraph',text:'Программа также включала авторскую экскурсию по экспозиции музея, концерт «Поющие поколения», путешествие к родникам и истокам реки Синей с Александром Дорошкиным и вечерний кинопоказ в Краснолесенском доме культуры.'},
      {type:'paragraph',text:'Указанные на legacy-странице суммы добровольных взносов, контакты и организационные условия являются архивными и не считаются актуальными без современной проверки.'}
    ],
    migrationStatus:'verified_legacy_summary',legacyOperationalDataStatus:'archive_only',
    relatedLegacyUrls:['https://www.wystynez.ru/p0125.htm']
  });

  add({
    id:'neighbors-2024',slug:'neighbors-2024',title:'Соседи — 2024',
    category:'Культура',subcategory:'Праздники и местные сообщества',
    legacyUrl:'https://www.wystynez.ru/p0130.htm',date:'3 августа 2024',author:null,archival:true,
    deck:'Отдельная страница ежегодного праздника «Соседи — 2024», ссылка на которую сохранена на главной странице старого сайта.',
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    content:[
      {type:'paragraph',text:'Главная страница старого сайта Виштынецкого экомузея прямо сообщает, что 3 августа 2024 года в посёлке Краснолесье состоится ежегодный праздник «Соседи — 2024», и ведёт на отдельную страницу p0130.htm.'},
      {type:'paragraph',text:'Полный текст отдельной страницы пока не удалось получить: прямой переход подтверждает URL, но текущий захват возвращает cache miss. Поэтому дополнительные детали не добавляются до восстановления первоисточника.'}
    ],
    migrationStatus:'dedicated_url_verified_content_pending',sourceScope:'homepage_link_and_title_date_only'
  });

  // Enrich previously migrated records only with facts/media now verified from their primary legacy pages.
  const neighbors2023=byId('neighbors-2023');
  if(neighbors2023){
    neighbors2023.relatedLegacyUrls=[...new Set([...(neighbors2023.relatedLegacyUrls||[]),'https://www.wystynez.ru/p0126.htm'])];
  }

  const neighbors2017=byId('forest-village-neighbors-2017');
  if(neighbors2017){
    neighbors2017.author='Анна Карпенко';
    neighbors2017.photoCredits=['Александр Матвеев','Алексей Соколов'];
    neighbors2017.sourceNotes=[...new Set([...(neighbors2017.sourceNotes||[]),'Исходная страница указывает: текст — Анна Карпенко; фото — Александр Матвеев, Алексей Соколов.'])];
  }

  const unknown2019=byId('unknown-vishtynets-opening-2019');
  if(unknown2019){
    unknown2019.hero='https://wystynez.ru/sc-pic/i1711.jpg';
    unknown2019.sourceMediaInventory='data/legacy-media-batch-2.json';
  }

  const stoneProject=byId('visit-the-stone-project');
  if(stoneProject){
    stoneProject.hero='https://wystynez.ru/sc-pic/i2157.jpg';
    stoneProject.images=[
      {src:'https://wystynez.ru/sc-pic/i2158.jpg',caption:'Валун у горы Дозор — контекст исходной страницы; точная привязка подписи требует визуальной проверки',credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://wystynez.ru/sc-pic/i2159.jpg',caption:null,credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://wystynez.ru/sc-pic/i2160.jpg',caption:'Полевой шпат — контекст исходной страницы; точная привязка подписи требует визуальной проверки',credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://wystynez.ru/sc-pic/i2167.jpg',caption:'Экспедиционный материал — контекст исходной страницы',credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://wystynez.ru/sc-pic/i2162.jpg',caption:'Интерактивная карта валунов — контекст исходной страницы',credit:'А. Соколов — общий фотокредит исходной страницы'}
    ];
    if(!(stoneProject.content||[]).some(block=>block.type==='gallery'))stoneProject.content.push({type:'gallery'});
    stoneProject.sourceMediaInventory='data/legacy-media.json';
    stoneProject.linkedInteractiveMap={legacyUrl:'https://www.wystynez.ru/p0121.htm',status:'dedicated_url_verified_content_capture_pending'};
    stoneProject.downloadableDocuments=[{title:'Брошюра о валунах Виштынецкой возвышенности',url:null,status:'download_anchor_verified_exact_url_pending'}];
  }

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'neighbors-2023-program','neighbors-2024'])];
  }
})();
