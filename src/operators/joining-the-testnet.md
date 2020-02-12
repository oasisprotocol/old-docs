# Joining the Testnet

This guide will cover setting up your nodes for The Quest, a multi-round staking
competition (aka incentivized testnet) on the Oasis Network. It assumes some basic
knowledge on the use of command line tools.

::: tip NOTE
If you joined the Testnet prior to 2020/01/15 and you plan to use the same entity
for The Quest, use the following steps to upgrade:

1. [Stop your node and wipe state while keeping your node's identity][
  wipe-state-keep-id].
2. Download the [current genesis file and `oasis-node`][params] to your server.
3. See the [Deployment Change Log] for a list of changes and ensure that you
  update your node's configuration.
4. Start your node (you may need to [wait for your node to sync][check-synced]).
:::

[wipe-state-keep-id]: ./maintenance/wiping-node-state.md##state-wipe-and-keep-node-identity
[params]: ./current-testnet-parameters.md
[Deployment Change Log]: ./current-testnet-parameters.md#deployment-change-log
[check-synced]: #check-that-your-node-is-synced

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites
Guide](./prerequisites.md) and understand how to use the `oasis-node` binary.

### Systems

This guide assumes that you have two different physical machines that you will
use for deployment. These machines are the following:

* Your local system, henceforth called the `localhost`.
* A remote system to run as an Oasis node, henceforth called the `server`.

The reason for this is to ensure protection of the keys used to setup your
node. This guide does not include the use of HSMs, but they should be used in
the future.

## Creating Your Entity

::: danger
Everything in this section should be done on the `localhost` as there are
sensitive items that will be created.
:::

### Creating a Working Directory

During this entity initialization process, we will create keys and other
important artifacts that are necessary for the deployment of nodes on the
network. It is important that you save and protect the generated artifacts in
this directory if you intend to use them to register your entity and nodes.

::: tip NOTE
We will reference the working directory on `localhost` as `/localhostdir`
throughout the documentation.
:::

Inside `/localhostdir` you should create the following directories:

* `entity`: This will store your entity. The private contents in this directory
  are safest if used on a machine kept disconnected from the internet.

  The directory's permissions should be `rwx------`
* `node`: This will store a node we are calling "node". The name is not
  important. It simply represents one of your nodes. You can rename it to
  whatever you wish. The private contents of this directory will be used on the
  node itself.

  You should initialize this information on a system with access to the entity's
  private key.

  The directory permissions should be `rwx------`

To create the directory structure, use the following command:

```bash
mkdir -m700 -p {entity,node}
```

### Copying the Genesis File

The latest genesis file can be found in [Current Testnet Parameters][params].
You should download the latest `genesis.json` file, copy it to the working
directory and set the following environment variable pointing to its path:

```bash
GENESIS_FILE_PATH=/localhostdir/genesis.json
```

This will be needed later when generating transactions.

### Initializing an Entity

As described in the [Architectural Overview][arch-entity], an entity is
critical to operating nodes on the network as it controls the stake attached to
a given individual or organization on the network.
In the future, we will support using entity keys through HSMs to ensure that
entity keys cannot be easily compromised.

::: danger
We strongly suggest that you do not use any entity that is generated with the
current process on the Mainnet.

During the Public Testnet and staking competition we would also suggest that
you generate the entity on a system that has no network connection to provide
rudimentary protection for the entity key.
However, it is up to you to determine your own security practices.
:::

To initialize an entity simply run the following from `/localhostdir/entity`:

```bash
oasis-node registry entity init
```

This will generate three files in `/localhostdir/entity`:

* `entity.pem`: The private key of the entity. **NEVER SHARE THIS AS IT CAN BE
  USED TO TRANSFER STAKE**.
* `entity.json`: The entity descriptor. This is the JSON of the unsigned
  information to be sent to the registry application on the network.
* `entity_genesis.json`: This JSON object contains the entity descriptor that
  has been signed with entity's private key, i.e. `entity.pem`.
  This is meant to be shared for inclusion in the Genesis block.

