(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
let items=[];
let index=0;
let start=null;
let locked=false;

function ensure(){
  if($('#articleLightbox'))return;
  const el=document.createElement('div');
  el.id='articleLightbox';
  el.className='article-lightbox';
  el.setAttribute('aria-hidden','true');
  el.innerHTML='<button class="article-lightbox-close" type="button" aria-label="Закрыть">×</button><button class="article-lightbox-prev" type="button" aria-label="Предыдущее фото">‹</button><figure><img alt=""><figcaption></figcaption></figure><button class="article-lightbox-next" type="button" aria-label="Следующее фото">›</button><span class="article-lightbox-count" aria-live="polite"></span>';
  document.body.appendChild(el);
  el.addEventListener('click',e=>{if(e.target===el||e.target.closest('.article-lightbox-close'))close();});
  $('.article-lightbox-prev',el).addEventListener('click',e=>{e.stopPropagation();show(index-1);});
  $('.article-lightbox-next',el).addEventListener('click',e=>{e.stopPropagation();show(index+1);});
  el.addEventListener('touchstart',e=>{if(e.touches.length===1)start={x:e.touches[0].clientX,y:e.touches[0].clientY};},{passive:true});
  el.addEventListener('touchend',e=>{if(!start||e.changedTouches.length!==1)return;const dx=e.changedTouches[0].clientX-start.x,dy=e.changedTouches[0].clientY-start.y;start=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.15)show(index+(dx<0?1:-1));else if(Math.abs(dy)>70&&Math.abs(dy)>Math.abs(dx)*1.1)close();},{passive:true});
}
function galleryFor(img){
  const gallery=img.closest('.reader-gallery');
  return gallery?$$('img',gallery):[img];
}
function show(n){
  if(!items.length)return;
  index=(n+items.length)%items.length;
  const img=items[index],box=$('#articleLightbox'),out=$('figure img',box),cap=$('figcaption',box);
  out.src=img.currentSrc||img.src;out.alt=img.alt||'';cap.textContent=img.alt||'';
  $('.article-lightbox-count',box).textContent=`${index+1} / ${items.length}`;
  $('.article-lightbox-prev',box).hidden=items.length<2;
  $('.article-lightbox-next',box).hidden=items.length<2;
}
function open(img){
  if(locked)return;
  ensure();items=galleryFor(img);index=items.indexOf(img);if(index<0)index=0;show(index);
  const box=$('#articleLightbox');box.classList.add('is-open');box.setAttribute('aria-hidden','false');document.body.classList.add('article-lightbox-open');
}
function close(){const box=$('#articleLightbox');if(!box)return;box.classList.remove('is-open');box.setAttribute('aria-hidden','true');document.body.classList.remove('article-lightbox-open');items=[];start=null;}
document.addEventListener('click',e=>{const img=e.target.closest?.('.screen-article .reader-gallery img');if(!img)return;e.preventDefault();open(img);});
document.addEventListener('keydown',e=>{if(!$('#articleLightbox')?.classList.contains('is-open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft')show(index-1);if(e.key==='ArrowRight')show(index+1);});
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',ensure,{once:true});else ensure();
})();
