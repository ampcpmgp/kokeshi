import { PRICE_PER_TOKEN, PRICE_PER_WORD } from "../../const/prices";

function getPrice (word: number = 0, token: number = 0) {
  return word * PRICE_PER_WORD + token * PRICE_PER_TOKEN;
}