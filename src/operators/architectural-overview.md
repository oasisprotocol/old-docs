# Architectural Overview

As an operator of a Node on the Oasis Network, it is suggested that you have an
understanding of the system architecture of the Oasis Network. Here we will
provide a high level overview of the Oasis Network's architecture. This overview
is used to provide enough guidance to be useful for the purposes of getting
started as a Node Operator. For more information, see
[our whitepaper](https://www.oasislabs.com/whitepaper).

## Definitions

### Entity

An Entity is an organization or individual with stake on the network. Each
Entity has a private key that controls access to the wallet of the Entity. See
[Entities and Key Management](#entities-and-key-management) for further
information.

### Node

A Node is a device (VM, Bare Metal, Container, etc.) that is participating in a
committee on the network. Each Node has a private key that is used for signing
operations during block production and a public key, or Node Identity, used for
identification. See [Entities and Key Management](#entities-and-key-management)
for further information.

### Committee

A Committee is a set of Nodes that are participating in the same service layer
of oasis. Committees are described in more detail in the [Modular
Architecture](#modular-architecture) Section.

## Modular Architecture

The Oasis Network uses a modular architecture similar to that of a Service
Oriented Archiecture or a Microservices Architecture. Any given Node
participates in one of many different committees. These committees each have
different responsibilities in the execution of smart contracts on the Oasis
Network. In this section, we explore the different committees and their
responsibilities.

### Committee Responsibilities

![Transaction Processing](./operator_images/web3_diagram_v2.png)

In the figure above, we see the flow of transactions in each committee. The
details of each committee is best described in our [blockchain
paper](https://www.oasislabs.com/whitepaper), but we provide this section here
as a high level introduction. It should be noted that some aspects of the system
are yet to be completed. So the testnet that you might deploy in the [Quick
Start Guide](./quick-start.md) won't yet function as it is described here.

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

#### Transaction Scheduler Committee

The Transaction Scheduler Committee schedules batches of transactions into the
Compute Committee. In order to ensure maximum throughput, the Transaction
Scheduler batches transactions for execution that should be conflict free.

#### Compute Committee

The Compute Committee executes transactions.

#### Merge Committee

The output from the Compute Committee are merged into a single application state
and submitted to the Consensus Committee to agree upon the final application
state after a batch of transactions execute.

#### Storage Committee

Stores application state from the compute and merge committee.

#### Consensus Committee

The Consensus Committee is the BFT consensus layer. It's primary function during
transaction processing is to reach consensus on the final state of the
application that it receives from the Merge Committees.

_As a note, the MainNet Beta will only be released with a Consensus Committee._

#### Key Manager Committee

Provides a key management for Confidential Compute Committees.

## Networking Protocols

The Oasis Network uses 3 different protocols for communication:

* [Tendermint](https://github.com/tendermint/tendermint)
* [grpc](https://grpc.io/)
* [libp2p](https://github.com/libp2p)

## Confidentiality

Confidentiality is achieved in the Oasis Network by relying on trusted execution
environments (TEEs) to secure the execution of any given smart contract.
Initially, the Oasis Network will utilize [Intel
SGX](https://software.intel.com/en-us/sgx). As more TEE technologies mature, we
expect to support more than TEEs than Intel SGX.

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
