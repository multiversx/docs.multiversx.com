/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  // tutorialSidebar: [{ type: "autogenerated", dirName: "." }],

  // But you can create a sidebar manually
  /*
  tutorialSidebar: [
    'intro',
    'hello',
    {
      type: 'category',
      label: 'Tutorial',
      items: ['tutorial-basics/create-a-document'],
    },
  ],
   */

  docs: {
    "Welcome to MultiversX": ["welcome/welcome-to-multiversx"],
    "Learn about MultiversX": [
      "learn/getting-started",
      "learn/multiversx-ecosystem",
      "learn/EGLD",
      "learn/architecture-overview",
      "learn/entities",
      "learn/chronology",
      "learn/consensus",
      "learn/sharding",
      "learn/space-vm",
      "learn/transactions",
      "learn/economics",
    ],
    Developers: [
      "developers/overview",
      {
        type: "category",
        label: "Tutorials",
        items: [
          "developers/tutorials/your-first-dapp",
          "developers/tutorials/your-first-microservice",
          "developers/tutorials/crowdfunding-p1",
          "developers/tutorials/crowdfunding-p2",
          "developers/tutorials/staking-contract",
          "developers/tutorials/energy-dao",
          "developers/tutorials/dex-walkthrough",
          "developers/tutorials/wallet-connect-v2-migration",
          "developers/tutorials/interactors-guide",
          "developers/tutorials/chain-simulator-adder",
          "developers/tutorials/eth-to-mvx",
        ],
      },
      {
        type: "category",
        label: "MultiversX Stack",
        items: [
          {
            type: "category",
            label: "Development Frameworks",
            items: [
              {
                type: "category",
                label: "Rust Development Framework",
                items: [
                  "developers/smart-contracts",
                  {
                    type: "category",
                    label: "Rust Developer reference",
                    items: [
                      "developers/developer-reference/sc-annotations",
                      "developers/developer-reference/sc-modules",
                      "developers/developer-reference/sc-payments",
                      "developers/developer-reference/upgrading-smart-contracts",
                      "developers/developer-reference/sc-api-functions",
                      "developers/developer-reference/storage-mappers",
                      "developers/developer-reference/sc-to-sc-calls",
                      "developers/developer-reference/sc-messages",
                      "developers/developer-reference/sc-random-numbers",
                    ],
                  },
                  {
                    type: "category",
                    label: "Transaction Syntax",
                    items: [
                      "developers/transactions/tx-overview",
                      "developers/transactions/tx-env",
                      "developers/transactions/tx-from",
                      "developers/transactions/tx-to",
                      "developers/transactions/tx-payment",
                      "developers/transactions/tx-gas",
                      "developers/transactions/tx-data",
                      "developers/transactions/tx-proxies",
                      "developers/transactions/tx-result-handlers",
                      "developers/transactions/tx-run",
                      "developers/transactions/tx-migration",
                      "developers/transactions/tx-legacy-calls",
                    ],
                  },
                  {
                    type: "category",
                    label: "Data",
                    items: [
                      "developers/data/serialization-overview",
                      "developers/data/simple-values",
                      "developers/data/composite-values",
                      "developers/data/custom-types",
                      "developers/data/defaults",
                      "developers/data/multi-values",
                      "developers/data/code-metadata",
                      "developers/data/abi",
                    ],
                  },
                  {
                    type: "category",
                    label: "Rust Developers Best Practices",
                    items: [
                      "developers/best-practices/best-practices-basics",
                      "developers/best-practices/biguint-operations",
                      "developers/best-practices/managed-decimal",
                      "developers/best-practices/the-dynamic-allocation-problem",
                    ],
                  },
                  {
                    type: "category",
                    label: "Configuration & Tooling",
                    items: [
                      "developers/meta/sc-meta",
                      "developers/meta/sc-build-reference",
                      "developers/meta/sc-config",
                      "developers/meta/sc-meta-cli",
                      "developers/meta/sc-allocator",
                      "developers/meta/rust-nightly",
                    ],
                  },
                  {
                    type: "category",
                    label: "Interactors",
                    items: [
                      "developers/meta/interactor/interactors-overview",
                      "developers/meta/interactor/interactors-example",
                    ],
                  },
                  {
                    type: "category",
                    label: "Testing & Debugging",
                    items: [
                      "developers/testing/testing-overview",
                      {
                        type: "category",
                        label: "Rust testing",
                        items: [
                          "developers/testing/rust/sc-test-overview",
                          "developers/testing/rust/sc-test setup",
                          "developers/testing/rust/sc-blackbox-calls",
                          "developers/testing/rust/sc-blackbox-example",
                          "developers/testing/rust/whitebox-legacy",
                          "developers/testing/rust/whitebox-legacy-functions-reference",
                        ],
                      },
                      "developers/testing/sc-debugging",
                      {
                        type: "category",
                        label: "MANDOS",
                        items: [
                          "developers/testing/scenario/concept",
                          "developers/testing/scenario/structure-json",
                          "developers/testing/scenario/values-simple",
                          "developers/testing/scenario/values-complex",
                          "developers/testing/scenario/running-scenarios",
                          "developers/testing/scenario/generating-scenarios",
                        ],
                      },
                      "developers/testing/testing-in-go",
                    ],
                  },
                  {
                    type: "category",
                    label: "Architecture",
                    items: [
                      "developers/architecture/architecture-overview",
                      "developers/architecture/architecture-api",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "category",
            label: "SDKs",
            items: [
              {
                type: "category",
                label: "Python SDK",
                items: [
                  "sdk-and-tools/sdk-py/sdk-py",
                  {
                    type: "category",
                    label: "Cookbook (versioned)",
                    link: {
                      type: "doc",
                      id: "sdk-and-tools/sdk-py/sdk-py-cookbook"
                    },
                    items: [
                      "sdk-and-tools/sdk-py/sdk-py-cookbook-v0",
                      "sdk-and-tools/sdk-py/sdk-py-cookbook",
                    ]
                  },
                  "sdk-and-tools/sdk-py/installing-mxpy",
                  "sdk-and-tools/sdk-py/mxpy-cli",
                  "sdk-and-tools/sdk-py/smart-contract-interactions",
                  "sdk-and-tools/sdk-py/sdk-py-migration-guides",
                ],
              },
              {
                type: "category",
                label: "Javascript SDK",
                items: [
                  "sdk-and-tools/sdk-js/sdk-js",
                  {
                    label: "Cookbook",
                    type: "doc",
                    id: "sdk-and-tools/sdk-js/sdk-js-cookbook-v13",
                  },
                  {
                    type: "category",
                    label: "Cookbook (versioned)",
                    link: {
                      type: "doc",
                      id: "sdk-and-tools/sdk-js/sdk-js-cookbook-versions"
                    },
                    items: [
                      "sdk-and-tools/sdk-js/sdk-js-cookbook-v12",
                      "sdk-and-tools/sdk-js/sdk-js-cookbook-v13",
                    ]
                  },
                  "sdk-and-tools/sdk-js/extending-sdk-js",
                  "sdk-and-tools/sdk-js/writing-and-testing-sdk-js-interactions",
                  "sdk-and-tools/sdk-js/sdk-js-migration-guides",
                  "sdk-and-tools/sdk-js/sdk-js-signing-providers",
                ],
              },
              {
                type: "category",
                label: "NestJS SDK",
                items: [
                  "sdk-and-tools/sdk-nestjs/sdk-nestjs",
                  "sdk-and-tools/sdk-nestjs/sdk-nestjs-auth",
                  "sdk-and-tools/sdk-nestjs/sdk-nestjs-cache",
                  "sdk-and-tools/sdk-nestjs/sdk-nestjs-monitoring",
                ],
              },
              "sdk-and-tools/sdk-rust",
              "sdk-and-tools/sdk-go",
              "sdk-and-tools/mxjava",
              {
                type: "category",
                label: "dApp SDK",
                items: [
                  "sdk-and-tools/sdk-dapp/sdk-dapp",
                  {
                    type: "category",
                    label: "Internal Processes",
                    items: ["sdk-and-tools/sdk-dapp/internal-processes/guardians"],
                  },
                ],
              },
              "sdk-and-tools/erdcpp",
              "sdk-and-tools/erdkotlin",
              "sdk-and-tools/sdk-js-wallet-cli"
            ],
          },
          {
            type: "category",
            label: "MultiversX API",
            items: [
              {
                type: "category",
                label: "Rest API",
                items: [
                  "sdk-and-tools/rest-api/rest-api",
                  "sdk-and-tools/rest-api/multiversx-api",
                  {
                    type: "category",
                    label: "MultiversX Gateway",
                    items: [
                      "sdk-and-tools/rest-api/gateway-overview",
                      "sdk-and-tools/proxy",
                      "sdk-and-tools/rest-api/addresses",
                      "sdk-and-tools/rest-api/transactions",
                      "sdk-and-tools/rest-api/network",
                      "sdk-and-tools/rest-api/nodes",
                      "sdk-and-tools/rest-api/blocks",
                      "sdk-and-tools/rest-api/virtual-machine",
                      "sdk-and-tools/rest-api/versions-and-changelog",
                    ],
                  },
                ],
              },
            ],
          },
          {
            type: "category",
            label: "Tools",
            items: [
              "sdk-and-tools/overview",
              {
                type: "category",
                label: "Elasticsearch",
                items: [
                  "sdk-and-tools/elastic-search",
                  "sdk-and-tools/indexer",
                  "sdk-and-tools/es-index-wrong-mapping",
                  {
                    type: "category",
                    label: "Elasticsearch indices",
                    items: [
                      "sdk-and-tools/indices/es-index-accounts",
                      "sdk-and-tools/indices/es-index-accountsesdt",
                      "sdk-and-tools/indices/es-index-accountsesdthistory",
                      "sdk-and-tools/indices/es-index-accountshistory",
                      "sdk-and-tools/indices/es-index-blocks",
                      "sdk-and-tools/indices/es-index-delegators",
                      "sdk-and-tools/indices/es-index-epochinfo",
                      "sdk-and-tools/indices/es-index-logs",
                      "sdk-and-tools/indices/es-index-miniblocks",
                      "sdk-and-tools/indices/es-index-operations",
                      "sdk-and-tools/indices/es-index-rating",
                      "sdk-and-tools/indices/es-index-receipts",
                      "sdk-and-tools/indices/es-index-rounds",
                      "sdk-and-tools/indices/es-index-scdeploys",
                      "sdk-and-tools/indices/es-index-scresults",
                      "sdk-and-tools/indices/es-index-tags",
                      "sdk-and-tools/indices/es-index-tokens",
                      "sdk-and-tools/indices/es-index-transactions",
                      "sdk-and-tools/indices/es-index-validators",
                    ],
                  },
                ],
              },
              "sdk-and-tools/notifier",
              "sdk-and-tools/chain-simulator",
              "sdk-and-tools/google-bigquery",
              "sdk-and-tools/devcontainers",
              {
                type: "category",
                label: "Troubleshooting",
                items: [
                  "sdk-and-tools/troubleshooting/troubleshooting",
                  "sdk-and-tools/troubleshooting/rust-setup",
                  "sdk-and-tools/troubleshooting/ide-setup",
                  "sdk-and-tools/troubleshooting/multiplatform",
                ],
              }
            ],
          },
          {
            type: "category",
            label: "Event logs",
            items: [
              "developers/event-logs/contract-call-events",
              "developers/event-logs/contract-deploy-events",
              "developers/event-logs/esdt-events",
              "developers/event-logs/execution-events",
              "developers/event-logs/system-delegation-events",
            ],
          },
          {
            type: "category",
            label: "Blockchain Operations",
            items: [
              "developers/account-storage",
              "developers/built-in-functions",
              "developers/constants",
              "developers/contract-api-limits",
              "developers/creating-wallets",
              {
                type: "category",
                label: "Gas and Fees",
                items: [
                  "developers/gas-and-fees/overview",
                  "developers/gas-and-fees/egld-transfers",
                  "developers/gas-and-fees/system-smart-contracts",
                  "developers/gas-and-fees/user-defined-smart-contracts",
                ],
              },
              "developers/guard-accounts",
              "developers/relayed-transactions",
              "developers/reproducible-contract-builds",
              "developers/sc-calls-format",
              "developers/setup-local-testnet",
              "developers/setup-local-testnet-advanced",
              {
                type: "category",
                label: "Signing Transactions",
                items: [
                  "developers/signing-transactions/signing-transactions",
                  "developers/signing-transactions/tools-for-signing",
                  "developers/signing-transactions/signing-programmatically",
                ],
              },
            ],
          },
        ],
      },
      {
        type: "category",
        label: "Token Standard - ESDT",
        items: ["tokens/intro", "tokens/fungible-tokens", "tokens/nft-tokens"],
      },
      {
        type: "category",
        label: "Guidelines",
        items: ["developers/guidelines/react-development"],
      },
    ],
    Validators: [
      "validators/overview",
      "validators/system-requirements",
      {
        type: "category",
        label: "Install a Node",
        items: [
          "validators/nodes-scripts/config-scripts",
          "validators/nodes-scripts/install-update",
        ],
      },
      {
        type: "category",
        label: "Upgrade a Node",
        items: [
          "validators/node-upgrades",
        ],
      },
      {
        type: "category",
        label: "Manage a Node",
        items: [
          "validators/nodes-scripts/manage-node",
          "validators/nodes-scripts/use-docker",
          "validators/rating",
          "validators/redundancy",
          "validators/node-configuration",
          "validators/node-operation-modes",
          "validators/import-db",
          "validators/node-cli",
          "validators/node-databases",
          "validators/staking/staking",
          "validators/staking-v4",
          "validators/staking/unjailing",
          "validators/staking/staking-smart-contract",
        ],
      },
      {
        type: "category",
        label: "The Delegation Manager",
        items: [
          "validators/delegation-manager",
          "economics/staking-providers-apr",
          "validators/staking/convert-existing-validator-into-staking-provider",
          "validators/staking/merge-validator-delegation-sc",
        ],
      },
      {
        type: "category",
        label: "Keys management",
        items: [
          "validators/key-management/validator-keys",
          "validators/key-management/wallet-keys",
          "validators/key-management/protect-keys",
          "validators/key-management/multikey-nodes",
        ],
      },
      {
        type: "category",
        label: "FAQs and Tools",
        items: ["validators/faq", "validators/useful-links"],
      },
    ],
    Integrators: [
      "integrators/overview",
      {
        type: "category",
        label: "Integrate EGLD",
        items: ["integrators/egld-integration-guide"],
      },
      {
        type: "category",
        label: "Integrate ESDT tokens",
        items: ["integrators/esdt-tokens-integration-guide"],
      },
      {
        type: "category",
        label: "Host MultiversX infrastructure",
        items: [
          "integrators/observing-squad",
          "integrators/deep-history-squad",
          "integrators/snapshotless-observing-squad",
          "integrators/advanced-observer-settings"
        ],
      },
      {
        type: "category",
        label: "Blockchain Operations",
        items: [
          "integrators/accounts-management",
          "integrators/creating-transactions",
          "integrators/querying-the-blockchain",
        ],
      },
      "integrators/walletconnect-json-rpc-methods",
      "integrators/faq",
    ],
    Advanced: [
      {
        type: "category",
        label: "Ad-Astra Bridge",
        items: [
          "bridge/architecture",
          "bridge/transfer-flows",
          "bridge/token-types",
          "bridge/whitelist-requirements",],
      },
      {
        type: "category",
        label: "Axelar Bridge",
        items: [
          "bridge/axelar",],
      },
      {
        type: "category",
        label: "Sovereign Chains",
        items: [
          "sovereign/overview",
          {
            type: "category",
            label: "Introduction",
            items: [
              "sovereign/concept",
              "sovereign/key-components",
              "sovereign/disclaimer",],
          },
          {
            type: "category",
            label: "Prerequisites",
            items: [
              "sovereign/system-requirements",
              "sovereign/software-dependencies",],
          },
          {
            type: "category",
            label: "Setup Guide",
            items: [
              "sovereign/one-click-deployment",
              "sovereign/local-setup",
              "sovereign/distributed-setup",],
          },
          "sovereign/custom-configurations",
          {
            type: "category",
            label: "Services",
            items: [
              "sovereign/services",
              "sovereign/sovereign-api",
              "sovereign/sovereign-wallet",
              "sovereign/sovereign-explorer",],
          },
          {
            type: "category",
            label: "Managing a Sovereign Chain",
            items: [
              "sovereign/managing-sovereign",
              "sovereign/token-management",],
          },
          {
            type: "category",
            label: "Economics",
            items: [
              "sovereign/token-economics",
              "sovereign/restaking",
              "sovereign/dual-staking",],
          },
          "sovereign/governance",
          "sovereign/testing",
          "sovereign/security",
          {
            type: "category",
            label: "VMs",
            items: [
              "sovereign/vm-intro",
              "sovereign/standalone-evm",
              "sovereign/other-vm",
            ],
          },
          {
            type: "category",
            label: "Interoperability",
            items: [
              "sovereign/interoperability",
              "sovereign/ethereum-l2",
              "sovereign/bitcoin-l2",
              "sovereign/solana-l2",
            ],
          },
          "sovereign/validators",
        ],
      },
      {
        type: "category",
        label: "Governance",
        items: [
          "governance/overview",
          "governance/governance-interaction",
        ],
      },
      {
        type: "category",
        label: "User Guides",
        items: [
          {
            type: "category",
            label: "Wallet",
            items: [
              "wallet/overview",
              "wallet/web-wallet",
              "wallet/xalias",
              "wallet/wallet-extension",
              "wallet/webhooks",
              "wallet/ledger",
              "wallet/xportal",
              "wallet/create-a-fungible-token",
              "wallet/keystore",
            ],
          },
        ],
      },
    ],
    Terminology: ["welcome/terminology"],
  },
};

module.exports = sidebars;
