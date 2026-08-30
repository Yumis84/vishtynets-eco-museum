(()=>{'use strict';
const API='https://qwiecwfltybytqwytqoy.supabase.co/functions/v1';
const KEY='vishtynets_audio_entitlement_v2';
const RETURN_PARAM='audio_payment';
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const get=(k,d=null)=>{try{return JSON.parse(localStorage.getItem(k)||'null')??d}catch{return d}};
const set=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch{}};
async function createPayment(){
 const returnUrl=new URL(location.href); returnUrl.searchParams.delete(RETURN_PARAM);
 const r=await fetch(`${API}/audio-guide-payment`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'create',amount:'100.00',description:'Аудиогид Виштынецкого экомузея — доступ 24 часа',return_url:returnUrl.toString()})});
 const data=await r.json().catch(()=>({})); if(!r.ok||!data.confirmation_url)throw new Error(data.error||'payment_create_failed');
 const u=new URL(returnUrl);u.searchParams.set(RETURN_PARAM,data.payment_id);location.href=u.toString();
 const w=new URL(data.confirmation_url);location.href=w.toString();
}
async function finishPayment(){
 const id=new URL(location.href).searchParams.get(RETURN_PARAM); if(!id)return;
 const clean=new URL(location.href);clean.searchParams.delete(RETURN_PARAM);history.replaceState({},'',clean.toString());
 for(let i=0;i<12;i++){
  try{const r=await fetch(`${API}/audio-guide-payment-status?payment_id=${encodeURIComponent(id)}`);const d=await r.json();
   if(d.status==='succeeded'&&d.active&&d.token){
    const now=Date.now(),expires=new Date(d.expires_at).getTime();
    set(KEY,{state:'active',activatedAt:now,startsAt:now,expiresAt:expires,source:'yookassa',token:d.token,paymentId:id});
    location.reload();return;
   }
  }catch{}
  await sleep(2500);
 }
 alert('Платёж принят, но подтверждение ещё не получено. Обновите страницу через несколько секунд.');
}
function wire(){
 const modal=document.querySelector('.audio-access-modal'); if(!modal)return false;
 const buttons=modal.querySelectorAll('.audio-access-future button');const pay=buttons[0];
 if(pay&&!pay.dataset.yookassa){pay.disabled=false;pay.textContent='Оплатить 100 ₽';pay.dataset.yookassa='1';pay.addEventListener('click',async()=>{pay.disabled=true;pay.textContent='Переход к оплате…';try{await createPayment()}catch(e){pay.disabled=false;pay.textContent='Оплатить 100 ₽';alert('Не удалось создать платёж. Попробуйте ещё раз.')}})}
 const small=modal.querySelector('small');if(small)small.textContent='Без регистрации. После оплаты доступ к платным дорожкам действует 24 часа.';
 return true;
}
async function init(){await finishPayment();for(let i=0;i<30;i++){if(wire())break;await sleep(250)}}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});else init();
})();
