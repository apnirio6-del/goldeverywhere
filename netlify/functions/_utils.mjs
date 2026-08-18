export function cors() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS"
  };
}
export function response(body, status=200) {
  return {
    statusCode: status,
    headers: {"Content-Type":"application/json", ...cors()},
    body: JSON.stringify(body)
  };
}
export function env() {
  return {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY
  };
}
export async function sb(path, opts={}) {
  const {url,key}=env();
  if(!url || !key) throw new Error("SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum diset");
  const r=await fetch(`${url}/rest/v1/${path}`, {
    ...opts,
    headers:{
      apikey:key,
      Authorization:`Bearer ${key}`,
      "Content-Type":"application/json",
      Prefer:"return=representation",
      ...(opts.headers||{})
    }
  });
  const text=await r.text();
  if(!r.ok) throw new Error(text || `Supabase HTTP ${r.status}`);
  return text ? JSON.parse(text) : [];
}
