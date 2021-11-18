# Blockchain Key Manager
You can store EOA to filesystem and load it with this library.

## File Example
You must use `$HOME/.blockchain/eoa`.

```
[solana]
address=0xeE6ssfVxdfh57itg6jk5jrU5ykTDIgabnHki76ER
private_key=0xYb7z9fO867T2f60M6R7T5uy6f43h6h79U7I34Y2p3m3w6rer2g51ghedrhRRED3g

[dev-bsc]
address=0xe5jrU5yssfVxdfh5kTDE67itg6jkIgabnHki76ER
private_key=0x6f43h6h79U77T2f60M6R7TI34Yb7z9fO865uyY2p3m3w6rer2g51ghedrhRRED3g

[com-klaytn]
address=0xjrU5yenHki76sERE67itg6jk5sfVxdfh5kTDIgab
private_key=0x3m3w6rer2g51ghed5uy6f436R7TI34Y2ph6h79U77T2f60MrYb7z9fO86hRRED3g
```

## Usage
```typescript
const keyManager = require('blockchain-key-manager');

const address = keyManager.getAddress('dev-bsc');
const privateKey = keyManager.getPrivateKey('dev-bsc');

const { alias, address, privateKey } = keyManager.getEoa('dev-klaytn');
```
