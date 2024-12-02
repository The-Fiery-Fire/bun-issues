import { it, expect } from "bun:test";

it("CSS build with sourcemap produces invalid 'JS style' sourcemap link comments ", async () => {
    await Bun.build({
        experimentalCss: true,
        sourcemap: 'linked',
        entrypoints: [import.meta.dirname + "/test.css"],
        outdir: import.meta.dir + "/dist",
    })

    const content = await Bun.file(import.meta.dir + "/dist/test.css").text()
    expect(content).toInclude("//# sourceMappingURL=")
    expect(content).not.toInclude("/*# sourceMappingURL=")
})