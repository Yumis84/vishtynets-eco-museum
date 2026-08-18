(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const I=()=>window.MuseumIcons;
const icon=name=>I()?I().svg(name):'';

const routes=[
  {id:'short',title:'Краснолесье за 2 часа',description:'Короткий маршрут по музею и ближайшим местам. Состав точек будет опубликован после проверки координат.',icon:'route',tone:'leaf'},
  {id:'railway',title:'По следам железной дороги Роминтской пущи',description:'История железной дороги, мостов и связанных объектов. Трасса маршрута сейчас уточняется.',icon:'map',tone:'water'},
  {id:'lake',title:'К озеру Виштынецкому',description:'Будущий маршрут к одному из главных природных объектов Виштынецкой возвышенности.',icon:'leaf',tone:'water'},
  {id:'stones',title:'Каменные истории',description:'Валуны, геология, легенды и музейная экспозиция. Точки маршрута проходят проверку.',icon:'stone',tone:'stone'}
];

let initialized=false;
let mode='places';
let placeQuery='';
let routeQuery='';
let explore=null,list=null,search=null,categories=null,heading=null,favorites=null,routeList=null;

function placeCount(){return $$('.place-row',list).length}
function updateHeading(count){
  if(!heading)return;
  const h2=heading.querySelector('h2');
  if(!h2)return;
  const n=Number.isFinite(count)?count:placeCount();
  h2.innerHTML=`<span>${mode==='routes'?'Маршруты':'Места'}</span><small class="explore-count">${mode==='routes'?`${n} в подготовке`:`${n} ${n===1?'место':'мест'}`}</small>`;
}

function routeMarkup(route){
  return `<button class="explore-route-card" data-route-id="${route.id}" data-tone="${route.tone}" type="button"><span class="explore-route-top"><span class="explore-route-icon">${icon(route.icon)}</span><span class="explore-route-status">Готовится</span></span><h3>${route.title}</h3><p>${route.description}</p><span class="explore-route-foot">${icon('arrow')}Подробнее</span></button>`;
}

function renderRoutes(){
  if(!routeList)return;
  const q=routeQuery.trim().toLowerCase();
  const filtered=routes.filter(r=>!q||`${r.title} ${r.description}`.toLowerCase().includes(q));
  routeList.innerHTML=filtered.length?filtered.map(routeMarkup).join(''):'<div class="explore-empty">По этому запросу маршрутов пока нет.</div>';
  updateHeading(filtered.length);
}

function openRoute(route){
  if(!route)return;
  const sheet=$('#infoSheet'),content=$('#sheetContent');
  if(!sheet||!content)return;
  clearPlaceDetail();
  sheet.classList.add('is-open','is-route-detail');
  sheet.setAttribute('aria-hidden','false');
  content.innerHTML=`<span class="eyebrow">Маршрут · готовится</span><h2>${route.title}</h2><p>${route.description}</p><p><strong>Почему пока нельзя запустить навигацию:</strong> мы не публикуем маршрут до проверки координат и состава всех точек. После аудита здесь появятся длина, время, точки и кнопка «Начать маршрут».</p>`;
}

function setMode(next){
  if(!initialized||next===mode)return;
  if(mode==='places')placeQuery=search.value;
  else routeQuery=search.value;
  mode=next;
  explore.classList.toggle('is-routes-mode',mode==='routes');
  $$('.explore-mode-switch [data-explore-mode]',explore).forEach(b=>{
    const active=b.dataset.exploreMode===mode;
    b.classList.toggle('is-active',active);
    b.setAttribute('aria-selected',String(active));
  });
  if(mode==='routes'){
    routeQuery='';
    search.value='';
    search.placeholder='Поиск по маршрутам';
    list.style.display='none';
    routeList.classList.add('is-active');
    favorites.style.display='none';
    renderRoutes();
  }else{
    search.value=placeQuery;
    search.placeholder='Места, темы, маршруты…';
    list.style.display='grid';
    routeList.classList.remove('is-active');
    favorites.style.display='';
    search.dispatchEvent(new Event('input',{bubbles:true}));
    requestAnimationFrame(()=>updateHeading());
  }
}

function createModeSwitch(){
  if($('.explore-mode-switch',explore))return;
  const wrap=document.createElement('div');
  wrap.className='explore-mode-switch';
  wrap.setAttribute('role','tablist');
  wrap.innerHTML=`<button class="is-active" data-explore-mode="places" type="button" role="tab" aria-selected="true">${icon('pin')}Места</button><button data-explore-mode="routes" type="button" role="tab" aria-selected="false">${icon('route')}Маршруты</button>`;
  heading.before(wrap);
}

function createRouteList(){
  routeList=$('#exploreRoutes');
  if(routeList)return;
  routeList=document.createElement('div');
  routeList.id='exploreRoutes';
  routeList.className='explore-routes';
  list.after(routeList);
  renderRoutes();
}

function clearPlaceDetail(){
  const sheet=$('#infoSheet');
  const panel=sheet?.querySelector('.sheet-panel');
  sheet?.classList.remove('is-place-detail','is-route-detail','map-control-sheet');
  document.documentElement.classList.remove('place-detail-open');
  if(panel){panel.style.transform='';panel.style.opacity='';panel.style.transition=''}
}

function markPlaceDetail(){
  const sheet=$('#infoSheet'),content=$('#sheetContent');
  if(!sheet||!content||!sheet.classList.contains('is-open'))return;
  if(!content.querySelector(':scope > img'))return;
  sheet.classList.remove('is-route-detail','map-control-sheet');
  sheet.classList.add('is-place-detail');
  document.documentElement.classList.add('place-detail-open');
}

function installPlaceSwipe(){
  const sheet=$('#infoSheet');
  const panel=sheet?.querySelector('.sheet-panel');
  if(!sheet||!panel||panel.dataset.safeExploreSwipe==='1')return;
  panel.dataset.safeExploreSwipe='1';
  let pull=null;
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
      panel.style.transform='translateY(90px)';
      panel.style.opacity='.45';
      setTimeout(()=>$('#sheetClose')?.click(),110);
    }else{panel.style.transform='';panel.style.opacity=''}
  },{passive:true});
  panel.addEventListener('touchcancel',()=>{pull=null;panel.style.transform='';panel.style.opacity=''},{passive:true});
}

