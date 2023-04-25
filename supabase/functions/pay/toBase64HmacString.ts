import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

export function toBase64HmacString(
  apiKeySecret: string,
  dataToSign: ArrayBuffer
) {
  const signingKey = new TextEncoder().encode(apiKeySecret);
  const hmac = createHmac("sha256", signingKey);
  hmac.update(dataToSign);
  const rawHmac = hmac.digest();
  return btoa(String.fromCharCode(...new Uint8Array(rawHmac)));
}
