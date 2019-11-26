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

### Using inside Docker

For those that wish to use the Oasis-provided Docker image, the `oasis-node`
binary can be found inside the [oasis-node][oasis-node-docker] Docker image.

To start a Docker container from this image, set the appropriate version by
replacing `<DOCKER-IMAGE-VERSION>` with the version specified in the [Current
Testnet Parameters][params] and run:

```bash
VERSION=<DOCKER-IMAGE-VERSION>
docker run -it --rm \
  --entrypoint /bin/bash \
  --volume $(pwd):/workdir \
  --workdir /workdir \
  oasislabs/oasis-node:$VERSION
```

This invocation will set `/workdir` in the Docker container to the current
working directory of the host.

::: tip NOTE
It is up to you to set this working directory correctly.
If there are any strange errors, this is a common source of problems.
:::

Inside the container, you can use the `oasis-node` command as you would
locally on your host.

::: warning
While the `latest` tag is available for the `oasis-node` Docker image, we
suggest using the tag specified in the [Current Testnet Parameters][params] of
the form `master-YYYYMMDDHHMMSS` to ensure that your node is compatible in case
the `latest` tag doesn't match the tag specified in the [Current Testnet
Parameters][params].
:::

[oasis-node-docker]: https://hub.docker.com/r/oasislabs/oasis-node
