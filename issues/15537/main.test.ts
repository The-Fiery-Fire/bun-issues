import { it, expect } from "bun:test";

const expected = `var TheNamespace;
((TheNamespace) => {

  export { TheClass };
})(TheNamespace ||= {});
`

it("bundler creates invalid js from ts: An export declaration can only be used at the top level of a module.ts(1474)", async () => {
    await Bun.build({
        entrypoints: [import.meta.dirname + "/test.ts"],
        outdir: import.meta.dir + "/dist",
        minify: false,
        format: 'esm',
        sourcemap: 'none',
    })

    const content = await Bun.file(import.meta.dir + "/dist/test.js").text()
    expect(content).toInclude("export { TheClass };")
    expect(content).toInclude(expected)
})