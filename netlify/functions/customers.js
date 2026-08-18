
const {jsonResponse,corsHeaders,supabase}=require("./_utils");
exports.handler=async(event)=>{
  if(event.httpMethod==="OPTIONS") return {statusCode:204,headers:corsHeaders(),body:""};
  try{
    if(event.httpMethod==="GET") return jsonResponse(200,await supabase("customers?select=*&order=name"));
    if(event.httpMethod==="POST"){
      const rows=await supabase("customers",{method:"POST",body:event.body||"{}"});
      return jsonResponse(201,Array.isArray(rows)&&rows.length?rows[0]:rows);
    }
    if(event.httpMethod==="DELETE"){
      const id=new URL(event.rawUrl||"https://example.com").searchParams.get("id");
      if(!id) return jsonResponse(400,{ok:false,error:"id required"});
      await supabase(`customers?id=eq.${encodeURIComponent(id)}`,{method:"DELETE"});
      return jsonResponse(200,{ok:true});
    }
    return jsonResponse(405,{ok:false,error:"Method not allowed"});
  }catch(e){return jsonResponse(500,{ok:false,error:e.message});}
};
