# Handling Network Upgrades

***NOTE: From 19:00 UTC Tuesday, December 17 (2019-12-17T19:00:00Z) to 18:59 UTC
Wednesday, December 18 (2019-12-18T18:59:59Z) the Oasis Testnet will run through
its first coordinated upgrade. Steps on how to upgrade your node during this
window are below.***

::: warning WARNING
Following this guide when there is no network upgrade will result in you
losing your place on the current network.
:::

The following guide should be used when the network has agreed to do a software
upgrade.

## Dumping Blockchain State

::: tip NOTE
Do not stop your `oasis-node` process just yet.
:::

Before an upgrade we will update the [Upgrade Parameters] to specify the block
height at which to dump.

::: warning WARNING
You must only run the following command _after_ the `HEIGHT_TO_DUMP` block
height has been reached on the network.
:::

```bash
HEIGHT_TO_DUMP=<height_to_dump>
oasis-node genesis dump \
  -a unix:/serverdir/node/internal.sock \
  --genesis.file /serverdir/etc/upgrade-dump.json \
  --height $HEIGHT_TO_DUMP
```

## Stopping Your Node

This will depend on your process manager. You should kill your `oasis-node`
process however this is done for your setup.

## Patching Dumped State

We will provide a state patch in the [Upgrade Parameters] document that you
can apply using the `jq` tool. We suggest that you install this on your server
so that you can do all the upgrade process without having to transfer anything
onto your local machine. The patched state will update at least the following
fields:

* `chain_id` - This is the chain ID of the network
* `genesis_time` - We will set this so that the genesis time is consistent
  across all genesis.json files
* `halt_epoch` - This is the epoch that the node will stop functioning. We set
  this to intentionally force an upgrade.

### Downloading the Patch

```bash
PATCH_URL=<url_to_patch>
curl --proto '=https' --tlsv1.2 -sSL $PATCH_URL -o /serverdir/etc/patch.json
```

### Applying the Patch

::: warning NOTICE
There used to be instructions here to upgrade using `jq`. However, since JQ has
a [bug](https://github.com/stedolan/jq/issues/369) where it does not handle very
large integers correctly, this method no longer works. We will be posting
instructions about how to patch the genesis document during upgrades until we
have a better solution.
:::

## Wiping State

::: warning WARNING
We do not suggest that you wipe _all_ state. You might lose node identities and
keys if you do it this way.
:::

Before restarting your node you should wipe tendermint state. The process for
this is described [here](./wiping-node-state.md#state-wipe-and-keep-node-identity).

## Upgrading Oasis Core

Before starting your node again, make sure you upgrade your `oasis-node` binary
to the current version specified in the [Current Testnet Parameters].

## Restarting the Node

This will depend on your process manager. If you don't have a process manager
you should use one. However, to start the node without a process manager you can
start the `oasis-node` like so:

```bash
oasis-node --config /serverdir/etc/config.yml
```

## Cleaning Up

After you're comfortable with your node deployment you should clean up the
`upgrade-dump.json` file. This isn't strictly required, but it is good to keep
your workspace free of unnecessary files.

```bash
rm /serverdir/etc/upgrade-dump.json
```

[Upgrade Parameters]: ./../current-testnet-parameters.md#upgrade-parameters
[Current Testnet Parameters]: ./../current-testnet-parameters.md
