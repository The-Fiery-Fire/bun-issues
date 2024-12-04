import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isLinux, isMacos, isWindows } from '../../utils';

// this seems to repo on local but not github actions
// - its really flaky
it.if(isWindows && false)("opening a lot of files segfaults on windows", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: ["bun", "./bug.ts"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });

    expect(await proc.exited).toBe(3)

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    expect(stderr).toInclude(" Segmentation fault at address")
    expect(stderr).toInclude("oh no: Bun has crashed. This indicates a bug in Bun, not your code.\n\nTo send a redacted crash report to Bun's team,\nplease file a GitHub issue using the link below:\n\n https://bun.report/")
}, {timeout: 10000});
