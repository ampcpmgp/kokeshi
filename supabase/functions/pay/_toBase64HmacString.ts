import { createHmac } from "https://deno.land/std@0.177.0/node/crypto.ts";

export function _toBase64HmacString(apiKeySecret: string, dataToSign: string) {
  const signingKey = new TextEncoder().encode(apiKeySecret);
  const hmac = createHmac("sha256", signingKey);

  hmac.update(dataToSign);

  const rawHmac = hmac.digest();

  return btoa(String.fromCharCode(...new Uint8Array(rawHmac)));
}
