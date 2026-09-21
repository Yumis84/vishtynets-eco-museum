// Runtime bundle: verified legacy migration batches 20–37. Source batch files remain canonical audit trail.

/* batch 20 */
// Verified legacy migration batch 20: connect exact Forest Village media inventory without over-attributing or rendering unverified legacy graphics.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const forest=articles.find(article=>article.id==='forest-village');
  if(!forest)return;

  forest.sourceMediaStatus='39_exact_legacy_media_urls_captured_visual_role_review_pending';
  forest.sourceMediaInventoryFile='data/legacy-media-batch-5.json';
  forest.sourceMediaCount=39;
  forest.sourceMediaCreditScope='page_level_collective';
  forest.photoCredits=['Александр Матвеев','Алексей Соколов','Эдуард Барсуков'];
  forest.mediaDisplayPolicy='Keep current verified hero/gallery images; do not automatically display every captured file until its visual role is checked because legacy PNG files may be decorative graphics.';
})();


/* batch 21 */
// Verified legacy migration batch 21: enrich core Nature pages from p24.htm and p44.htm while preserving source conflicts and archival rules.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const byId=id=>articles.find(article=>article.id===id);

  const lake=byId('vishtynets-lake');
  if(lake){
    lake.date='2014';
    lake.deck='Большая музейная статья о Виштынецком озере: гидрология, животный мир, природоохранный статус, связанные места и архивные правила посещения.';
    lake.content=[
      {type:'paragraph',text:'Legacy-страница музея 2014 года описывает Виштынецкое озеро как крупнейшее и глубочайшее озеро Калининградской области. На ней приведены архивные характеристики: площадь водного зеркала более 16 км², объём около 258 млн м³ пресной воды, единственная вытекающая река — Писса, а также сведения о 22 видах рыб и примерно 150 видах беспозвоночных.'},
      {type:'paragraph',text:'Отдельно описаны питание озера родниками и ручьями Виштынецкой возвышенности, связь через Писсу, Анграпу, Преголю и Калининградский залив с морем, а также соседние ледниковые озёра возвышенности.'},
      {type:'paragraph',text:'С 1974 года старый музейный материал фиксирует озеро как памятник природы и ссылается на решение исполкома Калининградского областного совета от 10 ноября 1974 года №347.'},
      {type:'paragraph',text:'На исходной странице также были опубликованы правила посещения, пограничного режима, стоянки, костров и рыбалки. Все эти условия относятся к состоянию страницы 2014 года и в новом сайте должны показываться только как архивные сведения, а не как действующие правила без современной официальной проверки.'},
      {type:'heading',text:'Связанные места'},
      {type:'paragraph',text:'Страница связывает озеро с посёлком Ягодное и рекой Писсой: упоминаются руины старой мельницы, водопад и мельничный пруд.'},
      {type:'paragraph',text:'Фото на исходной странице: А. Соколов.'}
    ];
    lake.migrationStatus='verified_legacy_summary';
    lake.sourceScope='dedicated_primary_page';
    lake.archivalMeasurements={surfaceArea:'более 16 км²',volume:'около 258 млн м³',fishSpecies:22,invertebrateSpecies:'около 150',maxDepthFromP24:'54 м'};
    lake.legacyOperationalDataStatus='archive_only_do_not_use_as_current_rules';
    lake.sourceMediaStatus='15_exact_legacy_media_urls_captured_binary_fetch_pending';
    lake.sourceMediaInventoryFile='data/legacy-media-batch-6.json';
    lake.photoCredits=['А. Соколов'];
    lake.sourceNotes=[
      'Legacy p24.htm states maximum depth 54 m.',
      'Legacy p44.htm states maximum depth 52 m.',
      'Do not silently resolve this legacy-source conflict; verify against a modern authoritative source before publishing one current figure.'
    ];
  }

  const monuments=byId('nature-monuments');
  if(monuments){
    monuments.title='Памятники природы Виштынецкой возвышенности';
    monuments.subcategory='Охрана природы';
    monuments.deck='Старая музейная страница об озере Виштынецком и реке Красной как памятниках природы, их ландшафте и природной ценности.';
    monuments.content=[
      {type:'paragraph',text:'Legacy-страница музея объединяет два природных объекта — озеро Виштынецкое и реку Красную — и указывает, что они были объявлены памятниками природы в 1974 году как объекты природно-исторического и научно-познавательного значения.'},
      {type:'heading',text:'Озеро Виштынецкое'},
      {type:'paragraph',text:'Страница повторяет архивные сведения о площади более 16 км², объёме около 258 млн м³, реке Писсе, 22 видах рыб и примерно 150 видах беспозвоночных. При этом здесь максимальная глубина указана как 52 м, тогда как отдельная страница озера p24.htm указывает 54 м. Это расхождение сохранено как конфликт двух legacy-источников и не исправляется по догадке.'},
      {type:'heading',text:'Река Красная'},
      {type:'paragraph',text:'Для реки Красной старая страница описывает 18 километров поймы от границы с Польшей, лесные берега, родники, песчаные и каменистые осыпи, намывные луга, редкие растения и звериные тропы к воде.'},
      {type:'paragraph',text:'В тексте отдельно названы дремлик широколистный, тайник яйцевидный и лунник оживающий; также упоминаются следы деятельности бобра и роль Красной в водной системе Виштынецкой возвышенности.'}
    ];
    monuments.migrationStatus='verified_legacy_summary';
    monuments.sourceScope='dedicated_primary_page';
    monuments.sourceConflictNotes=['p44.htm: maximum lake depth 52 m','p24.htm: maximum lake depth 54 m'];
  }

  if(!points.some(point=>point.id==='poi_red_river')){
    points.push({
      id:'poi_red_river',slug:'red-river-rominta',name:'Река Красная',category:'Реки и родники',categories:['Природа','Реки и родники','Памятники природы'],
      lat:null,lng:null,address:'Роминтская пуща / Виштынецкая возвышенность',
      shortDescription:'Памятник природы и одна из главных рек Роминтской пущи; историческая музейная страница описывает лесную пойму, родники и природные сообщества.',
      articleIds:['nature-monuments'],photos:[],photoCredits:[],sourceUrls:['https://www.wystynez.ru/p44.htm'],coordinateStatus:'unresolved',status:'catalog_only'
    });
  }
  const lakePoint=points.find(point=>point.id==='poi_vishtynets_lake');
  if(lakePoint){
    lakePoint.articleIds=[...new Set([...(lakePoint.articleIds||[]),'vishtynets-lake','nature-monuments'])];
    lakePoint.photoCredits=['А. Соколов'];
  }
  if(monuments){
    monuments.relatedPoiIds=[...new Set([...(monuments.relatedPoiIds||[]),'poi_vishtynets_lake','poi_red_river'])];
  }
})();


