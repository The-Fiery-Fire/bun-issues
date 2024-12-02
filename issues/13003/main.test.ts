import { it, expect } from "bun:test";
import * as dns from "dns";
import { isMacos } from "../../utils";

it("should return an actual IPv6 address for resolve6", async () => {
    const domain = "example.com";

    expect((await dns.promises.resolve6(domain))[0]).toInclude("::ffff:")
});
