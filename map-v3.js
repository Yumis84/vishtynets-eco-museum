(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const I=()=>window.MuseumIcons;
const screen=$('.screen-map');
const categories=$('#mapCategories');
const filterButton=$('#mapFilterButton');
const layersButton=$('#mapLayersButton');
const cardWrap=$('#mapCard');
const sheet=$('#infoSheet');
const content=$('#sheetContent');
const closeButton=$('#sheetClose');
if(!screen||!categories||!filterButton||!layersButton||!cardWrap||!sheet||!content)return;

const iconName=label=>({
  'Все':'filter','Природа':'leaf','История':'history','Камни':'stone','Мосты':'map','Музей':'museum','Гостевые дома':'bed'
}[label]||'pin');
const svg=name=>I()?I().svg(name):'';

function closeMapSheet(){
  sheet.classList.remove('map-control-sheet');
  closeButton?.click();
}

function activeGuestLayer(){
  return !!categories.querySelector('[data-map-category="Гостевые дома"].is-active');
}

function enhanceCategoryChips(root=categories){
  $$('[data-map-category]',root).forEach(button=>{
    if(button.querySelector('.map-chip-label'))return;
    const label=button.dataset.mapCategory||button.textContent.trim();
    button.innerHTML=`${svg(iconName(label))}<span class="map-chip-label">${label}</span>`;
    const icon=button.querySelector('.v3-svg-icon');
    if(icon){icon.style.width='16px';icon.style.height='16px';icon.style.display='inline-block';icon.style.verticalAlign='-3px';icon.style.marginRight='6px'}
  });
  layersButton.classList.toggle('is-layer-active',activeGuestLayer());
}

function openSheet(title,intro,html){
  sheet.classList.remove('is-place-detail','is-route-detail');
  sheet.classList.add('is-open','map-control-sheet');
  sheet.setAttribute('aria-hidden','false');
  content.innerHTML=`<span class="eyebrow">Карта</span><h2>${title}</h2><p class="map-sheet-intro">${intro}</p>${html}`;
}

function openFilterSheet(){
  const buttons=$$('[data-map-category]',categories).filter(b=>b.dataset.mapCategory!=='Гостевые дома');
  const html=`<div class="map-filter-sheet-grid">${buttons.map(b=>{
    const label=b.dataset.mapCategory;
    return `<button class="${b.classList.contains('is-active')?'is-active':''}" data-map-sheet-category="${label}" type="button">${svg(iconName(label))}<span>${label}</span></button>`;
  }).join('')}</div>`;
  openSheet('Фильтры','Показываем только музейные места с проверенными координатами. Выберите тему карты.',html);
  $$('[data-map-sheet-category]',content).forEach(button=>button.addEventListener('click',()=>{
    const target=categories.querySelector(`[data-map-category="${CSS.escape(button.dataset.mapSheetCategory)}"]`);
    target?.click();
    closeMapSheet();
  }));
}

function layerMarkup(){
  const guests=activeGuestLayer();
  return `<div class="map-layer-list">
    <div class="map-layer-row">
      <span class="map-layer-icon">${svg('museum')}</span>
      <span><strong>Музейные места</strong><small>Проверенные точки природы, истории и культуры</small></span>
      <button class="map-layer-switch is-active" type="button" aria-label="Музейные места включены" disabled></button>
    </div>
    <div class="map-layer-row">
      <span class="map-layer-icon">${svg('bed')}</span>
      <span><strong>Гостевые дома</strong><small>Данные загружаются из отдельного актуального сервиса</small></span>
      <button class="map-layer-switch ${guests?'is-active':''}" id="mapGuestLayerSwitch" type="button" aria-pressed="${guests}"></button>
    </div>
    <div class="map-layer-row">
      <span class="map-layer-icon">${svg('route')}</span>
      <span><strong>Маршруты</strong><small>Появятся после проверки состава и координат точек</small></span>
      <span class="explore-route-status">Готовится</span>
    </div>
  </div>`;
}

function openLayersSheet(){
  openSheet('Слои','Включайте дополнительные данные поверх основной музейной карты.',layerMarkup());
  const toggle=$('#mapGuestLayerSwitch',content);
  toggle?.addEventListener('click',async()=>{
    const chip=categories.querySelector('[data-map-category="Гостевые дома"]');
    chip?.click();
    await new Promise(resolve=>setTimeout(resolve,40));
    const on=activeGuestLayer();
    toggle.classList.toggle('is-active',on);
    toggle.setAttribute('aria-pressed',String(on));
    layersButton.classList.toggle('is-layer-active',on);
  });
}

/* Выбранную точку можно стянуть вниз с карты. */
let pull=null;
function installCardGesture(){
  cardWrap.addEventListener('touchstart',e=>{
    const card=e.target.closest('.map-place-card');
    if(!card||e.touches.length!==1||e.target.closest('button,a')){pull=null;return}
    pull={x:e.touches[0].clientX,y:e.touches[0].clientY,card};
  },{passive:true});
  cardWrap.addEventListener('touchmove',e=>{
    if(!pull||e.touches.length!==1)return;
    const dx=e.touches[0].clientX-pull.x;
    const dy=e.touches[0].clientY-pull.y;
    if(dy>2&&Math.abs(dy)>Math.abs(dx)*1.05){
      e.preventDefault();
      const move=Math.min(115,dy*.58);
      pull.card.style.transition='none';
      pull.card.style.transform=`translateY(${move}px)`;
      pull.card.style.opacity=String(Math.max(.58,1-dy/320));
    }
  },{passive:false});
  cardWrap.addEventListener('touchend',e=>{
    if(!pull||e.changedTouches.length!==1){pull=null;return}
    const dy=e.changedTouches[0].clientY-pull.y;
    const card=pull.card;
    pull=null;
    card.style.transition='transform .15s ease,opacity .15s ease';
    if(dy>62){
      card.style.transform='translateY(100px)';
      card.style.opacity='0';
      setTimeout(()=>{cardWrap.innerHTML=''},130);
    }else{
      card.style.transform='';
      card.style.opacity='';
    }
  },{passive:true});
  cardWrap.addEventListener('touchcancel',()=>{
    if(pull?.card){pull.card.style.transform='';pull.card.style.opacity=''}
    pull=null;
  },{passive:true});
}

function observeMapUi(){
  new MutationObserver(()=>requestAnimationFrame(()=>enhanceCategoryChips())).observe(categories,{childList:true,subtree:false});
  new MutationObserver(()=>{
    const card=cardWrap.querySelector('.map-place-card');
    if(!card)return;
    const guest=card.querySelector('.map-place-copy .eyebrow')?.textContent?.trim()==='Гостевой дом';
    if(guest){
      const photo=card.querySelector('.map-place-photo');
      if(photo&&!photo.querySelector('.v3-svg-icon'))photo.innerHTML=svg('bed');
    }
  }).observe(cardWrap,{childList:true,subtree:true});
}

function init(){
  filterButton.onclick=openFilterSheet;
  layersButton.onclick=openLayersSheet;
  enhanceCategoryChips();
  observeMapUi();
  installCardGesture();
}
init();
})();
