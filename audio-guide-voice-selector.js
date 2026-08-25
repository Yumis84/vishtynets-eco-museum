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
    const label=button.querySelector('[data-voice-label]');
    if(label)label.textContent=active?'Выбрано':'Слушать';
  });
}

function addStyles(){
  if(document.querySelector('style[data-audioguide-voice]'))return;
  const style=document.createElement('style');
  style.dataset.audioguideVoice='1';
  style.textContent=`
.audio-guide-voice-selector{margin:0 auto 28px;max-width:980px;padding:0 18px}
.audio-guide-voice-selector-inner{padding:20px;border:1px solid rgba(71,88,70,.16);border-radius:20px;background:rgba(248,247,242,.92);box-shadow:0 8px 24px rgba(35,45,35,.06)}
.audio-guide-voice-heading{display:flex;justify-content:space-between;align-items:end;gap:16px;margin-bottom:14px}
.audio-guide-voice-heading strong{font-size:18px;color:#344638}
.audio-guide-voice-heading span{font-size:13px;opacity:.68}
.audio-guide-voice-options{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}
.audio-guide-voice-option{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:12px;text-align:left;padding:14px 15px;border:1px solid rgba(71,88,70,.16);border-radius:15px;background:#fff;cursor:pointer;font:inherit;transition:.18s ease}
.audio-guide-voice-option:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 5px 14px rgba(35,45,35,.08)}
.audio-guide-voice-option.is-active{border-color:#6f846d;box-shadow:0 0 0 2px rgba(111,132,109,.15)}
.audio-guide-voice-option:disabled{opacity:.58;cursor:not-allowed}
.audio-guide-voice-icon{font-size:22px}
.audio-guide-voice-option b,.audio-guide-voice-option small{display:block}
.audio-guide-voice-option b{font-size:14px;color:#344638}
.audio-guide-voice-option small{margin-top:3px;font-size:12px;line-height:1.35;opacity:.68}
.audio-guide-voice-option i{font-style:normal;font-size:11px;white-space:nowrap;opacity:.72}
@media(max-width:680px){.audio-guide-voice-heading{display:block}.audio-guide-voice-heading span{display:block;margin-top:4px}.audio-guide-voice-options{grid-template-columns:1fr}}
`;
  document.head.appendChild(style);
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
        <i data-voice-label>${v.id===selectedId?'Выбрано':ok?'Слушать':'Скоро'}</i>
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

function init(){addStyles();applyVoice(selectedId);inject()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
