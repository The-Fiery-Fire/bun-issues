import { test, expect } from "bun:test";
import { spawn } from "bun";
import { isWindows } from "../../utils";

// seems to only crash on windows
test.if(isWindows)("Panic when passing an existing/default import condition to --conditions ", async () => {
    const proc = spawn({
        cmd: ["bun", '--conditions=import', "./index.ts"],
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });

    // if it crashes its not 0
    expect(await proc.exited).not.toBe(0);
    expect(await new Response(proc.stderr).text())
        .toInclude('panic(main thread): reached unreachable code')

    proc.kill()
});

