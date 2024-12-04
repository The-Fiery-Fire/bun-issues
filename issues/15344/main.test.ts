import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isWindows } from '../../utils';

it("Segfault with readline", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: ["bun", "./bug.ts"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });
    await Bun.sleep(50)
    proc.stdin.write("hello\n");
    await Bun.sleep(150)
    proc.stdin.write("hello\n");
    await Bun.sleep(100)
    proc.stdin.write("hello\n");

    const exit = await proc.exited

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    expect(exit).toBeOneOf({
        "win32": [3, 143],
        "darwin": [133],
        "linux": [132],
    }[process.platform as string] || [3])

    expect(stdout).toInclude("hi\nEnter your name: Hello, hello!\n")
    expect(stderr).toInclude("Segmentation fault at address ")
    expect(stderr).toInclude("oh no: Bun has crashed. This indicates a bug in Bun, not your code.\n\nTo send a redacted crash report to Bun's team,\nplease file a GitHub issue using the link below:\n\n https://bun.report/")

    proc.kill()
});
