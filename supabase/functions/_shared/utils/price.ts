import { PRICE_PER_TOKEN } from "../const/price.ts";
import { PRICE_PER_WORD } from "../const/price.ts";

export function getPrice (word = 0, token = 0) {
  return word * PRICE_PER_WORD + token * PRICE_PER_TOKEN;
}
export function getMaxPrice (max_token = 0) {
  return max_token * PRICE_PER_TOKEN;
}