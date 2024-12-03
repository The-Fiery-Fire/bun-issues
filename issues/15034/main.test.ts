import net from "node:net";
import { test, expect } from "bun:test";
import util from "node:util"

test("socket.remotePort Returns Server's Listening Port Instead of Client's Port in node:net Module", async () => {
    let remotePort = 1
    const s = net.createServer((socket) => {
        remotePort = socket.remotePort!
    })
    s.listen(1234);


    await util.promisify(net.connect)(1234, "127.0.0.1").catch(() => {});

    // it shouldnt be the same port
    expect(remotePort).toBe(1234)

    s.close()
});

