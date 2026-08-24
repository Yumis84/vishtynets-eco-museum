(()=>{
'use strict';
const screen=document.querySelector('.screen-audio');
if(!screen)return;
const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
if(!guide?.tracks?.length)return;
const tracks=guide.tracks;
const free=tracks.filter(t=>t.audio?.status==='available');
const badge=document.querySelector('.audio-guide-badge');
if(badge)badge.innerHTML=`<i></i>${free.length} из ${tracks.length} дорожек доступно`;
const head=document.querySelector('.audio-guide-progress-head span');
if(head)head.textContent=`0 из ${tracks.length} дорожек`;
const count=document.querySelector('.audio-guide-section-head>span');
if(count)count.textContent=`${tracks.length} дорожек`;
const hero=document.querySelector('.audio-guide-hero p');
if(hero)hero.textContent='Аудиогид Виштынецкого экомузея · две части экскурсии';
const empty=document.querySelector('.audio-guide-empty');
if(!empty)return;
empty.classList.add('audio-guide-track-list');
empty.innerHTML=tracks.map((t,i)=>{const available=t.audio?.status==='available';return `<article class="audio-guide-track-card${available?' is-available':' is-pending'}" data-track-id="${t.id}"><button class="audio-track-play" type="button" ${available?'':'disabled'} aria-label="${available?'Воспроизвести':'Аудиозапись пока недоступна'}: ${t.title}">${available?'▶':'○'}</button><div class="audio-track-copy"><span>Дорожка ${String(i+1).padStart(2,'0')} · Зал ${t.hall}</span><strong>${t.title}</strong><p>${t.description||''}</p><small>${available?'Старая запись · временная версия':'Аудиозапись готовится'}</small></div></article>`}).join('');
const player=document.querySelector('.audio-guide-player');
const playerBtn=document.querySelector('.audio-guide-play');
let audio=null,current=null;
function fmt(n){n=Math.max(0,Math.floor(Number(n)||0));return `${String(Math.floor(n/60)).padStart(2,'0')}:${String(n%60).padStart(2,'0')}`}
function load(t){if(!t?.audio?.publicUrl)return;current=t;if(audio){audio.pause();audio.src=''}audio=new Audio(t.audio.publicUrl);audio.preload='metadata';audio.setAttribute('playsinline','');if(player){player.classList.add('is-ready');const strong=player.querySelector('strong');if(strong)strong.textContent=t.title}if(playerBtn){playerBtn.disabled=false;playerBtn.innerHTML='▶';playerBtn.setAttribute('aria-label',`Воспроизвести ${t.title}`)}audio.addEventListener('timeupdate',update);audio.addEventListener('loadedmetadata',update);audio.addEventListener('ended',()=>setPlaying(false));audio.play().then(()=>setPlaying(true)).catch(()=>{});}
function update(){if(!audio)return;const dur=audio.duration||0,cur=audio.currentTime||0;const bar=document.querySelector('.audio-guide-progress-track i');if(bar)bar.style.width=dur?`${cur/dur*100}%`:'0%';const small=player?.querySelector('small');if(small)small.textContent=`${fmt(cur)} / ${fmt(dur)} · ${current?.title||''}`;}
function setPlaying(v){document.querySelectorAll('.audio-guide-play,.audio-track-play').forEach(b=>{b.innerHTML=v?'Ⅱ':'▶';b.classList.toggle('is-playing',v)})}
function toggle(){if(!audio){load(free[0]);return}if(audio.paused){audio.play().then(()=>setPlaying(true)).catch(()=>{});}else{audio.pause();setPlaying(false)}}
empty.querySelectorAll('.audio-track-play').forEach((b,i)=>b.addEventListener('click',()=>{if(tracks[i].audio?.status==='available'){if(current?.id===tracks[i].id)toggle();else load(tracks[i])}}));
start?.addEventListener('click',toggle);playerBtn?.addEventListener('click',toggle);
})();