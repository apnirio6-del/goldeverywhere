import {sb,response,cors} from "./_utils.mjs";
export default async (req)=>{
  if(req.method==="OPTIONS") return {statusCode:204,headers:cors()};
  try {
    if(req.method==="GET") return response(await sb("transactions?select=*&order=created_at.desc"));
    if(req.method==="POST") {
      const body=JSON.parse(req.body||"{}");
      const rows=await sb("transactions",{method:"POST",body:JSON.stringify(body)});
      return response(rows[0]||rows,201);
    }
    return response({error:"Method not allowed"},405);
  } catch(e){ return response({error:e.message},500); }
};
