import { test, expect } from "bun:test";
import { join } from 'path';
test("Array instead of string in MatchedRoute when specific file structure", async () => {

    const router = new Bun.FileSystemRouter({
        dir: join(import.meta.dir, 'routes'),
        style: 'nextjs',
        fileExtensions: ['.ts'],
    });
    const matchedRoute = router.match('/1/test/2?c=1');

    expect(matchedRoute?.query["a"]).toBeArray()
    expect(matchedRoute?.params["a"]).toBeArray()
    expect(matchedRoute?.params).toEqual({ a: ["1", "1"], b: "2" })
    expect(matchedRoute?.query).toEqual({ a: ["1", "1"], b: "2", c: "1" })
});

