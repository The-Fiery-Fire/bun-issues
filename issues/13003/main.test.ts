import { it, expect } from "bun:test";
import * as dns from "dns";
import { isMacos } from "../../utils";

it.if(isMacos)("should return an actual IPv6 address for resolve6", async () => {
    const domain = "example.com";

    expect((await dns.promises.resolve6(domain))[0]).toInclude("::ffff:")
});
it("[bonus] should fetch ipv6", async () => {
    const res = await fetch('https://ipv6.google.com')

    expect(res.ok).toBeTrue()
});
