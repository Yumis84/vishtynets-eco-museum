(()=>{
'use strict';
const init=()=>{
  const player=document.querySelector('.audio-guide-player');
  const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
  if(!player||!guide?.tracks?.length||player.dataset.navBound==='1')return;
  player.dataset.navBound='1';
  const tracks=guide.tracks;
  const intro=tracks.find(t=>t.kind==='intro')||tracks[0];
  const expositions=tracks.filter(t=>t.kind==='exposition').slice().sort((a,b)=>((Number(a.hall)||1)-(Number(b.hall)||1))||((Number(a.hallOrder)||Number(a.number)||0)-(Number(b.hallOrder)||Number(b.number)||0)));
  const ordered=[intro,...expositions];
  const getCurrent=()=>{
    const selected=document.querySelector('.audio-guide-track-card-v2.is-selected')?.dataset.trackId;
    if(selected)return ordered.find(t=>t.id===selected)||intro;
    const title=player.querySelector('strong')?.textContent?.trim();
    return ordered.find(t=>t.title===title)||intro;
  };
  const activate=t=>{
    if(!t)return;
    if(t.kind==='intro'){
      document.querySelector('.audio-guide-start')?.click();
      return;
    }
    const card=document.querySelector(`.audio-guide-track-card-v2[data-track-id="${CSS.escape(t.id)}"]`);
    card?.scrollIntoView({behavior:'smooth',block:'center'});
    card?.click();
  };
  const nav=document.createElement('div');
  nav.className='audio-guide-player-nav';
  nav.innerHTML='<button type="button" data-player-prev aria-label="Предыдущая дорожка">‹ Предыдущая</button><button type="button" data-player-next aria-label="Следующая дорожка">Следующая ›</button>';
  player.appendChild(nav);
  const prev=nav.querySelector('[data-player-prev]'),next=nav.querySelector('[data-player-next]');
  const sync=()=>{
    const current=getCurrent(),i=Math.max(0,ordered.findIndex(t=>t.id===current?.id));
    prev.disabled=i<=0; next.disabled=i<0||i>=ordered.length-1;
  };
  prev.addEventListener('click',()=>{const i=ordered.findIndex(t=>t.id===getCurrent()?.id);if(i>0)activate(ordered[i-1]);});
  next.addEventListener('click',()=>{const i=ordered.findIndex(t=>t.id===getCurrent()?.id);if(i>=0&&i<ordered.length-1)activate(ordered[i+1]);});
  new MutationObserver(sync).observe(player,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});
  sync();
  if(!document.querySelector('style[data-audioguide-player-nav]')){
    const s=document.createElement('style');s.dataset.audioguidePlayerNav='1';s.textContent='.audio-guide-player-nav{display:flex;gap:10px;justify-content:space-between;margin-top:14px}.audio-guide-player-nav button{flex:1;min-height:44px;border:1px solid #c8cec4;border-radius:12px;background:#f7f6f0;color:#344638;font-size:15px;font-weight:600;cursor:pointer}.audio-guide-player-nav button:disabled{opacity:.4;cursor:default}.audio-guide-transcript-note{font-size:16px!important;line-height:1.65!important;margin-top:16px!important}.audio-guide-transcript-note p{margin:0 0 12px}';document.head.appendChild(s);
  }
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();
