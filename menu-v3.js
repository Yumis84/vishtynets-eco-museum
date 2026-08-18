(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const nav=$('.full-menu-nav');
const screen=$('.screen-menu');
if(!nav||!screen)return;
const I=()=>window.MuseumIcons;
const icon=name=>I()?I().svg(name):'';
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const LEGACY_ARCHIVE_URL='https://wystynez.ru/p0008.htm';
const chronologyEvents=[
  {year:2024,type:'Выставка',title:'Железные дороги Роминтской пущи',date:'с 1 мая 2024'},
  {year:2023,type:'Праздник',title:'Соседи — 2023',date:'5 августа 2023'},
  {year:2023,type:'Выставка',title:'Персональная выставка художественных работ Виталия Хвалея',date:'8 мая 2023 — 30 апреля 2024'},
  {year:2022,type:'Фотовыставка',title:'РОМИНТА, часть первая КОСМОС — Юлия Алексеева',date:'с 6 августа 2022'},
  {year:2021,type:'Проект',title:'Представление результатов проекта «В гости к камню»',date:'22 мая 2021'},
  {year:2021,type:'Конкурс',title:'Легенда о камне — итоги конкурса',date:'21 апреля 2021'},
  {year:2021,type:'Фотовыставка',title:'Ковчег — Юрий Бутерус и Юлия Алексеева',date:'10 июля 2021 — 10 января 2022'},
  {year:2021,type:'Выставка',title:'Макромир Красного леса — Дмитрий Домнин',date:'6 апреля — 9 июля 2021'},
  {year:2020,type:'Проект',title:'В гости к камню',date:'1 сентября 2020 — 31 мая 2021'},
  {year:2020,type:'Акция',title:'Речная колыбель',date:'21 августа 2020'},
  {year:2020,type:'Проект',title:'Памяти разведгруппы «Максим» — открытие памятного камня',date:'17 июля 2020'},
  {year:2020,type:'Выставка',title:'Путешествие в Непал — Эдуард Карлецкий',date:'4 февраля 2020 — 4 апреля 2021'},
  {year:2019,type:'Выставка',title:'Краски лета — Наталья Урвачёва',date:'с 15 октября 2019'},
  {year:2019,type:'Выставка',title:'Дыхание трав — флористические сюжеты Ирины Губаревой',date:'с 13 октября 2019'},
  {year:2019,type:'Концерт',title:'Танцы возле Красного леса',date:'24 августа 2019'},
  {year:2019,type:'Праздник',title:'Международный праздник «Соседи»',date:'10 августа 2019'},
  {year:2019,type:'Фотовыставка',title:'Неизвестный Виштынец — Юлия Алексеева',date:'16 июня 2019'},
  {year:2019,type:'Выставка',title:'Роминтская пуща — живопись Людмилы Тамбовцевой',date:'6 апреля — 15 июня 2019'},
  {year:2019,type:'Проект',title:'Неизвестный Виштынец, или по дороге к чуду — торжественное мероприятие',date:'16 июня 2019'},
  {year:2018,type:'Праздник',title:'Международный праздник «Соседи»',date:'25 августа 2018'},
  {year:2018,type:'Фотовыставка',title:'Роминта. Музыка леса — Юлия Алексеева',date:'25 августа 2018 — 31 марта 2019'},
  {year:2018,type:'Выставка',title:'Магия цветов — Людмила Тамбовцева',date:'22 июля — 24 августа 2018'},
  {year:2018,type:'Концерт',title:'Купальские мотивы',date:'7 июля 2018'},
  {year:2018,type:'Выставка',title:'Вчера, сегодня и всегда — гобелены Ирены Пилтите',date:'9 июня — 20 июля 2018'},
  {year:2018,type:'Литературные чтения',title:'Голос Донелайтиса',date:'1 января 2018'},
  {year:2017,type:'Событие',title:'Фильм музея — победитель регионального фестиваля документальных фильмов',date:'1 июля 2017'},
  {year:2017,type:'Праздник',title:'Лесная деревня. Соседи',date:'5 августа 2017'},
  {year:2017,type:'Концерт',title:'Легенды',date:'1 июля 2017'},
  {year:2017,type:'Награда',title:'Музей — победитель конкурса «Опыт места»',date:'2017'},
  {year:2017,type:'Выставка',title:'Рядом с лесом',date:'5 — 17 февраля 2017'},
  {year:2017,type:'Выставка',title:'Дыхание трав — флористические сюжеты Ирины Губаревой',date:'2 января — 25 февраля 2017'},
  {year:2016,type:'Выставка',title:'Лес и люди',date:'6 августа 2016 — 14 июля 2017'},
  {year:2016,type:'Праздник',title:'Международный культурно-фольклорный фестиваль «Соседи»',date:'6 августа 2016'},
  {year:2016,type:'Выставка',title:'Каменные руны и шепот дерева',date:'2 июля — 5 августа 2016'},
  {year:2016,type:'Проект',title:'Лесная деревня — победитель конкурса «Меняющийся музей в меняющемся мире»',date:'май 2016'},
  {year:2015,type:'Экспозиция',title:'Открытие экспозиции под открытым небом «Каменные истории»',date:'26 сентября 2015'},
  {year:2015,type:'Праздник',title:'Международный культурно-фольклорный фестиваль «Соседи»',date:'8 августа 2015'},
  {year:2015,type:'Концерт',title:'Концерт государственного симфонического оркестра под руководством А. Фельдмана',date:'6 июня 2015'},
  {year:2014,type:'Публикация',title:'Природа Калининградской области. Ключевые природные комплексы',date:'28 ноября 2014'},
  {year:2014,type:'Проект',title:'Музейная почта',date:'24 октября 2014'},
  {year:2014,type:'Праздник',title:'Праздник Роминты',date:'16 августа 2014'},
  {year:2014,type:'Семинар',title:'Историко-культурное наследие Роминтской пущи',date:'28 марта 2014'},
  {year:2014,type:'Выставка',title:'Виштынецкие сокровища гномов — выставка в Санкт-Петербурге',date:'19 февраля 2014'},
  {year:2014,type:'Событие',title:'300-летний юбилей Кристионаса Донелайтиса в Краснолесье',date:'1 января 2014'},
  {year:2013,type:'Путешествие',title:'Путешествие к Кристионасу Донелайтису к 300-летию поэта',date:'декабрь 2013'},
  {year:2013,type:'Награда',title:'Музей — дипломант конкурса туристической индустрии Калининградской области',date:'декабрь 2013'},
  {year:2013,type:'Фестиваль',title:'Участие в фестивале «Музейный гид» с выставкой «Виштынецкие сокровища гномов»',date:'31 мая — 4 июня 2013'},
  {year:2013,type:'Публикация',title:'Издан сборник «Музейный гид — 2013» с брошюрой о музее',date:'май 2013'},
  {year:2011,type:'Экспедиция',title:'Детская исследовательская экспедиция в Роминтской пуще',date:'8 — 14 июля 2011'},
  {year:2011,type:'Музейная ночь',title:'Тени старого леса',date:'14 — 15 мая 2011'},
  {year:2011,type:'Волонтёры',title:'Лагерь волонтёров из природно-исторического парка «Битцевский лес»',date:'1 — 10 мая 2011'},
  {year:2011,type:'Открытие',title:'Торжественное открытие музейно-информационного центра в Краснолесье',date:'29 апреля 2011'},
  {year:2011,type:'Конкурс',title:'Конкурс экологических и эколого-краеведческих троп в Роминтской пуще',date:'22 апреля 2011'},
  {year:2010,type:'Музейная ночь',title:'Музейная ночь в Краснолесье',date:'15 — 16 мая 2010'},
  {year:2010,type:'Образовательный проект',title:'Звёзды над Краснолесьем',date:'январь 2010'},
  {year:2009,type:'Детская программа',title:'Путешествие в Краснолесье',date:'октябрь 2009'},
  {year:2009,type:'Семинар',title:'Минимализация негативного влияния отходов на окружающую среду, польский опыт',date:'июнь 2009'},
  {year:2009,type:'Выставка',title:'Анималистическая графика Татьяны Пушкарёвой',date:'март — апрель 2009'},
  {year:2007,type:'Событие',title:'Участие воспитанницы музея в пятых юношеских Ломоносовских чтениях',date:'август 2007'},
  {year:2007,type:'Волонтёры',title:'Международный лагерь волонтёров',date:'август 2007'},
  {year:2006,type:'Выставка',title:'Дети, школа, лес',date:'с 31 августа 2006'},
  {year:2006,type:'Выставка',title:'Привет из Роминтен — Gruss aus Rominten',date:'15 августа — 4 сентября 2006'},
  {year:2006,type:'Конкурс',title:'Мой мир — моя земля',date:'февраль — сентябрь 2006'},
  {year:2006,type:'Экспозиция',title:'Экспозиция Виштынецкого экомузея в Музее Мирового океана',date:'22 марта — 24 апреля 2006'},
  {year:2006,type:'Событие',title:'Портал «Музеи России» предоставил музею домен к своему 9-летию',date:'2006'},
  {year:2005,type:'Выставка',title:'Перекрёсток памяти — Вильгельм и Луиза',date:'с 24 сентября 2005'},
  {year:2005,type:'Экспозиция',title:'Экспозиция в посёлке Чистые Пруды',date:'июнь — ноябрь 2005'},
  {year:2005,type:'Экспозиция',title:'Экспозиция в Калининграде, музей КГТУ',date:'март — май 2005'},
  {year:2004,type:'Экспедиция',title:'Научная экспедиция по Виштынецкой возвышенности',date:'август 2004'},
  {year:2004,type:'Фотоплэнер',title:'Фотоплэнер в Красном лесу',date:'июль 2004'},
  {year:2004,type:'Открытие',title:'Торжественное открытие экспозиции музея в мемориальном музее Кристионаса Донелайтиса',date:'май 2004'},
  {year:2004,type:'Встреча',title:'Встреча старожилов — первых переселенцев — в Чистых Прудах',date:'февраль 2004'},
  {year:2003,type:'Детская программа',title:'Детский летний лагерь',date:'август 2003'},
  {year:2003,type:'Экспедиция',title:'Научная экспедиция',date:'июль 2003'},
  {year:2003,type:'Акция',title:'Живой щит',date:'июль 2003'},
  {year:2003,type:'Событие',title:'Участие в выставке социальных услуг и проектов НКО',date:'май 2003'},
  {year:2003,type:'Встреча',title:'Встреча старожилов посёлка Калинино',date:'февраль 2003'},
  {year:2002,type:'Фотовыставка',title:'Роминтенская пуща — между прошлым и будущим',date:'февраль 2002 — январь 2004'},
  {year:2002,type:'Фотовыставка',title:'Целау — затерянный мир',date:'октябрь 2002 — июнь 2005'}
];

function textLabel(el,label){
  if(!el)return;
  const textNode=[...el.childNodes].find(n=>n.nodeType===Node.TEXT_NODE&&n.textContent.trim());
  if(textNode)textNode.textContent=label;
}

function groupBefore(el,label){
  if(!el||el.previousElementSibling?.classList.contains('menu-group-label'))return;
  const group=document.createElement('div');
  group.className='menu-group-label';
  group.textContent=label;
  nav.insertBefore(group,el);
}

function addIntro(){
  if($('.menu-intro',screen))return;
  const intro=document.createElement('div');
  intro.className='menu-intro';
  intro.innerHTML='<span class="eyebrow">Виштынецкий экомузей</span><h2>Музей, архив и путеводитель</h2><p>Информация для посетителей, музейные проекты и материалы о Роминтской пуще.</p>';
  nav.before(intro);
}

function addArchiveLink(){
  let link=$('.menu-archive-link',nav);
  if(link)return link;
  link=document.createElement('a');
  link.className='menu-archive-link';
  link.href='https://www.wystynez.ru/';
  link.target='_blank';
  link.rel='noopener';
  link.innerHTML=`<span>${icon('archive')}</span>Старый сайт / Архивный сайт<b aria-hidden="true">${icon('arrow')}</b>`;
  nav.append(link);
  return link;
}

function enhanceFooter(){
  const footer=$('.menu-footer');
  if(!footer)return;
  const emblem=footer.querySelector(':scope > span');
  if(emblem&&I())emblem.innerHTML=icon('leaf');
  const mail=footer.querySelector('a[href^="mailto:"]');
  if(mail){mail.innerHTML=`${icon('contact')}<span>Почта</span>`;mail.setAttribute('aria-label','Написать музею')}
  const vk=footer.querySelector('a[href*="vk.com"]');
  if(vk)vk.setAttribute('aria-label','ВКонтакте музея');
  if(!$('.menu-legacy-note',screen)){
    const note=document.createElement('p');
    note.className='menu-legacy-note';
    note.textContent='Архивный сайт сохраняется как источник оригинальных музейных материалов.';
    footer.after(note);
  }
}

function addChronologyStyles(){
  if($('#chronologyRuntimeStyles'))return;
  const style=document.createElement('style');
  style.id='chronologyRuntimeStyles';
  style.textContent=`
    .chronology-intro{margin:0 0 16px;color:#667068;line-height:1.5}
    .chronology-summary{display:flex;gap:8px;flex-wrap:wrap;margin:0 0 16px}
    .chronology-summary span{padding:7px 10px;border-radius:999px;background:#edf1e8;color:#465347;font-size:12px;font-weight:700}
    .chronology-year{border-top:1px solid rgba(65,79,66,.14);padding:0;margin:0}
    .chronology-year summary{cursor:pointer;list-style:none;display:flex;align-items:center;justify-content:space-between;padding:14px 0;font:700 17px/1.2 Georgia,serif;color:#243329}
    .chronology-year summary::-webkit-details-marker{display:none}
    .chronology-year summary span{font:600 11px/1.2 system-ui,sans-serif;color:#7a837c;background:#f2eee6;padding:5px 8px;border-radius:999px}
    .chronology-items{display:grid;gap:9px;padding:0 0 14px}
    .chronology-item{display:block;padding:11px 12px;border-radius:13px;background:#f7f4ed;border:1px solid rgba(65,79,66,.1)}
    .chronology-item small{display:flex;gap:6px;flex-wrap:wrap;color:#7a827c;font-size:11px;margin-bottom:4px}
    .chronology-item strong{display:block;color:#26342a;font-size:14px;line-height:1.35}
    .chronology-source{display:inline-flex;margin-top:14px;color:#4c674f;font-weight:700;text-decoration:none}
  `;
  document.head.append(style);
}

function chronologyHtml(){
  const groups=new Map();
  chronologyEvents.forEach(event=>{
    if(!groups.has(event.year))groups.set(event.year,[]);
    groups.get(event.year).push(event);
  });
  const years=[...groups.keys()].sort((a,b)=>b-a);
  return `<span class="eyebrow">Архив музея</span><h2>Хронология музея</h2><p class="chronology-intro">Первая структурированная версия архива событий со старого сайта. Детальные страницы, фотографии и авторские подписи продолжаем переносить отдельно.</p><div class="chronology-summary"><span>${chronologyEvents.length} событий</span><span>2002–2024</span><span>источник: архив музея</span></div>${years.map((year,index)=>{
    const items=groups.get(year);
    return `<details class="chronology-year" ${index<2?'open':''}><summary>${year}<span>${items.length}</span></summary><div class="chronology-items">${items.map(event=>`<article class="chronology-item"><small><span>${esc(event.type)}</span><span>·</span><span>${esc(event.date)}</span></small><strong>${esc(event.title)}</strong></article>`).join('')}</div></details>`;
  }).join('')}<a class="chronology-source" href="${LEGACY_ARCHIVE_URL}" target="_blank" rel="noopener">Открыть оригинальный архив ↗</a>`;
}

function enhanceChronology(){
  const chronology=$('[data-menu-section="chronology"]',nav);
  if(!chronology||chronology.dataset.chronologyEnhanced)return;
  chronology.dataset.chronologyEnhanced='1';
  chronology.addEventListener('click',()=>{
    setTimeout(()=>{
      const target=$('#sheetContent');
      if(!target)return;
      addChronologyStyles();
      target.innerHTML=chronologyHtml();
    },0);
  });
}

function init(){
  addIntro();
  const about=$('[data-menu-section="about"]',nav);
  const projects=$('[data-menu-section="projects"]',nav);
  const stay=nav.querySelector('a[href*="guest-house-map"]');
  const contacts=$('[data-menu-section="contacts"]',nav);
  const chronology=$('[data-menu-section="chronology"]',nav);
  textLabel(chronology,'Хронология музея');
  if(stay)stay.classList.add('menu-stay-link');
  const archive=addArchiveLink();
  groupBefore(about,'Музей');
  groupBefore(projects,'Архив и проекты');
  groupBefore(stay||contacts,'Путешествие и связь');
  enhanceFooter();
  enhanceChronology();
  if(archive)archive.setAttribute('aria-label','Открыть старый архивный сайт музея');
}

init();
})();
