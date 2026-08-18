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
let currentTrackId=null;
let feature=null;
let featureSmall=null;
let advancePending=false;

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
function isPlaying(track){
  if(!track)return false;
  if(track.kind==='intro'){
    return document.querySelector('.audio-guide-start')?.textContent?.trim()==='Пауза';
  }
  const path=cardFor(track)?.querySelector('.audio-guide-track-action svg path')?.getAttribute('d')||'';
  return path==='M8 5v14M16 5v14';
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
  currentTrackId=null;
  advancePending=false;
  setFeatureState(false,message);
}

function startTrack(track){
  if(!track){
    stopSequence('Экскурсия завершена');
    return false;
  }
  currentTrackId=track.id;
  advancePending=false;

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
    if(!isPlaying(track))start.click();
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
  if(!isPlaying(track))card.click();
  return true;
}

function startSequence(){
  sequenceActive=true;
  pendingTrackId=null;
  advancePending=false;
  setFeatureState(true,'Автопереход включён');

  if(document.querySelector('.audio-guide-start')?.textContent?.trim()==='Пауза'){
    currentTrackId=intro.id;
    return;
  }
  const selected=selectedTrack();
  if(selected){
    currentTrackId=selected.id;
    if(!isPlaying(selected))startTrack(selected);
    return;
  }
  startTrack(intro||ordered[0]);
}

function toggleSequence(){
  if(sequenceActive){
    stopSequence();
    return;
  }
  startSequence();
}

function advanceFromCurrent(){
  if(!sequenceActive||advancePending)return;
  const current=byId.get(currentTrackId)||selectedTrack()||intro;
  const next=nextAfter(current);
  if(!next){
    stopSequence('Экскурсия завершена');
    return;
  }
  advancePending=true;
  setFeatureState(true,'Следующий трек…');
  window.setTimeout(()=>{
    if(!sequenceActive)return;
    advancePending=false;
    startTrack(next);
  },180);
}

function bindProgressWatcher(){
  const progress=document.querySelector('.audio-guide-progress-track');
  if(!progress)return;
  const check=()=>{
    const value=Number(progress.getAttribute('aria-valuenow'))||0;
    if(value<99.5){advancePending=false;return}
    if(sequenceActive)advanceFromCurrent();
  };
  new MutationObserver(check).observe(progress,{attributes:true,attributeFilter:['aria-valuenow']});
}

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
  bindProgressWatcher();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindFeature,{once:true});
else bindFeature();

// Keep the sequence aligned if the visitor manually chooses a track.
document.addEventListener('click',event=>{
  if(!sequenceActive)return;
  const start=event.target.closest('.audio-guide-start');
  if(start){currentTrackId=intro.id;advancePending=false;return}
  const card=event.target.closest('.audio-guide-track-card-v2');
  if(card?.dataset?.trackId){currentTrackId=card.dataset.trackId;advancePending=false}
});

// The prototype activation button unlocks the catalogue in the core player.
// Resume the exact track that the sequential mode was waiting for.
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
  },80);
});
})();
