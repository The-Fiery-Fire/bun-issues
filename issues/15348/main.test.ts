import { spawn } from "bun";
import { test, expect } from "bun:test";

test("Macros with default import/export", async () => {
    const proc = spawn({
        cmd: [process.argv[0], "./index.ts"],
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });

    // if it crashes its not 0
    expect(await proc.exited).not.toBe(0);
    expect(await new Response(proc.stderr).text())
        .toInclude('error: "MacroLoadError" error in macro')
});
