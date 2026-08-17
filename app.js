(function(){
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const points=window.MUSEUM_POINTS||[],articles=window.MUSEUM_ARTICLES||[],info=window.MUSEUM_INFO||{};
const FAVORITES_KEY='vishtynets_museum_favorites_v2';
const favorites=new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY)||'[]'));
let activeScreen='home',exploreCategory='Все',articleCategory='Все',favoritesOnly=false,mapCategory='Все',showGuests=false;
let map=null,markerLayer=null,userMarker=null,guestHouses=[],selectedMapItem=null;
const articleById=id=>articles.find(a=>a.id===id),pointById=id=>points.find(p=>p.id===id);
const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
const iconFor=p=>({Музей:'⌂',Мосты:'⌁',Архитектура:'⌂',Озёра:'≈',Валуны:'◆','Реки и родники':'≈'}[p.category]||'•');
const explorablePoints=()=>points.filter(p=>(p.articleIds||[]).length);
const exploreCategories=['Все',...new Set(explorablePoints().flatMap(p=>p.categories||[p.category]))];
const articleCategories=['Все',...new Set(articles.map(a=>a.category))];
function toast(msg){const e=$('#toast');e.textContent=msg;e.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>e.classList.remove('on'),2100)}
function saveFavorites(){localStorage.setItem(FAVORITES_KEY,JSON.stringify([...favorites]))}
function toggleFavorite(id){favorites.has(id)?favorites.delete(id):favorites.add(id);saveFavorites();renderExplore();toast(favorites.has(id)?'Добавлено в избранное':'Удалено из избранного')}

function switchScreen(name){
  activeScreen=name;$$('.screen').forEach(s=>s.classList.toggle('on',s.dataset.screen===name));$$('.bottom-nav [data-nav]').forEach(b=>b.classList.toggle('on',b.dataset.nav===name));
  if(name==='map'){initMap();setTimeout(()=>map&&map.invalidateSize(),30)}
  if(name==='home')$('#homeScreen').scrollTop=0;
}
$$('[data-nav]').forEach(b=>b.addEventListener('click',()=>{closeDrawer();switchScreen(b.dataset.nav)}));

function setupHome(){
  const picks=['vishtynets-lake','red-forest-churches','rominta-legends','museum-mail'].map(articleById).filter(Boolean);
  $('#homeFeatured').innerHTML=picks.map(a=>`<article class="featured-card" data-article-id="${a.id}"><div class="featured-card-media">${a.hero?`<img src="${a.hero}" alt="" onerror="this.remove();this.parentElement.textContent='✦'">`:'✦'}</div><div class="featured-card-copy"><div class="kicker">${esc(a.category)}</div><h3>${esc(a.title)}</h3><p>${esc(a.deck)}</p></div></article>`).join('');
  $$('#homeFeatured [data-article-id]').forEach(e=>e.onclick=()=>openArticle(e.dataset.articleId));
  $$('[data-home-category]').forEach(b=>b.onclick=()=>{articleCategory=b.dataset.homeCategory;switchScreen('articles');renderArticles()});
  $('[data-home-action="visit"]').onclick=()=>$('#visitBlock').scrollIntoView({behavior:'smooth',block:'start'});
  $('.route-museum').onclick=()=>window.open('https://yandex.ru/maps/?rtext=~54.394535,22.374779&rtt=auto','_blank','noopener');
  renderHours();
}
function renderHours(){
  const d=new Date(),day=d.getDay(),m=d.getMonth()+1,winter=m>=11||m<=3;
  const hours=winter?'10:00–17:00':'10:00–18:00';
  $('#todayHours').textContent=day===1?'Выходной':hours;$('#todayStatus').textContent=day===1?'Понедельник — музей закрыт':winter?'Ноябрь–март':'Апрель–октябрь';
}

