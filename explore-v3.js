(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const I=()=>window.MuseumIcons;
const explore=$('.screen-explore');
const list=$('#exploreList');
const search=$('#exploreSearch');
const categories=$('#exploreCategories');
const heading=explore?.querySelector('.list-heading');
const favorites=$('#favoritesToggle');
if(!explore||!list||!search||!categories||!heading)return;

const routes=[
  {id:'short',title:'Краснолесье за 2 часа',description:'Короткий маршрут по музею и ближайшим местам. Состав точек будет опубликован после проверки координат.',icon:'route',tone:'leaf'},
  {id:'railway',title:'По следам железной дороги Роминтской пущи',description:'История железной дороги, мостов и связанных объектов. Трасса маршрута сейчас уточняется.',icon:'map',tone:'water'},
  {id:'lake',title:'К озеру Виштынецкому',description:'Будущий маршрут к одному из главных природных объектов Виштынецкой возвышенности.',icon:'leaf',tone:'water'},
  {id:'stones',title:'Каменные истории',description:'Валуны, геология, легенды и музейная экспозиция. Точки маршрута проходят проверку.',icon:'stone',tone:'stone'}
];
let mode='places';
let placeQuery='';
let routeQuery='';

function icon(name){return I()?I().svg(name):''}
function createModeSwitch(){
  const wrap=document.createElement('div');
  wrap.className='explore-mode-switch';
  wrap.setAttribute('role','tablist');
  wrap.innerHTML=`<button class="is-active" data-explore-mode="places" type="button" role="tab" aria-selected="true">${icon('pin')}Места</button><button data-explore-mode="routes" type="button" role="tab" aria-selected="false">${icon('route')}Маршруты</button>`;
  heading.before(wrap);
  wrap.addEventListener('click',e=>{
    const b=e.target.closest('[data-explore-mode]');
    if(!b)return;
    setMode(b.dataset.exploreMode);
  });
}

function createRouteList(){
  const el=document.createElement('div');
  el.id='exploreRoutes';
  el.className='explore-routes';
  list.after(el);
  renderRoutes();
}

function routeMarkup(route){
  return `<button class="explore-route-card" data-route-id="${route.id}" data-tone="${route.tone}" type="button"><span class="explore-route-top"><span class="explore-route-icon">${icon(route.icon)}</span><span class="explore-route-status">Готовится</span></span><h3>${route.title}</h3><p>${route.description}</p><span class="explore-route-foot">${icon('arrow')}Подробнее</span></button>`;
}

function renderRoutes(){
  const container=$('#exploreRoutes');
  if(!container)return;
  const q=routeQuery.trim().toLowerCase();
  const filtered=routes.filter(r=>!q||`${r.title} ${r.description}`.toLowerCase().includes(q));
  container.innerHTML=filtered.length?filtered.map(routeMarkup).join(''):'<div class="explore-empty">По этому запросу маршрутов пока нет.</div>';
  $$('[data-route-id]',container).forEach(card=>card.addEventListener('click',()=>openRoute(routes.find(r=>r.id===card.dataset.routeId))));
  updateHeading(filtered.length);
}

function openRoute(route){
  if(!route)return;
  const sheet=$('#infoSheet'),content=$('#sheetContent');
  if(!sheet||!content)return;
  sheet.classList.remove('is-place-detail');
  sheet.classList.add('is-open','is-route-detail');
  sheet.setAttribute('aria-hidden','false');
  content.innerHTML=`<span class="eyebrow">Маршрут · готовится</span><h2>${route.title}</h2><p>${route.description}</p><p><strong>Почему пока нельзя запустить навигацию:</strong> мы не публикуем маршрут до проверки координат и состава всех точек. После аудита здесь появятся длина, время, точки и кнопка «Начать маршрут».</p>`;
}

function updateHeading(forcedCount){
  const h2=heading.querySelector('h2');
  if(!h2)return;
  const n=Number.isFinite(forcedCount)?forcedCount:$$('.place-row',list).length;
  h2.innerHTML=`<span>${mode==='routes'?'Маршруты':'Места'}</span><small class="explore-count">${mode==='routes'?`${n} в подготовке`:`${n} ${n===1?'место':'мест'}`}</small>`;
}

function setMode(next){
  if(next===mode)return;
  if(mode==='places')placeQuery=search.value;
  else routeQuery=search.value;
  mode=next;
  explore.classList.toggle('is-routes-mode',mode==='routes');
  $$('.explore-mode-switch [data-explore-mode]').forEach(b=>{
    const active=b.dataset.exploreMode===mode;
    b.classList.toggle('is-active',active);
    b.setAttribute('aria-selected',String(active));
  });
  if(mode==='routes'){
    routeQuery='';
    search.value='';
    search.placeholder='Поиск по маршрутам';
    list.style.display='none';
    $('#exploreRoutes').classList.add('is-active');
    favorites.style.display='none';
    renderRoutes();
  }else{
    search.value=placeQuery;
    search.placeholder='Места, темы, маршруты…';
    list.style.display='grid';
    $('#exploreRoutes').classList.remove('is-active');
    favorites.style.display='';
    search.dispatchEvent(new Event('input',{bubbles:true}));
    queueMicrotask(()=>updateHeading());
  }
}

function enhanceSearch(){search.placeholder='Места, темы, маршруты…'}
function watchPlaces(){
  new MutationObserver(()=>{if(mode==='places')requestAnimationFrame(()=>updateHeading())}).observe(list,{childList:true,subtree:false});
}
function routeSearch(){
  search.addEventListener('input',()=>{
    if(mode!=='routes')return;
    routeQuery=search.value;
    renderRoutes();
  });
}

/* Полноэкранная карточка места: существующий app.js продолжает формировать данные */
const sheet=$('#infoSheet');
const panel=sheet?.querySelector('.sheet-panel');
const sheetContent=$('#sheetContent');
function syncPlaceSheet(){
  if(!sheet||!sheetContent)return;
  const open=sheet.classList.contains('is-open');
  const isPlace=open&&!!sheetContent.querySelector(':scope > img');
  sheet.classList.toggle('is-place-detail',isPlace);
  if(!open)sheet.classList.remove('is-route-detail');
  document.documentElement.classList.toggle('place-detail-open',isPlace);
  if(!isPlace&&panel){panel.style.transform='';panel.style.opacity=''}
}
function watchSheet(){
  if(!sheet||!sheetContent)return;
  new MutationObserver(syncPlaceSheet).observe(sheet,{attributes:true,attributeFilter:['class']});
  new MutationObserver(syncPlaceSheet).observe(sheetContent,{childList:true,subtree:true});
  syncPlaceSheet();
}

let pull=null;
function installPlaceSwipe(){
  if(!sheet||!panel)return;
  panel.addEventListener('touchstart',e=>{
    if(!sheet.classList.contains('is-place-detail')||e.touches.length!==1||e.target.closest('button,a,input')){pull=null;return}
    pull={x:e.touches[0].clientX,y:e.touches[0].clientY,top:panel.scrollTop<=2};
  },{passive:true});
  panel.addEventListener('touchmove',e=>{
    if(!pull||!pull.top||e.touches.length!==1)return;
    const dx=e.touches[0].clientX-pull.x,dy=e.touches[0].clientY-pull.y;
    if(dy>2&&Math.abs(dy)>Math.abs(dx)){
      e.preventDefault();
      const move=Math.min(145,dy*.62);
      panel.style.transition='none';
      panel.style.transform=`translateY(${move}px)`;
      panel.style.opacity=String(Math.max(.62,1-dy/430));
    }
  },{passive:false});
  panel.addEventListener('touchend',e=>{
    if(!pull||e.changedTouches.length!==1){pull=null;return}
    const dy=e.changedTouches[0].clientY-pull.y;
    const close=pull.top&&dy>76;
    pull=null;
    panel.style.transition='transform .15s ease,opacity .15s ease';
    if(close){
      panel.style.transform='translateY(90px)';panel.style.opacity='.45';
      setTimeout(()=>$('#sheetClose')?.click(),110);
    }else{panel.style.transform='';panel.style.opacity=''}
  },{passive:true});
  panel.addEventListener('touchcancel',()=>{pull=null;panel.style.transform='';panel.style.opacity=''},{passive:true});
}

function init(){
  createModeSwitch();
  createRouteList();
  enhanceSearch();
  watchPlaces();
  routeSearch();
  watchSheet();
  installPlaceSwipe();
  updateHeading();
}
init();
})();
