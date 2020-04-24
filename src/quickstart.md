# Quickstart

In this guide we will take you through setting up your Oasis dev environment, testing a simple Rust service using cargo, testing the same service using a locally running blockchain, and finally testing it using our Devnet 2.0.

If you run into any issues or have a question, you can chat with us in our public [Slack channel](https://join.slack.com/t/oasiscommunity/shared_invite/enQtNjQ5MTA3NTgyOTkzLWIxNTg1ZWZmOTIwNmQ2MTg1YmU0MzgyMzk3OWM2ZWQ4NTQ0ZDJkNTBmMTdlM2JhODllYjg5YmJkODc2NzgwNTg).

## Set Up the Oasis SDK

### Install the Oasis Toolchain

```
curl --proto '=https' --tlsv1.2 -sSL https://get.oasis.dev | python
```

Alternatively, pipe into `python - --help` to see installation options.

## Create a New Oasis Project from a Template

Once you've downloaded the latest Oasis SDK, you can create a new project using

```
oasis init oasis-quickstart
```

If you `cd oasis-quickstart` and `ls`, you'll see the following structure

```
oasis-quickstart
├── app                  # your TypeScript app
│   ├── service-clients  # generated TypeScript clients
│   │   └── greeter.ts   # generated from services/src/bin/greeter.rs
│   ├── src
│   │   └── main.ts      # app entrypoint
│   └── test             # Jest tests
│       └── greeter.spec.ts
├── services             # your Oasis platform services
│   ├── Cargo.toml
│   └── src
│       └── bin
│           └── greeter.rs
├── Cargo.lock
├── Cargo.toml
├── README.md
├── package.json
├── tsconfig.json
└── yarn.lock           # both yarn and npm work. you'll want yarn, though
```

We'll go into detail on why each file exists in the
[next tutorial](/tutorials/hello-world.html), but for now, the important bits are
the TypeScript app in `app/` and the `Greeter` service defined in
`services/src/bin/greeter.rs`.

"Why Rust and TS" you ask. Well, as great as Rust is–and on that we can all
agree–TS is great for cross-platform development, so each technology is used
where it's most apt. For your development convenience, the Oasis SDK
automatically generates TS service clients. You *could* write the whole thing
in Rust, but let's save such excitement for another tutorial.

## Build the Quickstart App

The Oasis SDK supports both `yarn` and `npm`, but the quickstart is rather
opinionated and requires `yarn`, so you'll want to install that separately
using `npm i -g yarn`. This is not installed by default out of respect for
your computer's hard disk.

Once that's done, simply run `oasis build` and watch everything get built,
Rust and TS alike.

## Test the Quickstart App

Strictly speaking, you could have skipped the build step, but it makes for
a nice exposition. Testing is where things get interesting, though.

First, start a local development chain by running `oasis chain`.
Then, in another terminal, run `oasis test`. This will run the services' Cargo
tests and any TS tests found in the `app/test/` directory.

If everything went well, you should see some text fly by in your `oasis chain`
terminal, and eventually the test output:

```
 PASS  app/test/greeter.spec.ts
  Greeter Test
    ✓ deployed (2ms)
    ✓ known greeting (2009ms)
```

So far so good!

## Deploy on Devnet 2.0

Now that your service is battle hardened from extensive testing, it's ready
to deploy to the actual platform!
You can deploy your service to Devnet 2.0 using `oasis deploy`, which shells out
to the `deploy` script in the `package.json`.
When you run that command, with any luck, you'll see something like the following:

```
Deployed Greeter at 0x0fb5b7af405e28263be40c3879f3e1c2ec3cb2db
Greeter says: Hello, sample-app
event: 0xeb15806cbdc28a0e2a310d3224ffdc083b49c07f greeted sample-app!
```

You can now connect to the service using
```
new Greeter(new Address('0x0fb5b7af405e28263be40c3879f3e1c2ec3cb2db'))
```
and send greetings to all your friends using a spiffy decentralized system that
you just deployed. Nice job!

## Where to go from here?

- Check out the [tutorials](/tutorials/ballot)!
- [Learn Rust!](https://doc.rust-lang.org/book/) (protip: if you use DuckDuckGo, you can search the Rust docs with `!rust <query>`)
- Browse [crates.io](https://crates.io) for libraries to use in your services
