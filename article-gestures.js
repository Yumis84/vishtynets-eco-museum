(()=>{
'use strict';

const ARTICLE_SELECTOR='.screen-article';
const READER_SELECTOR='#articleReader';
const LIST_SELECTOR='#articleList [data-open-article]';
const SWIPE_X=72;
const SWIPE_DOWN=96;
const MAX_TIME=900;

let currentArticleId=null;
let start=null;
let gestureLocked=false;

const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];

function activeArticleScreen(){
  const screen=$(ARTICLE_SELECTOR);
  return !!screen?.classList.contains('is-active');
}

function currentFilteredIds(){
  return $$(LIST_SELECTOR).map(el=>el.dataset.openArticle).filter(Boolean);
}

function syncCurrentArticle(){
  const title=$(`${READER_SELECTOR} .reader-title h1`)?.textContent?.trim();
  if(!title)return;
  const article=(window.MUSEUM_ARTICLES||[]).find(a=>String(a.title||'').trim()===title);
  if(article)currentArticleId=article.id;
}

function flash(direction){
  const screen=$(ARTICLE_SELECTOR);
  if(!screen)return;
  screen.classList.remove('gesture-prev','gesture-next','gesture-close');
  void screen.offsetWidth;
  screen.classList.add(direction);
  window.setTimeout(()=>screen.classList.remove(direction),180);
}

function navigateArticle(step){
  if(gestureLocked)return;
  syncCurrentArticle();
  const ids=currentFilteredIds();
  if(!ids.length||!currentArticleId)return;
  const index=ids.indexOf(currentArticleId);
  if(index<0)return;
  const nextIndex=index+step;
  if(nextIndex<0||nextIndex>=ids.length){
    flash(step>0?'gesture-next':'gesture-prev');
    return;
  }
  const target=$(`${LIST_SELECTOR}[data-open-article="${CSS.escape(ids[nextIndex])}"]`);
  if(!target)return;
  gestureLocked=true;
  flash(step>0?'gesture-next':'gesture-prev');
  window.setTimeout(()=>{
    target.click();
    currentArticleId=ids[nextIndex];
    window.scrollTo({top:0,left:0,behavior:'instant'});
    gestureLocked=false;
  },110);
}

function closeArticle(){
  if(gestureLocked)return;
  const back=$('#articleBack');
  if(!back)return;
  gestureLocked=true;
  flash('gesture-close');
  window.setTimeout(()=>{
    back.click();
    gestureLocked=false;
  },90);
}

function interactiveTarget(target){
  return !!target?.closest?.('button,a,input,textarea,select,label,[role="button"]');
}

function beginGesture(touch,target){
  if(!activeArticleScreen()||interactiveTarget(target))return;
  start={
    x:touch.clientX,
    y:touch.clientY,
    time:performance.now(),
    scrollY:window.scrollY||document.documentElement.scrollTop||0
  };
}

function endGesture(touch){
  if(!start||!activeArticleScreen()){
    start=null;
    return;
  }
  const dx=touch.clientX-start.x;
  const dy=touch.clientY-start.y;
  const ax=Math.abs(dx);
  const ay=Math.abs(dy);
  const elapsed=performance.now()-start.time;
  const startedAtTop=start.scrollY<=10;
  start=null;

  if(elapsed>MAX_TIME)return;

  // Horizontal article paging. Left = next, right = previous.
  if(ax>=SWIPE_X && ax>ay*1.25){
    navigateArticle(dx<0?1:-1);
    return;
  }

  // Pull/swipe down closes only when the gesture started at the top of the article.
  if(startedAtTop && dy>=SWIPE_DOWN && ay>ax*1.35){
    closeArticle();
  }
}

function installTouchGestures(){
  const screen=$(ARTICLE_SELECTOR);
  if(!screen||screen.dataset.gesturesReady)return;
  screen.dataset.gesturesReady='1';

  screen.addEventListener('touchstart',e=>{
    if(e.touches.length!==1){start=null;return;}
    beginGesture(e.touches[0],e.target);
  },{passive:true});

  screen.addEventListener('touchend',e=>{
    if(e.changedTouches.length!==1){start=null;return;}
    endGesture(e.changedTouches[0]);
  },{passive:true});

  screen.addEventListener('touchcancel',()=>{start=null},{passive:true});
}

function installMousePointerFallback(){
  const screen=$(ARTICLE_SELECTOR);
  if(!screen||!window.PointerEvent)return;
  let pointerId=null;
  screen.addEventListener('pointerdown',e=>{
    if(e.pointerType==='touch'||e.button!==0||interactiveTarget(e.target))return;
    pointerId=e.pointerId;
    beginGesture(e,e.target);
  });
  screen.addEventListener('pointerup',e=>{
    if(pointerId!==e.pointerId)return;
    pointerId=null;
    endGesture(e);
  });
  screen.addEventListener('pointercancel',()=>{pointerId=null;start=null});
}

function installStyles(){
  if($('#articleGestureStyles'))return;
  const style=document.createElement('style');
  style.id='articleGestureStyles';
  style.textContent=`
    .screen-article{overscroll-behavior-y:contain;touch-action:pan-y;}
    .screen-article .reader-top{position:relative;}
    .screen-article .reader-top::after{
      content:"";position:absolute;left:50%;top:calc(env(safe-area-inset-top) + 5px);
      width:34px;height:4px;border-radius:999px;background:#c7c0b3;opacity:.72;
      transform:translateX(-50%);pointer-events:none;
    }
    .screen-article #articleReader{transition:transform .16s ease,opacity .16s ease;will-change:transform,opacity;}
    .screen-article.gesture-next #articleReader{transform:translateX(-22px);opacity:.78;}
    .screen-article.gesture-prev #articleReader{transform:translateX(22px);opacity:.78;}
    .screen-article.gesture-close #articleReader{transform:translateY(26px);opacity:.72;}
    @media (prefers-reduced-motion:reduce){.screen-article #articleReader{transition:none!important;}}
  `;
  document.head.appendChild(style);
}

function observeReader(){
  const reader=$(READER_SELECTOR);
  if(!reader)return;
  new MutationObserver(syncCurrentArticle).observe(reader,{childList:true,subtree:true});
  syncCurrentArticle();

  // Capture the selected list item before app.js opens it.
  document.addEventListener('click',e=>{
    const card=e.target.closest?.('[data-open-article]');
    if(card)currentArticleId=card.dataset.openArticle||currentArticleId;
  },true);
}

function init(){
  installStyles();
  installTouchGestures();
  installMousePointerFallback();
  observeReader();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
