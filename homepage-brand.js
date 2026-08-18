(()=>{
'use strict';

function removeHomepageBrand(){
  document.querySelector('.hero-brand')?.remove();
  const head=document.querySelector('.home-head');
  if(head)head.style.justifyContent='flex-end';
}

function esc(value){
  return String(value??'').replace(/[&<>"']/g,char=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}

function openMigratedArticle(id){
  document.querySelector('#sheetClose')?.click();
  const articlesNav=document.querySelector('[data-nav="articles"]');
  articlesNav?.click();
  window.setTimeout(()=>{
    document.querySelector(`[data-open-article="${id}"]`)?.click();
  },30);
}

function enhanceEducationMenu(){
  const education=document.querySelector('[data-menu-section="education"]');
  if(!education||education.dataset.legacyEducationEnhanced==='1')return;
  education.dataset.legacyEducationEnhanced='1';
  education.addEventListener('click',()=>{
    window.setTimeout(()=>{
      const target=document.querySelector('#sheetContent');
      if(!target)return;
      const articles=(window.MUSEUM_ARTICLES||[]).filter(article=>article.subcategory==='Образовательные программы');
      if(!articles.length)return;
      target.innerHTML=`<span class="eyebrow">Музейные программы</span><h2>Образовательные программы</h2><p>Перенесённые страницы старого сайта. Старые цены, размеры групп и организационные условия считаются архивными до повторной проверки.</p><div class="legacy-education-list">${articles.map(article=>`<button type="button" data-open-migrated-article="${esc(article.id)}" style="display:block;width:100%;margin:8px 0;padding:14px;text-align:left;border:1px solid #d6cebd;border-radius:14px;background:#fbf7ee;color:#243a2d"><strong style="display:block;font-size:15px">${esc(article.title)}</strong><small style="display:block;margin-top:4px;color:#6d736b">${esc(article.deck||'Архивная страница музея')}</small></button>`).join('')}</div>`;
      target.querySelectorAll('[data-open-migrated-article]').forEach(button=>{
        button.addEventListener('click',()=>openMigratedArticle(button.dataset.openMigratedArticle));
      });
    },0);
  });
}

function init(){
  removeHomepageBrand();
  enhanceEducationMenu();
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
else init();
})();
