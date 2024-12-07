import { it, expect } from "bun:test";
import { spawn } from "bun";
import { isWindows } from "../../utils";

// The test script to run
// windows has a bug with reading stderr (when its created before stdout)
it.skipIf(isWindows)("should fail when expect(...).resolves.toSatisfy(...) passes the promise directly", async () => {
    // Spawn a new Bun process to run the test script with the problematic behavior
    const proc = spawn({
        cmd: [process.argv[0], "test", "./promise-satisfy.test.fails.ts"], // Path to your test file
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    // Check if the test output indicates failure due to the issue
    // The bug exists if the test shows this failure message
    expect(stderr).toInclude('Expected: [Function]'); // Fail the test if this issue is still present
    expect(stderr).toInclude('error: expect(received).toSatisfy(expected)'); // Fail the test if this issue is still present
});

