// intentionally .cjs, because sloppy mode
// but there isn't any indicator its cjs other then file extention

test("eval doesn't hoist var", () => {
    eval('var x = 0')
    expect(() => x).toThrowError("Can't find variable: x")
});


// module.exports = 1