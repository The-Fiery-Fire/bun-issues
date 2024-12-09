import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isLinux, isMacos, isWindows } from '../../utils';

it.skipIf(isLinux)("Bun.$ crashes on macOS ARM64 with large array of non-empty strings", async () => {
    // Spawn a new Bun process to run the test script
    const proc = spawn({
        cmd: [process.argv[0], "./bug.ts"],
        stderr: "pipe",

        cwd: import.meta.dir
    });

    expect(await proc.exited).toBe({
        "win32": 5,
        "darwin": 133,
    }[process.platform as string] || 3)

    // Capture the output
    // const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    if (!isWindows) {
        expect(stderr).toInclude("panic(main thread): Segmentation fault at address")
        expect(stderr).toInclude("oh no: Bun has crashed. This indicates a bug in Bun, not your code.\n\nTo send a redacted crash report to Bun's team,\nplease file a GitHub issue using the link below:\n\n https://bun.report/")
    } else {
        expect(stderr).toInclude("============================================================\nBun ")
    }

    proc.kill()
});
