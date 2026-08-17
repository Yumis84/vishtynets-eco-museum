(()=>{
'use strict';
const $=(s,r=document)=>r.querySelector(s);
const card=$('.ai-card');
if(!card)return;
const I=()=>window.MuseumIcons;
const icon=name=>I()?I().svg(name):'';

function addStatus(){
  if($('.ai-preview-status',card))return;
  const status=document.createElement('span');
  status.className='ai-preview-status';
  status.innerHTML='<i></i>Готовится';
  card.append(status);
}

function addSources(){
  if($('.ai-sources',card))return;
  const sources=document.createElement('div');
  sources.className='ai-sources';
  sources.setAttribute('aria-label','Будущие источники AI-консультанта');
  sources.innerHTML=`<span class="ai-source-chip">${icon('book')}Статьи музея</span><span class="ai-source-chip">${icon('map')}Карта мест</span><span class="ai-source-chip">${icon('visitor')}Посетителям</span>`;
  const prompts=$('.ai-prompts',card);
  prompts?.before(sources);
}

function addNotes(){
  if(!$('.ai-status-note',card)){
    const statusNote=document.createElement('div');
    statusNote.className='ai-status-note';
    statusNote.id='aiStatusNote';
    statusNote.textContent='AI-консультант будет подключён после подготовки и проверки музейной базы знаний. Пока вопросы показаны как примеры будущих сценариев.';
    $('.ai-prompts',card)?.after(statusNote);
  }
  if(!$('.ai-coming-note',card)){
    const note=document.createElement('p');
    note.className='ai-coming-note';
    note.textContent='Оригинальные музейные статьи останутся авторскими материалами и не будут заменяться AI-пересказами.';
    $('.ai-input',card)?.after(note);
  }
}

function bindPrompts(){
  const note=$('#aiStatusNote');
  card.querySelectorAll('.ai-prompts button').forEach(button=>{
    button.setAttribute('aria-describedby','aiStatusNote');
    button.addEventListener('click',()=>{
      note?.classList.add('is-visible');
      note?.scrollIntoView({behavior:'smooth',block:'nearest'});
    });
  });
}

function polishOrb(){
  const orb=$('.ai-orb',card);
  if(orb&&I())orb.innerHTML=icon('spark');
}

addStatus();
addSources();
addNotes();
polishOrb();
bindPrompts();
})();
