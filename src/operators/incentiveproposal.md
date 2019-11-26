# Oasis Network Incentives: A proposal for the network at time of launch

*NOTE: This is a draft proposal and is subject to change pending the outcome of an economic audit, feedback from the community, and the results of our staking competition. Please share your feedback with us here.* 

Below is a proposal of the initial incentive model for the Oasis Network at the time of Mainnet launch. To submit your feedback and comments to the proposal please reach out to us on [slack](www.oasis-protocol.org/slack) or via [github](https://github.com/oasislabs/docs). 
When designing and running stress tests, audits, and simulations, the underlying goal has been to develop an incentive model that encourages both the development of a healthy and active developer ecosystem as well as a secure, decentralized network through an engaged and diverse  node operator community.

## Summary:

* **Estimated Rewards: 10-15% APR with higher rewards at network launch and tapering over time.**
* **Slashing: Slash for double-signing only**
* **Total number of node operators at launch: up to 100 entities**
* **Minimum stake: 100 tokens**

## Key Features of Mainnet at time of Launch
Oasis aims to launch the network via a phased rollout -- adding more features to each version of the Mainnet with the support and approval of the broader community (more information on governance proposals to come).
At the time of initial launch, we expect the Oasis Network to focus on a few key features:
* Staking
* Delegation
* A consensus layer that validates transactions from multiple side-chain runtimes, including confidential compute and a number of users of this runtime (more information on usage to come).

This post focuses on the incentives and system structure for the initial Mainnet launch. In the future, we’ll share additional posts mapping out some thoughts on a potential longer term roadmap, what the architecture could look like, and how the network and other entities like Oasis Labs are thinking about driving usage and volume to the platform.

## More on the Oasis Consensus Algorithm
The Oasis Network is based on the PoS consensus model. Tokens can be self-delegated directly by each node operator or delegated to a node operator by other token holders. While the Oasis Network is designed with a modular architecture that can use any consensus system that satisfies these properties, it currently uses Tendermint PBFT as its consensus algorithm.
At the time of the initial Mainnet launch, node operators will primarily serve as validators for this consensus layer. They will have the ability to sign blocks, earn transaction fees, stake, and receive delegation.
Similar to the PoS design implemented by Cosmos, up to 100 validators with the most stake will be active validators participating in the consensus process. The system will disincentivize bad behavior via slashing for double-signing, as well as via the cost to dominate the network, in terms of the number of staked tokens.  

## Nuts and bolts of rewards

### Staking conditions
As a public, permissionless blockchain platform, our goal is to make the experience of setting up a node as seamless as possible for any member of our community who wants to contribute to the Oasis Network. To that end, we’ve put a lot of thought into ensuring our staking conditions minimize barriers to entry and encourage meaningful engagement on the network. 
A few key parameters:
* **Total entities on the network (K)**: Up to 100 entities, with each entity’s node with the highest stake selected 
* **Minimum stake**: 100 tokens
* **Selection to the consensus committee**: Each entity can only have one node elected to the consensus committee at a time. The probability of selection to the consensus committee is proportional to the stake of all nodes run by one entity.
* **Annual rewards**: There’s an expectation of ~15% APR for ~6 months (based on the number of blocks produced, so timing could vary), then to 12% and then to 10% by the end of the year. This will all happen over a gradual taper rather than a step function change to avoid creating some sort of cliff.  
* **Slashing**: At the time of Mainnet launch, the network will only slash for double-signing. Currently, the proposed approach is for the network to take the minimum stake (100 tokens) and freeze the node. Freezing the node is really more of a precaution in order to prevent the node from being over-penalized. The Network will not slash for liveness or uptime at launch
* **Staking rewards**: The goal initially is to offer rewards that will help bootstrap the network effectively. To start, rewards will be proportional to the stake and awarded on a per-entity basis. In order to be eligible for staking rewards, a node will need to sign at least 90% of blocks in a given epoch.
* **Unbonding period**: The network will have a ~14 day unbonding period. During this time, staked tokens are at risk of getting slashed for double-signing.
* **Voting power**: During the staking competition, we plan to run various tests to help us determine whether to distribute voting power on the network through a stake-weighted system or to leverage a non-weighted, flat voting approach. Expect more here in the future.

### Delegation
As the Oasis Network gets closer to Mainnet, we’ll continue to share with our community plenty of additional information on the delegation process and how to do easily delegate on the network. In the meantime, here are a few thoughts on delegation more generally:
* **Slashing**: Delegated funds can be slashed for double-signing.
* **Reward disbursement**: Rewards from delegated funds are distributed directly to the delegator. More specifically, the rewards are automatically added to their stakes (i.e. reinvested), so the rewards will have to go through the ~14 unbonding period.

### Commission rates
There is currently no plan to require a minimum or maximum commission rate for delegation, but we will set parameters around the transparency and notification of commission rates. 
When a node is set up on the Mainnet, it will need to share its current commission rate, as well as the range with which that rate could change (e.g. + / - 10%). Commission rates can be adjusted once per day. 

### Transaction fee distribution
Most likely, transaction fees will be distributed equally among validators who signed the block containing that specific transaction. 

*****
For more information and for the latest updates, please visit our website. We also invite you to join our Slack community to share your feedback and help shape the future of our network. 
If you’re new to Oasis, here are some resources you may find useful:
* Oasis Foundation Website: www.oasis-protocol.org 
* Developer Documentation: docs.oasis.dev
* Operator Documentation: https://docs.oasis.dev/operators/overview.html
* GitHub: www.github.com/oasislabs
* Blog: https://medium.com/oasis-protocol-project
