(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const $$=(s,r=document)=>[...r.querySelectorAll(s)];
const articles=window.MUSEUM_ARTICLES||[];
const articleList=$('#articleList');
const categories=$('#articleCategories');
const screen=$('.screen-articles');
const reader=$('#articleReader');
if(!articleList||!screen||!reader)return;

const byId=id=>articles.find(a=>a.id===id);
const I=()=>window.MuseumIcons;
const icon=name=>I()?I().svg(name):'';

function createOverview(){
  if($('.articles-overview',screen))return;
  const overview=document.createElement('div');
  overview.className='articles-overview';
  overview.innerHTML=`<div class="articles-overview-copy"><strong>Материалы музея</strong><small id="articlesCount">Цифровой архив и авторские публикации</small></div><span class="articles-overview-badge">${icon('archive')}Архив музея</span>`;
  categories?.before(overview);
}

function metaItem(text,iconName,className=''){
  const span=document.createElement('span');
  if(className)span.className=className;
  if(iconName&&I())span.insertAdjacentHTML('afterbegin',icon(iconName));
  span.append(document.createTextNode(text));
  return span;
}

function enrichCard(card){
  if(card.querySelector('.article-card-meta'))return;
  const a=byId(card.dataset.openArticle);
  if(!a)return;
  const copy=card.querySelector('.article-copy');
  if(!copy)return;
  const meta=document.createElement('span');
  meta.className='article-card-meta';
  if(a.date)meta.append(metaItem(a.date,'clock'));
  if(a.author)meta.append(metaItem(a.author,'publication'));
  if(a.archival)meta.append(metaItem('Архив','archive','archive-tag'));
  if(meta.childNodes.length)copy.append(meta);
}

function updateCount(){
  const n=$$('[data-open-article]',articleList).length;
  const count=$('#articlesCount');
  if(!count)return;
  if(!n){count.textContent='По выбранному фильтру материалов нет';return;}
  const ending=n%10===1&&n%100!==11?'материал':(n%10>=2&&n%10<=4&&(n%100<12||n%100>14)?'материала':'материалов');
  count.textContent=`${n} ${ending} в текущей выборке`;
}

function enrichCards(){
  $$('[data-open-article]',articleList).forEach(enrichCard);
  updateCount();
}

function currentReaderArticle(){
  const title=$('.reader-title h1',reader)?.textContent?.trim();
  if(!title)return null;
  return articles.find(article=>article.title===title)||null;
}

function addLegacySourceLink(){
  const article=currentReaderArticle();
  const meta=$('.reader-meta',reader);
  if(!article?.legacyUrl||!meta||meta.querySelector('.reader-legacy-source'))return;
  const link=document.createElement('a');
  link.className='reader-legacy-source';
  link.href=article.legacyUrl;
  link.target='_blank';
  link.rel='noopener';
  link.textContent='Оригинал на старом сайте ↗';
  Object.assign(link.style,{display:'inline-flex',alignItems:'center',minHeight:'30px',padding:'0 9px',border:'1px solid #d6cebd',borderRadius:'999px',color:'#36513f',background:'#fbf7ee',textDecoration:'none',fontWeight:'800'});
  meta.append(link);
}

function addReaderSwipeNote(){
  const body=$('.reader-body',reader);
  if(!body||$('.reader-swipe-note',body))return;
  const note=document.createElement('div');
  note.className='reader-swipe-note';
  note.innerHTML=`${icon('arrow')}<span>Свайп влево/вправо — листать статьи · вниз сверху — закрыть</span>`;
  body.append(note);
}

function enhanceReader(){
  requestAnimationFrame(()=>{
    addLegacySourceLink();
    addReaderSwipeNote();
  });
}

function init(){
  createOverview();
  enrichCards();
  new MutationObserver(enrichCards).observe(articleList,{childList:true});
  new MutationObserver(enhanceReader).observe(reader,{childList:true,subtree:true});
  enhanceReader();
}

init();
})();
