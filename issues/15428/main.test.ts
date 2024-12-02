import { it, expect } from "bun:test";
import { spawn } from "bun";
import { isWindows } from "../../utils";

// The test script to run
// skip on windows as it skill issues the spawn result
it.skipIf(isWindows)("should fail when expect(...).resolves.toSatisfy(...) passes the promise directly", async () => {
    // Spawn a new Bun process to run the test script with the problematic behavior
    const process = spawn({
        cmd: ["bun", "test", "./promise-satisfy.test.fails.ts"], // Path to your test file
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });

    // Capture the output
    const stdout = await new Response(process.stdout).text();
    const stderr = await new Response(process.stderr).text();

    // Check if the test output indicates failure due to the issue
    // The bug exists if the test shows this failure message
    expect(stderr).toInclude('Expected: [Function]'); // Fail the test if this issue is still present
    expect(stderr).toInclude('error: expect(received).toSatisfy(expected)'); // Fail the test if this issue is still present
});

