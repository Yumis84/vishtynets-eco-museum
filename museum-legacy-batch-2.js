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
    hero:null,images:[],relatedPoiIds:['poi_vishtynets_lake'],archival:true,
    content:[
      {type:'paragraph',text:'Материал рассказывает о птицах Виштынецкой возвышенности и Красного леса как о важной части природного облика территории.'},
      {type:'paragraph',text:'Разнообразный рельеф, леса, поля, озёра, реки и заболоченные низины создают множество местообитаний для птиц. На старой странице отдельно описаны птицы озёр и лесов, включая виды, встречающиеся во время миграций.'},
      {type:'paragraph',text:'В тексте подчёркивается природоохранное значение территории и приводятся сведения о редких и охраняемых видах птиц. Источник, указанный музеем: Г. В. Гришанов, «Ключевые орнитологические территории Балтийского региона России», 2000.'},
      {type:'paragraph',text:'Текст: Игорь Шелякин. Фото/иллюстрации на исходной странице: Cliparts, Dinamite SoftWare Group, 2003.'}
    ],migrationStatus:'verified_legacy_summary',photoCredits:['Cliparts','Dinamite SoftWare Group, 2003']
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
      {type:'paragraph',text:'Материал посвящён Кристионасу Донелайтису и месту его жизни и служения в Тольмингкемене — современных Чистых Прудах.'},
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
    hero:null,images:[],relatedPoiIds:['poi_museum'],archival:true,
    content:[
      {type:'paragraph',text:'5 августа 2023 года в Краснолесье после трёхлетнего перерыва снова состоялся праздник «Соседи», который музей проводил в предыдущие годы как праздник гостеприимства и общения людей, живущих рядом и любящих эту территорию.'},
      {type:'paragraph',text:'В программу вошли концертные и творческие события, ярмарка местных жителей и мастерская «Вкусы Виштынецкой возвышенности».'},
      {type:'paragraph',text:'Исходная страница подробно перечисляет участников ярмарки, местные блюда, продукты, ремесленные и культурные инициативы. Эти имена и детали должны сохраняться при полном переносе страницы и медиаматериалов.'}
    ],migrationStatus:'verified_legacy_summary'
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'vishtynets-upland-map-world','donelaitis','forest-village-neighbors-2017','neighbors-2023'])];
  }
})();
