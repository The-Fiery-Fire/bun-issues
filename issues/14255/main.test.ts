import { test, expect } from "bun:test";
import { isWindows } from "../../utils";

// windows surprisingly is correct
test.skipIf(isWindows)("Changing process.title does nothing", async () => {
    process.title = 'foo'
    expect(process.title).toBe("bun")
});

