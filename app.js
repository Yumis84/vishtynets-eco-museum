(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const info=window.MUSEUM_INFO||{};
const points=window.MUSEUM_POINTS||[];
const articles=window.MUSEUM_ARTICLES||[];
const pointById=id=>points.find(p=>p.id===id);
const articleById=id=>articles.find(a=>a.id===id);
const FAVORITES_KEY='vishtynets_v2_favorites';
const favorites=new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY)||'[]'));
const state={screen:'home',previous:'home',exploreCategory:'Все',articleCategory:'Все',mapCategory:'Все',showGuests:false,map:null,markerLayer:null,userMarker:null,guestHouses:[],selectedPoint:null};
const FALLBACK_FOREST='https://www.wystynez.ru/sc-pic/i1423.jpg';
const FALLBACK_MUSEUM='https://www.wystynez.ru/sc-pic/i1665.jpg';

function saveFavorites(){localStorage.setItem(FAVORITES_KEY,JSON.stringify([...favorites]))}
function isFav(id){return favorites.has(id)}
function toggleFav(id){isFav(id)?favorites.delete(id):favorites.add(id);saveFavorites()}
function imageForPoint(p){
  if(p?.photos?.[0])return p.photos[0];
  const a=(p?.articleIds||[]).map(articleById).find(x=>x?.hero);
  if(a?.hero)return a.hero;
  if((p?.categories||[]).includes('Музей'))return FALLBACK_MUSEUM;
  return FALLBACK_FOREST;
}
function imageForArticle(a){return a?.hero||a?.images?.[0]?.src||FALLBACK_FOREST}
function categoryIcon(label){return ({'Природа':'⌁','История':'▥','Камни':'●','Валуны':'●','Мосты':'⌁','Культура':'✦','Музей':'⌂','Архитектура':'⌂','Публикации':'▤','Проекты':'◇','Все':'☷'}[label]||'⌖')}
function primaryCategory(p){const cats=p?.categories||[];return cats[0]||p?.category||'Место'}
function haversine(lat1,lng1,lat2,lng2){
  if(![lat1,lng1,lat2,lng2].every(Number.isFinite))return null;
  const R=6371,toRad=x=>x*Math.PI/180,dLat=toRad(lat2-lat1),dLon=toRad(lng2-lng1);
  const a=Math.sin(dLat/2)**2+Math.cos(toRad(lat1))*Math.cos(toRad(lat2))*Math.sin(dLon/2)**2;
  return R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a));
}
function distanceText(p){const d=haversine(54.394535,22.374779,p.lat,p.lng);return d==null?'Координаты уточняются':`${d.toFixed(1).replace('.',',')} км от музея`}

function showScreen(name,{remember=true}={}){
  if(remember&&state.screen!=='menu')state.previous=state.screen;
  state.screen=name;
  $$('.screen').forEach(s=>s.classList.toggle('is-active',s.dataset.screen===name));
  const nav=$('#bottomNav');
  nav.classList.toggle('is-hidden',name==='menu');
  $$('#bottomNav [data-nav]').forEach(b=>b.classList.toggle('is-active',b.dataset.nav===name || (name==='article'&&b.dataset.nav==='articles')));
  if(name==='map')ensureMap();
  if(name==='explore')renderExplore();
  if(name==='articles')renderArticles();
  if(name!=='map')window.scrollTo(0,0);
}
function openMenu(){state.previous=state.screen==='menu'?'home':state.screen;showScreen('menu',{remember:false})}
function closeMenu(){showScreen(state.previous||'home',{remember:false})}

function renderHours(){
  const now=new Date(),monday=now.getDay()===1,month=now.getMonth()+1,winter=month>=11||month<=3;
  $('#todayHours').textContent=monday?'Выходной':winter?'10:00–17:00':'10:00–18:00';
  $('#todaySeason').textContent=monday?'Понедельник — музей закрыт':winter?'Ноябрь–март':'Апрель–октябрь';
  $('#todayOpen').textContent=monday?'Закрыто':'Открыто';
  $('#todayOpen').closest('.open-dot').classList.toggle('is-closed',monday);
}

