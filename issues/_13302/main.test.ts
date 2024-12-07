import { spawn } from "bun";
import { test, expect } from "bun:test";

// this should timeout after 500ms
test("AbortSignal.timeout and fetch not working when can't reach server ", async () => {

    const process = spawn({
        cmd: ["bun", "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    // check if it hangs
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("timed out"), 1000) // Timeout after 1sec
    );

    const result = await Promise.race([
        process.exited.then(e => "not timed out ??"),
        timeoutPromise
    ]);

    expect(result).toBe("timed out");

    process.kill()
}, { timeout: 5000 });
