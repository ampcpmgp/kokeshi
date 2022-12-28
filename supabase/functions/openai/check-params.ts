export interface Params {
  prompt: string;
  max_tokens: number;
}

// deno-lint-ignore no-explicit-any
export function checkParams (params: Params | any): asserts params is Params {
  if (typeof params.prompt !== "string") throw new Error("Prompt is not a string")
  if (params.prompt.length < 1) throw new Error("Prompt is too short")
  if (params.prompt.length > 2400) throw new Error("Prompt is too long")

  if (typeof params.max_tokens !== "number") throw new Error("Max tokens is not a number")
  if (params.max_tokens < 1) throw new Error("Max tokens is too small")
  if (params.max_tokens > 4000) throw new Error("Max tokens is too big")

}
