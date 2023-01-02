import { KIND } from "../_shared/const/analytics-kind.ts";

export interface Body {
  prompt: string;
  kind: KIND;
}

// deno-lint-ignore no-explicit-any
export function checkBody(body: Body | any): asserts body is Body {
  if (typeof body.prompt !== "string")
    throw new Error("Prompt is not a string");
  if (body.prompt.length < 1) throw new Error("Prompt is too short");
  if (body.prompt.length > 2400) throw new Error("Prompt is too long");

  if (KIND.every((name) => name !== body.kind))
    throw new Error("Kind is not valid");
}
