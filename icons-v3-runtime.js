(()=>{
'use strict';
const iconLinks=[...document.querySelectorAll('link[href*="icons-v3.css"]')];
if(iconLinks.length){
  iconLinks[0].href='icons-v3.css?v=3';
  iconLinks.slice(1).forEach(link=>link.remove());
}
if(!document.querySelector('link[data-v3-typography]')){
  const typography=document.createElement('link');
  typography.rel='stylesheet';
  typography.href='typography-v3.css?v=1';
  typography.dataset.v3Typography='1';
  document.head.appendChild(typography);
}
const I=()=>window.MuseumIcons;
const catIcon=label=>({'Все':'filter','Природа':'leaf','История':'history','Камни':'stone','Мосты':'map','Культура':'culture','Музей':'museum'}[label]||'pin');
function all(root,sel){const a=[];if(root?.matches?.(sel))a.push(root);root?.querySelectorAll?.(sel).forEach(x=>a.push(x));return a}
function labeled(el,name,label){if(!el||el.querySelector(':scope > .v3-svg-icon')||!I())return;el.innerHTML=`${I().svg(name)}<span class="v3-label">${label}</span>`}
function one(el,name){if(!el||el.querySelector(':scope > .v3-svg-icon')||!I())return;el.innerHTML=I().svg(name)}
function stripLabel(el,marker){return (el.textContent||'').replace(marker,'').trim()}
function pass(root=document){
  all(root,'[data-explore-category]').forEach(el=>{if(el.querySelector(':scope > .v3-svg-icon')||!I())return;const label=el.dataset.exploreCategory||'Все';el.innerHTML=`${I().svg(catIcon(label))}<span class="v3-category-label">${label}</span>`});
  all(root,'#mapFilterButton').forEach(el=>labeled(el,'filter','Фильтры'));
  all(root,'#mapLayersButton').forEach(el=>labeled(el,'layers','Слои'));
  all(root,'#favoritesToggle').forEach(el=>labeled(el,'heart','Избранное'));
  all(root,'#articleBack').forEach(el=>labeled(el,'back','Назад'));
  all(root,'#articleFavorite').forEach(el=>one(el,'heart'));
  all(root,'.ai-input button').forEach(el=>one(el,'arrow'));
  all(root,'.guest-pin span').forEach(el=>one(el,'bed'));
  all(root,'.menu-footer a[href^="mailto:"]').forEach(el=>one(el,'contact'));
  all(root,'.inline-link').forEach(el=>{if(el.querySelector(':scope > .v3-svg-icon')||!I())return;const label=stripLabel(el,'→');el.innerHTML=`<span class="v3-label">${label}</span>${I().svg('arrow')}`});
  all(root,'.place-distance').forEach(el=>{if(el.querySelector(':scope > .v3-svg-icon')||!I())return;const label=stripLabel(el,'⌖');el.innerHTML=`${I().svg('pin')}<span class="v3-label">${label}</span>`});
  all(root,'.reader-meta span').forEach(el=>{if(el.querySelector(':scope > .v3-svg-icon')||!I())return;const t=(el.textContent||'').trim();if(t.startsWith('◷'))el.innerHTML=`${I().svg('clock')}<span class="v3-label">${stripLabel(el,'◷')}</span>`});
}
pass();
new MutationObserver(ms=>ms.forEach(m=>m.addedNodes.forEach(n=>{if(n.nodeType===1)pass(n);else if(n.nodeType===3&&n.parentElement)pass(n.parentElement)}))).observe(document.body,{childList:true,subtree:true});

let exploreV3Loading=false;
function loadExploreV3(){
  if(exploreV3Loading||document.querySelector('script[data-explore-v3-safe]'))return;
  exploreV3Loading=true;
  if(!document.querySelector('link[data-explore-v3-safe]')){
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='explore-v3.css?v=4';
    css.dataset.exploreV3Safe='1';
    document.head.appendChild(css);
  }
  const script=document.createElement('script');
  script.src='explore-v3.js?v=4';
  script.dataset.exploreV3Safe='1';
  script.onload=()=>{exploreV3Loading=false};
  script.onerror=()=>{exploreV3Loading=false;script.remove()};
  document.body.appendChild(script);
}

let mapV3Loading=false;
function loadMapV3(){
  if(mapV3Loading||document.querySelector('script[data-map-v3-safe]'))return;
  mapV3Loading=true;
  if(!document.querySelector('link[data-map-v3-safe]')){
    const css=document.createElement('link');
    css.rel='stylesheet';
    css.href='map-v3.css?v=2';
    css.dataset.mapV3Safe='1';
    document.head.appendChild(css);
  }
  const script=document.createElement('script');
  script.src='map-v3.js?v=2';
  script.dataset.mapV3Safe='1';
  script.onload=()=>{mapV3Loading=false};
  script.onerror=()=>{mapV3Loading=false;script.remove()};
  document.body.appendChild(script);
}

document.addEventListener('click',e=>{
  if(e.target.closest?.('[data-nav="explore"]'))loadExploreV3();
  if(e.target.closest?.('[data-nav="map"]'))loadMapV3();
},{capture:true});
})();
