import { test, expect } from "bun:test";

test("TypeError: ReadableStreamBYOBReader needs a ReadableByteStreamController", async () => {

    const pass = new Promise(async (resolve) => {
        const s = Bun.serve({
            port: 0,
            async fetch(req) {
                try {
                    await req.body.getReader({ mode: 'byob' }); // <-- TypeError: ReadableStreamBYOBReader needs a ReadableByteStreamController
                } catch (err) {
                    if (err.toString() === "TypeError: ReadableStreamBYOBReader needs a ReadableByteStreamController")
                        resolve(true)
                }
                resolve(false)
                return new Response('hi')

            }
        })

        await fetch(s.url, {
            method: "POST",
            body: "HIIIIIIIIIII"
        })
    })


    expect(pass).resolves.toBeTrue()
});

