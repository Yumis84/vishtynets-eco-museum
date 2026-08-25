(()=>{
'use strict';
const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
if(!guide?.voiceVersions?.length)return;
const storageKey='vishtynets_audio_voice_v1';
const versions=guide.voiceVersions;
const available=v=>v.status==='available';
let selectedId=localStorage.getItem(storageKey)||guide.defaultVoice||versions.find(available)?.id;
if(!versions.some(v=>v.id===selectedId&&available(v)))selectedId=versions.find(available)?.id;

function applyVoice(id){
  const version=versions.find(v=>v.id===id);
  if(!version||!available(version))return;
  selectedId=id;
  try{localStorage.setItem(storageKey,id)}catch(_err){}
  guide.tracks.forEach(track=>{
    if(!track.audio?.publicUrl)return;
    const filename=track.audio.publicUrl.split('/').pop();
    track.audio.publicUrl=`${version.audioBase}/${filename}`;
    track.audio.voiceVersion=id;
  });
  const select=document.querySelector('[data-audio-voice-select]');
  if(select)select.value=id;
}

function addStyles(){
  if(document.querySelector('style[data-audioguide-voice]'))return;
  const style=document.createElement('style');
  style.dataset.audioguideVoice='1';
  style.textContent=`
.audio-guide-voice-selector{margin:10px auto 30px;max-width:980px;padding:0 18px}
.audio-guide-voice-selector-inner{display:flex;align-items:center;gap:12px;padding:10px 14px;border:1px solid rgba(71,88,70,.16);border-radius:14px;background:rgba(248,247,242,.92);box-shadow:0 5px 16px rgba(35,45,35,.05)}
.audio-guide-voice-selector label{font-size:13px;font-weight:600;color:#344638;white-space:nowrap}
.audio-guide-voice-select{flex:1;min-width:0;padding:9px 34px 9px 11px;border:1px solid rgba(71,88,70,.2);border-radius:10px;background:#fff;color:#344638;font:inherit;font-size:14px}
.audio-guide-voice-note{font-size:12px;opacity:.62;white-space:nowrap}
.audio-guide-hall-divider{max-width:980px;margin:38px auto 24px;padding:0 18px}
.audio-guide-hall-divider-inner{display:flex;align-items:center;gap:14px}
.audio-guide-hall-divider::before,.audio-guide-hall-divider::after{content:'';height:2px;flex:1;background:rgba(71,88,70,.22);border-radius:2px}
.audio-guide-hall-divider-title{padding:9px 16px;border:1px solid rgba(71,88,70,.2);border-radius:12px;background:#f8f7f2;color:#344638;font-size:18px;font-weight:700;letter-spacing:.02em;white-space:nowrap}
@media(max-width:680px){.audio-guide-voice-selector-inner{display:block;padding:12px}.audio-guide-voice-selector label{display:block;margin-bottom:6px}.audio-guide-voice-note{display:block;margin-top:6px}.audio-guide-hall-divider{margin-top:30px}.audio-guide-hall-divider-title{font-size:16px;padding:8px 12px}}
`;
  document.head.appendChild(style);
}

function injectVoice(){
  if(document.querySelector('.audio-guide-voice-selector'))return;
  const anchor=document.querySelector('.audio-guide-player')||document.querySelector('.audio-guide-hero')||document.querySelector('.screen-audio');
  if(!anchor)return;
  const wrap=document.createElement('section');
  wrap.className='audio-guide-voice-selector';
  wrap.setAttribute('aria-label','Выбор озвучки');
  wrap.innerHTML=`<div class="audio-guide-voice-selector-inner"><label for="audio-guide-voice">Озвучка</label><select id="audio-guide-voice" class="audio-guide-voice-select" data-audio-voice-select aria-label="Выбор озвучки">${versions.map(v=>`<option value="${v.id}" ${v.id===selectedId?'selected':''} ${available(v)?'':'disabled'}>${v.id==='alexey'?'🎙️ ': '✨ '}${v.title}${available(v)?'':' — скоро'}</option>`).join('')}</select><span class="audio-guide-voice-note">Выбор сохраняется</span></div>`;
  anchor.parentNode.insertBefore(wrap,anchor.nextSibling);
  wrap.querySelector('select').addEventListener('change',e=>applyVoice(e.target.value));
}

function injectHallDividers(){
  const tracks=[...document.querySelectorAll('[data-audio-track],[data-track-id],[data-audio-id]')];
  if(!tracks.length)return;
  const hallMarkers=new Map();
  guide.tracks.forEach((track,index)=>{
    const hall=track.hall||track.room||track.exposition?.hall;
    if(hall&&!hallMarkers.has(hall))hallMarkers.set(hall,index);
  });
  if(hallMarkers.size<2)return;
  [...hallMarkers.entries()].forEach(([hall,index])=>{
    const target=tracks[index];
    if(!target||target.previousElementSibling?.classList.contains('audio-guide-hall-divider'))return;
    const divider=document.createElement('div');
    divider.className='audio-guide-hall-divider';
    divider.innerHTML=`<div class="audio-guide-hall-divider-inner"><span class="audio-guide-hall-divider-title">ЗАЛ ${hall}</span></div>`;
    target.parentNode.insertBefore(divider,target);
  });
}

function init(){addStyles();applyVoice(selectedId);injectVoice();injectHallDividers()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
