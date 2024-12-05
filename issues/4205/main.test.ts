import { test, expect } from "bun:test";
import vm from 'node:vm';
test("node:vm globalThis / this !== context", async () => {

    const logs = []

    const context = {};
    vm.createContext(context);

    context.a = 123
    // context.log = console.log;
    context.log = (...args) => logs.push(args);

    vm.runInContext('log(this.a); log(a); log(a === this.a)', context);

    expect(logs).toEqual([
        [undefined], // should be 123
        [123],
        [false] // should be true
    ])
});

