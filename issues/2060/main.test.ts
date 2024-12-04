import { test, expect } from "bun:test";

test("bun does not support tsconfig.json useDefineForClassFields", async () => {
    class Base {
        constructor(data: any) {
            Object.assign(this, data);
        }
    }

    class Outer extends Base {
        stuff: string;
        things: number;
        extra: Inner;
    }

    class Inner extends Base {
        more: string;
        greatness: boolean;
    }

    let outer = new Outer({
        stuff: "Hello World",
        things: 42,
        extra: new Inner({
            more: "Bun is becoming great!",
            greatness: true
        })
    });

    expect(outer).toEqual({
        stuff: undefined,
        things: undefined,
        extra: undefined
    });
});