/* batch 22 */
// Verified legacy migration batch 22: educational programmes from the legacy museum services page p95.htm.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const source='https://www.wystynez.ru/p95.htm';
  const common={category:'Образовательные программы',legacyUrl:source,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page',legacyOperationalDataStatus:'archive_only_do_not_treat_as_current_offer',photoCredits:['Юлия Алексеева','Алексей Соколов']};

  add({...common,
    id:'country-where-rivers-born',slug:'country-where-rivers-born',title:'Страна, где рождаются реки',subcategory:'Природа и ландшафт',date:null,
    deck:'Музейная программа с путешествием к долине истоков реки Синей — месту, где можно увидеть рождение реки и ландшафт Виштынецкой возвышенности.',
    content:[
      {type:'paragraph',text:'Программа объединяла знакомство с экспозицией музея и реальное путешествие в окрестности Краснолесья — в долину истоков реки Синей.'},
      {type:'paragraph',text:'Старая страница подчёркивала перепады высот до 50 метров, возможность увидеть выходы родников и посетить руины бывшего поселения мельников Прасберг.'},
      {type:'paragraph',text:'Указанные на legacy-странице продолжительность около 2–2,5 часов, бесснежный сезон, размер группы и стоимость относятся к историческому предложению и не считаются действующими без современной проверки.'}
    ],
    archivalProgrammeParameters:{duration:'около 2–2,5 часов',season:'бесснежный период',group:'от 10 человек',price:'300 руб. за участника'}
  });

  add({...common,
    id:'colors-of-red-forest-program',slug:'colors-of-red-forest-program',title:'Цвета Красного леса',subcategory:'Природа и творчество',date:null,
    deck:'Поиск цвета в природе Красного леса: радуга, натуральные красители и собственная «цветная лаборатория».',
    content:[
      {type:'paragraph',text:'Программа приглашала участников исследовать происхождение цвета, способы получения красителей для традиционной одежды и разнообразие цветов Красного леса.'},
      {type:'paragraph',text:'Практическая часть строилась как «цветная лаборатория»: участники искали природные источники цвета и создавали собственные разноцветные лоскуты.'},
      {type:'paragraph',text:'Продолжительность, сезон, размер группы и цена со старой страницы сохраняются только как архивные параметры программы.'}
    ],
    archivalProgrammeParameters:{duration:'3 часа',season:'май–октябрь',group:'15–20 человек',price:'450 руб. за участника'}
  });

  add({...common,
    id:'visiting-the-museum-program',slug:'visiting-the-museum-program',title:'В гостях у музея',subcategory:'Знакомство с музеем',date:null,
    deck:'Короткая музейная программа: экскурсия по экспозиции, знакомство с деятельностью музея, программами и сказочными гномами.',
    content:[
      {type:'paragraph',text:'Программа «В гостях у музея» сочетала экскурсию по экспозиции, рассказ о деятельности музея и знакомство с другими музейными занятиями и программами.'},
      {type:'paragraph',text:'В старом описании также упоминались знакомство со сказочными гномами и дружеское чаепитие с пирогом из местной пекарни.'},
      {type:'paragraph',text:'Продолжительность, размер группы и стоимость из legacy-страницы являются архивными условиями.'}
    ],
    archivalProgrammeParameters:{duration:'1,5 часа',season:'круглый год',group:'от 10 человек',price:'350 руб. за участника'}
  });

  add({...common,
    id:'meet-the-plants-program',slug:'meet-the-plants-program',title:'Знакомьтесь: растения!',subcategory:'Ботаника',date:null,
    deck:'Полевое занятие-знакомство с растениями: названия, происхождение имён и полезные свойства.',
    content:[
      {type:'paragraph',text:'Занятие предлагало небольшое путешествие в поисках новых «знакомых» зелёного мира.'},
      {type:'paragraph',text:'Участники узнавали истории происхождения названий растений и их полезные свойства; старая страница подчёркивала, что занятие можно проходить неоднократно и каждый раз находить новые виды.'},
      {type:'paragraph',text:'Продолжительность, сезон, размер группы и стоимость со старой страницы сохраняются как архивные сведения.'}
    ],
    archivalProgrammeParameters:{duration:'около 1 часа',season:'май–октябрь',group:'10–20 человек',price:'300 руб. за участника'}
  });

  add({...common,
    id:'handmade-candle-workshop',slug:'handmade-candle-workshop',title:'Свеча своими руками',subcategory:'Мастерские',date:null,
    deck:'Музейная мастерская о старых способах освещения и изготовлении собственной восковой свечи.',
    content:[
      {type:'paragraph',text:'Мастерская рассказывала о жизни до электричества, свете лучины и свечи и использовании пчелиного воска.'},
      {type:'paragraph',text:'Практическая часть предлагала познакомиться со способами изготовления восковых свечей и создать собственную свечу.'},
      {type:'paragraph',text:'Исторические параметры продолжительности, размера группы и цены не считаются текущим предложением музея.'}
    ],
    archivalProgrammeParameters:{duration:'около 1,5 часа',season:'круглый год',group:'10–20 человек',price:'400 руб. за участника'}
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'country-where-rivers-born','colors-of-red-forest-program','visiting-the-museum-program','meet-the-plants-program','handmade-candle-workshop'])];
  }
})();


