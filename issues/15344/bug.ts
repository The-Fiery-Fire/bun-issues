console.log("hi")

import readline from 'readline/promises';

const rl1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const name = await rl1.question('Enter your name: ');
console.log(`Hello, ${name}!`);
rl1.close();

const rl2 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
rl2.close();