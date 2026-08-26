(()=>{
'use strict';
const loadScript=(src,attr,next)=>{if(document.querySelector(`script[${attr}]`)){next?.();return}const s=document.createElement('script');s.src=src;s.async=false;s.setAttribute(attr,'1');s.addEventListener('load',()=>next?.(),{once:true});s.addEventListener('error',()=>next?.(),{once:true});document.head.appendChild(s)};
const loadHomepageBrand=next=>loadScript('homepage-brand.js?v=1','data-homepage-brand',next);
const loadData=next=>{if(window.VISHTYNETS_AUDIO_GUIDES?.museum){next();return}loadScript('audio-guide-data.js?v=2','data-audioguide-data',next)};
const loadContinue=next=>loadScript('audio-guide-continue.js?v=1','data-audioguide-continue',next);
const loadPlayerNav=next=>loadScript('audio-guide-player-nav.js?v=8','data-audioguide-player-nav',next);
const loadRead=next=>loadScript('audio-guide-read.js?v=5','data-audioguide-read',()=>loadPlayerNav(next));
const loadVoiceSelector=next=>loadScript('audio-guide-voice-selector.js?v=6','data-audioguide-voice-selector',()=>loadRead(next));
const loadCore=()=>{
 if(document.querySelector('script[data-audioguide-core]')){loadVoiceSelector();return}
 loadScript('audio-guide-v2-core.js?v=14','data-audioguide-core',loadVoiceSelector);
};
loadHomepageBrand(()=>loadData(()=>loadContinue(loadCore)));
})();