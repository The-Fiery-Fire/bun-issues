console.log(await Bun.build({
    loader: {
        ".html": "text"
    },
    entrypoints: [import.meta.dirname + "/main.ts"],
    outdir: import.meta.dirname + "/dist"
}))