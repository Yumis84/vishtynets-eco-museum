(()=>{
'use strict';
function init(){
  const screen=document.querySelector('.screen-audio');
  const guide=window.VISHTYNETS_AUDIO_GUIDES?.museum;
  if(!screen||!guide?.tracks?.length)return;
  const feature=[...screen.querySelectorAll('.audio-guide-feature')].find(el=>el.querySelector('strong')?.textContent.trim()==='Читать');
  if(!feature||feature.dataset.readBound==='1')return;
  feature.dataset.readBound='1';
  feature.setAttribute('role','button');
  feature.setAttribute('tabindex','0');
  feature.setAttribute('aria-label','Читать расшифровку дорожки');
  feature.style.cursor='pointer';
  const close=()=>document.querySelector('.audio-guide-transcript-modal')?.remove();
  const open=()=>{
    const active=document.querySelector('.audio-guide-track-card-v2.is-active,[data-track-id].is-active');
    const id=active?.getAttribute('data-track-id');
    const track=guide.tracks.find(t=>t.id===id&&t.transcript)||guide.tracks.find(t=>t.kind==='exposition'&&t.transcript)||guide.tracks.find(t=>t.transcript);
    if(!track)return;
    close();
    const modal=document.createElement('div');
    modal.className='audio-guide-transcript-modal';
    modal.innerHTML=`<div class="audio-guide-transcript-backdrop" data-close></div><article class="audio-guide-transcript-panel" role="dialog" aria-modal="true" aria-label="Расшифровка"><button type="button" class="audio-guide-transcript-close" data-close aria-label="Закрыть">×</button><span class="eyebrow">Текст дорожки</span><h2>${escapeHtml(track.title||'Расшифровка')}</h2><div class="audio-guide-transcript-body">${escapeHtml(track.transcript).replace(/\n/g,'<br>')}</div></article>`;
    document.body.appendChild(modal);
    modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',close));
  };
  const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
  feature.addEventListener('click',open);
  feature.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();open()}});
  if(!document.querySelector('style[data-audioguide-read]')){
    const style=document.createElement('style');style.dataset.audioguideRead='1';style.textContent=`.audio-guide-transcript-modal{position:fixed;inset:0;z-index:1000;display:flex;align-items:flex-end;justify-content:center}.audio-guide-transcript-backdrop{position:absolute;inset:0;background:rgba(20,27,21,.48)}.audio-guide-transcript-panel{position:relative;width:min(760px,100%);max-height:82vh;overflow:auto;background:#f8f7f2;border-radius:20px 20px 0 0;padding:24px 20px 30px;box-sizing:border-box;box-shadow:0 -8px 35px rgba(0,0,0,.2)}.audio-guide-transcript-close{position:absolute;right:14px;top:10px;border:0;background:transparent;font-size:30px;line-height:1;color:#344638;cursor:pointer}.audio-guide-transcript-panel h2{margin:6px 40px 16px 0;color:#344638}.audio-guide-transcript-body{font-size:16px;line-height:1.65;color:#3d443d;white-space:normal}`;document.head.appendChild(style);
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();