/* batch 23 */
// Verified legacy migration batch 23: archive-index correction from direct p0008.htm HTML verification.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  add({
    id:'gnome-treasures-exhibition-spb-2014',slug:'gnome-treasures-exhibition-spb-2014',
    title:'Выставка «Виштынецкие сокровища гномов» в Санкт-Петербурге',
    category:'Музей',subcategory:'Выставки',legacyUrl:archive,date:'19 февраля 2014',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись Виштынецкого экомузея об открытии в Санкт-Петербурге выставки «Виштынецкие сокровища гномов».',
    content:[{type:'paragraph',text:'Прямо прочитанный HTML архивной страницы p0008.htm фиксирует открытие в Санкт-Петербурге выставки «Виштынецкие сокровища гномов» 19 февраля 2014 года. Более подробное содержание в текущем проходе не восстановлено, поэтому запись не расширяется догадками.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['gnome-treasures-project']
  });

  add({
    id:'donelaitis-300-krasnolesye-2014',slug:'donelaitis-300-krasnolesye-2014',
    title:'300-летие Кристионаса Донелайтиса в Краснолесье',
    category:'Культура',subcategory:'Литература и наследие',legacyUrl:archive,date:'1 января 2014',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись о праздновании 300-летнего юбилея Кристионаса Донелайтиса в Краснолесье.',
    content:[{type:'paragraph',text:'Архив событий музея фиксирует празднование 300-летнего юбилея Кристионаса Донелайтиса в посёлке Краснолесье 1 января 2014 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['donelaitis']
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum) museum.articleIds=[...new Set([...(museum.articleIds||[]),'gnome-treasures-exhibition-spb-2014','donelaitis-300-krasnolesye-2014'])];
})();


/* batch 24 */
// Verified legacy migration batch 24: source-preserving migration of key 2015-2021 projects.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const byId=id=>articles.find(a=>a.id===id);
  const add=article=>{
    const existing=byId(article.id);
    if(existing) Object.assign(existing,article);
    else articles.push(article);
  };

  add({
    id:'kamennye-istorii',
    slug:'kamennye-istorii',
    title:'Каменные истории',
    category:'Музей',subcategory:'Экспозиции',
    legacyUrl:'https://wystynez.ru/p0088.htm',
    date:'27 сентября 2015',archival:true,author:null,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Экспозиция под открытым небом о геологическом наследии Виштынецкой возвышенности и культурных традициях использования камня.',
    content:[
      {type:'paragraph',text:'Проект «Каменные истории» стал победителем конкурса проектов социально ориентированных общественных организаций для предоставления субсидии из регионального бюджета Калининградской области в 2015 году.'},
      {type:'paragraph',text:'26 сентября 2015 года в Краснолесье состоялось открытие новой музейной экспозиции под открытым небом «Каменные истории». Она создана на территории Виштынецкого эколого-исторического музея.'},
      {type:'paragraph',text:'Экспозиция посвящена геологическому наследию Виштынецкой возвышенности и культурным традициям использования камня. В ней представлены большие валуны различных горных пород, участок мощения камнем, межевой камень и старый квартальный столб.'},
      {type:'paragraph',text:'Информационные стенды рассказывают о происхождении камней, их переносе ледником, формировании рельефа Виштынецкой возвышенности и разнообразии использования камня человеком. Посетители также могут самостоятельно определить поднятый с земли камень и узнать его название.'},
      {type:'paragraph',text:'Проект продолжил серию инициатив музея, направленных на популяризацию природного и историко-культурного наследия Роминтской пущи.'}
    ],
    migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page',
    sourceNotes:['Legacy page says the exposition opened 26 September 2015.','Current availability must be verified separately before publishing visitor rules or opening status.']
  });

  add({
    id:'unknown-vishtynets',
    slug:'unknown-vishtynets',
    title:'Неизвестный Виштынец, или по дороге к чуду',
    category:'Природа',subcategory:'Проекты музея',
    legacyUrl:'https://wystynez.ru/p0106.htm',
    date:'2018–2019',archival:true,author:null,hero:null,images:[],relatedPoiIds:['poi_museum','poi_vishtynets_lake'],
    deck:'Проект музея, посвящённый сохранению озера Виштынецкого и созданию просветительского комплекса по пути к нему.',
    content:[
      {type:'paragraph',text:'Проект «Неизвестный Виштынец или по дороге к чуду» был поддержан Фондом президентских грантов в 2018 году и реализовывался с 1 июня 2018 года по 30 июня 2019 года.'},
      {type:'paragraph',text:'Цель проекта — содействие сохранению памятника природы «Озеро Виштынецкое» через внимание к его природной уникальности, экологическим проблемам и историко-культурному значению.'},
      {type:'paragraph',text:'В рамках проекта планировалось создание музейной экспозиции об озере, включая макет рельефа дна, подводные фотографии и интерактивные объекты; обустройство смотровой площадки в окрестностях Краснолесья; выпуск почтовых открыток; создание передвижной фотовыставки и проведение итогового открытия комплекса.'},
      {type:'paragraph',text:'16 июня 2019 года состоялось торжественное мероприятие с открытием экспозиции об озере Виштынецком, смотровой площадки и фотовыставки «Неизвестный Виштынец».'},
      {type:'heading',text:'Команда проекта'},
      {type:'paragraph',text:'Алексей Соколов — руководитель проекта; Эдуард Барсуков — соруководитель; Александр Самсонкин — консультант по экологическому просвещению; Юлия Алексеева — фотограф и дизайнер; Мария Омельяненко — бухгалтер.'},
      {type:'paragraph',text:'Общий бюджет проекта — 1 187 808 рублей; грант Фонда президентских грантов — 1 045 808 рублей. Эти суммы относятся к историческому проекту и не являются текущими финансовыми данными музея.'}
    ],
    migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page',
    sourceNotes:['Primary source p0106.htm verified.','Related detailed event pages p0108.htm and p0109.htm should be migrated separately.']
  });

  add({
    id:'v-gosti-k-kamnyu',
    slug:'v-gosti-k-kamnyu',
    title:'В гости к камню',
    category:'Природа',subcategory:'Проекты музея',
    legacyUrl:'https://wystynez.ru/p0117.htm',
    date:'2020–2021',archival:true,author:null,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Грантовый проект музея о валунах Виштынецкой возвышенности, минералах, экспозиции «Анатомия камня» и интерактивной карте.',
    content:[
      {type:'paragraph',text:'Проект «В гости к камню» поддержан Фондом президентских грантов в 2020 году и реализовывался с 1 сентября 2020 года по 31 мая 2021 года.'},
      {type:'paragraph',text:'Проект был направлен на изучение и популяризацию валунов Виштынецкой возвышенности как природных объектов научного, просветительского и туристического значения.'},
      {type:'paragraph',text:'В план проекта входило создание интерактивной карты валунов с GPS-координатами, фотографиями и описаниями; создание музейной экспозиции о минералогическом составе валунов; издание брошюры о валунах и основных горных породах; презентация результатов проекта.'},
      {type:'paragraph',text:'В проекте участвовали Алексей Соколов, Эдуард Барсуков, Татьяна Колесник, Роза Ткаченко и Надежда Чесна. Общий бюджет составлял 1 250 019 рублей, из них грант — 1 025 019 рублей и софинансирование — 225 000 рублей. Финансовые данные являются историческими.'},
      {type:'paragraph',text:'В результате проекта появились экспозиция «Анатомия камня», брошюра о валунах и интерактивная карта каменных объектов.'}
    ],
    migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page',
    sourceNotes:['Primary source p0117.htm verified.','Project media and exact brochure/map URLs require separate asset migration.','Photo credit on source: А. Соколов.']
  });

  add({
    id:'anatomy-stone',
    slug:'anatomy-stone',
    title:'Анатомия камня',
    category:'Музей',subcategory:'Экспозиции',
    legacyUrl:'https://wystynez.ru/p0122.htm',
    date:'22 мая 2021',archival:true,author:null,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Экспозиция о минералогическом составе горных пород валунов Виштынецкой возвышенности, созданная по итогам проекта «В гости к камню».',
    content:[
      {type:'paragraph',text:'22 мая 2021 года в Краснолесье состоялось открытие экспозиции «Анатомия камня» — одного из результатов проекта Виштынецкого экомузея «В гости к камню».'},
      {type:'paragraph',text:'Экспозиция знакомит посетителей с минералогическим составом горных пород валунов Виштынецкой возвышенности. Проект также дал брошюру о валунах и интерактивную карту каменных объектов.'},
      {type:'paragraph',text:'В создании карты участвовали ученики «Школы будущего» из Большого Исаково и местные жители, участвовавшие в экспедициях по поиску и описанию валунов.'},
      {type:'paragraph',text:'На открытии были отмечены участники конкурса «Легенда о камне», а также состоялась поездка к одному из малоизвестных валунов и к месту утраченного каменного памятника природы.'},
      {type:'paragraph',text:'Фото: В. Лукошевичус, А. Володина, А. Соколов.'}
    ],
    migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page',
    sourceNotes:['Primary source p0122.htm verified.','The source contains a brochure download and interactive map link; exact targets still require asset/link capture.']
  });

  add({
    id:'legend-of-stone-contest',
    slug:'legend-of-stone-contest',
    title:'Конкурс «Легенда о камне»',
    category:'Культура',subcategory:'Образовательные проекты',
    legacyUrl:'https://wystynez.ru/p0120.htm',
    date:'20 апреля 2021',archival:true,author:null,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Творческий конкурс школьников в рамках проекта «В гости к камню».',
    content:[
      {type:'paragraph',text:'20 апреля 2021 года были подведены итоги конкурса «Легенда о камне», организованного в рамках проекта «В гости к камню».'},
      {type:'paragraph',text:'В конкурсе участвовали школьники Краснолесья и ученики «Школы будущего» из Большого Исаково.'},
      {type:'paragraph',text:'Среди отмеченных работ: Артём Мальцев — «Великан и речка»; Валерия Коншу — «Легенда о гигантском камне силы»; Алина Иванова — сказка «Камушек» и стих «Камень»; Ирина Сушева — «Легенда о валуне южнее озера Мариново»; Елизавета Пилипенко — «Камень, исполняющий желания»; Эдуард Новосёлов — «Оттепель от ледникового периода»; Эмилия Корнакова — «Древний валун ледникового периода»; Карина Собина — «Священный Валун-источник жизни»; Андрей Захаренко — «Легенда о камне».'}
    ],
    migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page'
  });

  const museum=points.find(p=>p.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'kamennye-istorii','unknown-vishtynets','v-gosti-k-kamnyu','anatomy-stone','legend-of-stone-contest'])];
  }
  const lake=points.find(p=>p.id==='poi_vishtynets_lake');
  if(lake) lake.articleIds=[...new Set([...(lake.articleIds||[]),'unknown-vishtynets'])];
})();


