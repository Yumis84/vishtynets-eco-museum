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
      ],migrationStatus:'verified_legacy_summary'
    },
    {
      id:'nature-monuments',slug:'nature-monuments',title:'Памятники природы',category:'Природа',subcategory:'Охрана природы',legacyUrl:'https://www.wystynez.ru/p44.htm',date:null,author:null,
      deck:'Музейный материал о Виштынецком озере и реке Красной как ключевых памятниках природы территории.',
      hero:null,images:[],relatedPoiIds:['poi_vishtynets_lake'],archival:true,
      content:[
        {type:'paragraph',text:'Страница объединяет два главных природных памятника территории — Виштынецкое озеро и реку Красную — и описывает их природную ценность.'},
        {type:'paragraph',text:'Особое внимание уделено лесным берегам Красной, родникам, редким растениям, звериным тропам и роли реки в водной системе Виштынецкой возвышенности.'}
      ],migrationStatus:'verified_legacy_summary'
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
      ],migrationStatus:'verified_legacy_summary'
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
      ],migrationStatus:'verified_legacy_summary'
    },
    {
      id:'nature-complexes-book',slug:'nature-complexes-book',title:'Природа Калининградской области. Ключевые природные комплексы',category:'Публикации',subcategory:'Книги музея',legacyUrl:'https://www.wystynez.ru/p104.htm',date:'2014',author:null,
      deck:'История создания и презентации книги о ключевых природных комплексах Калининградской области с отдельным разделом о Роминтской пуще.',
      hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'28 ноября 2014 года в Музее Мирового океана была представлена книга о ключевых природных комплексах Калининградской области.'},
        {type:'paragraph',text:'Виштынецкий эколого-исторический музей выступал партнёром проекта, а сотрудники музея подготовили раздел о Роминтской пуще, объединив литературные материалы и собственные исследования.'},
        {type:'paragraph',text:'Издание задумывалось как просветительский материал о ценности природных комплексов и необходимости сохранять места обитания растений и животных.'}
      ],migrationStatus:'verified_legacy_summary'
    },

    // Legacy structural pages migrated as verified summaries. Original URLs remain attached.
    {
      id:'museum-exposition',slug:'museum-exposition',title:'Экспозиция Виштынецкого экомузея',category:'Музей',subcategory:'Экспозиции',legacyUrl:'https://www.wystynez.ru/p40.htm',date:null,author:null,
      deck:'Обзор постоянной музейной экспозиции о Роминтской пуще, Виштынецкой возвышенности и озере Виштынецком.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'Основная музейная экспозиция знакомит посетителей с природой, историей и культурными особенностями Роминтской пущи, Виштынецкой возвышенности и Виштынецкого озера.'},
        {type:'paragraph',text:'Старая страница отдельно отмечает, что музейная экспозиция существует как в здании музея, так и под открытым небом; в 2015 году на территории музея открылись «Каменные истории».'},
        {type:'paragraph',text:'Режим работы, указанный на исходной странице, сохраняется только как архивное свидетельство и не используется здесь как автоматически актуальная информация.'}
      ],migrationStatus:'verified_legacy_summary'
    },
    {
      id:'travelling-exposition-2004',slug:'travelling-exposition-2004',title:'Передвижная экспозиция Виштынецкого экомузея',category:'Музей',subcategory:'Экспозиции',legacyUrl:'https://www.wystynez.ru/p31.htm',date:'22 мая 2004',author:null,
      deck:'Открытие передвижной экспозиции музея в мемориальном музее Кристионаса Донелайтиса в Чистых Прудах.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'22 мая 2004 года передвижная экспозиция Виштынецкого экомузея открылась в мемориальном музее Кристионаса Донелайтиса в посёлке Чистые Пруды.'},
        {type:'paragraph',text:'Экспозиция рассказывала о происхождении ландшафтов Виштынецкой возвышенности, природе, истории, культуре, труде и повседневной жизни людей этой территории.'},
        {type:'paragraph',text:'В экспозиции было представлено 160 исторических и природных экспонатов и около сотни художественных фотографий. Исходная страница подробно перечисляет партнёров проекта и благодарности.'},
        {type:'paragraph',text:'Фото на исходной странице: В. Гусев, Э. Барсуков.'}
      ],migrationStatus:'verified_legacy_summary',photoCredits:['В. Гусев','Э. Барсуков']
    },
    {
      id:'gnome-treasures',slug:'gnome-treasures',title:'Виштынецкие сокровища гномов',category:'Музей',subcategory:'Образовательные программы',legacyUrl:'https://www.wystynez.ru/p92.htm',date:null,author:'А. Соколов',
      deck:'Интерактивная музейная программа по геологии, превращающая знакомство с камнями Виштынецкой возвышенности в путешествие и игру.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'Программа знакомит участников с камнями и геологией Виштынецкой возвышенности через сказочное путешествие, загадки и наблюдения на улицах Краснолесья и в его окрестностях.'},
        {type:'paragraph',text:'Участники исследуют, как камень использовался человеком, получают «паспорт хранителя камня» и проходят маршрут к условным сокровищам гномов.'},
        {type:'paragraph',text:'На исходной странице программа связана с грантовым проектом «Меняющийся музей в меняющемся мире». Там же сохранены сведения об авторах иллюстраций и фотографий.'},
        {type:'paragraph',text:'Фото: Алексей Соколов, Владимир Драх, Ирина Ковардо. Текст: А. Соколов.'}
      ],migrationStatus:'verified_legacy_summary',photoCredits:['Алексей Соколов','Владимир Драх','Ирина Ковардо']
    },
    {
      id:'museum-for-teachers',slug:'museum-for-teachers',title:'Музей — педагогам и детским группам',category:'Музей',subcategory:'Образовательные программы',legacyUrl:'https://www.wystynez.ru/p0086.htm',date:null,author:null,
      deck:'Архивная страница с вариантами однодневных и многодневных познавательных программ в Краснолесье и Роминтской пуще.',hero:null,images:[],relatedPoiIds:['poi_museum','poi_sinyaya_sources','poi_tokarevka_bridge'],archival:true,
      content:[
        {type:'paragraph',text:'Страница обращена к педагогам и группам с детьми и собирает музейные программы, прогулки и варианты познавательных экспедиций по Краснолесью и Роминтской пуще.'},
        {type:'paragraph',text:'Среди предложений — экскурсия по музейной экспозиции, прогулка к истокам реки Синей, поездка к железнодорожному мосту в Токаревке и программа «Виштынецкие сокровища гномов».'},
        {type:'paragraph',text:'Исходная страница также содержит пример многодневной экспедиции. Старые организационные условия не считаются действующими без современной проверки.'}
      ],migrationStatus:'verified_legacy_summary'
    },
    {
      id:'museum-publications-index',slug:'museum-publications-index',title:'Издания музея и его сотрудников',category:'Публикации',subcategory:'Каталог изданий',legacyUrl:'https://www.wystynez.ru/p0087.htm',date:null,author:null,
      deck:'Каталог музейных изданий, путеводителей, книг, открыток и публикаций, подготовленных музеем или при участии его сотрудников.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'Старая страница собирает издания Виштынецкого экомузея и работы, подготовленные при участии его сотрудников.'},
        {type:'paragraph',text:'В каталоге упомянуты «Музейный гид» 2013 года, издания о природе Калининградской области и Виштынецком озере, путеводитель по программе «Виштынецкие сокровища гномов», туристическая брошюра о Роминтской пуще, набор открыток «Виштынецкий край» и другие материалы.'},
        {type:'paragraph',text:'На исходной странице есть ссылки на интернет-версии и загрузки отдельных изданий; их точные файлы и доступность будут вынесены в отдельный реестр документов.'}
      ],migrationStatus:'verified_legacy_summary'
    },
    {
      id:'museum-services-legacy',slug:'museum-services-legacy',title:'Услуги музея — архивная страница',category:'Музей',subcategory:'Посетителям',legacyUrl:'https://www.wystynez.ru/p95.htm',date:null,author:null,
      deck:'Архивный обзор посещения музея, экскурсий, образовательных программ и туристского информационного центра.',hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
      content:[
        {type:'paragraph',text:'Старая страница «Услуги музея» объединяет посещение экспозиции, экскурсионные предложения, музейную почту, туристский информационный центр и образовательные программы.'},
        {type:'paragraph',text:'На ней перечислены «Виштынецкие сокровища гномов», «В гостях у музея», «Страна, где рождаются реки», «Цвета Красного леса», занятие «Знакомьтесь: растения!» и мастерская «Свеча своими руками».'},
        {type:'paragraph',text:'Цены, размеры групп, режим работы и другие оперативные условия на исходной странице относятся к legacy-версии и в новом сайте не публикуются как актуальные без повторной проверки.'},
        {type:'paragraph',text:'На исходной странице указаны фото Ю. Алексеевой и А. Соколова.'}
      ],migrationStatus:'verified_legacy_summary',photoCredits:['Ю. Алексеева','А. Соколов'],legacyOperationalDataStatus:'archive_only'
    }
  );

  const museum=points.find(p=>p.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'nature-complexes-book','museum-exposition','travelling-exposition-2004','gnome-treasures','museum-for-teachers','museum-publications-index','museum-services-legacy'])];
  }
})();
