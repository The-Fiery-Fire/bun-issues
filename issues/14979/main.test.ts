import { test, expect } from "bun:test";
import { spawn } from "bun";
import { isWindows } from "../../utils";

// seems to only crash on windows
test.if(isWindows)("Panic when passing an existing/default import condition to --conditions ", async () => {
    const process = spawn({
        cmd: ["bun", '--conditions=import', "./index.ts"],
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });
    await process.exited

    // if it crashes its not 0
    expect(process.exitCode).not.toBe(0); 

});

