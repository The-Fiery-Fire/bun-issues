import { timingSafeEqual } from 'crypto'

console.log(
    timingSafeEqual(
        Buffer.from('abc'),
        Buffer.from('abc')
    )
)