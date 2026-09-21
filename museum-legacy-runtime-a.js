// Runtime bundle: verified legacy migration batches 2–19. Source batch files remain canonical audit trail.

/* batch 2 */
// Verified legacy migration batch 2: Nature and Culture pages from wystynez.ru.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};

  add({
    id:'birds-red-forest',slug:'birds-red-forest',title:'Птицы Красного леса',category:'Природа',subcategory:'Животный мир',legacyUrl:'https://www.wystynez.ru/p38.htm',date:null,author:'Игорь Шелякин',
    deck:'Музейный материал о птицах Виштынецкой возвышенности, разнообразии их местообитаний и природоохранной ценности Красного леса.',
    hero:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i0318.png',
    images:[
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i0318.png',caption:'Серая цапля',credit:'Cliparts, Dinamite SoftWare Group, 2003 — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i0320.png',caption:'Удод',credit:'Cliparts, Dinamite SoftWare Group, 2003 — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i0321.png',caption:'Выпь',credit:'Cliparts, Dinamite SoftWare Group, 2003 — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i1238.jpg',caption:'Малый подорлик',credit:'Cliparts, Dinamite SoftWare Group, 2003 — общий фотокредит исходной страницы'}
    ],relatedPoiIds:['poi_vishtynets_lake'],archival:true,
    content:[
      {type:'paragraph',text:'Материал рассказывает о птицах Виштынецкой возвышенности и Красного леса как о важной части природного облика территории.'},
      {type:'paragraph',text:'Разнообразный рельеф, леса, поля, озёра, реки и заболоченные низины создают множество местообитаний для птиц. На старой странице отдельно описаны птицы озёр и лесов, включая виды, встречающиеся во время миграций.'},
      {type:'paragraph',text:'В тексте подчёркивается природоохранное значение территории и приводятся сведения о редких и охраняемых видах птиц. Источник, указанный музеем: Г. В. Гришанов, «Ключевые орнитологические территории Балтийского региона России», 2000.'},
      {type:'paragraph',text:'Текст: Игорь Шелякин. Фото/иллюстрации на исходной странице: Cliparts, Dinamite SoftWare Group, 2003.'},
      {type:'gallery'}
    ],migrationStatus:'verified_legacy_summary',photoCredits:['Cliparts','Dinamite SoftWare Group, 2003'],sourceMediaInventory:'data/legacy-media.json'
  });

  add({
    id:'vishtynets-upland-map-world',slug:'vishtynets-upland-map-world',title:'Виштынецкая возвышенность на карте мира',category:'Природа',subcategory:'География и ландшафт',legacyUrl:'https://www.wystynez.ru/p48.htm',date:'2006',author:null,
    deck:'Географическая страница музея о положении Виштынецкой возвышенности, соседних возвышенностях и едином природном массиве у границ России, Литвы и Польши.',
    hero:null,images:[],relatedPoiIds:['poi_museum','poi_vishtynets_lake'],archival:true,
    content:[
      {type:'paragraph',text:'Страница помещает Виштынецкую возвышенность в географический контекст юго-востока Калининградской области, недалеко от границ России, Литвы и Польши.'},
      {type:'paragraph',text:'Виштынецкая возвышенность рассматривается вместе с соседними Судувской возвышенностью в Литве и Сувалкской возвышенностью в Польше как единый обособленный массив Балтийской гряды.'},
      {type:'paragraph',text:'На исходной странице использованы физические карты, космический снимок лесного массива Роминтер Хайде и материалы Географического атласа Калининградской области 2002 года; эти источники должны быть сохранены при последующем переносе оригинальной графики.'}
    ],migrationStatus:'verified_legacy_summary',sourceNotes:['Географический атлас Калининградской области, 2002','материалы Google, указанные на legacy-странице']
  });

  add({
    id:'donelaitis',slug:'donelaitis',title:'Кристионас Донелайтис',category:'Культура',subcategory:'Литература и наследие',legacyUrl:'https://www.wystynez.ru/p33.htm',date:'2004–2014',author:null,
    deck:'Музейная страница о Кристионасе Донелайтисе, Чистых Прудах, поэме «Времена года» и культурной памяти Виштынецкой возвышенности.',
    hero:null,images:[],relatedPoiIds:[],archival:true,
    content:[
      {type:'paragraph',text:'Материал посвящён Кристионасу Донелайтисе и месту его жизни и служения в Тольмингкемене — современных Чистых Прудах.'},
      {type:'paragraph',text:'Страница связывает культурный ландшафт Виштынецкой возвышенности с поэмой «Времена года» и мемориальным музеем поэта.'},
      {type:'paragraph',text:'Отдельный блок исходной страницы посвящён 300-летию со дня рождения Донелайтиса и празднованию юбилея в Краснолесье в 2014 году.'},
      {type:'paragraph',text:'Фото на исходной странице: Э. Барсуков, А. Соколов.'}
    ],migrationStatus:'verified_legacy_summary',photoCredits:['Э. Барсуков','А. Соколов']
  });

  add({
    id:'forest-village-neighbors-2017',slug:'forest-village-neighbors-2017',title:'Лесная деревня. Соседи — 2017',category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:'https://www.wystynez.ru/p0099.htm',date:'5–6 августа 2017',author:null,
    deck:'Праздник и итог проекта «Лесная деревня», где местные жители представляли гостям природные, культурные и туристические ресурсы Роминтской пущи.',
    hero:null,images:[],relatedPoiIds:['poi_museum','poi_sinyaya_sources'],archival:true,
    content:[
      {type:'paragraph',text:'5–6 августа 2017 года в Краснолесье прошёл праздник «Лесная деревня. Соседи» — заключительное мероприятие проекта Виштынецкого экомузея «Лесная деревня».'},
      {type:'paragraph',text:'На празднике была представлена музейная экспозиция о местном сообществе и туристических предложениях жителей Роминтской пущи. Для гостей проводили прогулки, мастерские, ярмарку и концерты.'},
      {type:'paragraph',text:'В программе были прогулка к истокам реки Синей и старой липовой аллее, знакомство с лошадьми, прогулка по Краснолесью, литературная гостиная и другие предложения местных жителей.'},
      {type:'paragraph',text:'Исходная страница подробно сохраняет партнёров, участников, программу и фотографии праздника; эти материалы должны быть перенесены отдельным медиа-проходом без потери подписей и авторства.'}
    ],migrationStatus:'verified_legacy_summary'
  });

  add({
    id:'neighbors-2023',slug:'neighbors-2023',title:'Соседи — 2023 и «Вкусы Виштынецкой возвышенности»',category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:'https://www.wystynez.ru/p0125.htm',date:'5 августа 2023',author:null,
    deck:'Возвращение праздника «Соседи» в Краснолесье и мастерская местной кухни «Вкусы Виштынецкой возвышенности».',
    hero:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2335.jpg',
    images:[
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2360.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2361.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2362.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2363.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2364.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2365.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2366.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2367.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2368.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2369.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2378.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2371.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2372.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2373.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2374.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2375.jpg',caption:null,credit:null},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2376.jpg',caption:null,credit:null}
    ],relatedPoiIds:['poi_museum'],archival:true,
    content:[
      {type:'paragraph',text:'5 августа 2023 года в Краснолесье после трёхлетнего перерыва снова состоялся праздник «Соседи», который музей проводил в предыдущие годы как праздник гостеприимства и общения людей, живущих рядом и любящих эту территорию.'},
      {type:'paragraph',text:'В программу вошли концертные и творческие события, ярмарка местных жителей и мастерская «Вкусы Виштынецкой возвышенности».'},
      {type:'paragraph',text:'Исходная страница подробно перечисляет участников ярмарки, местные блюда, продукты, ремесленные и культурные инициативы. Эти имена и детали должны сохраняться при полном переносе страницы и медиаматериалов.'},
      {type:'paragraph',text:'Общий фотокредит исходной страницы: Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо.'},
      {type:'gallery'}
    ],migrationStatus:'verified_legacy_summary',photoCredits:['Наталья Матусевичене','Юлия Алексеева','Ирина Ковардо'],sourceMediaInventory:'data/legacy-media-batch-2.json'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'vishtynets-upland-map-world','donelaitis','forest-village-neighbors-2017','neighbors-2023'])];
  }
})();


