import { MAX_TOKEN, TOKEN_PER_WORD } from "../../const/prices";

export function convertToToken (text: string) {
  return Math.ceil(text.length * TOKEN_PER_WORD);
}
export function getMaxToken (token) {
  return MAX_TOKEN - token;
}