(()=>{
'use strict';
const KEY='vishtynets_audio_entitlement_v2';
const ENDPOINT='https://qwiecwfltybytqwytqoy.supabase.co/functions/v1/audio-guide-payment-status';
async function run(){
 const q=new URLSearchParams(location.search), ref=q.get('audio_payment')||q.get('client_ref')||q.get('payment_id');
 if(!ref)return;
 const param=q.has('payment_id')?'payment_id':'audio_payment';
 try{
  const r=await fetch(`${ENDPOINT}?${param}=${encodeURIComponent(ref)}`,{cache:'no-store'});
  if(!r.ok)return;
  const d=await r.json();
  if(d.status==='succeeded'&&d.active&&d.expires_at){
   localStorage.setItem(KEY,JSON.stringify({state:'active',activatedAt:Date.now(),startsAt:Date.now(),expiresAt:new Date(d.expires_at).getTime(),source:'yookassa',paymentId:d.payment_id||null}));
   const clean=new URL(location.href);clean.searchParams.delete('audio_payment');clean.searchParams.delete('client_ref');clean.searchParams.delete('payment_id');history.replaceState({},'',clean.href);location.reload();
  }
 }catch(e){console.error('audio payment bridge failed',e)}
}
run();
})();
