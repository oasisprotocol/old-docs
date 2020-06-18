# Current Testnet Parameters

This page is meant to be kept up to date with the information from the currently
released Testnet. Use the information here to deploy or upgrade your node on the
Testnet.

* [Genesis Document](https://github.com/oasisprotocol/public-testnet-artifacts/releases/download/2020-06-18/genesis.json)
  * sha1: `f4cd7f02becadddd70c9e954d2a90dde7a924ef8`
  * sha256: `bfe72b66b8a2acf82e855978c30fe40372d23e1efb3648fe2aba99868be1ad2a`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
  ::: warning WARNING
  This seed address may change at the time of deployment. Please follow along
  the progress on the [#nodeoperators] slack channel
  :::
  ::: tip NOTE
  Feel free to use other seed nodes than the one provided here.
  :::
* [Oasis Core] version:
  * [20.8]
  ::: tip NOTE
  The `oasis-node` binary is part of the Oasis Core release.
  :::
  ::: warning WARNING
  Don't use a newer version of Oasis Core since it likely contains changes that
  are incompatible with version of Oasis Core used by other nodes in the current
  Testnet.
  :::

[Oasis Core]: https://github.com/oasisprotocol/oasis-core
[20.8]: https://github.com/oasisprotocol/oasis-core/releases/tag/v20.8

## Deployment Change Log

### 2020-06-18 (Upcoming)

The [Amber Network] starts at 2020-06-18T16:00:00Z.

#### Upgrade Procedure

If you were on the quest no major changes configuration are required. However,
we _may_ change the seed node address. Please stay posted on the
[#nodeoperators] slack channel.

1. Download and verify the genesis document published in the [2020-06-18 release].
2. Stop your node.
3. [Wipe Node State].
4. Upgrade `oasis-node` to version [20.8].
5. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades] guide.

:::tip NOTE
Two `oasis-core` releases have occurred since the end of The Quest. If you are
doing anything that isn't part of the normal documentation and you see it
failing, please check the [20.8 Changelog] and [20.7 Changelog].
:::

[2020-06-18 release]: https://github.com/oasisprotocol/public-testnet-artifacts/releases/tag/2020-06-18
[20.8]: https://github.com/oasisprotocol/oasis-core/releases/tag/v20.8
[20.8 Changelog]: https://github.com/oasisprotocol/oasis-core/blob/v20.8/CHANGELOG.md#208-2020-06-16
[20.7 Changelog]: https://github.com/oasisprotocol/oasis-core/blob/v20.8/CHANGELOG.md#207-2020-06-08
[Amber Network]: ./amber-network.md

### 2020-05-11

* Block height when network stops: **353000**
* Upgrade Window:
  * Start: **2020-05-11T16:00:00Z**
  * End: **2020-05-12T15:59:59Z**
    * As with previous deploys, the "_End_" of the window is not something we
      can enforce unilaterally, however, if, for whatever reason, not enough
      people upgrade on the public testnet we _may_ release and redeploy a new
      genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure

1. (Optional) Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-05-11 release].
3. Stop your node.
4. [Wipe Node State].
5. Upgrade `oasis-node` to version [20.6].
6. If you have been using the prometheus metrics on `oasis-node`, these options
   have changed. Please see the [20.6 Changelog] and update your configuration.
7. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades] guide.

[2020-05-11 release]: https://github.com/oasislabs/public-testnet-artifacts/releases/tag/2020-05-11
[20.6]: https://github.com/oasislabs/oasis-core/releases/tag/v20.6
[20.6 Changelog]: https://github.com/oasislabs/oasis-core/blob/v20.6/CHANGELOG.md#206-2020-05-07

### 2020-04-16

#### Upgrade Parameters

* Block height when network stops: **591600**
* Upgrade Window:
  * Start: **2020-04-16T16:00:00Z**
  * End: **2020-04-17T15:59:59Z**
    * As with previous deploys, the "_End_" of the window is not something we
      can enforce unilaterally, however, if, for whatever reason, not enough
      people upgrade on the public testnet we _may_ release and redeploy a new
      genesis block that removes inactive nodes from the validator set.

#### Upgrade Procedure

1. (Optional) Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-04-16 release].
3. Stop your node.
4. [Wipe Node State].
5. Upgrade `oasis-node` to version [20.5].
6. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades] guide.

[2020-04-16 release]: https://github.com/oasislabs/public-testnet-artifacts/releases/tag/2020-04-16
[20.5]: https://github.com/oasislabs/oasis-core/releases/tag/v20.5

### 2020-03-05

#### Upgrade Parameters

* Block height to dump: **335400**
* Upgrade Window
  * Start: **2020-03-05T17:00:00Z**
  * End: **2020-03-06T16:59:59Z**
    * The "_End_" of the window is not something we can enforce unilaterally,
      however, if, for whatever reason, not enough people upgrade on the public
      testnet we _may_ release and redeploy a new genesis block that removes
      inactive nodes from the validator set.

#### Upgrade Procedure

1. Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-03-05 release].
3. Stop your node.
4. [Wipe Node State].
5. Upgrade `oasis-node` to version [20.4.1].
6. Start your node.

For a more in-depth explanation, see [Handling Network Upgrades] guide.

[2020-03-05 release]: https://github.com/oasislabs/public-testnet-artifacts/releases/tag/2020-03-05
[20.4.1]: https://github.com/oasislabs/oasis-core/releases/tag/v20.4.1

### 2020-02-11

#### Upgrade Parameters

* Block height to dump: **270000**
* Upgrade Window
  * Start: **2020-02-11T17:00:00Z**
  * End: **2020-02-12T16:59:59Z**
    * The "_End_" of the window is not something we can enforce unilaterally,
      however, if, for whatever reason, not enough people upgrade on the public
      testnet we _may_ release and redeploy a new genesis block that removes
      inactive nodes from the validator set.

#### Upgrade Procedure

1. Dump network state at the specified block height.
2. Download and verify the genesis document published in the [2020-02-11 release].
3. Stop your node.
4. [Wipe Node State].
5. Delete `/serverdir/node/tls_identity.pem` and
   `/serverdir/node/tls_identity_cert.pem`.
    * The format for the TLS keys have changed. This will be regenerated on
      restart.
6. Update your `/serverdir/etc/config.yml` per the below instructions.
7. Upgrade `oasis-node` to version [20.3.1].
8. Start your node.

[2020-02-11 release]: https://github.com/oasislabs/public-testnet-artifacts/releases/tag/2020-02-11
[20.3.1]: https://github.com/oasislabs/oasis-core/releases/tag/v20.3.1

#### `/serverdir/etc/config.yml` Required Changes

##### Changed

The `tendermint.seed` field has moved to `tendermint.p2p.seed`

Old Version:

```yaml
tendermint:
  # ... other config
  seed:
    - "{{ seed_node_address }}"
```

New Version:

```yaml
tendermint:
  # ... other config
  p2p:
    seed:
      - "{{ seed_node_address }}"
```

### 2020-01-23

You should only need to do an upgrade as detailed in the [Handling Network
Upgrades] guide.

### 2020-01-15

**`/serverdir/etc/config.yml` Required Changes**

If you've deployed before, we changed the storage backend from `boltdb` to
`badger`.

### 2019-12-17

You should only need to do an upgrade as detailed in the [Handling Network
Upgrades] guide.

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

[#nodeoperators]: https://oasiscommunity.slack.com/archives/CMUSJCRFA
[Wipe Node State]: ./maintenance/wiping-node-state.md#state-wipe-and-keep-node-identity
[Handling Network Upgrades]: ./maintenance/handling-network-upgrades.md
