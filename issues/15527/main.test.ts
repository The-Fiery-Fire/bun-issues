import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isLinux } from '../../utils';

// seems to be only linux issue
it.if(isLinux)("Bun SIGSEGV when importing emcc output", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: ["bun", "./bug.ts"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });

    expect(await proc.exited).toBe(139)

});
