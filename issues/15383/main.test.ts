import { test, expect } from "bun:test";
import { Image } from "@napi-rs/canvas/js-binding.js"

test("Wrap finalizer for PromiseRaw failed (@napi-rs/canvas)", async () => {

    expect(() => {
        const image = new Image();
        image.src = "./anythinghere"; // doesnt need to be valid
    }).toThrow('Wrap finalizer for PromiseRaw failed')

    // fixed by https://github.com/oven-sh/bun/pull/14501
});

