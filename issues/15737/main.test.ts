import { it, expect } from "bun:test";
import fs from "fs";
import path from "path";
import ELK from "elkjs";

it("elkjs official example", async () => {

    const a = new Promise(resolve => {
        try {
            const elk = new ELK()

            const graph = {
                id: "root",
                layoutOptions: { 'elk.algorithm': 'layered' },
                children: [
                    { id: "n1", width: 30, height: 30 },
                    { id: "n2", width: 30, height: 30 },
                    { id: "n3", width: 30, height: 30 }
                ],
                edges: [
                    { id: "e1", sources: ["n1"], targets: ["n2"] },
                    { id: "e2", sources: ["n1"], targets: ["n3"] }
                ]
            }
            return elk.layout(graph)
        } catch (e) {
            resolve(e.message)
        }
    })

    // Fail if it actually makes file with no error
    expect(await a).toInclude("undefined is not a constructor (evaluating 'new _Worker(url)')")

});
