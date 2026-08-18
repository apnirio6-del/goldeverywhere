import {sb,response,cors} from "./_utils.mjs";
export default async (req)=>{
  if(req.method==="OPTIONS") return {statusCode:204,headers:cors()};
  try {
    if(req.method==="GET") return response(await sb("customers?select=*&order=name"));
    if(req.method==="POST") return response((await sb("customers",{method:"POST",body:req.body}))[0],201);
    if(req.method==="DELETE"){
      const id=new URL(req.url).searchParams.get("id");
      if(!id) return response({error:"id required"},400);
      await sb(`customers?id=eq.${encodeURIComponent(id)}`,{method:"DELETE"});
      return response({ok:true});
    }
    return response({error:"Method not allowed"},405);
  } catch(e){ return response({error:e.message},500); }
};
