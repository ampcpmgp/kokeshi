import { MAX_TOKEN, TOKEN_PER_WORD } from "../../const/prices";

export function getToken (text: string) {
  return Math.floor(text.length * TOKEN_PER_WORD);
}
export function getMaxToken (token) {
  return MAX_TOKEN - token;
}