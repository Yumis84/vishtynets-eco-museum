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

function extractOutput(value){
  if(typeof value==='string'&&value.trim())return value.trim();
  if(Array.isArray(value))return extractOutput(value[0]);
  if(value&&typeof value==='object'){
    for(const key of ['output','text','content','message']){
      if(typeof value[key]==='string'&&value[key].trim())return value[key].trim();
    }
    if(value.data)return extractOutput(value.data);
  }
  return '';
}

async function sendToAssistant(message,sessionId,onChunk){
  const controller=new AbortController();
  const timeout=setTimeout(()=>controller.abort(),60000);
  try{
    const response=await fetch(WEBHOOK_URL,{
      method:'POST',
      headers:{'Content-Type':'application/json','Accept':'application/json, text/event-stream, text/plain'},
      body:JSON.stringify({chatInput:message,sessionId}),
      signal:controller.signal
    });
    if(!response.ok)throw new Error(`HTTP ${response.status}`);

    const contentType=(response.headers.get('content-type')||'').toLowerCase();
    if(contentType.includes('application/json')){
      const data=await response.json();
      const output=extractOutput(data);
      if(!output)throw new Error('Некорректный ответ AI');
      onChunk(output,true);
      return output;
    }

    if(!response.body){
      const text=await response.text();
      const output=extractOutput(text);
      if(!output)throw new Error('Пустой ответ AI');
      onChunk(output,true);
      return output;
    }

    const reader=response.body.getReader();
    const decoder=new TextDecoder();
    let buffer='';
    let answer='';

    const consume=raw=>{
      buffer+=raw;
      const lines=buffer.split(/\r?\n/);
      buffer=lines.pop()||'';
      for(let line of lines){
        line=line.trim();
        if(!line||line.startsWith(':'))continue;
        if(line.startsWith('data:'))line=line.slice(5).trim();
        if(!line)continue;
        if(line==='[DONE]')continue;
        let value=line;
        try{value=JSON.parse(line)}catch(_){/* plain text chunk */}
        const piece=extractOutput(value)||((typeof value==='string'&&value!=='[DONE]')?value:'');
        if(piece){
          answer+=piece;
          onChunk(answer,false);
        }
      }
    };

    while(true){
      const {value,done}=await reader.read();
      if(done)break;
      consume(decoder.decode(value,{stream:true}));
    }
    consume(decoder.decode());

    if(!answer.trim())throw new Error('Пустой ответ AI');
    onChunk(answer.trim(),true);
    return answer.trim();
  }finally{clearTimeout(timeout)}
}

function build(){
  const orb=card.querySelector('.ai-orb');
  if(orb)orb.innerHTML='✦';
  card.querySelector('.ai-preview-status')?.remove();
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
      await sendToAssistant(message,getSessionId(),text=>{
        typing.textContent=text;
        const list=card.querySelector('.ai-messages');
        list.scrollTop=list.scrollHeight;
      });
    }catch(error){
      console.error('Museum AI error',error);
      typing.textContent=error.name==='AbortError'
        ?'Ответ занимает слишком много времени. Попробуйте ещё раз.'
        :'Не удалось получить ответ. Проверьте соединение и попробуйте ещё раз.';
    }finally{
      busy=false;input.disabled=false;submit.disabled=false;input.focus();
    }
  };

  form.addEventListener('submit',event=>{event.preventDefault();const message=input.value;input.value='';ask(message)});
  prompts.querySelectorAll('button').forEach(button=>button.addEventListener('click',()=>ask(button.textContent)));
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();
