# Current Testnet Parameters

This page is meant to be kept up to date with the information from the currently
released Testnet. Use the information here to deploy or upgrade your node on the
Testnet.

* [Genesis Document](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2020-01-23/genesis.json):
  * sha1: `bcd8eb7cee74969dd7446ec9ac43be2042164c20`
  * sha256: `5256e50102ee1f58409b162ced45e0ee8050ef6f34b24b42e1d56f5ed5941d38`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
  ::: tip NOTE
  Feel free to use other seed nodes than the one provided here.
  :::
* [Oasis Core] version:
  * [20.1.2](https://github.com/oasislabs/oasis-core/releases/tag/v20.1.2)
  ::: tip NOTE
  The `oasis-node` binary is part of the Oasis Core release.
  :::
  ::: warning WARNING
  Don't use a newer version of Oasis Core since it likely contains changes that
  are incompatible with version of Oasis Core used by other nodes in the current
  Testnet.
  :::
  ::: warning DEPRECATED
  We no longer recommend or support using Oasis Labs' provided [oasis-node
  Docker images].
  :::

[Oasis Core]: https://github.com/oasislabs/oasis-core
[oasis-node Docker images]: https://hub.docker.com/r/oasislabs/oasis-node/tags

## Upgrade Parameters

The following section details on the scheduled upgrade for the network. See the
[Handling Network Upgrades Guide](./maintenance/handling-network-upgrades.md)
for instructions on how to use these parameters.

* Block height to dump: **270000**
* Upgrade Window
  * Start: **2020-02-11T17:00:00Z**
  * End: **2020-02-12T16:59:59Z**
    * The "_End_" of the window is not something we can enforce unilaterally,
      however, if, for whatever reason, not enough people upgrade on the public
      testnet we _may_ release and redeploy a new genesis block that removes
      inactive nodes from the validator set.
* Please download the genesis document published in
  [this release](https://github.com/oasislabs/public-testnet-artifacts/releases/tag/2020-02-11)

## Deployment Change Log

### 2019-02-11 (Latest)

Instructions coming soon!

### 2019-01-23

You should only need to do an upgrade as detailed in the [Handling Network
Upgrades Guide](./maintenance/handling-network-upgrades.md).

### 2020-01-15

**`/serverdir/etc/config.yml` Required Changes**

If you've deployed before, we changed the storage backend from `boltdb` to
`badger`. See the [Joining the Testnet](./joining-the-testnet.md) Docs for the
update.

### 2019-12-17

You should only need to do an upgrade as detailed in the [Handling Network
Upgrades Guide](./maintenance/handling-network-upgrades.md).

### 2019-11-26

#### `/serverdir/etc/config.yml` Required Changes

##### Changed

Format for seed nodes has changed. Previously it only accepted a string. Now it
supports an array of strings.

Old Version:

```yaml
tendermint:
  # ... other config
  seeds: "{{ seed_node_address }}"
```

New Version:

```yaml
tendermint:
  # ... other config
  seed:
    - "{{ seed_node_address0 }}"
    - "{{ seed_node_address1 }}"
```

##### Removed

This temporary configuration on the initial deployment is no longer necessary.
These lines have been removed.

```yaml
## THESE NEXT 3 LINES ARE TEMPORARY YOU SHOULD NOT EXPOSE THIS PORT IN ANY WAY
grpc:
  debug:
    port: "42261"
```

#### Staking and Registration Changes

The CLI for creating and submitting staking and registration transactions have
changed. If you've already staked and registered your entity, then there's no
need to make any changes.

#### Docker Support

We no longer document using the Docker container for setup or deployment as we
now distribute `oasis-node` binaries. You may still use the Docker container,
and we will, for now, document the current Docker image tag for a given
deployment.

### 2019-11-13

This is the initial deployment.
