export interface Body {
  prompt: string;
}

// deno-lint-ignore no-explicit-any
export function checkBody (body: Body | any): asserts body is Body {
  if (typeof body.prompt !== "string") throw new Error("Prompt is not a string")
  if (body.prompt.length < 1) throw new Error("Prompt is too short")
  if (body.prompt.length > 2400) throw new Error("Prompt is too long")
}
