import { spawn } from "bun";
import { test, expect } from "bun:test";
import { isWindows } from "../../utils";

test("prompt() can't read more than 1024B on macOS", async () => {

    const proc = spawn({
        cmd: ["bun", "./test.ts"],
        stdin: "pipe",
        cwd: import.meta.dir,
    });

    const text = 'a'.repeat(10000000)

    await Bun.sleep(50)
    proc.stdin.write(text);
    proc.stdin.write('\n');

    // Capture the output
    const stdout = await new Response(proc.stdout).text();
    const stderr = await new Response(proc.stderr).text();

    // it caps out at 219276 "a"'s rn 
    expect(stdout).not.toBe(`bug \n\n\nresult:\n#####\n${'a'.repeat(219276)}\n#####\n`)
    expect(stdout).toEndWith("\n#####\ndone\n")
});
