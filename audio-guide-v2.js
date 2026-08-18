(()=>{
'use strict';
const $=s=>document.querySelector(s);
const screen=$('.screen-audio');
if(!screen)return;

const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;

const ACCESS_KEY='vishtynets_audio_access_v1';
let activated=false;
try{activated=sessionStorage.getItem(ACCESS_KEY)==='1'}catch(_err){}
let currentTrack=tracks[0]||null;
let audio=null;

const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
const lockSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';
const fmt=n=>{
  if(!Number.isFinite(Number(n))||Number(n)<=0)return null;
  n=Math.floor(Number(n));
  const m=Math.floor(n/60),s=n%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};
const canPlay=track=>Boolean(track?.audio?.publicUrl)&&(track.access==='free'||activated);
const isLocked=track=>track?.access==='paid'&&!activated;

const badge=$('.audio-guide-badge');
if(badge)badge.innerHTML=`<i></i>${tracks.length} трека в маршруте`;
const heroText=$('.audio-guide-hero p');
if(heroText)heroText.textContent='Начните с бесплатного приветствия. Все экспозиции видны сразу; после активации закрытые треки станут доступны для прослушивания.';
const progressHead=$('.audio-guide-progress-head span');
if(progressHead)progressHead.textContent=`0 из ${tracks.length} треков`;
const start=$('.audio-guide-start');
if(start){start.disabled=false;start.textContent=currentTrack?.audio?.publicUrl?'Слушать приветствие':'Открыть приветствие'}
const note=$('.audio-guide-note');
if(note)note.textContent='Приветствие доступно бесплатно. Экспозиция 1 и следующие записи открываются после активации аудиогида.';
const count=$('.audio-guide-section-head>span');
if(count)count.textContent=`${tracks.length} трека`;
const heading=$('.audio-guide-section-head h2');
if(heading)heading.textContent='Экспозиции аудиогида';

const host=$('.audio-guide-empty');
if(host){
  host.className='audio-guide-empty audio-guide-track-list';
  host.innerHTML='';
}

const player=$('.audio-guide-player');
const playerBtn=$('.audio-guide-play');
if(player){
  player.removeAttribute('aria-disabled');
  player.classList.add('is-ready');
}

const modal=document.createElement('div');
modal.className='audio-access-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Продолжить экскурсию</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>Бесплатное приветствие доступно всем посетителям. Для прослушивания экспозиций активируйте полный аудиогид: после оплаты или ввода кода все закрытые треки станут активными. Доступ рассчитан на 24 часа с первого платного воспроизведения.</p><button class="audio-access-test-v2" type="button">Проверить разблокировку</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Сейчас кнопка проверки нужна только для прототипа интерфейса. Платёж и код подключим отдельным этапом.</small></section>`;
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
  const strong=player?.querySelector('strong');
  const small=player?.querySelector('small');
  if(strong)strong.textContent=track?.title||'Плеер аудиогида';
  const duration=fmt(track?.duration);
  if(small)small.textContent=message||[track?.access==='free'?'Бесплатно':'После активации',duration].filter(Boolean).join(' · ');
  if(player){
    player.classList.toggle('is-waiting-audio',!track?.audio?.publicUrl);
  }
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
      ?'Текст приветствия уже подготовлен. Осталось записать и подключить аудиофайл.'
      :'Запись этой экспозиции получена; файл подключим к плееру следующим шагом.';
    renderPlayer(track,message);
    return;
  }
  renderPlayer(track);
  audio=new Audio(track.audio.publicUrl);
  audio.preload='metadata';
  audio.setAttribute('playsinline','');
  const p=audio.play();
  if(playerBtn)playerBtn.innerHTML=pauseSvg;
  const cardBtn=document.querySelector(`[data-track-id="${track.id}"] .audio-guide-track-action`);
  if(cardBtn)cardBtn.innerHTML=pauseSvg;
  if(p&&typeof p.catch==='function')p.catch(()=>renderPlayer(track,'Не удалось запустить аудио на этом устройстве'));
  audio.addEventListener('ended',()=>{
    if(playerBtn)playerBtn.innerHTML=playSvg;
    if(cardBtn)cardBtn.innerHTML=playSvg;
  });
}

function renderTracks(){
  if(!host)return;
  host.innerHTML='';
  tracks.forEach(track=>{
    const locked=isLocked(track);
    const duration=fmt(track.duration);
    const card=document.createElement('article');
    card.className=`audio-guide-track-card-v2 ${track.access==='free'?'is-free':locked?'is-locked':'is-unlocked'}${currentTrack?.id===track.id?' is-selected':''}`;
    card.dataset.trackId=track.id;
    const label=track.kind==='intro'?'Вступление':`Экспозиция ${String(track.number).padStart(2,'0')}`;
    const status=track.access==='free'?'Бесплатно':locked?'Закрыто':'Открыто';
    const meta=[duration,track.access==='free'?'доступно всем':locked?'после активации':'доступ активен'].filter(Boolean).join(' · ');
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
  activated=true;
  try{sessionStorage.setItem(ACCESS_KEY,'1')}catch(_err){}
  closeAccess();
  renderTracks();
  const firstPaid=tracks.find(t=>t.access==='paid');
  if(firstPaid)renderPlayer(firstPaid,'Тестовый доступ активирован. Карточки платных экспозиций разблокированы.');
});

renderTracks();
renderPlayer(currentTrack,currentTrack.audio?.publicUrl?'Бесплатно':'Текст приветствия подготовлен · аудиозапись ещё не подключена');
})();
