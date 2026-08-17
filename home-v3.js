(function(){
  'use strict';
  const points=window.MUSEUM_POINTS||[];
  const articles=window.MUSEUM_ARTICLES||[];
  const byPoint=id=>points.find(p=>p.id===id);
  const byArticle=id=>articles.find(a=>a.id===id);
  const esc=s=>String(s??'').replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));
  const icon=p=>({Музей:'⌂',Мосты:'⌁',Озёра:'≈',Валуны:'◆',Архитектура:'⌂','Реки и родники':'≈'}[p.category]||'⌖');
  const tone=p=>p.category==='Мосты'?'bridge':p.category==='Озёра'?'lake':p.category==='Валуны'?'legend':'';

  function openRelatedArticle(point){
    const article=(point.articleIds||[]).map(byArticle).find(Boolean);
    if(!article){
      document.querySelector('[data-nav="explore"]')?.click();
      const input=document.querySelector('#exploreSearch');
      if(input){input.value=point.name;input.dispatchEvent(new Event('input',{bubbles:true}));}
      return;
    }
    document.querySelector('[data-nav="articles"]')?.click();
    const input=document.querySelector('#articleSearch');
    if(input){input.value=article.title;input.dispatchEvent(new Event('input',{bubbles:true}));}
    requestAnimationFrame(()=>document.querySelector(`#articleList [data-article-id="${article.id}"]`)?.click());
  }

  const target=document.querySelector('#homePlaces');
  if(target){
    const picks=['poi_tokarevka_bridge','poi_vishtynets_lake','poi_devils_stone','poi_gross_rominten_church'].map(byPoint).filter(Boolean);
    target.innerHTML=picks.map(p=>`<button class="home-place-card ${tone(p)}" type="button" data-home-place="${esc(p.id)}"><span class="place-symbol">${icon(p)}</span><div class="kicker">${esc((p.categories||[])[0]||p.category)}</div><h3>${esc(p.name)}</h3><p>${esc(p.shortDescription)}</p><span class="home-place-open">Открыть материал →</span></button>`).join('');
    target.querySelectorAll('[data-home-place]').forEach(card=>card.addEventListener('click',()=>{
      const p=byPoint(card.dataset.homePlace);if(p)openRelatedArticle(p);
    }));
  }
})();