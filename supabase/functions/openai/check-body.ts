export interface Body {
  prompt: string;
  max_tokens: number;
}

// deno-lint-ignore no-explicit-any
export function checkBody (body: Body | any): asserts body is Body {
  if (typeof body.prompt !== "string") throw new Error("Prompt is not a string")
  if (body.prompt.length < 1) throw new Error("Prompt is too short")
  if (body.prompt.length > 2400) throw new Error("Prompt is too long")

  if (typeof body.max_tokens !== "number") throw new Error("Max tokens is not a number")
  if (body.max_tokens < 1) throw new Error("Max tokens is too small")
  if (body.max_tokens > 4000) throw new Error("Max tokens is too big")

}
