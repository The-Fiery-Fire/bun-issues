import { spawn } from "bun";
import { test, expect } from "bun:test";
import { isLinux, isWindows } from "../../utils";

test.skipIf(isWindows)("prompt() can't read more than 1024B on macOS", async () => {
    if (isWindows) return

    const proc = spawn({
        cmd: ["bun", "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    const text = 'a'.repeat(isWindows ? 50000000 : 0)
    await Bun.sleep(50)
    proc.stdin.write(text);
    proc.stdin.write('\n');

    await proc.exited

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    // expect(stdout).not.toBe(`bug \n\n\nresult:\n#####\n${'a'.repeat(isWindows ? 219276 : 0)}\n#####\n`)
    expect(stdout.length).toBeLessThan(50000000)
    expect(stdout).toEndWith("\n#####\ndone\n")
    proc.kill()
});