function bindExploreEvents(){
  explore.addEventListener('click',e=>{
    const modeButton=e.target.closest('[data-explore-mode]');
    if(modeButton){setMode(modeButton.dataset.exploreMode);return}
    const routeCard=e.target.closest('[data-route-id]');
    if(routeCard){openRoute(routes.find(r=>r.id===routeCard.dataset.routeId));return}
    if(e.target.closest('[data-explore-category],#favoritesToggle'))requestAnimationFrame(()=>updateHeading());
  });
  search.addEventListener('input',e=>{
    if(mode==='routes'){
      e.stopImmediatePropagation();
      routeQuery=search.value;
      renderRoutes();
    }else requestAnimationFrame(()=>updateHeading());
  },true);
}

function initExplore(){
  if(initialized)return;
  explore=$('.screen-explore');
  list=$('#exploreList');
  search=$('#exploreSearch');
  categories=$('#exploreCategories');
  heading=explore?.querySelector('.list-heading');
  favorites=$('#favoritesToggle');
  if(!explore||!list||!search||!categories||!heading||!favorites)return;
  initialized=true;
  search.placeholder='Места, темы, маршруты…';
  createModeSwitch();
  createRouteList();
  bindExploreEvents();
  installPlaceSwipe();
  updateHeading();
}

/* Lightweight global delegation only. No MutationObserver and no startup DOM rewrite. */
document.addEventListener('click',e=>{
  if(e.target.closest('[data-nav="explore"]'))setTimeout(initExplore,0);
  if(e.target.closest('[data-open-place],[data-home-point]'))setTimeout(markPlaceDetail,0);
  if(e.target.closest('#sheetArticle,#sheetMap,[data-sheet-article]'))clearPlaceDetail();
  if(e.target.closest('#sheetClose')||e.target.id==='infoSheet')setTimeout(clearPlaceDetail,0);
});

if($('.screen-explore.is-active'))initExplore();
})();