(()=>{
'use strict';
const $=s=>document.querySelector(s),screen=$('.screen-audio');
if(!screen)return;
const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;
const expositionTracks=tracks.filter(t=>t.kind==='exposition');
const halls=Array.isArray(guide.halls)&&guide.halls.length?guide.halls:[...new Set(expositionTracks.map(t=>Number(t.hall)||1))].map(number=>({number,title:`Зал ${number}`}));
const intro={id:'vstuplenie',kind:'intro',title:'Вступление',description:'Бесплатное вступление к аудиогиду.',access:'free',audio:{publicUrl:'assets/audio/vstuplenie/AI-vstuplenie.mp3',status:'available'}};
const ACCESS_KEY='vishtynets_audio_entitlement_v2';
const LEGACY_SESSION_KEY='vishtynets_audio_access_v1';
const HOUR_MS=60*60*1000;
const activeHours=Number(guide?.access?.activeHours)||24;
let entitlement=null,currentTrack=intro,audio=null,audioTrackId=null,expiryTimer=null;
const host=$('#audioGuideTracks')||$('.audio-guide-empty');
if(!host)return;
const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>',pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>',readSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3 3z"/><path d="M8 20V7a3 3 0 0 1 3-3"/><path d="M11 9h5M11 13h5"/></svg>',lockSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3" fill="none"/></svg>',prevSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 6l-6 6 6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>',nextSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const fmt=s=>{s=Number(s);if(!Number.isFinite(s)||s<0)s=0;return `${Math.floor(s/60)}:${String(Math.floor(s%60)).padStart(2,'0')}`};
function emptyEntitlement(){return{state:'none',activatedAt:null,startsAt:null,expiresAt:null,source:null}}
function normalizeEntitlement(value){
 const e=value&&typeof value==='object'?value:emptyEntitlement(),now=Date.now();
 if(e.state==='active'&&Number(e.expiresAt)>0&&Number(e.expiresAt)<=now)return emptyEntitlement();
 if(e.state==='pending')return{state:'pending',activatedAt:Number(e.activatedAt)||now,startsAt:null,expiresAt:null,source:e.source||'unknown'};
 if(e.state==='active'&&Number(e.startsAt)>0&&Number(e.expiresAt)>now)return{state:'active',activatedAt:Number(e.activatedAt)||Number(e.startsAt),startsAt:Number(e.startsAt),expiresAt:Number(e.expiresAt),source:e.source||'unknown'};
 return emptyEntitlement();
}
function loadEntitlement(){
 let value=null;try{value=JSON.parse(localStorage.getItem(ACCESS_KEY)||'null')}catch(_err){}
 let e=normalizeEntitlement(value);
 if(e.state==='none'){
  try{if(sessionStorage.getItem(LEGACY_SESSION_KEY)==='1'){e={state:'pending',activatedAt:Date.now(),startsAt:null,expiresAt:null,source:'legacy_prototype'};localStorage.setItem(ACCESS_KEY,JSON.stringify(e));sessionStorage.removeItem(LEGACY_SESSION_KEY)}}catch(_err){}
 }
 if(value&&e.state==='none'){try{localStorage.removeItem(ACCESS_KEY)}catch(_err){}}
 return e;
}
entitlement=loadEntitlement();
function saveEntitlement(){try{if(entitlement.state==='none')localStorage.removeItem(ACCESS_KEY);else localStorage.setItem(ACCESS_KEY,JSON.stringify(entitlement))}catch(_err){}}
function refreshEntitlement(){entitlement=loadEntitlement();return entitlement}
function paidAccessAvailable(){refreshEntitlement();return entitlement.state==='pending'||entitlement.state==='active'}
function isLocked(track){return track?.access==='paid'&&!paidAccessAvailable()}
function activatePending(source='prototype'){entitlement={state:'pending',activatedAt:Date.now(),startsAt:null,expiresAt:null,source};saveEntitlement();scheduleExpiry()}
function startPaidWindow(){refreshEntitlement();if(entitlement.state!=='pending')return;const now=Date.now();entitlement={...entitlement,state:'active',startsAt:now,expiresAt:now+(activeHours*HOUR_MS)};saveEntitlement();scheduleExpiry();renderTracks();update()}
function scheduleExpiry(){if(expiryTimer){clearTimeout(expiryTimer);expiryTimer=null}refreshEntitlement();if(entitlement.state!=='active')return;const delay=Math.max(0,Number(entitlement.expiresAt)-Date.now());expiryTimer=setTimeout(()=>{entitlement=loadEntitlement();stopAudio();renderTracks();update()},Math.min(delay+250,2147483000))}
const accessModal=document.createElement('div');
accessModal.className='audio-access-modal';accessModal.setAttribute('aria-hidden','true');
accessModal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Продолжить экскурсию</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>Бесплатное вступление доступно всем посетителям. После оплаты или ввода кода откроются ${expositionTracks.length} экспозиций в двух залах, а ${activeHours}-часовой срок начнётся только при первом запуске платного трека.</p><button class="audio-access-test" type="button">Тест: активировать доступ</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Тестовая кнопка имитирует успешную оплату или код. Реальные ЮKassa и проверка кодов подключаются отдельным этапом.</small></section>`;
document.body.appendChild(accessModal);
function openAccess(){accessModal.classList.add('is-open');accessModal.setAttribute('aria-hidden','false')}
function closeAccess(){accessModal.classList.remove('is-open');accessModal.setAttribute('aria-hidden','true')}
accessModal.addEventListener('click',e=>{if(e.target.closest('[data-audio-close]'))closeAccess()});
accessModal.querySelector('.audio-access-test')?.addEventListener('click',()=>{activatePending('prototype');closeAccess();renderTracks();update()});
function url(t){const u=t?.audio?.publicUrl||t?.audio?.url||t?.audio?.src;if(!u)return'';try{return new URL(u,document.baseURI).href}catch{return u}}
function stopAudio(){if(audio){audio.pause();audio.removeAttribute('src');audio.load();audio=null}audioTrackId=null}
function playlist(){const list=[];halls.forEach(h=>{expositionTracks.filter(t=>Number(t.hall)===Number(h.number)).sort((a,b)=>(Number(a.hallOrder)||0)-(Number(b.hallOrder)||0)).forEach(t=>list.push(t))});return list.length?list:expositionTracks.slice()}
function playNext(){const list=playlist(),i=list.findIndex(t=>t.id===audioTrackId);if(i<0||i>=list.length-1){update();return}playTrack(list[i+1])}
function playPrev(){const list=playlist(),i=list.findIndex(t=>t.id===(audioTrackId||currentTrack?.id));if(audio&&Number(audio.currentTime)>3){audio.currentTime=0;update();return}if(i<=0){update();return}playTrack(list[i-1])}
function playTrack(t){
 if(!t)return;
 if(isLocked(t)){openAccess();return}
 const src=url(t);if(!src)return;
 if(audio&&audioTrackId===t.id){audio.paused?audio.play().catch(()=>{}):audio.pause();update();return}
 stopAudio();audio=new Audio(src);audio.preload='metadata';audioTrackId=t.id;currentTrack=t;
 ['loadedmetadata','timeupdate','play','pause','error'].forEach(ev=>audio.addEventListener(ev,update));
 if(t.access==='paid'&&entitlement.state==='pending')audio.addEventListener('playing',startPaidWindow,{once:true});
 audio.addEventListener('ended',()=>{if(t.kind==='intro'){update();return}playNext()});
 audio.play().catch(()=>{});update();
}
function openRead(t){document.querySelector('.audio-guide-transcript-modal')?.remove();const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));const body=esc(t.transcript||'Текст этой дорожки пока недоступен.').replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');const m=document.createElement('div');m.className='audio-guide-transcript-modal';m.innerHTML=`<div class="audio-guide-transcript-backdrop" data-close></div><article class="audio-guide-transcript-panel" role="dialog" aria-modal="true"><button type="button" class="audio-guide-transcript-close" data-close>×</button><span class="eyebrow">Текст дорожки</span><h1>${esc(t.title)}</h1><div class="audio-guide-master-text"><p>${body}</p></div></article>`;document.body.appendChild(m);m.querySelectorAll('[data-close]').forEach(x=>x.onclick=()=>m.remove())}
function renderTrack(t){
 const locked=isLocked(t),c=document.createElement('article');c.className='audio-guide-track-card-v2'+(locked?' is-locked':'');c.dataset.trackId=t.id;
 c.innerHTML=`<button class="audio-guide-track-play" type="button" aria-label="${locked?'Активировать доступ':'Слушать'}">${locked?lockSvg:playSvg}</button><div class="audio-guide-track-copy-v2"><strong>${t.title||''}</strong><p>${t.description||''}</p></div><div class="audio-guide-track-actions"><button class="audio-guide-track-read" type="button" aria-label="${locked?'Активировать доступ':'Читать'}">${readSvg}</button></div>`;
 c.querySelector('.audio-guide-track-play').onclick=e=>{e.preventDefault();e.stopPropagation();playTrack(t)};
 c.querySelector('.audio-guide-track-read').onclick=e=>{e.preventDefault();e.stopPropagation();locked?openAccess():openRead(t)};
 return c;
}
function renderTracks(){
 host.innerHTML='';const list=document.createElement('div');list.className='audio-guide-track-list';
 halls.forEach(h=>{const hs=expositionTracks.filter(t=>Number(t.hall)===Number(h.number));if(!hs.length)return;const s=document.createElement('section');s.className='audio-guide-hall';s.innerHTML=`<header class="audio-guide-hall-head"><div><span>Зал</span><strong>${h.title||`Зал ${h.number}`}</strong></div><small>${hs.length} дорожек</small></header>`;const box=document.createElement('div');box.className='audio-guide-hall-tracks';hs.forEach(t=>box.appendChild(renderTrack(t)));s.appendChild(box);list.appendChild(s)});host.appendChild(list)
}
function placePlayer(p){const voice=screen.querySelector('.audio-guide-voice-selector'),hero=screen.querySelector('.audio-guide-hero');if(voice)voice.insertAdjacentElement('afterend',p);else if(hero)hero.insertAdjacentElement('afterend',p);else if(host)screen.insertBefore(p,host);else screen.appendChild(p)}
function ensurePlayer(){let p=screen.querySelector('.audio-guide-player');if(!p){p=document.createElement('section');p.className='audio-guide-player'}p.classList.add('audio-guide-player-top');p.removeAttribute('aria-disabled');placePlayer(p);p.innerHTML=`<button class="audio-guide-play" type="button" aria-label="Воспроизвести">${playSvg}</button><div class="audio-guide-player-nav"><button class="audio-guide-prev" type="button" aria-label="Предыдущая дорожка">${prevSvg}</button><button class="audio-guide-next" type="button" aria-label="Следующая дорожка">${nextSvg}</button></div><div class="audio-guide-player-info"><strong class="audio-guide-player-title">${currentTrack.title}</strong><span class="audio-guide-player-time">0:00 / 0:00</span></div><input type="range" min="0" max="0" value="0" step="0.1" aria-label="Прогресс плеера">`;p.querySelector('.audio-guide-play').onclick=e=>{e.preventDefault();e.stopPropagation();if(currentTrack)playTrack(currentTrack)};p.querySelector('.audio-guide-prev').onclick=e=>{e.preventDefault();e.stopPropagation();playPrev()};p.querySelector('.audio-guide-next').onclick=e=>{e.preventDefault();e.stopPropagation();playNext()};p.querySelector('input[type=range]').oninput=e=>{if(audio)audio.currentTime=Number(e.target.value)}}
function update(){
 screen.querySelectorAll('.audio-guide-track-card-v2').forEach(c=>{const active=c.dataset.trackId===audioTrackId&&audio&&!audio.paused;c.classList.toggle('is-selected',c.dataset.trackId===audioTrackId);const b=c.querySelector('.audio-guide-track-play');if(b){const t=expositionTracks.find(x=>x.id===c.dataset.trackId);b.innerHTML=isLocked(t)?lockSvg:(active?pauseSvg:playSvg);b.setAttribute('aria-label',isLocked(t)?'Активировать доступ':(active?'Пауза':'Слушать'))}});
 const p=screen.querySelector('.audio-guide-player'),b=p?.querySelector('.audio-guide-play'),title=p?.querySelector('.audio-guide-player-title'),time=p?.querySelector('.audio-guide-player-time'),range=p?.querySelector('input[type=range]');
 if(b)b.innerHTML=audio&&!audio.paused?pauseSvg:playSvg;if(title)title.textContent=currentTrack?.title||'Аудиогид';if(time)time.textContent=`${fmt(audio?.currentTime)} / ${fmt(audio?.duration)}`;if(range){range.max=String(audio?.duration||0);range.value=String(audio?.currentTime||0)}
 const list=playlist(),idx=list.findIndex(t=>t.id===(audioTrackId||currentTrack?.id)),prevBtn=p?.querySelector('.audio-guide-prev'),nextBtn=p?.querySelector('.audio-guide-next');if(prevBtn)prevBtn.disabled=idx<=0&&!(audio&&Number(audio.currentTime)>3);if(nextBtn)nextBtn.disabled=idx<0||idx>=list.length-1;
}
function init(){ensurePlayer();renderTracks();update();scheduleExpiry()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
