import { spawn } from "bun";
import { test, expect } from "bun:test";
import { isWindows } from "../../utils";

test.if(isWindows)("reading console line twice hangs", async () => {

    const process = spawn({
        cmd: ["bun", "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    await Bun.sleep(50)
    process.stdin.write("hello\n");
    await Bun.sleep(300)
    process.stdin.write("hello\n");

    // check if it hangs
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("timed out"), 500) // Timeout after 0.5sec
    );

    const result = await Promise.race([
        process.exited.then(e => "not timed out ??"), timeoutPromise
    ]);

    expect(result).toBe("timed out");
});
