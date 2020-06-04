# Migrating QuestNet Entities for the Amber Network

For those who have previously participated in The Quest, we ask that you create
an entity package for the Amber Network derived from your Quest entity. A
migration is required due to some breaking changes for the node descriptors used
between The Quest and the Amber Network.

To summarize, the steps required for migration are as follows:

1. Backup all of your entity/node artifacts
2. Create a set of new node artifacts
    * This will effectively delete your old node. While it might be possible to
      use the same keys with the Amber Network, for simplicity's sake, we will
      not include those instructions. If you attempt to do so, it is at your own
      discretion.
3. Update your entity with the new node descriptor.
    * This removes the old node descriptor.
4. Create and submit your Entity Package
5. Update your validator with the new node artifacts when the Amber Network
   starts.

## Prerequisites

* Your `/localhostdir`
  * We are assuming that you had previously followed our setup guides and
    created an entity/node in a directory called `/localhostdir`
* Your `/localhostdir/entity` containing your `entity.pem` (Your entity private key)
* oasis-node v20.7
  * Linux: [oasis-node-linux]
  * macOS: [oasis-node-macos]

[oasis-node-linux]: https://github.com/oasisprotocol/oasis-core/releases/download/v20.7/oasis_core_20.7_linux_amd64.tar.gz
[oasis-node-macos]: https://github.com/oasisprotocol/oasis-core/releases/download/v20.7/oasis_core_20.7_macos_amd64.tar.gz

## Step 1: Backup all of your entity artifacts

While this step is not strictly required, the steps in this guide are
potentially destructive. Please backup the entirety of your
`/localhostdir/entity` and `/localhostdir/node` directories just in case you
make a mistake.

## Step 2: Create a new set of node artifacts

As explained previously, the node descriptor format has a breaking change
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
* `tls_identity.pem`: The node's TLS private key for securing gRPC
  connections. **DO NOT SHARE**
* `tls_identity_cert.pem`: The node's TLS certificate for securing gRPC
  connections.

## Step 3: Update your entity with the new node descriptor

Now that we have initialized a new node, we need to add it to the entity
descriptor so that it can properly register itself when the node starts up.

Execute the following command in the `/localhostdir/node` directory:

```bash
oasis-node registry entity update \
  --signer.dir /localhostdir/entity \
  --entity.node.descriptor node_genesis.json
```

## Step 4: Create and submit your Entity Package

Once you've completed the steps above, follow the guide in [Creating an Entity
Package] _before the beginning of the Amber Network_.

## Step 5: Update Your Validator

At the time you wish to upgrade your validator to participate in the Amber
Network, you must ensure that the `/localhostdir/node` artifacts are uploaded to
your `/serverdir/node` directory.
