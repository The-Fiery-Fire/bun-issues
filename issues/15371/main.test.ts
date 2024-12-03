import { test, expect } from "bun:test";
import utils from "node:util"

test("`crypto.hkdf` support for PASETO token support", async () => {
    expect(crypto.hkdf).toBe(undefined)
    expect(() => utils.promisify(crypto.hkdf)).toThrowError()
});

