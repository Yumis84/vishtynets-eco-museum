(()=>{
'use strict';
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
})();