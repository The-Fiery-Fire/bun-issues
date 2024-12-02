import { test, expect } from "bun:test";
test("Syntax Error in String.raw", async () => {
    expect(() => console.log(String.raw`Hello\user`))
        .toThrowError("Syntax Error!!")
});