[arch-entity]: ./architectural-overview.md#entities-and-key-management

### Initializing a Node

A node registers itself to the network when the node starts up. However, in
order to validate itself, the entity signs a public key associated with the
node. This allows the node registration to happen without the uploading
entity's private key to the internet.

To initialize a validator node, take note of the static IP of the
server where your node will run, and issue the following commands from the
`/localhostdir/node` directory:

```bash
STATIC_IP=<YOUR-STATIC-IP>
oasis-node registry node init \
  --signer file \
  --signer.dir /localhostdir/entity \
  --node.consensus_address $STATIC_IP:26656 \
  --node.is_self_signed \
  --node.role validator
```

This command will create a validator node's identity so that it can be a
self-signed node (this is what allows self-registration).

::: tip NOTE
There are more options for node initialization that you can explore by running:

```bash
oasis-node registry node init --help
```

The options shown above are just the minimum.
:::

The command will generate the following files:

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

#### Adding the Node to the Entity Descriptor

Once the node has been initialized, we need to add it to the entity descriptor
so that it can properly register itself when the node starts up.

Execute the following command in the `/localhostdir/node` directory:

```bash
oasis-node registry entity update \
  --signer.dir /localhostdir/entity \
  --entity.node.descriptor node_genesis.json
```

This will update the entity descriptor in `entity.json` and subsequently the
`entity_genesis.json` file that contains the signed entity descriptor payload.

#### Initializing Additional Nodes

At the time of Public Testnet, the network will only have validators and no
other committees (no compute, no key management, no storage, etc.).

At this time this documentation does not include instructions for configuring
anything beyond a single validator.

If you'd like to create more validator nodes, you can simply repeat the process
above to initialize the artifacts for an additional node, just rename the
things pertaining to a particular node appropriately.

::: tip NOTE
Each node will require at least the network-defined minimum staking amount (at
this time, this is 100 tokens).
:::

## Running an Oasis Node on the `server`

### Setting up the Oasis Node's Working Directory

Before we run the node on the `server` we need to ensure that we have a place
to store necessary files for the node.

::: tip NOTE
We will reference the working directory on the `server` as `/serverdir`
throughout the documentation.
:::

#### Setting up the the `/serverdir` Directory

In the `/serverdir` directory we will create the following subdirectories:

* `etc/` - this is to store the configuration
* `node/` - this is to store the node's data
* `node/entity/` - this is to store the public components of the node's entity

You can make this directory structure by executing the following command:

```bash
mkdir -m700 -p /serverdir/{etc,node,node/entity}
```

#### Copying the Node Artifacts from `/localhostdir`

In order for the node registration to work properly, as defined in
`/localhostdir/entity.json`, you must copy the node's artifacts you generated
in the [Initializing a Node] section.
To do so, upload the following files from `/localhostdir/node` to
`/serverdir/node` over a secure channel (e.g. SSH):

* `consensus.pem`
* `consensus_pub.pem`
* `identity.pem`
* `identity_pub.pem`
* `p2p.pem`
* `p2p_pub.pem`
* `tls_identity.pem`
* `tls_identity_cert.pem`

After copying, make sure that all these files have `0600` permissions, i.e.
only their owner has `read` and `write` permissions.

To do so, run the following command:

```bash
chmod -R 600 /serverdir/node/*.pem
```

::: warning IMPORTANT
You may have noticed that some of these files were listed as **DO NOT SHARE**
in the [Initializing a Node] section.

In the future, these keys should be generated and referenced from an HSM.
However, until HSM support is implemented, these keys should be kept as secure
as possible on the `server`.
:::

[Initializing a Node]: #initializing-a-node

#### Copying the Public Entity Artifacts from `/localhostdir`

We will also need to have the public entity artifacts from the `/localhostdir`
present on the `server`.
Copy the `/localhostdir/entity/entity.json` file on `localhost` to
`/serverdir/node/entity/entity.json` on the `server`.

