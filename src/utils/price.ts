import {
  TOKEN_PER_WORD,
  WORD_PER_TOKEN,
} from "../../supabase/functions/_shared/const/price";
import type { AnalyticsKind } from "../const/analytics-kind";

export function wordPerPrice(pricePerWord: number) {
  return 1 / pricePerWord;
}

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
  return Math.ceil(prompt.length * TOKEN_PER_WORD);
}

export function getPrice(token: number, pricePerWord: number) {
  return Math.floor(token * pricePerToken(pricePerWord) * 1000) / 1000;
}

export function getFunctionMinPrice(
  kind: Pick<AnalyticsKind, "PRE" | "SUF">,
  pricePerWord: number
) {
  const token = convertToTokenFromPrompt(kind.PRE + "\n" + "\n" + kind.SUF);
  return getPrice(token, pricePerWord);
}
