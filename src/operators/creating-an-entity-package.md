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
tar -zcvf entity.tar.gz -C package entity node
```
