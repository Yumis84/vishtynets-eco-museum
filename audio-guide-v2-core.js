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
let isScrubbing=false;
let pendingCardSeek=null;

const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
const lockSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
const fmt=n=>{
  if(!Number.isFinite(Number(n))||Number(n)<=0)return null;
  n=Math.floor(Number(n));
  const m=Math.floor(n/60),s=n%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};
const clock=n=>{
  n=Math.max(0,Math.floor(Number(n)||0));
  const h=Math.floor(n/3600),m=Math.floor((n%3600)/60),s=n%60;
  if(h>0)return `${h}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};
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
const progressTitle=$('.audio-guide-progress-head strong');
const progressHead=$('.audio-guide-progress-head span');
const progressTrack=$('.audio-guide-progress-track');
const progressBar=$('.audio-guide-progress-track i');
const progressThumb=document.createElement('b');
if(progressTitle)progressTitle.textContent='Прогресс трека';
if(progressTrack){
  progressTrack.removeAttribute('aria-hidden');
  progressTrack.setAttribute('role','slider');
  progressTrack.setAttribute('tabindex','0');
  progressTrack.setAttribute('aria-label','Перемотка аудио');
  progressTrack.setAttribute('aria-valuemin','0');
  progressTrack.setAttribute('aria-valuemax','100');
  progressTrack.setAttribute('aria-valuenow','0');
  Object.assign(progressTrack.style,{height:'20px',marginTop:'7px',background:'linear-gradient(to bottom,transparent 6px,#e2ddd2 6px,#e2ddd2 13px,transparent 13px)',overflow:'visible',position:'relative',cursor:'pointer',touchAction:'none'});
  if(progressBar)Object.assign(progressBar.style,{position:'absolute',left:'0',top:'6px',height:'7px',borderRadius:'999px',transition:'none'});
  progressThumb.className='audio-guide-progress-thumb';
  Object.assign(progressThumb.style,{position:'absolute',left:'0%',top:'50%',width:'14px',height:'14px',borderRadius:'50%',background:'#6f846d',boxShadow:'0 1px 5px rgba(47,77,58,.28)',transform:'translate(-50%,-50%)',pointerEvents:'none'});
  progressTrack.appendChild(progressThumb);
}
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

function updateCardProgress(track,media=null){
  if(!track?.id)return;
  const card=document.querySelector(`.audio-guide-track-card-v2[data-track-id="${track.id}"]`);
  if(!card)return;
  const bar=card.querySelector('[data-card-progress-bar]');
  const thumb=card.querySelector('[data-card-progress-thumb]');
  const time=card.querySelector('[data-card-progress-time]');
  const scrubber=card.querySelector('[data-card-scrubber]');
  const mediaDuration=media&&Number.isFinite(Number(media.duration))&&Number(media.duration)>0?Number(media.duration):0;
  const declaredDuration=Number(track?.duration)>0?Number(track.duration):0;
  const duration=mediaDuration||declaredDuration;
  const current=media&&audioTrackId===track.id&&Number.isFinite(Number(media.currentTime))?Math.max(0,Number(media.currentTime)):0;
  const ratio=duration>0?Math.max(0,Math.min(1,current/duration)):0;
  const percent=Math.round(ratio*100);
  if(bar)bar.style.width=`${(ratio*100).toFixed(1)}%`;
  if(thumb)thumb.style.left=`${(ratio*100).toFixed(1)}%`;
  if(time)time.textContent=duration>0?`${clock(current)} / ${clock(duration)}`:'00:00 / --:--';
  if(scrubber){
    scrubber.setAttribute('aria-valuenow',String(percent));
    scrubber.setAttribute('aria-valuetext',duration>0?`${clock(current)} из ${clock(duration)}`:'Аудио ещё не загружено');
  }
}

function updatePlaybackProgress(media=null,track=currentTrack){
  const mediaDuration=media&&Number.isFinite(Number(media.duration))&&Number(media.duration)>0?Number(media.duration):0;
  const declaredDuration=Number(track?.duration)>0?Number(track.duration):0;
  const duration=mediaDuration||declaredDuration;
  const current=media&&Number.isFinite(Number(media.currentTime))?Math.max(0,Number(media.currentTime)):0;
  const ratio=duration>0?Math.max(0,Math.min(1,current/duration)):0;
  const percent=Math.round(ratio*100);
  if(progressBar)progressBar.style.width=`${(ratio*100).toFixed(1)}%`;
  if(progressThumb)progressThumb.style.left=`${(ratio*100).toFixed(1)}%`;
  if(progressTrack){
    progressTrack.setAttribute('aria-valuenow',String(percent));
    progressTrack.setAttribute('aria-valuetext',duration>0?`${clock(current)} из ${clock(duration)}`:`${clock(current)}`);
  }
  if(progressHead){
    progressHead.textContent=duration>0
      ?`${clock(current)} / ${clock(duration)} · ${percent}%`
      :`${clock(current)} · ${percent}%`;
  }
  updateCardProgress(track,media);
}

function seekToRatio(ratio){
  if(!audio)return false;
  const duration=Number(audio.duration);
  if(!Number.isFinite(duration)||duration<=0)return false;
  const clamped=Math.max(0,Math.min(1,Number(ratio)||0));
  try{audio.currentTime=clamped*duration}catch(_err){return false}
  updatePlaybackProgress(audio,currentTrack);
  return true;
}
function seekFromClientX(clientX){
  if(!progressTrack)return false;
  const rect=progressTrack.getBoundingClientRect();
  if(!rect.width)return false;
  return seekToRatio((Number(clientX)-rect.left)/rect.width);
}
if(progressTrack){
  progressTrack.addEventListener('pointerdown',e=>{
    if(!audio||!Number.isFinite(Number(audio.duration))||Number(audio.duration)<=0)return;
    e.preventDefault();
    isScrubbing=true;
    try{progressTrack.setPointerCapture(e.pointerId)}catch(_err){}
    seekFromClientX(e.clientX);
  });
  progressTrack.addEventListener('pointermove',e=>{
    if(!isScrubbing)return;
    e.preventDefault();
    seekFromClientX(e.clientX);
  });
  const finishScrub=e=>{
    if(!isScrubbing)return;
    seekFromClientX(e.clientX);
    isScrubbing=false;
    try{progressTrack.releasePointerCapture(e.pointerId)}catch(_err){}
  };
  progressTrack.addEventListener('pointerup',finishScrub);
  progressTrack.addEventListener('pointercancel',()=>{isScrubbing=false});
  progressTrack.addEventListener('keydown',e=>{
    if(!audio)return;
    const duration=Number(audio.duration);
    if(!Number.isFinite(duration)||duration<=0)return;
    let next=null;
    if(e.key==='ArrowLeft')next=Math.max(0,Number(audio.currentTime)-5);
    if(e.key==='ArrowRight')next=Math.min(duration,Number(audio.currentTime)+5);
    if(e.key==='Home')next=0;
    if(e.key==='End')next=duration;
    if(next===null)return;
    e.preventDefault();
    try{audio.currentTime=next}catch(_err){}
    updatePlaybackProgress(audio,currentTrack);
  });
}

function seekCardTrack(track,ratio){
  if(!track)return false;
  if(isLocked(track)){openAccess();return false}
  if(!track.audio?.publicUrl){showTrack(track);return false}
  const clamped=Math.max(0,Math.min(1,Number(ratio)||0));
  if(!audio||audioTrackId!==track.id){
    pendingCardSeek={trackId:track.id,ratio:clamped};
    showTrack(track);
    return true;
  }
  const duration=Number(audio.duration);
  if(!Number.isFinite(duration)||duration<=0){
    pendingCardSeek={trackId:track.id,ratio:clamped};
    return false;
  }
  try{audio.currentTime=clamped*duration}catch(_err){return false}
  updatePlaybackProgress(audio,track);
  return true;
}

function bindCardProgress(card,track,locked){
  const scrubber=card.querySelector('[data-card-scrubber]');
  if(!scrubber)return;
  let dragging=false;
  const ratioFromX=x=>{
    const rect=scrubber.getBoundingClientRect();
    if(!rect.width)return 0;
    return Math.max(0,Math.min(1,(Number(x)-rect.left)/rect.width));
  };
  const seekX=x=>seekCardTrack(track,ratioFromX(x));
  scrubber.addEventListener('click',e=>e.stopPropagation());
  scrubber.addEventListener('pointerdown',e=>{
    e.preventDefault();
    e.stopPropagation();
    if(locked){openAccess();return}
    if(!track.audio?.publicUrl){showTrack(track);return}
    dragging=true;
    try{scrubber.setPointerCapture(e.pointerId)}catch(_err){}
    seekX(e.clientX);
  });
  scrubber.addEventListener('pointermove',e=>{
    if(!dragging)return;
    e.preventDefault();
    e.stopPropagation();
    seekX(e.clientX);
  });
  const finish=e=>{
    if(!dragging)return;
    e.preventDefault();
    e.stopPropagation();
    seekX(e.clientX);
    dragging=false;
    try{scrubber.releasePointerCapture(e.pointerId)}catch(_err){}
  };
  scrubber.addEventListener('pointerup',finish);
  scrubber.addEventListener('pointercancel',()=>{dragging=false});
  scrubber.addEventListener('keydown',e=>{
    e.stopPropagation();
    if(locked){
      if(e.key==='Enter'||e.key===' '){e.preventDefault();openAccess()}
      return;
    }
    if(!track.audio?.publicUrl)return;
    if((!audio||audioTrackId!==track.id)&&(e.key==='Enter'||e.key===' ')){
      e.preventDefault();
      showTrack(track);
      return;
    }
    if(!audio||audioTrackId!==track.id)return;
    const duration=Number(audio.duration);
    if(!Number.isFinite(duration)||duration<=0)return;
    let next=null;
    if(e.key==='ArrowLeft')next=Math.max(0,Number(audio.currentTime)-5);
    if(e.key==='ArrowRight')next=Math.min(duration,Number(audio.currentTime)+5);
    if(e.key==='Home')next=0;
    if(e.key==='End')next=duration;
    if(next===null)return;
    e.preventDefault();
    try{audio.currentTime=next}catch(_err){}
    updatePlaybackProgress(audio,track);
  });
}

function updateAccessCopy(){
  if(!note)return;
  refreshEntitlement();
  if(entitlement.state==='pending'){
    note.textContent=`Доступ активирован. ${activeHours} часов начнутся только с первого запуска платной экспозиции.`;
  }else if(entitlement.state==='active'){
    note.textContent=`Экспозиции открыты · ${remainingText()}.`;
  }else{
    note.textContent='Приветствие доступно бесплатно. Все 8 экспозиций видны ниже; замок открывает окно оплаты и активации.';
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
    if(card.dataset.locked==='1'){
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
  isScrubbing=false;
  if(previous){
    try{previous.pause()}catch(_err){}
  }
  syncPlaybackButtons(null,false);
}

function renderPlayer(track,message){
  currentTrack=track;
  updatePlaybackProgress(null,track);
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
      updatePlaybackProgress(audio,track);
      const p=audio.play();
      syncPlaybackButtons(track,true);
      if(p&&typeof p.catch==='function')p.catch(()=>{
        syncPlaybackButtons(track,false);
        renderPlayer(track,'Не удалось продолжить аудио на этом устройстве');
      });
    }else{
      audio.pause();
      updatePlaybackProgress(audio,track);
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
  const syncProgress=()=>{if(audio===instance)updatePlaybackProgress(instance,track)};
  const applyPendingCardSeek=()=>{
    if(audio!==instance||pendingCardSeek?.trackId!==track.id)return;
    const duration=Number(instance.duration);
    if(!Number.isFinite(duration)||duration<=0)return;
    const ratio=Math.max(0,Math.min(1,Number(pendingCardSeek.ratio)||0));
    pendingCardSeek=null;
    try{instance.currentTime=ratio*duration}catch(_err){}
    syncProgress();
  };
  instance.addEventListener('loadedmetadata',()=>{applyPendingCardSeek();syncProgress()});
  instance.addEventListener('durationchange',()=>{applyPendingCardSeek();syncProgress()});
  instance.addEventListener('timeupdate',syncProgress);
  instance.addEventListener('seeking',syncProgress);
  instance.addEventListener('seeked',syncProgress);
  if(track.access==='paid'&&entitlement.state==='pending')instance.addEventListener('playing',startPaidWindow,{once:true});
  instance.addEventListener('playing',()=>{
    if(audio===instance){
      syncProgress();
      syncPlaybackButtons(track,true);
    }
  });
  instance.addEventListener('pause',()=>{
    if(audio===instance&&!instance.ended){
      syncProgress();
      syncPlaybackButtons(track,false);
    }
  });
  instance.addEventListener('ended',()=>{
    if(audio===instance){
      updatePlaybackProgress(instance,track);
      syncPlaybackButtons(track,false);
    }
  });
  const p=instance.play();
  syncPlaybackButtons(track,true);
  if(p&&typeof p.catch==='function')p.catch(()=>{
    if(audio!==instance)return;
    syncPlaybackButtons(track,false);
    renderPlayer(track,'Не удалось запустить аудио на этом устройстве');
  });
}

function styleCardProgress(card){
  const wrap=card.querySelector('.audio-guide-card-progress');
  const meta=card.querySelector('.audio-guide-card-progress-meta');
  const metaHint=meta?.querySelector('small');
  const scrubber=card.querySelector('[data-card-scrubber]');
  const bar=card.querySelector('[data-card-progress-bar]');
  const thumb=card.querySelector('[data-card-progress-thumb]');
  if(wrap)Object.assign(wrap.style,{gridColumn:'1 / -1',marginTop:'1px',padding:'0 2px 1px'});
  if(meta)Object.assign(meta.style,{display:'flex',alignItems:'center',justifyContent:'space-between',gap:'10px',marginBottom:'3px',color:'#777d74',fontSize:'9px',fontWeight:'800'});
  if(metaHint)Object.assign(metaHint.style,{fontSize:'8.5px',fontWeight:'750',color:'#858a82'});
  if(scrubber)Object.assign(scrubber.style,{position:'relative',height:'20px',background:'linear-gradient(to bottom,transparent 6px,#e2ddd2 6px,#e2ddd2 13px,transparent 13px)',overflow:'visible',cursor:'pointer',touchAction:'none',outline:'none'});
  if(bar)Object.assign(bar.style,{position:'absolute',left:'0',top:'6px',width:'0%',height:'7px',borderRadius:'999px',background:'#6f846d',pointerEvents:'none'});
  if(thumb)Object.assign(thumb.style,{position:'absolute',left:'0%',top:'50%',width:'14px',height:'14px',borderRadius:'50%',background:'#6f846d',boxShadow:'0 1px 5px rgba(47,77,58,.28)',transform:'translate(-50%,-50%)',pointerEvents:'none'});
}

function makeTrackCard(track){
  const locked=track.access==='paid'&&!paidAccessAvailable();
  const duration=fmt(track.duration);
  const card=document.createElement('article');
  card.className=`audio-guide-track-card-v2 is-unlocked${currentTrack?.id===track.id?' is-selected':''}`;
  card.dataset.trackId=track.id;
  card.dataset.locked=locked?'1':'0';
  card.setAttribute('role','button');
  card.tabIndex=0;
  card.setAttribute('aria-label',`${locked?'Открыть оплату для':'Открыть'} ${track.title}`);
  const localNumber=Number(track.hallOrder)||Number(track.number)||1;
  let status='Открыть';
  let accessMeta='после активации';
  if(!locked){
    if(entitlement.state==='pending'){status='Активировано';accessMeta=`${activeHours} ч с первого запуска`}
    else{status='Открыто';accessMeta=remainingText()||'доступ активен'}
  }
  if(!track.audio?.publicUrl&&!locked)accessMeta='аудиофайл ещё не добавлен';
  const meta=[duration,accessMeta].filter(Boolean).join(' · ');
  const sliderHint=locked?'После активации':track.audio?.publicUrl?'Можно перематывать':'Аудио ожидается';
  const sliderTab=locked||!track.audio?.publicUrl?'-1':'0';
  card.innerHTML=`<button class="audio-guide-track-action" type="button" tabindex="-1" aria-hidden="true">${locked?lockSvg:playSvg}</button><div class="audio-guide-track-copy-v2"><span>Экспозиция ${String(localNumber).padStart(2,'0')}</span><strong>${track.title}</strong><p>${track.description||''}</p><small>${meta}</small></div><span class="audio-guide-track-status">${status}</span><div class="audio-guide-card-progress"><div class="audio-guide-card-progress-meta"><span data-card-progress-time>00:00 / ${duration||'--:--'}</span><small>${sliderHint}</small></div><div class="audio-guide-card-scrubber" data-card-scrubber role="slider" tabindex="${sliderTab}" aria-label="Перемотка ${track.title}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><i data-card-progress-bar></i><b data-card-progress-thumb></b></div></div>`;
  styleCardProgress(card);
  bindCardProgress(card,track,locked);
  updateCardProgress(track,null);
  card.addEventListener('click',()=>showTrack(track));
  card.addEventListener('keydown',e=>{
    if(e.key!=='Enter'&&e.key!==' ')return;
    e.preventDefault();
    showTrack(track);
  });
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
  if(audio&&audioTrackId&&currentTrack){
    syncPlaybackButtons(currentTrack,!audio.paused);
    updateCardProgress(currentTrack,audio);
  }else syncIntroButton(null,false);
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
