import { it, expect } from "bun:test";

it("compares promise value", () => {
    expect(Promise.resolve(42)).resolves.toSatisfy((v) => v === 42);
});

it("does not compare promise instance", () => {
    const promise = Promise.resolve(10);
    expect(promise).resolves.not.toSatisfy((v) => v === promise);
});