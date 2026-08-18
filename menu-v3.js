(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const nav=$('.full-menu-nav');
const screen=$('.screen-menu');
if(!nav||!screen)return;
const I=()=>window.MuseumIcons;
const icon=name=>I()?I().svg(name):'';

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
  if(archive)archive.setAttribute('aria-label','Открыть старый архивный сайт музея');
}

init();
})();
