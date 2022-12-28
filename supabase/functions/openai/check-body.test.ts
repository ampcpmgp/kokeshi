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

Deno.test("throw error when max_tokens is not number", () => {
  const check = () => checkBody({ prompt: "a", max_tokens: "a" });

  assertThrows(check, Error, "Max tokens is not a number");
});

Deno.test("throw error when max_tokens is < 1", () => {
  const check = () => checkBody({ prompt: "a", max_tokens: 0 });

  assertThrows(check, Error, "Max tokens is too small");
});

Deno.test("throw error when max_tokens is > 4000", () => {
  const check = () => checkBody({ prompt: "a", max_tokens: 4001 });

  assertThrows(check, Error, "Max tokens is too big");
});