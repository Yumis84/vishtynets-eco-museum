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