/* batch 25 */
// Verified legacy migration batch 25: detailed pages for project «Неизвестный Виштынец» (p0108/p0109) + early exposition/programme sources.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const add=article=>{const i=articles.findIndex(a=>a.id===article.id);if(i>=0)Object.assign(articles[i],article);else articles.push(article)};

  add({id:'unknown-vishtynets-meeting-2018',slug:'unknown-vishtynets-meeting-2018',title:'Встреча по проекту «Неизвестный Виштынец»',category:'Природа',subcategory:'Проекты музея',legacyUrl:'https://wystynez.ru/p0108.htm',date:'26 сентября 2018',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],deck:'Организационная встреча по проекту и обсуждение будущей смотровой площадки в Краснолесье.',content:[{type:'paragraph',text:'26 сентября 2018 года в Виштынецком экомузее состоялась организационная встреча по проекту «Неизвестный Виштынец или по дороге к чуду», поддержанному Фондом президентских грантов.'},{type:'paragraph',text:'Участники обсудили создание информационно-просветительского комплекса на пути к Виштынецкому озеру, включая смотровую площадку над долиной истоков реки Синей, знакомство посетителей с ландшафтом Виштынецкой возвышенности, происхождением озера и правилами поведения в природе.'},{type:'paragraph',text:'Встречу поддержали представители региональных органов власти, природного парка «Виштынецкий», Экоцентра «Роминта», экологического центра ЕКАТ-Калининград, администрации Нестеровского округа и польского ландшафтного парка Пущи Роминской. В источнике перечислены участники и партнёры проекта; эти имена сохранены как историческая metadata.'},{type:'paragraph',text:'Место будущей площадки находилось на окраине Краснолесья над долиной истоков Синей; перепад высот в описанном ландшафте достигал более 50 метров.'}],migrationStatus:'verified_legacy_detail',sourceScope:'dedicated_primary_page',photoCredits:['Юлия Алексеева','Александр Самсонкин']});

  add({id:'unknown-vishtynets-opening-2019',slug:'unknown-vishtynets-opening-2019',title:'Торжественное открытие проекта «Неизвестный Виштынец»',category:'Природа',subcategory:'Проекты музея',legacyUrl:'https://wystynez.ru/p0109.htm',date:'16 июня 2019',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],deck:'Открытие экспозиции об озере Виштынецком, смотровой площадки и фотовыставки «Неизвестный Виштынец».',content:[{type:'paragraph',text:'16 июня 2019 года в Краснолесье состоялось заключительное мероприятие проекта «Неизвестный Виштынец или по дороге к чуду». Центральным экспонатом новой музейной экспозиции стал макет озера Виштынецкого.'},{type:'paragraph',text:'Смотровая площадка «Виштынецкая возвышенность» была создана при въезде в Краснолесье со стороны Гусева и открывала вид на долину истоков реки Синей. Её форма была задумана как нос лодки, выступающий из склона холма.'},{type:'paragraph',text:'В музее открылись экспозиция об озере и фотовыставка «Неизвестный Виштынец» фотографа Юлии Алексеевой. Также были представлены новые почтовые открытки об озере Виштынецком и музейная почта.'},{type:'heading',text:'Программа открытия'}, {type:'paragraph',text:'12:00 — открытие смотровой площадки; 13:00 — открытие музейной экспозиции и экскурсия; 13:30 — открытие фотовыставки и представление открыток; 14:00 — отправка открыток в музейной почте; 14:30 — самостоятельное путешествие к озеру.'},{type:'paragraph',text:'Партнёрами проекта выступали Министерство природных ресурсов и экологии Калининградской области, Отдел культуры Нестеровского района, Экоцентр «Роминта» и экологический центр ЕКАТ-Калининград.'}],migrationStatus:'verified_legacy_detail',sourceScope:'dedicated_primary_page',photoCredits:['Юлия Алексеева']});

  add({id:'travelling-exposition-opening-2004',slug:'travelling-exposition-opening-2004',title:'Открытие передвижной экспозиции Виштынецкого экомузея',category:'Музей',subcategory:'История музея',legacyUrl:'https://wystynez.ru/p31.htm',date:'22 мая 2004',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],deck:'Историческая запись об открытии передвижной музейной экспозиции в Чистых Прудах.',content:[{type:'paragraph',text:'22 мая 2004 года в мемориальном музее Кристиониса Донелайтиса в посёлке Чистые Пруды открылась передвижная экспозиция Виштынецкого эколого-исторического музея, посвящённая истории, природе и уникальности Виштынецкой возвышенности.'},{type:'paragraph',text:'Экспозиция включала 160 исторических и природных экспонатов: окаменелости, минералы и горные породы, предметы труда и бытовую утварь XIX века. Её дополняли около ста художественных фотографий калининградских и немецких авторов.'},{type:'paragraph',text:'Эта запись важна для истории формирования постоянной экспозиции: музейная выставка много лет путешествовала по Калининградской области, прежде чем получила постоянное место в Краснолесье.'}],migrationStatus:'verified_legacy_detail',sourceScope:'dedicated_primary_page'});

  add({id:'gnome-treasures-project',slug:'gnome-treasures-project',title:'Виштынецкие сокровища гномов',category:'Культура',subcategory:'Образовательные программы',legacyUrl:'https://wystynez.ru/p84.htm',date:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],deck:'Музейная образовательная программа для детей и семейных групп, превращающая обычные камни в предметы исследования и истории.',content:[{type:'paragraph',text:'Проект направлен на создание особой музейной образовательной программы для детей и семейных групп. Участники погружаются в сказочный мир подземных жителей — гномов — и через задания и наблюдения исследуют обычные камни как природные сокровища.'},{type:'paragraph',text:'В рамках программы камни, найденные участниками, получают историю и имя и становятся частью музейного опыта. Программа связана с природным и геологическим наследием Виштынецкой возвышенности.'}],migrationStatus:'verified_legacy_summary',sourceScope:'dedicated_primary_page'});

  const museum=points.find(p=>p.id==='poi_museum');
  if(museum) museum.articleIds=[...new Set([...(museum.articleIds||[]),'unknown-vishtynets-meeting-2018','unknown-vishtynets-opening-2019','travelling-exposition-opening-2004','gnome-treasures-project'])];
})();


