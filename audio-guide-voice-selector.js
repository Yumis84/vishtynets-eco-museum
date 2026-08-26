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
 const version=versions.find(v=>v.id===id); if(!version||!available(version))return;
 selectedId=id; try{localStorage.setItem(storageKey,id)}catch(_err){}
 guide.tracks.forEach(track=>{
  if(!track.audio)return;
  if(!track.audio.voiceBaseUrls)track.audio.voiceBaseUrls={};
  if(track.audio.publicUrl&&!track.audio.voiceBaseUrls.alexey)track.audio.voiceBaseUrls.alexey=track.audio.publicUrl;
  const original=track.audio.voiceBaseUrls.alexey; const filename=original?.split('/').pop(); if(!filename)return;
  track.audio.voiceBaseUrls[id]=id==='alexey'?original:`${version.audioBase}/${filename}`;
  track.audio.publicUrl=track.audio.voiceBaseUrls[id]; track.audio.voiceVersion=id;
 });
 const select=document.querySelector('[data-audio-voice-select]'); if(select)select.value=id;
}
function addStyles(){if(document.querySelector('style[data-audioguide-voice]'))return;const style=document.createElement('style');style.dataset.audioguideVoice='1';style.textContent=`
.audio-guide-voice-selector{width:100%;margin:8px 0 0;padding:0;box-sizing:border-box;position:relative;z-index:20}.audio-guide-voice-selector-inner{display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid rgba(71,88,70,.18);border-radius:12px;background:#f8f7f2;box-sizing:border-box}.audio-guide-voice-selector label{font-size:12px;font-weight:800;color:#344638;white-space:nowrap}.audio-guide-voice-select{flex:1;min-width:0;padding:7px 28px 7px 9px;border:1px solid rgba(71,88,70,.25);border-radius:9px;background:#fff;color:#344638;font:inherit;font-size:13px;appearance:auto}.audio-guide-voice-note{font-size:10px;opacity:.58;white-space:nowrap}@media(max-width:680px){.audio-guide-voice-selector-inner{gap:7px;padding:7px 8px}.audio-guide-voice-selector label{font-size:11px}.audio-guide-voice-select{font-size:12px;padding:7px 22px 7px 8px}.audio-guide-voice-note{display:none}}`;document.head.appendChild(style)}
function buildSelector(){const wrap=document.createElement('section');wrap.className='audio-guide-voice-selector';wrap.setAttribute('aria-label','Выбор рассказчика');wrap.innerHTML=`<div class="audio-guide-voice-selector-inner"><label for="audio-guide-voice">Рассказчик</label><select id="audio-guide-voice" class="audio-guide-voice-select" data-audio-voice-select aria-label="Выбор рассказчика">${versions.map(v=>`<option value="${v.id}" ${v.id===selectedId?'selected':''} ${available(v)?'':'disabled'}>${v.id==='alexey'?'🎙️ ':'✨ '}${v.title}${available(v)?'':' — скоро'}</option>`).join('')}</select><span class="audio-guide-voice-note">Сохраняется</span></div>`;wrap.querySelector('select').addEventListener('change',e=>applyVoice(e.target.value));return wrap}
function injectVoice(){const progress=document.querySelector('.screen-audio .audio-guide-progress'),track=progress?.querySelector('.audio-guide-progress-track');if(!progress||!track)return false;document.querySelectorAll('.audio-guide-voice-selector').forEach(el=>{if(!progress.contains(el))el.remove()});let existing=progress.querySelector('.audio-guide-voice-selector');if(existing){if(existing.previousElementSibling!==track)track.insertAdjacentElement('afterend',existing);const select=existing.querySelector('[data-audio-voice-select]');if(select)select.value=selectedId;return true}track.insertAdjacentElement('afterend',buildSelector());return true}
function init(){addStyles();applyVoice(selectedId);injectVoice();let scheduled=false;const observer=new MutationObserver(()=>{if(scheduled)return;scheduled=true;requestAnimationFrame(()=>{scheduled=false;injectVoice()})});observer.observe(document.body,{childList:true,subtree:true})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();