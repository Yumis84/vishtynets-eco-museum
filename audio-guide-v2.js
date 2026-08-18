(()=>{
'use strict';
const $=s=>document.querySelector(s);
const screen=$('.screen-audio');
if(!screen)return;

const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;

const ACCESS_KEY='vishtynets_audio_entitlement_v2';
const LEGACY_SESSION_KEY='vishtynets_audio_access_v1';
const HOUR_MS=60*60*1000;
const activeHours=Number(guide?.access?.activeHours)||24;
let currentTrack=tracks[0]||null;
let audio=null;
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
  if(before!=='none'&&entitlement.state==='none')return true;
  return false;
}
function paidAccessAvailable(){
  refreshEntitlement();
  return entitlement.state==='pending'||entitlement.state==='active';
}
function isLocked(track){
  return track?.access==='paid'&&!paidAccessAvailable();
}
function canPlay(track){
  return Boolean(track?.audio?.publicUrl)&&(track.access==='free'||paidAccessAvailable());
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
if(badge)badge.innerHTML=`<i></i>${tracks.length} трека в маршруте`;
const heroText=$('.audio-guide-hero p');
if(heroText)heroText.textContent='Начните с бесплатного приветствия. Все экспозиции видны сразу; после активации закрытые треки станут доступны для прослушивания.';
const progressHead=$('.audio-guide-progress-head span');
if(progressHead)progressHead.textContent=`0 из ${tracks.length} треков`;
const start=$('.audio-guide-start');
if(start){start.disabled=false;start.textContent=currentTrack?.audio?.publicUrl?'Слушать приветствие':isAwaitingSiteUpload(currentTrack)?'Запись готова':'Открыть приветствие'}
const note=$('.audio-guide-note');
const count=$('.audio-guide-section-head>span');
if(count)count.textContent=`${tracks.length} трека`;
const heading=$('.audio-guide-section-head h2');
if(heading)heading.textContent='Экспозиции аудиогида';

function updateAccessCopy(){
  if(!note)return;
  refreshEntitlement();
  if(entitlement.state==='pending'){
    note.textContent=`Доступ активирован. ${activeHours} часов начнутся только с первого запуска платной экспозиции.`;
  }else if(entitlement.state==='active'){
    note.textContent=`Платные экспозиции открыты · ${remainingText()}.`;
  }else if(isAwaitingSiteUpload(tracks[0])){
    note.textContent='Бесплатное приветствие уже записано и ожидает публикации MP3 в папке сайта. Платные экспозиции открываются после активации.';
  }else{
    note.textContent='Приветствие доступно бесплатно. Экспозиция 1 и следующие записи открываются после активации аудиогида.';
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
modal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Продолжить экскурсию</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>Бесплатное приветствие доступно всем посетителям. После оплаты или ввода кода платные экспозиции открываются сразу, а ${activeHours}-часовой срок начнётся только при первом запуске платного трека.</p><button class="audio-access-test-v2" type="button">Тест: активировать доступ</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Тестовая кнопка имитирует успешную оплату или код. Реальные ЮKassa и проверка кодов подключаются отдельным этапом.</small></section>`;
document.body.appendChild(modal);

function openAccess(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
function closeAccess(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}

function stopAudio(){
  if(audio){
    try{audio.pause()}catch(_err){}
    audio=null;
  }
  document.querySelectorAll('.audio-guide-track-action').forEach(btn=>btn.innerHTML=btn.closest('.is-locked')?lockSvg:playSvg);
  if(playerBtn)playerBtn.innerHTML=playSvg;
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
  stopAudio();
  if(isLocked(track)){openAccess();return}
  if(!track?.audio?.publicUrl){
    const message=track?.access==='free'
      ?(isAwaitingSiteUpload(track)?`Запись приветствия готова · ${fmt(track.duration)||'аудио готово'}. Осталось опубликовать MP3 в папке сайта.`:'Аудиозапись приветствия пока не подключена.')
      :'Аудиофайл этой экспозиции пока не подключён.';
    renderPlayer(track,message);
    return;
  }
  renderPlayer(track);
  audio=new Audio(track.audio.publicUrl);
  audio.preload='metadata';
  audio.setAttribute('playsinline','');
  if(track.access==='paid'&&entitlement.state==='pending')audio.addEventListener('playing',startPaidWindow,{once:true});
  const p=audio.play();
  if(playerBtn)playerBtn.innerHTML=pauseSvg;
  const cardBtn=document.querySelector(`[data-track-id="${track.id}"] .audio-guide-track-action`);
  if(cardBtn)cardBtn.innerHTML=pauseSvg;
  if(p&&typeof p.catch==='function')p.catch(()=>renderPlayer(track,'Не удалось запустить аудио на этом устройстве'));
  audio.addEventListener('ended',()=>{
    if(playerBtn)playerBtn.innerHTML=playSvg;
    const latestBtn=document.querySelector(`[data-track-id="${track.id}"] .audio-guide-track-action`);
    if(latestBtn)latestBtn.innerHTML=playSvg;
  });
}

function renderTracks(){
  if(!host)return;
  refreshEntitlement();
  host.innerHTML='';
  tracks.forEach(track=>{
    const locked=track.access==='paid'&&!paidAccessAvailable();
    const duration=fmt(track.duration);
    const card=document.createElement('article');
    card.className=`audio-guide-track-card-v2 ${track.access==='free'?'is-free':locked?'is-locked':'is-unlocked'}${currentTrack?.id===track.id?' is-selected':''}`;
    card.dataset.trackId=track.id;
    const label=track.kind==='intro'?'Вступление':`Экспозиция ${String(track.number).padStart(2,'0')}`;
    let status='Бесплатно';
    let accessMeta=track.access==='free'&&isAwaitingSiteUpload(track)?'запись готова · публикация на сайте':'доступно всем';
    if(track.access==='paid'){
      if(locked){status='Закрыто';accessMeta='после активации'}
      else if(entitlement.state==='pending'){status='Активировано';accessMeta=`${activeHours} ч с первого запуска`}
      else{status='Открыто';accessMeta=remainingText()||'доступ активен'}
    }
    const meta=[duration,accessMeta].filter(Boolean).join(' · ');
    card.innerHTML=`<button class="audio-guide-track-action" type="button" aria-label="${locked?'Активировать':'Открыть'} ${track.title}">${locked?lockSvg:playSvg}</button><div class="audio-guide-track-copy-v2"><span>${label}</span><strong>${track.title}</strong><p>${track.description||''}</p><small>${meta}</small></div><span class="audio-guide-track-status">${status}</span>`;
    card.querySelector('.audio-guide-track-action')?.addEventListener('click',()=>showTrack(track));
    card.querySelector('.audio-guide-track-copy-v2')?.addEventListener('click',()=>showTrack(track));
    card.querySelector('.audio-guide-track-status')?.addEventListener('click',()=>showTrack(track));
    host.appendChild(card);
  });
}

start?.addEventListener('click',()=>showTrack(tracks[0]));
playerBtn?.addEventListener('click',()=>{
  if(!currentTrack)return;
  if(isLocked(currentTrack)){openAccess();return}
  if(!currentTrack.audio?.publicUrl){showTrack(currentTrack);return}
  if(audio&&!audio.paused){audio.pause();playerBtn.innerHTML=playSvg;return}
  showTrack(currentTrack);
});
modal.addEventListener('click',e=>{if(e.target.closest('[data-audio-close]'))closeAccess()});
modal.querySelector('.audio-access-test-v2')?.addEventListener('click',()=>{
  activatePending('prototype');
  closeAccess();
  renderTracks();
  updateAccessCopy();
  const firstPaid=tracks.find(t=>t.access==='paid');
  if(firstPaid)renderPlayer(firstPaid,`Тестовый доступ активирован. ${activeHours} часов начнутся с первого платного воспроизведения.`);
});

renderTracks();
updateAccessCopy();
scheduleExpiry();
renderPlayer(currentTrack,currentTrack.audio?.publicUrl?'Бесплатно':isAwaitingSiteUpload(currentTrack)?`Запись готова · ${fmt(currentTrack.duration)||'MP3'} · ожидает публикации на сайте`:'Аудиозапись ещё не подключена');
})();
