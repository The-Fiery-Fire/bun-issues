console.log("a")
for await (const line of console) {console.log(line); break}
console.log("foo")
for await (const line of console) { console.log(line); break }
console.log("bar")
