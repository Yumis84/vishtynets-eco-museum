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
const halls=Array.isArray(guide?.halls)&&guide.halls.length?guide.halls:[...new Set(expositionTracks.map(t=>Number(t.hall)||1))].map(number=>({number,title:`Зал ${number}`}));
let currentTrack=introTrack||null,audio=null,audioTrackId=null;
const host=$('#audioGuideTracks')||$('.audio-guide-empty');
if(!host)return;
const playSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7z"/></svg>';
const pauseSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14M16 5v14"/></svg>';
function renderTracks(){
 host.innerHTML='';
 halls.forEach(hall=>{
  const section=document.createElement('section');section.className='audio-guide-hall';
  const title=document.createElement('h3');title.textContent=hall.title||`Зал ${hall.number}`;section.appendChild(title);
  expositionTracks.filter(t=>Number(t.hall)===Number(hall.number)).forEach(track=>{
   const card=document.createElement('article');card.className='audio-guide-track-card-v2';card.dataset.trackId=track.id;
   const button=document.createElement('button');button.type='button';button.className='audio-guide-track-play';button.innerHTML=playSvg;button.setAttribute('aria-label',`Слушать: ${track.title||''}`);
   button.addEventListener('click',()=>playTrack(track));
   const body=document.createElement('div');body.className='audio-guide-track-copy';
   const strong=document.createElement('strong');strong.textContent=track.title||'';
   const small=document.createElement('small');small.textContent=track.subtitle||'';
   body.append(strong,small);card.append(button,body);section.appendChild(card);
  });
  host.appendChild(section);
 });
}
function stopAudio(){if(audio){audio.pause();audio.src='';audio=null}audioTrackId=null}
function updateButtons(){document.querySelectorAll('.audio-guide-track-card-v2').forEach(card=>{const b=card.querySelector('.audio-guide-track-play');const active=card.dataset.trackId===audioTrackId&&audio&&!audio.paused;if(b)b.innerHTML=active?pauseSvg:playSvg})}
function playTrack(track){if(!track?.audio?.publicUrl)return;if(audio&&audioTrackId===track.id){if(audio.paused)audio.play().catch(()=>{});else audio.pause();updateButtons();return}stopAudio();audio=new Audio(track.audio.publicUrl);audio.preload='metadata';audioTrackId=track.id;currentTrack=track;audio.addEventListener('play',updateButtons);audio.addEventListener('pause',updateButtons);audio.addEventListener('ended',()=>{updateButtons()});audio.play().catch(()=>{});updateButtons()}
function injectProgress(){const player=screen.querySelector('.audio-guide-player');if(!player)return;player.removeAttribute('aria-disabled');const button=player.querySelector('.audio-guide-play');if(button){button.disabled=false;button.onclick=e=>{e.preventDefault();e.stopPropagation();if(currentTrack)playTrack(currentTrack)}}}
function init(){renderTracks();injectProgress()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();