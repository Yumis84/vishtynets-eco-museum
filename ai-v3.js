(()=>{
'use strict';

const WEBHOOK_URL='https://n8n.xn----8sbalgvaeklgsbf4b.xn--p1ai/webhook/5ccfbe41-c897-4034-9b75-e986bb9d0fe0/chat';
const SESSION_KEY='vishtynets_ai_session';
const card=document.querySelector('.ai-card');
if(!card)return;

const getSessionId=()=>{
  let id=sessionStorage.getItem(SESSION_KEY);
  if(!id){id=crypto.randomUUID();sessionStorage.setItem(SESSION_KEY,id)}
  return id;
};

const addMessage=(role,text)=>{
  const list=card.querySelector('.ai-messages');
  const item=document.createElement('div');
  item.className=`ai-message ai-message-${role}`;
  item.textContent=text;
  list.append(item);
  list.scrollTop=list.scrollHeight;
  return item;
};

async function sendToAssistant(message,sessionId){
  const response=await fetch(WEBHOOK_URL,{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({chatInput:message,sessionId})
  });
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  const data=await response.json();
  if(typeof data.output!=='string')throw new Error('Некорректный ответ AI');
  return data.output;
}

function build(){
  const orb=card.querySelector('.ai-orb');
  if(orb)orb.innerHTML='✦';

  const oldStatus=card.querySelector('.ai-preview-status');
  oldStatus?.remove();
  card.querySelector('.ai-sources')?.remove();
  card.querySelector('.ai-status-note')?.remove();
  card.querySelector('.ai-coming-note')?.remove();

  const heading=card.querySelector('h2');
  const intro=card.querySelector(':scope > p');
  if(heading)heading.textContent='Спросите о Роминтской пуще';
  if(intro)intro.textContent='Помощник поможет найти места, статьи и маршруты.';

  const messages=document.createElement('div');
  messages.className='ai-messages';
  messages.setAttribute('role','log');
  messages.setAttribute('aria-live','polite');
  card.append(messages);
  addMessage('assistant','Здравствуйте! Я музейный помощник. Спросите о Роминтской пуще, музее, местах, статьях или маршрутах.');

  const prompts=document.createElement('div');
  prompts.className='ai-prompts';
  prompts.innerHTML='<button type="button">Что посмотреть рядом с музеем?</button><button type="button">Расскажите о Роминтской пуще</button><button type="button">Какие есть интересные маршруты?</button><button type="button">Что есть в музейных статьях?</button>';
  card.append(prompts);

  const form=document.createElement('form');
  form.className='ai-input';
  form.innerHTML='<input type="text" name="message" autocomplete="off" maxlength="1000" placeholder="Задайте вопрос…" aria-label="Вопрос AI-консультанту"><button type="submit" aria-label="Отправить">→</button>';
  card.append(form);

  const input=form.querySelector('input');
  const submit=form.querySelector('button');
  let busy=false;

  const ask=async message=>{
    message=String(message||'').trim();
    if(!message||busy)return;
    busy=true;
    input.disabled=true;submit.disabled=true;
    addMessage('user',message);
    const typing=addMessage('assistant','Печатает…');
    try{
      const answer=await sendToAssistant(message,getSessionId());
      typing.textContent=answer;
    }catch(error){
      console.error('Museum AI error',error);
      typing.textContent='Не удалось получить ответ. Попробуйте ещё раз через несколько секунд.';
    }finally{
      busy=false;input.disabled=false;submit.disabled=false;input.focus();
    }
  };

  form.addEventListener('submit',event=>{event.preventDefault();ask(input.value);input.value=''});
  prompts.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>ask(button.textContent)));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();