import { spawn } from "bun";
import { test, expect } from "bun:test";

test("Macros with default import/export", async () => {
    const process = spawn({
        cmd: ["bun", "./index.ts"],
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir
    });

    // if it crashes its not 0
    expect(await process.exited).not.toBe(0);
    expect(await new Response(process.stderr).text())
        .toInclude('error: "MacroLoadError" error in macro')
});
