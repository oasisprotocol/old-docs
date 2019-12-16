# Stake Management

For node operators the `oasis-node` binary offers a command line interface for
various staking token operations.

The following commands are intended to be run **online**:

* `oasis-node stake info` shows the token information,
* `oasis-node stake list` lists all accounts with positive balance,
* `oasis-node stake account info` shows detailed account information,
* `oasis-node stake account submit` submits a pregenerated transaction given a
filename.

In addition, the following commands generate transactions and are meant to be
run offline, because signing transactions requires a private key which **should
not be accessible** from outside in any way:

* `oasis-node stake account gen_transfer`
* `oasis-node stake account gen_burn`
* `oasis-node stake account gen_escrow`
* `oasis-node stake account gen_reclaim_escrow`

## Staking basics

We will assume you followed previous node operators sections so you have `oasis-node`
binary available, a genesis file location stored in an environmental variable `$GENESIS_FILE_PATH`,
and the private keypair of your entity in a directory `$ENTITY_DIR_PATH`.
Additionally, we will use `$ADDR` containing the location of the internal socket,
of the Oasis node, for example

```bash
export ADDR=unix:/tmp/oasis-net-runner236357163/net-runner/network/client-0/internal.sock
```

We will provide the `-a $ADDR` parameter to any operation which requires
connection to the Oasis node. Conversely, `--genesis.file $GENESIS_FILE_PATH`
and `--signer.dir $ENTITY_DIR_PATH` will be used for offline operations.

The `--signer` flag is used to determine the backend used to sign transactions for offline
operations. 
- For a file based signer, use `--signer file` and include the keys in `$ENTITY_DIR_PATH`. This is
set by default, but is included in all examples to be explicit.
- For a Ledger based signer, use `--signer ledger` to indicate the use of a Ledger device,
`--signer.ledger.address` to specify the device by address, and `--signer.ledger.index` to specify
the address index for the derivation path.

First, let's check out the native token of our platform:

```bash
$ oasis-node stake info -a $ADDR
Name: "Buffycoin"
Symbol: "BUF"
Total supply: 200000000000
Common pool: 0
Staking threshold (entity): 0
Staking threshold (validator): 0
Staking threshold (compute): 0
Staking threshold (storage): 0
```

There is a native token named `Buffycoin` with symbol `BUF` with total supply of
200 billion. All tokens are allocated in their respective accounts and no tokens
are in the *common pool*. Finally we see no staking thresholds for any node kind
(entity, validator, compute, storage).

Let's list all accounts with positive balance:

```bash
$ oasis-node stake list -a $ADDR
4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35
```

There exists one such account `4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35`.
For more information about the account, run:

```bash
$ oasis-node stake account info \
    -a $ADDR \
    --stake.account.id 4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35
{"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"100000000000","escrow_balance":"100000000000","nonce":0}
```

We notice that:

* `id` stores the Base64-encoded address of the account.
* `general_balance` is the number of tokens which can be spent by a transfer
  transaction signed by the account's private key.
* Each account can also serve as an escrow. `escrow_balance` is the number of
  tokens this account contains as an escrow and which can be reclaimed by the
  depositor. In our environment, both balances have 100 billion tokens.
* Any outgoing transaction from the account must have an incremental `nonce`. In
  our case, the next outgoing transaction of the account should have `nonce: 0`.

## Example: Burning tokens

Next, we will generate and sign our first transaction. Let's start with a *burn*
transaction, which destroys the given number of tokens. To generate a
burn transaction of 2000 tokens, sign and store the transaction to file `b.json`,
type:

```bash
oasis-node stake account gen_burn \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.transaction.amount 2000 \
  --stake.transaction.file b.json \
  --stake.transaction.nonce 0 \
  --stake.transaction.fee.gas 1000 \
  --stake.transaction.fee.amount 1
```

We used the following parameters:

* `--stake.transaction.amount` specifying the number of tokens,
* `--stake.transaction.file` the output filename of the transaction stored in
JSON format,
* `--stake.transaction.nonce` the incremental nonce. Since this is our first
transaction which changes the account balance, `nonce` equals `0`,
* `--stake.transaction.fee.gas` is the maximum amount of gas we allow this
  transaction to spend,
* `--stake.transaction.fee.amount` is the fee in tokens we will pay for this
  transaction.

The above generation and signing of the transaction can be done offline.

To submit our transaction, we need to copy `b.json` to a location accessible by
the online Oasis node (e.g. via ssh) and run on the server:

