(()=>{
'use strict';
const loadCore=()=>{
  if(document.querySelector('script[data-audioguide-core]'))return;
  const core=document.createElement('script');
  core.src='audio-guide-v2-core.js?v=6';
  core.async=false;
  core.dataset.audioguideCore='1';
  document.head.appendChild(core);
};

if(window.__VISHTYNETS_AUDIO_SEQUENCE__){
  loadCore();
  return;
}

const sequence=document.createElement('script');
sequence.src='audio-guide-sequence.js?v=1';
sequence.async=false;
sequence.dataset.audioguideSequence='1';
sequence.addEventListener('load',loadCore,{once:true});
sequence.addEventListener('error',loadCore,{once:true});
document.head.appendChild(sequence);
})();
