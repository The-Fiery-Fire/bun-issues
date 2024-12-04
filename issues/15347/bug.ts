
import { cpus } from "os";
console.log("start")

const iterations = 1_000_000;

const cpuCount = cpus().length;

const workPerCpu = Math.floor(iterations / cpuCount);

for (let i = 0; i < cpuCount; i++) {
    const worker = new Worker(new URL("./worker.ts", import.meta.url).href, {
        type: "module",
    });
    console.log(`Worker ${i + 1} created`);
    worker.postMessage(workPerCpu);
}