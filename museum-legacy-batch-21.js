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
