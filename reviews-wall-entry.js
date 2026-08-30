(function(){
  function boot(){ if(window.initReviewsWall) window.initReviewsWall(); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot); else boot();
  document.addEventListener('click',function(e){if(e.target.closest('[data-nav="reviews"]'))setTimeout(boot,0);});
})();