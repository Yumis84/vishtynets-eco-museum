(function(){
  'use strict';
  const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const points=window.MUSEUM_POINTS||[], articles=window.MUSEUM_ARTICLES||[];
  const FAVORITES_KEY='vishtynets_museum_favorites_v1';
  const favorites=new Set(JSON.parse(localStorage.getItem(FAVORITES_KEY)||'[]'));
  let map, userMarker=null, activeCategory='Все', catalogCategory='Все', articleCategory='Все', favoritesOnly=false, selectedPointId='', markerMap={};

  const icons={Музей:'⌂',Мосты:'⌁','Смотровые площадки':'◉','Реки и родники':'≈',Природа:'⌁',История:'⌛',Архитектура:'⌂'};
  const pointIcon=p=>icons[p.category]||'•';
  const categories=['Все',...new Set(points.flatMap(p=>p.categories||[p.category]))];
  const articleCategories=['Все',...new Set(articles.map(a=>a.category))];
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const pointById=id=>points.find(p=>p.id===id);
  const articleById=id=>articles.find(a=>a.id===id);

  function toast(msg){const el=$('#toast');el.textContent=msg;el.classList.add('on');clearTimeout(toast.t);toast.t=setTimeout(()=>el.classList.remove('on'),2200)}
  function saveFavorites(){localStorage.setItem(FAVORITES_KEY,JSON.stringify([...favorites]))}
  function toggleFavorite(id){favorites.has(id)?favorites.delete(id):favorites.add(id);saveFavorites();renderCatalog();syncDetailHeart(id);toast(favorites.has(id)?'Добавлено в избранное':'Удалено из избранного')}
  function syncDetailHeart(id){const b=$('#placeSheet .detail-fav');if(b&&id)b.textContent=favorites.has(id)?'♥':'♡'}

  function initMap(){
    map=L.map('map',{zoomControl:false,attributionControl:true}).setView([54.402,22.387],13);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom:19,attribution:'© OpenStreetMap'}).addTo(map);
    L.control.zoom({position:'bottomright'}).addTo(map);
    renderMarkers();
  }
  function markerHtml(p,active=false){return `<div class="poi-marker${active?' active':''}">${pointIcon(p)}</div>`}
  function markerIcon(p,active=false){return L.divIcon({className:'',html:markerHtml(p,active),iconSize:[42,42],iconAnchor:[21,21]})}
  function renderMarkers(){
    Object.values(markerMap).forEach(m=>m.remove()); markerMap={};
    filteredMapPoints().filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng)).forEach(p=>{
      const m=L.marker([p.lat,p.lng],{icon:markerIcon(p,p.id===selectedPointId)}).addTo(map);
      m.on('click',()=>{selectPoint(p.id,{open:true,scroll:true,fly:false})});markerMap[p.id]=m;
    });
  }
  function updateMarkerSelection(){Object.entries(markerMap).forEach(([id,m])=>{const p=pointById(id);if(p)m.setIcon(markerIcon(p,id===selectedPointId))})}
  function filteredMapPoints(){
    const q=$('#globalSearch')?.value.trim().toLowerCase()||'';
    return points.filter(p=>p.status!=='hidden'&&(activeCategory==='Все'||(p.categories||[]).includes(activeCategory))&&(!q||[p.name,p.shortDescription,p.address,...(p.categories||[])].join(' ').toLowerCase().includes(q)));
  }
  function renderMapCards(){
    const list=filteredMapPoints().filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));
    $('#mapCards').innerHTML=list.map(p=>`<article class="map-card" data-point-id="${p.id}"><div class="map-card-media">${p.photos?.[0]?`<img src="${p.photos[0]}" alt="" loading="lazy" onerror="this.remove();this.parentElement.innerHTML='<div class=map-card-icon>${pointIcon(p)}</div>'">`:`<div class="map-card-icon">${pointIcon(p)}</div>`}</div><div class="map-card-body"><div class="kicker">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription)}</p></div></article>`).join('');
    $$('#mapCards .map-card').forEach(c=>c.addEventListener('click',()=>openPoint(c.dataset.pointId)));
    requestAnimationFrame(selectCenteredMapCard);
  }
  function renderMapChips(){
    $('#mapChips').innerHTML=categories.map(c=>`<button class="chip ${c===activeCategory?'on':''}" data-map-cat="${esc(c)}">${esc(c)}</button>`).join('');
    $$('[data-map-cat]').forEach(b=>b.onclick=()=>{activeCategory=b.dataset.mapCat;renderMapChips();renderMapCards();renderMarkers();fitVisibleMarkers()});
  }
  function fitVisibleMarkers(){const ps=filteredMapPoints().filter(p=>Number.isFinite(p.lat)&&Number.isFinite(p.lng));if(ps.length>1)map.fitBounds(ps.map(p=>[p.lat,p.lng]),{padding:[70,70],maxZoom:14});else if(ps[0])map.flyTo([ps[0].lat,ps[0].lng],14)}
  function centeredMapCard(){const host=$('#mapCards'),cards=$$('#mapCards .map-card');if(!host||!cards.length)return null;const r=host.getBoundingClientRect(),cx=r.left+r.width/2;return cards.reduce((best,c)=>{const cr=c.getBoundingClientRect(),d=Math.abs(cr.left+cr.width/2-cx);return !best||d<best.d?{el:c,d}:best},null)?.el||null}
  function selectCenteredMapCard(){const card=centeredMapCard();if(!card)return;const id=card.dataset.pointId;if(id!==selectedPointId){selectedPointId=id;updateMarkerSelection();const p=pointById(id);if(p?.lat&&map)map.panTo([p.lat,p.lng],{animate:true,duration:.35})}}
  function scrollMapCard(id){const host=$('#mapCards'),card=host?.querySelector(`[data-point-id="${id}"]`);if(!host||!card)return;host.scrollTo({left:Math.max(0,card.offsetLeft-(host.clientWidth-card.clientWidth)/2),behavior:'smooth'})}
  function selectPoint(id,{open=false,scroll=false,fly=true}={}){const p=pointById(id);if(!p)return;selectedPointId=id;updateMarkerSelection();if(scroll)scrollMapCard(id);if(fly&&p.lat&&map)map.flyTo([p.lat,p.lng],14);if(open)openPoint(id)}

  function renderCatalog(){
    const q=$('#catalogSearch')?.value.trim().toLowerCase()||'';
    const list=points.filter(p=>(catalogCategory==='Все'||(p.categories||[]).includes(catalogCategory))&&(!favoritesOnly||favorites.has(p.id))&&(!q||[p.name,p.shortDescription,p.address,...(p.categories||[])].join(' ').toLowerCase().includes(q)));
    $('#catalogChips').innerHTML=categories.map(c=>`<button class="chip ${c===catalogCategory?'on':''}" data-cat-cat="${esc(c)}">${esc(c)}</button>`).join('');
    $$('[data-cat-cat]').forEach(b=>b.onclick=()=>{catalogCategory=b.dataset.catCat;renderCatalog()});
    $('#placeList').innerHTML=list.length?list.map(p=>`<article class="place-item" data-open-point="${p.id}"><div class="place-image">${p.photos?.[0]?`<img src="${p.photos[0]}" alt="" loading="lazy" onerror="this.remove();this.parentElement.textContent='${pointIcon(p)}'">`:pointIcon(p)}</div><div class="place-copy"><div class="kicker">${esc(p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.address||p.shortDescription)}</p><button class="mini-heart ${favorites.has(p.id)?'on':''}" data-fav="${p.id}" aria-label="Избранное">${favorites.has(p.id)?'♥':'♡'}</button></div></article>`).join(''):`<div class="empty">Здесь пока нет подходящих объектов.</div>`;
    $$('[data-open-point]').forEach(el=>el.addEventListener('click',e=>{if(e.target.closest('[data-fav]'))return;openPoint(el.dataset.openPoint)}));
    $$('[data-fav]').forEach(b=>b.addEventListener('click',e=>{e.stopPropagation();toggleFavorite(b.dataset.fav)}));
    $('#favoritesOnly').classList.toggle('on',favoritesOnly);$('#favoritesOnly').textContent=favoritesOnly?'♥ Избранное':'♡ Избранное';
  }

  function renderArticles(){
    const q=$('#articleSearch')?.value.trim().toLowerCase()||'';
    $('#articleCategories').innerHTML=articleCategories.map(c=>`<button class="${c===articleCategory?'on':''}" data-article-cat="${esc(c)}">${esc(c)}</button>`).join('');
    $$('[data-article-cat]').forEach(b=>b.onclick=()=>{articleCategory=b.dataset.articleCat;renderArticles()});
    const list=articles.filter(a=>(articleCategory==='Все'||a.category===articleCategory)&&(!q||[a.title,a.deck,a.category,a.subcategory,...(a.content||[]).map(x=>x.text||'')].join(' ').toLowerCase().includes(q)));
    $('#articleList').innerHTML=list.length?list.map(a=>`<article class="article-card" data-article-id="${a.id}"><div class="article-thumb">${a.hero?`<img src="${a.hero}" alt="" loading="lazy" onerror="this.remove();this.parentElement.textContent='✦'">`:'✦'}</div><div class="article-info"><div class="kicker">${esc(a.category)} · ${esc(a.subcategory||'')}</div><h3>${esc(a.title)}</h3><p>${esc(a.deck)}</p><div class="article-meta">${a.date?`<span class="tag">${esc(a.date)}</span>`:''}${a.archival?'<span class="tag">Архив</span>':'<span class="tag">Музей</span>'}</div></div></article>`).join(''):`<div class="empty">По запросу ничего не найдено.</div>`;
    $$('[data-article-id]').forEach(el=>el.onclick=()=>openArticle(el.dataset.articleId));
  }

  function galleryHtml(p){const photos=p.photos||[];return `<div class="gallery">${photos.length?photos.map(src=>`<div class="gallery-slide"><img src="${src}" alt="${esc(p.name)}" onerror="this.remove();this.parentElement.innerHTML='<div class=gallery-placeholder>${pointIcon(p)}</div>'"></div>`).join(''):`<div class="gallery-slide"><div class="gallery-placeholder">${pointIcon(p)}</div></div>`}</div>`}
  function openPoint(id){const p=pointById(id);if(!p)return;selectedPointId=id;updateMarkerSelection();if(p.lat&&map)map.flyTo([p.lat,p.lng],14);const related=(p.articleIds||[]).map(articleById).filter(Boolean);
    $('#placeSheet').innerHTML=`<div class="drag-handle"></div>${galleryHtml(p)}<div class="floating-actions"><button class="circle-action detail-fav" aria-label="Избранное">${favorites.has(id)?'♥':'♡'}</button><button class="circle-action detail-close" aria-label="Закрыть">×</button></div><div class="detail-content"><div class="kicker">${esc(p.category)}</div><h2>${esc(p.name)}</h2><div class="article-meta">${(p.categories||[]).map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div><p class="lead">${esc(p.shortDescription)}</p><div class="detail-actions">${p.lat&&p.lng?'<button class="primary route-btn">⌖ Маршрут</button>':'<button class="primary" disabled>Координаты уточняются</button>'}<button class="ask-ai">✦ Спросить AI</button></div>${p.address?`<section class="detail-section"><h3>Местоположение</h3><p>${esc(p.address)}</p></section>`:''}${related.length?`<section class="detail-section"><h3>Связанные статьи</h3>${related.map(a=>`<button class="detail-link" data-related-article="${a.id}" style="border:0;background:none;padding:0;display:block">${esc(a.title)} →</button>`).join('')}</section>`:''}</div>`;
    const back=$('#placeDetail');back.classList.add('on');back.setAttribute('aria-hidden','false');
    $('#placeSheet .detail-close').onclick=closePoint;$('#placeSheet .detail-fav').onclick=()=>toggleFavorite(id);$('#placeSheet .ask-ai').onclick=()=>{closePoint();switchScreen('ai');toast(`Контекст «${p.name}» будет передан музейному AI после подключения backend`)};
    const route=$('#placeSheet .route-btn');if(route)route.onclick=()=>window.open(`https://yandex.ru/maps/?rtext=~${p.lat},${p.lng}&rtt=auto`,'_blank','noopener');
    $$('[data-related-article]').forEach(b=>b.onclick=()=>{closePoint();openArticle(b.dataset.relatedArticle)});
    bindSheetGestures();
  }
  function closePoint(){const back=$('#placeDetail'),sheet=$('#placeSheet');back.classList.remove('on');back.setAttribute('aria-hidden','true');sheet.style.transform='';sheet.style.opacity='';sheet.scrollTop=0}

  function openArticle(id){const a=articleById(id);if(!a)return;const gallery=(a.images||[]);const blocks=(a.content||[]).map(block=>{if(block.type==='paragraph')return `<p>${esc(block.text)}</p>`;if(block.type==='heading')return `<h2>${esc(block.text)}</h2>`;if(block.type==='gallery'&&gallery.length)return `<div class="reader-gallery">${gallery.map(im=>`<figure><img src="${im.src}" alt="" loading="lazy"><figcaption>${im.caption?esc(im.caption)+' · ':''}${im.credit?'Фото: '+esc(im.credit):''}</figcaption></figure>`).join('')}</div>`;return ''}).join('');
    $('#readerBody').innerHTML=`<div class="reader-top"><button class="reader-close" aria-label="Назад">←</button><span>${esc(a.category)}</span><button class="reader-share" aria-label="Поделиться">↗</button></div>${a.hero?`<div class="reader-hero"><img src="${a.hero}" alt="" onerror="this.parentElement.remove()"></div>`:''}<div class="reader-inner"><div class="eyebrow">${esc(a.subcategory||a.category)}</div><h1>${esc(a.title)}</h1><div class="article-meta">${a.date?`<span class="tag">${esc(a.date)}</span>`:''}${a.archival?'<span class="tag">Архивный материал</span>':'<span class="tag">Музей</span>'}</div><p class="deck">${esc(a.deck)}</p><div class="reader-content">${blocks}</div><div class="reader-source">Источник: Виштынецкий эколого-исторический музей${a.legacyUrl?` · <a href="${a.legacyUrl}" target="_blank" rel="noopener">Оригинальная страница ↗</a>`:''}<br>Текстовая миграция: ${a.migrationStatus==='seed_from_project_brief'?'структура подготовлена; оригинальный legacy-текст будет перенесён без литературного переписывания.':'готово'}</div></div>`;
    const back=$('#articleReader');back.classList.add('on');back.setAttribute('aria-hidden','false');$('#readerBody .reader-close').onclick=closeArticle;$('#readerBody .reader-share').onclick=()=>{if(navigator.share)navigator.share({title:a.title,url:location.href}).catch(()=>{});else toast('Ссылка готова для копирования после добавления маршрутизации')};
  }
  function closeArticle(){$('#articleReader').classList.remove('on');$('#articleReader').setAttribute('aria-hidden','true');$('#readerBody').scrollTop=0}

  let sheetGestureBound=false;
  function bindSheetGestures(){if(sheetGestureBound)return;sheetGestureBound=true;const sheet=$('#placeSheet');let tracking=false,axis=null,sx=0,sy=0,lx=0,ly=0,start=0,source='detail';
    const interactive=t=>!!t.closest?.('button,a,input,select,textarea,label');const inGallery=t=>!!t.closest?.('.gallery,.gallery-slide');
    sheet.addEventListener('touchstart',e=>{if(e.touches.length!==1||interactive(e.target))return;const t=e.touches[0];tracking=true;axis=null;sx=lx=t.clientX;sy=ly=t.clientY;start=performance.now();source=inGallery(e.target)?'gallery':'detail'},{capture:true,passive:true});
    sheet.addEventListener('touchmove',e=>{if(!tracking||e.touches.length!==1)return;const t=e.touches[0];lx=t.clientX;ly=t.clientY;const dx=lx-sx,dy=ly-sy;if(!axis){if(Math.abs(dx)<10&&Math.abs(dy)<10)return;axis=Math.abs(dx)>Math.abs(dy)*1.05?'x':'y';if(axis==='x'&&source==='gallery'){tracking=false;axis=null;return}if(axis==='y'&&(dy<0||sheet.scrollTop>2)){tracking=false;axis=null;return}}
      if(axis==='y'){const y=Math.max(0,dy);sheet.style.transform=`translate3d(0,${Math.min(y,innerHeight*.9)}px,0)`;sheet.style.opacity=String(Math.max(.72,1-y/innerHeight*.28));if(e.cancelable)e.preventDefault();e.stopImmediatePropagation()}
      if(axis==='x'&&source==='detail'){const list=visibleNeighborList(),cur=list.findIndex(x=>x.id===selectedPointId),dir=dx<0?1:-1,target=list[cur+dir];const shown=target?dx:dx*.25;sheet.style.transform=`translate3d(${Math.sign(shown)*Math.min(Math.abs(shown),innerWidth*.7)}px,0,0)`;if(e.cancelable)e.preventDefault();e.stopImmediatePropagation()}
    },{capture:true,passive:false});
    sheet.addEventListener('touchend',e=>{if(!tracking)return;const dx=lx-sx,dy=ly-sy,elapsed=Math.max(1,performance.now()-start),vx=Math.abs(dx)/elapsed,vy=Math.abs(dy)/elapsed,finalAxis=axis,finalSource=source;tracking=false;axis=null;if(finalAxis==='y'){if(dy>0&&(dy>82||vy>.42))closePoint();else snapSheet();e.stopImmediatePropagation();return}if(finalAxis==='x'&&finalSource==='detail'){const list=visibleNeighborList(),cur=list.findIndex(x=>x.id===selectedPointId),dir=dx<0?1:-1,target=list[cur+dir];if(target&&(Math.abs(dx)>Math.min(105,innerWidth*.24)||vx>.48)){sheet.style.transition='transform .18s ease,opacity .18s ease';sheet.style.transform=`translate3d(${dir>0?-innerWidth:innerWidth}px,0,0)`;sheet.style.opacity='.45';setTimeout(()=>{sheet.style.transition='';openPoint(target.id);scrollMapCard(target.id);},160)}else snapSheet();e.stopImmediatePropagation()}},{capture:true,passive:true});
    $('#placeDetail').addEventListener('click',e=>{if(e.target===$('#placeDetail'))closePoint()});
  }
  function snapSheet(){const s=$('#placeSheet');s.style.transition='transform .18s ease,opacity .18s ease';s.style.transform='translate3d(0,0,0)';s.style.opacity='1';setTimeout(()=>s.style.transition='',200)}
  function visibleNeighborList(){const q=$('#catalogSearch')?.value.trim().toLowerCase()||'';return points.filter(p=>(catalogCategory==='Все'||(p.categories||[]).includes(catalogCategory))&&(!q||[p.name,p.shortDescription,p.address,...(p.categories||[])].join(' ').toLowerCase().includes(q)))}

  function locateUser(){if(!navigator.geolocation){toast('Геолокация недоступна');return}$('#locateBtn').textContent='…';navigator.geolocation.getCurrentPosition(pos=>{const ll=[pos.coords.latitude,pos.coords.longitude];if(userMarker)userMarker.remove();userMarker=L.marker(ll,{icon:L.divIcon({className:'',html:'<div class="user-marker"></div>',iconSize:[18,18],iconAnchor:[9,9]})}).addTo(map).bindTooltip('Вы здесь');map.flyTo(ll,14);$('#locateBtn').textContent='◎'},()=>{$('#locateBtn').textContent='◎';toast('Не удалось получить геопозицию')},{enableHighAccuracy:true,timeout:9000})}
  function switchScreen(name){$$('.screen').forEach(s=>s.classList.toggle('on',s.dataset.screen===name));$$('.bottom-nav [data-nav]').forEach(b=>b.classList.toggle('on',b.dataset.nav===name));if(name==='map')setTimeout(()=>map.invalidateSize(),60);if(name==='catalog')renderCatalog();if(name==='articles')renderArticles()}
  function bind(){
    $$('.bottom-nav [data-nav]').forEach(b=>b.onclick=()=>switchScreen(b.dataset.nav));
    $('#globalSearch').addEventListener('input',()=>{renderMapCards();renderMarkers()});
    $('#catalogSearch').addEventListener('input',renderCatalog);$('#articleSearch').addEventListener('input',renderArticles);
    $('#favoritesOnly').onclick=()=>{favoritesOnly=!favoritesOnly;renderCatalog()};$('#locateBtn').onclick=locateUser;
    const cards=$('#mapCards');let raf=0;cards.addEventListener('scroll',()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;selectCenteredMapCard()})},{passive:true});cards.addEventListener('touchend',()=>setTimeout(selectCenteredMapCard,30),{passive:true});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'){if($('#articleReader').classList.contains('on'))closeArticle();else if($('#placeDetail').classList.contains('on'))closePoint()}});
    $$('.prompt-grid button').forEach(b=>b.onclick=()=>toast('AI backend подключим после миграции базы знаний'));
  }
  function boot(){initMap();renderMapChips();renderMapCards();renderCatalog();renderArticles();bind()}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();
