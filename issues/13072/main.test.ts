import { test, expect } from "bun:test";

test("Implement process.binding(\"http_parser\")", async () => {

    expect(() => process.binding('http_parser'))
        .toThrow('process.binding("http_parser") is not implemented in Bun.')
});

