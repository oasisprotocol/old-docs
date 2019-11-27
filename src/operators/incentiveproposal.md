# Oasis Network Incentives: A proposal for the network at time of launch

*NOTE: This is a draft proposal and is subject to change pending the outcome of an economic audit, feedback from the community, and the results of the Oasis Foundation’s staking competition.* 

Below is a proposal of the initial incentive model for the Oasis Network at the time of Mainnet launch. To submit your feedback and comments to the proposal please reach out to us on [slack](www.oasis-protocol.org/slack) or via [github](https://github.com/oasislabs/docs). When designing and running stress tests, audits, and simulations, the underlying goal has been to develop an incentive model that encourages both the development of a healthy and active developer ecosystem as well as a secure, decentralized network through an engaged and diverse node operator community.

The core focus of this incentive documentation is to outline a proposal for parameters and rewards around staking and delegation. In future documentation we will provide more detail on the proposed roadmap and rewards that expand beyond this activity.

## Summary

* **Estimated Staking Rewards: 10-15% APR with higher rewards at network launch and tapering over time.**
* **Slashing: Slash for double-signing only**
* **Number of validators to participate in any given consensus committee (and receive staking rewards) at launch: up to 100 validators**
* **Minimum stake: 100 tokens**

## Overview of the Oasis Consensus Layer
The Oasis Network is based on the PoS consensus model. Tokens can be self-delegated directly by each node operator or delegated to a node operator by other token holders. While the Oasis Network is designed with a modular architecture that can use any consensus system that satisfies these properties, it currently uses Tendermint PBFT as its consensus algorithm. 

At the time of the initial Mainnet launch, node operators will primarily serve as validators for this consensus layer. They will have the ability to sign blocks, earn transaction fees, stake, and receive delegation. Similar to the PoS design implemented by Cosmos, up to 100 validators with the most stake will be active validators participating in the consensus process. 

The system will disincentivize bad behavior via slashing for double-signing, as well as via the cost to dominate the network, in terms of the number of staked tokens. 

## Nuts and bolts of staking rewards

### Staking conditions
As a public, permissionless blockchain platform, our goal is to make the experience of setting up a node as seamless as possible for any member of our community who wants to contribute to the Oasis Network. To that end, we’ve put a lot of thought into ensuring our staking conditions minimize barriers to entry and encourage meaningful engagement on the network. A few key parameters:

* **Number of validators to participate in any given consensus committee at launch:**: Up to 100 validators

* **Minimum stake**: 100 tokens

* **Selection to the consensus committee**:Each entity can only have one node elected to the consensus committee at a time. The probability of selection to the consensus committee is proportional to the stake of all nodes run by one entity.

* **Annual rewards**: The network is targeted to hit  ~15% APR for ~5-6 months (based on the number of blocks produced, so timing could vary), then to 12% and then to 10% by the end of the year. This will all happen over a gradual taper rather than a step function change to avoid creating some sort of cliff. 

* **Slashing**: At the time of Mainnet launch, the network will only slash for double-signing. Currently, the proposed approach is for the network to slash the minimum stake amount (100 tokens) and freeze the node. Freezing the node is a precaution in order to prevent the node from being over-penalized. The Network will not slash for liveness or uptime at launch.

* **Staking rewards**: The goal initially is to offer rewards that will help bootstrap the network effectively. To start, rewards will be proportional to the stake and awarded on a per-entity basis. In order to be eligible for staking rewards, a node would need to sign at least 75% of blocks in a given epoch.

* **Unbonding period**: The network will have a ~14 day unbonding period. During this time, staked tokens are at risk of getting slashed for double-signing and do not accrue rewards during this time.

* **Voting power**: During the staking competition, we plan to run various tests to help us determine whether to distribute voting power on the network through a stake-weighted system or to leverage a non-weighted, flat voting approach. Expect more here in the future.

### Delegation
As the Oasis Network gets closer to Mainnet, we’ll continue to share with our community plenty of additional information on the delegation process and how to do easily delegate on the network. In the meantime, here are a few thoughts on delegation more generally:

* **Slashing**: Delegated funds can be slashed for double-signing.

* **Reward disbursement**: Rewards from delegated funds are distributed directly to the delegator. More specifically, the rewards are automatically added to their stakes (i.e. reinvested), so the rewards will have to go through the ~14 unbonding period.

### Commission rates
There is currently no plan to require a minimum or maximum commission rate for delegation, but we would like to set parameters around the transparency and notification of commission rates. 

When a node is set up on the Mainnet, it will share its current commission rate, as well as the range with which that rate could change (e.g. + / - 10%). Commission rates can be adjusted once per day.

### Transaction fee distribution
Most likely, transaction fees will be distributed equally among validators who signed the block containing that specific transaction.

## Glossary of commonly used terms

* **Entity**: That’s you! (Or your organization.) On the Oasis Network, you’re identified by your public key. Your private key controls your wallet, which maintains a token balance. Each entity can also have a token amount staked, which is a separate balance that permits it to run *nodes*. See [Entities and Key Management](https://docs.oasis.dev/operators/architectural-overview.html#entities-and-key-management) for further information.

* **Node**: This is your computer (VM, bare metal, container, etc.), running the Oasis Network software. It’s identified by another public key, separate from your entity public key. On the Oasis Network, each node is owned by a single entity. For each node that an entity registers on the network, the entity must have a certain additional token amount *staked*.

* **Staking**: A token amount *staked* with an entity is separate from the entity’s token balance and contributes to the entity’s eligibility to run nodes. Entities can *stake* tokens with themselves or with other entities, the latter is referred to as *delegation*. The network keeps track of which entities delegated what proportion of an entity’s staked token amount.

* **Consensus committee**: The consensus committee is a group of nodes that the network elects to maintain its state by executing a Byzantine-fault-tolerant (BFT) consensus protocol.

* **Validator**: A validator is a node participating in the consensus committee. To be eligible to have your node selected as a validator, your entity must be within the Top K staked entities. Entities with a node serving as a validator receive *staking rewards*, which are shared with delegators, as well as *transaction fees*, which are deposited only into their own wallet. Each validator has a private key that is used for signing operations during block production and a public key, or Node Identity, used for identification. See [Entities and Key Management](https://docs.oasis.dev/operators/architectural-overview.html#entities-and-key-management) for further information.

* **Top K**: The top-ranked entities by token amount staked. These entities’ nodes are eligible to participate in the consensus committee and receive staking rewards.

* **Transaction fee**:  The reward that a validator receives from processing a transaction that runs on the network (separate from staking rewards).

* **Commission rate**: The fee that a validator chooses to charge to delegators.

* **Unbonding period**: A period of time when a validator or delegator wants to stop staking tokens, but cannot move them. During this waiting period, tokens do not accrue staking rewards but cannot be withdrawn.

*****
For more information and for the latest updates, please visit our website. We also invite you to join our Slack community to share your feedback and help shape the future of our network. 
If you’re new to Oasis, here are some resources you may find useful:
* [Oasis Foundation Website](www.oasis-protocol.org) 
* [Testnet Documentation](https://docs.oasis.dev/operators/joining-the-testnet.html)
* [Operator Documentation](https://docs.oasis.dev/operators/overview.html)
* [GitHub](www.github.com/oasislabs)
* [Blog](https://medium.com/oasis-protocol-project)
