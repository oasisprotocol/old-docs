# Checking Your Account nonce

If you need to submit new transactions to the network you will need to pull your
latest account nonce in order for the transaction submission to succeed. To
determine your current nonce execute the following on your testnet node:

```bash
$ oasis-node stake account info \
  --stake.account.id $ACCOUNT_ID_HEX \
  -a unix:/serverdir/node/internal.sock
```

The output will be json that look something like this (the output will be
unformatted):

```json
{
  "id": "SOMEBASE64VALUEFORYOURACCOUNT11111111111111=",
  "general_balance": "1000000000000000000",
  "escrow_balance": "0",
  "nonce": 101
}
```

The `nonce` field will contain the nonce for your account. Use this value, `101`
in this example, when generating transactions like so:

```bash
$ oasis-node stake account gen_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --entity $ENTITY_DIR_PATH \
  --stake.escrow.account $ACCOUNT_ID \
  --stake.amount 100000000000000000000 \
  --transaction.file $OUTPUT_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 101
```
