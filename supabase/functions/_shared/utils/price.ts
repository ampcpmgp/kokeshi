import {
  PRICE_PER_TOKEN,
  TOKEN_PER_PRICE,
  TOKEN_PER_WORD,
} from "../const/price.ts";

export function convertToTokenFromCredit(credit: number) {
  return Math.floor(credit * TOKEN_PER_PRICE);
}

export function convertToTokenFromPrompt(prompt: string) {
  return Math.floor(prompt.length * TOKEN_PER_WORD);
}

export function getPrice(token: number) {
  return Math.floor(token * PRICE_PER_TOKEN * 10000) / 10000;
}
