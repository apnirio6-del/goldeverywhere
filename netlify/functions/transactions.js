
const {jsonResponse,corsHeaders,supabase}=require("./_utils");
exports.handler=async(event)=>{
  if(event.httpMethod==="OPTIONS") return {statusCode:204,headers:corsHeaders(),body:""};
  try{
    if(event.httpMethod==="GET") return jsonResponse(200,await supabase("transactions?select=*&order=created_at.desc"));
    if(event.httpMethod==="POST"){
      const rows=await supabase("transactions",{method:"POST",body:event.body||"{}"});
      return jsonResponse(201,Array.isArray(rows)&&rows.length?rows[0]:rows);
    }
    return jsonResponse(405,{ok:false,error:"Method not allowed"});
  }catch(e){return jsonResponse(500,{ok:false,error:e.message});}
};
