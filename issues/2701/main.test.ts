import { it, expect } from "bun:test";

const expected = `
import { timingSafeEqual } from "crypto";
console.log(timingSafeEqual(Buffer.from("abc"), Buffer.from("abc")));
`

it("Flagging Node Dependencies with --external does not work ", async () => {
  await Bun.build({
    entrypoints: [import.meta.dirname + "/test.ts"],
    outdir: import.meta.dir + "/dist",
    external: ["crypto", "node:crypto"],
    target: "browser"
  })

  const content = await Bun.file(import.meta.dir + "/dist/test.js").text()
  expect(content).toInclude("node_modules/crypto/index.js")
  expect(content).not.toInclude(expected)
})