import { it, expect } from "bun:test";

// process.env.BUN_CONFIG_VERBOSE_FETCH = 1

it("should always set Content-Type header for FormData requests", async () => {
    // Create a FormData object
    const fd = new FormData();
    fd.append("file", new Blob(["sample content"]), "sample.txt");

    // Create a custom server
    const server = Bun.serve({
        port: 0, // Let the OS choose the port dynamically
        fetch(req) {
            // just relay input lol
            return new Response(req.body, req)
        },
    });

    class CustomRequest extends Request { }
    // Create a request using FormData
    const requestInit = {
        method: 'POST',
        body: fd,
    };

    const request = new CustomRequest(server.url, requestInit);
    // console.log(request)  

    // Perform the fetch request
    const resp = await fetch(request);
    // console.log(resp)

    // once these tests to fail, the issue is fixed
    expect(resp.headers.get("content-type")).not.toInclude("multipart/form-data; b")
    expect(resp.headers.get("content-type")).toBeNull()

    // Stop the server after the test
    server.stop();
});
