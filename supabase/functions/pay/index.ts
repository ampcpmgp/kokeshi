// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.186.0/crypto/mod.ts";
import { corsHeaders } from "../_shared/utils/cors.ts";
import { toBase64HmacString } from "./toBase64HmacString.ts";
import { API_URL } from "./const.ts";

const DELIMITER = "\n";

function bin2hex(binary: Uint8Array) {
  return Array.from(binary)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

serve(async (req) => {
  const { method } = req;

  // This is needed if you're planning to invoke your function from a browser.
  if (method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();

  const body = JSON.stringify({
    merchantPaymentId: Deno.env.get("PAYPAY_MERCHANT_ID"),
    amount: {
      amount: 100,
      currency: "JPY",
    },
    orderDescription: "",
    codeType: "ORDER_QR",
  });

  const contentType = "application/json;charset=UTF-8;";
  const encoder = new TextEncoder();
  const hashBuff = await crypto.subtle.digest(
    "MD5",
    encoder.encode(body + contentType)
  );
  const hashBin = new Uint8Array(hashBuff);
  const hash = bin2hex(hashBin);
  const requestUrl = `${API_URL}/codes`;
  const httpMethod = "POST";
  const nonceArr = crypto.getRandomValues(new Uint8Array(8));
  const nonce = btoa(String.fromCharCode(...nonceArr));
  const epoch = Math.floor(Date.now() / 1000);
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

  console.log("🚀🐡 ~ file: index.ts:61 ~ serve ~ authHeader:", authHeader);
  const response = await fetch(requestUrl, {
    method: "POST",
    headers: {
      AUTHORIZATION: authHeader,
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
