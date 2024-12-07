import { spawn } from "bun";
import { test, expect } from "bun:test";
import { isWindows } from "../../utils";

test.if(isWindows)("reading console line twice hangs", async () => {

    const proc = spawn({
        cmd: [process.argv[0], "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    await Bun.sleep(50)
    proc.stdin.write("hello\n");
    await Bun.sleep(300)
    proc.stdin.write("hello\n");

    // check if it hangs
    const timeoutPromise = new Promise((resolve) =>
        setTimeout(() => resolve("timed out"), 500) // Timeout after 0.5sec
    );

    const result = await Promise.race([
        proc.exited.then(e => "not timed out ??"), timeoutPromise
    ]);

    expect(result).toBe("timed out");
    proc.kill()
});
