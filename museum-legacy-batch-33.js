(()=>{
'use strict';
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({
 id:'neighbors-2023',slug:'neighbors-2023',title:'Праздник «Соседи» — 2023',category:'Культура',subcategory:'События музея',archival:true,date:'5 августа 2023',legacyUrl:'https://wystynez.ru/p0125.htm',relatedPoiIds:['poi_museum'],
 deck:'Историческая запись о ежегодном празднике «Соседи» в Краснолесье.',
 content:[
  {type:'paragraph',text:'5 августа 2023 года на территории Виштынецкого экомузея в Краснолесье прошёл праздник «Соседи».'},
  {type:'paragraph',text:'На празднике работали ремесленные и творческие мастерские и ярмарка местных продуктов. Гости могли участвовать в мастер-классах по работе с деревом, кожей, текстилем и природными материалами.'},
  {type:'paragraph',text:'Для гостей проводились путешествия к истокам реки Синей и рассказы об истории Виштынецкой возвышенности. В выставочном зале музея работала мастерская «Хранители времени».'},
  {type:'paragraph',text:'В конференц-зале проходили лекции о местных продуктах, инвазивных растениях и дарах леса. В рамках проекта «Вкусы Виштынецкой возвышенности» была представлена книга с рецептами местных блюд.'},
  {type:'paragraph',text:'Историческая запись сохраняется как архивный материал. Она не подтверждает проведение аналогичного мероприятия в текущем году.'},
  {type:'paragraph',text:'Фото: Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо.'}
 ],
 migrationStatus:'verified_primary_source',sourceScope:'dedicated_primary_page',
 sourceNotes:['Primary source: https://wystynez.ru/p0125.htm','Archive-only historical record.']
});
})();
