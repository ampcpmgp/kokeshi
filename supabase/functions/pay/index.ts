// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createHash } from "https://deno.land/std@0.160.0/hash/mod.ts";
import { corsHeaders } from "../_shared/utils/cors.ts";
import { toBase64HmacString } from "./toBase64HmacString.ts";
import { API_URL } from "./const.ts";

const DELIMITER = "\n";

serve(async (req) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();

  const hasher = createHash("md5");

  const body = JSON.stringify({
    amount: 100,
    orderDescription: "",
    codeType: "ORDER_QR",
  });

  const contentType = "application/json;charset=UTF-8;";

  hasher.update(body);
  hasher.update(contentType);

  const hash = hasher.toString();

  const requestUrl = `${API_URL}/codes`;
  const httpMethod = "POST";
  const nonceArr = crypto.getRandomValues(new Uint8Array(16));
  const nonce = btoa(String.fromCharCode(...nonceArr));
  const epoch = Date.now();
  const apiKey = Deno.env.get("PAYPAY_API_KEY") ?? "";
  const secretKey = Deno.env.get("PAYPAY_SECRET_KEY") ?? "";

  const hmacArr = new TextEncoder().encode(
    `${requestUrl}${DELIMITER}${httpMethod}${DELIMITER}${nonce}${DELIMITER}${epoch}${DELIMITER}${contentType}${DELIMITER}${hash}`
  );

  const hmac = toBase64HmacString(secretKey, hmacArr);

  /**
   * docs
   * https://www.paypay.ne.jp/opa/doc/jp/v1.0/webcashier#tag/API/HMAC-auth
   */
  const authHeader = `hmac OPA-Auth:${apiKey}:${hmac}:${nonce}:${epoch}:${hash}`;

  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=UTF-8;",
      "X-ASSUME-MERCHANT": `Bearer ${Deno.env.get("PAYPAY_MERCHANT_ID")}`,
    },
    body,
  });

  const data = await response.json();
  console.log("🚀 response.status", response.status);
  console.log("🚀 response.statusText", response.statusText);
  console.log("🚀 data", data);

  return new Response(
    JSON.stringify({
      hash,
      hmac,
      authHeader,
      nonce,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
