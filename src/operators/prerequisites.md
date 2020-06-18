# Prerequisites Guide

## Installing/Using oasis-node

Any time the `oasis-node` binary is referenced, we are referring to the binary
that is created from the [Oasis Core](https://github.com/oasisprotocol/oasis-core)
repository's `go/` path. This binary contains both the logic for running an
Oasis node and also provides a CLI for handling registry and staking
operations.

### Downloading the binary

::: tip NOTE
We suggest that you [build oasis-node from source][build-source] yourself for
a production deployment.
:::

For convenience, we provide binaries that have been built by Oasis Labs.
Links to the binaries are provided in the [Current Testnet Parameters][params]
page.

[params]: ./current-testnet-parameters.md
[build-source]: #building-from-source

### Building from source

Although highly suggested, building from source is currently beyond the scope
of this documentation. See [Oasis Core's building instructions][core-build] for
details.

::: warning
The code in the [`master` branch] might be incompatible with the code used by
other Nodes in the Public Testnet.

Make sure to use the version specified in the [Current Testnet Parameters][
params].
:::

[core-build]: https://github.com/oasisprotocol/oasis-core#developing-and-building-the-system
[`master` branch]: https://github.com/oasisprotocol/oasis-core/tree/master/
