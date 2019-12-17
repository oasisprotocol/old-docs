# Current Testnet Parameters

This page is meant to be kept up to date with the information from the currently
released Testnet. Use the information here to deploy or upgrade your node on the
Testnet.

***From 19:00 UTC Tuesday, December 17 (2019-12-17T19:00:00Z) to 18:59 UTC
Wednesday, December 18 (2019-12-18T18:59:59Z) the Oasis Testnet will run through
its first coordinated upgrade. Parameters for this network upgrade are below.***

::: tip NOTE
As the release management of our open source repositories improves, we will
refer to more human-friendly versions of Oasis Core (and related built
artifacts) in this document.
:::

::: tip NOTE
If you're upgrading your node you should use the [Upgrade
Parameters](#upgrade-parameters) section.
:::

* [Genesis Document](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-12-17/genesis.json):
  * sha1: `04c41d95f6856ecf88371929ef15547394ad7e21`
  * sha256: `67e4ab0112c0bf72799674870f28b5a2b461a9bf566c5aee58aa38a7e4e55aee`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
  ::: tip NOTE
  Feel free to use other seed nodes than the one provided here.
  :::
* [Oasis Core commit SHA](https://github.com/oasislabs/oasis-core/commit/af6600b1cc728a2515a0cd3eba8237d4e25249d2):
  * `af6600b1cc728a2515a0cd3eba8237d4e25249d2`
  ::: tip NOTE
  For this release we are using a branch `oasis-testnet-p2-2019-12-17` as the
  previous version of the Testnet has some bugs that prevent it from working on
  `master` without the temporary fix present in the `oasis-testnet-p2-2019-12-17`
  branch.
  :::
* `oasis-node` Binaries:
  * [Linux x86-64](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-12-17/oasis-node-linux-amd64.zip)
  * [macOS x86-64](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-12-17/oasis-node-macos-amd64.zip)

## Upgrade Parameters

The following section details on the scheduled upgrade for the network. See the
[Handling Network Upgrades Guide](./maintenance/handling-network-upgrades.md)
for instructions on how to use these parameters.

* Block height to dump: **950000**
* Upgrade Window
  * Start: **2019-12-17T19:00:00Z**
  * End: **2019-12-18T18:59:59Z**
    * The "_End_" of the window is not something we can enforce unilaterally,
      however, if, for whatever reason, not enough people upgrade on the public
      testnet we _may_ release and redeploy a new genesis block that removes
      inactive nodes from the validator set.
* [Upgrade Patch](https://raw.githubusercontent.com/oasislabs/public-testnet-artifacts/master/patches/patch-2019-12-17.json)

## Deployment Change Log

### 2019-12-17 (Latest)

You should only need to do an upgrade as detailed in the [Handling Network
Upgrades Guide](./maintenance/handling-network-upgrades.md)

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
