describe.each(["A", "B", "C"])("test", (data) => {
    it.only("prints", () => {
        console.log(data);
    });
});