(()=>{'use strict';
if(window.__VISHTYNETS_AUDIO_VOICE_RUNTIME__)return;window.__VISHTYNETS_AUDIO_VOICE_RUNTIME__=true;
const NativeAudio=window.Audio;
let activeAudio=null,activeSrc='';
window.Audio=function(...args){const el=new NativeAudio(...args);activeAudio=el;activeSrc=el.src||args[0]||'';el.addEventListener('loadstart',()=>{activeAudio=el;activeSrc=el.src||activeSrc},{passive:true});return el};
window.Audio.prototype=NativeAudio.prototype;
Object.setPrototypeOf(window.Audio,NativeAudio);
function filename(src){try{return new URL(src,document.baseURI).pathname.split('/').pop()}catch(_e){return String(src||'').split('/').pop()}}
function handleVoiceChange(){const a=activeAudio;if(!a)return;const oldFile=filename(activeSrc||a.src);a.pause();const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;const track=guide?.tracks?.find(t=>filename(t?.audio?.voiceBaseUrls?.alexey||t?.audio?.publicUrl)===oldFile);if(track?.audio?.publicUrl){a.src=new URL(track.audio.publicUrl,document.baseURI).href;activeSrc=a.src;a.load()}else{a.currentTime=0}a.dispatchEvent(new Event('timeupdate'));}
document.addEventListener('change',e=>{if(e.target?.matches?.('[data-audio-voice-select]'))setTimeout(handleVoiceChange,0)},false);
})();
