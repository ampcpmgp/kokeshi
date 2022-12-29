import { MAX_TOKEN } from "../_shared/const/price.ts"
import { convertToTokenFromCredit, convertToTokenFromPrompt } from "../_shared/utils/price.ts"

export function getToken (credit: number, prompt: string) {
  const creditToken = convertToTokenFromCredit(credit)
  const sumToken = Math.min(creditToken, MAX_TOKEN)
  const promptToken = convertToTokenFromPrompt(prompt)
  const requestToken = Math.floor(sumToken - promptToken)
  
  if (requestToken < 1) throw new Error("Not enough credit")
  
  return requestToken
}