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

To create an Entity Package you must create a tarball (`.tar.gz`) that contains
the following files:

* `entity/entity_genesis.json` - This is the `entity_genesis.json` from the
  entity you initialized.
* `entity/entity.json` - This is the `entity.json` file from the entity you
  initialized.
* `node/node_genesis.json` - This is the `node_genesis.json` from the node you
  initialized.
  ::: tip NOTE
  During genesis creation we will only accept a single node.
  :::

The following commands should be executed on your local system, where you
[initialized your Entity and Node][Create Your Entity]:

```shell
mkdir -p package/entity package/node
cp /localhostdir/entity/*.json package/entity
cp /localhostdir/node/node_genesis.json package/node
cd package && tar -zcvf ../<YOUR-GITHUB-USERNAME>-entity.tar.gz entity node
```

::: tip NOTE
If possible, please use the same GitHub handle to submit your Entity Package as
you used to [sign the waiver to join The Quest].
:::

## Submitting Your Entity Package (For The Quest)

To submit your Entity Package, we've created a repository that will consume and
validate the Entity packages used in The Quest.

1. Fork the [oasisprotocol/amber-network-entities] repository.
2. Add your Entity Package to the `entities/` directory of the repository.
3. Create a pull request against the `master` branch of the
   [oasislabs/the-quest-entities] repository.
   Once your Entity Package passes all validation checks we will handle the
   merging of your pull request.

You can see an example of a submission in [this
PR](https://github.com/oasislabs/the-quest-entities/pull/2).

::: tip NOTE
If there are any issues, you can always resubmit your entity package.
:::

[Create Your Entity]: ./running-node-on-amber-network.md#creating-your-entity
[oasisprotocol/amber-network-entities]: https://github.com/oasisprotocol/amber-network-entities
[sign the waiver to join the Quest]: ./the-quest-rules.md
