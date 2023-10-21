import { expect, test } from "vitest";
import { sum } from "../sum";

test("adds positive numbers correctly", () => {
  expect(sum(1, 2)).toEqual(3);
  expect(sum(0, 2)).toEqual(2);
});

test("adds negative numbers correctly", () => {
  expect(sum(-1, 2)).toEqual(1);
  expect(sum(0, -2)).toEqual(-2);
});