function renderExplore(){
  const q=($('#exploreSearch')?.value||'').trim().toLowerCase();
  $('#exploreChips').innerHTML=exploreCategories.map(c=>`<button class="chip ${c===exploreCategory?'on':''}" data-explore-cat="${esc(c)}">${esc(c)}</button>`).join('');
  $$('[data-explore-cat]').forEach(b=>b.onclick=()=>{exploreCategory=b.dataset.exploreCat;renderExplore()});
  const list=explorablePoints().filter(p=>(exploreCategory==='Все'||(p.categories||[]).includes(exploreCategory))&&(!favoritesOnly||favorites.has(p.id))&&(!q||[p.name,p.shortDescription,p.address,...(p.categories||[])].join(' ').toLowerCase().includes(q)));
  $('#placeList').innerHTML=list.length?list.map(p=>`<article class="place-item" data-point-id="${p.id}"><div class="place-image">${p.photos?.[0]?`<img src="${p.photos[0]}" alt="" loading="lazy" onerror="this.remove();this.parentElement.textContent='${iconFor(p)}'">`:iconFor(p)}</div><div class="place-copy"><div class="kicker">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription)}</p><button class="mini-heart" data-fav="${p.id}">${favorites.has(p.id)?'♥':'♡'}</button></div></article>`).join(''):'<div class="empty">По этому фильтру пока нет материалов.</div>';
  $$('#placeList [data-point-id]').forEach(e=>e.onclick=ev=>{if(ev.target.closest('[data-fav]'))return;openPoint(e.dataset.pointId)});
  $$('[data-fav]').forEach(b=>b.onclick=ev=>{ev.stopPropagation();toggleFavorite(b.dataset.fav)});
  $('#favoritesOnly').classList.toggle('on',favoritesOnly);$('#favoritesOnly').textContent=favoritesOnly?'♥ Избранное':'♡ Избранное';
}
$('#exploreSearch').addEventListener('input',renderExplore);$('#favoritesOnly').onclick=()=>{favoritesOnly=!favoritesOnly;renderExplore()};

function renderArticles(){
  const q=($('#articleSearch')?.value||'').trim().toLowerCase();
  $('#articleCategories').innerHTML=articleCategories.map(c=>`<button class="${c===articleCategory?'on':''}" data-article-cat="${esc(c)}">${esc(c)}</button>`).join('');
  $$('[data-article-cat]').forEach(b=>b.onclick=()=>{articleCategory=b.dataset.articleCat;renderArticles()});
  const list=articles.filter(a=>(articleCategory==='Все'||a.category===articleCategory)&&(!q||[a.title,a.deck,a.category,a.subcategory,...(a.content||[]).map(x=>x.text||'')].join(' ').toLowerCase().includes(q)));
  $('#articleList').innerHTML=list.length?list.map(a=>`<article class="article-card" data-article-id="${a.id}"><div class="article-thumb">${a.hero?`<img src="${a.hero}" alt="" loading="lazy" onerror="this.remove();this.parentElement.textContent='✦'">`:'✦'}</div><div class="article-info"><div class="kicker">${esc(a.category)}${a.subcategory?' · '+esc(a.subcategory):''}</div><h3>${esc(a.title)}</h3><p>${esc(a.deck)}</p><div class="article-meta">${a.date?`<span class="tag">${esc(a.date)}</span>`:''}${a.archival?'<span class="tag">Архив музея</span>':''}</div></div></article>`).join(''):'<div class="empty">По запросу ничего не найдено.</div>';
  $$('#articleList [data-article-id]').forEach(e=>e.onclick=()=>openArticle(e.dataset.articleId));
}
$('#articleSearch').addEventListener('input',renderArticles);

