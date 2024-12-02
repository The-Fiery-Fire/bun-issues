import { test, expect } from "bun:test";
import http from "node:http"

test("node http - header with 2 values", async () => {

    const res = new http.OutgoingMessage();
    res.setHeader("myheader", ["first", "second"]);

    const data = res.getHeaders()

    // it doesn't join them correctly (at least compared to node)
    expect(data.myheader).not.toEqual(['first', 'second']);
    expect(data.myheader).toEqual('first,second');

});

