import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isLinux } from '../../utils';

// seems to be only linux issue
it.if(isLinux)("Bun SIGSEGV when importing emcc output", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: [process.argv[0], "./bug.ts"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });

    expect(await proc.exited).toBeOneOf([132, 139])
    proc.kill()
}, { timeout: 10_000 });
