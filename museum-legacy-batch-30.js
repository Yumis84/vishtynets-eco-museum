(()=>{
'use strict';
// Batch 30: source-preserving detailed legacy exhibition history.
const articles=window.MUSEUM_ARTICLES=window.MUSEUM_ARTICLES||[];
const add=a=>{const i=articles.findIndex(x=>x.id===a.id);if(i>=0)Object.assign(articles[i],a);else articles.push(a)};
add({id:'legacy-exhibition-opening-2004',slug:'legacy-exhibition-opening-2004',title:'Передвижная экспозиция Виштынецкого экомузея — открытие 22 мая 2004 года',date:'22 мая 2004',category:'История',subcategory:'История музея',archival:true,migrationStatus:'verified_primary_source',legacyUrl:'https://wystynez.ru/p31.htm',deck:'История первой большой экспозиции музея, посвящённой природе, истории и культуре Виштынецкой возвышенности.',content:[
{type:'paragraph',text:'22 мая 2004 года в мемориальном музее Кристийонаса Донелайтиса в посёлке Чистые Пруды состоялось открытие передвижной экспозиции Виштынецкого эколого-исторического музея.'},
{type:'paragraph',text:'Экспозиция рассказывала о ледниковом происхождении Виштынецкой возвышенности, лесах, реках и озёрах, первых людях этой земли, истории, труде, культуре, королевской охоте и природном наследии Роминтской пущи.'},
{type:'paragraph',text:'Посетителям были представлены 160 исторических и природных экспонатов: окаменелости, минералы и горные породы Виштынецкой возвышенности, предметы труда и бытовая утварь XIX века. Экспозицию дополняли около ста художественных фотографий калининградских и немецких мастеров.'},
{type:'paragraph',text:'В создании экспозиции участвовали Калининградский областной историко-художественный музей, КРОО «Экоцентр „Роминта“», ландшафтный парк «Пуща Роминска» в Польше и КРМО «Экологическая группа „ГИД“». Проект поддержал Датско-российский Фонд местного развития Нестеровского района.'},
{type:'paragraph',text:'Фото: В. Гусев, Э. Барсуков.'}
],sourceNotes:['Primary source: https://wystynez.ru/p31.htm','Archive-only historical material; not a statement of the current exhibition contents.']});
})();