/* batch 3 */
// Verified legacy migration batch 3: project/event pages from wystynez.ru.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};

  add({
    id:'unknown-vishtynets-meeting-2018',slug:'unknown-vishtynets-meeting-2018',
    title:'Смотровая площадка по дороге к чуду — встреча по проекту',
    category:'Проекты',subcategory:'Неизвестный Виштынец',legacyUrl:'https://www.wystynez.ru/p0108.htm',
    date:'26 сентября 2018',author:null,archival:true,
    deck:'Организационная встреча по проекту «Неизвестный Виштынец, или по дороге к чуду» и будущей смотровой площадке над долиной истоков реки Синей.',
    hero:null,images:[],relatedPoiIds:['poi_viewpoint','poi_sinyaya_sources','poi_museum'],
    content:[
      {type:'paragraph',text:'26 сентября 2018 года в Виштынецком экомузее состоялась организационная встреча по проекту «Неизвестный Виштынец или по дороге к чуду». Главной целью проекта было содействие сохранению памятника природы «Озеро Виштынецкое».'},
      {type:'paragraph',text:'Участникам представили планы информационно-просветительского комплекса в Краснолесье на пути к Виштынецкому озеру. Одним из его ключевых объектов должна была стать смотровая площадка, знакомящая посетителей с ландшафтом возвышенности, его формированием и правилами поведения в природе.'},
      {type:'paragraph',text:'Для площадки выбрали окраину Краснолесья над долиной истоков реки Синей. Исходная страница описывает перепады высот более 50 метров, вид на лесистые холмы, заболоченную низину и русло реки.'},
      {type:'paragraph',text:'На исходной странице перечислены представители органов власти, природного парка, экологических организаций и другие участники встречи. Фото: Юлия Алексеева, Александр Самсонкин.'}
    ],
    migrationStatus:'verified_legacy_summary',photoCredits:['Юлия Алексеева','Александр Самсонкин'],
    sourceNotes:['Проект поддержан Фондом президентских грантов в 2018 году']
  });

  add({
    id:'unknown-vishtynets-opening-2019',slug:'unknown-vishtynets-opening-2019',
    title:'Торжественное открытие «Неизвестный Виштынец»',
    category:'Проекты',subcategory:'Неизвестный Виштынец',legacyUrl:'https://www.wystynez.ru/p0109.htm',
    date:'16 июня 2019',author:null,archival:true,
    deck:'Заключительное мероприятие проекта: открытие экспозиции об озере, смотровой площадки, фотовыставки Юлии Алексеевой и новых музейных открыток.',
    hero:null,images:[],relatedPoiIds:['poi_museum','poi_viewpoint','poi_sinyaya_sources','poi_vishtynets_lake'],
    content:[
      {type:'paragraph',text:'16 июня 2019 года в Краснолесье состоялось заключительное мероприятие проекта «Неизвестный Виштынец или по дороге к чуду», посвящённого сохранению и осмыслению Виштынецкого озера.'},
      {type:'paragraph',text:'В музее открылась новая экспозиция об озере Виштынецком. Её центральным экспонатом стал рельефный макет дна озера.'},
      {type:'paragraph',text:'В окрестностях Краснолесья открылась смотровая площадка над долиной истоков реки Синей, выполненная в образе носа лодки-корабля и посвящённая происхождению ландшафта Виштынецкой возвышенности.'},
      {type:'paragraph',text:'В тот же день открылась фотовыставка «Неизвестный Виштынец» Юлии Алексеевой и были представлены новые почтовые открытки об озере Виштынецком для музейной почты.'},
      {type:'paragraph',text:'Исходная страница сохраняет подробную программу дня и список партнёров проекта. Фото: Юлия Алексеева.'}
    ],
    migrationStatus:'verified_legacy_summary',photoCredits:['Юлия Алексеева'],
    partners:['Министерство природных ресурсов и экологии Калининградской области','Отдел культуры Администрации МО «Нестеровский район»','КРОО «Экоцентр «РОМИНТА»»','АУ КО «Экологический центр «ЕКАТ-Калининград»']
  });

  add({
    id:'visit-the-stone-project',slug:'visit-the-stone-project',title:'В гости к камню',
    category:'Проекты',subcategory:'В гости к камню',legacyUrl:'https://www.wystynez.ru/p0117.htm',
    date:'1 сентября 2020 — 31 мая 2021',author:null,archival:true,
    deck:'Проект по выявлению и исследованию валунов Виштынецкой возвышенности, созданию интерактивной карты, брошюры и новой минералогической экспозиции.',
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    content:[
      {type:'paragraph',text:'Проект «В гости к камню» был направлен на выявление сохранившихся валунов Роминтской пущи и Виштынецкой возвышенности, их исследование и представление как значимых природных и туристических объектов.'},
      {type:'paragraph',text:'В рамках проекта создавались интерактивная карта валунов с GPS-координатами и описаниями, музейная экспозиция о минералогическом составе валунов, а также брошюра о валунах и основных горных породах возвышенности.'},
      {type:'paragraph',text:'Материалы для карты собирались во время экспедиций с участием школьников, учёных и местных жителей. Экспозиция должна была показать полированные спилы валунов вместе с образцами минералов из музейной коллекции.'},
      {type:'paragraph',text:'Исходная страница содержит новости проекта, ссылки на презентацию результатов, интерактивную карту и конкурс «Легенда о камне». Фото: А. Соколов.'}
    ],
    migrationStatus:'verified_legacy_summary',photoCredits:['А. Соколов'],
    projectPeriod:{start:'2020-09-01',end:'2021-05-31'},
    funding:{totalRub:1250019,grantRub:1025019,cofinancingRub:225000,source:'Фонд президентских грантов'},
    team:[
      {name:'Алексей Соколов',role:'руководитель проекта'},
      {name:'Эдуард Барсуков',role:'соруководитель проекта'},
      {name:'Татьяна Колесник',role:'научный консультант-геолог'},
      {name:'Роза Ткаченко',role:'художник-экспозиционер'},
      {name:'Надежда Чесна',role:'бухгалтер'}
    ],
    partners:['МБОУ СОШ «Школа будущего» (пос. Большое Исаково)','Отдел культуры Администрации МО «Нестеровский район»'],
    relatedLegacyUrls:['https://www.wystynez.ru/p0122.htm','https://www.wystynez.ru/p0121.htm','https://www.wystynez.ru/p0120.htm']
  });

  add({
    id:'legend-of-stone-contest-2021',slug:'legend-of-stone-contest-2021',title:'Конкурс «Легенда о камне»',
    category:'Проекты',subcategory:'В гости к камню',legacyUrl:'https://www.wystynez.ru/p0120.htm',
    date:'20 апреля 2021',author:null,archival:true,
    deck:'Итоги творческого конкурса школьников, проведённого в рамках проекта «В гости к камню».',
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    content:[
      {type:'paragraph',text:'20 апреля 2021 года были подведены итоги конкурса «Легенда о камне». В нём участвовали школьники Краснолесья и ученики «Школы будущего» из посёлка Большое Исаково.'},
      {type:'paragraph',text:'Конкурс был частью проекта «В гости к камню», направленного на привлечение внимания к валунам Виштынецкой возвышенности как природным объектам, источникам научного знания и объектам познавательного туризма.'},
      {type:'paragraph',text:'Исходная страница сохраняет имена участников и названия их работ, включая «Великан и речка», «Легенду о гигантском камне силы», «Камушек», «Легенду о валуне южнее озера Мариново», «Камень, исполняющий желания» и другие работы.'},
      {type:'paragraph',text:'Партнёрами конкурса названы МБОУ СОШ «Школа будущего» и Отдел культуры администрации МО «Нестеровский городской округ».'}
    ],
    migrationStatus:'verified_legacy_summary'
  });

  add({
    id:'visit-the-stone-results-2021',slug:'visit-the-stone-results-2021',title:'Презентация результатов проекта «В гости к камню»',
    category:'Проекты',subcategory:'В гости к камню',legacyUrl:'https://www.wystynez.ru/p0122.htm',
    date:'22 мая 2021',author:null,archival:true,
    deck:'Открытие экспозиции «Анатомия камня», представление брошюры и интерактивной карты валунов Виштынецкой возвышенности.',
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    content:[
      {type:'paragraph',text:'22 мая 2021 года Виштынецкий экомузей представил результаты проекта «В гости к камню», поддержанного Фондом президентских грантов.'},
      {type:'paragraph',text:'В музее открылась экспозиция «Анатомия камня», знакомящая с минералогическим составом горных пород валунов Виштынецкой возвышенности.'},
      {type:'paragraph',text:'В рамках проекта была подготовлена брошюра о примечательных валунах и создана интерактивная карта с данными об их местоположении и особенностях. В сборе информации участвовали школьники и местные жители.'},
      {type:'paragraph',text:'На мероприятии также наградили участников конкурса «Легенда о камне» и организовали выезд к одному из малоизвестных валунов природного парка.'},
      {type:'paragraph',text:'Исходная страница содержит большой список благодарностей участникам и партнёрам проекта. Фото: В. Лукошевичус, А. Володина, А. Соколов.'}
    ],
    migrationStatus:'verified_legacy_summary',photoCredits:['В. Лукошевичус','А. Володина','А. Соколов'],
    relatedLegacyUrls:['https://www.wystynez.ru/p0117.htm','https://www.wystynez.ru/p0121.htm','https://www.wystynez.ru/p0120.htm'],
    downloadableDocuments:[{title:'Брошюра о валунах Виштынецкой возвышенности',url:null,status:'exact_url_pending_capture'}],
    linkedInteractiveMap:{legacyUrl:'https://www.wystynez.ru/p0121.htm',status:'page_link_verified_content_capture_pending'}
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'unknown-vishtynets-meeting-2018','unknown-vishtynets-opening-2019','visit-the-stone-project','legend-of-stone-contest-2021','visit-the-stone-results-2021'
    ])];
  }
})();