/* batch 26 */
// Verified legacy migration batch 26: structured archive events 2018-2024 from p0008.htm.
(function(){
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
const base={category:'Культура',subcategory:'Архив событий',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],migrationStatus:'verified_archive_entry',sourceScope:'archive_page',legacyUrl:'https://wystynez.ru/p0008.htm'};
[
['railways-rominten-2024','Выставка «Железные дороги Роминтской пущи»','с 1 мая 2024','Выставка о железнодорожном наследии Роминтской пущи. Запись перенесена из архива событий; подробное содержание и медиа требуют отдельной проверки.'],
['neighbors-2023','Праздник «Соседи» — 2023','5 августа 2023','Очередной международный праздник «Соседи» в Краснолесье. Подробная программа и медиа требуют отдельного переноса.'],
['khvaley-2023','Персональная выставка художественных работ Виталия Хвалея','8 мая 2023 — 30 апреля 2024','Персональная художественная выставка Виталия Хвалея. Архивная запись.'],
['rominta-cosmos-2022','Фотовыставка «РОМИНТА, часть первая КОСМОС» Юлии Алексеевой','с 6 августа 2022','Фотовыставка Юлии Алексеевой о Роминте. Архивная запись.'],
['arkheq-2021','Фотовыставка «Ковчег» Юрия Бутеруса и Юлии Алексеевой','10 июля 2021 — 10 января 2022','Фотовыставка двух авторов. Архивная запись.'],
['macroworld-2021','Выставка Дмитрия Домнина «Макромир Красного леса»','6 апреля — 9 июля 2021','Выставка художественных работ Дмитрия Домнина. Архивная запись.'],
['river-cradle-2020','Акция «Речная колыбель»','21 августа 2020','Экологическая акция музея. Подробности и медиа требуют отдельной миграции.'],
['maxim-memory-2020','Проект «Памяти разведгруппы “Максим”», открытие памятного камня','17 июля 2020','Историко-памятное мероприятие, связанное с разведгруппой «Максим». Архивная запись.'],
['nepal-2020','Выставка Эдуарда Карлецкого «Путешествие в Непал»','4 февраля 2020 — 4 апреля 2021','Персональная выставка Эдуарда Карлецкого. Архивная запись.'],
['colors-summer-2019','Выставка живописи Натальи Урвачёвой «Краски лета»','с 15 октября 2019','Выставка живописи Натальи Урвачёвой. Архивная запись.'],
['breath-herbs-2019','Выставка «Дыхание трав» — флористические сюжеты Ирины Губаревой','с 13 октября 2019','Флористическая выставка Ирины Губаревой. Архивная запись.'],
['dances-red-forest-2019','Концерт «Танцы возле Красного леса»','24 августа 2019','Музыкальное мероприятие музея. Архивная запись.'],
['neighbors-2019','Международный праздник «Соседи»','10 августа 2019','Международный культурный праздник в Краснолесье. Архивная запись.'],
['rominten-forest-2019','Выставка живописи Людмилы Тамбовцевой «Роминтская пуща»','6 апреля — 15 июня 2019','Выставка живописи Людмилы Тамбовцевой. Архивная запись.'],
['neighbors-2018','Международный праздник «Соседи»','25 августа 2018','Международный праздник в Краснолесье. Архивная запись.'],
['rominta-music-forest-2018','Фотовыставка Юлии Алексеевой «Роминта. Музыка леса»','25 августа 2018 — 31 марта 2019','Фотовыставка Юлии Алексеевой. Архивная запись.'],
['magic-flowers-2018','Выставка живописи Людмилы Тамбовцевой «Магия цветов»','22 июля — 24 августа 2018','Выставка живописи Людмилы Тамбовцевой. Архивная запись.'],
['kupala-motives-2018','Концерт «Купальские мотивы»','7 июля 2018','Концертная программа музея. Архивная запись.'],
['irena-piltite-2018','Выставка гобеленов Ирены Пилтите «Вчера, сегодня и всегда»','9 июня — 20 июля 2018','Выставка гобеленов художницы Ирены Пилтите (Литва). Архивная запись.'],
['donelaitis-voice-2018','Литературные чтения «Голос Донелайтиса»','1 января 2018','Литературное мероприятие, посвящённое Кристионасу Донелайтису. Архивная запись.']
].forEach(([id,title,date,deck])=>add({...base,id,slug:id,title,date,deck,content:[{type:'paragraph',text:deck}],sourceNotes:['Primary archive source: https://wystynez.ru/p0008.htm','This batch preserves the archive entry; dedicated detail page, images and exact event metadata should be captured separately when available.']}));
const museum=points.find(p=>p.id==='poi_museum');
if(museum)museum.articleIds=[...new Set([...(museum.articleIds||[]),...articles.filter(a=>a.migrationStatus==='verified_archive_entry').map(a=>a.id)])];
})();


/* batch 27 */
// Verified legacy migration batch 27: structured archive events 2017-2014 from p0008.htm.
(function(){
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
const base={category:'Культура',subcategory:'Архив событий',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],migrationStatus:'verified_archive_entry',sourceScope:'archive_page',legacyUrl:'https://wystynez.ru/p0008.htm'};
[
['film-regional-festival-2017','Фильм музея стал победителем регионального фестиваля документальных фильмов','1 июля 2017','Архивная запись о победе фильма музея на региональном фестивале документальных фильмов.'],
['forest-village-neighbors-2017','Праздник «Лесная деревня. Соседи»','5 августа 2017','Праздник «Лесная деревня. Соседи» в Краснолесье.'],
['legends-concert-2017','Концерт «Легенды»','1 июля 2017','Концертная программа музея.'],
['place-experience-2017','Музей стал победителем конкурса «Опыт места»','2017','Победа музея в конкурсе «Опыт места» Благотворительного фонда Елены и Геннадия Тимченко.'],
['near-forest-kaliningrad-2017','Выставка «Рядом с лесом»','5–17 февраля 2017','Выставка в Калининграде.'],
['breath-herbs-2017','Выставка «Дыхание трав»','2 января – 25 февраля 2017','Флористические сюжеты Ирины Губаревой.'],
['forest-and-people-2016','Выставка «Лес и люди»','6 августа 2016 – 14 июля 2017','Архивная выставка музея.'],
['neighbors-2016','Международный культурно-фольклорный фестиваль «Соседи»','6 августа 2016','Международный культурно-фольклорный фестиваль в Краснолесье.'],
['stone-runes-whisper-tree-2016','Выставка «Каменные руны и шепот дерева»','2 июля – 5 августа 2016','Архивная художественно-природная выставка.'],
['forest-village-project-2016','Проект музея «Лесная деревня» — победитель конкурса «Меняющийся музей в меняющемся мире»','май 2016','Проект музея, ставший победителем конкурса «Меняющийся музей в меняющемся мире».'],
['stone-stories-open-air-2015','Открытие экспозиции под открытым небом «Каменные истории»','26 сентября 2015','Открытие музейной экспозиции под открытым небом.'],
['neighbors-2015','Международный культурно-фольклорный фестиваль «Соседи»','8 августа 2015','Международный культурно-фольклорный фестиваль в Краснолесье.'],
['symphony-feldman-2015','Концерт Государственного симфонического оркестра под руководством А. Фельдмана','6 июня 2015','Концерт Государственного симфонического оркестра в саду Виштынецкого экомузея.'],
['nature-kaliningrad-book-2014','Издана книга «Природа Калининградской области. Ключевые природные комплексы»','28 ноября 2014','Издание вышло при участии КРОУ «Виштынецкий экомузей».'],
['museum-post-2014','Проект «Музейная почта»','24 октября 2014','Архивная запись о музейном проекте «Музейная почта».'],
['rominta-holiday-2014','Фестиваль «Праздник Роминты»','16 августа 2014','Фестиваль в Роминтской пуще.'],
['heritage-seminar-2014','Семинар «Историко-культурное наследие Роминтской пущи»','28 марта 2014','Семинар по историко-культурному наследию Роминтской пущи.'],
['gnome-treasures-spb-2014','Выставка «Виштынецкие сокровища гномов» в Санкт-Петербурге','19 февраля 2014','Передвижная выставка музейной образовательной программы в Санкт-Петербурге.'],
['donelaitis-300-2014','Празднование 300-летнего юбилея К. Донелайтиса в Краснолесье','1 января 2014','Мероприятие к 300-летию Кристионаса Донелайтиса в посёлке Краснолесье.']
].forEach(([id,title,date,deck])=>add({...base,id,slug:id,title,date,deck,content:[{type:'paragraph',text:deck}],sourceNotes:['Primary archive source: https://wystynez.ru/p0008.htm','Archive entry preserved; dedicated detail pages, images and exact metadata require separate capture.']}));
const museum=points.find(p=>p.id==='poi_museum');
if(museum)museum.articleIds=[...new Set([...(museum.articleIds||[]),...articles.filter(a=>a.migrationStatus==='verified_archive_entry').map(a=>a.id)])];
})();


