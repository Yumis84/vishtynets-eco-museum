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
.audio-guide-voice-selector{width:100%;margin:6px 0 0;padding:0;box-sizing:border-box}
.audio-guide-voice-selector-inner{display:flex;align-items:center;gap:10px;padding:7px 9px;border:1px solid rgba(71,88,70,.16);border-radius:11px;background:rgba(248,247,242,.94);box-sizing:border-box}
.audio-guide-voice-selector label{font-size:12px;font-weight:700;color:#344638;white-space:nowrap}
.audio-guide-voice-select{flex:1;min-width:0;padding:6px 26px 6px 8px;border:1px solid rgba(71,88,70,.2);border-radius:8px;background:#fff;color:#344638;font:inherit;font-size:13px}
.audio-guide-voice-note{font-size:10px;opacity:.58;white-space:nowrap}
@media(max-width:680px){.audio-guide-voice-selector-inner{gap:7px;padding:6px 8px}.audio-guide-voice-selector label{font-size:11px}.audio-guide-voice-select{font-size:12px;padding:6px 22px 6px 7px}.audio-guide-voice-note{display:none}}
`;
  document.head.appendChild(style);
}

function buildSelector(){
  const wrap=document.createElement('section');
  wrap.className='audio-guide-voice-selector';
  wrap.setAttribute('aria-label','Выбор озвучки');
  wrap.innerHTML=`<div class="audio-guide-voice-selector-inner"><label for="audio-guide-voice">Озвучка</label><select id="audio-guide-voice" class="audio-guide-voice-select" data-audio-voice-select aria-label="Выбор озвучки">${versions.map(v=>`<option value="${v.id}" ${v.id===selectedId?'selected':''} ${available(v)?'':'disabled'}>${v.id==='alexey'?'🎙️ ':'✨ '}${v.title}${available(v)?'':' — скоро'}</option>`).join('')}</select><span class="audio-guide-voice-note">Выбор сохраняется</span></div>`;
  wrap.querySelector('select').addEventListener('change',e=>applyVoice(e.target.value));
  return wrap;
}

function injectVoice(){
  if(document.querySelector('.audio-guide-voice-selector'))return true;
  const player=document.querySelector('.audio-guide-player');
  if(!player)return false;
  const wrap=buildSelector();
  // Put the selector immediately below the visible progress/scrubber row.
  const scrubber=player.querySelector('.audio-guide-scrubber, .audio-scrubber, input[type="range"]');
  if(scrubber){
    const row=scrubber.closest('.audio-guide-progress,.audio-progress,.audio-guide-progress-row,.audio-progress-row');
    (row||scrubber).insertAdjacentElement('afterend',wrap);
    return true;
  }
  // Fallback: insert before the transcript/controls that follow the player content,
  // never after the whole player element.
  const progressLike=[...player.querySelectorAll('div')].find(el=>/0:00|\d+:\d+/.test(el.textContent||'')&&el.querySelector?.('button'));
  if(progressLike){progressLike.insertAdjacentElement('afterend',wrap);return true}
  player.insertBefore(wrap,player.firstChild?.nextSibling||null);
  return true;
}

function init(){
  addStyles();
  applyVoice(selectedId);
  injectVoice();
  // The core script can finish rendering the player after this script runs.
  const observer=new MutationObserver(()=>{
    if(injectVoice())observer.disconnect();
  });
  observer.observe(document.body,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),10000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
