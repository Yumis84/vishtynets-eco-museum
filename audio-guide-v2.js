(()=>{
'use strict';
const $=s=>document.querySelector(s);
const screen=$('.screen-audio');
if(!screen)return;

const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;

const introTrack=tracks.find(t=>t.kind==='intro')||tracks[0];
const expositionTracks=tracks.filter(t=>t.kind==='exposition');
const halls=Array.isArray(guide?.halls)&&guide.halls.length
  ?guide.halls
  :[...new Set(expositionTracks.map(t=>Number(t.hall)||1))].map(number=>({number,title:`Зал ${number}`}));

const ACCESS_KEY='vishtynets_audio_entitlement_v2';
const LEGACY_SESSION_KEY='vishtynets_audio_access_v1';
const HOUR_MS=60*60*1000;
const activeHours=Number(guide?.access?.activeHours)||24;
let currentTrack=introTrack||null;
let audio=null;
let audioTrackId=null;
let expiryTimer=null;

const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
const lockSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
const fmt=n=>{
  if(!Number.isFinite(Number(n))||Number(n)<=0)return null;
  n=Math.floor(Number(n));
  const m=Math.floor(n/60),s=n%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};
const isAwaitingSiteUpload=track=>track?.audio?.status==='awaiting_site_upload';
const emptyEntitlement=()=>({state:'none',activatedAt:null,startsAt:null,expiresAt:null,source:null});

function normalizeEntitlement(value){
  const e=value&&typeof value==='object'?value:emptyEntitlement();
  const now=Date.now();
  if(e.state==='active'&&Number(e.expiresAt)>0&&Number(e.expiresAt)<=now)return emptyEntitlement();
  if(e.state==='pending')return {state:'pending',activatedAt:Number(e.activatedAt)||now,startsAt:null,expiresAt:null,source:e.source||'unknown'};
  if(e.state==='active'&&Number(e.startsAt)>0&&Number(e.expiresAt)>now){
    return {state:'active',activatedAt:Number(e.activatedAt)||Number(e.startsAt),startsAt:Number(e.startsAt),expiresAt:Number(e.expiresAt),source:e.source||'unknown'};
  }
  return emptyEntitlement();
}
function loadEntitlement(){
  let value=null;
  try{value=JSON.parse(localStorage.getItem(ACCESS_KEY)||'null')}catch(_err){}
  let e=normalizeEntitlement(value);
  if(e.state==='none'){
    try{
      if(sessionStorage.getItem(LEGACY_SESSION_KEY)==='1'){
        e={state:'pending',activatedAt:Date.now(),startsAt:null,expiresAt:null,source:'legacy_prototype'};
        localStorage.setItem(ACCESS_KEY,JSON.stringify(e));
        sessionStorage.removeItem(LEGACY_SESSION_KEY);
      }
    }catch(_err){}
  }
  if(value&&e.state==='none'){
    try{localStorage.removeItem(ACCESS_KEY)}catch(_err){}
  }
  return e;
}
let entitlement=loadEntitlement();

function saveEntitlement(){
  try{
    if(entitlement.state==='none')localStorage.removeItem(ACCESS_KEY);
    else localStorage.setItem(ACCESS_KEY,JSON.stringify(entitlement));
  }catch(_err){}
}
function refreshEntitlement(){
  const before=entitlement.state;
  entitlement=loadEntitlement();
  return before!=='none'&&entitlement.state==='none';
}
function paidAccessAvailable(){
  refreshEntitlement();
  return entitlement.state==='pending'||entitlement.state==='active';
}
function isLocked(track){
  return track?.access==='paid'&&!paidAccessAvailable();
}
function activatePending(source='prototype'){
  entitlement={state:'pending',activatedAt:Date.now(),startsAt:null,expiresAt:null,source};
  saveEntitlement();
  scheduleExpiry();
}
function startPaidWindow(){
  refreshEntitlement();
  if(entitlement.state!=='pending')return;
  const now=Date.now();
  entitlement={...entitlement,state:'active',startsAt:now,expiresAt:now+(activeHours*HOUR_MS)};
  saveEntitlement();
  scheduleExpiry();
  renderTracks();
  updateAccessCopy();
}
function remainingText(){
  refreshEntitlement();
  if(entitlement.state==='pending')return `${activeHours} ч начнутся с первого платного воспроизведения`;
  if(entitlement.state!=='active')return null;
  const ms=Math.max(0,Number(entitlement.expiresAt)-Date.now());
  const totalMinutes=Math.ceil(ms/60000);
  const h=Math.floor(totalMinutes/60),m=totalMinutes%60;
  if(h>0)return `осталось ${h} ч ${m} мин`;
  return `осталось ${m} мин`;
}
function scheduleExpiry(){
  if(expiryTimer){clearTimeout(expiryTimer);expiryTimer=null}
  refreshEntitlement();
  if(entitlement.state!=='active')return;
  const delay=Math.max(0,Number(entitlement.expiresAt)-Date.now());
  expiryTimer=setTimeout(()=>{
    entitlement=loadEntitlement();
    stopAudio();
    renderTracks();
    updateAccessCopy();
    renderPlayer(currentTrack,'Срок доступа завершён. Активируйте аудиогид снова, чтобы продолжить.');
  },Math.min(delay+250,2147483000));
}

const badge=$('.audio-guide-badge');
if(badge)badge.innerHTML=`<i></i>${halls.length} зала · ${expositionTracks.length} экспозиций`;
const heroText=$('.audio-guide-hero p');
if(heroText)heroText.textContent='Сначала послушайте бесплатное приветствие. Ниже — восемь экспозиций, разделённых по двум залам музея.';
const progressHead=$('.audio-guide-progress-head span');
if(progressHead)progressHead.textContent=`0 из ${expositionTracks.length} экспозиций`;
const start=$('.audio-guide-start');
if(start){
  start.disabled=!introTrack?.audio?.publicUrl;
  start.textContent=introTrack?.audio?.publicUrl?'Слушать приветствие':'Приветствие пока недоступно';
}
const note=$('.audio-guide-note');
const count=$('.audio-guide-section-head>span');
if(count)count.textContent=`${expositionTracks.length} экспозиций`;
const heading=$('.audio-guide-section-head h2');
if(heading)heading.textContent='Экспозиции по залам';

function updateAccessCopy(){
  if(!note)return;
  refreshEntitlement();
  if(entitlement.state==='pending'){
    note.textContent=`Доступ активирован. ${activeHours} часов начнутся только с первого запуска платной экспозиции.`;
  }else if(entitlement.state==='active'){
    note.textContent=`Экспозиции открыты · ${remainingText()}.`;
  }else{
    note.textContent='Приветствие доступно бесплатно. Все 8 экспозиций видны ниже и откроются после активации аудиогида.';
  }
}

const host=$('.audio-guide-empty');
if(host){
  host.className='audio-guide-empty audio-guide-track-list';
  host.innerHTML='';
}

const player=$('.audio-guide-player');
const playerBtn=$('.audio-guide-play');
const transcriptPanel=document.createElement('div');
transcriptPanel.className='audio-guide-transcript-note';
transcriptPanel.hidden=true;
player?.insertAdjacentElement('afterend',transcriptPanel);
if(player){
  player.removeAttribute('aria-disabled');
  player.classList.add('is-ready');
}

const modal=document.createElement('div');
modal.className='audio-access-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Продолжить экскурсию</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>Бесплатное приветствие доступно всем посетителям. После оплаты или ввода кода откроются 8 экспозиций в двух залах, а ${activeHours}-часовой срок начнётся только при первом запуске платного трека.</p><button class="audio-access-test-v2" type="button">Тест: активировать доступ</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Тестовая кнопка имитирует успешную оплату или код. Реальные ЮKassa и проверка кодов подключаются отдельным этапом.</small></section>`;
document.body.appendChild(modal);

function openAccess(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
function closeAccess(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}

function syncIntroButton(track,playing){
  if(!start)return;
  const introIsPlaying=Boolean(track&&introTrack&&track.id===introTrack.id&&playing);
  const introIsPaused=Boolean(audio&&introTrack&&audioTrackId===introTrack.id&&audio.paused&&!audio.ended&&audio.currentTime>0);
  start.disabled=!introTrack?.audio?.publicUrl;
  if(introIsPlaying){
    start.textContent='Пауза';
    start.setAttribute('aria-label','Поставить приветствие на паузу');
  }else if(introIsPaused){
    start.textContent='Продолжить приветствие';
    start.setAttribute('aria-label','Продолжить приветствие');
  }else{
    start.textContent=introTrack?.audio?.publicUrl?'Слушать приветствие':'Приветствие пока недоступно';
    start.setAttribute('aria-label','Слушать приветствие');
  }
}

function syncPlaybackButtons(track,playing){
  if(playerBtn){
    playerBtn.innerHTML=playing?pauseSvg:playSvg;
    playerBtn.setAttribute('aria-label',`${playing?'Пауза':'Воспроизвести'} ${track?.title||'трек'}`);
  }
  syncIntroButton(track,playing);
  document.querySelectorAll('.audio-guide-track-action').forEach(btn=>{
    const card=btn.closest('.audio-guide-track-card-v2');
    if(!card)return;
    if(card.classList.contains('is-locked')){
      btn.innerHTML=lockSvg;
      return;
    }
    const isCurrent=Boolean(track&&card.dataset.trackId===track.id);
    btn.innerHTML=isCurrent&&playing?pauseSvg:playSvg;
  });
}

function stopAudio(){
  const previous=audio;
  audio=null;
  audioTrackId=null;
  if(previous){
    try{previous.pause()}catch(_err){}
  }
  syncPlaybackButtons(null,false);
}

function renderPlayer(track,message){
  currentTrack=track;
  if(transcriptPanel){
    const transcriptIsVerified=track?.transcriptStatus!=='draft_pre_recording';
    const transcript=transcriptIsVerified?String(track?.transcript||'').trim():'';
    transcriptPanel.hidden=!transcript;
    transcriptPanel.textContent=transcript?`Текст: ${transcript}`:'';
  }
  const strong=player?.querySelector('strong');
  const small=player?.querySelector('small');
  if(strong)strong.textContent=track?.title||'Плеер аудиогида';
  const duration=fmt(track?.duration);
  if(small)small.textContent=message||[track?.access==='free'?'Бесплатно':remainingText()||'После активации',duration].filter(Boolean).join(' · ');
  if(player)player.classList.toggle('is-waiting-audio',!track?.audio?.publicUrl);
  if(playerBtn){
    playerBtn.disabled=false;
    playerBtn.innerHTML=playSvg;
    playerBtn.setAttribute('aria-label',`Воспроизвести ${track?.title||'трек'}`);
  }
  document.querySelectorAll('.audio-guide-track-card-v2').forEach(card=>card.classList.toggle('is-selected',card.dataset.trackId===track?.id));
}

function showTrack(track){
  if(!track)return;
  if(isLocked(track)){openAccess();return}
  if(!track?.audio?.publicUrl){
    stopAudio();
    renderPlayer(track,'Аудиофайл этой экспозиции пока не добавлен.');
    return;
  }

  if(audio&&audioTrackId===track.id){
    currentTrack=track;
    if(audio.paused){
      try{if(audio.ended)audio.currentTime=0}catch(_err){}
      const p=audio.play();
      syncPlaybackButtons(track,true);
      if(p&&typeof p.catch==='function')p.catch(()=>{
        syncPlaybackButtons(track,false);
        renderPlayer(track,'Не удалось продолжить аудио на этом устройстве');
      });
    }else{
      audio.pause();
      syncPlaybackButtons(track,false);
    }
    return;
  }

  stopAudio();
  renderPlayer(track);
  const instance=new Audio(track.audio.publicUrl);
  audio=instance;
  audioTrackId=track.id;
  instance.preload='metadata';
  instance.setAttribute('playsinline','');
  if(track.access==='paid'&&entitlement.state==='pending')instance.addEventListener('playing',startPaidWindow,{once:true});
  instance.addEventListener('playing',()=>{
    if(audio===instance)syncPlaybackButtons(track,true);
  });
  instance.addEventListener('pause',()=>{
    if(audio===instance&&!instance.ended)syncPlaybackButtons(track,false);
  });
  instance.addEventListener('ended',()=>{
    if(audio===instance)syncPlaybackButtons(track,false);
  });
  const p=instance.play();
  syncPlaybackButtons(track,true);
  if(p&&typeof p.catch==='function')p.catch(()=>{
    if(audio!==instance)return;
    syncPlaybackButtons(track,false);
    renderPlayer(track,'Не удалось запустить аудио на этом устройстве');
  });
}

function makeTrackCard(track){
  const locked=track.access==='paid'&&!paidAccessAvailable();
  const duration=fmt(track.duration);
  const card=document.createElement('article');
  card.className=`audio-guide-track-card-v2 ${locked?'is-locked':'is-unlocked'}${currentTrack?.id===track.id?' is-selected':''}`;
  card.dataset.trackId=track.id;
  const localNumber=Number(track.hallOrder)||Number(track.number)||1;
  let status='Закрыто';
  let accessMeta='после активации';
  if(!locked){
    if(entitlement.state==='pending'){status='Активировано';accessMeta=`${activeHours} ч с первого запуска`}
    else{status='Открыто';accessMeta=remainingText()||'доступ активен'}
  }
  if(!track.audio?.publicUrl&& !locked)accessMeta='аудиофайл ещё не добавлен';
  const meta=[duration,accessMeta].filter(Boolean).join(' · ');
  card.innerHTML=`<button class="audio-guide-track-action" type="button" aria-label="${locked?'Активировать':'Открыть'} ${track.title}">${locked?lockSvg:playSvg}</button><div class="audio-guide-track-copy-v2"><span>Экспозиция ${String(localNumber).padStart(2,'0')}</span><strong>${track.title}</strong><p>${track.description||''}</p><small>${meta}</small></div><span class="audio-guide-track-status">${status}</span>`;
  card.querySelector('.audio-guide-track-action')?.addEventListener('click',()=>showTrack(track));
  card.querySelector('.audio-guide-track-copy-v2')?.addEventListener('click',()=>showTrack(track));
  card.querySelector('.audio-guide-track-status')?.addEventListener('click',()=>showTrack(track));
  return card;
}

function renderTracks(){
  if(!host)return;
  refreshEntitlement();
  host.innerHTML='';
  halls.forEach(hall=>{
    const hallNumber=Number(hall.number)||1;
    const hallTracks=expositionTracks.filter(t=>(Number(t.hall)||1)===hallNumber).sort((a,b)=>(Number(a.hallOrder)||0)-(Number(b.hallOrder)||0));
    if(!hallTracks.length)return;
    const group=document.createElement('section');
    group.className='audio-guide-hall';
    group.innerHTML=`<div class="audio-guide-hall-head"><div><span>Зал ${hallNumber}</span><strong>${hall.title||`Зал ${hallNumber}`}</strong></div><small>${hallTracks.length} экспозиции</small></div>`;
    const list=document.createElement('div');
    list.className='audio-guide-hall-tracks';
    hallTracks.forEach(track=>list.appendChild(makeTrackCard(track)));
    group.appendChild(list);
    host.appendChild(group);
  });
  if(audio&&audioTrackId&&currentTrack)syncPlaybackButtons(currentTrack,!audio.paused);
  else syncIntroButton(null,false);
}

start?.addEventListener('click',()=>showTrack(introTrack));
playerBtn?.addEventListener('click',()=>showTrack(currentTrack));
modal.addEventListener('click',e=>{if(e.target.closest('[data-audio-close]'))closeAccess()});
modal.querySelector('.audio-access-test-v2')?.addEventListener('click',()=>{
  activatePending('prototype');
  closeAccess();
  renderTracks();
  updateAccessCopy();
  const firstPaid=expositionTracks[0];
  if(firstPaid)renderPlayer(firstPaid,`Тестовый доступ активирован. ${activeHours} часов начнутся с первого платного воспроизведения.`);
});

renderTracks();
updateAccessCopy();
scheduleExpiry();
renderPlayer(currentTrack,currentTrack?.audio?.publicUrl?'Бесплатное приветствие':'Аудиозапись ещё не подключена');
syncIntroButton(null,false);
})();
