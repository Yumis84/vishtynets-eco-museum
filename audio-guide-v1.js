(()=>{
'use strict';
const screen=document.querySelector('.screen-audio');
if(!screen)return;
const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const track=guide?.tracks?.[0];
if(!track)return;
const src=track.audio?.publicUrl;
const fmt=n=>{n=Math.max(0,Math.floor(Number(n)||0));return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`};
const badge=document.querySelector('.audio-guide-badge');
if(badge)badge.innerHTML='<i></i>1 дорожка доступна';
const head=document.querySelector('.audio-guide-progress-head span');
if(head)head.textContent='0 из 1 дорожки';
const count=document.querySelector('.audio-guide-section-head>span');
if(count)count.textContent='1 дорожка';
const hero=document.querySelector('.audio-guide-hero p');
if(hero)hero.textContent='Добро пожаловать в аудиогид Виштынецкого экомузея.';
const start=document.querySelector('.audio-guide-start');
const empty=document.querySelector('.audio-guide-empty');
if(empty){empty.classList.add('audio-guide-track-card');empty.innerHTML=`<button class="audio-track-play" type="button" aria-label="Воспроизвести ${track.title}">▶</button><div class="audio-track-copy"><span>Дорожка 01</span><strong>${track.title}</strong><p>${track.description||''}</p><small>Старая запись · временная версия</small></div>`}
let audio=null;
if(src){audio=new Audio(src);audio.preload='metadata';audio.setAttribute('playsinline','');}
const player=document.querySelector('.audio-guide-player');
const playerBtn=document.querySelector('.audio-guide-play');
if(player){player.classList.add('is-ready');const strong=player.querySelector('strong');if(strong)strong.textContent=track.title;}
if(playerBtn){playerBtn.disabled=false;playerBtn.innerHTML='▶';playerBtn.setAttribute('aria-label',`Воспроизвести ${track.title}`)}
function update(){if(!audio)return;const dur=audio.duration||0,cur=audio.currentTime||0;const bar=document.querySelector('.audio-guide-progress-track i');if(bar)bar.style.width=dur?`${cur/dur*100}%`:'0%';const small=player?.querySelector('small');if(small)small.textContent=`${fmt(cur)} / ${fmt(dur)} · старая запись`}
function setPlaying(v){document.querySelectorAll('.audio-guide-play,.audio-track-play').forEach(b=>{b.innerHTML=v?'Ⅱ':'▶';b.classList.toggle('is-playing',v)})}
function toggle(){if(!audio)return;if(audio.paused){audio.play().then(()=>setPlaying(true)).catch(()=>{});}else{audio.pause();setPlaying(false)}}
start?.addEventListener('click',toggle);playerBtn?.addEventListener('click',toggle);document.querySelector('.audio-track-play')?.addEventListener('click',toggle);
audio?.addEventListener('timeupdate',update);audio?.addEventListener('loadedmetadata',update);audio?.addEventListener('ended',()=>setPlaying(false));
})();