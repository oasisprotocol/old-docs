# Current Testnet Parameters

This page is meant to be kept up to date with the information from the currently
released testnet. Use the information here to deploy or upgrade your node on the
testnet.

* [Genesis Document](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-11-26/genesis.json)
    * sha1: `<< todo update >>`
    * sha256: `<< todo update >>`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
* [oasis-core](https://github.com/oasislabs/oasis-core) commit (_This will be
  improved when we have proper versioning_)
  * Commit-Sha: `9d5e30082a5f3df065fc52a404e048decb9adac9`
* [docker container](https://hub.docker.com/layers/oasislabs/oasis-node/master-20191125134702/images/sha256-4e35b3bb8d9116cfcd6ff7d4f3d84e0753f7f441b48dad6d2129eb32897a3f9b)
    * `$ docker pull oasislabs/oasis-node:master-20191125134702`

## Deployment Change Log

### 2019-11-26 (Latest)

#### `/serverdir/node/config.yml` Changes

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

We no longer document using the docker container for setup or deployment as we
now distribute `oasis-node` binaries. You may still use the docker container,
and we will, for now, document the current docker image tag for a given
deployment.

### 2019-11-13

This is the initial deployment