function renderHome(){
  const ids=['poi_vishtynets_lake','poi_tokarevka_bridge','poi_devils_stone','poi_gross_rominten_church'];
  const list=ids.map(pointById).filter(Boolean);
  $('#homeRecommendations').innerHTML=list.map(p=>`<button class="recommend-card" data-home-point="${esc(p.id)}" type="button"><img src="${esc(imageForPoint(p))}" alt="" loading="lazy" onerror="this.style.display='none'"><span class="recommend-fallback"></span><span class="recommend-copy"><strong>${esc(p.name)}</strong><small>${esc(primaryCategory(p))}</small></span></button>`).join('');
  $$('[data-home-point]').forEach(b=>b.onclick=()=>openPlace(b.dataset.homePoint));
}

const EXPLORE_CATEGORIES=['Все','Природа','История','Камни','Мосты','Культура'];
function pointMatchesCategory(p,cat){
  if(cat==='Все')return true;
  const cats=[p.category,...(p.categories||[])].join(' ').toLowerCase();
  if(cat==='Камни')return /валун|камн|геолог/.test(cats);
  return cats.includes(cat.toLowerCase());
}
function renderExplore(){
  const q=($('#exploreSearch')?.value||'').trim().toLowerCase();
  $('#exploreCategories').innerHTML=EXPLORE_CATEGORIES.map(c=>`<button class="${state.exploreCategory===c?'is-active':''}" data-explore-category="${c}" type="button">${categoryIcon(c)} ${c}</button>`).join('');
  $$('[data-explore-category]').forEach(b=>b.onclick=()=>{state.exploreCategory=b.dataset.exploreCategory;renderExplore()});
  const list=points.filter(p=>(p.articleIds||[]).length).filter(p=>pointMatchesCategory(p,state.exploreCategory)).filter(p=>!q||[p.name,p.shortDescription,p.category,...(p.categories||[])].join(' ').toLowerCase().includes(q));
  $('#exploreList').innerHTML=list.length?list.map(p=>`<article class="place-row" data-open-place="${esc(p.id)}"><div class="place-row-media"><img src="${esc(imageForPoint(p))}" alt="" loading="lazy" onerror="this.style.display='none'"></div><div class="place-row-copy"><span class="place-type">${esc(primaryCategory(p))}</span><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription||'')}</p><div class="place-distance">⌖ ${esc(distanceText(p))}</div><button class="fav-button" data-fav-point="${esc(p.id)}" type="button">${isFav(p.id)?'♥':'♡'}</button></div></article>`).join(''):'<div class="surface-card" style="padding:18px;color:#6f756e">По этому фильтру пока нет материалов.</div>';
  $$('[data-open-place]').forEach(row=>row.onclick=e=>{if(e.target.closest('[data-fav-point]'))return;openPlace(row.dataset.openPlace)});
  $$('[data-fav-point]').forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFav(b.dataset.favPoint);renderExplore()});
}

const ARTICLE_CATEGORIES=['Все',...new Set(articles.map(a=>a.category).filter(Boolean))];
function renderArticles(){
  const q=($('#articleSearch')?.value||'').trim().toLowerCase();
  $('#articleCategories').innerHTML=ARTICLE_CATEGORIES.map(c=>`<button class="${state.articleCategory===c?'is-active':''}" data-article-category="${esc(c)}" type="button">${esc(c)}</button>`).join('');
  $$('[data-article-category]').forEach(b=>b.onclick=()=>{state.articleCategory=b.dataset.articleCategory;renderArticles()});
  const list=articles.filter(a=>state.articleCategory==='Все'||a.category===state.articleCategory).filter(a=>!q||[a.title,a.deck,a.category,a.subcategory,...(a.content||[]).map(x=>x.text||'')].join(' ').toLowerCase().includes(q));
  $('#articleList').innerHTML=list.length?list.map(a=>`<button class="article-card" data-open-article="${esc(a.id)}" type="button" style="text-align:left;padding:0"><span class="article-media"><img src="${esc(imageForArticle(a))}" alt="" loading="lazy" onerror="this.style.display='none'"></span><span class="article-copy"><span>${esc(a.category||'Архив музея')}${a.subcategory?' · '+esc(a.subcategory):''}</span><h3>${esc(a.title)}</h3><p>${esc(a.deck||'')}</p></span></button>`).join(''):'<div class="surface-card" style="padding:18px;color:#6f756e">Ничего не найдено.</div>';
  $$('[data-open-article]').forEach(b=>b.onclick=()=>openArticle(b.dataset.openArticle));
}

