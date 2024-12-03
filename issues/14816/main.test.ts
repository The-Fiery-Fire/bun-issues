import { test, expect } from "bun:test";
import { isWindows } from "../../utils";

test.if(isWindows)("pathToFileURL on Windows fails to include drive letter when input path starts with / ", async () => {
    expect([
        Bun.pathToFileURL("/index.ts").toString(),
        Bun.pathToFileURL("C:/index.ts").toString(),
    ]).toEqual([
        "file:///index.ts", //should be below tho
        "file:///C:/index.ts"
    ])
});

