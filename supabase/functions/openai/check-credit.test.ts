import {
  assertThrows,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { checkBody } from "./check-body.ts";

Deno.test("throw error when prompt is not string", () => {
  const check = () => checkBody({ prompt: 1 });

  assertThrows(check, Error, "Prompt is not a string");
});
