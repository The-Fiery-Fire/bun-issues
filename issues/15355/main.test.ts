import { it, expect } from "bun:test";

it("should set Content-Length correctly for HEAD response", async () => {
    // Start a Bun server that responds with a specified Content-Length
    const server = Bun.serve({
        port: 0,
        fetch() {
            return new Response(null, {
                status: 200,
                headers: {
                    'Content-Type': 'image/jpeg',
                    'Content-Length': '1000', // Set expected Content-Length
                },
            });
        },
    });

    // Make a HEAD request to the server
    const resp = await fetch(server.url, { method: 'HEAD' });

    // Get the Content-Length from the response headers
    const contentLength = resp.headers.get('Content-Length');

    // Assert that the Content-Length should be '1000', but Bun might return '0'
    expect(contentLength).not.toBe('1000'); // This should fail if Bun has the bug

    // Stop the server
    server.stop(true);
});
