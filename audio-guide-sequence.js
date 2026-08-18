(()=>{
'use strict';
if(window.__VISHTYNETS_AUDIO_SEQUENCE__)return;
window.__VISHTYNETS_AUDIO_SEQUENCE__=true;

const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;

const intro=tracks.find(t=>t.kind==='intro')||tracks[0];
const expositions=tracks
  .filter(t=>t.kind==='exposition')
  .slice()
  .sort((a,b)=>((Number(a.hall)||1)-(Number(b.hall)||1))||((Number(a.hallOrder)||Number(a.number)||0)-(Number(b.hallOrder)||Number(b.number)||0)));
const ordered=[intro,...expositions].filter(Boolean);
const byId=new Map(ordered.map(track=>[track.id,track]));

let sequenceActive=false;
let pendingTrackId=null;
let latestAudio=null;
let feature=null;
let featureSmall=null;

const NativeAudio=window.Audio;
function trackUrl(track){
  if(!track?.audio?.publicUrl)return null;
  try{return new URL(track.audio.publicUrl,window.location.href).href}catch(_err){return null}
}
function trackForAudio(media){
  if(!media)return null;
  const src=media.currentSrc||media.src||'';
  return ordered.find(track=>trackUrl(track)===src)||null;
}
function nextAfter(track){
  const index=ordered.findIndex(item=>item.id===track?.id);
  return index>=0?ordered[index+1]||null:null;
}
function selectedTrack(){
  const id=document.querySelector('.audio-guide-track-card-v2.is-selected')?.dataset?.trackId;
  return id?byId.get(id)||null:null;
}
function cardFor(track){
  if(!track?.id)return null;
  return document.querySelector(`.audio-guide-track-card-v2[data-track-id="${track.id}"]`);
}

function setFeatureState(active,text){
  if(!feature)return;
  feature.setAttribute('aria-pressed',active?'true':'false');
  feature.dataset.sequenceActive=active?'1':'0';
  if(featureSmall)featureSmall.textContent=text||(active?'Автопереход включён':'Треки по порядку');
  feature.style.cursor='pointer';
  feature.style.userSelect='none';
  feature.style.boxShadow=active?'0 0 0 2px rgba(77,105,81,.18)':'';
}

function stopSequence(message='Треки по порядку'){
  sequenceActive=false;
  pendingTrackId=null;
  setFeatureState(false,message);
}

function startTrack(track){
  if(!track){
    stopSequence('Экскурсия завершена');
    return false;
  }

  if(!track.audio?.publicUrl){
    const card=cardFor(track);
    stopSequence('Следующий трек ещё не загружен');
    card?.click();
    return false;
  }

  if(track.kind==='intro'){
    pendingTrackId=null;
    const start=document.querySelector('.audio-guide-start');
    if(!start||start.disabled){
      stopSequence('Приветствие сейчас недоступно');
      return false;
    }
    setFeatureState(true,'Автопереход включён');
    start.click();
    return true;
  }

  const card=cardFor(track);
  if(!card){
    stopSequence('Трек сейчас недоступен');
    return false;
  }

  if(card.dataset.locked==='1'){
    pendingTrackId=track.id;
    setFeatureState(true,'Ждёт активации');
    card.click();
    return true;
  }

  pendingTrackId=null;
  setFeatureState(true,'Автопереход включён');
  card.click();
  return true;
}

function startSequence(){
  sequenceActive=true;
  pendingTrackId=null;
  setFeatureState(true,'Автопереход включён');

  const current=trackForAudio(latestAudio);
  if(current&&latestAudio){
    if(latestAudio.ended){
      const next=nextAfter(current);
      startTrack(next||ordered[0]);
      return;
    }
    if(latestAudio.paused){
      const result=latestAudio.play();
      if(result&&typeof result.catch==='function')result.catch(()=>startTrack(current));
    }
    return;
  }

  const selected=selectedTrack();
  startTrack(selected||ordered[0]);
}

function toggleSequence(){
  if(sequenceActive){
    stopSequence();
    return;
  }
  startSequence();
}

function onEnded(media){
  if(!sequenceActive)return;
  const current=trackForAudio(media);
  if(!current)return;
  const next=nextAfter(current);
  if(!next){
    stopSequence('Экскурсия завершена');
    return;
  }
  setFeatureState(true,'Следующий трек…');
  window.setTimeout(()=>{
    if(sequenceActive)startTrack(next);
  },180);
}

function WrappedAudio(...args){
  const media=new NativeAudio(...args);
  latestAudio=media;
  media.addEventListener('ended',()=>onEnded(media));
  return media;
}
WrappedAudio.prototype=NativeAudio.prototype;
try{Object.setPrototypeOf(WrappedAudio,NativeAudio)}catch(_err){}
window.Audio=WrappedAudio;

function bindFeature(){
  feature=document.querySelector('.audio-guide-features .audio-guide-feature');
  if(!feature)return;
  featureSmall=feature.querySelector('small');
  feature.setAttribute('role','button');
  feature.setAttribute('tabindex','0');
  feature.setAttribute('aria-label','Слушать треки по порядку');
  feature.setAttribute('aria-pressed','false');
  feature.addEventListener('click',toggleSequence);
  feature.addEventListener('keydown',event=>{
    if(event.key!=='Enter'&&event.key!==' ')return;
    event.preventDefault();
    toggleSequence();
  });
  setFeatureState(false,'Треки по порядку');
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindFeature,{once:true});
else bindFeature();

// The current prototype activation button is handled by the core player first.
// If sequence mode was waiting at a locked track, resume that exact track afterwards.
document.addEventListener('click',event=>{
  if(!sequenceActive||!pendingTrackId)return;
  if(!event.target.closest('.audio-access-test-v2'))return;
  const requestedId=pendingTrackId;
  window.setTimeout(()=>{
    if(!sequenceActive||pendingTrackId!==requestedId)return;
    const track=byId.get(requestedId);
    const card=cardFor(track);
    if(!track||!card||card.dataset.locked==='1')return;
    pendingTrackId=null;
    startTrack(track);
  },40);
});
})();
