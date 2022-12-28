import { Body } from "./check-body.ts";
import { getMaxPrice } from "../_shared/utils/price.ts";

export function checkCredit (credit: number, body: Body) {
  if (credit <= 0) throw new Error("No Credit")

  const { max_tokens, prompt } = body

  const maxPrice = getMaxPrice(max_tokens)

  console.log(maxPrice, credit)

  throw new Error("a")
}
