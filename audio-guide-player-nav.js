(()=>{
'use strict';
const init=()=>{
 const player=document.querySelector('.audio-guide-player');
 if(!player||player.dataset.navBound==='1')return;
 player.dataset.navBound='1';
 // Navigation/read buttons intentionally removed from the player.
 // The player now contains only the standard playback controls/progress.
 const old=player.querySelectorAll('.audio-guide-player-nav,.audio-guide-player-read');
 old.forEach(el=>el.remove());
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();