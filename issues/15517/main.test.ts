import { test, expect } from "bun:test";

test("Re-importing ESM with a query string causes a hang (bug)", async () => {
    const modulePath = "./two.ts";

    // Import without a query string
    const initialLoad = await import(modulePath);
    expect(initialLoad).toHaveProperty("hi"); // Ensure the module exports correctly

    // Attempt to re-import with a query string
    const queryStringPath = `${modulePath}?t=${Date.now()}`;
    const reimportPromise = import(queryStringPath);

    // Assert that the re-import hangs
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("Timed out as expected"), 500) // Timeout after 0.5sec
    );

    // Use Promise.race to check if the import hangs
    const result = await Promise.race([reimportPromise, timeoutPromise]);

    // The test passes if the bug persists (result is the timeout message)
    expect(result).toBe("Timed out as expected"); // Passes if import hangs
});