async function loadGuestHouses(){
  if(guestHouses.length)return guestHouses;
  try{
    const text=await fetch('https://raw.githubusercontent.com/Yumis84/guest-house-map/main/guest-houses.js',{cache:'no-store'}).then(r=>{if(!r.ok)throw Error(r.status);return r.text()});
    const match=text.match(/window\.GUEST_HOUSES\s*=\s*(\[[\s\S]*?\]);/);if(!match)throw Error('format');
    guestHouses=Function('"use strict";return ('+match[1]+')')().filter(h=>h.active!==false);return guestHouses;
  }catch(e){console.warn('Guest layer unavailable',e);guestHouses=[];throw e}
}
function initMap(){
  if(map)return;
  map=L.map('map',{zoomControl:false}).setView([54.402,22.387],13);L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);L.control.zoom({position:'bottomright'}).addTo(map);markerLayer=L.layerGroup().addTo(map);renderMapChips();renderMapMarkers();
}
function mapPointIcon(p){return L.divIcon({className:'',html:`<div class="poi-marker">${iconFor(p)}</div>`,iconSize:[40,40],iconAnchor:[20,20]})}
function guestIcon(){return L.divIcon({className:'',html:'<div class="guest-marker">⌂</div>',iconSize:[40,40],iconAnchor:[20,20]})}
function renderMapChips(){
  const base=['Все','Природа','История','Культура','Архитектура','Мосты'];
  $('#mapChips').innerHTML=base.map(c=>`<button class="chip ${mapCategory===c?'on':''}" data-map-cat="${c}">${c}</button>`).join('')+`<button class="chip ${showGuests?'on':''}" id="guestLayerChip">Гостевые дома</button>`;
  $$('[data-map-cat]').forEach(b=>b.onclick=()=>{mapCategory=b.dataset.mapCat;renderMapChips();renderMapMarkers()});
  $('#guestLayerChip').onclick=async()=>{showGuests=!showGuests;if(showGuests){try{await loadGuestHouses()}catch(e){showGuests=false;toast('Слой гостевых домов временно недоступен')}}renderMapChips();renderMapMarkers()};
}
function mapPointVisible(p,q){return Number.isFinite(p.lat)&&Number.isFinite(p.lng)&&(p.articleIds||[]).length&&(mapCategory==='Все'||(p.categories||[]).includes(mapCategory)||p.category===mapCategory)&&(!q||[p.name,p.shortDescription,p.address,...(p.categories||[])].join(' ').toLowerCase().includes(q))}
function renderMapMarkers(){
  if(!markerLayer)return;markerLayer.clearLayers();const q=($('#mapSearch')?.value||'').trim().toLowerCase();
  points.filter(p=>mapPointVisible(p,q)).forEach(p=>{const m=L.marker([p.lat,p.lng],{icon:mapPointIcon(p)}).addTo(markerLayer);m.on('click',()=>showMapPoint(p))});
  if(showGuests)guestHouses.filter(h=>Number.isFinite(h.lat)&&Number.isFinite(h.lng)&&(!q||[h.name,h.address,h.description].join(' ').toLowerCase().includes(q))).forEach(h=>{const m=L.marker([h.lat,h.lng],{icon:guestIcon()}).addTo(markerLayer);m.on('click',()=>showGuest(h))});
}
$('#mapSearch').addEventListener('input',()=>renderMapMarkers());
function showMapPoint(p){selectedMapItem=p;$('#mapSelection').innerHTML=`<article class="map-selection-card"><div class="map-selection-media">${p.photos?.[0]?`<img src="${p.photos[0]}" alt="">`:iconFor(p)}</div><div class="map-selection-copy"><div class="kicker">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription)}</p><div class="map-selection-actions"><button data-map-open="${p.id}">Подробнее</button><a href="https://yandex.ru/maps/?rtext=~${p.lat},${p.lng}&rtt=auto" target="_blank" rel="noopener">Маршрут</a></div></div></article>`;$('[data-map-open]').onclick=()=>openPoint(p.id)}
function showGuest(h){$('#mapSelection').innerHTML=`<article class="map-selection-card"><div class="map-selection-media">⌂</div><div class="map-selection-copy"><div class="kicker">Гостевой дом</div><h3>${esc(h.name)}</h3><p>${esc(h.address||h.description)}</p><div class="map-selection-actions"><a href="https://yumis84.github.io/guest-house-map/" target="_blank" rel="noopener">Подробнее ↗</a><a href="https://yandex.ru/maps/?rtext=~${h.lat},${h.lng}&rtt=auto" target="_blank" rel="noopener">Маршрут</a></div></div></article>`}
$('#locateBtn').onclick=()=>{if(!navigator.geolocation)return toast('Геолокация недоступна');navigator.geolocation.getCurrentPosition(pos=>{const ll=[pos.coords.latitude,pos.coords.longitude];if(userMarker)userMarker.remove();userMarker=L.marker(ll,{icon:L.divIcon({className:'',html:'<div class="user-marker"></div>',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(map);map.flyTo(ll,15)},()=>toast('Не удалось определить местоположение'),{enableHighAccuracy:true,timeout:9000})};

function openPoint(id){
  const p=pointById(id);if(!p)return;const related=(p.articleIds||[]).map(articleById).filter(Boolean);
  $('#placeSheet').innerHTML=`<div class="drag-handle"></div><div class="detail-hero">${p.photos?.[0]?`<img src="${p.photos[0]}" alt="${esc(p.name)}">`:iconFor(p)}</div><div class="detail-content"><div class="kicker">${esc(p.category)}</div><h2>${esc(p.name)}</h2><div class="article-meta">${(p.categories||[]).map(t=>`<span class="tag">${esc(t)}</span>`).join('')}</div><p class="lead">${esc(p.shortDescription)}</p><div class="detail-actions">${Number.isFinite(p.lat)&&Number.isFinite(p.lng)?`<a class="primary" href="https://yandex.ru/maps/?rtext=~${p.lat},${p.lng}&rtt=auto" target="_blank" rel="noopener">⌖ Маршрут</a>`:'<button disabled>Координаты уточняются</button>'}<button data-detail-fav>${favorites.has(id)?'♥ В избранном':'♡ В избранное'}</button></div>${p.address?`<section class="detail-section"><h3>Местоположение</h3><p>${esc(p.address)}</p></section>`:''}${related.length?`<section class="detail-section"><h3>Статьи об этом месте</h3>${related.map(a=>`<button class="detail-link" data-related="${a.id}">${esc(a.title)} →</button>`).join('')}</section>`:''}</div>`;
  $('#placeDetail').classList.add('on');$('#placeDetail').setAttribute('aria-hidden','false');$('[data-detail-fav]').onclick=()=>{toggleFavorite(id);$('[data-detail-fav]').textContent=favorites.has(id)?'♥ В избранном':'♡ В избранное'};$$('[data-related]').forEach(b=>b.onclick=()=>{closePoint();openArticle(b.dataset.related)});bindSheetSwipe();
}
function closePoint(){$('#placeDetail').classList.remove('on');$('#placeDetail').setAttribute('aria-hidden','true');$('#placeSheet').style.transform=''}
$('#placeDetail').addEventListener('click',e=>{if(e.target===$('#placeDetail'))closePoint()});
let swipeBound=false;function bindSheetSwipe(){if(swipeBound)return;swipeBound=true;let y=0,dy=0;const s=$('#placeSheet');s.addEventListener('touchstart',e=>{if(s.scrollTop>0)return;y=e.touches[0].clientY;dy=0},{passive:true});s.addEventListener('touchmove',e=>{if(!y)return;dy=Math.max(0,e.touches[0].clientY-y);s.style.transform=`translateY(${dy}px)`},{passive:true});s.addEventListener('touchend',()=>{if(dy>100)closePoint();else s.style.transform='';y=0;dy=0})}

function openArticle(id){
  const a=articleById(id);if(!a)return;const gallery=a.images||[];
  const blocks=(a.content||[]).map(b=>b.type==='heading'?`<h2>${esc(b.text)}</h2>`:b.type==='paragraph'?`<p>${esc(b.text)}</p>`:b.type==='gallery'&&gallery.length?`<div class="reader-gallery">${gallery.map(im=>`<figure><img src="${im.src}" alt="" loading="lazy"><figcaption>${im.caption?esc(im.caption)+' · ':''}${im.credit?'Фото: '+esc(im.credit):''}</figcaption></figure>`).join('')}</div>`:'').join('');
  const related=(a.relatedPoiIds||[]).map(pointById).filter(Boolean);
  $('#readerBody').innerHTML=`<div class="reader-top"><button data-reader-close>←</button><span>${esc(a.category)}</span><button data-reader-share>↗</button></div>${a.hero?`<div class="reader-hero"><img src="${a.hero}" alt=""></div>`:''}<div class="reader-inner"><div class="eyebrow">${esc(a.subcategory||a.category)}</div><h1>${esc(a.title)}</h1><div class="article-meta">${a.date?`<span class="tag">${esc(a.date)}</span>`:''}${a.archival?'<span class="tag">Архив музея</span>':''}</div><p class="deck">${esc(a.deck)}</p><div class="reader-content">${blocks}</div>${related.length?`<div class="detail-section"><h3>Связанные места</h3>${related.map(p=>`<button class="detail-link" data-reader-point="${p.id}">${esc(p.name)} →</button>`).join('')}</div>`:''}<div class="reader-source">Источник: Виштынецкий эколого-исторический музей${a.legacyUrl?` · <a href="${a.legacyUrl}" target="_blank" rel="noopener">legacy-страница ↗</a>`:''}</div></div>`;
  $('#articleReader').classList.add('on');$('#articleReader').setAttribute('aria-hidden','false');$('[data-reader-close]').onclick=closeArticle;$('[data-reader-share]').onclick=()=>navigator.share?navigator.share({title:a.title,url:location.href}).catch(()=>{}):toast('Поделиться ссылкой можно из меню браузера');$$('[data-reader-point]').forEach(b=>b.onclick=()=>{closeArticle();openPoint(b.dataset.readerPoint)});
}
function closeArticle(){$('#articleReader').classList.remove('on');$('#articleReader').setAttribute('aria-hidden','true');$('#readerBody').scrollTop=0}

function openDrawer(){$('#drawer').classList.add('on');$('#drawer').setAttribute('aria-hidden','false')}
function closeDrawer(){$('#drawer').classList.remove('on');$('#drawer').setAttribute('aria-hidden','true')}
$('#menuBtn').onclick=openDrawer;$('#drawerClose').onclick=closeDrawer;$('#drawer').onclick=e=>{if(e.target===$('#drawer'))closeDrawer()};
$('#drawerContact').innerHTML=`<strong>${esc(info.shortName||'Виштынецкий экомузей')}</strong><br>${esc(info.address||'Краснолесье, ул. Школьная, 5А')}<br>${info.phone?`<a href="tel:${info.phone.replace(/[^+\d]/g,'')}">${esc(info.phone)}</a><br>`:''}${info.email?`<a href="mailto:${esc(info.email)}">${esc(info.email)}</a>`:''}`;
$$('[data-open-article]').forEach(b=>b.onclick=()=>{closeDrawer();openArticle(b.dataset.openArticle)});
$$('[data-menu-filter]').forEach(b=>b.onclick=()=>{articleCategory=b.dataset.menuFilter;$('#articleSearch').value='';closeDrawer();switchScreen('articles');renderArticles()});
$$('[data-menu-search]').forEach(b=>b.onclick=()=>{articleCategory='Все';closeDrawer();switchScreen('articles');$('#articleSearch').value=b.dataset.menuSearch;renderArticles()});
$$('[data-menu-target="visit"]').forEach(b=>b.onclick=()=>{closeDrawer();switchScreen('home');setTimeout(()=>$('#visitBlock').scrollIntoView({behavior:'smooth'}),40)});
$$('[data-menu-target="contacts"]').forEach(b=>b.onclick=()=>{$('#drawerContact').scrollIntoView({behavior:'smooth',block:'center'});$('#drawerContact').animate([{transform:'scale(1)'},{transform:'scale(1.025)'},{transform:'scale(1)'}],{duration:450})});

setupHome();renderExplore();renderArticles();
})();