// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "https://deno.land/std@0.186.0/http/server.ts";
import { crypto } from "https://deno.land/std@0.186.0/crypto/mod.ts";
import { corsHeaders } from "../_shared/utils/cors.ts";
import { toBase64HmacString } from "./toBase64HmacString.ts";
import { API_URL } from "./const.ts";
import { _toBase64HmacString } from "./_toBase64HmacString.ts";
import { createHash } from "https://deno.land/std@0.119.0/hash/mod.ts";
import { encode } from "https://deno.land/std@0.186.0/encoding/base64.ts";

const DELIMITER = "\n";

serve(async (req) => {
  // This is needed if you're planning to invoke your function from a browser.
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const { name } = await req.json();

  const epoch = Math.floor(Date.now() / 1000);
  const nonce = crypto.randomUUID();
  const merchantPaymentId = crypto.randomUUID();

  const body = JSON.stringify({
    merchantPaymentId,
    amount: {
      amount: 100,
      currency: "JPY",
    },
    orderDescription: "",
    codeType: "ORDER_QR",
  });

  const requestUrl = `${API_URL}/codes`;
  const method = "POST";
  const contentType = "application/json";

  const hash = createHash("md5");
  hash.update(contentType);
  hash.update(body);

  const payloadDigest = encode(hash.digest());

  const apiKey = Deno.env.get("PAYPAY_API_KEY") ?? "";
  const secretKey = Deno.env.get("PAYPAY_SECRET_KEY") ?? "";
  const merchantId = Deno.env.get("PAYPAY_MERCHANT_ID") ?? "";

  const signatureRawList = [
    requestUrl,
    method,
    nonce,
    epoch,
    contentType,
    payloadDigest,
  ];
  const signatureRawData = signatureRawList.join(DELIMITER);

  const hmac = await toBase64HmacString(secretKey, signatureRawData);

  const headList = [apiKey, hmac, nonce, epoch, payloadDigest];
  const header = headList.join(":");
  const authHeader = `hmac OPA-Auth:${header}`;

  const headers = {
    AUTHORIZATION: authHeader,
    "Content-Type": contentType,
    "X-ASSUME-MERCHANT": merchantId,
  };

  console.log(
    "🚀🐡 ~ file: index.ts:60 ~ serve ~ signatureRawData:",
    signatureRawData
  );

  console.log("🚀 requestUrl", requestUrl);
  console.log("🚀 method", method);
  console.log("🚀 headers", JSON.stringify(headers, null, "  "));
  console.log("🚀 body", JSON.stringify(JSON.parse(body), null, "  "));

  return new Response(JSON.stringify({}));

  const response = await fetch(requestUrl, {
    method,
    headers,
    body,
  });

  const data = await response.json();

  console.log("🚀 response.status", response.status);
  console.log("🚀 response.statusText", response.statusText);
  console.log("🚀 data", data);

  return new Response(
    JSON.stringify({
      hash,
      authHeader,
      nonce,
    }),
    {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
});
