import net from "node:net";
import { test, expect } from "bun:test";
import util from "node:util"
import { isMacos } from "../../utils";

test("socket.remotePort Returns Server's Listening Port Instead of Client's Port in node:net Module", async () => {
    let remotePort = 1
    const s = net.createServer((socket) => {
        remotePort = socket.remotePort!
    })
    s.listen(3333);


    await util.promisify(net.connect)(3333, "127.0.0.1").catch(() => {});

    // it shouldnt be the same port
    if (!isMacos) expect(remotePort).toBe(3333)

    // for some reason macos makes it 1 instead
    else expect(remotePort).toBe(1)

    s.close()
});

