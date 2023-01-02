import {
  convertToTokenFromCredit,
  convertToTokenFromPrompt,
} from "../_shared/utils/price.ts";

export function getToken(credit: number, prompt: string, maxToken: number) {
  const creditToken = convertToTokenFromCredit(credit);
  const sumToken = Math.min(creditToken, maxToken);
  const promptToken = convertToTokenFromPrompt(prompt);
  const requestToken = Math.floor(sumToken - promptToken);

  if (requestToken < 1) throw new Error("Not enough credit");

  return requestToken;
}
