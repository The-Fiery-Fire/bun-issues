import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isLinux, isMacos, isWindows } from '../../utils';

it.skipIf(isWindows)("Segfault with readline", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: ["bun", "./bug.ts"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });

    expect(await proc.exited).toBe({
        "linux": 139,
        "darwin": 133,
    }[process.platform as string] || 3)

});