/* batch 4 */
// Verified legacy migration batch 4: history and cultural event pages from wystynez.ru.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};

  add({
    id:'scouts-maxim-jack',slug:'scouts-maxim-jack',
    title:'Разведчики «Максим» и «Джек» в Роминтской пуще',
    category:'История',subcategory:'Великая Отечественная война',legacyUrl:'https://www.wystynez.ru/p0116.htm',
    date:'1944–1945 / памятный комплекс открыт 17 июля 2020',author:null,archival:true,
    deck:'Музейный материал о действиях разведгрупп «Максим» и «Джек» в Восточной Пруссии и создании памятного комплекса в Роминтской пуще.',
    hero:null,images:[],relatedPoiIds:[],
    content:[
      {type:'paragraph',text:'Страница рассказывает о разведывательных группах «Максим» и «Джек», действовавших в глубоком тылу немецких войск в Восточной Пруссии в 1944–1945 годах.'},
      {type:'paragraph',text:'В октябре–ноябре 1944 года группы некоторое время действовали совместно под общим командованием майора Владимира Максимова. Одной из задач был рейд в район озера Виштынецкого и разведка объектов в Роминтской пуще.'},
      {type:'paragraph',text:'Исходная музейная страница приводит выдержки из радиограмм и воспоминаний разведчиков, сведения о составе групп, фотографии участников и исторические источники.'},
      {type:'paragraph',text:'17 июля 2020 года в Роминтской пуще состоялось торжественное открытие памятного камня группе «Максим–Джек» вблизи места разведки бывшего государственного охотничьего дома Роминтен.'},
      {type:'paragraph',text:'Памятный камень и информационный стенд были установлены по проекту Виштынецкого экомузея, поддержанному Правительством Калининградской области. Фото с церемонии открытия: Татьяна Поломодова.'}
    ],
    migrationStatus:'verified_legacy_summary',photoCredits:['Татьяна Поломодова','Айтель Ланге (историческое фото на исходной странице)'],
    sourceNotes:['На исходной странице приведены цитаты из книги «Парашюты на деревьях» и издания «Шёл солдат дорогую побед» (Калининград, 1980).'],
    partners:['Представительство НП «Союз ветеранов военной разведки» в Калининграде','ГБУ КО «Природный парк «Виштынецкий»»','Отдел культуры Администрации МО «Нестеровский городской округ»']
  });

  add({
    id:'neighbors-2018',slug:'neighbors-2018',title:'Соседи — 2018',
    category:'Культура',subcategory:'Праздники и местные сообщества',legacyUrl:'https://www.wystynez.ru/Prazdnik--SOSEDI----2018.htm',
    date:'25 августа 2018',author:null,archival:true,
    deck:'Большой международный праздник в Краснолесье, объединивший местных жителей и гостей из России, Польши и Литвы вокруг культуры и природы Роминтской пущи.',
    hero:null,images:[],relatedPoiIds:['poi_museum','poi_sinyaya_sources'],
    content:[
      {type:'paragraph',text:'25 августа 2018 года в Краснолесье состоялся международный праздник «Соседи». По данным исходной музейной страницы, в этот год он собрал более 800 человек.'},
      {type:'paragraph',text:'Программа включала ярмарку и мастер-классы, концерты, театральные представления, путешествия по Роминтской пуще, музейную почту и литературную гостиную.'},
      {type:'paragraph',text:'В выставочном зале музея открылась фотовыставка Юлии Алексеевой «Роминта. Музыка леса». Участники также могли отправиться с сотрудниками природного парка к горе Дозор, гигантскому валуну и озеру Мариново, а с местным проводником — к родникам и истокам реки Синей.'},
      {type:'paragraph',text:'Отдельной частью праздника стал «Роминтский стол» с блюдами и угощениями, собранными участниками и местными жителями. Исходная страница подчёркивает международный и межнациональный характер события.'},
      {type:'paragraph',text:'Организатором выступал Виштынецкий эколого-исторический музей. На исходной странице сохранён большой список партнёров, творческих коллективов и участников.'},
      {type:'paragraph',text:'Фото: Юлия Алексеева, Татьяна Поломодова, Амаль Самерханова, Светлана Никирина.'}
    ],
    migrationStatus:'verified_legacy_summary',
    photoCredits:['Юлия Алексеева','Татьяна Поломодова','Амаль Самерханова','Светлана Никирина'],
    attendanceLegacy:'более 800 человек',
    sponsorLegacy:'АО «150 авиационный ремонтный завод» холдинга «Вертолёты России»'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'scouts-maxim-jack','neighbors-2018'])];
  }
})();


/* batch 5 */
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


/* batch 6 */
// Verified legacy migration batch 6: early dedicated URLs confirmed from the museum archive.
// Page URLs are primary-source links from p0008.htm; full page content could not be captured in this pass.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};

  add({
    id:'old-settlers-chistye-prudy-2004',slug:'old-settlers-chistye-prudy-2004',
    title:'Встреча старожилов Чистых Прудов',category:'История',subcategory:'Жители и память',
    legacyUrl:'https://www.wystynez.ru/p29.htm',date:'февраль 2004',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:[],
    deck:'Встреча старожилов — первых переселенцев посёлка Чистые Пруды, зафиксированная в архиве событий музея.',
    content:[{type:'paragraph',text:"Уважаемые старожилы и ветераны труда посёлка Чистые Пруды, общественное учреждение «Виштынецкий эколого-исторический музей» приглашало вас на вечер встречи 22 февраля 2004 года в здании пасторского домика музея Кристионаса Донелайтиса."},{type:'paragraph',text:"Страница обращалась к памяти первых послевоенных жителей: воспоминания об их труде, радостях и невзгодах со временем стираются, но без прошлого нет будущего, а каждое воспоминание и каждый предмет, хранящий память прошлого, становятся частью общей истории."},{type:'paragraph',text:"Сотрудники музея приглашали старожилов вместе со своими воспоминаниями прожить этот февральский вечер."},{type:'gallery'}],
    migrationStatus:'source_body_restored_from_preserved_archive',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'preserved_archive_available'
  });

  add({
    id:'childrens-summer-camp-2003',slug:'childrens-summer-camp-2003',
    title:'Детский летний лагерь — 2003',category:'Музей',subcategory:'Образовательные программы',
    legacyUrl:'https://www.wystynez.ru/p21.htm',date:'август 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Ранняя образовательная деятельность Виштынецкого экомузея — детский летний лагерь в августе 2003 года.',
    content:[{type:'paragraph',text:"Походы, интересные рассказы, занятия творчеством, купание в ледниковых озёрах и заключительный костёр долго помнили дети, побывавшие в летнем детском лагере на природе, организованном Виштынецким музеем и экоцентром «Роминта». Для многих городских детей знакомство с многозвёздным небом, деревьями-великанами, огромными валунами и прозрачными озёрами стало открытием другого мира — мира живой природы."},{type:'gallery'}],
    migrationStatus:'source_body_restored_from_preserved_archive',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'preserved_archive_available'
  });

  add({
    id:'scientific-expedition-2003',slug:'scientific-expedition-2003',
    title:'Научная экспедиция — 2003',category:'Природа',subcategory:'Экспедиции',
    legacyUrl:'https://www.wystynez.ru/p23.htm',date:'июль 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:[],
    deck:'Научная экспедиция Виштынецкого экомузея, отмеченная в архиве событий за июль 2003 года.',
    content:[{type:'paragraph',text:"В июле 2003 года состоялась совместная научная экспедиция Виштынецкого экомузея и Калининградского государственного университета. Вместе с сотрудниками музея студенты проходили учебную практику по геоботанике, изучая многообразие растительных сообществ Виштынецкой возвышенности. Результаты экспедиции должны были пополнить фонды музея наряду с другими материалами совместной работы."},{type:'gallery'}],
    migrationStatus:'source_body_restored_from_preserved_archive',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'preserved_archive_available'
  });

  add({
    id:'living-shield-action-2003',slug:'living-shield-action-2003',
    title:'Акция «Живой щит»',category:'Природа',subcategory:'Экологические акции',
    legacyUrl:'https://www.wystynez.ru/p16.htm',date:'июль 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:[],
    deck:'Экологическая акция «Живой щит», отмеченная в музейном архиве событий за июль 2003 года.',
    content:[{type:'paragraph',text:"Что привлекает Вас на озере? Что вы сделаете со своим мусором? Согласились бы вы убрать чужой мусор? Такие вопросы задали местные дети 12 июля всем собравшимся отдохнуть на озере Виштынецком."},{type:'paragraph',text:"Неожиданная встреча ждала многих людей, собравшихся 12 июля в День рыбака отдохнуть на озере Виштынецком. Экологический центр «РОМИНТА» совместно с Калининской сельской библиотекой при участии Нестеровского лесхоза организовали акцию «Живой щит», в которой приняли участие школьники посёлка Калинино и ближних деревень. На дороге к озеру дети развернули яркие плакаты, призывающие отдыхающих бережно относиться к природе."},{type:'paragraph',text:"Пассажиры автомобилей, останавливающихся на пограничном посту посёлка Ягодное, стали первыми обладателями символических билетов посетителей памятника природы. Получив билет, отдыхающие могли узнать об уникальности озера и правилах сохранения его чистоты; участники акции также предлагали пакеты для мусора."},{type:'paragraph',text:"Организаторы благодарили рекламную группу «Кармел» и рекламно-полиграфическую фирму «Джи-Эс» за безвозмездную помощь при подготовке акции."},{type:'gallery'}],
    migrationStatus:'source_body_restored_from_preserved_archive',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'preserved_archive_available'
  });

  add({
    id:'nko-social-projects-exhibition-2003',slug:'nko-social-projects-exhibition-2003',
    title:'Выставка социальных услуг и проектов НКО — 2003',category:'Музей',subcategory:'События музея',
    legacyUrl:'https://www.wystynez.ru/p9.htm',date:'май 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Участие Виштынецкого экомузея в выставке социальных услуг и проектов некоммерческих организаций.',
    content:[{type:'paragraph',text:"В конце мая в Калининграде впервые прошла выставка социальных услуг и проектов некоммерческих организаций, организованная Центром поддержки общественных инициатив и Общественной палатой Калининградской области при содействии администрации области. В ней участвовало более шестидесяти организаций."},{type:'paragraph',text:"Нестеровский район представляла общественная организация «Экологический центр РОМИНТА». Большой интерес вызвала её экспозиция и природная лотерея, в которой среди символических выигрышей были «запах цветов дикого луга», «высокое синее небо» и «свежесть летнего утра»."},{type:'paragraph',text:"Экоцентр представил проекты «Летний лагерь на природе», «Пост экологического мониторинга», «Детская фотостудия» и проект Виштынецкого эколого-исторического музея."},{type:'gallery'}],
    migrationStatus:'source_body_restored_from_preserved_archive',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'preserved_archive_available'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'childrens-summer-camp-2003','nko-social-projects-exhibition-2003'
    ])];
  }
})();


