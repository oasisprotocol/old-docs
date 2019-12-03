# Joining the Testnet

This guide will cover setting up your nodes on the Public Testnet. There is some
assumption of knowledge on the use of basic command line tools.

::: tip NOTE
If you joined the Testnet prior to 11/26, use the following steps to upgrade:

1. [Stop your node and wipe state (keep node identity)](./maintenance/wiping-node-state.md)
1. [Download the current genesis file and `oasis-node` to your
   server](./current-testnet-parameters.md)
1. See the [Deployment Change
   Log](./current-testnet-parameters.md#2019-11-26-latest) for a list of
   changes. _Please ensure that you update your node configuration._
1. Start your node (you may need to [wait for your node to
   sync](#check-that-your-node-is-synced))
:::

## Prerequisites

Before following this guide, make sure you've followed the [Prerequisites
Guide](./prerequisites.md) and understand how to use the `oasis-node` binary.

### Systems

This guide assumes that you have two different physical machines that you will
use for deployment. These machines are the following:

* Your local system, henceforth called the `localhost`.
* A remote system to run as an Oasis node, henceforth called the `server`.

The reason for this is to ensure protection of the keys used to
setup your node. This guide does not include the use of HSMs, but
should be used in the future.

## Creating Your Entity

Everything in this section should be done on the `localhost` as there are
sensitive items that will be created.

### Creating a Working Directory

During this entity initialization process, we will create keys and other
important artifacts that are necessary for the deployment of nodes on the
network. It is important that you save and protect the generated artifacts in
this directory if you intend to use them to register your entity and nodes. We
will reference the working directory on `localhost` as `/localhostdir`
throughout the documentation. Inside `/localhostdir` you should create the
following directories:

* `entity` - This will store your entity. The private contents in this directory
  are safest if used on a machine kept disconnected from the internet. The
  directory permissions should be `rwx------`
* `node` - This will store a node we are calling "node". The name is not
  important. It simply represents one of your nodes. You can rename it to
  whatever you wish. The private contents of this directory will be used on the
  node itself.
  You should initialize this information on a system with access to the entity's
  private key. The directory permissions should be `rwx------`

To create the directory structure, use the following command:

```
mkdir -m700 -p {entity,node}
```

### Copying the Genesis File

The latest genesis file can be found [here](./current-testnet-parameters.md).
You should download the latest `genesis.json` file, copy it to the working
directory and save its path into an environment variable:

```
export GENESIS_FILE_PATH=/localhostdir/genesis.json
```

This will be needed later when generating transactions.

### Initializing an Entity

The entity, as [described
here](./architectural-overview.md#entities-and-key-management) is critical to
operating nodes on the network as it controls the stake attached to a given
individual or organization on the network. In the future we will support using
entity keys through HSMs to ensure that entity keys cannot be easily
compromised. We strongly suggest that you do not use any entity that is generated
with the current process on the Mainnet. During the Public Testnet and staking
competition we would also suggest that you generate the entity on a system that has
no network connection to provide rudimentary protection for the entity key.
However, it is up to you to determine your own security practices.

To initialize an entity simply run the following from `/localhostdir/entity`:

```
oasis-node registry entity init
```

This will generate 3 files in `/localhostdir/entity`

* `entity.pem` - The private key of the entity. **NEVER SHARE THIS AS IT CAN BE
  USED TO TRANSFER STAKE**
* `entity.json` - The entity descriptor. This is the JSON of the unsigned
  information to be sent to the registry application on the network.
* `entity_genesis.json`- This JSON object contains the entity descriptor that
  has been signed with the the `entity.pem`. This is meant to be shared for
  inclusion on the genesis block.

### Initializing a Node

A node registers itself to the network when the node starts up. However, in
order to validate itself, the entity signs a public key associated to the node.
This allows the node registration to happen without the uploading entity key to
the internet. To initialize a validator node, take note of the static IP of the
server where your node will run, and issue the following commands from the
`/localhostdir/node` directory.

```
export STATIC_IP=<YOUR_STATIC_IP>
oasis-node registry node init \
  --entity /localhostdir/entity \
  --node.consensus_address $STATIC_IP:26656 \
  --node.is_self_signed \
  --node.role validator
```

This command will create a validator node's identity so that it can be a
self-signed node (this is what allows self registration). There are more options
for this that you can explore by running `oasis-node registry node init --help`.
The options shown above are the minimum.

The command will generate the following files:

* `consensus.pem` - The node's private key used for consensus. **DO NOT SHARE**
* `consensus_pub.pem` - The node's public key for consensus
* `identity.pem` - The node's identity private key. **DO NOT SHARE**
* `identity_pub.pem` - The node's identity public key.
* `node_genesis.json` - The node's details if you wish to include this node on
  the genesis file of the network.
* `p2p.pem` - The node's private key for libp2p. **DO NOT SHARE**
* `p2p_pub.pem` - The node's public key for libp2p.
* `tls_identity.pem` - The node's TLS key for grpc's TLS . **DO NOT SHARE**
* `tls_identity_cert.pem` - The node's TLS cert for grpc's TLS.

#### Adding the Node to the Entity Descriptor

Once the node has been initialized, we need to add it to the entity descriptor
so that it can properly register itself when the node starts up.

Execute the following command in the `/localhostdir/node` directory:

```
oasis-node registry entity update \
  --datadir /localhostdir/entity \
  --entity.node.descriptor node_genesis.json
```

This will update the entity descriptor `entity.json` and subsequently the
`entity_genesis.json` file that contains the signed entity descriptor payload.

#### Initializing Additional Nodes

At the time of Public Testnet, the network will only have validators and no
other committees (no compute, no key management, no storage, etc.). At this time
this documentation does not include instructions in configuring anything beyond
a single validator. If you'd like to create more validator nodes you can simply
repeat the process above to initialize the artifacts for an additional node (and
renaming the proper things). Each node will require at least the network's
defined minimum staking amount (at this time this is 100 tokens).

## Running an Oasis Node on the `server`

### Setting up the Oasis Node's Working Directory

Before we run the node on the `server` we need to ensure that we have a place to
store necessary files for the node. For this guide, we will call this working
directory `/serverdir` directory.

#### Setting up the the `/serverdir` Directory

In the `/serverdir` directory we will create the following subdirectories:

* `etc/` - this is to store the configuration
* `node/` - this is to store the node's data
* `node/entity/` - this is to store the public components of the node's entity

You can make this directory structure by calling the following command:

```
mkdir -m700 -p /serverdir/{etc,node,node/entity}
```

#### Copying the Node Artifacts from `/localhostdir`

In order for the node registration to work properly, as defined in
`/localhostdir/entity.json`, you must copy the node's artifacts you generated in
the [Initializing a Node](#initializing-a-node) section. To do so upload the
following files from `/localhostdir/node` to `/serverdir/node` over a secure channel:

* `consensus.pem`
* `consensus_pub.pem`
* `identity.pem`
* `identity_pub.pem`
* `p2p.pem`
* `p2p_pub.pem`
* `tls_identity.pem`
* `tls_identity_cert.pem`

After copying, make sure that all of these files have `0600` permissions:

```
chmod -R 600 /serverdir/node/*.pem
```

_You may notice that some of these files were listed as **DO NOT SHARE**. In the
future these keys should be generated and referenced from HSM. Before we have
HSM support, these keys should be kept as secure as possible on the `server`.

#### Copying the Public Entity Artifacts from `/localhostdir`

We will also need to have public entity artifacts from the `/localhostdir`. Copy
the file from `/localhostdir/entity/entity.json` to
`/serverdir/node/entity/entity.json`.

#### Copying the Genesis Files

The latest genesis files can be found [here](./current-testnet-parameters.md).
You should download the latest `genesis.json` file and copy it to
`/serverdir/etc/genesis.json`.

#### Configuring the Oasis Node

::: warning NOTE
If you deployed a node on the 2019-11-13 Public Testnet, the configuration has
changed. Please update your configuration or your node will fail to connect.
:::

There are a variety of options available when running an Oasis node. The
following YAML file is a basic configuration for a validator node on the
network.

Before using this configuration you should collect the following information to
replace the <code v-pre>{{ var_name }}</code> variables present in the
configuration file:

<!--
The <code v-pre> sections are due to an inability of vuepress to escape template
characters. We also had feedback that without the {{ }} surrounding the
variables the documentation was potentially ambigious. Please keep the {{ }} in
the following section
-->

* <code v-pre>{{ external_address }}</code>: This is the external IP you wish to
  use when registering this node. If you are using a Sentry Node, you should use
  the public IP of that machine.
* <code v-pre>{{ seed_node_address }}</code>:  This the seed node address in the
  form `ID@IP:port` this is published [here](./current-testnet-parameters.md)

Create a file, `/serverdir/etc/config.yml`, with the following
contents:

```yaml
##
# Oasis Node Configuration
#
# This file's configurations are derived from the command line args found in the
# root command of the oasis-node binary. For more information execute:
#
#     oasis-node --help
#
# Settings on the command line that are separated by a dot all belong to the
# same nested object. So "--foo.bar.baz hello" would translate to:
#
#     foo:
#       bar:
#         baz: hello
##

# Set this to where you wish to store node data. The node artifacts
# should also be located in this directory (for us this is /serverdir/node)
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
  # By default logs are output to stdout. If you're running this in docker keep the
  # default
  #file: /var/log/oasis-node.log

# Path to the genesis file for the current version of the network.
genesis:
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  registration:
    # In order for the node to register itself the entity.json of the entity
    # used to provision the node must be available on the node.
    entity: /serverdir/node/entity/entity.json

# Consensus backend.
consensus:
  # Setting this to true will mean that the node you're deploying will attempt
  # to register as a validator.
  validator: True

# Tendermint backend configuration.
tendermint:
  abci:
    prune:
      strategy: keep_n
      num_kept: 86400
  core:
    listen_address: tcp://0.0.0.0:26656

    # The external_address option is used when registering this node to the
    # network. If using the Sentry node setup this should be skipped.
    external_address: tcp://{{ external_address }}:26656

  db:
    backend: boltdb
  debug:
    addr_book_lenient: False
  # You can add additional seeds to this list of seed addresses if you know of
  # additional seeds
  seed:
    - "{{ seed_node_address }}"
```

#### Ensuring Proper Permissions

Only the owner of the process that runs node should have access to the files in
the directory. The `oasis-node` binary ensures that the files used by the node
are as least privileged as possible so that you don't accidentally shoot
yourself in the foot while operating a node. To ensure the proper permissions,
we suggest running the following to remove all non-owner read/write/execute
permissions:

```
chmod -R go-r,go-w,go-x /serverdir
```

However just so it's clear, the following permissions are expected by the
`oasis-node` command:

* `700` for the `/serverdir/node` directory
* `700` for the `/serverdir/node/entity` directory
* `600` for all `*.pem` files

### Starting the Oasis Node

::: danger WARNING
In a previous version of docs, we asked you to open port `42261` on a running
docker container. In some configurations we noticed that this port was being
exposed to the outside world. This is no longer needed and should be removed
immediately. Keeping that port open was a temporary measure and is unsafe
generally. Please close that port to the public and do not bind to it in any
way.
:::

You can start the server by running the command below. Please note, the node is
configured to run in the foreground. We suggest you daemonize this with a
process supervisor like [supervisord](http://supervisord.org/),
[systemd](https://github.com/systemd/systemd), etc.

```
oasis-node --config /serverdir/etc/config.yml
```

### Verifying the Connection to the Network

As part of the starting the server process, the `oasis-node` binary will, by
default, setup an internal unix socket in the `datadir` of the Node. This socket
can be used to communicate to the node and query details about the network.

Run the following command:

```
oasis-node registry entity list -a unix:/serverdir/node/internal.sock
```

If this command fails, you'll receive a non-zero exit code and there's a high
likelihood that you are not connected to the network. However, if it does work
properly it should respond with output like the following but with potentially
many more values:

```text
2317a8eef10e470434411aebac8f1a8c0f1c6a0d35ff53921f8bc70588bb66b2
8e3873f84f7f2250eb456dc598dc56b812f561137fe41c383128e6c14e0e2e74
cf3b004bd98f3e1eab92e97c5fa6cbe4d42a00133c515a2440fefaca514a48ff
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff
```

Once you get to a node that's connected you can move on to the next section as
your node is not yet registered as a validator on the Oasis Testnet.

## Signing up for Testnet Tokens

_This won't be necessary if you are in the genesis file or already have tokens
through some other means. For most people, this will not be true._

In order to participate on the Testnet you'll need to have tokens. You'll use
these tokens to register your entity and stake on the network. To get tokens,
you'll need to sign up with [this
form](https://oasisfoundation.typeform.com/to/dlcekq). While filling out the
form, it will ask for your Entity Public Key. This is the same as your Entity
Account ID and can be found in the `/localhostdir/entity/entity.json`. In this
JSON file, the Entity Public Key is the `id` field.

### Example

In the following example `entity.json`, the Entity Public Key is
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

After filling out this form, wait for an email notifying you that you've been
funded before moving forward. The following sections assume that you have
already been funded.

## Staking and Registering

::: tip NOTE
This won't be necessary if your Entity is in the genesis file.
:::

::: warning NOTE
If you've submitted staking or registry transactions before, your nonce is
likely different than the nonce used in the examples. If you're uncertain,
please check your account nonce by using [this
guide](./maintenance/checking-account-nonce.md)
:::

Once you have been funded, you can now complete the process of connecting your
node by staking so that you can register your entity and register your node.

### Check that your node is synced

Before you can make any transactions you'll have to make sure that node is
synced. To do so call this command on the server:

```
oasis-node control is-synced \
  -a unix:/serverdir/node/internal.sock && \
  echo "You are synced" || echo "You are not synced"
```

::: tip NOTE
The `oasis-node control is-synced` command has no output but returns an exit
code. The code above adds some sugar to make it a little easier to understand
due to the lack of output.
:::

If you're not synced, you will need to wait until your node has synced before
you can move forward.

### Generating a Staking (Escrow) Transaction on the `localhost`

Your Entity private key should ideally be disconnected from the internet on the
`localhost`. You want this because the Entity private key is used to authorize
transactions on your staking account. To ensure that the Entity private key
isn't sent to the `server` we will generate a transaction on the `localhost`.
The staking application calls "staking" an escrow. For the testnet, the current
minimum stake required to register an entity and register a node as a validator
is 100 tokens. So we will generate an escrow transaction that escrows 100 tokens
on your own Entity.

```
oasis-node stake account gen_escrow \
  --genesis.file $GENESIS_FILE_PATH \
  --entity $ENTITY_DIR_PATH \
  --stake.escrow.account $ACCOUNT_ID \
  --stake.amount 100000000000000000000 \
  --transaction.file $OUTPUT_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 0
```

The parameters are as follows:

* `$ENTITY_DIR_PATH` - For this guide this would be `/localhostdir/entity/`
* `$OUTPUT_TX_FILE_PATH` - This is where you wish to output the signed
  transaction file. For this guide we will use `/localhostdir/signed-escrow.tx`
* `$ACCOUNT_ID` - This is the hex encoding of the Entity Public Key. To derive
  this you can use the following python3 code:

  ```python
  import binascii, base64

  def account_id_from_b64(base64_id):
      """base64_id can be found in entity.json in the `id` field"""
      return binascii.hexlify(base64.b64decode(base64_id))

  account_id_from_b64("<YOUR ENTITY PUBLIC KEY>")
  >>> "deadbeefdeadbeefdeadbeef..."
  ```

Note that the option `--stake.transaction.amount` looks like a very large
number. This is actually equivalent to 100 tokens on the Testnet as each unit
value used to track the account balance is 1x10^-18 tokens.

### Generating Entity Registration Transaction

After you submit your escrow account, you'll need to register your entity so
that your node registers properly. You could do this process _after_ you
submit the escrow transaction, however, to save steps we prepare everything
before hand.

```
oasis-node registry entity gen_register \
  --genesis.file $GENESIS_FILE_PATH \
  --entity $ENTITY_DIR_PATH \
  --transaction.file $OUTPUT_REGISTER_TX_FILE_PATH \
  --transaction.fee.gas 1000 \
  --transaction.fee.amount 1 \
  --transaction.nonce 1
```

* `$ENTITY_DIR_PATH` - For this guide this would be `/localhostdir/entity/`
* `$OUTPUT_REGISTER_TX_FILE_PATH` - This is where you wish to output the signed
  transaction file. For this guide we will use
  `/localhostdir/signed-register.tx`

### Submitting Your Transactions on the `server`

To complete the staking process we need to submit your escrow and registry
transactions:

1. Copy the file `/localhostdir/signed-escrow.tx` on the `localhost` to
   `/serverdir/signed-escrow.tx` on the `server`.
2. Copy the file `/localhostdir/signed-register.tx` on the `localhost` to
   `/serverdir/signed-register.tx` on the `server`.
3. Call `oasis-node` like so:

  ```
  oasis-node consensus submit_tx \
    --transaction.file /serverdir/signed-escrow.tx \
    -a unix:/serverdir/node/internal.sock
  oasis-node consensus submit_tx \
    --transaction.file /serverdir/signed-register.tx \
    -a unix:/serverdir/node/internal.sock
  ```

### Checking that Your Node is Properly Registered

_We understand these instructions for verification need to improve. Any
assistance is welcome ;)_

To ensure that your node is properly connected as a Validator on the network, We
can check to see the node's identity on in the registry's node list.
Unfortunately, at this time this is a bit of a manual process.

### Getting the Node's consensus_pub.pem Identity

```
cat /serverdir/node/consensus_pub.pem
```

This will look like:

```text
-----BEGIN ED25519 PUBLIC KEY-----
s+vZ71qeZnlq0HmQSDBiWn2OKcy3fXOuPMu76/5GkUI=
-----END ED25519 PUBLIC KEY-----
```

We will use `s+vZ71qeZnlq0HmQSDBiWn2OKcy3fXOuPMu76/5GkUI=` as the key to search
for.

### grepping for the Node's Identity

Finally to see if the node is properly registered, run the command:

```
export NODE_PUB_KEY="s+vZ71qeZnlq0HmQSDBiWn2OKcy3fXOuPMu76/5GkUI="
oasis-node registry node list -v -a unix:/serverdir/node/internal.sock | grep $NODE_PUB_KEY
```

If `grep` found the key, then you're properly connected!

<!-- markdownlint-disable no-trailing-punctuation -->
## You're a Validator!
<!-- markdownlint-enable no-trailing-punctuation -->

If you've made it this far you've properly connected your node to the network
and you're now a Validator on the Public Testnet.
