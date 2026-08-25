(()=>{
'use strict';
function init(){
 const screen=document.querySelector('.screen-audio');
 if(!screen)return;
 const feature=[...screen.querySelectorAll('.audio-guide-feature')].find(el=>el.querySelector('strong')?.textContent.trim()==='Читать');
 if(!feature||feature.dataset.readBound==='1')return;
 feature.dataset.readBound='1';feature.setAttribute('role','button');feature.setAttribute('tabindex','0');feature.style.cursor='pointer';
 const close=()=>document.querySelector('.audio-guide-transcript-modal')?.remove();
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
 const render=async()=>{
  close();
  let text='';
  try{const r=await fetch('assets/audio/text/audio-guide-master.txt?v=1',{cache:'no-store'});if(!r.ok)throw new Error('HTTP '+r.status);text=await r.text()}catch(e){text='Не удалось загрузить полный текст экскурсии.'}
  const modal=document.createElement('div');modal.className='audio-guide-transcript-modal';
  const body=esc(text).replace(/\n\n/g,'</p><p>').replace(/\n/g,'<br>');
  modal.innerHTML=`<div class="audio-guide-transcript-backdrop" data-close></div><article class="audio-guide-transcript-panel audio-guide-full-text" role="dialog" aria-modal="true"><button type="button" class="audio-guide-transcript-close" data-close>×</button><span class="eyebrow">Полный текст экскурсии</span><h1>Аудиогид · полный текст</h1><div class="audio-guide-master-text"><p>${body}</p></div></article></div>`;
  document.body.appendChild(modal);modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',close));
 };
 feature.addEventListener('click',render);feature.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();render()}});
 if(!document.querySelector('style[data-audioguide-read]')){const style=document.createElement('style');style.dataset.audioguideRead='1';style.textContent=`.audio-guide-transcript-modal{position:fixed;inset:0;z-index:1000;display:flex;align-items:flex-end;justify-content:center}.audio-guide-transcript-backdrop{position:absolute;inset:0;background:rgba(20,27,21,.48)}.audio-guide-transcript-panel{position:relative;width:min(760px,100%);max-height:88vh;overflow:auto;background:#f8f7f2;border-radius:20px 20px 0 0;padding:24px 20px 40px;box-sizing:border-box;box-shadow:0 -8px 35px rgba(0,0,0,.2)}.audio-guide-transcript-close{position:absolute;right:14px;top:10px;border:0;background:transparent;font-size:30px;line-height:1;color:#344638;cursor:pointer}.audio-guide-full-text h1{margin:8px 40px 28px 0;color:#344638}.audio-guide-master-text{font-size:16px;line-height:1.7;color:#3d443d}.audio-guide-master-text p{margin:0}`;document.head.appendChild(style)}
 };
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();new MutationObserver(init).observe(document.body,{childList:true,subtree:true});
})();