/* batch 7 */
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


/* batch 8 */
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


/* batch 9 */
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
    unknown2019.hero='https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i1711.jpg';
    unknown2019.sourceMediaInventory='data/legacy-media-batch-2.json';
  }

  const stoneProject=byId('visit-the-stone-project');
  if(stoneProject){
    stoneProject.hero='https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2157.jpg';
    stoneProject.images=[
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2158.jpg',caption:'Валун у горы Дозор — контекст исходной страницы; точная привязка подписи требует визуальной проверки',credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2159.jpg',caption:null,credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2160.jpg',caption:'Полевой шпат — контекст исходной страницы; точная привязка подписи требует визуальной проверки',credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2167.jpg',caption:'Экспедиционный материал — контекст исходной страницы',credit:'А. Соколов — общий фотокредит исходной страницы'},
      {src:'https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i2162.jpg',caption:'Интерактивная карта валунов — контекст исходной страницы',credit:'А. Соколов — общий фотокредит исходной страницы'}
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


/* batch 10 */
// Verified legacy migration batch 10: Gnome Treasures project + source-preserving enrichments.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const byId=id=>articles.find(article=>article.id===id);
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};

  add({
    id:'gnome-treasures-project',slug:'gnome-treasures-project',
    title:'Проект «Виштынецкие сокровища гномов»',
    category:'Проекты',subcategory:'Образовательные проекты',
    legacyUrl:'https://www.wystynez.ru/p84.htm',date:'сентябрь 2011 — июнь 2012',author:null,archival:true,
    deck:'Проект создания музейной образовательной программы о геологии Виштынецкой возвышенности для детей и семейных групп.',
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    content:[
      {type:'paragraph',text:'Проект «Виштынецкие сокровища гномов» был направлен на создание специальной музейной образовательной программы для детей и семейных групп, в которой знакомство с камнями Виштынецкой возвышенности соединялось со сказочным сюжетом, исследованием и самостоятельной работой.'},
      {type:'paragraph',text:'Проект предусматривал маршрут от музея к старому карьеру, создание «мастерской гномов» для обработки камня, интерактивные элементы, геологическое снаряжение и рабочую тетрадь-путеводитель для участников.'},
      {type:'paragraph',text:'Целями проекта были создание привлекательного краеведческого образовательного предложения для детских и семейных групп и развитие Краснолесья как места познавательного посещения, связанного с природным и историко-культурным наследием Виштынецкой возвышенности.'},
      {type:'heading',text:'Этапы проекта'},
      {type:'paragraph',text:'Подготовительный этап проходил с сентября по ноябрь 2011 года: разрабатывались образовательная программа, дизайн «мастерской гномов», маршрут к карьеру, интерактивные элементы и макет рабочей тетради.'},
      {type:'paragraph',text:'С ноября 2011 по апрель 2012 года создавалось и оснащалось пространство мастерской, приобреталось снаряжение и издавалась рабочая тетрадь. В мае–июне 2012 года программа проходила апробацию со школьными группами. Информационная работа по проекту была запланирована с сентября 2011 по июнь 2012 года.'},
      {type:'paragraph',text:'На исходной странице указано: фото — А. Соколов; цветные рисунки — Rien Poortvliet из книги «Skrzaty», Warszawa, 1990.'}
    ],
    migrationStatus:'verified_legacy_summary',
    projectPeriod:{start:'2011-09',end:'2012-06'},
    partners:['Калининградское региональное отделение Российского геологического общества','Муниципальное образование «Нестеровский район»'],
    photoCredits:['А. Соколов'],
    illustrationCredits:['Rien Poortvliet — рисунки из книги «Skrzaty», Warszawa, 1990'],
    relatedLegacyUrls:['https://www.wystynez.ru/p92.htm']
  });

  const program=byId('gnome-treasures');
  if(program){
    program.relatedLegacyUrls=[...new Set([...(program.relatedLegacyUrls||[]),'https://www.wystynez.ru/p84.htm'])];
    program.legacyOperationalDataStatus='archive_only';
    program.sourceNotes=[...new Set([
      ...(program.sourceNotes||[]),
      'Legacy page describes the programme as intended for ages 5–100, lasting 3.5 hours and historically designed for groups of 15–20; these organisational conditions are archival, not current.',
      'Project was a winner of the VIII grant competition «Меняющийся музей в меняющемся мире».',
      'Colour illustrations: Rien Poortvliet, «Skrzaty», Warszawa, 1990; black-and-white guide illustrations: Виктория Ветивер, 2012.'
    ])];
    program.illustrationCredits=['Rien Poortvliet','Виктория Ветивер'];
  }

  const upland=byId('vishtynets-upland-map-world');
  if(upland){
    const extra='Исходная страница указывает максимальную высоту Виштынецкой возвышенности 242,0 м и соседней Сувалкской возвышенности 309,0 м, рассматривая их вместе с Судувской возвышенностью как единый обособленный массив Балтийской гряды.';
    if(!(upland.content||[]).some(block=>block.text===extra))upland.content.push({type:'paragraph',text:extra});
    upland.sourceNotes=[...new Set([...(upland.sourceNotes||[]),'© КРОУ «Виштынецкий экомузей», 2006'])];
  }

  const donelaitis=byId('donelaitis');
  if(donelaitis){
    donelaitis.sourceNotes=[...new Set([
      ...(donelaitis.sourceNotes||[]),
      'Legacy page presents the four parts of the poem «Времена года»: «Радости весны», «Летние труды», «Блага осени», «Зимние заботы»; translation credited there to Д. Бродский.',
      'The page separately documents the 2014 celebration of the 300th anniversary of Donelaitis in Krasnolesye.'
    ])];
  }

  const travelling=byId('travelling-exposition-2004');
  if(travelling){
    travelling.partners=[...new Set([
      ...(travelling.partners||[]),
      'Калининградский областной историко-художественный музей',
      'КРОО «Экоцентр «Роминта»»',
      'Ландшафтный парк «Пуща Роминска» (Польша)',
      'КРМО «Экологическая группа «ГИД»»'
    ])];
    travelling.sourceNotes=[...new Set([
      ...(travelling.sourceNotes||[]),
      'Проект создания экспозиции был поддержан Датско-российским Фондом местного развития Нестеровского района.',
      'На открытии выступал хор «Ладо» Калининградской областной филармонии.',
      'Исходная страница особо благодарит Андреаса Гаучи, Вольфганга Роте и Яромира Краевского.'
    ])];
  }

  const exposition=byId('museum-exposition');
  if(exposition){
    exposition.sourceNotes=[...new Set([
      ...(exposition.sourceNotes||[]),
      'Legacy exposition page traces the permanent exhibition back to the photo exhibition «Роминтская пуща: между прошлым и будущим», opened 14 February 2002.',
      'The travelling exhibition spent about eight years moving around Kaliningrad Region before obtaining a permanent home in Krasnolesye.'
    ])];
  }

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'gnome-treasures-project'])];
  }
})();


