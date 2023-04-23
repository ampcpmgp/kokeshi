// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.160.0/hash/mod.ts";
import { corsHeaders } from "../_shared/utils/cors.ts";

const DELIMITER = "\n";

serve(async (req) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();
  const hasher = createHash("md5");
  const body = JSON.stringify({ name });
  const contentType = "application/json;charset=UTF-8;";

  hasher.update(body);
  hasher.update(contentType);

  const hash = hasher.toString();

  const requestUrl = "/v2/codes/payments/dynamic-qr-test-00002";
  const httpMethod = "GET";
  const nonceArr = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...nonceArr));
  const epoch = Date.now();

  const hmacData = new TextEncoder().encode(
    `${requestUrl}${DELIMITER}${httpMethod}${DELIMITER}${nonce}${DELIMITER}${epoch}${DELIMITER}${contentType}${DELIMITER}${hash}`
  );

  return new Response(
    JSON.stringify({
      hash,
      hmacData,
      nonce,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
