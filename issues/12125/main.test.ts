import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isWindows } from '../../utils';

it("readLine.createInterface closes early", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: ["bun", "./bug.mjs"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();
    console.log({stdout})
    expect(stdout).not.toBe(`Line 1: 1
Line 2: 2
Line 3: 3
Line 4: 4
`)
    expect(stdout).toInclude("Line 1: 1")
});
