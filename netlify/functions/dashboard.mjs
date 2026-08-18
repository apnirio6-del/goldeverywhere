import {sb,response,cors} from "./_utils.mjs";
export default async (req)=>{
  if(req.method==="OPTIONS") return {statusCode:204,headers:cors()};
  try {
    const tx=await sb("transactions?select=grand,total,discount,date,items,created_at&order=created_at.desc");
    const today=new Date().toISOString().slice(0,10);
    const d=tx.filter(x=>x.date===today);
    const gram=d.reduce((a,x)=>(x.items||[]).reduce((b,i)=>b+(Number(i.weight)||0),a),0);
    return response({
      today,
      todayRevenue:d.reduce((a,x)=>a+(Number(x.grand)||0),0),
      todayTransactions:d.length,
      todayGrams:gram,
      allTransactions:tx.length
    });
  } catch(e){ return response({error:e.message},500); }
};