```bash
oasis-node stake account submit \
  -a $ADDR \
  --stake.account.id 4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
  --stake.transaction.file b.json
```

Beside the node's address, the submit operation above requires:

* `--stake.transaction.file` is the input filename of the transaction,
* `--stake.account.id` is the staking account which pays the transaction fee and
serves as an escrow.

Finally, let's check the new balance of the account:

```bash
$ oasis-node stake account info \
    -a $ADDR \
    --stake.account.id 4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35
{"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"99999998000","escrow_balance":"100000000000","nonce":0}
```

Notice that `2000` tokens have been correctly deducted from the `general_balance`.

::: warning

Usually, the new balance is seen immediately, but some transactions (for example
escrow reclaiming) do not take effect until after a debonding period has elapsed,
so you might need to wait a few blocks for the balances to update.

:::

## Example: Transferring tokens

Token transfer transactions transfer tokens from the signer's account to the
given destination account. Let's generate a transfer transaction of 1000 tokens
to account `5ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35`:

```bash
oasis-node stake account gen_transfer \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.transaction.amount 1000 \
  --stake.transaction.file t.json \
  --stake.transaction.nonce 1 \
  --stake.transfer.destination 5ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
  --stake.transaction.fee.gas 1000 \
  --stake.transaction.fee.amount 1
```

We used similar parameters to the ones used for generating the burn transaction:

* `--stake.transaction.amount` is the number of tokens to transfer,
* `--stake.transaction.file` is the output filename,
* `--stake.transaction.nonce` is the incremental nonce. In our case, this is the
second transaction on the account, thus `nonce` equals `1`,
* `--stake.transfer.destination` is a hex-encoded address of the receiving
account of tokens.

Let's submit the transaction stored in `t.json`:

```bash
oasis-node stake account submit \
  -a $ADDR \
  --stake.account.id 4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
  --stake.transaction.file t.json
```

Finally let's list all the accounts and their balances by adding `-v` flag for
increased verbosity:

```bash
$ oasis-node stake list -a $ADDR -v
{"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"99999997000","escrow_balance":"100000000000","nonce":2}
{"id":"XqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"1000","escrow_balance":"0","nonce":0}
```

Notice another 1000 tokens have been deducted from the first account and
transferred to the second one.

## Example: Escrowing tokens and reclaiming them

In the third example we will put 3000 tokens to an escrow account
`6ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35` and then
reclaim them. First, let's generate an escrow transaction and store it to `e.json`:

```bash
oasis-node stake account gen_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.transaction.amount 3000 \
  --stake.transaction.file e.json \
  --stake.transaction.nonce 2 \
  --stake.escrow.account 6ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
  --stake.transaction.fee.gas 1000 \
  --stake.transaction.fee.amount 1
```

Let's submit the escrow transaction and list the accounts:

```bash
$ oasis-node stake account submit \
    -a $ADDR \
    --stake.account.id 4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
    --stake.transaction.file e.json
$ oasis-node stake list -a $ADDR -v
{"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"99999994000","escrow_balance":"100000000000","nonce":3}
{"id":"XqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"1000","escrow_balance":"0","nonce":0}
{"id":"bqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"0","escrow_balance":"3000","nonce":0}
```

Notice 3000 tokens have been deducted from the first account's `general_balance`
and added to an `escrow_balance` of the third account.

We reclaim 3000 escrowed tokens by generating the reclaim escrow transaction:

```bash
oasis-node stake account gen_reclaim_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.transaction.amount 3000 \
  --stake.transaction.file r.json \
  --stake.transaction.nonce 3 \
  --stake.escrow.account 6ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
  --stake.transaction.fee.gas 1000 \
  --stake.transaction.fee.amount 1
```

Let's submit it and in a few moments list the accounts:

```bash
$ oasis-node stake account submit \
    -a $ADDR \
    --stake.account.id 4ea5328f943ef6f66daaed74cb0e99c3b1c45f76307b425003dbc7cb3638ed35 \
    --stake.transaction.file r.json
$ oasis-node stake list -a $ADDR -v
{"id":"TqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"99999997000","escrow_balance":"100000000000","nonce":4}
{"id":"XqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"1000","escrow_balance":"0","nonce":0}
{"id":"bqUyj5Q+9vZtqu10yw6Zw7HEX3Ywe0JQA9vHyzY47TU=","general_balance":"0","escrow_balance":"0","nonce":0}
 ```

Notice 3000 tokens have been reclaimed by the first account from the third
account's `escrow_balance`. The `general_balance` of the first account was
correctly updated and the `escrow_balance` of the third account is now empty.
