import { describe, expect, test } from "vitest";
import {  get, shorten } from "./url";

describe("shorten", () => {
  test("should return a shortened URL", async () => {
    const resp = await shorten({ url: "https://example.com" });
    const url = await get({ id: resp.id });

    expect(url).toEqual({ id: expect.any(String), url: "https://example.com" });
  });
})


