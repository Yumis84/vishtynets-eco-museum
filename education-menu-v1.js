(()=>{
'use strict';
const button=document.querySelector('[data-menu-section="education"]');
const sheet=document.querySelector('#sheetContent');
if(!button||!sheet)return;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

button.addEventListener('click',()=>{
  const articles=(window.MUSEUM_ARTICLES||[]).filter(article=>
    article.category==='Образовательные программы'||article.subcategory==='Образовательные программы'
  );
  const unique=[...new Map(articles.map(article=>[article.id,article])).values()];
  sheet.innerHTML=`<span class="eyebrow">Виштынецкий экомузей</span><h2>Образовательные программы</h2><p>Оригинальные музейные программы со старого сайта. Исторические цены, размеры групп, продолжительность и сезонность не считаются актуальными условиями без современной проверки.</p>${unique.length?`<div>${unique.map(article=>`<button data-sheet-article="${esc(article.id)}" class="btn-light" style="width:100%;margin:4px 0;text-align:left">${esc(article.title)}</button>`).join('')}</div>`:'<p>Программы пока не найдены.</p>'}`;
});
})();
