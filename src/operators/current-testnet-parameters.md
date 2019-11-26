# Current Testnet Parameters

This page is meant to be kept up to date with the information from the
currently released Testnet. Use the information here to deploy or upgrade your
node on the Testnet.

::: tip NOTE
Feel free to use a seed node other than the Oasis seed node
:::

::: tip NOTE
As the release management of our open source repositories improves, we will
refer to more human-friendly versions of Oasis Core (and related built
artifacts) in this document as opposed to commit-shas.
:::

* [Genesis Document](https://github.com/oasislabs/public-testnet-artifacts/releases/download/2019-11-13/genesis.json)
  * sha1: `33ad8f6c545d0a62d636b2624511dadd9cf94b37`
  * sha256: `1b2ea443c4b4381d4a907553eab246091ffd94d604ef55e0b7d6695c5512933f`
* Oasis Seed Node Address:
  * `D14B9192C94F437E9FA92A755D3CC0341F2E87CF@34.82.86.53:26656`
* [oasis-core](https://github.com/oasislabs/oasis-core) commit (_This will be
  improved when we have proper versioning_)
  * Commit-Sha: `1f6d2de0688998712cba3f642e68ae70075b4d93`
* [docker container](https://hub.docker.com/layers/oasislabs/oasis-node/master-20191113164754/images/sha256-b0b79c9988cf38a3214d63008c4861048acd0c5ebbf5fc163e2c673b8ffc60b3)
    * `$ docker pull oasislabs/oasis-node:master-20191113164754`

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

### 2019-11-13

This is the initial deployment
