(()=>{
'use strict';
if(window.__VISHTYNETS_AUDIO_SEQUENCE__)return;
window.__VISHTYNETS_AUDIO_SEQUENCE__=true;
const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
const tracks=Array.isArray(guide?.tracks)?guide.tracks:[];
if(!guide||!tracks.length)return;
const intro=tracks.find(t=>t.kind==='intro')||tracks[0];
const expositions=tracks.filter(t=>t.kind==='exposition').slice().sort((a,b)=>((Number(a.hall)||1)-(Number(b.hall)||1))||((Number(a.hallOrder)||Number(a.number)||0)-(Number(b.hallOrder)||Number(b.number)||0)));
const ordered=[intro,...expositions].filter(Boolean),byId=new Map(ordered.map(t=>[t.id,t]));
let sequenceActive=false,sequencePaused=false,currentTrackId=null,feature=null,featureSmall=null,featureIconPath=null,advancePending=false;
const playPath='M8 5v14l11-7z',pausePath='M8 5v14M16 5v14';
function selectedTrack(){const id=document.querySelector('.audio-guide-track-card-v2.is-selected')?.dataset?.trackId;return id?byId.get(id)||null:null}
function cardFor(t){return t?.id?document.querySelector(`.audio-guide-track-card-v2[data-track-id="${t.id}"]`):null}
function isPlaying(t){if(!t)return false;if(t.kind==='intro')return document.querySelector('.audio-guide-start')?.textContent?.trim()==='Пауза';return cardFor(t)?.querySelector('.audio-guide-track-action svg path')?.getAttribute('d')===pausePath}
function setFeatureState(active,text,playing){if(!feature)return;feature.setAttribute('aria-pressed',active?'true':'false');feature.dataset.sequenceActive=active?'1':'0';feature.dataset.sequencePaused=active&&!playing?'1':'0';if(featureSmall)featureSmall.textContent=text||'Треки по порядку';if(featureIconPath)featureIconPath.setAttribute('d',playing?pausePath:playPath);feature.setAttribute('aria-label',playing?'Поставить треки по порядку на паузу':active?'Продолжить треки по порядку':'Слушать треки по порядку')}
function current(){return byId.get(currentTrackId)||selectedTrack()||intro}
function startTrack(t){if(!t)return;currentTrackId=t.id;sequencePaused=false;advancePending=false;if(t.kind==='intro'){const b=document.querySelector('.audio-guide-start');if(b&&!isPlaying(t))b.click();return}const c=cardFor(t);if(c){c.click();setTimeout(()=>{const a=document.querySelector('.audio-guide-player audio');a?.play().catch(()=>{})},100)}}
function pauseSequence(){const t=current();if(!t)return;if(t.kind==='intro'){const b=document.querySelector('.audio-guide-start');if(b&&isPlaying(t))b.click()}else{const c=cardFor(t);if(c&&isPlaying(t))c.click()}sequencePaused=true;setFeatureState(true,'На паузе',false)}
function resumeSequence(){const t=current();if(!t)return;sequencePaused=false;startTrack(t);setFeatureState(true,'Автопереход включён',true)}
function startSequence(){sequenceActive=true;const t=selectedTrack()||intro;currentTrackId=t.id;if(!isPlaying(t))startTrack(t);setFeatureState(true,'Автопереход включён',true)}
function toggleSequence(){if(!sequenceActive){startSequence();return}if(sequencePaused){resumeSequence();return}pauseSequence()}
function bind(){feature=document.querySelector('.audio-guide-features .audio-guide-feature');if(!feature)return;featureSmall=feature.querySelector('small');featureIconPath=feature.querySelector('svg path');feature.setAttribute('role','button');feature.setAttribute('tabindex','0');feature.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();toggleSequence()});feature.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toggleSequence()}});setFeatureState(false,'Треки по порядку',false);const p=document.querySelector('.audio-guide-progress-track');if(p)new MutationObserver(()=>{const v=Number(p.getAttribute('aria-valuenow'))||0;if(v<99.5){advancePending=false;return}if(sequenceActive&&!sequencePaused&&!advancePending){const i=ordered.findIndex(x=>x.id===current()?.id),n=ordered[i+1];if(!n){sequenceActive=false;setFeatureState(false,'Экскурсия завершена',false);return}advancePending=true;setTimeout(()=>{if(sequenceActive&&!sequencePaused)startTrack(n);advancePending=false},180)}}).observe(p,{attributes:true,attributeFilter:['aria-valuenow']})}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bind,{once:true});else bind();
})();