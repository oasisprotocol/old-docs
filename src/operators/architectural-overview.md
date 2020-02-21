# Architectural Overview

As an operator of a Node on the Oasis Network, it is suggested that you have an
understanding of the system architecture of the Oasis Network. Here we will
provide a high level overview of the Oasis Network's architecture. This overview
is used to provide enough guidance to be useful for the purposes of getting
started as a Node Operator. Note that not all of these features are available
in the Public Testnet, and their design may change in later phases.
For more information on our proposed design, see [our research papers][papers].

## Definitions

### Entity

An Entity is an organization or individual with stake on the network. Each
Entity has a private key that controls access to the wallet of the Entity. See
[Entities and Key Management] for further information.

### Node

A Node is a device (VM, Bare Metal, Container, etc.) that is participating in a
committee on the Network. Each Node has a private key that is used for signing
operations during block production and a public key, or Node Identity, used for
identification. See [Entities and Key Management] for further information.

### Committee

A Committee is a set of Nodes that are participating in the same service layer
of the Oasis Network. Committees are described in more detail in the [Modular
Architecture] section.

## Modular Architecture

The Oasis Network uses a modular architecture similar to that of a Service
Oriented Architecture or a Microservices Architecture. Any given Node
participates in one of many different committees. These committees each have
different responsibilities in the execution of smart contracts on the Oasis
Network. The responsibilities of these committees can be mapped to a set of four
different layers: Consensus, Compute (Confidential and Non-confidential),
Storage, and Key Management. For a Node Operator, these layers map distinctly to
different classes Nodes and potentially to different hardware.

### Committee Responsibilities

![Transaction Processing](/operator_images/web3_diagram_v2.png)

In the figure above, we see the flow of transactions in each committee. The
details of each committee is best described in [our research papers][papers],
but we provide this section here as a high level introduction.
It should be noted that some aspects of the system are yet to be completed.
So the testnet that you might deploy in the [Quick Start Guide] won't yet
function as it is described here.

#### Registry

Although not pictured, the Registry maintains a list of valid Entities, Nodes,
the Committees that each Node has registered to participate, and the lifetime of
each Node.

#### Committee Scheduler

While not a committee unto itself, the Committee Scheduler assigns eligible
nodes to specific committees for some duration of epochs. The pool of Nodes to
be scheduled are chosen from the Registry.

It is possible that a Node can register for more than one committee to make
efficient use of hardware. If, for instance, a Node registers with the
possibility of operating as a Storage or Compute Node, the Committee Scheduler
will assign it a single job during a given lifetime.

#### Consensus Committee

The Consensus Committee is the BFT consensus layer. Its primary function during
transaction processing is to reach consensus on the final state of the
application that it receives from the Compute layer.

## Networking Protocols

The Oasis Network uses three different protocols for communication:

* [Tendermint](https://github.com/tendermint/tendermint)
* [grpc](https://grpc.io/)
* [libp2p](https://github.com/libp2p)

## Confidentiality

Confidentiality is achieved in the Oasis Network by relying on trusted execution
environments (TEEs) to secure the execution of any given smart contract.
Initially, the Oasis Network will utilize [Intel SGX]. As more TEE technologies
mature, we expect to support more than TEEs than Intel SGX.

## Entities and Key Management

Every Node that participates on the network is owned by a specific Entity. This
Entity is not only a logical abstraction but is also a critical aspect of the
key management model for node operators. The model is as follows:

* Entity
  * An Entity is an organization or individual with stake on the network
  * Each Entity's key pair is used for:
    * Registering Node IDs (Node's Public Key)
    * Token transfers
* Node
  * A Node is a block producing node on the Oasis Network
  * Each Node's key pair is used for:
    * Signing actions during block production

## Decentralized Consensus Layer

The Oasis Network is based on a Proof-of-Stake (PoS) consensus model. Tokens can
be self-delegated directly by each node operator or delegated to a node operator
by other token holders. While the Oasis Network is designed with a modular
architecture that can use any consensus system that satisfies these properties,
it currently uses [Tendermint](https://github.com/tendermint/tendermint) as its
consensus algorithm. To run a node yourself you can find information on joining
the testnet [here](https://docs.oasis.dev/operators/joining-the-testnet.html).

Participating in consensus is one of two critical ways that node operators can
help run and be part of the network. Validators will be able to sign blocks,
earn transaction fees, stake, and receive delegation. Similar to the PoS design
implemented by Cosmos, up to 100 validators with the most stake can participate
in the consensus process.

The system will disincentivize bad behavior via slashing for double-signing, as
well as via the cost to dominate the network, in terms of the number of staked
tokens.

A complete proposal of staking, delegation and the incentives that align to both
on the consensus layer can be found
[here](https://docs.oasis.dev/operators/incentives-proposal.html).

## Oasis Network Parallel-Runtimes (ParaTimes)

In addition to a decentralized Consensus Layer, Oasis will also allow for anyone
to add their own runtime to the Network. The system was developed this way in
order to achieve the highest degree of decentralization, while also separating
consensus from execution — improving network throughput and scalability. In
addition, supporting parallel runtimes allows for specialized support for
different workloads. For example, confidential runtimes could mandate that nodes
to use trusted execution environments, where as a non-confidential runtime would
have less restrictive hardware requirements.

In this model, any runtime developer can use the open-sourced [Oasis
Runtime](https://github.com/oasislabs/oasis-runtime) or any other runtime they
choose to use. The privacy and confidentiality technologies baked into the Oasis
Runtime allow it to support confidential smart contract transactions and the use
to TEEs including Intel SGX and others, but can be used for non-confidential
smart contracts as well.

Key highlights of the Oasis Network ParaTimes:

* **Who can manage a runtime:** Anyone. We welcome you to use the Oasis Runtime
  code as a base, copy, or add your own existing runtime.
* **How can validators participate in these runtime:** Runtime developers will
  be able to specify conditions on the nodes to run compute for their runtime.
  Node operators can make themselves available to runtimes, or, if you’re a
  runtime developer looking for operators, you can find a list of potential
  partners on the [Node Operator
  Leaderboards](https://github.com/oasislabs/oasis-runtime) as a way to identify
  potential partners.
* **Paying for transactions:** In order to pay for consensus layer transactions,
  runtime developers will need to provide a deposit used (1) to reserve a spot
  on the network; and (2) as a drawdown mechanism to pay for consensus-layer
  transactions.

## An Example of ParaTime: Oasis Labs’ Data Sovereignty Runtime

While anyone can build a runtime and add it to the Oasis consensus layer at any
time, we also expect that there will be a few up and running at the time of
Mainnet launch as well.

For example, Oasis Labs plans to use the Oasis Network and the open-sourced
Oasis Runtime in order to provide a confidential compute and storage layer for
developers who plan to run confidential smart contracts on the Oasis Network.
Through a [set of APIs and other confidentiality
tooling](https://www.oasislabs.com/data-privacy), developers big and small will
be able to take advantage of confidential computation and secure computing
techniques while the blockchain technology is abstracted away.

Early use cases of this in action include developers in the genomics, hospital
management, credit scoring, and financial services industries that Oasis Labs
expects to provide organic transaction volume to the Oasis Network. No commit
comments for this range

[papers]: https://www.oasis-protocol.org/researchpapers
[Entities and Key Management]: #entities-and-key-management
[Modular Architecture]: #modular-architecture
[Quick Start Guide]: ./quick-start.md
[Intel SGX]: https://software.intel.com/en-us/sgx
