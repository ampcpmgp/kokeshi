import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../../_shared/utils/cors.ts";
import { API_STG_URL } from "../const.ts";

console.log("Hello from Functions!");

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };

  const resourceUrl = "/v2/codes";
  const requestUrl = `${API_STG_URL}${resourceUrl}`;
  const method = "GET";
  const contentType = "application/json";

  void requestUrl, method, contentType;

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
