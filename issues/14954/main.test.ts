import { spawn } from "bun";
import { test, expect } from "bun:test";

test("Using import.meta.dir when compiling with --bytecode flag throws error ", async () => {
    const proc = spawn({
        cmd: 'bun build --bytecode --compile --minify test.ts --outfile meta'.split(' '),
        stdin: "ignore",
        stdout: "pipe",
        stderr: "pipe",
        cwd: import.meta.dir,
    });

    expect(await new Response(proc.stderr).text()).toBe('error: Failed to generate bytecode for ./test.js\n');
    await proc.kill()
});
