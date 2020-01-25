# Sentry Node Architecture

This guide provides instructions for a deployment using the Sentry node
architecture to protect validator nodes from being directly exposed on the
public network.

This guide assumes a setup where an Oasis validator node is only accessible
over a private network, with sentry nodes having access to it.
The guide does not cover setting this infrastructure up.
Knowledge of [Tendermint's Sentry Node architecture][tm-sentry] is assumed as
well.

[tm-sentry]: https://forum.cosmos.network/t/sentry-node-architecture-overview/454

::: danger
This is only an example of a Sentry node deployment, and we take no responsibility
for mistakes contained therein.
Make sure you understand what you are doing.
:::

## Prerequisites

Before following this guide, make sure you've read the [Prerequisites] and
[Joining the Testnet] guides and created your Entity.

[Prerequisites]: ./prerequisites.md
[Joining the Testnet]: ./joining-the-testnet.md

## Configuring the Oasis Sentry Node

### Initializing Sentry Node

Sentry node identity keys can be initialized with:

```bash
oasis-node identity init --datadir /serverdir/node
```

The generated `tls_identity_cert.pem` (which is the node's TLS cert for
securing gRPC connections) needs to be available on any node that will be
protected by the sentry node.

### Configuring Sentry Node

An Oasis node can be configured to run as a sentry node by setting the
`--worker.sentry.enabled` flag. Additionally, the`--tendermint.private_peer_id`
& `--tendermint.peristent_peer` flags can be used to configure a list of
Tendermint private peers, which should be set to Tendermint IDs and addresses
of validator nodes, protected by this sentry node.

An example of full `YAML` configuration of a sentry node is below.

Before using this configuration you should collect the following information to
replace the <code v-pre>{{ var_name }}</code> variables present in the
configuration file:

<!--
The <code v-pre> sections are due to an inability of vuepress to escape template
characters. We also had feedback that without the {{ }} surrounding the
variables the documentation was potentially ambigious. Please keep the {{ }} in
the following section
-->

- <code v-pre>{{ external_address }}</code>: This is the external IP on which
  sentry node will be reachable.
- <code v-pre>{{ seed_node_address }}</code>: This the seed node address of the
  form `ID@IP:port`. You can find the current Oasis Seed Node address in the
  [Current Testnet Parameters][params].
- <code v-pre>{{ validator_tendermint_id }}</code>: This is the Tendermint ID of
  the Oasis validator node that will be protected by the sentry node. This ID
  can be obtained by running:

  ```bash
  oasis-node debug tendermint show-node-id --datadir /serverdir/node
  ```

  on the validator node.

  <!--- TODO: there is probably a different way to get this out of our identity
  files. --->

- <code v-pre>{{ validator_private_address }}</code>: This is the (presumably)
  private address on which validator should be reachable from the sentry node.

[params]: ./current-testnet-parameters.md

```yaml
##
# Oasis Sentry Node Configuration
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
  # By default logs are output to stdout. If you're running this in docker keep
  # the default
  #file: /var/log/oasis-node.log

# Path to the genesis file for the current version of the network.
genesis:
  file: /serverdir/etc/genesis.json

# Worker configuration.
worker:
  sentry:
    # Enable sentry node.
    enabled: true
    # Port used by validator nodes to query sentry node for registry
    # information.
    # IMPORTANT: Only validator nodes protected by the sentry node should have
    # access to this port. This port should not be exposed on the public
    # network.
    control_port: 9009

# Tendermint backend configuration.
tendermint:
  core:
    listen_address: tcp://0.0.0.0:26656
    external_address: tcp://{{ external_address }}:26656

  seeds: "{{ seed_node_address }}"

  # Sentry node should set validator IDs as private peer IDs.
  private_peer_id:
    - "{{ validator_tendermint_id }}"

  persistent_peer:
    - "{{ validator_tendermint_id }}@{{ validator_private_address }}:26656"
```

::: tip NOTE
Multiple sentry nodes can be provisioned following the above steps.
:::

## Configuring the Oasis Validator Node

In this setup the Oasis validator node should not be exposed directly on the
public network. The Oasis validator only needs to be able to connect to its
sentry nodes, preferably via a private network.

### Initializing Validator Node

::: tip
If your validator node is already registered and running in a non-sentry setup,
this step can be skipped as the Oasis validator will update its address in the
Registry automatically once we redeploy it with new configuration.
:::

When you are [initializing a validator node][val-init], you should use the
sentry node's external address and Tendermint ID in the
`--node.consensus_address` flag.
If you are running multiple sentry nodes, you can specify the
`--node.consensus_address` flag multiple times.

To initialize a validator node with 2 sentry nodes', run the
following commands from the `/localhostdir/node` directory:

```bash
export SENTRY1_CONSENSUS_ID=<YOUR_SENTRY1_CONSENSUS_ID_HEX>
export SENTRY1_STATIC_IP=<YOUR_SENTRY1_STATIC_IP>
export SENTRY2_CONSENSUS_ID=<YOUR_SENTRY2_CONSENSUS_ID_HEX>
export SENTRY2_STATIC_IP=<YOUR_SENTRY2_STATIC_IP>
oasis-node registry node init \
  --entity /localhostdir/entity \
  --node.consensus_address $SENTRY1_CONSENSUS_ID@$SENTRY1_STATIC_IP:26656 \
  --node.consensus_address $SENTRY2_CONSENSUS_ID@$SENTRY2_STATIC_IP:26656 \
  --node.is_self_signed \
  --node.role validator
```

::: tip NOTE
`SENTRY_CONSENSUS_ID`: This is the Consensus ID of the sentry node in hex
format.
This ID can be obtained from `consensus_pub.pem`:

```bash
sed -n 2p /serverdir/node/consensus_pub.pem | base64 -d | hexdump -v -e '/1 "%02x" '
```

  on the sentry node.
:::

<!--- TODO: there should probably be a node debug command for getting this
address --->

[val-init]: ./joining-the-testnet.html#initializing-a-node

### Configuring Validator Node

There are some configuration changes needed for the Oasis validator node to
enable proxying through its sentry node. Most of these flags should be familiar
from the Tendermint sentry node architecture.

Since the validator node will not have an external address, the
`--tendermint.core.external_address` flag should be skipped. Similarly, the
`--tendermint.seed` flag can be skipped, as the `oasis-node` won't be directly
connecting to any of the seed nodes.

Tendermint Peer Exchange should be disabled on the validator with the
`--tendermint.disable_peer_exchange` flag.

Sentry nodes can also be configured as Tendermint Persistent-Peers with the
`--tendermint.persistent_peer` flag.

In addition to the familiar Tendermint setup above, the node needs to be
configured to query sentry nodes for external addresses every time the validator
preforms a re-registration. This is configured with `--worker.sentry.address`
and `--worker.sentry.cert_file` flags.

The `--worker.sentry.address` flag should be set to the (private) address of
the sentry node's control endpoint.

The `--worker.sentry.cert_file` flag should be set to the sentry node's client
certificate (named `tls_identity_cert.pem` by default) created when
provisioning the sentry node's identity.

Putting it all together, an example configuration of a validator node in the
sentry node architecture is given below.

Before using this configuration you should collect the following information to
replace the <code v-pre>{{ var }}</code> variables present in the configuration
file:

- `sentry_node_private_ip`: This is the private IP address of the sentry node
  over which sentry node should be accessible to the validator.
- `sentry_node_certificate`: For each sentry node address, a path to its gRPC
  TLS certificate is required (named `tls_identity_cert.pem` by default).

  This file is generated when provisioning the sentry node.
  This certificate needs to be accessible on any node that's connecting to the
  sentry node's control endpoint and is used for securing the communication
  between the validator and the sentry node.
- `sentry_node_tendermint_id`: This is the Tendermint ID of the sentry node
  that will be configured as a Persistent Peer. This ID can be obtained by
  running:

  ```bash
  oasis-node debug tendermint show-node-id --datadir /serverdir/node
  ```

  on the sentry node.

```yaml
##
# Oasis Node Configuration
#
# This file's configurations are derived from the command line args found in
# the root command of the oasis-node binary. For more information execute:
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
  # By default logs are output to stdout. If you're running this in docker keep
  # the default
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
  sentry:
    address:
      - "{{ sentry_node_private_ip }}:9009"
    cert_file:
      - "{{ sentry_node_certificate }}"

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
  persistent_peer:
    - "{{ sentry_node_tendermint_id }}@{{ sentry_node_private_ip }}:26656"
  disable_peer_exchange: True
  db:
    backend: badger
```
