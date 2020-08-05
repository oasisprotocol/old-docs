const fs = require('fs');

module.exports = {
  title: 'Oasis Dev Docs',
  description: 'Oasis Developer Documentation',
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],
    [
      'script',
      {
        async: 'async',
        src: 'https://www.googletagmanager.com/gtag/js?id=UA-116576458-1',
      },
    ],
    [
      'script',
      {},
      `window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments);}
       gtag('js', new Date());
       gtag('config', 'UA-116576458-1');`,
    ],
  ],
  serviceWorker: true,
  themeConfig: {
    logo: '/logo.svg',
    nav: [
      { text: 'Home', link: 'https://oasisprotocol.org' },
      {
        text: 'Support',
        link:
          'https://join.slack.com/t/oasiscommunity/shared_invite/enQtNjQ5MTA3NTgyOTkzLWIxNTg1ZWZmOTIwNmQ2MTg1YmU0MzgyMzk3OWM2ZWQ4NTQ0ZDJkNTBmMTdlM2JhODllYjg5YmJkODc2NzgwNTg',
      },
    ],
    sidebar: [
      {
        title: 'Welcome to Oasis',
        collapsable: true,
        children: [
          {
            title: 'Introduction',
            collapsable: true,
            children: [['/overview', 'What is Oasis?']],
          },
          {
            title: 'Network Overview',
            collapsable: true,
            children: [
              [
                '/operators/architecture-overview',
                'Network Architecture Overview',
              ],
            ],
          },
        ],
      },
      {
        title: 'Run a Node',
        collapsable: true,
        children: [
          {
            title: 'Set Up Your Machine',
            collapsable: true,
            children: [
              ['/operators/overview', 'Network Operator Overview'],
              ['/operators/current-testnet-parameters', 'Network Parameters'],
              [
                '/operators/hardware-recommendations',
                'Node Hardware Recommendations',
              ],
              ['/operators/prerequisites', 'Prerequisites'],
              [
                '/operators/running-node-on-amber-network',
                'Running a Node on the Amber Network',
              ],
              [
                '/operators/creating-an-entity-package',
                'Creating an Entity Package',
              ],
              ['/operators/stake-management', 'Stake Management'],
              ['/operators/sentry-node', 'Sentry Nodes'],
            ],
          },
          {
            title: 'Node Maintenance',
            collapsable: true,
            children: [
              ['/operators/maintenance/wiping-node-state', 'Wipe Node State'],
              [
                '/operators/maintenance/checking-account-nonce',
                "Check Your Account's Nonce",
              ],
              [
                '/operators/maintenance/handling-network-upgrades',
                'Handle Network Upgrades',
              ],
              [
                '/operators/maintenance/adding-removing-nodes',
                'Add or Remove Nodes',
              ],
              ['/operators/troubleshooting', 'Troubleshooting'],
            ],
          },
          {
            title: 'Validator Economics',
            collapsable: true,
            children: [
              ['/operators/incentives-proposal', 'Network Incentives'],
            ],
          },
          {
            title: 'Community Node Program',
            collapsable: true,
            children: [
              [
                '/operators/community-node',
                'What is the Community Node Program?',
              ],
            ],
          },
        ],
      },
      {
        title: 'Pre-Mainnet Initiatives',
        collapsable: true,
        children: [
          {
            title: 'Amber Network',
            collapsable: true,
            children: [
              ['/operators/amber-network', 'What is the Amber Network?'],
              [
                '/operators/running-node-on-amber-network',
                'Run a Node on the Amber Network',
              ],
              [
                '/operators/migrating-questnet-entities',
                'Migrate Your QuestNet Entity for the Amber Network',
              ],
            ],
          },
          {
            title: 'The Quest',
            collapsable: true,
            children: [['/operators/the-quest-rules', 'What is The Quest?']],
          },
        ],
      },
      {
        title: 'Wallet Support',
        collapsable: true,
        children: [['/hsm/ledger', 'Oasis Ledger Wallet']],
      },
      {
        title: 'Community Resources',
        collapsable: true,
        children: [['/operators/community-resources', 'Community Tools']],
      },
      {
        title: 'Oasis Core Developer Docs',
        path:
          'https://github.com/oasisprotocol/oasis-core/blob/master/docs/index.md',
      },
    ],
    repo: 'oasisprotocol',
    docsRepo: 'oasisprotocol/docs',
    docsDir: 'src',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: 'Help us improve this page!',
  },
  chainWebpack(config, isServer) {
    config.plugin('extraFiles').use(function () {
      return function () {
        fs.writeFile(
          '.vuepress/dist/CNAME',
          'docs.oasis.dev\n',
          function () {},
        );
        fs.writeFile('.vuepress/dist/.nojekyll', '', function () {}); // thx github
      };
    });
  },
};
