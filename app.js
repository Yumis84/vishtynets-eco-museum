(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const info=window.MUSEUM_INFO||{};
const points=window.MUSEUM_POINTS||[];
const articles=window.MUSEUM_ARTICLES||[];

const state={screen:'home'};

function setScreen(name){
  state.screen=name;
  $$('.screen').forEach(el=>el.classList.toggle('is-active',el.dataset.screen===name));
  $$('.bottom-nav [data-nav]').forEach(el=>el.classList.toggle('is-active',el.dataset.nav===name));
  window.scrollTo({top:0,behavior:'auto'});
}

function renderHours(){
  const hours=$('#todayHours');
  const status=$('#todayStatus');
  if(!hours||!status)return;
  const now=new Date();
  const monday=now.getDay()===1;
  const month=now.getMonth()+1;
  const winter=month>=11||month<=3;
  hours.textContent=monday?'Выходной':(winter?'10:00–17:00':'10:00–18:00');
  status.textContent=monday?'Понедельник — музей закрыт':(winter?'Ноябрь–март':'Апрель–октябрь');
}

function placeIcon(p){
  const cats=p?.categories||[];
  if(cats.includes('Озёра'))return '≈';
  if(cats.includes('Мосты'))return '⌁';
  if(cats.includes('Архитектура'))return '⌂';
  if(cats.includes('Валуны'))return '◆';
  return '⌖';
}

function homePlaces(){
  const preferred=['poi_devils_stone','poi_vishtynets_lake','poi_tokarevka_bridge','poi_gross_rominten_church'];
  return preferred.map(id=>points.find(p=>p.id===id)).filter(Boolean);
}

function renderHomePlaces(){
  const host=$('#homePlaces');
  if(!host)return;
  const data=homePlaces();
  host.innerHTML=data.map(p=>`<button class="place-card" type="button" data-place="${p.id}"><span class="place-symbol">${placeIcon(p)}</span><div class="kicker">${(p.categories||[p.category])[0]||'Место'}</div><h3>${p.name}</h3><p>${p.shortDescription||''}</p></button>`).join('');
  host.addEventListener('click',e=>{
    const card=e.target.closest('[data-place]');
    if(!card)return;
    setScreen('explore');
  });
}

function renderStories(){
  const host=$('#homeStories');
  if(!host)return;
  const ids=['vishtynets-lake','rominta-legends','red-forest-churches','museum-mail'];
  const data=ids.map(id=>articles.find(a=>a.id===id)).filter(Boolean);
  host.innerHTML=data.map(a=>`<article class="story-card"><div class="story-media">✦</div><div class="story-copy"><div class="kicker">${a.category||'Архив музея'}</div><h3>${a.title}</h3><p>${a.deck||''}</p></div></article>`).join('');
}

function openDrawer(){const d=$('#drawer');if(d)d.classList.add('is-open')}
function closeDrawer(){const d=$('#drawer');if(d)d.classList.remove('is-open')}

function bind(){
  $$('[data-nav]').forEach(el=>el.addEventListener('click',()=>setScreen(el.dataset.nav)));
  $('#menuToggle')?.addEventListener('click',openDrawer);
  $('#drawerClose')?.addEventListener('click',closeDrawer);
  $('#drawer')?.addEventListener('click',e=>{if(e.target.id==='drawer')closeDrawer()});
  $('#visitJump')?.addEventListener('click',()=>$('#visit')?.scrollIntoView({behavior:'smooth',block:'start'}));
  $('#routeMuseum')?.addEventListener('click',()=>window.open('https://yandex.ru/maps/?rtext=~54.394535,22.374779&rtt=auto','_blank','noopener'));
  $$('[data-topic]').forEach(el=>el.addEventListener('click',()=>setScreen('articles')));
  $$('[data-menu-nav]').forEach(el=>el.addEventListener('click',()=>{closeDrawer();setScreen(el.dataset.menuNav)}));
}

renderHours();
renderHomePlaces();
renderStories();
bind();
})();
