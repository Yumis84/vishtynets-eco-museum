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
