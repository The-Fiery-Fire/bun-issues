import { it, expect } from "bun:test";

const expected = `// issues/15536/index.html
var _15536_default = undefined;

// issues/15536/main.ts
console.log(_15536_default);
`

it("Bun.build Incorrect type", async () => {
    await Bun.build({
        loader: {
            ".html": "text"
        },
        entrypoints: [import.meta.dirname + "/main.ts"],
        outdir: import.meta.dir + "/dist",
    })

    const content = await Bun.file(import.meta.dir + "/dist/main.js").text()
    expect(content).not.toBe(expected)
})