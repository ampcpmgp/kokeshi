import {
assertEquals,
  assertThrows,
} from "https://deno.land/std@0.65.0/testing/asserts.ts";
import { checkCredit } from "./check-credit.ts";

Deno.test("should throw error when no credit", () => {
  assertThrows(() => {
    checkCredit(0, { max_tokens: 1, prompt: "hello" });
  }
  );
});

Deno.test("should return credit when credit is greater than max price", () => {
  assertEquals(
    checkCredit(10, { max_tokens: 1, prompt: "hello" }),
    1,
  );
} );

Deno.test("should return max price when credit is less than max price", () => {
  assertEquals(
    checkCredit(1, { max_tokens: 10, prompt: "hello" }),
    1,
  );
}
);