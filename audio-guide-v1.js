(()=>{
'use strict';
const $=s=>document.querySelector(s);
const screen=$('.screen-audio');
if(!screen)return;
const TEST_TEXT='Это тестовая запись аудиогида Виштынецкого музея. Проверяем работу плеера.';
const ACCESS_KEY='vishtynets_test_audio_access_v1';
let activated=sessionStorage.getItem(ACCESS_KEY)==='1';
let playing=false,usingSpeech=false,speechTimer=null;
let b64=window.VISHTYNETS_TEST_AUDIO_B64||'';
/* Correct one transcription seam in the embedded test fixture if present. */
b64=b64.replace('MMRADNlK5fmMEwja','MMRADNlK5fmMEAEwja');
const audio=b64.length===20572?new Audio('data:audio/mpeg;base64,'+b64):null;
if(audio){audio.preload='metadata'}

const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';

const badge=$('.audio-guide-badge');
if(badge)badge.innerHTML='<i></i>Тестовый режим';
const progressHead=$('.audio-guide-progress-head span');
if(progressHead)progressHead.textContent='0 из 1 трека';
const start=$('.audio-guide-start');
if(start){start.disabled=false;start.textContent='Начать тестовую экскурсию'}
const note=$('.audio-guide-note');
if(note)note.textContent='Сейчас подключена короткая синтетическая тестовая запись. Позже заменим её настоящим аудиогидом музея.';
const count=$('.audio-guide-section-head>span');
if(count)count.textContent='1 трек';
const empty=$('.audio-guide-empty');
if(empty){
  empty.classList.add('audio-guide-track-card');
  empty.innerHTML=`<button class="audio-track-play" type="button" aria-label="Воспроизвести тестовый трек">${playSvg}</button><div class="audio-track-copy"><span>Трек 01 · тест</span><strong>Добро пожаловать в аудиогид</strong><p>Короткая синтетическая запись для проверки плеера и будущей системы активации.</p><small>≈ 5 секунд</small></div>`;
}
const player=$('.audio-guide-player');
const playerBtn=$('.audio-guide-play');
if(player){player.removeAttribute('aria-disabled');player.classList.add('is-ready');const strong=player.querySelector('strong'),small=player.querySelector('small');if(strong)strong.textContent='Тестовая запись';if(small)small.textContent='00:00 / 00:05'}
if(playerBtn){playerBtn.disabled=false;playerBtn.setAttribute('aria-label','Воспроизвести тестовую запись');playerBtn.innerHTML=playSvg}

const modal=document.createElement('div');
modal.className='audio-access-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Доступ к плейлисту</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>В рабочей версии здесь будет оплата через ЮKassa или ввод кода, выданного сотрудником музея. Сейчас можно включить тестовый доступ.</p><button class="audio-access-test" type="button">Активировать тестовый доступ</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Тестовая активация не является оплатой и нужна только для проверки интерфейса.</small></section>`;
document.body.appendChild(modal);

function openAccess(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
function closeAccess(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}
function fmt(n){n=Math.max(0,Math.floor(n||0));return `00:${String(n).padStart(2,'0')}`}
function setProgress(current=0,duration=5){
  const bar=$('.audio-guide-progress-track i');if(bar)bar.style.width=`${Math.min(100,(current/(duration||5))*100)}%`;
  const small=player?.querySelector('small');if(small)small.textContent=`${fmt(current)} / ${fmt(duration||5)}`;
}
function setPlaying(value){
  playing=value;
  document.querySelectorAll('.audio-guide-play,.audio-track-play').forEach(b=>{b.innerHTML=value?pauseSvg:playSvg;b.classList.toggle('is-playing',value)});
}
function stopSpeech(){if(usingSpeech&&'speechSynthesis'in window)window.speechSynthesis.cancel();usingSpeech=false;clearInterval(speechTimer);speechTimer=null;setPlaying(false)}
function speechFallback(){
  if(!('speechSynthesis'in window)){setPlaying(false);return}
  if(playing&&usingSpeech){stopSpeech();return}
  const u=new SpeechSynthesisUtterance(TEST_TEXT);u.lang='ru-RU';u.rate=.9;
  let started=Date.now();usingSpeech=true;setPlaying(true);setProgress(0,5);
  speechTimer=setInterval(()=>setProgress(Math.min(5,(Date.now()-started)/1000),5),150);
  u.onend=u.onerror=()=>{clearInterval(speechTimer);speechTimer=null;usingSpeech=false;setProgress(5,5);setPlaying(false)};
  window.speechSynthesis.cancel();window.speechSynthesis.speak(u);
}
function toggleAudio(){
  if(!activated){openAccess();return}
  if(audio){
    if(!audio.paused){audio.pause();setPlaying(false);return}
    audio.play().then(()=>setPlaying(true)).catch(speechFallback);
  }else speechFallback();
}
if(audio){
  audio.addEventListener('timeupdate',()=>setProgress(audio.currentTime,audio.duration||5));
  audio.addEventListener('ended',()=>{setProgress(audio.duration||5,audio.duration||5);setPlaying(false)});
  audio.addEventListener('error',()=>{if(playing){setPlaying(false);speechFallback()}});
}
start?.addEventListener('click',toggleAudio);
playerBtn?.addEventListener('click',toggleAudio);
$('.audio-track-play')?.addEventListener('click',toggleAudio);
modal.addEventListener('click',e=>{if(e.target.closest('[data-audio-close]'))closeAccess()});
$('.audio-access-test')?.addEventListener('click',()=>{activated=true;sessionStorage.setItem(ACCESS_KEY,'1');closeAccess();setTimeout(toggleAudio,80)});
})();
