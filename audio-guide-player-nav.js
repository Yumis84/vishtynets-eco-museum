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
 const activate=t=>{if(!t)return;const card=document.querySelector(`.audio-guide-track-card-v2[data-track-id="${CSS.escape(t.id)}"]`);if(!card)return;const audio=player.querySelector('audio');if(audio)audio.pause();card.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));setTimeout(()=>{const a=player.querySelector('audio');if(a){a.currentTime=a.currentTime||0;a.play().catch(()=>{})}},180)};
 const nav=document.createElement('div');nav.className='audio-guide-player-nav';nav.innerHTML='<button type="button" data-player-prev aria-label="Предыдущая дорожка"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5 8 12l7 7"/></svg></button><button type="button" data-player-next aria-label="Следующая дорожка"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 5 7 7-7 7"/></svg></button>';player.appendChild(nav);
 const prev=nav.firstElementChild,next=nav.lastElementChild;
 const sync=()=>{const i=ordered.findIndex(t=>t.id===getCurrent()?.id);prev.disabled=i<=0;next.disabled=i<0||i>=ordered.length-1};
 const go=e=>{e.preventDefault();e.stopImmediatePropagation();const i=ordered.findIndex(t=>t.id===getCurrent()?.id);if(i>=0&&i<ordered.length-1)activate(ordered[i+1])};
 const back=e=>{e.preventDefault();e.stopImmediatePropagation();const i=ordered.findIndex(t=>t.id===getCurrent()?.id);if(i>0)activate(ordered[i-1])};
 prev.addEventListener('click',back,true);next.addEventListener('click',go,true);
 new MutationObserver(sync).observe(player,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});sync();
 const s=document.createElement('style');s.dataset.audioguidePlayerNav='4';s.textContent='.audio-guide-player-nav{grid-column:1 / -1!important;width:100%!important;min-width:0!important;box-sizing:border-box!important;display:flex!important;flex:0 0 100%!important;gap:10px!important;justify-content:center!important;align-items:center!important;margin:12px 0 0!important;padding:0!important;position:relative!important;left:auto!important;right:auto!important}.audio-guide-player-nav button{box-sizing:border-box!important;width:48px!important;height:48px!important;min-width:48px!important;max-width:48px!important;padding:0!important;margin:0!important;border:0!important;border-radius:50%!important;background:var(--forest)!important;color:#fff!important;display:grid!important;place-items:center!important;line-height:1!important;box-shadow:0 5px 12px rgba(54,81,63,.18)!important}.audio-guide-player-nav button svg{width:21px!important;height:21px!important;stroke:currentColor!important;fill:none!important;stroke-width:1.9!important;stroke-linecap:round!important;stroke-linejoin:round!important}.audio-guide-player-nav button:disabled{opacity:.35!important}.audio-guide-transcript-note{font-size:16px!important;line-height:1.65!important;margin-top:16px!important}.audio-guide-transcript-note p{margin:0 0 12px}';document.head.appendChild(s)
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();