# Ledger Support

Ledger is one of the HSM platforms that Oasis supports for Mainnet Launch.

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites
Guide](./prerequisites.md) to install the `oasis-node` binary.

## Installation

To use with the Ledger App, install the Ledger application from
the Ledger Live Manager. You will have to set developer mode to 'on' in order
to find it.

::: warning NOTE
The Oasis Ledger App will not be available for download until after it has been
approved be Ledger.
:::

Once installed, the application will use the generated mnemonic stored on the
device to generate the keys.

## Interacting with Ledger App

To interact with the Ledger App, use the `oasis-node` binary like so:

To identify your device, unlock your device and make sure that you have the
Oasis App open. Run the following command to identify your device by generated
address:

```bash
oasis-node signer ledger list_devices
```

If your device is properly connected, you should see an output like so:

```bash
============ Device found
Oasis App Version : 302e31322e33
Oasis App Address : oasis19hpt4y2reqwyfqcd53asjchdqf468chr673y6jn07xjp36w32jlscf0me
```

From now on, we will use the `Oasis App Address` to identify the Ledger device
we want to use for signing.

## Signing Transactions

To sign transactions with the Ledger App, run the `oasis-node stake account
gen_<transaction_type>` command, and specify the `--signer ledger` and
`--signer.ledger.address <oasis_app_address>` flags. The
`--signer.ledger.index` flag can be specified for an alternate account index.
For example:

```bash
oasis-node stake account gen_burn \
  --signer.dir /path/to/entity \
  --signer ledger \
  --signer.ledger.address oasis19hpt4y2reqwyfqcd53asjchdqf468chr673y6jn07xjp36w32jlscf0me \
  --signer.ledger.index 1 \
  --genesis.file $GENESIS_PATH \
  --transaction.fee.amount 1 \
  --transaction.fee.gas 1000 \
  --transaction.file burn.tx
```
[//]: <> (TODO: Replace this section with one detailing how to extract the entity from the Ledger device, after the tooling is added.)
::: note Note
The `--signer.dir` flag is still necessary for the command to run, but it is
not used. The specified directory must contain a valid `entity.json` file. For now,
use this dummy entity.json:

{"id":"AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA=","nodes":null,"allow_entity_signed_nodes":false}

:::

The transaction fields can be viewed from the Ledger device before confirming.
