import net from 'node:net'

const signal = AbortSignal.timeout(500)
const socket = net.createConnection({
    host: 'example.com',
    port: 999,
    signal: signal
})

socket.on('connect', function () {
    socket.end()
})

socket.on('error', function (error) {
    console.log('error', error)
})

socket.on('timeout', function () {
    socket.end()
})