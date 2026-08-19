// Verified legacy migration batch 19: remaining archive-index records from 2013–2015.
(function(){
  'use strict';
  const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
  const points=window.MUSEUM_POINTS=window.MUSEUM_POINTS||[];
  const existing=new Set(articles.map(article=>article.id));
  const add=article=>{if(!existing.has(article.id)){articles.push(article);existing.add(article.id)}};
  const archive='https://www.wystynez.ru/p0008.htm';

  add({
    id:'symphony-orchestra-garden-2015',slug:'symphony-orchestra-garden-2015',
    title:'Концерт государственного симфонического оркестра в саду музея',
    category:'Культура',subcategory:'Концерты и события',legacyUrl:archive,date:'6 июня 2015',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музея о концерте государственного симфонического оркестра под руководством А. Фельдмана в саду Виштынецкого экомузея.',
    content:[{type:'paragraph',text:'Архив Виштынецкого экомузея фиксирует концерт государственного симфонического оркестра под руководством А. Фельдмана, состоявшийся 6 июня 2015 года в саду музея.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'heritage-seminar-2014',slug:'heritage-seminar-2014',
    title:'Семинар «Историко-культурное наследие Роминтской пущи»',
    category:'История',subcategory:'Семинары и исследования',legacyUrl:archive,date:'28 марта 2014',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись музея о семинаре, посвящённом историко-культурному наследию Роминтской пущи.',
    content:[{type:'paragraph',text:'Музейный архив фиксирует семинар «Историко-культурное наследие Роминтской пущи», состоявшийся 28 марта 2014 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'donelaitis-journey-2013',slug:'donelaitis-journey-2013',
    title:'Путешествие к Кристионасу Донелайтису',
    category:'Культура',subcategory:'Литература и наследие',legacyUrl:archive,date:'декабрь 2013',author:null,archival:true,hero:null,images:[],relatedPoiIds:[],
    deck:'Архивная запись о путешествии к Кристионасу Донелайтису, приуроченном к 300-летию поэта.',
    content:[{type:'paragraph',text:'Архив музея фиксирует в декабре 2013 года путешествие к Кристионасу Донелайтису, организованное в преддверии 300-летия поэта.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['donelaitis']
  });

  add({
    id:'tourism-industry-diploma-2013',slug:'tourism-industry-diploma-2013',
    title:'Диплом конкурса туристической индустрии Калининградской области',
    category:'Музей',subcategory:'Награды и признание',legacyUrl:archive,date:'декабрь 2013',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Архивная запись о том, что Виштынецкий экомузей стал дипломантом конкурса туристической индустрии Калининградской области.',
    content:[{type:'paragraph',text:'Архив музея сообщает, что в декабре 2013 года Виштынецкий экомузей стал дипломантом конкурса туристической индустрии Калининградской области.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only'
  });

  add({
    id:'museum-guide-festival-2013',slug:'museum-guide-festival-2013',
    title:'Фестиваль «Музейный гид» — 2013',
    category:'Музей',subcategory:'Фестивали и профессиональные события',legacyUrl:archive,date:'31 мая — 4 июня 2013',author:null,archival:true,hero:null,images:[],relatedPoiIds:['poi_museum'],
    deck:'Участие Виштынецкого экомузея в фестивале «Музейный гид» с выставкой «Виштынецкие сокровища гномов».',
    content:[{type:'paragraph',text:'Архив музея фиксирует участие Виштынецкого экомузея в фестивале «Музейный гид» с выставкой «Виштынецкие сокровища гномов» с 31 мая по 4 июня 2013 года.'}],
    migrationStatus:'verified_archive_index',sourceScope:'archive_index_only',relatedArticleIds:['gnome-treasures-project']
  });

  const museum=points.find(point=>point.id==='poi_museum');
  if(museum){
    museum.articleIds=[...new Set([...(museum.articleIds||[]),'symphony-orchestra-garden-2015','heritage-seminar-2014','tourism-industry-diploma-2013','museum-guide-festival-2013'])];
  }
})();
