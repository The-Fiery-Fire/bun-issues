import { spawn } from "bun";
import { it, expect } from "bun:test";
import { isWindows } from "../../utils";

it("bun --eval ignores first command line arg", async () => {
  const proc = spawn({
    cmd: 'bun -e console.log(process.argv) 1 2 3'.split(" "),
    stdout: "pipe",
    stderr: "pipe",

    cwd: '/'
  });

  // Capture the output
  await proc.exited
  const stdout = await new Response(proc.stdout).text();
  const d = JSON.parse(stdout)

  // it should be this
  expect(d).not.toEqual([process.argv[0], "1", "2", "3"])

  // not this
  expect(d).toEqual([process.argv[0], isWindows ? "C:\\\\[eval]" : "//[eval]", "2", "3"])
})