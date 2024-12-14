import { it, expect } from 'bun:test'
import { spawn } from "bun";
import { isWindows } from '../../utils';

it("shell: piping assignments into command causes crash", async () => {

    const proc = spawn({
        cmd: [process.argv[0], "exec", "FOO=bar BAR=baz | echo hi"],
        stdout: "pipe",
        stderr: "pipe",
        stdin: "pipe",

        cwd: import.meta.dir
    });

    expect(await proc.exited).toBeOneOf({
        "win32": [3, 143],
        "darwin": [133],
        "linux": [132],
    }[process.platform as string] || [3])

    // windows still bugged for reading stderr
    if (!isWindows) {
        // Capture the output
        const stdout = await new Response(proc.stdout).text();
        const stderr = await new Response(proc.stderr).text();

        // expect(stdout).toInclude("hi")
        expect(stderr).toInclude("panic(main thread): Invalid tag\noh no: Bun has crashed. This indicates a bug in Bun, not your code.\n\nTo send a redacted crash report to Bun's team,\nplease file a GitHub issue using the link below:\n\n https://bun.report/")
    }
    proc.kill()
}, { timeout: 10000 });