#### Copying the Genesis File to the server

The latest Genesis file can be found in the [Current Testnet Parameters][
params].
You should download the latest `genesis.json` file and copy it to
`/serverdir/etc/genesis.json` on the `server`.

#### Configuring the Oasis Node

There are a variety of options available when running an Oasis node. The
following YAML file is a basic configuration for a validator node on the
network.

Before using this configuration you should collect the following information to
replace the <code v-pre>{{ var_name }}</code> variables present in the
configuration file:

<!--
The <code v-pre> sections are due to an inability of vuepress to escape template
characters. We also had feedback that without the {{ }} surrounding the
variables the documentation was potentially ambiguous. Please keep the {{ }} in
the following section
-->

* <code v-pre>{{ external_address }}</code>: The external IP you used when
  registering this node.
  ::: tip NOTE
  If you are using a [Sentry Node], you should use the public IP of that
  machine.
* <code v-pre>{{ seed_node_address }}</code>:  The seed node address in the
  form `ID@IP:port`.

  You can find the current Oasis Seed Node address in the [Current Testnet
  Parameters][params].

To use this configuration, save it in the `/serverdir/etc/config.yml` file and
pass it to the `oasis-node` command as an argument to the `--config` flag.

```yaml
##
# Oasis Node Configuration
#
# This file's contents are derived from the command line arguments found in the
# root command of the oasis-node binary. For more information, execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. For example, "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node's artifacts
# should also be located in this directory.
datadir: /serverdir/node

# Logging.
#
# Per-module log levels are defined below. If you prefer just one unified log
# level, you can use:
#
# log:
#   level: debug
log:
  level:
    # Per-module log levels. Longest prefix match will be taken. Fallback to
    # "default", if no match.
    default: debug
    tendermint: warn
    tendermint/context: error
  format: JSON
  # By default logs are output to stdout. If you would like to output logs to
  # a file, you can use:
  #
  # file: /var/log/oasis-node.log

# Genesis.
genesis:
  # Path to the genesis file for the current version of the network.
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  registration:
    # In order for the node to register itself, the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /serverdir/node/entity/entity.json

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: true

# Tendermint backend configuration.
tendermint:
  abci:
    prune:
      # WARNING: Use this carefully. Pruning blockchain state is resource intensive.
      # However, running with pruning disabled means you will eventually fill all
      # storage on your node.
      # See https://github.com/oasislabs/oasis-core/issues/2432 for more details.
      #
      # This configuration would cause your node to retain state from only the
      # latest 86400 blocks:
      # strategy: keep_n
      # num_kept: 86400
      #
      strategy: none
  core:
    listen_address: tcp://0.0.0.0:26656

    # The external IP that is used when registering this node to the network.
    # NOTE: If you are using the Sentry node setup, this option should be
    # omitted.
    external_address: tcp://{{ external_address }}:26656

  db:
    backend: badger
  debug:
    addr_book_lenient: false
  # List of seed nodes to connect to.
  # NOTE: You can add additional seed nodes to this list if you want.
  p2p:
    seed:
      - "{{ seed_node_address }}"
```

