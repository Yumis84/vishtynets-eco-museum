(()=>{
'use strict';
const head=document.querySelector('.screen-home .home-head');
const home=document.querySelector('.screen-home');
if(!head||!home)return;
const groups=[
 ['Исследовать край',[['Все места','nav','explore'],['Природа','topic','nature'],['История','topic','history'],['Камни','topic','stone'],['Культура','topic','culture']]],
 ['Карта',[['Открыть карту','nav','map'],['Где остановиться','link','https://yumis84.github.io/guest-house-map/']]],
 ['Достопримечательности',[['Места для посещения','scroll','.home-places-section'],['Все места','nav','explore']]],
 ['Истории и музей',[['Статьи','nav','articles'],['Аудиогид','nav','audio'],['О музее','menu','about'],['Экспозиции','menu','exhibitions'],['Образовательные программы','menu','education'],['Проекты','menu','projects'],['Публикации','menu','publications'],['Хронология','menu','chronology'],['Стена впечатлений','link','wall.html']]],
 ['Планирование путешествия',[['Посетителям','menu','visit'],['Контакты','menu','contacts'],['Где остановиться','link','https://yumis84.github.io/guest-house-map/']]]
];
const nav=document.createElement('nav');nav.className='desktop-v1-nav';nav.setAttribute('aria-label','Разделы цифрового атласа');
const close=(focus)=>{nav.querySelectorAll('[aria-expanded]').forEach(b=>{if(focus&&b.getAttribute('aria-expanded')==='true')b.focus();b.setAttribute('aria-expanded','false')});nav.querySelectorAll('.desktop-v1-menu').forEach(p=>p.hidden=true)};
groups.forEach(([title,items],i)=>{const group=document.createElement('div');group.className='desktop-v1-group';const trigger=document.createElement('button');trigger.type='button';trigger.className='desktop-v1-trigger';trigger.textContent=title;trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls',`desktop-v1-menu-${i}`);const panel=document.createElement('div');panel.className='desktop-v1-menu';panel.id=`desktop-v1-menu-${i}`;panel.hidden=true;
 items.forEach(([label,kind,value])=>{const el=document.createElement(kind==='link'?'a':'button');if(kind==='link'){el.href=value;if(value.startsWith('https:')){el.target='_blank';el.rel='noopener'}}else{el.type='button';el.addEventListener('click',()=>{close(false);if(kind==='scroll')home.querySelector(value)?.scrollIntoView({behavior:'smooth'});if(kind==='topic')home.querySelector('.topic-'+value)?.click();if(kind==='nav')home.querySelector(`[data-nav="${value}"]`)?.click();if(kind==='menu')document.querySelector(`.screen-menu [data-menu-section="${value}"]`)?.click()})}el.textContent=label;panel.append(el)});
 trigger.addEventListener('click',()=>{const wasOpen=trigger.getAttribute('aria-expanded')==='true';close(false);if(!wasOpen){trigger.setAttribute('aria-expanded','true');panel.hidden=false}});group.append(trigger,panel);nav.append(group)});
 head.append(nav);document.addEventListener('click',e=>{if(!nav.contains(e.target))close(false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')close(true)});
 const copy=home.querySelector('.warm-hero-copy');const heading=document.createElement('div');heading.className='desktop-v1-heading';heading.innerHTML='<h1>Виштынецкий экомузей</h1><p>Авторский цифровой атлас Виштынецкого края</p>';copy.after(heading);
 const places=home.querySelector('.home-places-section');
 if(places){const section=document.createElement('section');section.className='desktop-v1-map';section.innerHTML='<div><span class="eyebrow">ПУТЕВОДИТЕЛЬ</span><h2>Карта Виштынецкого края</h2><p>Открывайте проверенные места, маршруты и гостевые дома на интерактивной карте.</p></div><button type="button" class="btn-primary">Открыть карту</button>';section.querySelector('button').addEventListener('click',()=>home.querySelector('[data-nav="map"]')?.click());places.before(section)}

})();
