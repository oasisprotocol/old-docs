(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{363:function(e,t,s){"use strict";s.r(t);var a=s(42),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[s("h1",{attrs:{id:"handling-network-upgrades"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#handling-network-upgrades"}},[e._v("#")]),e._v(" Handling Network Upgrades")]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),s("p",[e._v("Following this guide when there is no network upgrade will result in you\nlosing your place on the current network.")])]),e._v(" "),s("p",[e._v("The following guide should be used when the network has agreed to do a software\nupgrade.")]),e._v(" "),s("p",[e._v("To see the latest upgrade schedule, see "),s("RouterLink",{attrs:{to:"/operators/current-testnet-parameters.html#deployment-change-log"}},[e._v("Deployment Change Log")]),e._v(".")],1),e._v(" "),s("h2",{attrs:{id:"dumping-blockchain-state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#dumping-blockchain-state"}},[e._v("#")]),e._v(" Dumping Blockchain State")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),s("p",[e._v("Do not stop your "),s("code",[e._v("oasis-node")]),e._v(" process just yet.")])]),e._v(" "),s("p",[e._v("Before an upgrade we will update the "),s("RouterLink",{attrs:{to:"/operators/current-testnet-parameters.html#upgrade-parameters"}},[e._v("Upgrade Parameters")]),e._v(" to specify the block\nheight at which to dump.")],1),e._v(" "),s("p",[e._v("To dump the state of the network to a genesis file, run:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token assign-left variable"}},[e._v("HEIGHT_TO_DUMP")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("<")]),e._v("HEIGHT-TO-DUMP"),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v("\noasis-node genesis dump "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  -a unix:/serverdir/node/internal.sock "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --genesis.file /serverdir/etc/genesis_dump."),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEIGHT_TO_DUMP")]),e._v(".json "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  --height "),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEIGHT_TO_DUMP")]),e._v("\n")])])]),s("p",[e._v("replacing "),s("code",[e._v("<HEIGHT-TO-DUMP>")]),e._v(" with the block height we specified.")]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),s("p",[e._v("You must only run the following command "),s("em",[e._v("after")]),e._v(" the "),s("code",[e._v("<HEIGHT-TO-DUMP>")]),e._v(" block\nheight has been reached on the network.")])]),e._v(" "),s("h2",{attrs:{id:"patching-dumped-state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#patching-dumped-state"}},[e._v("#")]),e._v(" Patching Dumped State")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),s("p",[e._v("At the moment, we don't provide state patches.")]),e._v(" "),s("p",[e._v("Once "),s("a",{attrs:{href:"https://github.com/oasisprotocol/oasis-core/issues/2757",target:"_blank",rel:"noopener noreferrer"}},[e._v("Oasis Core #2757"),s("OutboundLink")],1),e._v(" is implemented, it will become easier to create/apply\na state patch with the standard Unix tools.")])]),e._v(" "),s("h2",{attrs:{id:"downloading-and-verifying-the-provided-genesis-document"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#downloading-and-verifying-the-provided-genesis-document"}},[e._v("#")]),e._v(" Downloading and Verifying the Provided Genesis Document")]),e._v(" "),s("p",[e._v("Download the genesis document linked in the "),s("RouterLink",{attrs:{to:"/operators/current-testnet-parameters.html#deployment-change-log"}},[e._v("Deployment Change Log")]),e._v(" and save it\nas "),s("code",[e._v("/serverdir/etc/genesis.json")]),e._v(".")],1),e._v(" "),s("p",[e._v("Pretty-print the dumped state (set indent to 2) so you will be able to easily\ncompare it to the provided genesis document.")]),e._v(" "),s("div",{staticClass:"custom-block tip"},[s("p",{staticClass:"custom-block-title"},[e._v("NOTE")]),e._v(" "),s("p",[e._v("We plan to update the "),s("code",[e._v("oasis-node genesis dump")]),e._v(" command to output the state dump\nin a "),s("em",[e._v("canonical")]),e._v(" form that is "),s("code",[e._v("diff")]),e._v("/"),s("code",[e._v("patch")]),e._v(" friendly.")]),e._v(" "),s("p",[e._v("For more details, see "),s("a",{attrs:{href:"https://github.com/oasisprotocol/oasis-core/issues/2757",target:"_blank",rel:"noopener noreferrer"}},[e._v("Oasis Core #2757"),s("OutboundLink")],1),e._v(".")])]),e._v(" "),s("p",[e._v("One way to do that is to use "),s("a",{attrs:{href:"https://docs.python.org/3/library/json.html#module-json",target:"_blank",rel:"noopener noreferrer"}},[e._v("Python's "),s("code",[e._v("json")]),e._v(" module"),s("OutboundLink")],1),e._v(":")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("cat")]),e._v(" genesis_dump."),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEIGHT_TO_DUMP")]),e._v(".json "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v("|")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  python3 -c "),s("span",{pre:!0,attrs:{class:"token string"}},[e._v("'import sys, json; print(json.dumps(json.load(sys.stdin), indent=2))'")]),e._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("\\")]),e._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[e._v(">")]),e._v(" genesis_dump."),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEIGHT_TO_DUMP")]),e._v(".pretty.json\n")])])]),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),s("p",[e._v("Be aware that "),s("a",{attrs:{href:"http://stedolan.github.io/jq/",target:"_blank",rel:"noopener noreferrer"}},[e._v("jq"),s("OutboundLink")],1),e._v(", the popular JSON CLI tool, "),s("a",{attrs:{href:"https://github.com/stedolan/jq/wiki/FAQ#caveats",target:"_blank",rel:"noopener noreferrer"}},[e._v("converts all numbers to IEEE 754\n64-bit values"),s("OutboundLink")],1),e._v(" which can result in silent loss of precision and/or\nother changes.")]),e._v(" "),s("p",[e._v("Hence, we recommend avoiding its usage until this issue is resolved.")])]),e._v(" "),s("p",[e._v("Then compare the pretty-printed dumped state with the provided genesis document:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[s("span",{pre:!0,attrs:{class:"token function"}},[e._v("diff")]),e._v(" genesis_dump."),s("span",{pre:!0,attrs:{class:"token variable"}},[e._v("$HEIGHT_TO_DUMP")]),e._v(".pretty.json genesis.json\n")])])]),s("h3",{attrs:{id:"example-diff-for-the-2020-03-05-network-upgrade"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#example-diff-for-the-2020-03-05-network-upgrade"}},[e._v("#")]),e._v(" Example diff for the 2020-03-05 network upgrade")]),e._v(" "),s("p",[e._v("For the 2020-03-05 network upgrade, the "),s("code",[e._v("diff")]),e._v(" command above returns:")]),e._v(" "),s("div",{staticClass:"language-diff extra-class"},[s("pre",{pre:!0,attrs:{class:"language-diff"}},[s("code",[s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("3,4c3,4")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[e._v('<   "genesis_time": "2020-03-05T14:16:02.002875089+01:00",\n<   "chain_id": "quest-2020-02-11-1581440400",\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("---")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token inserted-arrow inserted"}},[e._v('>   "genesis_time": "2020-03-05T17:00:00.000000000Z",\n>   "chain_id": "questnet-2020-03-05-1583427600",\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("1942c1942,1945")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[e._v('<         "3": "100000000000"\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("---")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token inserted-arrow inserted"}},[e._v('>         "3": "100000000000",\n>         "4": "100000000000",\n>         "5": "100000000000",\n>         "6": "100000000000"\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("1953c1956,1961")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[e._v('<       "commission_schedule_rules": {},\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("---")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token inserted-arrow inserted"}},[e._v('>       "commission_schedule_rules": {\n>         "rate_change_interval": 1,\n>         "rate_bound_lead": 14,\n>         "max_rate_steps": 21,\n>         "max_bound_steps": 21\n>       },\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("1967,1973d1974")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[e._v('<       "disable_transfers": true,\n<       "disable_delegation": true,\n<       "undisable_transfers_from": {\n<         "OSo8hvkfyqypYniWWlVhikiVYQJC7EBsUdczBdpAjIs=": true,\n<         "ZWVxEX66b1wnY62wx5lp7bR9rF8+2tCxgmcwFs7Kg1s=": true\n<       },\n<       "fee_weight_vote": 1,\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("1975c1976,1978")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[e._v('<       "reward_factor_block_proposed": "0"\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("---")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token inserted-arrow inserted"}},[e._v('>       "reward_factor_block_proposed": "0",\n>       "fee_split_vote": "1",\n>       "fee_split_propose": "1"\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("7647c7650")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token deleted-arrow deleted"}},[e._v('<   "halt_epoch": 4839,\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("---")]),e._v("\n"),s("span",{pre:!0,attrs:{class:"token inserted-arrow inserted"}},[e._v('>   "halt_epoch": 6525,\n')]),s("span",{pre:!0,attrs:{class:"token coord"}},[e._v("7649c7652")]),e._v("\n")])])]),s("p",[e._v("We can see that the provided genesis document updated some network parameters\nbut didn't touch any other entity, account or delegation data.")]),e._v(" "),s("p",[e._v("If you obtain the same result, then you have successfully verified the provided\ngenesis document.")]),e._v(" "),s("p",[e._v("Let's break down the diff and explain what has changed.")]),e._v(" "),s("p",[e._v("The following genesis document fields will always change on a network upgrade:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("chain_id")]),e._v(": A unique ID of the network.")]),e._v(" "),s("li",[s("code",[e._v("genesis_time")]),e._v(": Time from which the genesis document is valid.")]),e._v(" "),s("li",[s("code",[e._v("halt_epoch")]),e._v(": The epoch when the node will stop functioning. We set\nthis to intentionally force an upgrade.")])]),e._v(" "),s("p",[e._v("The following fields were a particular change in this upgrade:")]),e._v(" "),s("ul",[s("li",[s("code",[e._v("staking.params.thresholds")]),e._v(": Three new staking threshold values were added for\nthree new staking threshold kinds ("),s("code",[e._v("4")]),e._v(": key manager node, "),s("code",[e._v("5")]),e._v(": compute\nruntime, "),s("code",[e._v("6")]),e._v(": key manager runtime).")]),e._v(" "),s("li",[s("code",[e._v("staking.params.commission_schedule_rules")]),e._v(": Commission schedule rules were\nadded since this upgrade enables token transfers and delegation.")]),e._v(" "),s("li",[s("code",[e._v("staking.params.disable_transfers")]),e._v(", "),s("code",[e._v("staking.params.disable_delegation")]),e._v(",\n"),s("code",[e._v("staking.params.undisable_transfers_from")]),e._v(": These fields were removed since\nthis upgrade enables token transfers and delegation.")]),e._v(" "),s("li",[s("code",[e._v("staking.params.fee_split_vote")]),e._v(", "),s("code",[e._v("staking.params.fee_split_propose")]),e._v(":\nThese two fields were added to control how a block's fee for a validator is\nsplit split between the validator that signs the block ("),s("code",[e._v("fee_split_vote")]),e._v(") and\nthe validator that proposes the block ("),s("code",[e._v("fee_split_propose")]),e._v(").")])]),e._v(" "),s("h2",{attrs:{id:"stopping-your-node"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#stopping-your-node"}},[e._v("#")]),e._v(" Stopping Your Node")]),e._v(" "),s("p",[e._v("This will depend on your process manager. You should stop your "),s("code",[e._v("oasis-node")]),e._v("\nprocess however this is done for your setup.")]),e._v(" "),s("h2",{attrs:{id:"wiping-state"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#wiping-state"}},[e._v("#")]),e._v(" Wiping State")]),e._v(" "),s("div",{staticClass:"custom-block warning"},[s("p",{staticClass:"custom-block-title"},[e._v("WARNING")]),e._v(" "),s("p",[e._v("We do not suggest that you wipe "),s("em",[e._v("all")]),e._v(" state. You might lose node identities and\nkeys if you do it this way.")])]),e._v(" "),s("p",[e._v("Before restarting your node you should wipe tendermint state. The process for\nthis is described in the "),s("RouterLink",{attrs:{to:"/operators/maintenance/wiping-node-state.html#state-wipe-and-keep-node-identity"}},[e._v("Wiping Node State")]),e._v(" document.")],1),e._v(" "),s("h2",{attrs:{id:"updating-configuration"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#updating-configuration"}},[e._v("#")]),e._v(" Updating Configuration")]),e._v(" "),s("p",[e._v("If the "),s("RouterLink",{attrs:{to:"/operators/current-testnet-parameters.html#deployment-change-log"}},[e._v("Deployment Change Log")]),e._v(" provides instructions for updating your node's\nconfiguration, update the "),s("code",[e._v("/serverdir/etc/config.yml")]),e._v(" file accordingly.")],1),e._v(" "),s("h2",{attrs:{id:"upgrading-oasis-core"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#upgrading-oasis-core"}},[e._v("#")]),e._v(" Upgrading Oasis Core")]),e._v(" "),s("p",[e._v("Before starting your node again, make sure you upgrade your "),s("code",[e._v("oasis-node")]),e._v(" binary\nto the current version specified in the "),s("RouterLink",{attrs:{to:"/operators/current-testnet-parameters.html"}},[e._v("Current Testnet Parameters")]),e._v(".")],1),e._v(" "),s("h2",{attrs:{id:"starting-the-node"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#starting-the-node"}},[e._v("#")]),e._v(" Starting the Node")]),e._v(" "),s("p",[e._v("This will depend on your process manager. If you don't have a process manager,\nyou should use one. However, to start the node without a process manager you can\nstart the "),s("code",[e._v("oasis-node")]),e._v(" like so:")]),e._v(" "),s("div",{staticClass:"language-bash extra-class"},[s("pre",{pre:!0,attrs:{class:"language-bash"}},[s("code",[e._v("oasis-node --config /serverdir/etc/config.yml\n")])])]),s("h2",{attrs:{id:"cleaning-up"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#cleaning-up"}},[e._v("#")]),e._v(" Cleaning Up")]),e._v(" "),s("p",[e._v("After you're comfortable with your node deployment, you can clean up the\n"),s("code",[e._v("genesis_dump.$HEIGHT_TO_DUMP.json")]),e._v(" and\n"),s("code",[e._v("genesis_dump.$HEIGHT_TO_DUMP.pretty.json")]),e._v(" files.")])])}),[],!1,null,null,null);t.default=n.exports}}]);