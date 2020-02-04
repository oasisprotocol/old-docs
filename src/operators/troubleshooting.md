# Troubleshooting

::: danger BEFORE YOU BEGIN TROUBLESHOOTING
Before you begin troubleshooting we suggest you check all of the following:

* Check that your current binary version is the latest listed on the [current
  testnet parameters](./current-testnet-parameters.md)
  * Check the version on your localhost using `oasis-node --version`
  * Check the version on your server using `oasis-node --version`
* If upgrading, make sure that you've wiped state (unless that is explicitly not
  required)
* If you're doing anything with the entity:
  * Do you have the latest genesis?
  * Do you have the correct private key (or Ledger device).
  * If you're signing a transaction:
    * Do you have enough of an account balance to make the transaction?
      * Run `oasis-node stake account info`
    * Are you using the correct nonce?
      * Run `oasis-node stake account info`
* If you're generating a transaction:
  * Do you have the latest genesis?
* If you're submitting a transaction:
  * Do you have the latest genesis?
  * Is your node synced? The transaction will fail to run properly
:::

## `oasis-node` Binary

### Building from Source: Go Errors

First, make sure you have go version >=go1.13.0 and protocol buffers installed
(use `brew install protobuf` on Mac).

Error message example:

```text
PWD: /home/oasis/oasis-core/go/grpc
CMD: [protoc -I ./ --go_out=plugins=grpc,paths=source_relative:. common/common.proto]
protoc-gen-go: program not found or is not executable
--go_out: protoc-gen-go: Plugin failed with status code 1.
FAILED: exit status 1
exit status 1
grpc/generate.go:3: running "go": exit status 1
```

Resolve this error by ensuring you have `protoc-gen-go` installed and adding
`$GOPATH/bin` to your path:

Check installation:

```bash
which protoc-gen-go
```

Install:

```bash
go get github.com/golang/protobuf/protoc-gen-go
```

Add to your path variable:

```bash
export PATH=$PATH:$GOPATH/bin
```

If you don't see a helpful error message while building, scroll up to see if
any additional information was provided.

### Building from Source: Rust Errors

Error message example:

```text
error[E0412]: cannot find type `ucontext_t` in this scope
```

Error messages from `rustc` can be ignored; all you need from `oasis-core` are
the `go` components. In general, avoid trying to build the rust components.

You can use the following command to stick to go:

```bash
make go
```

### Alternative: Docker Binary

If you're having lots of trouble building from source, you can try pulling the
Docker image, then copy the contained binary to your local machine (only works
on Linux) with the following command:

```bash
docker cp oasis_node:/oasis/bin/oasis_node
```

## Running a Node

### Invalid Permissions

#### Permissions for node and entity

Error Message:

```text
common/Mkdir: path '/serverdir/node' has invalid permissions: -rwxr-xr-x
```

The `entity` and `node` directories both need to have permissions `rwx------`.
Make sure you initialize the directory with correct permissions or change them
using `chmod`:

```bash
mkdir --mode 700 --parents {entity,node}
```

```bash
chmod 700 /serverdir/node
chmod 700 /serverdir/entity
```

#### Permissions for .pem files

Error Message example:

```text
signature/signer/file: invalid PEM file permissions 700 on /serverdir/node/identity.pem
```

All `.pem` files should have the permissions `600`.
You can set the permissions for all `.pem` files in a directory using the
following command:

```bash
chmod -R 600 /path/*.pem
```

#### Serverdir Ownership

Another possible cause of permission issues is not giving ownership of your
`serverdir` to the user running the node (e.g. `docker-host` or replace with
your user):

```bash
chown -R docker-host:docker-host /serverdir
```

In general, to avoid problems when running docker, specify the user when
running `docker` commands by adding the flag `--user $(id -u):$(id -g)`.

### Cannot Find File

Error Message examples:

```text
no such file or directory
```

```text
file does not exist
```

<!-- markdownlint-disable line-length -->
```text
ts=2019-11-17T03:42:09.778647033Z level=error module=cmd/registry/node caller=node.go:127 msg="failed to load entity" err="file does not exist"
```
<!-- markdownlint-enable line-length -->

More often than you'd expect, this error is the result of setting the path
incorrectly.
You may have left something like `--genesis.file $GENESIS_FILE_PATH` in the
command without setting `$GENESIS_FILE_PATH` first, or set the path incorrectly.
Check that `echo $GENESIS_FILE_PATH` matches your expectation or provide a path
in the command.

Another possible cause: the files in your localhost directory cannot be read
from the container. Make sure to run commands in the same session within the
container.

## Staking and Registering

### Transaction Out of Gas

Error message:

<!-- markdownlint-disable line-length -->
```text
module=cmd/stake caller=stake.go:70 msg="failed to submit transaction" err="rpc error: code = Unknown desc = staking: add escrow transaction failed: out of gas" attempt=1
```
<!-- markdownlint-enable line-length -->

The docs are now updated to show that you need to add
`--stake.transaction.fee.gas` and `--stake.transaction.fee.amount` flags when
generating your transaction. Note that if you're re-generating a transaction,
you will need to increment the `--nonce` flag.

### SSH Tunnel

Note that this portion may not be relevant in future versions.

Error message example:

```text
bind: Cannot assign requested address
```

This error was encountered while trying to create ssh tunnel from localhost's
Docker container, and was fixed by making the `oasis-node` binary from source
instead of using the Docker image.
