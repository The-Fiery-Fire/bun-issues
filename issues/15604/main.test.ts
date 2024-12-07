import { test, expect } from "bun:test";

test("Regular Expression test returns false instead of true ", async () => {
    function testRegexp(expression: string, input: string) {
        const regex = new RegExp(expression);
        console.log("Expression:", expression);
        console.log("Input:", input);
        console.log("Regex Source:", regex.source);
        console.log("Regex Source String:", JSON.stringify(regex.source));
        console.log("Test:", regex.test(input));
        console.log("Function:", testRegexp.toString());
        return regex.test(input);
    }

    expect(testRegexp(
        "^(?:[A-Z]+)-\\d+(?: \\| ).*?[a-z]",
        "SD-109116 | close button append issue fixed in section"
    )).toBe(true); // i'm not sure if this is correct behavior, but just testing
});

