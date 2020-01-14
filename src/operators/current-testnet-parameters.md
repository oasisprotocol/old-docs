# Current Testnet Parameters

This page is meant to be kept up to date with the information from the currently
released Testnet. Use the information here to deploy or upgrade your node on the
Testnet.

* [Genesis Document](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2020-01-15/genesis.json):
  * sha1: `19477662f02939bd3a12aec09fd517d37cae9e51`
  * sha256: `8badcb8a5a10112790d64efb885c45bf21812f4f4592189e35d2317c7e3c45a6`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
  ::: tip NOTE
  Feel free to use other seed nodes than the one provided here.
  :::
* [Oasis Core commit SHA](https://github.com/oasislabs/oasis-core/commit/a9a532e6be67512b3e4e581b5a57a97dff5715ca):
  * `a9a532e6be67512b3e4e581b5a57a97dff5715ca`
  ::: tip NOTE
  For this release we are using a branch `oasis-testnet-p2-2019-12-17` as the
  previous version of the Testnet has some bugs that prevent it from working on
  `master` without the temporary fix present in the `oasis-testnet-p2-2019-12-17`
  branch.
  :::
* `oasis-node` Binaries:
  * [Linux x86-64](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2020-01-15/oasis-node_20.1_linux_amd64.tar.gz)
  * [macOS x86-64](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2020-01-15/oasis-node_20.1_macos_amd64.tar.gz)
* [Docker image](https://hub.docker.com/layers/oasislabs/oasis-node/master-20200114202942/images/sha256-bdaa9aa5a55f20ba91b0a6730ed59aefb45b8d7dbbf1c406a9934d8ef970abf1)
  * `oasislabs/oasis-node:master-20200114202942`
  ::: warning DEPRECATED
  We no longer recommend or support using Oasis-provided Docker images.
  :::

## Upgrade Parameters

No upgrades at this time.

## Deployment Change Log

### 2020-01-15 (Latest)

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
