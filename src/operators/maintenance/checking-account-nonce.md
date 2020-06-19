# Checking Your Staking Account's nonce

If you need to submit new transactions to the network you will need to know your
staking account's latest nonce in order for the transaction submission to
succeed.

Nonce is the incremental number that must be unique for each transaction from an
account.

To determine the nonce for your account's next transaction, execute the
following on your online Oasis node (i.e. the `server`):

```bash
oasis-node stake account info \
  --stake.account.address <YOUR-ACCOUNT-ADDRESS> \
  -a unix:/serverdir/node/internal.sock \
  | python3 -m json.tool
```

replacing `<YOUR-ACCOUNT-ADDRESS>` with your account's address and changing the
path to internal Oasis node unix socket passed via the `-a` flag (if needed).

This will output something like the following:

```json
{
    "general": {
        "balance": "120984908314",
        "nonce": 42
    },
    "escrow": {
        "active": {
            "balance": "11242384816640",
            "total_shares": "10000000000000"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        ...
    }
}
```

The nonce for the next transaction is contained in the `general.nonce` field.

::: tip NOTE

If the `general.nonce` field is omitted in your `oasis stake account info`
command's output, it means there haven't been any transactions made with your
account as the source yet.

Therefore, the next transaction should have nonce equal to `0`.
:::

Use its value (e.g. `42`) when generating your next transaction (e.g.
`gen_escrow`) by passing it as the `--transaction.nonce` flag:

```bash
oasis-node stake account gen_escrow \
  ... other flags ... \
  --transaction.nonce 42 \
  ... other flags ...
```

For concrete examples of generating transactions, see [Example transactions] in
the [Stake Management docs].

[Example transactions]: ../stake-management.md#example-transactions
[Stake Management docs]: ../stake-management.md
