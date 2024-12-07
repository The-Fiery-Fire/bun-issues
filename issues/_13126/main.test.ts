import { spawn } from "bun";
import { test, expect } from "bun:test";

// this should timeout after 500ms
test("signal argument not used when passed to net.createConnection for connection timeouts", async () => {

    const proc = spawn({
        cmd: [process.argv[0], "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    // check if it hangs
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("timed out"), 1000) // Timeout after 1sec
    );

    const result = await Promise.race([
        proc.exited.then(e => "not timed out ??"),
        timeoutPromise
    ]);

    expect(result).toBe("timed out");
    proc.kill()
}, { timeout: 5000 });
