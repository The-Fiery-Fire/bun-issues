import { it, expect } from "bun:test";
import * as dns from "dns";
import { isMacos, isWindows } from "../../utils";

it.if(isMacos)("should return an actual IPv6 address for resolve6", async () => {
    const domain = "example.com";

    // on macos it gives ipv4 type ipv6 if host doesnt have ipv6
    expect((await dns.promises.resolve6(domain))[0]).toInclude("::ffff:")
});

it.if(isWindows)("should return an actual IPv6 address for resolve6", async () => {
    const domain = "example.com";

    // on windows it crashes if host doesnt have ipv6
    expect(() => dns.promises.resolve6(domain)).toThrowError('Domain name not found')
});

// it("[bonus] should fetch ipv6", async () => {
//     const res = await fetch('https://ipv6.google.com')

//     expect(res.ok).toBeTrue()
// });
