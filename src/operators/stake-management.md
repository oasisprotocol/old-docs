# Stake Management

For node operators, the `oasis-node` binary offers a command line interface for
various staking token operations.

The following commands are intended to be run **online** (i.e. on the `server`):

* `oasis-node stake info` shows the token information,
* `oasis-node stake list` lists all accounts with positive balance,
* `oasis-node stake account info` shows detailed account information,
* `oasis-node consensus submit_tx` submits a pre-generated transaction given a
  filename.

In addition, the following commands generate transactions and are meant to be
run offline (i.e. on the `localhost`), because signing transactions requires a
private key which **should not be accessible** from outside in any way:

* `oasis-node stake account gen_transfer`
* `oasis-node stake account gen_burn`
* `oasis-node stake account gen_escrow`
* `oasis-node stake account gen_reclaim_escrow`

## Prerequisites

We will assume you are familiar with the previous sections of the
[Operator Docs] and have the `oasis-node` binary installed.

To run a command that requires a connection to the online Oasis node (i.e. the
`server`), you need to either:

* change the working directory to where the internal Oasis node unix socket is
  located (e.g. `/serverdir/node/`) before executing the command, or
* pass the `-a $ADDR` flag where `ADDR` represents the path to the internal
  Oasis node unix socket prefixed with `unix:` (e.g.
  `unix:/serverdir/node/internal.sock`).

We will pipe the output of commands that return JSON through [Python's
`json.tool` module][python-jsontool] to pretty-print it.

::: warning WARNING
Be aware that [jq], the popular JSON CLI tool, [converts all numbers to IEEE 754
64-bit values][jq-precision] which can result in silent loss of precision and/or
other changes.

Hence, we recommend avoiding its usage until this issue is resolved.
:::

[Operator Docs]: ./overview.md
[python-jsontool]: https://docs.python.org/3/library/json.html#module-json.tool
[jq]: http://stedolan.github.io/jq/
[jq-precision]: https://github.com/stedolan/jq/wiki/FAQ#caveats

## Common token info

To query an Oasis node for the common token info, run:

```bash
oasis-node stake info -a $ADDR
```

This will output something like:

```text
Total supply: 10000000000000000000
Common pool: 7999214452933172880
Staking threshold (entity): 100000000000
Staking threshold (validator): 100000000000
Staking threshold (compute): 100000000000
Staking threshold (storage): 100000000000
```

The numbers are listed in base units, 1 token corresponds to 10^9 (i.e. one
billion) base units.

We can observe that the total supply is 10 billion tokens and that almost 8
billion tokens are in the *common pool*.

Finally, the staking thresholds for all node kinds (entity, validator, compute,
storage) are 100 tokens.

## Account info

To list all accounts with positive balance, run:

```bash
oasis-node stake list -a $ADDR
```

This will list all accounts' IDs, e.g.:

```text
AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=
A1X90rT/WK4AOTh/dJsUlOqNDV/nXM6ZU+h+blS9pto=
BEcj10gSGUnJULd08jWfbYaMMrqT2rCnxCVrvJdgdiQ=
BNrK/6GsNTrYT/4qk7pnI6NI/gYV3t+b3KT4bixYMcY=
CVzqFIADD2Ed0khGBNf4Rvh7vSNtrL1ULTkWYQszDpc=
Ck7Z5SGgciwGD7VsPIUOejIinePljhA9DLFCE954L0g=
Cne+0Jngok/d7CEw4ho7iUK+Q729s2LSPbLtqN2PZNs=
Cyw0yR8PhT7zeekbNE+C38VWHqScS6SRCGCMHLts+zM=
C5z1jB+FHB/QgtTITr6NKWpUs9QHwD11CG3v8tmuJ0g=
DFYChJMceD8nNp6ueVUCNEpqGROg7zS7AImn74c9s6s=
DMLG+Ta/ycWQmYTIwA3kCUyXHUBwwhjvHThNTsHLyYo=
DPbZomOIleFrvcJBZPl7y/wEB1w9Q569vAbb6Krl9fE=
DPeFA5/JMSGw+kp2o3bJ2yNq5AUMkiQop+bFP5vc82M=
DVobZ8bWlOv2J6oHO0uITr5FPO5rIY2irdPNhByprHk=
DoVToHyHxlHdyt4Kp//R34xisSULeIKaWNofvVEkEPM=
D2hqhJcmZnBmhw9TodOdoFPAjmRkpRatANCNHxIDHgA=
Eg+MQjy5m+RbI9ASaXvhX2WrdIJ949I1XIwyEQU/gc4=
FATFD8gST26YTWtJ4gJnWS1xoKPw7/nQm8bBtm2aedA=

... output trimmed ...

```

