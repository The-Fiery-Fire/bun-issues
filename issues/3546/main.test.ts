import { test, expect } from "bun:test";

test("TypeError: process.binding(\"fs\") is not supported in Bun ", async () => {

    expect(() => process.binding('fs'))
        .toThrow('process.binding("fs") is not implemented in Bun.')
});

