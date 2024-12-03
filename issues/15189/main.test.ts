import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isLinux, isMacos, isWindows } from '../../utils';

it.skipIf(isLinux)("Segfault with readline", async () => {
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
    await Bun.sleep(100)
    proc.stdin.write("hello\n");

    expect(await proc.exited).toBe({
        "win32": 5,
        "darwin": 133,
    }[process.platform as string] || 3)

    if (!isWindows) {
        // Capture the output
        const stdout = await new Response(proc.stdout).text();
        const stderr = await new Response(proc.stderr).text();

        expect(stderr).toInclude("panic(main thread): Segmentation fault at address")
        expect(stderr).toInclude("oh no: Bun has crashed. This indicates a bug in Bun, not your code.\n\nTo send a redacted crash report to Bun's team,\nplease file a GitHub issue using the link below:\n\n https://bun.report/")
    }
});