To get more information about a particular account, e.g.
`+yyK5gqJb7x8xPASJZznZk8X8h0ilXuv39ctFYeHlCg=`, run:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.id +yyK5gqJb7x8xPASJZznZk8X8h0ilXuv39ctFYeHlCg= \
  | python3 -m json.tool
```

This will output all staking information about this particular account, e.g.:

```json
{
    "general": {
        "balance": "601492492765",
        "nonce": 0
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
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe that:

* Account's general balance (`general.balance`), the amount of base units that
  are available to the account owner, is a little more than 601 tokens.
* Account's nonce (`general.nonce`) is the incremental number that must be
  unique for each account's transaction. The next transaction should have nonce
  equal to `0`.

Each account can also serve as an escrow account.
Escrow accounts are used to keep the funds needed for specific consensus-layer
operations (e.g. registering and running nodes).

To simplify accounting, each escrow results in the source account being issued
shares which can be converted back into staking tokens during the reclaim escrow
operation.
Reclaiming escrow does not complete immediately, but may be subject to a
debonding period during which the tokens still remain escrowed.

We can observe that:

* The amount of tokens that are actively bounded to the escrow account (
  `escrow.active.balance`) is a little more than 11242 tokens.
* The total number of shares for the tokens actively bounded to the escrow
  account (`escrow.active.total_shares`) is 10 trillion.
* The amount of tokens that are currently debonding (`escrow.debonding.balance`)
  is 0.
* The total number of shares for the tokens that are currently debonding
  (`escrow.debonding.total_shares`) is 0.

An entity can also charge commission for tokens that are delegated to it.
The commission schedule rate steps would be defined in
`escrow.commission_schedule.rates` and the commission rate bound steps would be
defined in `escrow.commission_schedule.bounds`.

## Generating and submitting transactions

Next, we will learn how to generate and sign transactions offline (i.e. on the
`localhost`) and then submit them on the online Oasis node (i.e. the `server`).

### Base flags

All commands for generating and signing transactions need the following base
flags set:

* `--genesis.file`: Path to the genesis file on the `localhost`, e.g.
  `/localhostdir/genesis.json`.

### Signer flags

Currently, we provide two options for signing transactions:

* Ledger device.

  You will need to set it up as described in our [Ledger docs] and set the
  following flags:

  * `--signer ledger`: Specifies use of the Ledger signer.
  * `--signer.ledger.address`: The `Oasis App Address` that identifies the
    Ledger device you want to use for signing.

    ::: tip NOTE
    You can omit this flag and `oasis-node` will try to connect to any available
    Ledger device.
    :::

  * `--signer.ledger.index`: Address index used to derive address
    address on the Ledger device.
  * `--signer.dir`: Path to entity's artifacts directory on the `localhost`,
    e.g. `/localhostdir/entity/`.

* Entity's private key stored in a file.

  You will need to create your Entity as described in [Joining the Testnet][
  create-entity] docs and set the following flags:

  * `--signer file`: Specifies use of the file signer.

    ::: tip NOTE
    Currently, `file` is the default signer so you could also omit this flag.
    :::

  * `--signer.dir`: Path to entity's artifacts directory on the `localhost`,
    e.g. `/localhostdir/entity/`.

### Storing Base and Signer flags in an environment variable

To make the transaction commands shorter and avoid typing errors, one can set an
environment variable, e.g. `TX_FLAGS`, with all the [Base flags] and
[Signer flags] configured for his particular set up.

For example, one could set `TX_FLAGS` for a Ledger device like below (replacing
Ledger device address and address index appropriately):

```bash
TX_FLAGS="--genesis.file /localhostdir/genesis.json \
  --signer ledger \
  --signer.ledger.address oasis19hpt4y2reqwyfqcd53asjchdqf468chr673y6jn07xjp36w32jlscf0me \
  --signer.ledger.index 1 \
  --signer.dir /localhostdir/entity/"
```

Or, one could set `TX_FLAGS` like below to use a file signer:

```bash
TX_FLAGS="--genesis.file /localhostdir/genesis.json \
  --signer file \
  --signer.dir /localhostdir/entity/"
```

### Common transaction flags

When generating a transaction, one needs to set the following transaction flags
as appropriate for a given transaction:

* `--stake.amount`: Amount of base units to transfer, escrow, burn, etc.
* `--transaction.file`: Path to the file where to store the generated
  transaction.
* `--transaction.nonce`: Incremental number that must be unique for each
  account's transaction.

  To get your current account's nonce, see [Checking Your Account nonce] doc.

* `--transaction.fee.gas`: Maximum amount of gas (in _gas units_) a transaction
  can spend.

  Gas costs for different staking transactions are specified by the
  `staking.params.gas_costs` consensus parameter.

  To obtain its value from the genesis file, run:
  <!-- markdownlint-disable line-length -->
  ```bash
  cat /localhostdir/genesis.json | \
    python3 -c 'import sys, json; print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
  ```
  <!-- markdownlint-enable line-length -->

  ::: tip NOTE
  Currently, gas costs for transactions are set in the genesis file and cannot
  be changed.
  :::

* `--transaction.fee.amount`: Amount of base units we will pay as a fee for a
  transaction.

## Example transactions

Let's assume our entity's account is
`+yyK5gqJb7x8xPASJZznZk8X8h0ilXuv39ctFYeHlCg=` (the same that we queried for
info in the [Account info] section) and generate some concrete transactions for
it.

::: tip NOTE
If you want to follow these examples yourself, make sure you've set the
`TX_FLAGS` environment variable as described in the [Storing Base and Signer
flags in an environment variable][flags-in-env-var] section.
:::

### Querying account info

To query our entity's account info, use the following command:

```bash
oasis-node stake account info \
  -a $ADDR \
  --stake.account.id +yyK5gqJb7x8xPASJZznZk8X8h0ilXuv39ctFYeHlCg= \
  | python3 -m json.tool
```

::: tip NOTE
For a detailed explanation on querying account information, see [Account info]
section.
:::

At the beginning, this outputs:

```json
{
    "general": {
        "balance": "601492492765",
        "nonce": 0
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
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe that:

* Account's general balance is a little more than 601 tokens.
* Account's nonce is `0`.
* A little more than 11242 tokens are actively bounded to the escrow account.
* The amount of tokens that are currently debonding is 0.

### Obtaining transactions' gas costs

As explained in the [Common transaction flags] section, we can obtain gas costs
for different staking transactions from the genesis file by running:

<!-- markdownlint-disable line-length -->
```bash
cat /localhostdir/genesis.json | \
  python3 -c 'import sys, json; print(json.dumps(json.load(sys.stdin)["staking"]["params"]["gas_costs"], indent=4))'
```
<!-- markdownlint-enable line-length -->

For our network, this returns:

```json
{
    "add_escrow": 1000,
    "burn": 1000,
    "reclaim_escrow": 1000,
    "transfer": 1000
}
```

Hence, we will need to set the `--transaction.fee.gas` flag, i.e. the maximum
amount of gas a transaction can spend, in the following transactions to at least
1000 _gas units_.

### Burning tokens

Let's start with a *burn* transaction which destroys the given number of tokens.

To generate a burn transaction of 123 tokens (i.e. 123 \* 10^9 base units)
and sign it, run:

```bash
oasis-node stake account gen_burn \
  $TX_FLAGS \
  --stake.amount 123000000000 \
  --transaction.file tx_burn.json \
  --transaction.nonce 0 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1
```

To submit the generated transaction, we need to copy `tx_burn.json` to the
online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_burn.json
```

Let's [check our account's info] again:

```json
{
    "general": {
        "balance": "478492492765",
        "nonce": 1
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
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe that our account's general balance has decreased for 123 tokens
and our account's nonce increased to `1`.

::: warning

Usually, the new balance is seen immediately, but some transactions (for example
escrow reclaiming) do not take effect until after a debonding period has elapsed,
so you might need to wait a few blocks for the balances to update.

:::

### Transferring tokens

Token transfer transactions transfer tokens from the signer's account to the
given destination account.

::: tip NOTE
Token transfer are currently disabled on our Testnet.
:::

Let's choose a destination account, e.g.
`A1X90rT/WK4AOTh/dJsUlOqNDV/nXM6ZU+h+blS9pto=`, and [check its current balance][
check our account's info] (replacing our entity's ID with the destination
account's ID):

```json
{
    "general": {
        "balance": "0",
        "nonce": 1030
    },
    "escrow": {
        "active": {
            "balance": "0",
            "total_shares": "0"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe that the chosen destination account currently has general balance
of 0 tokens.

Let's generate a transfer transaction of 170 tokens, (i.e. 170 \* 10^9 base
units), from our account to the chosen destination account:

```bash
oasis-node stake account gen_transfer \
  $TX_FLAGS \
  --stake.amount 170000000000 \
  --stake.transfer.destination A1X90rT/WK4AOTh/dJsUlOqNDV/nXM6ZU+h+blS9pto= \
  --transaction.file tx_transfer.json \
  --transaction.nonce 1 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1
```

To submit the generated transaction, we need to copy `tx_transfer.json` to the
online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_transfer.json
```

Let's [check both accounts' info][check our account's info] (first ours and then
the destination's):

```json
{
    "general": {
        "balance": "308492492765",
        "nonce": 2
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
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

```json
{
    "general": {
        "balance": "170000000000",
        "nonce": 1030
    },
    "escrow": {
        "active": {
            "balance": "0",
            "total_shares": "0"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe that 170 tokens have been correctly deducted from our account and
added to the destination account.

### Escrowing tokens

In this example we will put 208 tokens (i.e. 208 \* 10^9 base units) to our own
escrow account.

First, let's generate an escrow transaction and store it to `tx_escrow.json`:

```bash
oasis-node stake account gen_escrow \
  $TX_FLAGS \
  --stake.amount 208000000000 \
  --stake.escrow.account +yyK5gqJb7x8xPASJZznZk8X8h0ilXuv39ctFYeHlCg= \
  --transaction.file tx_escrow.json \
  --transaction.nonce 2 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1
```

To submit the generated transaction, we need to copy `tx_escrow.json` to the
online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_escrow.json
```

Let's [check our account's info]:

```json
{
    "general": {
        "balance": "100492492765",
        "nonce": 3
    },
    "escrow": {
        "active": {
            "balance": "11450384816640",
            "total_shares": "10185014125910"
        },
        "debonding": {
            "balance": "0",
            "total_shares": "0"
        },
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe our general balance decreased for 208 tokens and our escrow
account's active balance increased for 208 tokens.

Take note that the total number of shares in our escrow account's active balance
increased from 10000000000000 to 10185014125910.

When a delegator delegates some amount of tokens to an entity's account,
the delegator receives the number of shares proportional to the current share
"price" (in base units) calculated from the total number of base units delegated
to an entity's account so far and the number of shares issued so far:

```text
shares_per_base_unit = entity_issued_shares / entity_delegated_base_units
```

In our case, the current share "price" (i.e. `shares_per_base_unit`) is
10000000000000 / 11242384816640 which is 0.8894909899542729.

For 208 tokens, the amount of newly issued shares is thus 208 \* 10^9 \*
0.8894909899542729 which is 185014125910.48877 (rounded to 185014125910).

### Reclaiming escrowed tokens

When we want to reclaim escrowed tokens, we can't do that directly. Instead, we
need to specify the number of shares we want to reclaim from an escrow account.

For example, to reclaim 357 billion shares from an escrow account, we need to
generate the following reclaim escrow transaction:

```bash
oasis-node stake account gen_reclaim_escrow \
  $TX_FLAGS \
  --stake.amount 357000000000 \
  --stake.escrow.account +yyK5gqJb7x8xPASJZznZk8X8h0ilXuv39ctFYeHlCg= \
  --transaction.file tx_reclaim.json \
  --transaction.nonce 3 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1
```

::: warning NOTE
Although the `gen_reclaim_escrow` subcommand currently uses the
`--stake.amount` flag whose help states that it specifies the amount of tokens
for the transaction, it actually specifies the amount of shares to reclaim from
an escrow.

We plan to fix this misleading use of `--stake.amount` flag in near future.
For more details, see [Oasis Core #2690](
https://github.com/oasislabs/oasis-core/issues/2690).
:::

To submit the generated transaction, we need to copy `tx_reclaim.json` to the
online Oasis node (i.e. the `server`) and submit it from there:

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_reclaim.json
```

Let's [check our account's info]:

```json
{
    "general": {
        "balance": "100492492764",
        "nonce": 4
    },
    "escrow": {
        "active": {
            "balance": "11049031678686",
            "total_shares": "9828014125910"
        },
        "debonding": {
            "balance": "401353137954",
            "total_shares": "401353137954"
        },
        "commission_schedule": {
            "rates": null,
            "bounds": null
        }
    }
}
```

We can observe that:

* our escrow account's active number of shares decreased for 357 billion shares
  to 9828014125910,
* our escrow account's active balance decreased for 401353137954 base units and
  is now 11049031678686 base units,
* our escrow account's debonding balance increased to 401353137954 base units
  and its number of shares to the same amount.

When a delegator wants to reclaim a certain number of escrowed tokens, the
base unit "price" (in shares) must be calculated based on the entity's escrow
account's current active balance and the number of issued shares:

```text
base_units_per_share = entity_delegated_base_units / entity_issued_shares
```

In our case, the current base unit "price" (i.e. `base_units_per_share`) is
11450384816640 / 10185014125910 which is 1.124238481664054 base unit per share.

For 357 billion shares, the amount of base units that will be reclaimed is thus
357 \* 10^9 \* 1.124238481664054 which is 401353137954.06726 (rounded to
401353137954).

Hence, the escrow account's active balance decreased for 401353137954 base units
and the debonding balance increased for the same amount.

::: warning NOTE
While the number of debonding shares currently equals the number of base units
that are currently subject to debonding and hence, the amount of tokens we can
except to reclaim after debonding period is over is a little over 401 tokens,
there is no guarantee that this stays the same until the end of the debonding
period since any slashing could change shares' price.
:::

The debonding period is specified by the `staking.params.debonding_interval`
consensus parameter and is represented as a number of epochs that need to pass.

To obtain its value from the genesis file, run:

<!-- markdownlint-disable line-length -->
```bash
cat /localhostdir/genesis.json | \
  python3 -c 'import sys, json; print(json.load(sys.stdin)["staking"]["params"]["debonding_interval"])'
```
<!-- markdownlint-enable line-length -->

For our example network, this returns:

```text
10
```

After the debonding period has passed, the network will automatically move our
escrow account's active debonding balance into our escrow account's active
balance.

### Amending a commission schedule

We can configure our account to take a commission on staking rewards given to
our node(s).
The commission rate must be within bounds, which we can also configure.

Let's generate a transaction to:

* tell everyone that our bounds allow us to set any rate (0% - 100%), and
* we'll take 50%.

We're not allowed to change the commission bounds too close in near future, so
we'd have to make changes a number of epochs in the future.
Here we're setting a bound to start on epoch 16.
An account's default bounds are 0% maximum, so we have to wait until our new
bounds go into effect to raise our rate to 50%.
Because of that, we'll specify that our rate also starts on epoch 16.

```bash
oasis-node stake account gen_amend_commission_schedule \
  $TX_FLAGS \
  --stake.commission_schedule.bounds 16/0/100000 \
  --stake.commission_schedule.rates 16/50000 \
  --transaction.file tx_amend_commission_schedule.json \
  --transaction.nonce 4 \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1
```

```bash
oasis-node consensus submit_tx \
  -a $ADDR \
  --transaction.file tx_amend_commission_schedule.json
```

After that, we can [check our account's info], and we should see something like
this:

```json
{
    "general": {
        ...
        "nonce": 5
    },
    "escrow": {
        ...
        "commission_schedule": {
            "rates": [
                "start": 16,
                "rate": "50000",
            ],
            "bounds": [
                "start": 16,
                "rate_min": "0",
                "rate_max": "100000"
            ]
        }
    }
}
```

To troubleshoot an amendment that's rejected, consult our [compendium of 23
common ways for a commission schedule amendment to fail][compendium].


[Ledger docs]: ../hsm/ledger.md
[create-entity]: joining-the-testnet.md#creating-your-entity
[Base flags]: #base-flags
[Signer flags]: #signer-flags
[Checking Your Account nonce]: maintenance/checking-account-nonce.md
[flags-in-env-var]: #storing-base-and-signer-flags-in-an-environment-variable
[Common transaction flags]: #common-transaction-flags
[Account info]: #account-info
[check our account's info]: #querying-account-info
[compendium]: https://github.com/oasislabs/oasis-core/blob/0dee03d75b3e8cfb36293fbf8ecaaec6f45dd3a5/go/staking/api/commission_test.go#L61-L610
