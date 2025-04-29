import { describe, expect, test } from "vitest";
import { greeting } from "./foo";

describe("greeting", () => {
  test("should combine string with parameter value", async () => {
    const response = await greeting({ name: "John" });
    expect(response.greeting).toBe("Hello! John!");
  });
});
