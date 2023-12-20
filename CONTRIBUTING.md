# Contributing to Privy

First of all, thank you for taking some of your time to contribute to the project. You're awesome 🦆👍

## Table of Contents

- [Get started](#get-started)
- [Run the tests](#run-the-tests)
- [Run it locally](#run-it-locally)
- [Open a PR and add acknowledge your contribution](#open-a-pr-and-add-acknowledge-your-contribution)
- [Other Commands](#other-commands)

## Get started

> Pre-requisite: you have installed [git][install-git], [node][install-node] and [pnpm][install-pnpm].

1. Clone the repo: `git clone git@github.com:srikanth235/privy.git`
1. Go into the cloned repository: `cd privy`
1. Install dependencies: `pnpm install`
1. Build the extension: `pnpm build-all`

The project uses [TypeScript][typescript], [Vitest][vitest] for the tests and [Prettier][prettier] for the formatting.

## Run the tests

You can run tests with `pnpm test`

To run them in watch mode, use: `pnpm test-watch`.

## Run it locally

You can use [VS Code's built-in debugger][vscode-debug-extension] on the project to try out your local extension.

To build the project, press `F5`. It should run the `run - app/vscode` task.

This will:

1. Build the project
2. Open a new "Extension Development Host" VS Code window, with your local code overriding your "Privy" extension

It's handy to test your changes in integration with VS Code API.

### Useful resources to start changing the code

- [VS Code Extension API documentation][vscode-extension-docs] is a good start
- [OpenAI API documentation][openai-docs] is also useful if you plan to change the prompts

### Code Style

Style formatting is managed by [Prettier][prettier]. It runs as a pre-commit hook, so you shouldn't have to worry about it 👐

## Open a PR and add acknowledge your contribution

You can open a Pull-Request at any time. It can even be a draft if you need to ask for guidance and help. Actually, we'd be pretty happy to assist you going in the best direction!

Once everything is ready, open a Pull-Request (if it's not already done) and ask for a review. We'll do our best to review it asap.

Finally, [use all-contributors bot command][all-contributors-bot-command] to add yourself to the list of contributors. It's very easy to do, you basically need to mention the bot in a comment of your PR.

Whether it's code, design, typo or documentation, every contribution is welcomed! So again, thank you very, very much 🦆

## More documentation

- You can find a brief introduction to the architecture of this extension [here][architecture-doc].

- You can find more info about adding AI Chat templates [here][template-doc].

## Other Commands

- **Lint**: `pnpm nx lint --skip-nx-cache`
- **Package**: `pnpm nx run vscode:package`‍

<!-- Links -->

[install-git]: https://git-scm.com/book/en/v2/Getting-Started-Installing-Git
[install-node]: https://nodejs.org/en/download/
[install-pnpm]: https://pnpm.io/installation
[typescript]: https://www.typescriptlang.org/
[vitest]: https://vitest.dev/
[prettier]: https://prettier.io
[vscode-extension-docs]: https://code.visualstudio.com/api
[openai-docs]: https://platform.openai.com/docs/introduction
[vscode-debug-extension]: https://code.visualstudio.com/api/get-started/your-first-extension#debugging-the-extension
[all-contributors-bot-command]: https://allcontributors.org/docs/en/bot/usage#all-contributors-add
[architecture-doc]: https://github.com/srikanth235/privy/blob/main/doc/architecture.md
[template-doc]: https://github.com/srikanth235/privy/blob/main/doc/privy-templates.md
