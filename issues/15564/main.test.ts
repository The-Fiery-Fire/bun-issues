import { spawn } from "bun";
import { test, expect } from "bun:test";
import { isWindows } from "../../utils";

test.if(isWindows)("bun can't read stderr from Bun.spawn", async () => {
    const proc = spawn({
        cmd: [process.argv[0], "./test.ts"],
        stderr: "pipe",
        stdout: "pipe",
        cwd: import.meta.dir,
    });

    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    expect(stdout).toBe("");
    expect(stderr).not.toBe("sad");
});
