
const {jsonResponse,corsHeaders,supabase}=require("./_utils");
exports.handler=async(event)=>{
  if(event.httpMethod==="OPTIONS") return {statusCode:204,headers:corsHeaders(),body:""};
  try{
    const tx=await supabase("transactions?select=*&order=created_at.desc");
    const today=new Date().toISOString().slice(0,10);
    const d=tx.filter(x=>String(x.date||"").slice(0,10)===today);
    let grams=0;
    for(const x of d) for(const i of (Array.isArray(x.items)?x.items:[])) grams+=Number(i.weight)||0;
    return jsonResponse(200,{ok:true,today,todayRevenue:d.reduce((a,x)=>a+(Number(x.grand)||0),0),todayTransactions:d.length,todayGrams:grams,allTransactions:tx.length});
  }catch(e){return jsonResponse(500,{ok:false,error:e.message});}
};
