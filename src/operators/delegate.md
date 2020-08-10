# How to Delegate Your Tokens

## What is a Delegation

You can *delegate* your tokens by submitting an
<code>escrow</code> transaction that deposits a specific
number of tokens into someone else’s escrow account
(as opposed to *staking* tokens, which usually refers
to depositing tokens into your own escrow account).

In other words, delegating your tokens is equivalent
to staking your tokens in someone else's node. Delegating
your tokens can give you the opportunity to participate
in the Oasis Network's proof-of-stake consensus system
and earn rewards via someone else's node.

You can delegate your tokens via the Oasis Network's
command line interface (CLI) or via the Oasis wallet available
via Ledger. Whether you are using the
<code>oasis-node</code> CLI or the Oasis wallet app available
on the Ledger platform to sign your <code>escrow</code>
transaction in order to delegate your tokens, the commands
that you need to run are the same, though the setup
process is slightly different.

## Delegation via the <code>oasis-node</code> CLI

The <code>oasis-node</code> binary offers a
command line interface for various staking operations,
including the <code>escrow</code> operation needed to delegate
tokens. If you do not have access to or prefer not to use
a Ledger device, you can sign your transactions with your
entity's private key stored in a file.

You will need to create your Entity as described in [Running a Node on the
Amber Network][create-entity] docs and set the following flags:

* `--signer.backend file`: Specifies use of the file signer.

::: tip NOTE
Currently, `file` is the default signer so you could also omit this flag.
:::

* `--signer.dir`: Path to entity's artifacts directory on the `localhost`,
e.g. `/localhostdir/entity/`.

An example of an <code>escrow</code> transaction can be found
in our [node operator stake management doc]. To delegate your
tokens to someone else's node, simply submit an <code>escrow</code>
transaction to the escrow account address corresponding to that node.

For additional information about signing delegations via the
<code>oasis-node</code> CLI, please see our
[node operator stake management doc].

## Delegation via the Oasis Ledger Wallet App

For any Oasis Network user with access to a Ledger hardware wallet
device, the Ledger device can be used to sign transactions.

You will need to set it up as described in our [Ledger docs] and set the
following flags:

* `--signer.backend ledger`: Specifies use of the Ledger signer.
* `--signer.ledger.address`: The `Oasis App Address` that identifies the
Ledger device you want to use for signing.

::: tip NOTE
You can omit this flag and `oasis-node` will try to connect to any available
Ledger device.
:::

* `--signer.ledger.index`: Account index used to derive the staking account
address on the Ledger device.
* `--signer.dir`: Path to entity's artifacts directory on the `localhost`,
e.g. `/localhostdir/entity/`.

For additional information about signing delegations via a
Ledger hardwaree device, please see our
[node operator stake management doc].

## Rewards and Slashing

By delegating your tokens to someone else's node, you can earn a
portion of the rewards earned by that node through its participation
in the Oasis Network. Your delegated tokens can also be slashed if
that node gets slashed for double signing. You can learn more about
how rewards and slashing impact delegators in our [incentives document].

[node operator stake management doc]: https://docs.oasis.dev/operators/stake-management.html#escrowing-tokens
[incentives document]: https://docs.oasis.dev/operators/incentives-proposal.html
[Ledger docs]: ../hsm/ledger.md
[create-entity]: running-node-on-amber-network.md#creating-your-entity
