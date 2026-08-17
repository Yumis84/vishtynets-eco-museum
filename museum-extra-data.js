// Additional verified legacy content discovered during the read-only audit.
// Loaded after museum-data.js and before app.js.
(function(){
  'use strict';
  let iconStyles=document.querySelector('link[href*="icons-v3.css"]');
  if(iconStyles){
    iconStyles.href='icons-v3.css?v=3';
  }else{
    iconStyles=document.createElement('link');
    iconStyles.rel='stylesheet';
    iconStyles.href='icons-v3.css?v=3';
    document.head.appendChild(iconStyles);
  }
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];

  points.push(
    {
      id:'poi_vishtynets_lake',slug:'vishtynets-lake',name:'Озеро Виштынецкое',category:'Озёра',categories:['Природа','Озёра','Памятники природы'],
      lat:null,lng:null,address:'Виштынецкая возвышенность, российско-литовское приграничье',
      shortDescription:'Крупнейшее и глубочайшее озеро Калининградской области, памятник природы и одна из главных тем музейного архива.',
      articleIds:['vishtynets-lake'],photos:[],photoCredits:['А. Соколов'],sourceUrls:['https://www.wystynez.ru/p24.htm'],coordinateStatus:'unresolved',status:'catalog_only'
    },
    {
      id:'poi_devils_stone',slug:'devils-stone-rominta',name:'Чёртов камень',category:'Валуны',categories:['Культура','Природа','Валуны','Легенды'],
      lat:null,lng:null,address:'Роминтская пуща',
      shortDescription:'Могучий валун Роминтской пущи, связанный со старой легендой о строительстве кирхи в Тольмингкемене.',
      articleIds:['rominta-legends'],photos:[],photoCredits:[],sourceUrls:['https://www.wystynez.ru/p59.htm'],coordinateStatus:'unresolved',status:'catalog_only'
    },
    {
      id:'poi_gross_rominten_church',slug:'gross-rominten-church',name:'Кирха Гросс Роминтен',category:'Архитектура',categories:['История','Архитектура','Культура'],
      lat:null,lng:null,address:'пос. Краснолесье',
      shortDescription:'Историческая кирха Краснолесья (Gross Rominten / Hardteck), построенная в 1873–1880 годах.',
      articleIds:['red-forest-churches'],photos:[],photoCredits:[],sourceUrls:['https://www.wystynez.ru/p55.htm'],coordinateStatus:'unresolved',status:'catalog_only'
    }
  );

  articles.push(
    {
      id:'vishtynets-lake',slug:'vishtynets-lake',title:'Озеро Виштынецкое',category:'Природа',subcategory:'Озёра',legacyUrl:'https://www.wystynez.ru/p24.htm',date:'2014',author:null,
      deck:'Большая музейная статья о природе, происхождении, животном мире и культурном ландшафте Виштынецкого озера.',
      hero:null,images:[],relatedPoiIds:['poi_vishtynets_lake'],archival:true,
      content:[
        {type:'paragraph',text:'Музейная статья представляет Виштынецкое озеро как один из главных природных объектов Виштынецкой возвышенности: большое ледниковое озеро, связанное с системой рек и родников региона.'},
        {type:'paragraph',text:'В материале рассказывается о размерах и глубине озера, рыбах и беспозвоночных, окружающих лесах, родниках и других озёрах возвышенности.'},
        {type:'paragraph',text:'Отдельная часть страницы посвящена природоохранному статусу, старым правилам посещения и связанным местам — Ягодному, реке Писсе, мельнице и мельничному пруду. Оперативные правила в новой версии будут показываться только после современной проверки.'},
        {type:'paragraph',text:'Фото на исходной странице: А. Соколов.'}
      ],migrationStatus:'seed_from_project_brief'
    },
    {
      id:'nature-monuments',slug:'nature-monuments',title:'Памятники природы',category:'Природа',subcategory:'Охрана природы',legacyUrl:'https://www.wystynez.ru/p44.htm',date:null,author:null,
      deck:'Музейный материал о Виштынецком озере и реке Красной как ключевых памятниках природы территории.',
      hero:null,images:[],relatedPoiIds:['poi_vishtynets_lake'],archival:true,
      content:[
        {type:'paragraph',text:'Страница объединяет два главных природных памятника территории — Виштынецкое озеро и реку Красную — и описывает их природную ценность.'},
        {type:'paragraph',text:'Особое внимание уделено лесным берегам Красной, родникам, редким растениям, звериным тропам и роли реки в водной системе Виштынецкой возвышенности.'}
      ],migrationStatus:'seed_from_project_brief'
    },
    {
      id:'rominta-legends',slug:'rominta-legends',title:'Легенды Роминтской пущи и Виштынецкого озера',category:'Культура',subcategory:'Легенды',legacyUrl:'https://www.wystynez.ru/p59.htm',date:null,author:null,
      deck:'Две старые легенды музейного сайта: о Чёртовом камне и о затонувшем колоколе Виштынецкого озера.',
      hero:null,images:[],relatedPoiIds:['poi_devils_stone','poi_vishtynets_lake'],archival:true,
      content:[
        {type:'heading',text:'Чёртов камень'},
        {type:'paragraph',text:'Легенда связывает огромный валун в Роминтской пуще со строительством церкви в Тольмингкемене: обманутый чёрт хотел разрушить строящуюся церковь камнем, но выронил его после крика петуха.'},
        {type:'heading',text:'Затонувший колокол'},
        {type:'paragraph',text:'Вторая легенда рассказывает о церковном колоколе, который зимой провалился под лёд Виштынецкого озера по дороге в Виштитес. В предании его звон связывается с опасностью на озере.'},
        {type:'paragraph',text:'На старой странице указан источник: сборник восточнопрусских легенд, изданный во Франкфурте-на-Майне и Берлине в 1987 году.'}
      ],migrationStatus:'seed_from_project_brief'
    },
    {
      id:'red-forest-churches',slug:'red-forest-churches',title:'Кирхи Красного леса и окрестностей',category:'История',subcategory:'Архитектура',legacyUrl:'https://www.wystynez.ru/p55.htm',date:null,author:null,
      deck:'История кирх Краснолесья, Чистых Прудов, Калинино и Невского — от довоенной архитектуры до послевоенной судьбы зданий.',
      hero:null,images:[],relatedPoiIds:['poi_gross_rominten_church'],archival:true,
      content:[
        {type:'heading',text:'Краснолесье — Gross Rominten / Hardteck'},
        {type:'paragraph',text:'Музейная страница описывает строительство кирпичной кирхи в 1873–1880 годах, её архитектуру, повреждения во время Второй мировой войны и послевоенную судьбу здания.'},
        {type:'heading',text:'Чистые Пруды — Tolmingkehmen'},
        {type:'paragraph',text:'Отдельный раздел посвящён кирхе, связанной с Кристионасом Донелайтисом, её разрушению и последующей реставрации под мемориальный музей.'},
        {type:'heading',text:'Калинино и Невское'},
        {type:'paragraph',text:'Статья также рассказывает о кирхах Mehlkehmen и Pillueponen, их архитектурных особенностях, органах, колоколах и состоянии после войны.'}
      ],migrationStatus:'seed_from_project_brief'
    },
    {
      id:'nature-complexes-book',slug:'nature-complexes-book',title:'Природа Калининградской области. Ключевые природные комплексы',category:'Публикации',subcategory:'Книги музея',legacyUrl:'https://www.wystynez.ru/p104.htm',date:'2014',author:null,
      deck:'История создания и презентации книги о ключевых природных комплексах Калининградской области с отдельным разделом о Роминтской пуще.',
      hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'28 ноября 2014 года в Музее Мирового океана была представлена книга о ключевых природных комплексах Калининградской области.'},
        {type:'paragraph',text:'Виштынецкий эколого-исторический музей выступал партнёром проекта, а сотрудники музея подготовили раздел о Роминтской пуще, объединив литературные материалы и собственные исследования.'},
        {type:'paragraph',text:'Издание задумывалось как просветительский материал о ценности природных комплексов и необходимости сохранять места обитания растений и животных.'}
      ],migrationStatus:'seed_from_project_brief'
    }
  );

  const museum=points.find(p=>p.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'nature-complexes-book'])];
  }
})();
