import { test, expect } from "bun:test";

test("Blob LastModified incompatibility with Node", async () => {

    class MyBlob extends Blob {
        constructor(parts) {
            super(parts);
            this.lastModified = 123;
        }
    }

    expect(() => new MyBlob(["foo"]))
        .toThrowError("Attempted to assign to readonly property")
});

