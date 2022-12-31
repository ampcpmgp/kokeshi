import {
  TOKEN_PER_PRICE,
  TOKEN_PER_WORD,
  PRICE_PER_TOKEN,
} from "../../supabase/functions/_shared/const/price";
import type { AnalyticsKind } from "../const/analytics-kind";

export function convertToTokenFromCredit(credit: number) {
  return Math.floor(credit * TOKEN_PER_PRICE);
}

export function convertToTokenFromPrompt(prompt: string) {
  return Math.ceil(prompt.length * TOKEN_PER_WORD);
}

export function getPrice(token: number) {
  return Math.floor(token * PRICE_PER_TOKEN * 1000) / 1000;
}

export function getFunctionMinPrice(kind: Pick<AnalyticsKind, "PRE" | "SUF">) {
  const token = convertToTokenFromPrompt(kind.PRE + "\n" + "\n" + kind.SUF);
  return getPrice(token);
}
