import { it, expect } from "bun:test";

it("bun build should hoist \"use client\"", async () => {

    await Bun.build({
        entrypoints: [import.meta.dir+"\\form.tsx"],
        outdir: import.meta.dir + "\\dist", 
    })

    const content = await Bun.file(import.meta.dir + "\\dist\\form.js").text()

    expect(content.split("\n")[0]).not.toInclude('"use client";')

    // even if it doesnt include react inlined its still not first
    await Bun.build({
        entrypoints: [import.meta.dir+"\\form.tsx"],
        outdir: import.meta.dir + "\\dist", 
        external: ['*']
    })

    const content2 = await Bun.file(import.meta.dir + "\\dist\\form.js").text()
    expect(content2.split("\n")[0]).not.toInclude('"use client";')

})