import { spawn } from "bun";
import { test, expect } from "bun:test";

// this should timeout after 500ms
test("signal argument not used when passed to net.createConnection for connection timeouts", async () => {

    const process = spawn({
        cmd: ["bun", "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    // check if it hangs
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("timed out"), 700) // Timeout after 0.7sec
    );

    const result = await Promise.race([
        process.exited.then(e => "not timed out ??"),
        timeoutPromise
    ]);

    expect(result).toBe("timed out");
}, { timeout: 5000 });
