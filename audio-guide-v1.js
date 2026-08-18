(()=>{
'use strict';
const $=s=>document.querySelector(s);
const screen=$('.screen-audio');
if(!screen)return;

const ACCESS_KEY='vishtynets_test_audio_access_v2';
const FULL_DURATION=873;
const SAMPLE_DURATION=5;
let activated=sessionStorage.getItem(ACCESS_KEY)==='1';
let playing=false;
const b64=window.VISHTYNETS_EXPOSITION_01_SAMPLE_B64||'';
const audio=b64?new Audio('data:audio/webm;codecs=opus;base64,'+b64):null;
if(audio)audio.preload='metadata';

const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';

const badge=$('.audio-guide-badge');
if(badge)badge.innerHTML='<i></i>Первая экспозиция добавлена';
const heroText=$('.audio-guide-hero p');
if(heroText)heroText.textContent='Первая запись музейного аудиогида уже добавлена. На этапе тестирования доступен короткий фрагмент; полный плейлист будет воспроизводиться после активации доступа.';
const progressHead=$('.audio-guide-progress-head span');
if(progressHead)progressHead.textContent='0 из 1 экспозиции';
const start=$('.audio-guide-start');
if(start){start.disabled=false;start.textContent='Начать экскурсию'}
const note=$('.audio-guide-note');
if(note)note.textContent='Экспозиция 1 · полная длительность 14:33. Сейчас после тестовой активации воспроизводятся первые 5 секунд настоящей записи.';
const count=$('.audio-guide-section-head>span');
if(count)count.textContent='1 экспозиция';
const heading=$('.audio-guide-section-head h2');
if(heading)heading.textContent='Экспозиции аудиогида';

const empty=$('.audio-guide-empty');
if(empty){
  empty.classList.add('audio-guide-track-card');
  empty.innerHTML=`<button class="audio-track-play" type="button" aria-label="Воспроизвести Экспозицию 1">${playSvg}</button><div class="audio-track-copy"><span>Экспозиция 01</span><strong>Экспозиция 1</strong><p>Первая аудиозапись музейного аудиогида.</p><small>14:33 · тестовый фрагмент 5 сек.</small></div>`;
}

const player=$('.audio-guide-player');
const playerBtn=$('.audio-guide-play');
if(player){
  player.removeAttribute('aria-disabled');
  player.classList.add('is-ready');
  const strong=player.querySelector('strong'),small=player.querySelector('small');
  if(strong)strong.textContent='Экспозиция 1';
  if(small)small.textContent='Фрагмент 00:00 / 00:05 · полная запись 14:33';
}
if(playerBtn){playerBtn.disabled=false;playerBtn.setAttribute('aria-label','Воспроизвести Экспозицию 1');playerBtn.innerHTML=playSvg}

const modal=document.createElement('div');
modal.className='audio-access-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Доступ к плейлисту</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>В рабочей версии воспроизведение полного плейлиста откроется после оплаты через ЮKassa или ввода кода, выданного сотрудником музея. Сейчас можно проверить этот сценарий на коротком фрагменте первой реальной экспозиции.</p><button class="audio-access-test" type="button">Активировать тестовый доступ</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Тестовая активация не является оплатой. Полная запись 14:33 не опубликована в открытом доступе.</small></section>`;
document.body.appendChild(modal);

function openAccess(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
function closeAccess(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}
function fmt(n){
  n=Math.max(0,Math.floor(n||0));
  const m=Math.floor(n/60),s=n%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
}
function setProgress(current=0,duration=SAMPLE_DURATION){
  const safeDuration=Number.isFinite(duration)&&duration>0?duration:SAMPLE_DURATION;
  const bar=$('.audio-guide-progress-track i');
  if(bar)bar.style.width=`${Math.min(100,(current/safeDuration)*100)}%`;
  const small=player?.querySelector('small');
  if(small)small.textContent=`Фрагмент ${fmt(current)} / ${fmt(safeDuration)} · полная запись ${fmt(FULL_DURATION)}`;
}
function setPlaying(value){
  playing=value;
  document.querySelectorAll('.audio-guide-play,.audio-track-play').forEach(b=>{
    b.innerHTML=value?pauseSvg:playSvg;
    b.classList.toggle('is-playing',value);
  });
}
function setUnavailable(){
  setPlaying(false);
  const small=player?.querySelector('small');
  if(small)small.textContent='Не удалось воспроизвести тестовый фрагмент на этом устройстве';
}
function toggleAudio(){
  if(!activated){openAccess();return}
  if(!audio){setUnavailable();return}
  if(!audio.paused){audio.pause();setPlaying(false);return}
  audio.play().then(()=>setPlaying(true)).catch(setUnavailable);
}
if(audio){
  audio.addEventListener('timeupdate',()=>setProgress(audio.currentTime,audio.duration||SAMPLE_DURATION));
  audio.addEventListener('ended',()=>{setProgress(audio.duration||SAMPLE_DURATION,audio.duration||SAMPLE_DURATION);setPlaying(false)});
  audio.addEventListener('error',setUnavailable);
}
start?.addEventListener('click',toggleAudio);
playerBtn?.addEventListener('click',toggleAudio);
$('.audio-track-play')?.addEventListener('click',toggleAudio);
modal.addEventListener('click',e=>{if(e.target.closest('[data-audio-close]'))closeAccess()});
$('.audio-access-test')?.addEventListener('click',()=>{
  activated=true;
  sessionStorage.setItem(ACCESS_KEY,'1');
  closeAccess();
  setTimeout(toggleAudio,80);
});
})();
