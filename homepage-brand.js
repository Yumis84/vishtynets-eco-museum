(()=>{
'use strict';
function removeHomepageBrand(){
  document.querySelector('.hero-brand')?.remove();
  const head=document.querySelector('.home-head');
  if(head){
    head.style.justifyContent='flex-end';
  }
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',removeHomepageBrand,{once:true});
else removeHomepageBrand();
})();
