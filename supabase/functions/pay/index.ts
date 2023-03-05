// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders } from "../_shared/utils/cors.ts";
import PAYPAY from "npm:@paypayopa/paypayopa-sdk-node";
// import PAYPAY from "https://cdn.skypack.dev/@paypayopa/paypayopa-sdk-node";
// import PAYPAY from "https://www.unpkg.com/browse/@paypayopa/paypayopa-sdk-node@2.1.0/dist/index.js"

serve(async (req) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  console.log(PAYPAY);

  const { name } = await req.json();
  const data = {
    message: `Hello ${name}!`,
  };

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
