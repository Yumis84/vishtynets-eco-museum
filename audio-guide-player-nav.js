(()=>{
'use strict';
const init=()=>{
  const player=document.querySelector('.audio-guide-player');
  const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
  if(!player||!guide?.tracks?.length||player.dataset.navBound==='1')return;
  player.dataset.navBound='1';
  const tracks=guide.tracks, intro=tracks.find(t=>t.kind==='intro')||tracks[0];
  const expositions=tracks.filter(t=>t.kind==='exposition').slice().sort((a,b)=>((Number(a.hall)||1)-(Number(b.hall)||1))||((Number(a.hallOrder)||Number(a.number)||0)-(Number(b.hallOrder)||Number(b.number)||0)));
  const ordered=[intro,...expositions];
  const getCurrent=()=>{const selected=document.querySelector('.audio-guide-track-card-v2.is-selected')?.dataset.trackId;if(selected)return ordered.find(t=>t.id===selected)||intro;const title=player.querySelector('strong')?.textContent?.trim();return ordered.find(t=>t.title===title)||intro};
  const activate=t=>{if(!t)return;if(t.kind==='intro'){document.querySelector('.audio-guide-start')?.click();return}const card=document.querySelector(`.audio-guide-track-card-v2[data-track-id="${CSS.escape(t.id)}"]`);if(!card)return;card.click();setTimeout(()=>{const audio=player.querySelector('audio');audio?.play().catch(()=>{});},150)};
  const nav=document.createElement('div');nav.className='audio-guide-player-nav';nav.innerHTML='<button type="button" data-player-prev aria-label="Предыдущая дорожка">‹</button><button type="button" data-player-next aria-label="Следующая дорожка">›</button>';player.appendChild(nav);
  const prev=nav.querySelector('[data-player-prev]'),next=nav.querySelector('[data-player-next]');
  const sync=()=>{const current=getCurrent(),i=ordered.findIndex(t=>t.id===current?.id);prev.disabled=i<=0;next.disabled=i<0||i>=ordered.length-1};
  prev.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const i=ordered.findIndex(t=>t.id===getCurrent()?.id);if(i>0)activate(ordered[i-1])});
  next.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();const i=ordered.findIndex(t=>t.id===getCurrent()?.id);if(i>=0&&i<ordered.length-1)activate(ordered[i+1])});
  new MutationObserver(sync).observe(player,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});sync();
  if(!document.querySelector('style[data-audioguide-player-nav]')){const s=document.createElement('style');s.dataset.audioguidePlayerNav='1';s.textContent='.audio-guide-player-nav{width:100%;box-sizing:border-box;display:flex;gap:16px;justify-content:center;align-items:center;margin:14px auto 0;padding:0 8px}.audio-guide-player-nav button{box-sizing:border-box;width:46px;height:46px;min-width:46px;max-width:46px;padding:0;margin:0;border:1px solid #c8cec4;border-radius:50%;background:#f7f6f0;color:#344638;font-size:28px;font-weight:500;line-height:46px;text-align:center;display:block;cursor:pointer;box-shadow:0 2px 6px rgba(0,0,0,.08)}.audio-guide-player-nav button:active{transform:scale(.96)}.audio-guide-player-nav button:disabled{opacity:.35;cursor:default}.audio-guide-transcript-note{font-size:16px!important;line-height:1.65!important;margin-top:16px!important}.audio-guide-transcript-note p{margin:0 0 12px}';document.head.appendChild(s)}
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();new MutationObserver(init).observe(document.body,{childList:true,subtree:true});

// Robust resume fallback: when the sequential mode is paused, resume the exact current track
// instead of restarting the sequence or losing the current position.
document.addEventListener('click',event=>{
  const feature=event.target.closest('.audio-guide-features .audio-guide-feature');
  if(!feature||feature.dataset.sequencePaused!=='1')return;
  event.preventDefault();
  event.stopImmediatePropagation();
  const selected=document.querySelector('.audio-guide-track-card-v2.is-selected');
  if(selected){
    selected.click();
    setTimeout(()=>document.querySelector('.audio-guide-player audio')?.play().catch(()=>{}),120);
    return;
  }
  const start=document.querySelector('.audio-guide-start');
  if(start&&!start.disabled){
    start.click();
    setTimeout(()=>document.querySelector('.audio-guide-player audio')?.play().catch(()=>{}),120);
  }
},true);
})();