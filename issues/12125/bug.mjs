import { createReadStream } from 'fs';
import { join } from 'path';
import { createInterface } from 'readline';

const fileStream = createReadStream(join(import.meta.dirname, "./testfile.txt"), { encoding: "latin1" });

const rl = createInterface({
    input: fileStream,
    crlfDelay: Infinity
});

for await (const line of rl) {
    console.log(`Line 1: ${line}`)
    break;
}

for await (const line of rl) {
    console.log(`Line 2: ${line}`)
    break;
}

for await (const line of rl) {
    console.log(`Line 3: ${line}`)
    break;
}

for await (const line of rl) {
    console.log(`Line 4: ${line}`)
    break;
}