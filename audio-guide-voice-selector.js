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
  document.querySelectorAll('[data-audio-voice]').forEach(button=>{
    const active=button.dataset.audioVoice===id;
    button.classList.toggle('is-active',active);
    button.setAttribute('aria-pressed',active?'true':'false');
  });
}

function inject(){
  if(document.querySelector('.audio-guide-voice-selector'))return;
  const anchor=document.querySelector('.audio-guide-hero')||document.querySelector('.screen-audio');
  if(!anchor)return;
  const wrap=document.createElement('section');
  wrap.className='audio-guide-voice-selector';
  wrap.setAttribute('aria-label','Выбор озвучки');
  wrap.innerHTML=`<div class="audio-guide-voice-selector-inner">
    <div class="audio-guide-voice-heading"><strong>Выберите озвучку</strong><span>Одна экскурсия — два варианта подачи</span></div>
    <div class="audio-guide-voice-options">${versions.map(v=>{
      const ok=available(v);
      return `<button type="button" class="audio-guide-voice-option${v.id===selectedId?' is-active':''}" data-audio-voice="${v.id}" ${ok?'':'disabled'} aria-pressed="${v.id===selectedId?'true':'false'}">
        <span class="audio-guide-voice-icon">${v.id==='alexey'?'🎙️':'✨'}</span>
        <span><b>${v.title}</b><small>${ok?v.description:'Скоро будет доступна'}</small></span>
        <i>${v.id===selectedId?'Выбрано':ok?'Слушать':'Скоро'}</i>
      </button>`;
    }).join('')}</div>
  </div>`;
  anchor.parentNode.insertBefore(wrap,anchor.nextSibling);
  wrap.addEventListener('click',event=>{
    const button=event.target.closest('[data-audio-voice]');
    if(!button||button.disabled)return;
    applyVoice(button.dataset.audioVoice);
  });
}

function init(){
  applyVoice(selectedId);
  inject();
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
