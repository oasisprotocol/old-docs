# Current Testnet Parameters

This page is meant to be kept up to date with the information from the currently
released Testnet. Use the information here to deploy or upgrade your node on the
Testnet.

::: tip NOTE
As the release management of our open source repositories improves, we will
refer to more human-friendly versions of Oasis Core (and related built
artifacts) in this document.
:::

* [Genesis Document](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-11-26/genesis.json):
  * sha1: `bed77f6433e607f7073a48dbf27f8cf5d9a8c2e1`
  * sha256: `ee38b53a2e8acd785d279e4c8d3af38b832f120d9a85bf0173e94878f45bc718`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
  ::: tip NOTE
  Feel free to use other seed nodes than the one provided here.
  :::
* [Oasis Core commit SHA](https://github.com/oasislabs/oasis-core/commit/9d5e30082a5f3df065fc52a404e048decb9adac9):
  * `9d5e30082a5f3df065fc52a404e048decb9adac9`
* `oasis-node` Binaries:
  * [Linux x86-64](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-11-26/oasis-node-linux-amd64.zip)
  * [macOS x86-64](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-11-26/oasis-node-macos-amd64.zip)
* [Docker image](https://hub.docker.com/layers/oasislabs/oasis-node/master-20191125134702/images/sha256-4e35b3bb8d9116cfcd6ff7d4f3d84e0753f7f441b48dad6d2129eb32897a3f9b):
  * `oasislabs/oasis-node:master-20191125134702`
  ::: warning DEPRECATED
  We no longer recommend or support using Oasis-provided Docker images.
  :::

## Deployment Change Log

### 2019-11-26 (Latest)

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
