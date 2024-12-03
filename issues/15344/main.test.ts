import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isWindows } from '../../utils';

it("Segfault with readline", async () => {
    // Spawn a new Bun process to run the test script
    const process = spawn({
        cmd: ["bun", "./bug.ts"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });
    await Bun.sleep(50)
    process.stdin.write("hello\n");
    await Bun.sleep(100)
    process.stdin.write("hello\n");

    expect(await process.exited).toBe(isWindows ? 3 : 132)

    if (!isWindows) {
        // Capture the output
        const stdout = await new Response(process.stdout).text();
        const stderr = await new Response(process.stderr).text();

        expect(stderr).toInclude("Segmentation fault at address ")
        expect(stderr).toInclude("oh no: Bun has crashed. This indicates a bug in Bun, not your code.\n\nTo send a redacted crash report to Bun's team,\nplease file a GitHub issue using the link below:\n\n https://bun.report/")
    }
});
