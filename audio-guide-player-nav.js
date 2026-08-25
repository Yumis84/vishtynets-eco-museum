(()=>{
'use strict';
const init=()=>{
 const player=document.querySelector('.audio-guide-player');
 const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
 if(!player||!guide?.tracks?.length||player.dataset.navBound==='1')return;
 player.dataset.navBound='1';
 const tracks=guide.tracks, intro=tracks.find(t=>t.kind==='intro')||tracks[0];
 const ordered=[intro,...tracks.filter(t=>t.kind==='exposition').slice().sort((a,b)=>((Number(a.hall)||1)-(Number(b.hall)||1))||((Number(a.hallOrder)||Number(a.number)||0)-(Number(b.hallOrder)||Number(b.number)||0)))];
 const getCurrent=()=>{const id=document.querySelector('.audio-guide-track-card-v2.is-selected')?.dataset.trackId;return ordered.find(t=>t.id===id)||ordered.find(t=>t.title===player.querySelector('strong')?.textContent?.trim())||intro};
 const activate=t=>{if(!t)return;const card=document.querySelector(`.audio-guide-track-card-v2[data-track-id="${CSS.escape(t.id)}"]`);if(!card)return;player.querySelector('audio')?.pause();card.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));setTimeout(()=>player.querySelector('audio')?.play().catch(()=>{}),180)};
 const nav=document.createElement('div');nav.className='audio-guide-player-nav';nav.innerHTML='<button type="button" data-player-prev aria-label="Предыдущая дорожка"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><button type="button" data-player-next aria-label="Следующая дорожка"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>';player.appendChild(nav);
 const prev=nav.firstElementChild,next=nav.lastElementChild;
 const move=(e,d)=>{e.preventDefault();e.stopImmediatePropagation();const i=ordered.findIndex(t=>t.id===getCurrent()?.id),n=ordered[i+d];if(n)activate(n)};
 prev.addEventListener('click',e=>move(e,-1),true);next.addEventListener('click',e=>move(e,1),true);
 const sync=()=>{const i=ordered.findIndex(t=>t.id===getCurrent()?.id);prev.disabled=i<=0;next.disabled=i<0||i>=ordered.length-1};
 new MutationObserver(sync).observe(player,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});sync();
 const s=document.createElement('style');s.dataset.audioguidePlayerNav='5';s.textContent='.audio-guide-player-nav{grid-column:1 / -1!important;width:100%!important;min-width:0!important;max-width:100%!important;box-sizing:border-box!important;display:flex!important;flex:0 0 100%!important;gap:12px!important;justify-content:center!important;align-items:center!important;margin:14px 0 0!important;padding:0!important;position:static!important;left:auto!important;right:auto!important;transform:none!important;float:none!important}.audio-guide-player-nav button{box-sizing:border-box!important;width:44px!important;height:44px!important;min-width:44px!important;max-width:44px!important;padding:0!important;margin:0!important;border:1px solid rgba(54,81,63,.25)!important;border-radius:50%!important;background:transparent!important;color:var(--forest,#36513f)!important;display:flex!important;align-items:center!important;justify-content:center!important;line-height:1!important;box-shadow:none!important;flex:0 0 44px!important}.audio-guide-player-nav button svg{width:19px!important;height:19px!important;display:block!important;stroke:currentColor!important;fill:none!important;stroke-width:2!important;stroke-linecap:round!important;stroke-linejoin:round!important}.audio-guide-player-nav button:active{background:rgba(54,81,63,.08)!important}.audio-guide-player-nav button:disabled{opacity:.3!important}.audio-guide-transcript-note{font-size:16px!important;line-height:1.65!important;margin-top:16px!important}.audio-guide-transcript-note p{margin:0 0 12px}';document.head.appendChild(s)
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();