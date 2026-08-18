import {sb,response,cors} from "./_utils.mjs";
export default async (req)=>{
  if(req.method==="OPTIONS") return {statusCode:204,headers:cors()};
  try {
    if(req.method==="GET") return response(await sb("products?select=*&order=name"));
    if(req.method==="POST") return response((await sb("products",{method:"POST",body:req.body}))[0],201);
    return response({error:"Method not allowed"},405);
  } catch(e){ return response({error:e.message},500); }
};
