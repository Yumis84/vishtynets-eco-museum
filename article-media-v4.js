// Article media recovery v4 — verified legacy photos + fullscreen viewer.
(function(){
  'use strict';

  const forestPhotos = [
    'i1423.jpg','i1405.jpg','i1466.jpg','i1426.jpg','i1428.jpg','i1407.jpg',
    'i1430.jpg','i1432.jpg','i1433.jpg','i1409.jpg','i1435.jpg','i1436.jpg',
    'i1438.jpg','i1410.jpg','i2282.jpg','i2283.jpg','i2284.jpg','i1528.jpg',
    'i1411.jpg','i1444.jpg','i1445.jpg','i1446.jpg','i1412.jpg','i1449.jpg',
    'i2280.jpg','i1413.jpg','i1453.jpg','i1454.jpg','i2281.jpg'
  ].map(name=>({
    src:`https://www.wystynez.ru/sc-pic/${name}`,
    caption:null,
    credit:'Александр Матвеев, Алексей Соколов, Эдуард Барсуков'
  }));

  function enrichData(){
    const articles=window.MUSEUM_ARTICLES||[];
    const forest=articles.find(a=>a.id==='forest-village');
    if(!forest)return;
    forest.hero=forestPhotos[0].src;
    forest.images=forestPhotos;
    forest.sourceMediaStatus='29_confirmed_jpg_photos_connected_from_39_exact_legacy_media_urls';
    forest.sourceMediaInventoryFile='data/legacy-media-batch-5.json';
    forest.sourceMediaCount=39;
    forest.photoCredits=['Александр Матвеев','Алексей Соколов','Эдуард Барсуков'];
    forest.mediaDisplayPolicy='Display all 29 confirmed JPG photographs. Keep the 10 PNG legacy assets out of the article gallery until their visual role is independently confirmed.';
  }

  function installLightbox(){
    if(document.getElementById('articleLightboxV4'))return;
    const style=document.createElement('style');
    style.id='articleLightboxStylesV4';
    style.textContent=`
      .reader-gallery img,.screen-article .reader-hero img{cursor:zoom-in}
      .reader-gallery img{width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain!important;background:#eee8dc}
      .reader-lightbox-v4{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(17,24,19,.96);opacity:0;transition:opacity .16s ease}
      .reader-lightbox-v4.is-open{opacity:1}
      .reader-lightbox-v4 img{display:block;max-width:100%;max-height:calc(100dvh - 36px);width:auto;height:auto;object-fit:contain;border-radius:4px;box-shadow:0 8px 40px rgba(0,0,0,.35)}
      .reader-lightbox-v4 button{position:absolute;top:max(14px,env(safe-area-inset-top));right:14px;width:42px;height:42px;border:0;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;font-size:29px;line-height:1;cursor:pointer}
      .reader-lightbox-v4 .reader-lightbox-credit{position:absolute;left:18px;right:18px;bottom:max(12px,env(safe-area-inset-bottom));color:rgba(255,255,255,.78);font:12px/1.4 sans-serif;text-align:center}
      .reader-legacy-source{display:none!important}
      .screen-article .reader-gallery{overflow:visible}
    `;
    document.head.appendChild(style);

    const box=document.createElement('div');
    box.id='articleLightboxV4';
    box.className='reader-lightbox-v4';
    box.setAttribute('aria-hidden','true');
    box.innerHTML='<button type="button" aria-label="Закрыть">×</button><img alt=""><div class="reader-lightbox-credit"></div>';
    document.body.appendChild(box);

    const image=box.querySelector('img');
    const credit=box.querySelector('.reader-lightbox-credit');
    const close=()=>{
      box.classList.remove('is-open');
      box.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
      image.removeAttribute('src');
    };
    box.querySelector('button').addEventListener('click',close);
    box.addEventListener('click',e=>{if(e.target===box)close()});
    document.addEventListener('keydown',e=>{if(e.key==='Escape')close()});

    document.addEventListener('click',e=>{
      const target=e.target.closest?.('.reader-gallery img,.screen-article .reader-hero img');
      if(!target)return;
      const article=target.closest('.screen-article');
      if(!article?.classList.contains('is-active'))return;
      e.preventDefault();
      image.src=target.currentSrc||target.src;
      image.alt=target.alt||'';
      const data=(window.MUSEUM_ARTICLES||[]).find(a=>a.title===article.querySelector('.reader-title h1')?.textContent?.trim());
      const item=data?.images?.find(i=>i.src===target.src);
      credit.textContent=item?.credit||data?.photoCredits?.join(', ')||'';
      box.classList.add('is-open');
      box.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    });
  }

  function hideMigrationMeta(){
    const reader=document.getElementById('articleReader');
    if(!reader)return;
    reader.querySelectorAll('.reader-meta span').forEach(span=>{
      if(/Оригинал из архива музея|Полный текст страницы пока не получен|служебн/i.test(span.textContent||''))span.remove();
    });
  }

  function init(){
    enrichData();
    installLightbox();
    const reader=document.getElementById('articleReader');
    if(reader)new MutationObserver(hideMigrationMeta).observe(reader,{childList:true,subtree:true});
    hideMigrationMeta();
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();
