import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { getToken } from "./get-token.ts";

Deno.test("should throw error when no credit", () => {
  assertThrows(
    () => {
      getToken(0, "test", 1);
    },
    Error,
    "Not enough credit"
  );
});

Deno.test("should return token", () => {
  const token = getToken(1, "test", 100);

  assertEquals(token, 95);
});
