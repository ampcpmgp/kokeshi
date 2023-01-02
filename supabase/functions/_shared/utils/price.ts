import { TOKEN_PER_WORD, WORD_PER_TOKEN } from "../const/price.ts";

export function pricePerToken(pricePerWord: number) {
  return pricePerWord * WORD_PER_TOKEN;
}

export function tokenPerPrice(pricePerWord: number) {
  return 1 / pricePerToken(pricePerWord);
}

export function convertToTokenFromCredit(credit: number, pricePerWord: number) {
  return Math.floor(credit * tokenPerPrice(pricePerWord));
}

export function convertToTokenFromPrompt(prompt: string) {
  return Math.floor(prompt.length * TOKEN_PER_WORD);
}

export function getPrice(token: number, pricePerWord: number) {
  return Math.floor(token * pricePerToken(pricePerWord) * 10000) / 10000;
}