/* batch 28 */
// Verified legacy migration batch 28: archive events 2013-2002 from p0008.htm.
(function(){
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
const base={category:'Культура',subcategory:'Архив событий',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],migrationStatus:'verified_archive_entry',sourceScope:'archive_page',legacyUrl:'https://wystynez.ru/p0008.htm'};
[
['donelaitis-journey-2013','Путешествие к К. Донелайтису к 300-летию поэта','декабрь 2013'],
['tourism-award-2013','Музей стал дипломантом конкурса туристической индустрии Калининградской области','декабрь 2013'],
['museum-guide-2013-festival','Участие в фестивале «Музейный гид» с выставкой «Виштынецкие сокровища гномов»','31 мая — 4 июня 2013'],
['museum-guide-2013-book','Издан сборник «Музейный гид»-2013 с брошюрой о музее','май 2013'],
['rominten-expedition-2011','Детская исследовательская экспедиция в Роминтской пуще','8–14 июля 2011'],
['museum-night-2011','Музейная ночь в Краснолесье «Тени старого леса»','14–15 мая 2011'],
['volunteers-bitsevsky-2011','Лагерь волонтёров из природно-исторического парка «Битцевский лес»','1–10 мая 2011'],
['museum-center-opening-2011','Торжественное открытие музейно-информационного центра в Краснолесье','29 апреля 2011'],
['eco-trails-competition-2011','Конкурс экологических и эколого-краеведческих троп в Роминтской пуще','22 апреля 2011'],
['museum-night-2010','Музейная ночь в Краснолесье','15–16 мая 2010'],
['stars-krasnolesye-2010','Образовательный проект «Звёзды над Краснолесьем»','январь 2010'],
['children-camp-2009','Детский познавательный лагерь «Путешествие в Краснолесье»','октябрь 2009'],
['waste-seminar-2009','Семинар «Минимализация негативного влияния отходов на окружающую среду, польский опыт»','июнь 2009'],
['pushkareva-2009','Выставка анималистической графики Татьяны Пушкарёвой','март — апрель 2009'],
['lomonosov-readings-2007','Участие в пятых юношеских Ломоносовских чтениях воспитанницы Виштынецкого экомузея','август 2007'],
['volunteer-camp-2007','Международный лагерь волонтёров','август 2007'],
['children-school-forest-2006','Выставка «Дети, школа, лес» о детях и школе в посёлке Краснолесье','с 31 августа 2006'],
['rominten-german-russian-2006','Выставка «Привет из Роминтен — Gruss aus Rominten» в Калининградском Немецко-Русском доме','15 августа — 4 сентября 2006'],
['children-contest-2006','Конкурс детских творческих работ «Мой мир — моя земля»','февраль — сентябрь 2006'],
['museum-ocean-2006','Экспозиция Виштынецкого экомузея в Калининграде в Музее Мирового океана','22 марта — 24 апреля 2006'],
['museums-russia-domain-2006','Портал «Музеи России» предоставил музею домен в рамках своего девятилетия','2006'],
['wilhelm-luise-2005','Выставка «Перекрёсток памяти — Вильгельм и Луиза»','с 24 сентября 2005'],
['chistye-prudy-2005','Экспозиция Виштынецкого экомузея в посёлке Чистые Пруды','июнь — ноябрь 2005'],
['kaliningrad-kgtu-2005','Экспозиция Виштынецкого экомузея в Калининграде, музей КГТУ','март — май 2005'],
['vishnyovka-expedition-2004','Научная экспедиция по Виштынецкой возвышенности','август 2004'],
['photo-plener-2004','Фотоплэнер в Красном лесу','июль 2004'],
['donelaitis-exposition-2004','Открытие экспозиции Виштынецкого общественного эколого-исторического музея в мемориальном музее Кристионаса Донелайтиса','май 2004'],
['old-settlers-2004','Встреча старожилов (первых переселенцев) в посёлке Чистые Пруды','февраль 2004'],
['celau-lost-world-2002','Фотовыставка «Целау — затерянный мир»','октябрь 2002 — июнь 2005'],
['children-camp-2003','Детский летний лагерь','август 2003'],
['science-expedition-2003','Научная экспедиция','июль 2003'],
['living-shield-2003','Акция «Живой щит»','июль 2003'],
['ngo-social-projects-2003','Участие в выставке социальных услуг и проектов некоммерческих организаций НКО','май 2003'],
['old-settlers-kalinino-2003','Встреча старожилов посёлка Калинино','февраль 2003'],
['rominten-between-past-future-2002','Фотовыставка «РОМИНТЕНСКАЯ ПУЩА — МЕЖДУ ПРОШЛЫМ И БУДУЩИМ»','февраль 2002 — январь 2004']
].forEach(([id,title,date])=>add({...base,id,slug:id,title,date,deck:`Архивная запись события Виштынецкого экомузея. Дата: ${date}.`,content:[{type:'paragraph',text:'Запись перенесена из архива событий старого сайта. Подробная страница, изображения, документы и дополнительные метаданные требуют отдельной проверки и переноса.'}],sourceNotes:['Primary archive source: https://wystynez.ru/p0008.htm','Archive entry preserved without inventing missing details.']}));
const museum=points.find(p=>p.id==='poi_museum');
if(museum)museum.articleIds=[...new Set([...(museum.articleIds||[]),...articles.filter(a=>a.migrationStatus==='verified_archive_entry').map(a=>a.id)])];
})();


/* batch 29 */
(()=>{
'use strict';
// Batch 29: detailed early museum-history records; archive-only, source-preserving.
const batch=29;
const records=[
 {year:2004,title:'Открытие постоянной экспозиции Виштынецкого экомузея',source:'p31.htm',status:'archive',note:'Детальная историческая запись; не является актуальной информацией о текущем режиме работы.'},
 {year:2003,title:'Экспедиции и первые музейные исследования Роминтской пущи',source:'p0008.htm',status:'archive'},
 {year:2002,title:'Роминтская пуща — между прошлым и будущим',source:'p0008.htm',status:'archive',note:'Первая выставочная история музея.'}
];
window.MuseumLegacyBatch29=records;
window.MuseumLegacyBatches=window.MuseumLegacyBatches||{};
window.MuseumLegacyBatches[batch]=records;
})();


