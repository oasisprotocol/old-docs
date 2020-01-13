# Creating an Entity Package

::: tip NOTE
Entity Packages are only required at the beginning of a network. If the network
is already running then this will no longer be used
:::

In order to join at the beginning of The Quest (our staking competition), or at
the beginning of any network (including Oasis Mainnet), we require that you send
an Entity Package so that we can create the genesis document for a either
network.

## Details

To create an entity package you must create a tarball (`.tar.gz`) that contains
the following files:

* `entity/entity_genesis.json` - This is the `entity_genesis.json` from the
  entity you initialized.
* `entity/entity.json` - This is the `entity.json` file from the entity you
  initialized.
* `node/node_genesis.json` - This is the `node_genesis.json` from the node you
  initialized. _During genesis creation we will only accept a single node._

The following commands should be executed on your local machine where you
initialized your entity and node:

```shell
mkdir -p package/entity package/node
cp /localhostdir/entity/*.json package/entity
cp /localhostdir/node/node_genesis.json package/node
cd package && tar -zcvf ../entity.tar.gz entity node
```

## Submitting Your Entity Package (For The Quest)

To submit your entity package we've created a repository that will consume and
validate the entity packages used in The Quest.

1. Fork the
   [oasislabs/the-quest-entities](https://github.com/oasislabs/the-quest-entities)
   repository.
2. Add your entity package to the `entities/` directory of the repository as
   `<your-github-username>-entity.tar.gz`
3. Create a pull request against the master branch of the oasislabs repository.
   Once your entity package passes all validation checks we will handle the
   merging of your pull request. _If there are issues you can always resubmit
   your entity package._

*Note: If possible, please use the same github handle to submit your
entity package and public key*

You can see an example of a submission in [this
PR](https://github.com/oasislabs/the-quest-entities/pull/2)
