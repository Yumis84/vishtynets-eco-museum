(()=>{
'use strict';

const ARTICLE_SELECTOR='.screen-article';
const READER_SELECTOR='#articleReader';
const LIST_SELECTOR='#articleList [data-open-article]';
const SWIPE_X=54;
const SWIPE_DOWN=72;
const MAX_TIME=1500;

let currentArticleId=null;
let start=null;
let mode=null;
let gestureLocked=false;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

function screen(){return $(ARTICLE_SELECTOR)}
function reader(){return $(READER_SELECTOR)}
function active(){return !!screen()?.classList.contains('is-active')}
function currentFilteredIds(){return $$(LIST_SELECTOR).map(el=>el.dataset.openArticle).filter(Boolean)}

function syncCurrentArticle(){
  const title=$(`${READER_SELECTOR} .reader-title h1`)?.textContent?.trim();
  if(!title)return;
  const article=(window.MUSEUM_ARTICLES||[]).find(a=>String(a.title||'').trim()===title);
  if(article)currentArticleId=article.id;
}

function resetVisual(animate=true){
  const r=reader();
  if(!r)return;
  r.style.transition=animate?'transform .16s ease, opacity .16s ease':'none';
  r.style.transform='';
  r.style.opacity='';
  if(animate)setTimeout(()=>{if(r)r.style.transition=''},190);
}

function flash(direction){
  const s=screen();
  if(!s)return;
  s.classList.remove('gesture-prev','gesture-next','gesture-close');
  void s.offsetWidth;
  s.classList.add(direction);
  setTimeout(()=>s.classList.remove(direction),180);
}

function navigateArticle(step){
  if(gestureLocked)return;
  syncCurrentArticle();
  const ids=currentFilteredIds();
  const index=ids.indexOf(currentArticleId);
  if(index<0)return resetVisual(true);
  const nextIndex=index+step;
  if(nextIndex<0||nextIndex>=ids.length){
    flash(step>0?'gesture-next':'gesture-prev');
    return resetVisual(true);
  }
  const target=$(`${LIST_SELECTOR}[data-open-article="${CSS.escape(ids[nextIndex])}"]`);
  if(!target)return resetVisual(true);
  gestureLocked=true;
  const r=reader();
  if(r){
    r.style.transition='transform .14s ease, opacity .14s ease';
    r.style.transform=`translateX(${step>0?'-42px':'42px'})`;
    r.style.opacity='.55';
  }
  setTimeout(()=>{
    target.click();
    currentArticleId=ids[nextIndex];
    window.scrollTo(0,0);
    resetVisual(false);
    gestureLocked=false;
  },120);
}

function closeArticle(){
  if(gestureLocked)return;
  const back=$('#articleBack');
  if(!back)return;
  gestureLocked=true;
  const r=reader();
  if(r){
    r.style.transition='transform .14s ease, opacity .14s ease';
    r.style.transform='translateY(70px)';
    r.style.opacity='.38';
  }
  setTimeout(()=>{
    back.click();
    resetVisual(false);
    gestureLocked=false;
  },120);
}

function interactiveTarget(target){
  return !!target?.closest?.('button,a,input,textarea,select,label,[role="button"]');
}

function begin(touch,target){
  if(!active()||gestureLocked||interactiveTarget(target))return;
  start={
    x:touch.clientX,
    y:touch.clientY,
    time:performance.now(),
    scrollY:window.scrollY||document.documentElement.scrollTop||0
  };
  mode=null;
  resetVisual(false);
}

function move(touch,e){
  if(!start||!active())return;
  const dx=touch.clientX-start.x;
  const dy=touch.clientY-start.y;
  const ax=Math.abs(dx),ay=Math.abs(dy);
  const atTop=start.scrollY<=8;

  if(!mode&&Math.max(ax,ay)>12){
    if(ax>ay*1.12)mode='horizontal';
    else if(atTop&&dy>0&&ay>ax*1.12)mode='down';
    else mode='scroll';
  }

  const r=reader();
  if(mode==='horizontal'){
    e.preventDefault();
    if(r){
      r.style.transition='none';
      r.style.transform=`translateX(${Math.max(-110,Math.min(110,dx*.72))}px)`;
      r.style.opacity=String(Math.max(.58,1-ax/360));
    }
  }else if(mode==='down'){
    e.preventDefault();
    if(r){
      const pull=Math.max(0,Math.min(130,dy*.62));
      r.style.transition='none';
      r.style.transform=`translateY(${pull}px)`;
      r.style.opacity=String(Math.max(.62,1-dy/420));
    }
  }
}

function end(touch){
  if(!start||!active()){
    start=null;mode=null;resetVisual(true);return;
  }
  const dx=touch.clientX-start.x;
  const dy=touch.clientY-start.y;
  const elapsed=performance.now()-start.time;
  const chosen=mode;
  start=null;mode=null;

  if(elapsed>MAX_TIME){resetVisual(true);return;}
  if(chosen==='horizontal'&&Math.abs(dx)>=SWIPE_X){
    navigateArticle(dx<0?1:-1);
    return;
  }
  if(chosen==='down'&&dy>=SWIPE_DOWN){
    closeArticle();
    return;
  }
  resetVisual(true);
}

function install(){
  const s=screen();
  if(!s||s.dataset.gesturesV2)return;
  s.dataset.gesturesV2='1';

  s.addEventListener('touchstart',e=>{
    if(e.touches.length!==1){start=null;mode=null;return;}
    begin(e.touches[0],e.target);
  },{passive:true});

  s.addEventListener('touchmove',e=>{
    if(e.touches.length!==1)return;
    move(e.touches[0],e);
  },{passive:false});

  s.addEventListener('touchend',e=>{
    if(e.changedTouches.length!==1){start=null;mode=null;resetVisual(true);return;}
    end(e.changedTouches[0]);
  },{passive:true});

  s.addEventListener('touchcancel',()=>{start=null;mode=null;resetVisual(true)},{passive:true});

  document.addEventListener('click',e=>{
    const card=e.target.closest?.('[data-open-article]');
    if(card)currentArticleId=card.dataset.openArticle||currentArticleId;
  },true);

  const r=reader();
  if(r)new MutationObserver(syncCurrentArticle).observe(r,{childList:true,subtree:true});
  syncCurrentArticle();
}

function installStyles(){
  if($('#articleGestureStylesV2'))return;
  const style=document.createElement('style');
  style.id='articleGestureStylesV2';
  style.textContent=`
    .screen-article{overscroll-behavior-y:none;touch-action:pan-y;}
    .screen-article .reader-top{position:relative;}
    .screen-article .reader-top::after{content:"";position:absolute;left:50%;top:calc(env(safe-area-inset-top) + 5px);width:38px;height:4px;border-radius:999px;background:#aaa596;opacity:.78;transform:translateX(-50%);pointer-events:none;}
    .screen-article #articleReader{will-change:transform,opacity;}
    .screen-article.gesture-next #articleReader{transform:translateX(-20px);}
    .screen-article.gesture-prev #articleReader{transform:translateX(20px);}
    @media (prefers-reduced-motion:reduce){.screen-article #articleReader{transition:none!important;}}
  `;
  document.head.appendChild(style);
}

function init(){installStyles();install()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
