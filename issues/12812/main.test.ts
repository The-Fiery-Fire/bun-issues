import { spawn } from "bun";
import { it, expect } from "bun:test";
import { isWindows } from "../../utils";


it("Support import mod = require() in runtime ", async () => {
  const proc = spawn({
    cmd: ["bun", "./test.tsx"],
    stdout: "pipe",
    stderr: "pipe",
    stdin: "pipe",

    cwd: import.meta.dir
  });

  // Capture the output
  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();

  expect(await proc.exited).toBe(1)

  if (!isWindows) {
    expect(stderr).toInclude("SyntaxError: Unexpected token '{'. import call expects one or two arguments.")
  } else {
    // expect(stderr).toInclude("============================================================\nBun ")
  }
})