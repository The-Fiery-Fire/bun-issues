await fetch('https://192.168.99.99', { signal: AbortSignal.timeout(500) });