function openPlace(id){
  const p=pointById(id);if(!p)return;
  const related=(p.articleIds||[]).map(articleById).filter(Boolean);
  const route=Number.isFinite(p.lat)&&Number.isFinite(p.lng)?`https://yandex.ru/maps/?rtext=~${p.lat},${p.lng}&rtt=auto`:'';
  showSheet(`<span class="eyebrow">${esc(primaryCategory(p))}</span><h2>${esc(p.name)}</h2><img src="${esc(imageForPoint(p))}" alt="" style="width:100%;height:190px;object-fit:cover;border-radius:14px;margin:12px 0"><p>${esc(p.shortDescription||'')}</p>${p.address?`<h3>Местоположение</h3><p>${esc(p.address)}</p>`:''}<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:15px">${related.length?`<button class="btn-primary" id="sheetArticle" type="button">Читать статью</button>`:''}${route?`<a class="btn-light" style="display:inline-flex;align-items:center;text-decoration:none" href="${route}" target="_blank" rel="noopener">Маршрут</a>`:''}${Number.isFinite(p.lat)?`<button class="btn-light" id="sheetMap" type="button">На карте</button>`:''}</div>`);
  $('#sheetArticle')?.addEventListener('click',()=>{closeSheet();openArticle(related[0].id)});
  $('#sheetMap')?.addEventListener('click',()=>{closeSheet();state.selectedPoint=p;showScreen('map');setTimeout(()=>selectMapPoint(p,true),250)});
}

function openArticle(id){
  const a=articleById(id);if(!a)return;
  state.previous=state.screen==='article'?'articles':state.screen;
  const related=(a.relatedPoiIds||[]).map(pointById).filter(Boolean);
  const blocks=(a.content||[]).map(block=>{
    if(block.type==='heading')return `<h2>${esc(block.text)}</h2>`;
    if(block.type==='gallery'){
      const imgs=(a.images||[]).slice(0,6);return imgs.length?`<div class="reader-gallery">${imgs.map(i=>`<img src="${esc(i.src)}" alt="${esc(i.caption||'')}">`).join('')}</div>`:'';
    }
    return `<p>${esc(block.text||'')}</p>`;
  }).join('');
  $('#articleReader').innerHTML=`<div class="reader-hero"><img src="${esc(imageForArticle(a))}" alt="" onerror="this.style.display='none'"><div class="reader-title"><span>${esc(a.category||'Архив музея')}</span><h1>${esc(a.title)}</h1></div></div><div class="reader-body"><div class="reader-meta">${a.date?`<span>◷ ${esc(a.date)}</span>`:''}${a.author?`<span>Автор: ${esc(a.author)}</span>`:''}${a.archival?'<span>Оригинал из архива музея</span>':''}</div>${a.deck?`<div class="reader-lead">${esc(a.deck)}</div>`:''}${blocks}${related.length?`<div class="reader-map-link"><h3>Рядом на карте</h3><p>${related.map(p=>esc(p.name)).join(' · ')}</p><button id="readerMapButton" type="button">Показать на карте</button></div>`:''}</div>`;
  $('#articleFavorite').textContent=isFav('article:'+id)?'♥':'♡';
  $('#articleFavorite').onclick=()=>{toggleFav('article:'+id);$('#articleFavorite').textContent=isFav('article:'+id)?'♥':'♡'};
  $('#readerMapButton')?.addEventListener('click',()=>{const p=related.find(x=>Number.isFinite(x.lat)&&Number.isFinite(x.lng));if(!p)return;state.selectedPoint=p;showScreen('map');setTimeout(()=>selectMapPoint(p,true),250)});
  showScreen('article',{remember:false});
}

