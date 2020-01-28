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

## Extracting Entity

Before we can sign anything, we need to extract the public key from the device
and using it to generate an entity. This will be later used as another check to
ensure that you are signing with the correct key. Using the address we retrieved
from the previous section, run the following:

```bash
oasis-node signer extract \
  --signer ledger \
  --signer.dir /path/to/entity \
  --signer.ledger.address oasis19hpt4y2reqwyfqcd53asjchdqf468chr673y6jn07xjp36w32jlscf0me \
  --signer.ledger.index 1
```

This will create an `entity.json` file in `/path/to/entity` that contains the
public key generated on the device associated with `--signer.ledger.address`,
derived from a path with an account index of `--signer.ledger.index`. The
`--signer ledger` flag is important here as it specifies use of a Ledger
backend.

This command must be run anytime a new account index is to be used, with a
new `/path/to/entity` provided.

## Signing Transactions

To sign transactions with the Ledger App, run the `oasis-node stake account
gen_<transaction_type>` command, and specify the `--signer ledger` flag.
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

The `--signer.ledger.address` and `--signer.ledger.index` flags should match
those provided to the command in the previous section. If the public key of
the entity in `/path/to/entity` does not match that derived by the Ledger
device, the command will fail.

The transaction fields need to be confirmed the Ledger device before signing.
