import { TOKEN_PER_PRICE } from "../const/price.ts";

export function convertToTokenFromCredit (credit: number) {
  return Math.floor(credit * TOKEN_PER_PRICE);
}