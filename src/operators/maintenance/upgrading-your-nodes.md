# Handling Network Upgrades

::: warning WARNING
Following this guide when there is no network upgrade will result in you
losing your place on the current network.
:::

The following guide should be used when the network has agreed to do a software
upgrade for the network.

## Dumping Blockchain State

::: tip NOTE
Do not stop your `oasis-node` process just yet.
:::

Before an upgrade we will update the [Upgrade
Parameters](./current-testnet-parameters.md#upgrade-parameters) to specify the
block height at which to dump.

```bash
export HEIGHT_TO_DUMP=<height_to_dump>
oasis-node genesis dump \
  -a unix:/serverdir/node/internal.sock \
  --genesis.file /serverdir/etc/upgrade-dump.json \
  --height $HEIGHT_TO_DUMP
```

## Stopping Your Node

This will depend on your process manager. You should kill your `oasis-node`
process however this is done for your setup.

## Patching Dumped State

We will provide a state patch [here](../current-testnet-parameters.md) that you
can apply using the `jq` tool. We suggest that you install this on your server
so that you can do all the upgrade process without having to transfer anything
onto your local machine. The patched state will update at least the following
fields:

* `

### Downloading the Patch

```bash
export PATCH_URL=<url_to_patch>
curl -o /serverdir/etc/patch.json $PATCH_URL
```

### Applying the Patch

```bash
jq --slurp --sort-keys --compact-output '.[0] * .[1]' \
  /serverdir/etc/upgrade-dump.json \
  /serverdir/etc/patch.json > /serverdir/etc/genesis.json
```

## Wiping State

::: warning WARNING
We do not suggest that you wipe _all_ state. You might lose node identities and
keys if you do it this way.
:::

Before restarting your node you should wipe tendermint state. The process for
this is described [here](./wiping-node-state.md#state-wipe-and-keep-node-identity).

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