function showSheet(html){$('#sheetContent').innerHTML=html;$('#infoSheet').classList.add('is-open');$('#infoSheet').setAttribute('aria-hidden','false')}
function closeSheet(){$('#infoSheet').classList.remove('is-open');$('#infoSheet').setAttribute('aria-hidden','true')}
function menuSection(type){
  const maps={
    about:['О музее',`<p>${esc(info.name||'Виштынецкий экомузей')} работает в Краснолесье как музейно-информационный центр Роминтской пущи.</p><p>Новая версия сайта сохраняет старые музейные материалы и связывает их с современной картой территории.</p>`],
    visit:['Посетителям',`<p><strong>Адрес:</strong><br>${esc(info.address||'Краснолесье, ул. Школьная, 5А')}</p><p><strong>Телефон:</strong><br><a href="tel:+79062126823">+7 (906) 212-68-23</a></p><p><strong>Режим:</strong><br>${esc(info.openingHours?.summer||'Апрель–октябрь: 10:00–18:00')}<br>${esc(info.openingHours?.winter||'Ноябрь–март: 10:00–17:00')}<br>${esc(info.openingHours?.closed||'Понедельник — выходной')}</p>`],
    exhibitions:['Экспозиции',listArticles(a=>a.subcategory==='Экспозиции'||a.title.includes('Каменные истории'))],
    education:['Образовательные программы','<p>Раздел будет собран из оригинальных музейных программ после полного legacy-аудита. Здесь не будут публиковаться неподтверждённые старые цены и условия.</p>'],
    projects:['Проекты',listArticles(a=>a.category==='Проекты')],
    publications:['Публикации',listArticles(a=>a.category==='Публикации')],
    chronology:['Хронология','<p>Архив событий музея будет перенесён в хронологию: небольшие события — карточками, крупные авторские материалы — отдельными статьями.</p>'],
    contacts:['Контакты',`<p><strong>${esc(info.shortName||'Виштынецкий экомузей')}</strong></p><p>${esc(info.address||'Краснолесье, ул. Школьная, 5А')}</p><p><a href="tel:+79062126823">+7 (906) 212-68-23</a><br><a href="mailto:${esc(info.email||'wystynez@bk.ru')}">${esc(info.email||'wystynez@bk.ru')}</a></p><p><a href="${esc(info.vk||'https://vk.com/public63127132')}" target="_blank" rel="noopener">ВКонтакте ↗</a></p>`]
  };
  const item=maps[type]||['Раздел','<p>Материалы готовятся.</p>'];closeMenu();showSheet(`<span class="eyebrow">Виштынецкий экомузей</span><h2>${item[0]}</h2>${item[1]}`)
}
function listArticles(filter){const list=articles.filter(filter).slice(0,12);return list.length?`<div>${list.map(a=>`<button data-sheet-article="${esc(a.id)}" class="btn-light" style="width:100%;margin:4px 0;text-align:left">${esc(a.title)}</button>`).join('')}</div>`:'<p>Материалы будут добавлены после полного разбора старого сайта.</p>'}

