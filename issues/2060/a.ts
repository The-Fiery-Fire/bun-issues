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

