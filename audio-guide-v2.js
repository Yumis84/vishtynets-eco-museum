(()=>{
'use strict';
const loadHomepageBrand=()=>{
  if(document.querySelector('script[data-homepage-brand]'))return;
  const brand=document.createElement('script');
  brand.src='homepage-brand.js?v=1';
  brand.async=false;
  brand.dataset.homepageBrand='1';
  document.head.appendChild(brand);
};
loadHomepageBrand();

const loadVoiceSelector=()=>{
  if(document.querySelector('script[data-audioguide-voice-selector]'))return;
  const voice=document.createElement('script');
  voice.src='audio-guide-voice-selector.js?v=2';
  voice.async=false;
  voice.dataset.audioguideVoiceSelector='1';
  document.head.appendChild(voice);
};

const loadCore=()=>{
  if(document.querySelector('script[data-audioguide-core]')){
    loadVoiceSelector();
    return;
  }
  const core=document.createElement('script');
  core.src='audio-guide-v2-core.js?v=10';
  core.async=false;
  core.dataset.audioguideCore='1';
  core.addEventListener('load',loadVoiceSelector,{once:true});
  document.head.appendChild(core);
};

if(window.__VISHTYNETS_AUDIO_SEQUENCE__){
  loadCore();
  return;
}

const sequence=document.createElement('script');
sequence.src='audio-guide-sequence.js?v=3';
sequence.async=false;
sequence.dataset.audioguideSequence='1';
sequence.addEventListener('load',loadCore,{once:true});
sequence.addEventListener('error',loadCore,{once:true});
document.head.appendChild(sequence);
})();