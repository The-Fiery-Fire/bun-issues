import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isWindows } from '../../utils';

// windows has a bug with reading stderr (when its created before stdout)
it.skipIf(isWindows)("should fail when describe.each + it.only runs only the first input", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: [process.argv[0], "test", "./repro.test.ts"],
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    // Check if the output indicates only one test ran
    expect(stderr).toInclude("(pass) test > prints")
    expect(stdout).not.toInclude("B")
    expect(stdout).not.toInclude("C")
});
