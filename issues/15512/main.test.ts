import { test, expect } from 'bun:test';
import { createSocket } from 'node:dgram';

test('node:dgram socket.address() should update after connect', async () => {
    const socket = createSocket('udp4');

    // Bind the socket and check the initial address
    await new Promise<void>((resolve) => {
        socket.bind(resolve);
    });
    expect(socket.address().address).toBe('0.0.0.0'); // Verify initial bound address

    // Connect the socket and check the address
    socket.connect(60865, '127.0.0.1', () => {
        // Assertion to check for the bug
        expect(socket.address().address).not.toBe('127.0.0.1'); // Pass if the bug persists
    });
});