/* batch 30 */
(()=>{
'use strict';
// Batch 30: source-preserving detailed legacy exhibition history.
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'legacy-exhibition-opening-2004',slug:'legacy-exhibition-opening-2004',title:'Передвижная экспозиция Виштынецкого экомузея — открытие 22 мая 2004 года',date:'22 мая 2004',category:'История',subcategory:'История музея',archival:true,migrationStatus:'verified_primary_source',legacyUrl:'https://wystynez.ru/p31.htm',deck:'История первой большой экспозиции музея, посвящённой природе, истории и культуре Виштынецкой возвышенности.',content:[
{type:'paragraph',text:'22 мая 2004 года в мемориальном музее Кристийонаса Донелайтиса в посёлке Чистые Пруды состоялось открытие передвижной экспозиции Виштынецкого эколого-исторического музея.'},
{type:'paragraph',text:'Экспозиция рассказывала о ледниковом происхождении Виштынецкой возвышенности, лесах, реках и озёрах, первых людях этой земли, истории, труде, культуре, королевской охоте и природном наследии Роминтской пущи.'},
{type:'paragraph',text:'Посетителям были представлены 160 исторических и природных экспонатов: окаменелости, минералы и горные породы Виштынецкой возвышенности, предметы труда и бытовая утварь XIX века. Экспозицию дополняли около ста художественных фотографий калининградских и немецких мастеров.'},
{type:'paragraph',text:'В создании экспозиции участвовали Калининградский областной историко-художественный музей, КРОО «Экоцентр „Роминта“», ландшафтный парк «Пуща Роминска» в Польше и КРМО «Экологическая группа „ГИД“». Проект поддержал Датско-российский Фонд местного развития Нестеровского района.'},
{type:'paragraph',text:'Фото: В. Гусев, Э. Барсуков.'}
],sourceNotes:['Primary source: https://wystynez.ru/p31.htm','Archive-only historical material; not a statement of the current exhibition contents.']});
})();


/* batch 31 */
(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'legacy-exhibition-history-p40',slug:'legacy-exhibition-history-p40',category:'История',subcategory:'Экспозиция',archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],migrationStatus:'verified_legacy_detail',legacyUrl:'https://wystynez.ru/p40.htm',title:'История экспозиции Виштынецкого эколого-исторического музея',date:'2002–2015',deck:'Как передвижная фотовыставка выросла в постоянную экспозицию музея в Краснолесье.',content:[
{type:'paragraph',text:'Экспозиция музея рассказывает об истории Роминтской пущи, Виштынецкой возвышенности и Виштынецкого озера: о ледниковом происхождении рельефа, природном разнообразии, первых людях, культуре и сложной истории этой территории.'},
{type:'paragraph',text:'История экспозиции началась с фотовыставки «Роминтская пуща: между прошлым и будущим», открывшейся 14 февраля 2002 года в отделе природы Калининградского областного историко-художественного музея. 3 августа 2002 года выставка была представлена в музее Кристионаса Донелайтиса в посёлке Чистые Пруды, а в начале 2004 года — в Нестерове.'},
{type:'paragraph',text:'22 мая 2004 года обновлённая выставка, дополненная экспонатами, стала полноценной экспозицией в музее Кристионаса Донелайтиса. В последующие годы экспозиция продолжала путешествовать: в 2005 году она работала в музее КГТУ, в 2006 году — в Музее Мирового океана в Калининграде.'},
{type:'paragraph',text:'29 апреля 2011 года в Краснолесье открылся музейно-информационный центр. В 2015 году на территории музея появилась открытая экспозиция «Каменные истории», посвящённая происхождению горных пород и их использованию в культуре.'},
{type:'paragraph',text:'Материал сохранён как историческая справка. Актуальные режим работы, цены и условия посещения должны храниться отдельно от legacy-архива.'}],sourceNotes:['Primary legacy source: https://wystynez.ru/p40.htm','Historical dates and locations preserved from the source page; no current price copied into the archive entry.']});
})();


/* batch 32 */
(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'unknown-vishtynets-event-2018',slug:'unknown-vishtynets-event-2018',title:'«Неизвестный Виштынец» — встреча и открытие проекта',category:'Природа',subcategory:'Проекты музея',archival:true,date:'26 сентября 2018',legacyUrl:'https://wystynez.ru/p0108.htm',relatedPoiIds:['poi_museum','poi_vishtynets_lake'],deck:'Историческое мероприятие проекта «Неизвестный Виштынец, или по дороге к чуду».',content:[{type:'paragraph',text:'26 сентября 2018 года в Виштынецком эколого-историческом музее состоялась встреча, посвящённая проекту «Неизвестный Виштынец, или по дороге к чуду».'},{type:'paragraph',text:'Проект был направлен на знакомство посетителей с природным, геологическим и историко-культурным значением озера Виштынецкого и Виштынецкой возвышенности.'}],migrationStatus:'verified_primary_source',sourceNotes:['Primary source: https://wystynez.ru/p0108.htm','Archive-only historical record.']});
add({id:'unknown-vishtynets-opening-2019',slug:'unknown-vishtynets-opening-2019',title:'Торжественное открытие комплекса «Неизвестный Виштынец»',category:'Природа',subcategory:'Проекты музея',archival:true,date:'16 июня 2019',legacyUrl:'https://wystynez.ru/p0109.htm',relatedPoiIds:['poi_museum','poi_vishtynets_lake'],deck:'Открытие экспозиции об озере Виштынецком, смотровой площадки и фотовыставки проекта.',content:[{type:'paragraph',text:'16 июня 2019 года состоялось заключительное мероприятие проекта «Неизвестный Виштынец, или по дороге к чуду».'},{type:'paragraph',text:'В программе было открытие смотровой площадки «Виштынецкая возвышенность» с видом на долину истоков реки Синяя, открытие музейной экспозиции об озере Виштынецком, экскурсия по экспозиции, фотовыставка «Неизвестный Виштынец» Юлии Алексеевой и представление почтовых открыток «Озеро Виштынецкое».'},{type:'paragraph',text:'Центральным экспонатом новой экспозиции стал макет озера Виштынецкого. Смотровая площадка была задумана в форме носа лодки, выступающего из склона холма.'}],migrationStatus:'verified_primary_source',sourceNotes:['Primary source: https://wystynez.ru/p0109.htm','Archive-only historical record.']});
})();


/* batch 33 */
(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({
 id:'neighbors-2023',slug:'neighbors-2023',title:'Праздник «Соседи» — 2023',category:'Культура',subcategory:'События музея',archival:true,date:'5 августа 2023',legacyUrl:'https://wystynez.ru/p0125.htm',relatedPoiIds:['poi_museum'],
 deck:'Историческая запись о ежегодном празднике «Соседи» в Краснолесье.',
 content:[
  {type:'paragraph',text:'5 августа 2023 года на территории Виштынецкого экомузея в Краснолесье прошёл праздник «Соседи».'},
  {type:'paragraph',text:'На празднике работали ремесленные и творческие мастерские и ярмарка местных продуктов. Гости могли участвовать в мастер-классах по работе с деревом, кожей, текстилем и природными материалами.'},
  {type:'paragraph',text:'Для гостей проводились путешествия к истокам реки Синей и рассказы об истории Виштынецкой возвышенности. В выставочном зале музея работала мастерская «Хранители времени».'},
  {type:'paragraph',text:'В конференц-зале проходили лекции о местных продуктах, инвазивных растениях и дарах леса. В рамках проекта «Вкусы Виштынецкой возвышенности» была представлена книга с рецептами местных блюд.'},
  {type:'paragraph',text:'Историческая запись сохраняется как архивный материал. Она не подтверждает проведение аналогичного мероприятия в текущем году.'},
  {type:'paragraph',text:'Фото: Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо.'}
 ],
 migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',
 sourceNotes:['Primary source: https://wystynez.ru/p0125.htm','Archive-only historical record.']
});
})();


