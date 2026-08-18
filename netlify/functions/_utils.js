
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  };
}
function jsonResponse(statusCode, data) {
  return {
    statusCode,
    headers: {"Content-Type":"application/json; charset=utf-8", ...corsHeaders()},
    body: JSON.stringify(data)
  };
}
function getEnv() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("SUPABASE_URL atau SUPABASE_SERVICE_ROLE_KEY belum diset di Netlify.");
  return {url:url.replace(/\/+$/,""), key};
}
async function supabase(path, options={}) {
  const {url,key}=getEnv();
  const res=await fetch(`${url}/rest/v1/${path}`, {
    ...options,
    headers:{
      apikey:key,
      Authorization:`Bearer ${key}`,
      "Content-Type":"application/json",
      Prefer:"return=representation",
      ...(options.headers||{})
    }
  });
  const text=await res.text();
  let data;
  try { data=text ? JSON.parse(text) : []; } catch { data=text; }
  if(!res.ok) throw new Error(typeof data==="string" ? data : JSON.stringify(data));
  return data;
}
module.exports={corsHeaders,jsonResponse,supabase};
