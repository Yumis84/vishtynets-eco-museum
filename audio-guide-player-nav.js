(()=>{
'use strict';
const init=()=>{
 const player=document.querySelector('.audio-guide-player');
 const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
 if(!player||!guide?.tracks?.length||player.dataset.navBound==='1')return;
 player.dataset.navBound='1';
 const ordered=guide.tracks.filter(t=>t.kind==='exposition').slice().sort((a,b)=>((Number(a.hall)||1)-(Number(b.hall)||1))||((Number(a.hallOrder)||Number(a.number)||0)-(Number(b.hallOrder)||Number(b.number)||0)));
 const getCurrent=()=>document.querySelector('.audio-guide-track-card-v2.is-selected')?.dataset.trackId||null;
 const activate=t=>{const card=document.querySelector(`.audio-guide-track-card-v2[data-track-id="${CSS.escape(t.id)}"]`);if(card){card.classList.add('is-selected');card.click()}};
 const nav=document.createElement('div');nav.className='audio-guide-player-nav';nav.innerHTML='<button type="button" data-player-prev aria-label="Предыдущая дорожка"><svg viewBox="0 0 24 24"><path d="M15 5 8 12l7 7"/></svg></button><button type="button" data-player-next aria-label="Следующая дорожка"><svg viewBox="0 0 24 24"><path d="m9 5 7 7-7 7"/></svg></button>';
 player.appendChild(nav);
 const read=document.createElement('button');read.type='button';read.className='audio-guide-player-read';read.setAttribute('aria-label','Читать полный текст');read.innerHTML='<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 0-3 3z"/><path d="M8 20V7a3 3 0 0 1 3-3"/><path d="M11 9h5M11 13h5"/></svg>';
 player.appendChild(read);
 const prev=nav.firstElementChild,next=nav.lastElementChild;
 const move=(e,d)=>{e.preventDefault();e.stopImmediatePropagation();const i=ordered.findIndex(t=>t.id===getCurrent()),n=ordered[i+d];if(n)activate(n)};
 prev.addEventListener('click',e=>move(e,-1),true);next.addEventListener('click',e=>move(e,1),true);
 read.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();document.querySelector('.audio-guide-feature strong')?.textContent==='Читать'&&document.querySelector('.audio-guide-feature')?.click()});
 const sync=()=>{const i=ordered.findIndex(t=>t.id===getCurrent());prev.disabled=i<=0;next.disabled=i<0||i>=ordered.length-1};
 new MutationObserver(sync).observe(player,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['class']});sync();
 const s=document.createElement('style');s.dataset.audioguidePlayerNav='9';s.textContent=`
.audio-guide-player{position:relative!important;grid-template-columns:48px minmax(0,1fr) 48px!important;align-items:center!important;padding:13px 13px 64px!important;opacity:1!important}
.audio-guide-player-nav{position:absolute!important;left:50%!important;bottom:13px!important;transform:translateX(-50%)!important;width:auto!important;display:flex!important;gap:42px!important;align-items:center!important;justify-content:center!important;margin:0!important;padding:0!important}
.audio-guide-player-nav button{width:44px!important;height:44px!important;min-width:44px!important;border:1px solid rgba(54,81,63,.28)!important;border-radius:50%!important;background:#f8f4eb!important;color:var(--forest,#36513f)!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 3px 9px rgba(54,81,63,.08)!important}
.audio-guide-player-nav button svg{width:22px!important;height:22px!important;stroke:currentColor!important;fill:none!important;stroke-width:2!important;stroke-linecap:round!important;stroke-linejoin:round!important}
.audio-guide-player-nav button:disabled{opacity:.3!important}
.audio-guide-player-read{grid-column:3!important;width:44px!important;height:44px!important;border:1px solid rgba(54,81,63,.28)!important;border-radius:50%!important;background:#f8f4eb!important;color:var(--forest,#36513f)!important;display:flex!important;align-items:center!important;justify-content:center!important;box-shadow:0 3px 9px rgba(54,81,63,.08)!important;padding:0!important}
.audio-guide-player-read svg{width:21px!important;height:21px!important;stroke:currentColor!important;fill:none!important;stroke-width:1.8!important;stroke-linecap:round!important;stroke-linejoin:round!important}
.audio-guide-player-read:active,.audio-guide-player-nav button:active{background:#e8eee6!important}
`;document.head.appendChild(s)
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();