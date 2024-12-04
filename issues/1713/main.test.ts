import { test, expect } from "bun:test";

test("console.log displays prototype object keys as plain keys", async () => {
    const obj = Object.create({ key: 123 });

    expect(Bun.inspect(obj)).toBe(`{\n  key: 123,\n}`); //it should be {}

    obj.key = 456;
    expect(Bun.inspect(obj)).toBe(`{\n  key: 456,\n}`); // this is correct
});

