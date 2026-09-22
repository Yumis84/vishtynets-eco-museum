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
