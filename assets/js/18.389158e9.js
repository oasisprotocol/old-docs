(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{364:function(e,t,a){"use strict";a.r(t);var n=a(42),s=Object(n.a)({},(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[a("h1",{attrs:{id:"ledger-support"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#ledger-support"}},[e._v("#")]),e._v(" Ledger Support")]),e._v(" "),a("p",[a("a",{attrs:{href:"https://www.ledger.com/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ledger"),a("OutboundLink")],1),e._v(" is a popular hardware wallet that is supported on the Oasis Network.")]),e._v(" "),a("h2",{attrs:{id:"prerequisites"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#prerequisites"}},[e._v("#")]),e._v(" Prerequisites")]),e._v(" "),a("p",[e._v("Before following this guide, make sure you've followed the "),a("RouterLink",{attrs:{to:"/operators/prerequisites.html"}},[e._v("Operator Docs'\nPrerequisites Guide")]),e._v(" to install the "),a("code",[e._v("oasis-node")]),e._v(" binary.")],1),e._v(" "),a("h2",{attrs:{id:"installation"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#installation"}},[e._v("#")]),e._v(" Installation")]),e._v(" "),a("p",[e._v("To use the Oasis Ledger App, install it via "),a("a",{attrs:{href:"https://www.ledger.com/ledger-live/",target:"_blank",rel:"noopener noreferrer"}},[e._v("Ledger Live"),a("OutboundLink")],1),e._v("'s Manager.\nYou will have to set developer mode to "),a("em",[e._v("on")]),e._v(" in order to find it.")]),e._v(" "),a("div",{staticClass:"custom-block warning"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),a("p",[e._v("The "),a("a",{attrs:{href:"https://github.com/Zondax/ledger-oasis",target:"_blank",rel:"noopener noreferrer"}},[e._v("Oasis Ledger App"),a("OutboundLink")],1),e._v(" will not be available for installation via Ledger Live's\nManager until after it has been approved by Ledger.")])]),e._v(" "),a("p",[e._v("Once installed, the application will use the generated mnemonic stored on the\nLedger device to generate a pair of private and public keys.")]),e._v(" "),a("h2",{attrs:{id:"identifying-the-ledger-device"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#identifying-the-ledger-device"}},[e._v("#")]),e._v(" Identifying the Ledger device")]),e._v(" "),a("p",[e._v("To identify your Ledger device for use with the oasis-node CLI, unlock your\ndevice and make sure you have the Oasis Ledger App open.")]),e._v(" "),a("p",[e._v("Run the following command to identify your device by the generated address:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("oasis-node signer ledger list_devices\n")])])]),a("p",[e._v("If your device is properly connected, you should see an output similar to the\none below:")]),e._v(" "),a("div",{staticClass:"language-text extra-class"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[e._v("============ Device found\nOasis App Version : 302e31322e33\nOasis App Address : oasis19hpt4y2reqwyfqcd53asjchdqf468chr673y6jn07xjp36w32jlscf0me\n")])])]),a("p",[e._v("From now on, use the "),a("code",[e._v("Oasis App Address")]),e._v(" to identify the Ledger device you want\nto use for signing.")]),e._v(" "),a("p",[e._v("For convenience, set the "),a("code",[e._v("OASIS_APP_ADDRESS")]),e._v(" environment value to its value.")]),e._v(" "),a("h2",{attrs:{id:"exporting-the-public-key-to-entity"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#exporting-the-public-key-to-entity"}},[e._v("#")]),e._v(" Exporting the Public Key to Entity")]),e._v(" "),a("p",[e._v("Before you can sign anything, you need to export the public key from the device\nand use it to generate an entity. This will also be used later as another check\nto ensure that you are signing a transaction with the correct key.")]),e._v(" "),a("p",[e._v("Using the address you retrieved in the "),a("a",{attrs:{href:"#identifying-the-ledger-device"}},[e._v("previous section\n")]),e._v(", run the following:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("oasis-node signer "),a("span",{pre:!0,attrs:{class:"token builtin class-name"}},[e._v("export")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --signer.backend ledger "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --signer.dir /localhostdir/entity/ "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --signer.ledger.address "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$OASIS_APP_ADDRESS")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --signer.ledger.index "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v("\n")])])]),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),a("p",[e._v("You can omit the "),a("code",[e._v("--signer.ledger.address")]),e._v(" flag and "),a("code",[e._v("oasis-node")]),e._v(" will try to\nconnect to any available Ledger device.")])]),e._v(" "),a("p",[e._v("This will create an "),a("code",[e._v("entity.json")]),e._v(" file in "),a("code",[e._v("/localhostdir/entity/")]),e._v(" that contains\nthe public key generated on the device associated with\n"),a("code",[e._v("--signer.ledger.address")]),e._v(", derived from a path with an account index of\n"),a("code",[e._v("--signer.ledger.index")]),e._v(". The "),a("code",[e._v("--signer.backend ledger")]),e._v(" flag is important here as\nit specifies use of the Ledger backend.")]),e._v(" "),a("p",[e._v("This command must be run anytime a new account index is to be used, with a\nnew "),a("code",[e._v("/localhostdir/entity/")]),e._v(" provided.")]),e._v(" "),a("h2",{attrs:{id:"generating-and-signing-transactions"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#generating-and-signing-transactions"}},[e._v("#")]),e._v(" Generating and Signing Transactions")]),e._v(" "),a("p",[e._v("As described in the "),a("RouterLink",{attrs:{to:"/operators/stake-management.html#generating-and-submitting-transactions"}},[e._v("Operator Docs' Stake Management Guide")]),e._v(",\nyou need to set the appropriate "),a("strong",[e._v("base flags")]),e._v(" and "),a("strong",[e._v("signer flags")]),e._v(" for each\ntransaction you want to generate.")],1),e._v(" "),a("p",[e._v("For convenience, you can set the "),a("code",[e._v("TX_FLAGS")]),e._v(" environment variable like below\n(replacing Ledger device's address index appropriately):")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[a("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("TX_FLAGS")]),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),a("span",{pre:!0,attrs:{class:"token string"}},[e._v('"--genesis.file /localhostdir/genesis.json \\\n  --signer ledger \\\n  --signer.ledger.address '),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$OASIS_APP_ADDRESS")]),e._v(' \\\n  --signer.ledger.index 1 \\\n  --signer.dir /localhostdir/entity/"')]),e._v("\n")])])]),a("p",[e._v("Then, you can generate and sign a transaction, e.g. a transfer transaction,\nby running:")]),e._v(" "),a("div",{staticClass:"language-bash extra-class"},[a("pre",{pre:!0,attrs:{class:"language-bash"}},[a("code",[e._v("oasis-node stake account gen_transfer "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  "),a("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$TX_FLAGS")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --stake.amount "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("AMOUNT-TO-TRANSFER"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --stake.transfer.destination "),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("DESTINATION-ACCOUNT-ID"),a("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --transaction.file tx_transfer.json "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --transaction.nonce "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --transaction.fee.gas "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("1000")]),e._v(" "),a("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --transaction.fee.amount "),a("span",{pre:!0,attrs:{class:"token number"}},[e._v("2000")]),e._v("\n")])])]),a("p",[e._v("where "),a("code",[e._v("<AMOUNT-TO-TRANSFER>")]),e._v(" and "),a("code",[e._v("<DESTINATION-ACCOUNT-ID>")]),e._v(" are replaced with\nthe amount of tokens to transfer and the id of the transfer's destination\naccount, respectively.")]),e._v(" "),a("div",{staticClass:"custom-block tip"},[a("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),a("p",[e._v("For a more detailed explanation of the transaction flags that were set, see\n"),a("RouterLink",{attrs:{to:"/operators/stake-management.html#common-transaction-flags"}},[e._v("Operator Docs' Stake Management Guide")]),e._v(".")],1)]),e._v(" "),a("p",[e._v("Next, unlock your Ledger device and verify the transaction's fields on your\ndevice's screen.")]),e._v(" "),a("p",[e._v("After you've confirmed the transaction's fields are correct, sign the\ntransaction on your Ledger device by double-pressing the "),a("em",[e._v("Sign transaction")]),e._v("\nscreen.")])])}),[],!1,null,null,null);t.default=s.exports}}]);