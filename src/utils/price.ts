import { PRICE_PER_TOKEN } from "../const/prices";
import { PRICE_PER_WORD } from "../const/prices";

export function getPrice (word: number = 0, token: number = 0) {
  return word * PRICE_PER_WORD + token * PRICE_PER_TOKEN;
}
export function getMaxPrice (max_token: number = 0) {
  return max_token * PRICE_PER_TOKEN;
}