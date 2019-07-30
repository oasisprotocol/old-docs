# Quickstart

In this guide we will take you through setting up your Oasis dev environment, testing a simple Rust service using cargo, testing the same service using a locally running blockchain, and finally testing it using our Devnet 2.0.

## Set Up the Oasis SDK

1. [Install Rust using rustup](https://rustup.rs)
2. `rustup default nightly-2019-07-04`
3. `rustup target add wasm32-wasi`
4. `cargo install oasis-cli oasis-build`
5. `RUSTFLAGS='-C target-feature=+aes,+ssse3' cargo install --git https://github.com/oasislabs/oasis-chain`
6. Ensure that the `$HOME/.cargo/bin` is in your `$PATH`

Note: If you change your Rust toolchain to another nightly, you'll need to `cargo install --force oasis-build`.
We're working on automating this!

### Dependencies

You need the following dependencies installed for our set up steps to work,

1. C compiler and libraries
2. git
3. openssl dev

## Unit Test the "Hello World" Service Using Cargo

1. `git clone https://github.com/oasislabs/oasis-tutorials`
2. `cd oasis-tutorials/hello-world/service`
3. `oasis test -- --nocapture`

The test will do the following:

1. Retrieve Hello World! in Slovenian
2. Attempt to retrieve Hello World! in Samoan, but fail
3. Attempt to insert a duplicate greeting
4. Insert Hello World! in Samoan
5. Retrieve Hello World! successfully in Samoan

You should see the following console output:

```
running 1 test
In Slovenian: "Pozdravljen, svet!"
In Samoan: None
Adding "Zeno World!" for "en"
Err(DuplicateEntry)
Adding "alofa fiafia i le lalolagi!" for "ws"
In Samoan: "alofa fiafia i le lalolagi!"
test tests::test_paths ... ok

test result: ok. 1 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out
```

Great! Now that the tests pass, build the service for deployment by runing `oasis build --release`.

## Integration Test Using the Local Chain

In this step we will use the Javascript based test in the test directory. This script uses [oasis.js](https://github.com/oasislabs/oasis.js) to interact with the local chain or Devnet 2.0.

1. `cd ../app`
2. Install app dependencies using `npm install`
3. In a separate terminal, run the local chain using `oasis-chain`

You can now test on the local chain using `OASIS_PROFILE=local oasis test -- test`. You will see the following output,

```
> hello-world@1.0.0 test /Users/vishwa/dev/oasis-tutorials/hello-world/app
> jest

  console.log node_modules/@oasislabs/client/dist/index.umd.js:46009
    WARNING: Missing strong random number source; using weak randomBytes

  console.log node_modules/@oasislabs/client/dist/index.umd.js:46009
    Warning: XMLHttpRequest is not defined

 PASS  test/service.spec.ts (5.965s)
  HelloWorld Test
    ✓ deployed (2ms)
    ✓ known greeting (409ms)
    ✓ insert new greeting in Samoan (400ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
```

## Test Using Devnet 2.0

To test your service on Devnet 2.0, run `OASIS_PROFILE=devnet oasis test -- test`.
This will run the test on Devnet 2.0.
If everything goes according to plan, you should see the tests pass, once again.

## Where to go from here?

* Check out the [tutorials](/tutorials)!
* [Learn Rust!](https://doc.rust-lang.org/book/) (protip: if you use DuckDuckGo, you can search the Rust docs with `!rust <query>`)
* Browse [crates.io](https://crates.io) for libraries to use in your services
