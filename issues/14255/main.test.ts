import { test, expect } from "bun:test";

test("Changing process.title does nothing", async () => {
    process.title = 'foo'
    expect(process.title).toBe("bun")
});

