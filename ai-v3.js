(()=>{
'use strict';
const WEBHOOK_URL='https://n8n.xn----8sbalgvaeklgsbf4b.xn--p1ai/webhook/5ccfbe41-c897-4034-9b75-e986bb9d0fe0/chat';
const SESSION_KEY='vishtynets_ai_session';
function init(){
 const card=document.querySelector('.ai-card');
 if(!card||card.dataset.aiInitialized==='1')return;
 card.dataset.aiInitialized='1';
 card.hidden=false;
 card.style.display='block';
 const getSessionId=()=>{let id=sessionStorage.getItem(SESSION_KEY);if(!id){id=(crypto?.randomUUID?.()||`ai-${Date.now()}-${Math.random().toString(36).slice(2)}`);sessionStorage.setItem(SESSION_KEY,id)}return id};
 const addMessage=(role,text)=>{const list=card.querySelector('.ai-messages');if(!list)return null;const item=document.createElement('div');item.className=`ai-message ai-message-${role}`;item.textContent=text;list.append(item);list.scrollTop=list.scrollHeight;return item};
 async function sendToAssistant(message,sessionId){
  const response=await fetch(WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json','Accept':'application/json'},body:JSON.stringify({action:'sendMessage',chatInput:message,sessionId})});
  if(!response.ok)throw new Error(`HTTP ${response.status}`);
  const raw=await response.text();
  let data;try{data=JSON.parse(raw)}catch(e){
   let output='';for(const line of raw.split(/\n+/)){try{const j=JSON.parse(line);if(j.content)output+=j.content;else if(j.output)output+=j.output}catch(_){} }
   if(output.trim())return output.trim();throw new Error('Ответ не JSON');
  }
  const output=(typeof data?.output==='string'?data.output:typeof data?.text==='string'?data.text:typeof data?.response==='string'?data.response:Array.isArray(data)?data[0]?.output:'')||'';
  if(!output.trim())throw new Error('В ответе n8n нет текста');return output.trim();
 }
 const orb=card.querySelector('.ai-orb');if(orb)orb.innerHTML='✦';
 ['.ai-preview-status','.ai-sources','.ai-status-note','.ai-coming-note'].forEach(s=>card.querySelector(s)?.remove());
 const heading=card.querySelector('h2'),intro=card.querySelector(':scope > p');
 if(heading)heading.textContent='Спросите о Роминтской пуще';
 if(intro)intro.textContent='Помощник поможет найти места, статьи и маршруты.';
 const messages=document.createElement('div');messages.className='ai-messages';messages.setAttribute('role','log');messages.setAttribute('aria-live','polite');card.append(messages);
 addMessage('assistant','Здравствуйте! Я музейный помощник. Спросите о Роминтской пуще, музее, местах, статьях или маршрутах.');
 const prompts=document.createElement('div');prompts.className='ai-prompts';prompts.innerHTML='<button type="button">Что посмотреть рядом с музеем?</button><button type="button">Расскажите о Роминтской пуще</button><button type="button">Какие есть интересные маршруты?</button><button type="button">Что есть в музейных статьях?</button>';card.append(prompts);
 const form=document.createElement('form');form.className='ai-input';form.innerHTML='<input type="text" name="message" autocomplete="off" maxlength="1000" placeholder="Задайте вопрос…" aria-label="Вопрос AI-консультанту"><button type="submit" aria-label="Отправить">→</button>';card.append(form);
 const input=form.querySelector('input'),submit=form.querySelector('button');let busy=false;
 const ask=async message=>{message=String(message||'').trim();if(!message||busy)return;busy=true;input.disabled=true;submit.disabled=true;addMessage('user',message);const typing=addMessage('assistant','Печатает…');try{typing.textContent=await sendToAssistant(message,getSessionId())}catch(error){console.error('Museum AI error',error);typing.textContent=`Не удалось получить ответ. ${error?.message||'Ошибка соединения.'}`;}finally{busy=false;input.disabled=false;submit.disabled=false;input.focus()}};
 form.addEventListener('submit',e=>{e.preventDefault();const message=input.value;input.value='';ask(message)});
 prompts.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>ask(b.textContent)));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
