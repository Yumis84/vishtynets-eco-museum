(()=>{
'use strict';
const $=s=>document.querySelector(s);
const screen=$('.screen-audio');
if(!screen)return;

const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const track=guide?.tracks?.[0];
if(!track)return;

const ACCESS_KEY='vishtynets_test_audio_access_v3';
const FULL_DURATION=Number(track.duration)||0;
const SAMPLE_DURATION=Number(track.preview?.seconds)||5;
const previewGlobal=track.preview?.global||'';
const previewMime=track.preview?.mime||'audio/webm;codecs=opus';
const b64=previewGlobal?window[previewGlobal]||'':'';
const audio=b64?new Audio(`data:${previewMime};base64,${b64}`):null;
if(audio)audio.preload='metadata';

let activated=sessionStorage.getItem(ACCESS_KEY)==='1';
let playing=false;

const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
const fmt=n=>{
  n=Math.max(0,Math.floor(Number(n)||0));
  const m=Math.floor(n/60),s=n%60;
  return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
};

const badge=$('.audio-guide-badge');
if(badge)badge.innerHTML=`<i></i>${guide.tracks.length} экспозиция добавлена`;
const heroText=$('.audio-guide-hero p');
if(heroText)heroText.textContent='Аудиогид уже собирается как настоящий плейлист музея. Список экспозиций открыт для просмотра, а воспроизведение полного аудио будет доступно после активации.';
const progressHead=$('.audio-guide-progress-head span');
if(progressHead)progressHead.textContent=`0 из ${guide.tracks.length} экспозиции`;
const start=$('.audio-guide-start');
if(start){start.disabled=false;start.textContent='Начать экскурсию'}
const note=$('.audio-guide-note');
if(note)note.textContent=`${track.title} · полная длительность ${fmt(FULL_DURATION)}. Для проверки сейчас доступен короткий фрагмент настоящей записи.`;
const count=$('.audio-guide-section-head>span');
if(count)count.textContent=`${guide.tracks.length} экспозиция`;
const heading=$('.audio-guide-section-head h2');
if(heading)heading.textContent='Экспозиции аудиогида';

const empty=$('.audio-guide-empty');
if(empty){
  empty.classList.add('audio-guide-track-card');
  empty.innerHTML=`<button class="audio-track-play" type="button" aria-label="Воспроизвести ${track.title}">${playSvg}</button><div class="audio-track-copy"><span>Экспозиция ${String(track.number).padStart(2,'0')}</span><strong>${track.title}</strong><p>${track.description}</p><small>${fmt(FULL_DURATION)} · полный трек после активации</small></div>`;
}

const player=$('.audio-guide-player');
const playerBtn=$('.audio-guide-play');
if(player){
  player.removeAttribute('aria-disabled');
  player.classList.add('is-ready');
  const strong=player.querySelector('strong'),small=player.querySelector('small');
  if(strong)strong.textContent=track.title;
  if(small)small.textContent=`Фрагмент 00:00 / ${fmt(SAMPLE_DURATION)} · полный трек ${fmt(FULL_DURATION)}`;
}
if(playerBtn){
  playerBtn.disabled=false;
  playerBtn.setAttribute('aria-label',`Воспроизвести ${track.title}`);
  playerBtn.innerHTML=playSvg;
}

const modal=document.createElement('div');
modal.className='audio-access-modal';
modal.setAttribute('aria-hidden','true');
modal.innerHTML=`<div class="audio-access-backdrop" data-audio-close></div><section class="audio-access-card" role="dialog" aria-modal="true" aria-labelledby="audioAccessTitle"><button class="audio-access-close" data-audio-close type="button" aria-label="Закрыть">×</button><span class="eyebrow">Доступ к плейлисту</span><h2 id="audioAccessTitle">Активировать аудиогид</h2><p>В рабочей версии полный плейлист будет открываться после оплаты через ЮKassa или ввода кода от сотрудника музея. Доступ действует 24 часа с первого запуска аудио. Сейчас можно проверить этот сценарий на коротком фрагменте ${track.title.toLowerCase()}.</p><button class="audio-access-test" type="button">Активировать тестовый доступ</button><div class="audio-access-future"><button type="button" disabled>Оплатить онлайн · скоро</button><button type="button" disabled>Ввести код · скоро</button></div><small>Тестовая активация не является оплатой. Полный аудиофайл не публикуется в открытом доступе.</small></section>`;
document.body.appendChild(modal);

function openAccess(){modal.classList.add('is-open');modal.setAttribute('aria-hidden','false')}
function closeAccess(){modal.classList.remove('is-open');modal.setAttribute('aria-hidden','true')}
function setProgress(current=0,duration=SAMPLE_DURATION){
  const safeDuration=Number.isFinite(duration)&&duration>0?duration:SAMPLE_DURATION;
  const bar=$('.audio-guide-progress-track i');
  if(bar)bar.style.width=`${Math.min(100,(current/safeDuration)*100)}%`;
  const small=player?.querySelector('small');
  if(small)small.textContent=`Фрагмент ${fmt(current)} / ${fmt(safeDuration)} · полный трек ${fmt(FULL_DURATION)}`;
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
