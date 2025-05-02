import { describe, expect, test } from "vitest";
import { ping } from "./ping";

describe("ping", () => {
  test.each([
    { site: "google.com", expected: true },
    { site: "https://encore.dev", expected: true },
    { site: "https://not-a-real-site.xyz", expected: false },
    { site: "invalid://scheme", expected: false },
  ])(
    // @ts-expect-error
    // biome-ignore lint/correctness/noConstantCondition: <explanation>
    `should verify that $site is ${"$expected" ? "up" : "down"}`,
    async ({ site, expected }) => {
      const result = await ping({ url: site });
      expect(result.up).toBe(expected);
    },
  );
});
