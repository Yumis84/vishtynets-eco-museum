(function(){
  'use strict';
  function init(){
    const root=document.querySelector('[data-reviews-wall]');
    if(!root || root.dataset.reviewsInitialized==='1') return;
    root.dataset.reviewsInitialized='1';
    const card=root.querySelector('[data-review-card]');
    const canvas=root.querySelector('[data-review-canvas]');
    if(!card || !canvas) return;
    const ctx=canvas.getContext('2d');
    let drawing=false,last=null,color='#53684d',size=4;
    const fit=()=>{
      const r=card.getBoundingClientRect();
      if(!r.width || !r.height) return;
      const d=window.devicePixelRatio||1;
      canvas.width=Math.round(r.width*d); canvas.height=Math.round(r.height*d);
      canvas.style.width=r.width+'px'; canvas.style.height=r.height+'px';
      ctx.setTransform(d,0,0,d,0,0);
    };
    const point=e=>{const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top};};
    canvas.addEventListener('pointerdown',e=>{drawing=true;canvas.setPointerCapture(e.pointerId);last=point(e);});
    canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e);ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p;});
    ['pointerup','pointercancel','pointerleave'].forEach(x=>canvas.addEventListener(x,()=>{drawing=false;last=null;}));
    root.querySelectorAll('[data-color]').forEach(b=>b.addEventListener('click',()=>{color=b.dataset.color;}));
    root.querySelectorAll('[data-size]').forEach(b=>b.addEventListener('click',()=>{size=Number(b.dataset.size)||4;}));
    root.querySelector('[data-clear]')?.addEventListener('click',()=>ctx.clearRect(0,0,canvas.width,canvas.height));
    root.querySelector('[data-add-text]')?.addEventListener('click',()=>addObject('text','Ваше слово ✨'));
    root.querySelectorAll('[data-sticker]').forEach(b=>b.addEventListener('click',()=>addObject('sticker',b.dataset.sticker)));
    root.querySelectorAll('[data-gif]').forEach(b=>b.addEventListener('click',()=>addObject('gif',b.dataset.gif)));
    function addObject(type,value){const el=document.createElement('div');el.className='review-object '+type;el.textContent=value;el.style.left='50%';el.style.top='50%';card.appendChild(el);makeDraggable(el);}
    function makeDraggable(el){let active=false,dx=0,dy=0;el.addEventListener('pointerdown',e=>{active=true;el.setPointerCapture(e.pointerId);const r=el.getBoundingClientRect();dx=e.clientX-r.left;dy=e.clientY-r.top;e.stopPropagation();});el.addEventListener('pointermove',e=>{if(!active)return;const r=card.getBoundingClientRect();el.style.left=(e.clientX-r.left-dx)+'px';el.style.top=(e.clientY-r.top-dy)+'px';});['pointerup','pointercancel'].forEach(x=>el.addEventListener(x,()=>active=false));}
    fit();
    if(window.ResizeObserver)new ResizeObserver(fit).observe(card); else window.addEventListener('resize',fit);
  }
  window.initReviewsWall=init;
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init); else init();
  new MutationObserver(()=>init()).observe(document.documentElement,{subtree:true,attributes:true,attributeFilter:['class','style']});
})();