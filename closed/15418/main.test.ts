import { it, expect } from "bun:test";
import fs from "fs";
import path from "path";

it("should fail when fs.readFileSync with w+ flag creates the file (indicating bug fix)", async () => {
    const filePath = path.join(import.meta.dir, "data.txt");

    // Fail if it actually makes file with no error
    expect(() => fs.readFileSync(filePath, { encoding: "utf8", flag: "w+" }))
        .toThrowError("No such file or directory")

    // Fail the test if the file is created (which means the issue is fixed)
    expect(fs.existsSync(filePath)).toBe(false); // Test should fail if file is created

    // Cleanup: Remove the file after the test
    try { fs.unlinkSync(filePath) } catch { }

});
