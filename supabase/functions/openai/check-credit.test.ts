import {
  assertEquals,
  assertThrows,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { checkCredit } from "./check-credit.ts";

Deno.test("should throw error when no credit", () => {
  assertThrows(() => {
    checkCredit(0);
  });
});

Deno.test("should return credit when credit is greater than max price", () => {
  assertEquals(checkCredit(10), undefined);
});
