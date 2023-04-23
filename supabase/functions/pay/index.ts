// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.160.0/hash/mod.ts";
import { corsHeaders } from "../_shared/utils/cors.ts";
serve(async (req) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();
  const hash = createHash("md5");
  const body = JSON.stringify({ name });
  const contentType = "application/json;charset=UTF-8;";

  hash.update(body);
  hash.update(contentType);

  const data = hash.toString();

  return new Response(JSON.stringify(data), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