async function loadLeaflet(){
  if(window.L)return;
  if(!document.querySelector('link[data-leaflet]')){const link=document.createElement('link');link.rel='stylesheet';link.href='https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';link.dataset.leaflet='1';document.head.appendChild(link)}
  await new Promise((resolve,reject)=>{const existing=document.querySelector('script[data-leaflet]');if(existing){existing.addEventListener('load',resolve,{once:true});if(window.L)resolve();return}const s=document.createElement('script');s.src='https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';s.dataset.leaflet='1';s.onload=resolve;s.onerror=reject;document.body.appendChild(s)})
}
async function ensureMap(){
  try{await loadLeaflet()}catch(e){$('#mapCanvas').innerHTML='<div style="padding:180px 20px;text-align:center;color:#5e695f">Не удалось загрузить карту.</div>';return}
  if(!state.map){state.map=L.map('mapCanvas',{zoomControl:false,attributionControl:true}).setView([54.402,22.387],13);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(state.map);L.control.zoom({position:'bottomright'}).addTo(state.map);state.markerLayer=L.layerGroup().addTo(state.map);renderMapCategories();renderMapMarkers();setTimeout(()=>state.map.invalidateSize(),50)}else{setTimeout(()=>state.map.invalidateSize(),50);renderMapMarkers()}
}
const MAP_CATEGORIES=['Все','Природа','История','Камни','Мосты','Музей','Гостевые дома'];
function renderMapCategories(){
  $('#mapCategories').innerHTML=MAP_CATEGORIES.map(c=>`<button class="${(c==='Гостевые дома'?state.showGuests:state.mapCategory===c)?'is-active':''}" data-map-category="${c}" type="button">${c}</button>`).join('');
  $$('[data-map-category]').forEach(b=>b.onclick=async()=>{const c=b.dataset.mapCategory;if(c==='Гостевые дома'){state.showGuests=!state.showGuests;if(state.showGuests)await loadGuestHouses()}else state.mapCategory=c;renderMapCategories();renderMapMarkers()});
}
function mapPointMatches(p){return Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&(p.articleIds||[]).length&&pointMatchesCategory(p,state.mapCategory)}
function mapPin(content,guest=false){return L.divIcon({className:'',html:`<div class="${guest?'guest-pin':'poi-pin'}"><span>${content}</span></div>`,iconSize:[34,34],iconAnchor:[17,33]})}
function renderMapMarkers(){
  if(!state.markerLayer)return;state.markerLayer.clearLayers();const q=($('#mapSearch')?.value||'').trim().toLowerCase();
  points.filter(mapPointMatches).filter(p=>!q||[p.name,p.shortDescription,p.category,...(p.categories||[])].join(' ').toLowerCase().includes(q)).forEach(p=>{const marker=L.marker([p.lat,p.lng],{icon:mapPin(categoryIcon(primaryCategory(p)))}).addTo(state.markerLayer);marker.on('click',()=>selectMapPoint(p))});
  if(state.showGuests)state.guestHouses.filter(h=>Number.isFinite(h.lat)&&Number.isFinite(h.lng)).filter(h=>!q||[h.name,h.address,h.description].join(' ').toLowerCase().includes(q)).forEach(h=>{const marker=L.marker([h.lat,h.lng],{icon:mapPin('⌂',true)}).addTo(state.markerLayer);marker.on('click',()=>selectGuest(h)});
  if(state.selectedPoint)selectMapPoint(state.selectedPoint,false);
}
function selectMapPoint(p,fly=false){
  if(!p||!Number.isFinite(p.lat)||!state.map)return;state.selectedPoint=p;if(fly)state.map.flyTo([p.lat,p.lng],15);
  const related=(p.articleIds||[]).map(articleById).filter(Boolean);
  $('#mapCard').innerHTML=`<article class="map-place-card"><div class="map-place-photo"><img src="${esc(imageForPoint(p))}" alt="" onerror="this.style.display='none'"></div><div class="map-place-copy"><span class="eyebrow">${esc(primaryCategory(p))}</span><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription||'')}</p><div class="map-place-actions">${related.length?`<button data-map-article="${esc(related[0].id)}" type="button">Статья</button>`:''}<a href="https://yandex.ru/maps/?rtext=~${p.lat},${p.lng}&rtt=auto" target="_blank" rel="noopener">Маршрут</a></div></div></article>`;
  $('[data-map-article]')?.addEventListener('click',e=>openArticle(e.currentTarget.dataset.mapArticle));
}
function selectGuest(h){
  $('#mapCard').innerHTML=`<article class="map-place-card"><div class="map-place-photo">⌂</div><div class="map-place-copy"><span class="eyebrow">Гостевой дом</span><h3>${esc(h.name)}</h3><p>${esc(h.address||h.description||'')}</p><div class="map-place-actions"><button id="openGuestCatalog" type="button">Подробнее</button><a href="https://yandex.ru/maps/?rtext=~${h.lat},${h.lng}&rtt=auto" target="_blank" rel="noopener">Маршрут</a></div></div></article>`;
  $('#openGuestCatalog').onclick=()=>window.open('https://yumis84.github.io/guest-house-map/','_blank','noopener');
}
async function loadGuestHouses(){
  if(state.guestHouses.length)return;
  try{const text=await fetch('https://raw.githubusercontent.com/Yumis84/guest-house-map/main/guest-houses.js',{cache:'no-store'}).then(r=>r.text());const m=text.match(/window\.GUEST_HOUSES\s*=\s*(\[[\s\S]*?\]);/);if(m)state.guestHouses=Function('"use strict";return ('+m[1]+')')().filter(h=>h.active!==false)}catch(e){state.showGuests=false}
}

function bind(){
  $$('[data-nav]').forEach(b=>b.addEventListener('click',()=>{const n=b.dataset.nav;n==='menu'?openMenu():showScreen(n)}));
  $$('[data-open-menu]').forEach(b=>b.addEventListener('click',openMenu));
  $$('[data-close-menu]').forEach(b=>b.addEventListener('click',closeMenu));
  $$('[data-menu-section]').forEach(b=>b.addEventListener('click',()=>menuSection(b.dataset.menuSection)));
  $('#articleBack').onclick=()=>showScreen(state.previous==='article'?'articles':state.previous||'articles',{remember:false});
  $('#exploreSearch').addEventListener('input',renderExplore);
  $('#articleSearch').addEventListener('input',renderArticles);
  $('#mapSearch').addEventListener('input',renderMapMarkers);
  $('#favoritesToggle').onclick=()=>{const only=$('#favoritesToggle').classList.toggle('is-active');$('#favoritesToggle').textContent=only?'♥ Избранное':'♡ Избранное';if(only){const q=$('#exploreSearch').value;$('#exploreSearch').value='';const rows=points.filter(p=>isFav(p.id));$('#exploreList').innerHTML=rows.map(p=>`<article class="place-row" data-open-place="${esc(p.id)}"><div class="place-row-media"><img src="${esc(imageForPoint(p))}" alt=""></div><div class="place-row-copy"><span class="place-type">${esc(primaryCategory(p))}</span><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription||'')}</p></div></article>`).join('')||'<div class="surface-card" style="padding:18px;color:#6f756e">Избранных мест пока нет.</div>';$$('[data-open-place]').forEach(r=>r.onclick=()=>openPlace(r.dataset.openPlace));$('#favoritesToggle').dataset.oldQuery=q}else renderExplore()};
  $('#routeMuseum').onclick=()=>window.open('https://yandex.ru/maps/?rtext=~54.394535,22.374779&rtt=auto','_blank','noopener');
  $('#locateButton').onclick=()=>{if(!navigator.geolocation||!state.map)return;navigator.geolocation.getCurrentPosition(pos=>{const ll=[pos.coords.latitude,pos.coords.longitude];if(state.userMarker)state.userMarker.remove();state.userMarker=L.marker(ll,{icon:L.divIcon({className:'',html:'<div class="user-dot"></div>',iconSize:[15,15],iconAnchor:[7,7]})}).addTo(state.map);state.map.flyTo(ll,15)},()=>{}, {enableHighAccuracy:true,timeout:8000})};
  $('#mapFilterButton').onclick=()=>showSheet('<span class="eyebrow">Карта</span><h2>Фильтры</h2><p>Выберите категорию прямо над картой. На карте показываются только места с проверенными координатами. Непроверенные точки не публикуются как маркеры.</p>');
  $('#mapLayersButton').onclick=async()=>{state.showGuests=!state.showGuests;if(state.showGuests)await loadGuestHouses();renderMapCategories();renderMapMarkers()};
  $('#sheetClose').onclick=closeSheet;$('#infoSheet').onclick=e=>{if(e.target.id==='infoSheet')closeSheet()};
  $('#sheetContent').addEventListener('click',e=>{const b=e.target.closest('[data-sheet-article]');if(b){closeSheet();openArticle(b.dataset.sheetArticle)}});
}

renderHours();renderHome();renderExplore();renderArticles();bind();
if(window.location.hash==='#map')showScreen('map',{remember:false});
})();
