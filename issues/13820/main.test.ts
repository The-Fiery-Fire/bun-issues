import { request } from "https";
import { test, expect } from "bun:test";
import util from "node:util"

test("Discrepancy in https.request implementation ", async () => {

    const url = new Promise((resolve, reject) => {
        const req = request("https://google.com", (res) => resolve(res.url));
        req.end();
    })

    expect(url).resolves.toBe("/") // should be ""
});

