import {
  assertThrows,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { checkBody } from "./check-body.ts";

Deno.test("throw error when prompt is not string", () => {
  const check = () => checkBody({ prompt: 1 });

  assertThrows(check, Error, "Prompt is not a string");
});

Deno.test("throw error when prompt.length is 0", () => {
  const check = () => checkBody({ prompt: "" });

  assertThrows(check, Error, "Prompt is too short");
});

Deno.test("throw error when prompt.length is > 2400", () => {
  const check = () => checkBody({ prompt: "a".repeat(2401) });

  assertThrows(check, Error, "Prompt is too long");
});
