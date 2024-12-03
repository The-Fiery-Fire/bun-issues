// technically this doesn't need to be installed as bun patches it
//, but installing for sake of it
import { Pool } from 'undici';
import { test, expect } from "bun:test";

test("Undici Pool.request doesn't return promise when callback is not provided", async () => {

    const fn = () => {
        const apiClient = new Pool('https://example.com/', {
            keepAliveTimeout: 60000,
        });

        return apiClient
            .request({
                path: '/example',
                method: 'GET',
            })
            .then(async (response) => response.body.json())
            .catch((error) => {
                console.log(error);
            });
    }

    expect(fn).toThrowError("undefined is not an object (evaluating '");
});
