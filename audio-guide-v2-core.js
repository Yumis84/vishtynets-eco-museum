(()=>{
'use strict';
const $=s=>document.querySelector(s),screen=$('.screen-audio');
if(!screen)return;
const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;
const expositionTracks=tracks.filter(t=>t.kind==='exposition');
const halls=Array.isArray(guide.halls)&&guide.halls.length?guide.halls:[...new Set(expositionTracks.map(t=>Number(t.hall)||1))].map(number=>({number,title:`Зал ${number}`}));
const intro={id:'vstuplenie',kind:'intro',title:'Вступление',description:'Бесплатное вступление к аудиогиду.',access:'free',audio:{publicUrl:'assets/audio/vstuplenie/alexey-vstuplenie.mp3',status:'available',voiceBaseUrls:{alexey:'assets/audio/vstuplenie/alexey-vstuplenie.mp3',grok:'assets/audio/vstuplenie/AI-vstuplenie.mp3'}}};
/* REST OF FILE TOO LARGE - ABORT */
})();
