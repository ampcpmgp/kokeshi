import { TOKEN_PER_PRICE, TOKEN_PER_WORD } from "../const/price.ts";

export function convertToTokenFromCredit (credit: number) {
  return Math.floor(credit * TOKEN_PER_PRICE);
}

export function convertToTokenFromPrompt (prompt: string) {
  return Math.floor(prompt.length * TOKEN_PER_WORD);
}