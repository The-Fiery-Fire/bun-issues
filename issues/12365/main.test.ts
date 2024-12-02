import { test, expect } from "bun:test";

test("console.log shows inherited prototype properties ", async () => {

    class Base { }
    Base.prototype.visibleBaseProp = 'base value';

    class Derived extends Base {
        constructor() {
            super();
            this.visibleDerivedProp = 'derived value';
        }
    }

    // it shows prob which it shouldnt (at least compared to node)
    expect(Bun.inspect(new Derived())).toInclude('visibleBaseProp: "base value"');

});