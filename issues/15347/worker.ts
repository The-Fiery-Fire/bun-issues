declare var self: Worker;

self.onmessage = async (event) => {
    const iterations = event.data;
    await Promise.all(
        Array(iterations)
            .fill(0)
            .map(() => Bun.file("sample.txt").text())
    );
    self.postMessage(null);
};