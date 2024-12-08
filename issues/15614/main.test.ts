import { test, expect } from "bun:test";
import abc from "abc"


test("tsconfig.json baseUrl", async () => {
    expect(abc()).toBe("ABC :(")
    expect(abc()).not.toBe("DEF!!!!")
});

