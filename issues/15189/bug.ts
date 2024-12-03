import { $ } from 'bun'
await $`echo ${Array(10000).fill('a')}`