/* batch 34 */
(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'stone-project-results-2021',slug:'stone-project-results-2021',title:'Презентация результатов проекта «В гости к камню»',category:'Природа',subcategory:'Проекты музея',archival:true,date:'22 мая 2021',legacyUrl:'https://wystynez.ru/p0122.htm',relatedPoiIds:['poi_museum'],deck:'Историческая запись об открытии экспозиции «Анатомия камня» и результатах проекта.',content:[{type:'paragraph',text:'22 мая 2021 года в Краснолесье состоялось представление результатов проекта Виштынецкого экомузея «В гости к камню», поддержанного Фондом президентских грантов.'},{type:'paragraph',text:'В музее была открыта экспозиция «Анатомия камня», знакомящая с минералогическим составом горных пород валунов Виштынецкой возвышенности.'},{type:'paragraph',text:'В рамках проекта подготовлена брошюра о валунах Виштынецкой возвышенности и создана интерактивная карта примечательных валунов. В проекте участвовали школьники, местные жители, специалисты и сотрудники природного парка.'},{type:'paragraph',text:'На презентации подвели итоги конкурса «Легенда о камне», представили результаты экспедиций и обсудили включение отдельных валунов в познавательные маршруты и возможность придания им статуса памятников природы.'},{type:'paragraph',text:'Материал сохраняется как историческая запись проекта и не является описанием текущей экспозиции или актуальной программы музея.'}],migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',sourceNotes:['Primary source: https://wystynez.ru/p0122.htm','Archive-only historical record.']});
add({id:'maxim-jack-memorial-2020',slug:'maxim-jack-memorial-2020',title:'Памятный комплекс разведгруппе «Максим» — «Джек»',category:'История',subcategory:'История Роминтской пущи',archival:true,date:'17 июля 2020',legacyUrl:'https://wystynez.ru/p0116.htm',relatedPoiIds:['poi_museum'],deck:'Историческая запись о создании памятного камня разведчикам в Роминтской пуще.',content:[{type:'paragraph',text:'17 июля 2020 года состоялось торжественное открытие памятного камня разведгруппе «Максим» — «Джек» на одном из основных маршрутов регионального природного парка «Виштынецкий».'},{type:'paragraph',text:'Проект был поддержан Правительством Калининградской области в результате конкурса проектов социально ориентированных некоммерческих организаций.'},{type:'paragraph',text:'В мероприятии участвовали представители региональных и муниципальных органов, ветераны военной разведки, природного парка, музея, духовенство и краеведы. Памятный камень и информационный стенд установлены при партнёрской поддержке.'},{type:'paragraph',text:'Материал является архивным описанием проекта и события 2020 года.'}],migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',sourceNotes:['Primary source: https://wystynez.ru/p0116.htm','Archive-only historical record.']});
})();


/* batch 35 */
(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'stone-visit-project',slug:'v-gosti-k-kamnyu-project',title:'Проект «В гости к камню»',category:'Камни',subcategory:'Архив проектов',archival:true,date:'2020–2021',legacyUrl:'https://wystynez.ru/p0117.htm',relatedPoiIds:['poi_museum'],deck:'Архивная страница проекта Виштынецкого экомузея о валунах Виштынецкой возвышенности.',content:[{type:'paragraph',text:'С сентября 2020 года Виштынецкий экомузей реализовывал проект «В гости к камню», посвящённый валунным камням Виштынецкой возвышенности как природным объектам, имеющим научное, просветительское и туристическое значение.'},{type:'paragraph',text:'В рамках проекта создавались музейная экспозиция о минералогическом составе валунов, брошюра о валунах и основных горных породах возвышенности и интерактивная карта валунов. В сборе материала участвовали школьники, учёные и местные жители.'},{type:'paragraph',text:'Проект реализовывался с 1 сентября 2020 года по 31 мая 2021 года. Руководитель проекта — Алексей Соколов; соруководитель — Эдуард Барсуков; научный консультант-геолог — Татьяна Колесник; художник-экспозиционер — Роза Ткаченко; бухгалтер — Надежда Чесна.'},{type:'paragraph',text:'Общий бюджет проекта составлял 1 250 019 рублей, включая грант Фонда президентских грантов 1 025 019 рублей и софинансирование 225 000 рублей.'}],migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',sourceNotes:['Primary source: https://wystynez.ru/p0117.htm','Archive-only historical record.']});
add({id:'unknown-vishtynets-project',slug:'neizvestny-vishtynets-project',title:'Проект «Неизвестный Виштынец»',category:'История',subcategory:'Архив проектов',archival:true,date:'2018–2019',legacyUrl:'https://wystynez.ru/p0106.htm',relatedPoiIds:['poi_museum'],deck:'Архивный проект об озере Виштынецком, ландшафте возвышенности и музейной почте.',content:[{type:'paragraph',text:'Проект предусматривал создание и обустройство смотровой площадки возле Краснолесья для знакомства с ландшафтом Виштынецкой возвышенности, историей формирования озера Виштынецкого и правилами поведения в природе.'},{type:'paragraph',text:'В проект входило издание почтовых открыток с видами озера и легендами о нём, отправляемых через музейную почту, создание передвижной фотовыставки об озере и открытие экспозиции о Виштынецком озере одновременно со смотровой площадкой и выставкой.'}],migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',sourceNotes:['Primary source: https://wystynez.ru/p0106.htm','Archive-only historical record.']});
})();


/* batch 36 */
(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'legend-stone-2021',slug:'legend-stone-2021',title:'Конкурс «Легенда о камне» — итоги',category:'Культура',subcategory:'События музея',archival:true,date:'20 апреля 2021',legacyUrl:'https://wystynez.ru/p0120.htm',relatedPoiIds:['poi_museum'],deck:'Архивный материал конкурса школьных творческих работ о валунах Виштынецкой возвышенности.',content:[{type:'paragraph',text:'20 апреля 2021 года были подведены итоги конкурса «Легенда о камне», организованного в рамках проекта «В гости к камню».'},{type:'paragraph',text:'В конкурсе приняли участие школьники Краснолесья и ученики «Школы будущего» из Большого Исаково. Всего участвовали 22 ученика; представлено 20 работ в форме легенд, рассказов и сказок в прозе и стихах.'},{type:'paragraph',text:'Проект был направлен на просвещение и привлечение внимания к валунным камням Виштынецкой возвышенности как природным объектам и объектам туристического показа.'},{type:'paragraph',text:'Материал сохраняется как архивная запись и не является действующим конкурсом.'}],migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',sourceNotes:['Primary source: https://wystynez.ru/p0120.htm','Archive-only historical record.']});
})();


/* batch 37 */
(()=>{
'use strict';
const records=[
 {year:2021,title:'Анатомия камня — экспозиция Виштынецкого экомузея',status:'archive',source:'wystynez.ru',note:'Детальный материал по проекту «В гости к камню». Содержимое сохраняется как историческое; актуальные условия посещения не выводятся из этой записи.'},
 {year:2021,title:'Интерактивная карта валунов Виштынецкой возвышенности',status:'archive',source:'wystynez.ru',note:'Исторический цифровой результат проекта «В гости к камню».'}
];
window.MuseumLegacyBatch37=records;
window.MuseumLegacyBatches=window.MuseumLegacyBatches||{};
window.MuseumLegacyBatches[37]=records;
})();

