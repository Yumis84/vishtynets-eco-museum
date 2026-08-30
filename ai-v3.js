(()=>{
'use strict';
const WEBHOOK_URL='https://n8n.xn----8sbalgvaeklgsbf4b.xn--p1ai/webhook/5ccfbe41-c897-4034-9b75-e986bb9d0fe0/chat';
const card=document.querySelector('.ai-card');
if(!card)return;
card.innerHTML='<div class="n8n-chat-test"><h2>AI-консультант</h2><p>Временный стандартный чат n8n для проверки подключения.</p><div id="n8n-chat"></div></div>';
import('https://cdn.jsdelivr.net/npm/@n8n/chat/dist/chat.bundle.es.js').then(({createChat})=>{
  createChat({webhookUrl:WEBHOOK_URL,target:'#n8n-chat',mode:'fullscreen',showWelcomeScreen:true,initialMessages:['Здравствуйте! Я музейный помощник. Задайте вопрос о Роминтской пуще, музее, местах или маршрутах.'],i18n:{en:{title:'Музейный помощник',subtitle:'Спросите о Роминтской пуще и Виштынецком экомузее.',footer:'',getStarted:'Новый диалог',inputPlaceholder:'Напишите вопрос…',closeButtonTooltip:'Закрыть чат'}}});
}).catch(error=>{
  console.error('n8n chat widget error',error);
  const box=card.querySelector('.n8n-chat-test');
  if(box)box.insertAdjacentHTML('beforeend','<p class="n8n-chat-error">Не удалось загрузить стандартный чат n8n.</p>');
});
})();