[Sentry Node]: ./sentry-node.md
[Oasis Core #2432]: https://github.com/oasislabs/oasis-core/issues/2432

#### Ensuring Proper Permissions

Only the owner of the process that runs the Oasis node should have access to
the files in the `/serverdir/node` directory.
The `oasis-node` binary ensures that the files used by the node are as least
privileged as possible so that you don't accidentally shoot yourself in the
foot while operating a node.

To ensure proper permissions are set, we suggest running the following to
remove all non-owner read/write/execute permissions:

```bash
chmod -R go-r,go-w,go-x /serverdir
```

::: tip NOTE
Just so it's clear, the following permissions are expected by the `oasis-node`
binary:

* `700` for the `/serverdir/node` directory
* `700` for the `/serverdir/node/entity` directory
* `600` for all `*.pem` files
:::

### Starting the Oasis Node

::: danger WARNING
In a previous version of docs, we asked you to open port `42261` on a running
Docker container. In some configurations we noticed that this port was being
exposed to the outside world. This is no longer needed and should be removed
immediately. Keeping that port open was a temporary measure and is unsafe
generally. Please close that port to the public and do not bind to it in any
way.
:::

You can start the node by running the following command:

```bash
oasis-node --config /serverdir/etc/config.yml
```

::: tip NOTE
The Oasis node is configured to run in the foreground by default.

We recommend you configure and use it with a process manager like [systemd](
https://github.com/systemd/systemd) or [Supervisor](http://supervisord.org/).
:::

### Verifying the Connection to the Network

As part of the starting the server process, the `oasis-node` binary will, by
default, setup an internal unix socket in the `datadir` of the Node. This socket
can be used to communicate to the node and query details about the network.

Run the following command:

```bash
oasis-node registry entity list -a unix:/serverdir/node/internal.sock
```

If this command fails, you'll receive a non-zero exit code and there's a high
likelihood that you are not connected to the network. However, if it does work
properly it should respond with output like the following but with potentially
many more values:

```text
CVzqFIADD2Ed0khGBNf4Rvh7vSNtrL1ULTkWYQszDpc=
C5z1jB+FHB/QgtTITr6NKWpUs9QHwD11CG3v8tmuJ0g=
DPbZomOIleFrvcJBZPl7y/wEB1w9Q569vAbb6Krl9fE=
DVobZ8bWlOv2J6oHO0uITr5FPO5rIY2irdPNhByprHk=
D2hqhJcmZnBmhw9TodOdoFPAjmRkpRatANCNHxIDHgA=
```

Once you get to a node that's connected you can move on to the next section as
your node is not yet registered as a validator on the Oasis Testnet.

## Signing up for Testnet Tokens

::: tip NOTE
This step is not necessary if you submitted a valid entity package for The Quest
prior to 2019/01/13 @ 00:00 UTC. In this case, your entity will be included in the
Genesis file.
:::

In order to participate on the Testnet you'll need to have tokens. You'll use
these tokens to register your entity and stake on the network.

To get tokens, you'll need to sign up with [this form][tokens-form].
While filling out the form, it will ask for your entity's public key. This is
the same as your entity's account ID and can be found in the `id` key of the
`/localhostdir/entity/entity.json` JSON file.

::: tip EXAMPLE

In the following `entity.json` file, the entity's public key is
`TszGIrC1X08czcik0DgAnmGPzjf8pfQ47bgrjpTmbro=`.

```json
{
  "id": "TszGIrC1X08czcik0DgAnmGPzjf8pfQ47bgrjpTmbro=",
  "nodes": [
    "C93lKVNNkca3Oo9m1exiz22NvMBxxYjkyBrt2+eFAds="
  ],
  "registration_time": 1573585972,
  "allow_entity_signed_nodes": false
}
```

:::

After filling out the form, wait for an email notifying you that you've been
funded before moving forward. The following sections assume that you have
already been funded.

[tokens-form]: https://oasisfoundation.typeform.com/to/dlcekq

## Staking and Registering

::: tip NOTE
 This step is not necessary if your entity is listed in the Genesis file.
:::

::: warning NOTE
If you've submitted staking or registry transactions before, your nonce is
likely different than the nonce used in the examples. If you're uncertain,
please check your account nonce by using [this guide][check-nonce].
:::

Once you have been funded, you can complete the process of connecting your
node to the network by registering both your entity and your node, as
described below.

[check-nonce]: ./maintenance/checking-account-nonce.md

### Check that your node is synced

Before you can make any transactions you'll have to make sure that your node is
synced. To do so call this command on the server:

```bash
oasis-node control is-synced -a unix:/serverdir/node/internal.sock
```

If your node is synced, the above command should output:

```text
node completed initial syncing
```

If your node is not yet synced, you will need to wait before you can move
forward.

### Generating a Staking (Escrow) Transaction on the `localhost`

Your entity's private key should be disconnected from the internet on the
`localhost`. Therefore, you need to generate the following transaction on the
`localhost`.

::: danger
The entity's private key is used to authorize transactions on your staking
account.

Hence it should never be present on the online `server`.
:::

For the Testnet, the current minimum stake required to register an entity and
register a node as a validator is 100 tokens.
So, we will generate an escrow transaction that escrows 100 tokens on your own
entity.

::: tip NOTE
The Oasis node's staking application calls the operation of staking tokens "escrow."
:::

Before generating the escrow transaction, you need to set the following
environment variables:

* `GENESIS_FILE_PATH`: Path to the Genesis file on the `localhost`, i.e.
  `/localhostdir/genesis.json`.
* `ENTITY_DIR_PATH`: Path to entity's artifacts directory on the `localhost`,
  i.e. `/localhostdir/entity/`.
* `OUTPUT_TX_FILE_PATH`: Path to the file containing the outputted signed
  transaction.

  For this guide, we will use `/localhostdir/signed-escrow.tx`.
* `ACCOUNT_ID`: Entity's ID (public key).

  ::: tip NOTE
  You can find your Entity's ID in the `id` field of the `entity.json` file.
  :::

Then execute the following command:

```bash
oasis-node stake account gen_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --stake.escrow.account $ACCOUNT_ID \
  --stake.amount 100000000000 \
  --transaction.file $OUTPUT_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 0
```

::: tip NOTE
The option `--stake.amount` looks like a very large number, but this is
actually just an equivalent to 100 tokens on the Testnet as each unit
value used to track the account balance is 1x10^-9 tokens.
:::

### Generating Entity Registration Transaction

After you submit your escrow account, you'll need to register your entity so
that your node registers properly. You could do this process _after_ you
submit the escrow transaction, however, to save steps we prepare everything
before hand.

Before generating the register transaction, you need to set the following
environment variables:

* `GENESIS_FILE_PATH`: Path to the Genesis file on the `localhost`, i.e.
  `/localhostdir/genesis.json`.
* `ENTITY_DIR_PATH`: Path to entity's artifacts directory on the `localhost`,
  i.e. `/localhostdir/entity/`.
* `OUTPUT_REGISTER_TX_FILE_PATH`: Path to the file containing the outputted
  signed transaction.

  For this guide, we will use `/localhostdir/signed-register.tx`.

Then execute the following command:

```bash
oasis-node registry entity gen_register \
  --genesis.file $GENESIS_FILE_PATH \
  --signer file \
  --signer.dir $ENTITY_DIR_PATH \
  --transaction.file $OUTPUT_REGISTER_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 1
```

### Submitting Your Transactions on the `server`

To complete the staking process we need to copy the generated escrow and
registry transactions from your offline `localhost` to the `server` and submit
them.

To do so, follow these steps:

1. Copy the file `/localhostdir/signed-escrow.tx` on the `localhost` to
   `/serverdir/signed-escrow.tx` on the `server`.
2. Copy the file `/localhostdir/signed-register.tx` on the `localhost` to
   `/serverdir/signed-register.tx` on the `server`.
3. Submit both transactions via `oasis-node consensus submit_tx` sub-command:

  ```bash
  oasis-node consensus submit_tx \
    --transaction.file /serverdir/signed-escrow.tx \
    -a unix:/serverdir/node/internal.sock
  oasis-node consensus submit_tx \
    --transaction.file /serverdir/signed-register.tx \
    -a unix:/serverdir/node/internal.sock
  ```

### Checking that Your Node is Properly Registered

To ensure that your node is properly connected as a validator on the network,
you can run the following command:

```bash
oasis-node registry node is-registered -a unix:/serverdir/node/internal.sock
```

If your node is registered, the above command should output:

```text
node is registered
```

<!-- markdownlint-disable no-trailing-punctuation -->
## You're a Validator!
<!-- markdownlint-enable no-trailing-punctuation -->

If you've made it this far, you've properly connected your node to the network
and you're now a validator on the Public Testnet.
