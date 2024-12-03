import { test, expect } from "bun:test";

test("Recursive globs fail too early on partial path match", async () => {
    expect([
        new Bun.Glob(`**/*abc*`).match(`z/abc`),
        new Bun.Glob(`**/*abc*`).match(`a/abc`),
    ]).toEqual([true, false])
    // it should be [true, true]
});

