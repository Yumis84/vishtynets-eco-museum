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
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует встречу старожилов — первых переселенцев — в посёлке Чистые Пруды Нестеровского района в феврале 2004 года. Архив ведёт на отдельную страницу p29.htm; полный текст этой страницы в текущем проходе получить не удалось.'}],
    migrationStatus:'dedicated_url_verified_content_pending',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'cache_miss'
  });

  add({
    id:'childrens-summer-camp-2003',slug:'childrens-summer-camp-2003',
    title:'Детский летний лагерь — 2003',category:'Музей',subcategory:'Образовательные программы',
    legacyUrl:'https://www.wystynez.ru/p21.htm',date:'август 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Ранняя образовательная деятельность Виштынецкого экомузея — детский летний лагерь в августе 2003 года.',
    content:[{type:'paragraph',text:'Архив музея фиксирует детский летний лагерь в августе 2003 года и ведёт на отдельную страницу p21.htm. Полный текст страницы пока недоступен, поэтому в новой записи сохранены только подтверждённые архивом название, дата и исходный URL.'}],
    migrationStatus:'dedicated_url_verified_content_pending',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'cache_miss'
  });

  add({
    id:'scientific-expedition-2003',slug:'scientific-expedition-2003',
    title:'Научная экспедиция — 2003',category:'Природа',subcategory:'Экспедиции',
    legacyUrl:'https://www.wystynez.ru/p23.htm',date:'июль 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:[],
    deck:'Научная экспедиция Виштынецкого экомузея, отмеченная в архиве событий за июль 2003 года.',
    content:[{type:'paragraph',text:'Архив событий музея фиксирует научную экспедицию в июле 2003 года и связывает её с отдельной страницей p23.htm. Содержимое этой страницы пока не удалось захватить, поэтому дополнительные детали не добавлялись.'}],
    migrationStatus:'dedicated_url_verified_content_pending',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'cache_miss'
  });

  add({
    id:'living-shield-action-2003',slug:'living-shield-action-2003',
    title:'Акция «Живой щит»',category:'Природа',subcategory:'Экологические акции',
    legacyUrl:'https://www.wystynez.ru/p16.htm',date:'июль 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:[],
    deck:'Экологическая акция «Живой щит», отмеченная в музейном архиве событий за июль 2003 года.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует акцию «Живой щит» в июле 2003 года и ведёт на отдельную страницу p16.htm. Полный текст страницы пока не получен; запись не содержит неподтверждённых деталей.'}],
    migrationStatus:'dedicated_url_verified_content_pending',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'cache_miss'
  });

  add({
    id:'nko-social-projects-exhibition-2003',slug:'nko-social-projects-exhibition-2003',
    title:'Выставка социальных услуг и проектов НКО — 2003',category:'Музей',subcategory:'События музея',
    legacyUrl:'https://www.wystynez.ru/p9.htm',date:'май 2003',author:null,archival:true,
    hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Участие Виштынецкого экомузея в выставке социальных услуг и проектов некоммерческих организаций.',
    content:[{type:'paragraph',text:'Архив музея фиксирует участие в выставке социальных услуг и проектов некоммерческих организаций в мае 2003 года и связывает событие с отдельной страницей p9.htm. Детальный текст страницы в текущем проходе недоступен.'}],
    migrationStatus:'dedicated_url_verified_content_pending',sourceScope:'archive_title_date_plus_verified_link',legacyPageCaptureStatus:'cache_miss'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),
      'childrens-summer-camp-2003','nko-social-projects-exhibition-2003'
    ])];
  }
})();
