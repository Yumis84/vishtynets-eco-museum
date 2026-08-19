// Verified legacy migration batch 15: upgrade «Музейная почта» from its dedicated primary page.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const mail=articles.find(article=>article.id==='museum-mail');
  if(!mail)return;

  mail.date='24 октября 2014';
  mail.author=null;
  mail.deck='Проект и выставка о почтовой открытке как послании во времени: новые открытки Роминтской пущи, музейный почтовый ящик, штемпель и коллекция исторических открыток.';
  mail.hero='https://wystynez.ru/sc-pic/i0911.jpg';
  mail.photoCredits=['Э. Барсуков'];
  mail.images=[
    'i0911','i0912','i0913','i0914','i0915','i0916','i0917','i0918','i0919','i0920',
    'i0921','i0922','i0923','i0924','i0925','i0926','i0927','i0928','i0929','i0930','i0909'
  ].map(id=>({
    src:`https://wystynez.ru/sc-pic/${id}.jpg`,
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
