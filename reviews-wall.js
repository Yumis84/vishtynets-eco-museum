(function(){
  const app=document.getElementById('reviewsWall'); if(!app)return;
  const canvas=document.createElement('canvas'); canvas.className='reviews-draw';
  const ctx=canvas.getContext('2d'); let drawing=false,last=null,tool='pen',color='#53684d',size=4;
  const stage=document.createElement('div'); stage.className='reviews-card-stage'; stage.innerHTML='<div class="reviews-card"><div class="reviews-hint">Ваш творческий след</div></div>';
  const card=stage.firstElementChild; card.appendChild(canvas);
  app.append(stage);
  function resize(){const r=card.getBoundingClientRect(),d=devicePixelRatio||1; canvas.width=r.width*d;canvas.height=r.height*d;canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(d,0,0,d,0,0)}
  addEventListener('resize',resize); setTimeout(resize,0);
  function point(e){const r=canvas.getBoundingClientRect();return{x:e.clientX-r.left,y:e.clientY-r.top}}
  canvas.addEventListener('pointerdown',e=>{if(tool!=='pen')return;drawing=true;canvas.setPointerCapture(e.pointerId);last=point(e)});
  canvas.addEventListener('pointermove',e=>{if(!drawing)return;const p=point(e);ctx.strokeStyle=color;ctx.lineWidth=size;ctx.lineCap='round';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p});
  canvas.addEventListener('pointerup',()=>{drawing=false;last=null});
  app.querySelectorAll('[data-color]').forEach(b=>b.onclick=()=>color=b.dataset.color);
  app.querySelectorAll('[data-size]').forEach(b=>b.onclick=()=>size=+b.dataset.size);
  app.querySelector('[data-clear]')?.addEventListener('click',()=>ctx.clearRect(0,0,canvas.width,canvas.height));
  app.querySelector('[data-add-text]')?.addEventListener('click',()=>add('text','Ваше слово ✨'));
  app.querySelectorAll('[data-sticker]').forEach(b=>b.onclick=()=>add('sticker',b.dataset.sticker));
  app.querySelectorAll('[data-gif]').forEach(b=>b.onclick=()=>add('gif',b.dataset.gif));
  function add(type,value){const el=document.createElement('div');el.className='review-object '+type;el.textContent=value;el.style.left='50%';el.style.top='50%';el.dataset.x=.5;el.dataset.y=.5;card.append(el);drag(el)}
  function drag(el){let down=false,ox=0,oy=0;el.addEventListener('pointerdown',e=>{down=true;el.setPointerCapture(e.pointerId);const r=el.getBoundingClientRect();ox=e.clientX-r.left;oy=e.clientY-r.top;e.stopPropagation()});el.addEventListener('pointermove',e=>{if(!down)return;const r=card.getBoundingClientRect();el.style.left=(e.clientX-r.left-ox)+'px';el.style.top=(e.clientY-r.top-oy)+'px';el.style.transform='translate(0,0)'});el.addEventListener('pointerup',()=>down=false)}
})();