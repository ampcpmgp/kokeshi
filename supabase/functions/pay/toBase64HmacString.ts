export async function toBase64HmacString(
  apiKeySecret: string,
  dataToSign: string
) {
  const encoder = new TextEncoder();

  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(apiKeySecret),
    { name: "HMAC", hash: { name: "SHA-256" } },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(dataToSign)
  );

  return btoa(String.fromCharCode(...new Uint8Array(signature)));
}
