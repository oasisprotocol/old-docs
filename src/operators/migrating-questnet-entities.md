# Migrating Your QuestNet Entity for the Amber Network

::: warning NOTE
The deadline for Amber Network Entity Packages is 2020-06-15T23:59:00 UTC. You
must migrate your entity before then.
:::

For those who have previously participated in The Quest, you must create an
entity package for the Amber Network derived from your Quest entity. A migration
is required due to breaking changes in the entity and node descriptor formats
used between The Quest and the Amber Network.

To summarize, the steps required for migration are as follows:

1. Backup all of your entity/node artifacts.
2. Update your entity descriptor to the latest version.
3. Create a set of new node artifacts.
    * This will effectively delete your old node. While it might be possible to
      use the same node identity with the Amber Network, for simplicity's sake,
      we will not include those instructions. If you attempt to do so, it is at
      your own discretion.
4. Update your entity with the new node descriptor.
    * This removes the old node descriptor.
5. Create and submit your Entity Package.
6. Start your node with the new node artifacts when the Amber Network
   starts.

## Prerequisites

* Your `/localhostdir`
  * We are assuming that you had previously followed our setup guides and
    created an entity/node in a directory called `/localhostdir`
* Your `/localhostdir/entity` containing your `entity.pem` (Your entity private key)
* [oasis-node v20.7][oasis-node-linux]

[oasis-node-linux]: https://github.com/oasisprotocol/oasis-core/releases/download/v20.7/oasis_core_20.7_linux_amd64.tar.gz

## Step 1: Backup all of your entity/node artifacts

While this step is not strictly required, the steps in this guide are
potentially destructive. Please backup the entirety of your
`/localhostdir/entity` and `/localhostdir/node` directories just in case you
make a mistake.

## Step 2: Update your entity to the latest version

In order to migrate the entity to the latest version, execute the following
commands:

```bash
oasis-node registry entity init \
    --entity.reuse_signer \
    --signer.backend file \
    --signer.dir /localhostdir/entity \
    --force
```

## Step 3: Create a new set of node artifacts

As explained previously, the node descriptor format has breaking changes
between The Quest and the Amber Network. To simplify migration, it is best to
delete the old node artifacts and create new ones. Execute the following
commands in the `/localhostdir` directory.

```bash
rm -r node
mkdir node
cd node
STATIC_IP=<STATIC_IP> # this is the ip to your sentry or validator node
oasis-node registry node init \
  --signer.backend file \
  --signer.dir /localhostdir/entity \
  --node.consensus_address $STATIC_IP:26656 \
  --node.is_self_signed \
  --node.role validator
```

After you've completed these steps your `/localhostdir/node` directory should
include the following files. As before, please be mindful of the files you
_should not share_.

* `consensus.pem`: The node's consensus private key. **DO NOT SHARE**
* `consensus_pub.pem`: The node's consensus public key.
* `identity.pem`: The node's identity private key. **DO NOT SHARE**
* `identity_pub.pem`: The node's identity public key.
* `node_genesis.json`: The node's details if you wish to include this node in
  the genesis file of the network.
* `p2p.pem`: The node's private key for libp2p. **DO NOT SHARE**
* `p2p_pub.pem`: The node's public key for libp2p.
* `sentry_client_tls_identity.pem`: The node's TLS private key for securing gRPC
  connections. **DO NOT SHARE**
* `sentry_client_tls_identity_cert.pem`: The node's TLS certificate for securing gRPC
  connections.

## Step 4: Update your entity with the new node descriptor

Now that we have initialized a new node, we need to add it to the entity
descriptor so that it can properly register itself when the node starts up.

Execute the following command in the `/localhostdir/node` directory:

```bash
oasis-node registry entity update \
  --signer.dir /localhostdir/entity \
  --entity.node.descriptor node_genesis.json
```

You may be wondering if you need to remove the old node from the entity. The
`oasis-node registry entity update` command includes only explicitly specified
node descriptors into the entity descriptor. As we do not specify the old
`node_genesis.json` here, the old node is removed from the entity.

## Step 5: Create and submit your Entity Package

Once you've completed the steps above, follow the guide in [Creating an Entity
Package] _before the beginning of the Amber Network_.

[Creating an Entity Package]: ./creating-an-entity-package.md

## Step 6: Update your node

At the time you wish to upgrade your node to participate in the Amber
Network, you must ensure that the `/localhostdir/node` artifacts are uploaded to
your `/serverdir/node` directory.