/* batch 11 */
// Verified legacy migration batch 11: publication catalogue from p0087.htm.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const source='https://www.wystynez.ru/p0087.htm';
  const publication=(id,title,date,bibliography,deck,extra={})=>add({
    id,slug:id,title,category:'Публикации',subcategory:extra.subcategory||'Библиотека музея',legacyUrl:source,date,author:extra.author||null,
    deck,hero:null,images:[],relatedPoiIds:extra.relatedPoiIds||['poi_museum'],archival:true,
    content:[
      {type:'paragraph',text:deck},
      {type:'paragraph',text:`Библиографическое описание на старой странице музея: ${bibliography}`},
      ...(extra.content||[])
    ],
    migrationStatus:'verified_legacy_catalog_item',bibliography,
    downloadableDocuments:extra.downloadableDocuments||[],
    sourceNotes:extra.sourceNotes||[]
  });

  publication(
    'museum-guide-2013',
    'Виштынецкий эколого-исторический музей — «Музейный гид 2013»',
    '2013',
    'Виштынецкий эколого-исторический музей, Калининградская область // Сборник «Музейный гид. Путеводители по музеям России — 2013». Москва: программа Благотворительного фонда В. Потанина «Первая публикация», Проектное бюро «Спутник», 2013. 28 с.',
    'Брошюра о Виштынецком экомузее, вошедшая в сборник «Музейный гид — 2013».',
    {downloadableDocuments:[{title:'Интернет-версия «Музейного гида 2013»',url:null,status:'legacy_online_version_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'rominta-heritage-book-2014',
    'Наследие Роминтской пущи. Памятники истории и культуры',
    '2014',
    '«Наследие Роминтской пущи. Памятники истории и культуры» / А. Соколов; редактор К. Краевска. Житкеймы, 2014. 30 с.',
    'Книга об объектах историко-культурного наследия Роминтской пущи, подготовленная по результатам международного проекта по инвентаризации наследия.',
    {author:'А. Соколов',downloadableDocuments:[{title:'Скачать книгу',url:null,status:'download_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'vishtynets-lake-book-2011',
    'Озеро Виштынецкое',
    '2011',
    '«Озеро Виштынецкое» / ответственные редакторы К. В. Тылик, С. В. Шибаев. Калининград: ИП Мишуткина И. В., 2011. 144 с.',
    'Издание обобщает результаты многолетних комплексных исследований Виштынецкого озера учёными КГТУ и других учреждений.',
    {relatedPoiIds:['poi_museum','poi_vishtynets_lake']}
  );

  publication(
    'gnome-guide-2012',
    'Виштынецкие сокровища гномов. Музейная образовательная программа',
    '2012',
    '«Виштынецкие сокровища гномов. Музейная образовательная программа» / А. Соколов, В. Ветивер. КРОУ «Виштынецкий эколого-исторический музей», 2012. 26 с.',
    'Путеводитель и рабочая тетрадь участника образовательной программы «Виштынецкие сокровища гномов».',
    {author:'А. Соколов, В. Ветивер',sourceNotes:['Связано с проектной страницей p84.htm и программой p92.htm.']}
  );

  publication(
    'red-book-kaliningrad-2010',
    'Красная книга Калининградской области',
    '2010',
    '«Красная книга Калининградской области» / коллектив авторов; под ред. В. П. Дедкова, Г. В. Гришанова. Калининград: Изд-во РГУ им. И. Канта, 2010. 334 с.',
    'Справочное издание о редких и исчезающих видах растений и животных и экосистемах, требующих специальных мер сохранения.',
    {downloadableDocuments:[{title:'Скачать книгу',url:null,status:'download_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'civil-society-environment-2013',
    'Гражданское общество в деле охраны окружающей среды',
    '2013',
    'К. Краевска. «Гражданское общество в деле охраны окружающей среды. Справочник гражданина и чиновника». Голдап, 2013. 28 с.',
    'Справочник о правах граждан на экологическую информацию и участие в принятии решений в области охраны окружающей среды.',
    {author:'К. Краевска',downloadableDocuments:[{title:'Скачать книгу',url:null,status:'download_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'nature-protection-scheme-2004',
    'Схема охраны природы Калининградской области',
    '2004',
    '«Схема охраны природы Калининградской области» / под ред. Ю. А. Цыбина. Калининград: TENAX MEDIA, 2004. 136 с.',
    'Издание о перспективной сети особо охраняемых природных территорий Калининградской области и формировании природного каркаса региона.',
    {downloadableDocuments:[{title:'Скачать книгу',url:null,status:'download_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'rominta-tourism-brochure-2011',
    'Роминтская пуща. Что посмотреть и где остановиться',
    '2011',
    '«Роминтская пуща. Что посмотреть и где остановиться». Бюро менеджмента туризма и регионального развития, Берлин, 2011. 18 с.',
    'Туристическая брошюра о достопримечательностях и услугах Роминтской пущи.',
    {subcategory:'Туристические издания',downloadableDocuments:[
      {title:'Русскоязычная версия',url:null,status:'download_anchor_verified_exact_target_pending'},
      {title:'Немецкая версия',url:null,status:'download_anchor_verified_exact_target_pending'}
    ],sourceNotes:['Любые перечисленные в старой брошюре услуги и контакты являются историческими до современной проверки.']}
  );

  publication(
    'strategic-management-arts-2012',
    'Strategic Management in the Arts',
    '2012',
    'Lidia Varbanova. «Strategic Management in the Arts». 2012. 358 p.',
    'Книга Лидии Варбановой, где опыт Виштынецкого экомузея приведён как пример реализации собственного стратегического плана развития.',
    {author:'Lidia Varbanova',downloadableDocuments:[{title:'Подробнее — английский язык',url:null,status:'external_detail_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'vishtynets-postcards-2006',
    'Набор почтовых открыток «Виштынецкий край»',
    '2006',
    'Набор почтовых открыток «Виштынецкий край». КРОУ «Виштынецкий эколого-исторический музей», 2006. 8 открыток.',
    'Один из ранних музейных наборов открыток о Виштынецком крае.',
    {subcategory:'Открытки'}
  );

  publication(
    'cultural-resources-atlas-2008',
    'Атлас культурных ресурсов Калининградской области',
    '2008',
    '«Атлас культурных ресурсов Калининградской области» / коллектив авторов; идея и руководство проектом Ю. Бардун, Агентство поддержки культурных инициатив «Транзит». Калининград, 2008. 149 с.',
    'Атлас о природном, историческом и культурном наследии Калининграда и области, включая малоизвестные территории и объекты.',
    {downloadableDocuments:[{title:'Скачать книгу',url:null,status:'download_anchor_verified_exact_target_pending'}]}
  );

  publication(
    'rominta-heritage-postcards-2014',
    'Серия открыток «Наследие Роминтской пущи»',
    '2014',
    'Серия почтовых открыток «Наследие Роминтской пущи». КРОУ «Виштынецкий эколого-исторический музей», 2014. 10 открыток.',
    'Серия открыток с изображениями и описаниями объектов историко-культурного наследия Роминтской пущи, созданная в рамках проекта «Музейная почта».',
    {subcategory:'Открытки'}
  );

  publication(
    'rominta-video-tour-2011',
    'Роминтская пуща. Видеоэкскурсия',
    '2011',
    '«Роминтская пуща. Видеоэкскурсия». Продюсерский центр ОРТ, Калининград, 2011. Компакт-диск, 29 минут.',
    'Видеоэкскурсия по Роминтской пуще с рассказами об истории и природе, оригинальными съёмками и элементами реконструкции событий.',
    {subcategory:'Видео'}
  );

  publication(
    'curonian-spit-cultural-landscape-2008',
    'Куршская коса. Культурный ландшафт',
    '2008',
    '«Куршская коса. Культурный ландшафт» / В. И. Кулаков, В. А. Паевский, А. А. Соколов, Г. С. Харин и др. Калининград: Янтарный сказ, 2008. 432 с.',
    'Монография о природе и истории культурного ландшафта Куршской косы, представленная в legacy-каталоге изданий музея и его сотрудников.',
    {author:'В. И. Кулаков, В. А. Паевский, А. А. Соколов, Г. С. Харин и др.'}
  );

  publication(
    'kaliningrad-geographic-atlas-2002',
    'Географический атлас Калининградской области',
    '2002',
    '«Географический атлас Калининградской области» / гл. ред. В. В. Орлёнок. Калининград: Изд-во КГУ; ЦНИТ, 2002. 276 с.',
    'Комплексное картографическое издание об административном делении, природе, населении, экологии, экономике и культуре Калининградской области.',
    {sourceNotes:['Этот атлас также прямо указан как источник географической страницы музея p48.htm.']}
  );

  const natureBook=articles.find(article=>article.id==='nature-complexes-book');
  if(natureBook){
    natureBook.bibliography='«Природа Калининградской области. Ключевые природные комплексы: справочное пособие» / Ф. Е. Алексеев, А. А. Соколов, М. Г. Напреенко, Д. Б. Булгаков, В. В. Гусев, О. В. Рыльков и др. Калининград: Исток, 2014. 192 с.';
    natureBook.sourceNotes=[...new Set([...(natureBook.sourceNotes||[]),'Legacy publications catalogue p0087.htm gives the full bibliographic description and 192-page extent.'])];
  }

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'museum-guide-2013','rominta-heritage-book-2014','vishtynets-lake-book-2011','gnome-guide-2012',
      'red-book-kaliningrad-2010','civil-society-environment-2013','nature-protection-scheme-2004','rominta-tourism-brochure-2011',
      'strategic-management-arts-2012','vishtynets-postcards-2006','cultural-resources-atlas-2008','rominta-heritage-postcards-2014',
      'rominta-video-tour-2011','curonian-spit-cultural-landscape-2008','kaliningrad-geographic-atlas-2002'
    ])];
  }
})();


/* batch 12 */
// Verified legacy migration batch 12: upgrade seed records from primary legacy pages.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const byId=id=>articles.find(article=>article.id===id);

  const unknown=byId('unknown-vishtynets');
  if(unknown){
    unknown.date='1 июня 2018 — 30 июня 2019';
    unknown.deck='Проект по сохранению и осмыслению озера Виштынецкого через новую музейную экспозицию, смотровую площадку, передвижную фотовыставку и музейные открытки.';
    unknown.content=[
      {type:'paragraph',text:'Проект «Неизвестный Виштынец, или по дороге к чуду» был направлен на содействие сохранению памятника природы «Озеро Виштынецкое»: привлечение внимания к его природной уникальности, экологическим проблемам и историко-культурному значению для территории на границе России и Литвы.'},
      {type:'paragraph',text:'В рамках проекта создавалась музейная экспозиция об озере Виштынецком с рельефным макетом дна, подводной фотосъёмкой и интерактивными объектами.'},
      {type:'paragraph',text:'В окрестностях Краснолесья была предусмотрена смотровая площадка для знакомства с ландшафтом Виштынецкой возвышенности, его формированием, происхождением озера и правилами бережного поведения в природе.'},
      {type:'paragraph',text:'Проект также включал издание почтовых открыток с видами и легендами Виштынецкого озера, работу музейной почты, создание передвижной фотовыставки об озере и итоговое публичное открытие созданного комплекса.'},
      {type:'heading',text:'Сроки и команда'},
      {type:'paragraph',text:'Проект реализовывался с 1 июня 2018 года по 30 июня 2019 года. Руководитель — Алексей Соколов; соруководитель — Эдуард Барсуков; консультант по экологическому просвещению — Александр Самсонкин; фотограф и дизайнер — Юлия Алексеева; бухгалтер — Мария Омельяненко.'},
      {type:'heading',text:'Финансирование'},
      {type:'paragraph',text:'На исходной странице указан общий бюджет проекта 1 187 808 рублей, в том числе грант Фонда президентских грантов 1 045 808 рублей. Проект стал победителем конкурса грантов Президента Российской Федерации на развитие гражданского общества в 2018 году.'},
      {type:'paragraph',text:'Связанные страницы старого сайта сохраняют отдельные новости проекта: встречу 26 сентября 2018 года, информационные встречи 2019 года и торжественное открытие комплекса 16 июня 2019 года.'}
    ];
    unknown.migrationStatus='verified_legacy_summary';
    unknown.projectPeriod={start:'2018-06-01',end:'2019-06-30'};
    unknown.funding={totalRub:1187808,grantRub:1045808,source:'Фонд президентских грантов'};
    unknown.team=[
      {name:'Алексей Соколов',role:'руководитель проекта'},
      {name:'Эдуард Барсуков',role:'соруководитель проекта'},
      {name:'Александр Самсонкин',role:'консультант по экологическому просвещению'},
      {name:'Юлия Алексеева',role:'фотограф, дизайнер'},
      {name:'Мария Омельяненко',role:'бухгалтер'}
    ];
    unknown.partners=['Министерство природных ресурсов и экологии Калининградской области','Отдел культуры Администрации МО «Нестеровский район»','КРОО «Экоцентр «РОМИНТА»»','АУ КО «Экологический центр «ЕКАТ-Калининград»»'];
    unknown.relatedLegacyUrls=[...new Set([...(unknown.relatedLegacyUrls||[]),'https://www.wystynez.ru/p0108.htm','https://www.wystynez.ru/p0109.htm'])];
  }

  const teachers=byId('museum-for-teachers');
  if(teachers){
    teachers.photoCredits=['Ольга Юсько','Алексей Соколов'];
    teachers.legacyOperationalDataStatus='archive_only';
    teachers.content=[
      {type:'paragraph',text:'Архивная страница музея обращена к педагогам и группам с детьми и предлагает собирать собственную «коллекцию впечатлений» через экскурсии, прогулки и исследовательские занятия в Краснолесье и Роминтской пуще.'},
      {type:'heading',text:'Что можно было успеть за один день'},
      {type:'paragraph',text:'Первый вариант объединял экскурсию по экспозиции музея об истории и природе Роминтской пущи с прогулкой к родникам и истокам реки Синей либо поездкой к высокому железнодорожному мосту в Токаревке.'},
      {type:'paragraph',text:'Второй вариант строился вокруг интерактивной геологической программы «Виштынецкие сокровища гномов». Указанные на старой странице продолжительность, сезонность и размеры групп являются архивными организационными условиями и не публикуются как действующие без современной проверки.'},
      {type:'heading',text:'Экспедиция на несколько дней'},
      {type:'paragraph',text:'Старая страница содержит пример трёхдневной познавательной экспедиции: знакомство с Краснолесьем, экскурсию по музейной экспозиции, прогулку к истокам Синей, путешествие в Роминтскую пущу к реке Красной и вековым деревьям, занятие «Виштынецкие сокровища гномов», вечер у костра и занятия о растениях или микромире водоёма.'},
      {type:'heading',text:'Тематические направления'},
      {type:'paragraph',text:'Музей предлагал тематические экспедиции «Зелёная лаборатория», «По законам леса», «Путешествие в микромир» и «Каменные истории», а также возможность совместно с педагогами проектировать другие темы под возраст и интересы группы.'},
      {type:'paragraph',text:'Фото на исходной странице: Ольга Юсько, Алексей Соколов.'}
    ];
    teachers.migrationStatus='verified_legacy_summary';
  }
})();


/* batch 13 */
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


/* batch 14 */
// Verified legacy migration batch 14: upgrade two remaining seed records from primary legacy sources.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const byId=id=>articles.find(article=>article.id===id);

  const stones=byId('kamennye-istorii');
  if(stones){
    stones.date='26 сентября 2015';
    stones.deck='Экспозиция под открытым небом о геологическом наследии Виштынецкой возвышенности, ледниковых валунах и культурных традициях использования камня.';
    stones.content=[
      {type:'paragraph',text:'26 сентября 2015 года на территории Виштынецкого экомузея в Краснолесье открылась экспозиция под открытым небом «Каменные истории». Она была создана в рамках одноимённого проекта — победителя регионального конкурса проектов социально ориентированных общественных организаций.'},
      {type:'paragraph',text:'Экспозиция посвящена геологическому наследию Виштынецкой возвышенности и культурным традициям использования камня. В ней собраны большие валуны различных горных пород, участок каменного мощения, межевой камень и старый квартальный столб.'},
      {type:'paragraph',text:'Информационные стенды объясняют происхождение камней, их перемещение вместе с ледником, роль ледника в формировании рельефа возвышенности и разнообразные способы использования камня человеком.'},
      {type:'paragraph',text:'Отдельная практическая часть позволяет посетителю попробовать самостоятельно определить найденный камень и узнать название горной породы.'},
      {type:'paragraph',text:'Открытие прошло при участии Отдела культуры Администрации Нестеровского района и администрации Чистопрудненского сельского поселения. Программу дополнил концерт «Ветер странствий» с участием студии танца «Амбер Трайб» и коллектива «Иридан».'}
    ];
    stones.migrationStatus='verified_legacy_summary';
    stones.sourceScope='dedicated_primary_page';
    stones.projectSupport='субсидия из регионального бюджета Калининградской области, 2015';
    stones.expositionType='постоянная экспозиция под открытым небом';
    stones.expositionElements=[
      'большие валуны различных горных пород',
      'участок каменного мощения',
      'межевой камень',
      'старый квартальный столб',
      'информационные стенды о происхождении камней, леднике, рельефе и использовании камня человеком',
      'практическое определение горных пород посетителями'
    ];
    stones.openingPartners=['Отдел культуры Администрации Нестеровского района','Администрация МО «Чистопрудненское сельское поселение»','Краснолесенский дом культуры'];
    stones.sourceMediaStatus='dedicated_page_contains_opening_and_exposition_images_exact_urls_pending_media_pass';
  }

  const forest=byId('forest-village');
  if(forest){
    forest.date='2016–2018';
    forest.author='Анна Карпенко';
    forest.deck='Познавательный туризм, созданный вместе с жителями Роминтской пущи: местные проводники, прогулки, ремесленные и гастрономические мастерские в Краснолесье и соседних посёлках.';
    forest.content=[
      {type:'paragraph',text:'«Лесная деревня» — проект 2016–2017 годов, в котором местные жители Роминтской пущи подготовили собственные предложения для познавательного туризма: прогулки, экскурсии, мастерские и знакомство с жизнью территории.'},
      {type:'heading',text:'Краснолесье'},
      {type:'paragraph',text:'Женский клуб «Ностальгия» приглашал на экскурсию по Краснолесью с рассказами и воспоминаниями жителей. Александр Дорошкин проводил познавательную прогулку к истокам реки Синей, родникам, старой липовой аллее и месту бывшего поселения Прасберг.'},
      {type:'paragraph',text:'Татьяна и Николай Шумилло знакомили гостей с пчеловодством; Любовь Зайцева проводила мастерскую «Зелёная кухня»; Елена Уфимцева — мастер-класс «Лесной талисман» и роспись деревянных игрушек.'},
      {type:'heading',text:'Токаревка, Дмитриевка и Боровиково'},
      {type:'paragraph',text:'В Токаревке Людмила Петренко предлагала маршрут по экотропе вдоль реки Красной к железнодорожному мосту. В Дмитриевке Наталья Добровольская проводила медитативную лесную прогулку «Купание в лесу». В Боровиково Александр Самсонкин знакомил гостей с целебными травами и жизнью фермерской усадьбы.'},
      {type:'paragraph',text:'Все цены, телефоны, продолжительность программ, размер групп и сезонность на исходной странице относятся к архивному предложению 2018 года и не считаются действующими без современной проверки.'},
      {type:'gallery'}
    ];
    forest.migrationStatus='verified_legacy_summary';
    forest.sourceScope='dedicated_primary_page';
    forest.projectPeriod={start:'2016',end:'2017'};
    forest.projectRecognition='Победитель XIII грантового конкурса музейных проектов «Меняющийся музей в меняющемся мире» Благотворительного фонда В. Потанина.';
    forest.photoCredits=['Александр Матвеев','Алексей Соколов','Эдуард Барсуков'];
    forest.localHosts=[
      {place:'Краснолесье',name:'женский клуб «Ностальгия»',offer:'экскурсия по посёлку'},
      {place:'Краснолесье',name:'Александр Дорошкин',offer:'истоки реки Синей, родники, липовая аллея, Прасберг'},
      {place:'Краснолесье',name:'Татьяна и Николай Шумилло',offer:'пчеловодческая мастерская'},
      {place:'Краснолесье',name:'Любовь Зайцева',offer:'мастерская «Зелёная кухня»'},
      {place:'Краснолесье',name:'Елена Уфимцева',offer:'мастер-класс «Лесной талисман»'},
      {place:'Токаревка',name:'Людмила Петренко',offer:'экотропа к реке Красной и Токаревскому мосту'},
      {place:'Дмитриевка',name:'Наталья Добровольская',offer:'лесное путешествие «Купание в лесу»'},
      {place:'Боровиково',name:'Александр Самсонкин',offer:'«Целебные травы»'}
    ];
    forest.legacyOperationalDataStatus='archive_only';
    forest.sourceMediaStatus='large_source_gallery_page_level_credits_verified_exact_urls_pending_additional_pass';
  }
})();


/* batch 15 */
// Verified legacy migration batch 15: upgrade «Музейная почта» from its dedicated primary page.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const mail=articles.find(article=>article.id==='museum-mail');
  if(!mail)return;

  mail.date='24 октября 2014';
  mail.author=null;
  mail.deck='Проект и выставка о почтовой открытке как послании во времени: новые открытки Роминтской пущи, музейный почтовый ящик, штемпель и коллекция исторических открыток.';
  mail.hero='https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/i0911.jpg';
  mail.photoCredits=['Э. Барсуков'];
  mail.images=[
    'i0911','i0912','i0913','i0914','i0915','i0916','i0917','i0918','i0919','i0920',
    'i0921','i0922','i0923','i0924','i0925','i0926','i0927','i0928','i0929','i0930','i0909'
  ].map(id=>({
    src:`https://raw.githubusercontent.com/falke0039/wystynez/main/sc-pic/${id}.jpg`,
    caption:null,
    credit:'Э. Барсуков',
    creditScope:'page_level_credit',
    source:'https://wystynez.ru/p103.htm'
  }));
  mail.content=[
    {type:'paragraph',text:'Проект «Музейная почта» стал победителем конкурса проектов социально ориентированных общественных организаций на предоставление субсидии из бюджета Калининградской области в 2014 году. 24 октября 2014 года в Виштынецком экомузее открылась одноимённая выставка.'},
    {type:'paragraph',text:'Главной темой стала почтовая открытка — короткое открытое послание о месте и впечатлениях, которое способно сохранять память не только в пространстве, но и во времени.'},
    {type:'paragraph',text:'В рамках проекта музей издал десять новых открыток с объектами историко-культурного наследия Роминтской пущи. В музее появилось специальное почтовое пространство: почтовый ящик, штемпель, стеллаж с открытками и место для их подписания.'},
    {type:'paragraph',text:'В выставочном зале показали репродукции старых открыток Роминтской пущи конца XIX — начала XX века из музейного архива и личного собрания Славы Тарасевич (Польша), а также стенд об исторических и природных достопримечательностях территории.'},
    {type:'paragraph',text:'По проекту была предусмотрена бесплатная отправка тысячи музейных открыток. Исходная страница отмечает, что уже в первые дни работы выставки посетители отправили более 300 открыток.'},
    {type:'paragraph',text:'Одной из новых открыток был посвящён железнодорожный мост в Токаревке; в день открытия участники также отправились к этому объекту на экскурсию.'},
    {type:'gallery'},
    {type:'paragraph',text:'Фото на исходной странице: Э. Барсуков.'}
  ];
  mail.migrationStatus='verified_legacy_summary';
  mail.sourceScope='dedicated_primary_page';
  mail.projectRecognition='Победитель регионального конкурса проектов социально ориентированных общественных организаций на предоставление субсидии, 2014.';
  mail.projectOutputs={
    newPostcards:10,
    freePostcardsPlanned:1000,
    postcardsSentInFirstDays:'более 300',
    museumPostSpace:['почтовый ящик','штемпель','стеллаж для открыток','место для подписания открыток'],
    historicalPostcards:'репродукции открыток Роминтской пущи конца XIX — начала XX века'
  };
  mail.historicalCollectionSource='архив Виштынецкого экомузея и личное собрание Славы Тарасевич (Польша)';
  mail.sourceMediaInventory={
    legacyUrl:'https://wystynez.ru/p103.htm',
    exactImageUrlCount:21,
    range:'i0911.jpg–i0930.jpg + i0909.jpg',
    binaryReachability:'crawler_cache_miss_during_inventory'
  };
})();


/* batch 16 */
// Verified legacy migration batch 16: museum history / mission and main exposition.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const byId=id=>articles.find(article=>article.id===id);

  const about=byId('about-museum');
  if(about){
    about.legacyUrl='https://wystynez.ru/aMy---eto--sotrudniki--Kaliningradskogo--regional_nogo--obcshestvennogo--uchrezhdenija--Vishtyneckij.htm';
    about.date='с 2001 года';
    about.deck='История общественного музея от инициативы группы друзей и передвижной фотовыставки до постоянной экспозиции и музейно-информационного центра в Краснолесье.';
    about.content=[
      {type:'paragraph',text:'Идея создать музейное учреждение возникла в 2001 году по инициативе группы друзей. На общественных началах создавались выставки о природе и истории Виштынецкой возвышенности и Роминтской пущи, проводились просветительские мероприятия для детей и взрослых и реализовывались музейные проекты.'},
      {type:'paragraph',text:'На протяжении многих лет у музея не было собственного помещения. Первая фотовыставка с 2002 года путешествовала по музеям Калининградской области, постепенно дополнялась материалами и экспонатами и превращалась в полноценную музейную экспозицию.'},
      {type:'paragraph',text:'Постоянный адрес музей получил в Краснолесье, в здании бывшей школы, переданном учреждению администрацией Нестеровского района. Здесь разместились постоянная экспозиция и информационный центр для гостей Роминтской пущи.'},
      {type:'paragraph',text:'Музей развивает экскурсии, занятия и познавательные программы по природе, истории и культуре Виштынецкой возвышенности и рассматривает просвещение как основной инструмент сохранения территории.'},
      {type:'heading',text:'Миссия музея'},
      {type:'paragraph',text:'Через просвещение способствовать осознанию единства людей со своей землёй, ответственного творчества и труда на благо нынешнего дня и будущих поколений, сохраняя и проявляя природный и культурный потенциал Виштынецкой возвышенности и её жителей.'}
    ];
    about.migrationStatus='verified_legacy_summary';
    about.sourceScope='dedicated_primary_page';
    about.historyMilestones=[
      {year:2001,event:'возникла идея музея и началась общественная просветительская работа'},
      {year:2002,event:'первая фотовыставка начала путешествовать по музеям Калининградской области'},
      {year:2004,event:'торжественное открытие передвижной музейной экспозиции в Чистых Прудах'},
      {year:2005,event:'работа экспозиции в музее КГТУ и в Чистых Прудах'},
      {year:2006,event:'экспозиция работала в Музее Мирового океана'},
      {year:2011,event:'29 апреля открыт музейно-информационный центр в Краснолесье'},
      {year:2015,event:'на территории музея открыта экспозиция под открытым небом «Каменные истории»'}
    ];
    about.sourceMediaStatus='source_page_contains_museum_history_images_exact_urls_pending_media_pass';
  }

  const exposition=byId('museum-exposition');
  if(exposition){
    exposition.deck='Постоянная экспозиция музея как путешествие по природе, истории и культуре Роминтской пущи, Виштынецкой возвышенности и озера Виштынецкого — от ледникового рельефа до жизни людей и охраны территории.';
    exposition.content=[
      {type:'paragraph',text:'Постоянная экспозиция Виштынецкого экомузея посвящена Роминтской пуще, Виштынецкой возвышенности и озеру Виштынецкому. Она соединяет природную историю территории с историей людей, культур и способов использования ландшафта.'},
      {type:'paragraph',text:'Экспозиция ведёт посетителя от формирования рельефа древними ледниками и «подземного мира» горных пород к высоким холмам и лесам, первым людям этой земли, Великой пустоши, королевским охотам в Роминтской пуще и культурному перекрёстку народов.'},
      {type:'paragraph',text:'Старая музейная страница подчёркивает, что экспозиция постоянно развивается и дополняется новыми экспонатами. С 2015 года она существует не только внутри здания: на территории музея работает открытая экспозиция «Каменные истории».'},
      {type:'heading',text:'Как формировалась экспозиция'},
      {type:'paragraph',text:'История экспозиции начинается с фотовыставки «Роминтская пуща: между прошлым и будущим», открытой 14 февраля 2002 года в Калининградском областном историко-художественном музее. Затем последовали передвижная экспозиция в Чистых Прудах в 2004 году, показы в КГТУ в 2005 году и Музее Мирового океана в 2006 году.'},
      {type:'paragraph',text:'29 апреля 2011 года в Краснолесье был открыт музейно-информационный центр, где экспозиция получила постоянный дом. В 2015 году музейное пространство расширилось на улицу благодаря «Каменным историям».'},
      {type:'paragraph',text:'Режим работы и контактные данные на старой странице сохраняются только как исторические сведения и не используются автоматически как актуальная информация для посетителей.'}
    ];
    exposition.migrationStatus='verified_legacy_summary';
    exposition.sourceScope='dedicated_primary_page';
    exposition.historyMilestones=[
      {date:'14 февраля 2002',event:'фотовыставка «Роминтская пуща: между прошлым и будущим» в Калининградском областном историко-художественном музее'},
      {date:'22 мая 2004',event:'открытие передвижной экспозиции в музее Кристионаса Донелайтиса, Чистые Пруды'},
      {date:'март–май 2005',event:'работа экспозиции в музее КГТУ'},
      {date:'22 марта — 24 апреля 2006',event:'работа экспозиции в Музее Мирового океана'},
      {date:'29 апреля 2011',event:'открытие музейно-информационного центра в Краснолесье'},
      {date:'26 сентября 2015',event:'открытие экспозиции под открытым небом «Каменные истории»'}
    ];
    exposition.legacyOperationalDataStatus='archive_only';
    exposition.sourceMediaStatus='source_page_contains_exposition_history_images_exact_urls_pending_media_pass';
  }
})();


/* batch 17 */
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


/* batch 18 */
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


/* batch 19 */
// Verified legacy migration batch 19: remaining archive-index records from 2013–2015.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  add({
    id:'symphony-orchestra-garden-2015',slug:'symphony-orchestra-garden-2015',
    title:'Концерт государственного симфонического оркестра в саду музея',
    category:'Культура',subcategory:'Концерты и события',legacyUrl:archive,date:'6 июня 2015',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музея о концерте государственного симфонического оркестра под руководством А. Фельдмана в саду Виштынецкого экомузея.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует концерт государственного симфонического оркестра под руководством А. Фельдмана, состоявшийся 6 июня 2015 года в саду музея.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'heritage-seminar-2014',slug:'heritage-seminar-2014',
    title:'Семинар «Историко-культурное наследие Роминтской пущи»',
    category:'История',subcategory:'Семинары и исследования',legacyUrl:archive,date:'28 марта 2014',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музея о семинаре, посвящённом историко-культурному наследию Роминтской пущи.',
    content:[{type:'paragraph',text:'Музейный архив фиксирует семинар «Историко-культурное наследие Роминтской пущи», состоявшийся 28 марта 2014 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'donelaitis-journey-2013',slug:'donelaitis-journey-2013',
    title:'Путешествие к Кристионасу Донелайтису',
    category:'Культура',subcategory:'Литература и наследие',legacyUrl:archive,date:'декабрь 2013',author:null,archival:true,hero:null,images:[],relatedPoiIds:[],
    deck:'Архивная запись о путешествии к Кристионасу Донелайтису, приуроченном к 300-летию поэта.',
    content:[{type:'paragraph',text:'Архив музея фиксирует в декабре 2013 года путешествие к Кристионасу Донелайтису, организованное в преддверии 300-летия поэта.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['donelaitis']
  });

  add({
    id:'tourism-industry-diploma-2013',slug:'tourism-industry-diploma-2013',
    title:'Диплом конкурса туристической индустрии Калининградской области',
    category:'Музей',subcategory:'Награды и признание',legacyUrl:archive,date:'декабрь 2013',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись о том, что Виштынецкий экомузей стал дипломантом конкурса туристической индустрии Калининградской области.',
    content:[{type:'paragraph',text:'Архив музея сообщает, что в декабре 2013 года Виштынецкий экомузей стал дипломантом конкурса туристической индустрии Калининградской области.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'museum-guide-festival-2013',slug:'museum-guide-festival-2013',
    title:'Фестиваль «Музейный гид» — 2013',
    category:'Музей',subcategory:'Фестивали и профессиональные события',legacyUrl:archive,date:'31 мая — 4 июня 2013',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Участие Виштынецкого экомузея в фестивале «Музейный гид» с выставкой «Виштынецкие сокровища гномов».',
    content:[{type:'paragraph',text:'Архив музея фиксирует участие Виштынецкого экомузея в фестивале «Музейный гид» с выставкой «Виштынецкие сокровища гномов» с 31 мая по 4 июня 2013 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['gnome-treasures-project']
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'symphony-orchestra-garden-2015','heritage-seminar-2014','tourism-industry-diploma-2013','museum-guide-festival-2013'])];
  }
})();

