// Article media recovery v4 — verified legacy photos + fullscreen viewer.
(function(){
  'use strict';

  const forestPhotos = [
    'i1423.jpg','i1405.jpg','i1466.jpg','i1426.jpg','i1428.jpg','i1407.jpg',
    'i1430.jpg','i1432.jpg','i1433.jpg','i1409.jpg','i1435.jpg','i1436.jpg',
    'i1438.jpg','i1410.jpg','i2282.jpg','i2283.jpg','i2284.jpg','i1528.jpg',
    'i1411.jpg','i1444.jpg','i1445.jpg','i1446.jpg','i1412.jpg','i1449.jpg',
    'i2280.jpg','i1413.jpg','i1453.jpg','i1454.jpg','i2281.jpg'
  ].map(name=>({src:`https://www.wystynez.ru/sc-pic/${name}`,caption:null,credit:'Александр Матвеев, Алексей Соколов, Эдуард Барсуков'}));

  const lakePhotos = [
    'i0188.jpg','i0192.jpg','i0197.jpg','i0198.jpg','i0199.jpg','i0200.jpg',
    'i0201.jpg','i0202.jpg','i0208.jpg','i0206.jpg','i0204.jpg','i0203.jpg','i0207.jpg'
  ].map(name=>({src:`https://www.wystynez.ru/sc-pic/${name}`,caption:null,credit:'А. Соколов'}));


  const pageMedia=(names,credit)=>names.map(name=>({src:`https://www.wystynez.ru/sc-pic/${name}`,caption:null,credit}));

  const recoveredArticleMedia = {
    'v-gosti-k-kamnyu': {
      files:['i2157.jpg','i2158.jpg','i2159.jpg','i2167.jpg','i2208.jpg','i2165.jpg','i2193.jpg'],
      credit:'Фото на странице: А. Соколов',
      inventory:'data/legacy-media.json',
      status:'confirmed_project_photo_media_connected',
      policy:'Only source-page JPGs with project/photo context are connected. Mineral illustration i2160, map-adjacent i2162/i2214, contest-adjacent i2196 and PNG partner/support graphics remain excluded pending stronger role verification.'
    },
    'vishtynets-upland-map-world': {
      files:['i0433.png','i0435.png','i0437.png','i0139.jpg','i0438.png','i0439.png','i0441.jpg','i0442.png','i0443.png'],
      credit:null,
      inventory:'data/legacy-media-batch-9.json',
      status:'verified_mixed_archival_media_connected',
      policy:'Historical maps, source graphics, landscape imagery and satellite material are preserved as source-order archival media. Attribution belongs to the source page, not to a modern map provider.'
    },
    'unknown-vishtynets-opening-2019': {
      files:['i1711.jpg'],
      credit:'Фото на странице: Юлия Алексеева',
      inventory:'data/legacy-media-batch-2.json'
    },
    'neighbors-2023': {
      files:['i2335.jpg','i2360.jpg','i2361.jpg','i2362.jpg','i2363.jpg','i2364.jpg','i2365.jpg','i2366.jpg','i2367.jpg','i2368.jpg','i2369.jpg','i2378.jpg','i2371.jpg','i2372.jpg','i2373.jpg','i2374.jpg','i2375.jpg','i2376.jpg'],
      credit:'Фото на странице: Наталья Матусевичене, Юлия Алексеева, Ирина Ковардо',
      inventory:'data/legacy-media-batch-2.json'
    },
    'unknown-vishtynets-meeting-2018': {
      files:['i1609.jpg','i1610.jpg','i1611.jpg','i1615.jpg','i1616.jpg'],
      credit:'Фото на странице: Юлия Алексеева, Александр Самсонкин',
      inventory:'data/legacy-media-batch-7.json'
    },
    'scouts-maxim-jack': {
      files:['i2141.jpg','i2142.jpg','i2143.jpg','i2144.jpg','i2145.jpg','i2146.jpg','i2147.jpg','i2148.jpg','i2149.jpg','i2150.jpg','i2151.jpg','i2153.jpg'],
      credit:'Фото на странице: Татьяна Поломодова; исторические изображения имеют отдельное происхождение',
      inventory:'data/legacy-media-batch-7.json',
      itemCredits:{'i2143.jpg':'Айтель Ланге'}
    },
    'neighbors-2018': {
      files:['i1549.jpg','i1550.jpg','i1551.jpg','i1552.jpg','i1553.jpg','i1554.jpg','i1555.jpg','i1556.jpg','i1557.jpg','i1558.jpg','i1559.jpg','i1560.jpg','i1561.jpg','i1562.jpg','i1563.jpg','i1564.jpg','i1569.jpg','i1565.jpg','i1566.jpg','i1570.jpg','i1567.jpg','i1568.jpg','i1571.jpg','i1572.jpg','i1573.jpg','i1574.jpg','i1575.jpg','i1576.jpg','i1577.jpg','i1578.jpg','i1579.jpg','i1580.jpg','i1581.jpg','i1582.jpg','i1583.jpg','i1584.jpg','i1585.jpg','i1542.jpg','i1587.jpg','i1588.jpg','i1589.jpg'],
      credit:'Фото на странице: Юлия Алексеева, Татьяна Поломодова, Амаль Самерханова, Светлана Никирина',
      inventory:'data/legacy-media-batch-8.json'
    },
    'donelaitis': {
      files:['i0037.jpg','i0039.jpg','i0041.jpg','i0043.jpg','i0045.jpg','i0047.jpg','i0049.jpg','i0051.jpg','i0053.jpg','i0055.jpg','i0057.jpg','i0059.jpg','i0061.jpg','i0063.jpg'],
      credit:'Фото на странице: Э. Барсуков, А. Соколов',
      inventory:'data/legacy-media-batch-10.json'
    },
    'travelling-exposition-2004': {
      files:['i0010.jpg','i0012.jpg','i0014.jpg','i0016.jpg','i0018.jpg','i0020.jpg','i0022.jpg','i0024.jpg','i0026.jpg','i0028.jpg','i0030.jpg','i0032.jpg','i0034.jpg'],
      credit:'Фото на странице: В. Гусев, Э. Барсуков',
      inventory:'data/legacy-media-batch-12.json'
    }
  };

  function enrichData(){
    const articles=window.MUSEUM_ARTICLES||[];
    const forest=articles.find(a=>a.id==='forest-village');
    if(forest){
      forest.hero=forestPhotos[0].src; forest.images=forestPhotos;
      forest.sourceMediaStatus='29_confirmed_jpg_photos_connected_from_39_exact_legacy_media_urls';
      forest.sourceMediaInventoryFile='data/legacy-media-batch-5.json'; forest.sourceMediaCount=39;
      forest.photoCredits=['Александр Матвеев','Алексей Соколов','Эдуард Барсуков'];
      forest.mediaDisplayPolicy='Display all 29 confirmed JPG photographs. Keep the 10 PNG legacy assets out of the article gallery until their visual role is independently confirmed.';
    }
    const lake=articles.find(a=>a.id==='vishtynets-lake');
    if(lake){
      lake.hero=lakePhotos[0].src; lake.images=lakePhotos; lake.photoCredits=['А. Соколов'];
      lake.sourceMediaStatus='13_confirmed_jpg_photos_connected_from_15_exact_legacy_media_urls';
      lake.sourceMediaInventoryFile='data/legacy-media-batch-6.json'; lake.sourceMediaCount=15;
      lake.mediaDisplayPolicy='Display the 13 confirmed JPG photographs. Keep the 2 PNG legacy assets out until their visual role is independently confirmed.';
    }

    Object.entries(recoveredArticleMedia).forEach(([id,set])=>{
      const article=articles.find(a=>a.id===id); if(!article)return;
      const items=pageMedia(set.files,set.credit).map(item=>{
        const name=item.src.split('/').pop();
        if(set.itemCredits?.[name])item.credit=set.itemCredits[name];
        return item;
      });
      article.hero=items[0]?.src||article.hero;
      article.images=items;
      article.sourceMediaInventoryFile=set.inventory;
      article.sourceMediaCount=items.length;
      article.sourceMediaStatus=set.status||'confirmed_jpg_source_media_connected';
      article.mediaDisplayPolicy=set.policy||'Only confirmed JPG source media are connected here. Mixed PNG/graphic assets remain excluded until visual classification.';
    });
  }

  function installLightbox(){
    if(document.getElementById('articleLightboxV4'))return;
    const style=document.createElement('style'); style.id='articleLightboxStylesV4';
    style.textContent=`
      .reader-gallery img,.screen-article .reader-hero img{cursor:zoom-in}
      .reader-gallery img{width:100%;height:auto!important;aspect-ratio:auto!important;object-fit:contain!important;background:#eee8dc}
      .reader-lightbox-v4{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;padding:18px;background:rgba(17,24,19,.96);opacity:0;pointer-events:none;transition:opacity .16s ease;touch-action:pan-y}
      .reader-lightbox-v4.is-open{opacity:1;pointer-events:auto}
      .reader-lightbox-v4 img{display:block;max-width:100%;max-height:calc(100dvh - 36px);width:auto;height:auto;object-fit:contain;border-radius:4px;box-shadow:0 8px 40px rgba(0,0,0,.35)}
      .reader-lightbox-v4 button{position:absolute;width:44px;height:44px;border:0;border-radius:50%;background:rgba(255,255,255,.14);color:#fff;font-size:29px;line-height:1;cursor:pointer}
      .reader-lightbox-v4 .lb-close{top:max(14px,env(safe-area-inset-top));right:14px}
      .reader-lightbox-v4 .lb-prev,.reader-lightbox-v4 .lb-next{top:50%;transform:translateY(-50%);font-size:34px}
      .reader-lightbox-v4 .lb-prev{left:10px}.reader-lightbox-v4 .lb-next{right:10px}
      .reader-lightbox-v4 .reader-lightbox-count{position:absolute;top:max(20px,env(safe-area-inset-top));left:18px;color:#fff;font:13px/1.2 sans-serif}
      .reader-lightbox-v4 .reader-lightbox-credit{position:absolute;left:18px;right:18px;bottom:max(12px,env(safe-area-inset-bottom));color:rgba(255,255,255,.78);font:12px/1.4 sans-serif;text-align:center}
      .reader-legacy-source{display:none!important}.screen-article .reader-gallery{overflow:visible}
    `;
    document.head.appendChild(style);
    const box=document.createElement('div'); box.id='articleLightboxV4'; box.className='reader-lightbox-v4';box.setAttribute('aria-hidden','true');
    box.innerHTML='<button class="lb-close" type="button" aria-label="Закрыть">×</button><button class="lb-prev" type="button" aria-label="Предыдущее фото">‹</button><img alt=""><button class="lb-next" type="button" aria-label="Следующее фото">›</button><div class="reader-lightbox-count"></div><div class="reader-lightbox-credit"></div>';
    document.body.appendChild(box);
    const image=box.querySelector('img'),credit=box.querySelector('.reader-lightbox-credit'),count=box.querySelector('.reader-lightbox-count');
    let items=[],index=0,touchX=null;
    const render=()=>{const item=items[index];if(!item)return;image.src=item.src;image.alt=item.alt||'';credit.textContent=item.credit||'';count.textContent=items.length>1?`${index+1} / ${items.length}`:'';box.querySelector('.lb-prev').hidden=box.querySelector('.lb-next').hidden=items.length<2};
    const step=d=>{if(items.length<2)return;index=(index+d+items.length)%items.length;render()};
    const close=()=>{box.classList.remove('is-open');box.setAttribute('aria-hidden','true');document.body.style.overflow='';image.removeAttribute('src');items=[]};
    box.querySelector('.lb-close').addEventListener('click',close);box.querySelector('.lb-prev').addEventListener('click',()=>step(-1));box.querySelector('.lb-next').addEventListener('click',()=>step(1));
    box.addEventListener('click',e=>{if(e.target===box)close()});
    document.addEventListener('keydown',e=>{if(!box.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')step(-1);if(e.key==='ArrowRight')step(1)});
    box.addEventListener('touchstart',e=>{touchX=e.changedTouches[0]?.clientX??null},{passive:true});
    box.addEventListener('touchend',e=>{if(touchX==null)return;const dx=(e.changedTouches[0]?.clientX??touchX)-touchX;touchX=null;if(Math.abs(dx)>45)step(dx<0?1:-1)},{passive:true});
    document.addEventListener('click',e=>{
      const target=e.target.closest?.('.reader-gallery img,.screen-article .reader-hero img');if(!target)return;
      const article=target.closest('.screen-article');if(!article?.classList.contains('is-active'))return;e.preventDefault();
      const data=(window.MUSEUM_ARTICLES||[]).find(a=>a.title===article.querySelector('.reader-title h1')?.textContent?.trim());
      const dom=[...article.querySelectorAll('.reader-hero img,.reader-gallery img')].filter(img=>img.src);
      const seen=new Set();items=dom.filter(img=>!seen.has(img.src)&&seen.add(img.src)).map(img=>{const d=data?.images?.find(x=>x.src===img.src);return{src:img.currentSrc||img.src,alt:img.alt||'',credit:d?(d.credit||''):(data?.photoCredits?.join(', ')||'')}});
      index=Math.max(0,items.findIndex(x=>x.src===(target.currentSrc||target.src)));render();box.classList.add('is-open');box.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
    });
  }

  function hideMigrationMeta(){
    const reader=document.getElementById('articleReader'); if(!reader)return;
    reader.querySelectorAll('.reader-meta span').forEach(span=>{if(/Оригинал из архива музея|Полный текст страницы пока не получен|служебн/i.test(span.textContent||''))span.remove()});
  }
  function init(){
    enrichData(); installLightbox();
    const reader=document.getElementById('articleReader');
    if(reader)new MutationObserver(hideMigrationMeta).observe(reader,{childList:true,subtree:true});
    hideMigrationMeta();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true}); else init();
})();
