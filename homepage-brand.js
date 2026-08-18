(()=>{
'use strict';
function applyHomepageBrand(){
  const brand=document.querySelector('.hero-brand');
  if(!brand||brand.dataset.brandV2==='1')return;
  brand.dataset.brandV2='1';
  brand.innerHTML='<img class="hero-brand-logo-v2" src="assets/branding/vishtynets-logo.svg?v=1" alt="Виштынецкий экомузей — Краснолесье, Роминтская пуща">';

  const style=document.createElement('style');
  style.dataset.homepageBrandV2='1';
  style.textContent=`
    .hero-brand[data-brand-v2="1"]{
      width:min(310px,calc(100vw - 78px));
      max-width:none;
      min-height:64px;
      padding:7px 10px 6px;
      border:1px solid rgba(255,255,255,.56);
      border-radius:18px;
      background:rgba(250,246,237,.76);
      -webkit-backdrop-filter:blur(10px) saturate(1.08);
      backdrop-filter:blur(10px) saturate(1.08);
      box-shadow:0 5px 18px rgba(28,43,33,.12);
      overflow:hidden;
    }
    .hero-brand-logo-v2{
      display:block;
      width:100%;
      height:auto;
      max-height:68px;
      object-fit:contain;
      object-position:left center;
    }
    @media (max-width:380px){
      .hero-brand[data-brand-v2="1"]{
        width:calc(100vw - 76px);
        min-height:58px;
        padding:6px 8px 5px;
        border-radius:16px;
      }
      .hero-brand-logo-v2{max-height:60px}
    }
    @media (min-width:620px){
      .hero-brand[data-brand-v2="1"]{width:390px;min-height:78px;padding:8px 12px}
      .hero-brand-logo-v2{max-height:78px}
    }
  `;
  document.head.appendChild(style);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',applyHomepageBrand,{once:true});
else applyHomepageBrand();
})();
