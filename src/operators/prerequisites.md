# Prerequisites Guide

## Installing/Using oasis-node

Any time the `oasis-node` binary is referenced, we are referring to the binary
that is created from the [Oasis Core](https://github.com/oasislabs/oasis-core)
repository's `go/` path. This binary contains both the logic for running an
Oasis node and also provides a CLI for handling registry and staking
operations.

### Downloading the binary

For convenience we provide binaries that have been built by Oasis Labs. It is
suggested, however, that you build from source yourself in a production
deployment.

Links to the binaries are provided in the [Current Testnet
Parameters](./current-testnet-parameters.md) page.

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

[core-build]: https://github.com/oasislabs/oasis-core#developing-and-building-the-system
[`master` branch]: https://github.com/oasislabs/oasis-core/tree/master/
[params]: ./current-testnet-parameters.md

### Using inside docker

For those that wish to use the Oasis provided docker container, the `oasis-node`
binary can be accessed by running inside the context of a the
[oasis-node](https://hub.docker.com/r/oasislabs/oasis-node) docker container.
While possible to use, we no longer suggest nor do we support usage of the
built docker containers.
