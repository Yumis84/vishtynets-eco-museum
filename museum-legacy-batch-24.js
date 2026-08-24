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
