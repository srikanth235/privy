<div align="center">
  <h1><b>💬 Privy</b></h1>
  <p>
    <strong>An open-source alternative to GitHub copilot that runs locally.</strong>
  </p>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/>
  <img src="https://img.shields.io/github/v/release/srikanth235/privy" alt="GitHub: Releases"/>
  <img src="https://img.shields.io/github/issues/srikanth235/privy" alt="GitHub Issues"/>
  <img src="https://img.shields.io/github/stars/srikanth235/privy" alt="GitHub Stars"/>
  <a href="https://twitter.com/getprivydev"  style="text-decoration: none; outline: none"><img src="https://img.shields.io/twitter/url/https/twitter.com/getprivydev.svg?style=social&label=%20%40getprivydev" alt="Twitter: @getprivydev"/></a>
  <a href="https://discord.gg/wykDxGyUHA"  style="text-decoration: none; outline: none">
  <img src="https://dcbadge.vercel.app/api/server/vAcVQ7XhR2?style=flat&compact=true" alt="Discord"/>
  </a>
</div>

## Pre-requisites

If you haven't done already, please pick one of the following platforms to run LLM of your choice on your system **locally**.

- [Ollama](https://github.com/jmorganca/ollama) (Highly Recommended)
- [llamafile](https://github.com/Mozilla-Ocho/llamafile) (Experimental)
- [llama.cpp](https://github.com/ggerganov/llama.cpp) (Experimental)

Some of the popular LLMs that we recommend are:

- [DeepSeek Coder](https://github.com/deepseek-ai/DeepSeek-Coder)
- [CodeLLama](https://github.com/facebookresearch/codellama)
- [Mistral](https://mistral.ai/)

## Quick Install

You can install Privy extension from the Visual Studio Code Marketplace or from the Open VSX Registry.

- [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=privy.privy-vscode)
- [Open VSX Registry](https://open-vsx.org/extension/Privy/privy-vscode)

## Configuration Options

Please set the following options in the **settings** for Privy extension.

- **privy.provider**(`required`): Pick the platform that is being used for running LLMs locally. There is support for using OpenAI, but this will affect the privacy aspects of the solution. The default is `Ollama`.
- **privy.providerUrl**(`required`): The URL of the platform that is being used for running LLMs locally. The default is `http://localhost:11434`.
- **privy.autocomplete.mode**: Use this setting for enabling/disabling autocompletion feature.
- **privy.autocomplete.model**: Input the name of local Ollama model that you want to use for autocompletion. Supported formats are DeepSeek Coder, LLama & Stable Code. Our recommendation is deepseek-coder:1.3b-base as it requires least amount of VRAM. You can customize based on your hardware setup.
- **privy.autocomplete.debounceWait**: Use this for setting the time gap before triggering the next completion in milliseconds. Default is 300 ms.
- **privy.model**: Select the LLM that you want to use. Currently, supports Mistral and CodeLLama. If you want to use other LLMs, please select `custom` and configure `privy.customModel` accordingly.
- **privy.customModel**: If you want to pick any other models running on your Ollama, please input their name.

# Features

[Autcompletion](#autocompletion) |[AI Chat](#ai-chat) | [Explain Code](#explain-code) | [Generate Tests](#generate-tests) | [Find Bugs](#find-bugs) | [Diagnose Errors](#diagnose-errors)

## Autocompletion

Privy automatically understands the code context and shows some code recommendations based on it's understanding. Accept or reject them as you wish.

## AI Chat

Chat with Privy about your code and software development topics. Privy knows the editor selection at the time of conversation start.

1. You can start a chat using one of the following options:
   1. Run the `Privy: Start Chat 💬` command from the command palette.
   1. Select the `Privy > Start Chat 💬` entry in the editor context menu (right-click, requires selection).
   1. Use the "Start new chat" button in the side panel.
   1. Use the keyboard shortcut: `Ctrl + Cmd + C` (Mac) or `Ctrl + Alt + C` (Windows / Linux).
   1. Press 💬 on the MacOS touch bar (if available).
1. Ask a question in the new conversation thread in the Privy sidebar panel.

## Explain Code

Ask Privy to explain the selected code.

1. Select the code that you want to have explained in the editor.
1. Invoke the "Explain Code" command using one of the following options:
   1. Run the `Privy: Explain Code 💬` command from the command palette.
   1. Select the `Privy > Explain Code 💬` entry in the editor context menu (right-click).
1. The explanations shows up in the Privy sidebar panel.

## Generate Unit Test

Generate a unit test for the selected code.

1. Select a piece of code in the editor for which you want to generate a test case.
2. Invoke the "Generate Unit Test" command using one of the following options:
   1. Run the `Privy: Generate Unit Test 💬` command from the command palette.
   1. Select the `Privy > Generate Unit Test 💬` entry in the editor context menu (right-click).
3. The test case shows up in a new editor tab. You can refine it in the conversation panel.

## Find Bugs

Identify potential defects in your code.

1. Select a piece of code that you want to check for bugs.
2. Invoke the "Find Bugs" command using one of the following options:
   1. Run the `Privy: Find Bugs 💬` command from the command palette.
   1. Select the `Privy > Find Bugs 💬` entry in the editor context menu (right-click).
3. Privy will show you a list of potential bugs in the chat window. You can refine it in the conversation panel.

## Diagnose Errors

Let Privy identify error causes and suggest fixes to fix compiler and linter errors faster.

1. Select a piece of code in the editor that contains errors.
2. Invoke the "Diagnose Errors" command using one of the following options:
   1. Run the `Privy: Diagnose Errors 💬` command from the command palette.
   1. Select the `Privy > Diagnose Errors 💬` entry in the editor context menu (right-click).
3. A potential solution will be shown in the chat window. You can refine it in the conversation panel.

# Tips and Tricks

Understanding these concepts will help you get the most out of Privy.

- **Be specific**.
  When you ask for, e.g., code changes, include concrete names and describe the desired outcome. Avoid vague references.
- **Provide context**.
  You can include the programming language ("in Rust") or other relevant contexts for basic questions.
  You can select a meaningful code snippet for code explanations and error diagnosis.
- **Do not trust answers blindly**.
  It's a big step for Privy to be able to respond to your questions.
  It might respond with inaccurate answers, especially when talking about
  less well-known topics or when the conversation gets too detailed.
- **Use different chat threads for different topics**.
  Shorter threads with specific topics will help Privy respond more accurately.

## Credits

- [RubberDuck AI](https://github.com/rubberduck-ai/rubberduck-vscode) - This project is heavily inspired by RubberDuck AI's work, and we're indebted to them for building on top of it.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="25%"><a href="http://larsgrammel.de"><img src="https://avatars0.githubusercontent.com/u/205036?v=4?s=100" width="100px;" alt="Lars Grammel"/><br /><sub><b>Lars Grammel</b></sub></a><br /><a href="#ideas-lgrammel" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=lgrammel" title="Code">💻</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=lgrammel" title="Documentation">📖</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/pulls?q=is%3Apr+reviewed-by%3Algrammel" title="Reviewed Pull Requests">👀</a> <a href="#question-lgrammel" title="Answering Questions">💬</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3Algrammel" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="25%"><a href="http://iainvm.github.io"><img src="https://avatars.githubusercontent.com/u/2806167?v=4?s=100" width="100px;" alt="Iain Majer"/><br /><sub><b>Iain Majer</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3Aiainvm" title="Bug reports">🐛</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=iainvm" title="Code">💻</a></td>
      <td align="center" valign="top" width="25%"><a href="https://nicoespeon.com"><img src="https://avatars0.githubusercontent.com/u/1094774?v=4?s=100" width="100px;" alt="Nicolas Carlo"/><br /><sub><b>Nicolas Carlo</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=nicoespeon" title="Code">💻</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=nicoespeon" title="Documentation">📖</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3Anicoespeon" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/RatoGBM"><img src="https://avatars.githubusercontent.com/u/80184495?v=4?s=100" width="100px;" alt="RatoGBM"/><br /><sub><b>RatoGBM</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3ARatoGBM" title="Bug reports">🐛</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://www.lionelokpeicha.dev/"><img src="https://avatars.githubusercontent.com/u/60504466?v=4?s=100" width="100px;" alt="Lionel Okpeicha"/><br /><sub><b>Lionel Okpeicha</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3Alohnsonok" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/MercerK"><img src="https://avatars.githubusercontent.com/u/13123338?v=4?s=100" width="100px;" alt="MercerK"/><br /><sub><b>MercerK</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3AMercerK" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/lundeen-bryan"><img src="https://avatars.githubusercontent.com/u/13512507?v=4?s=100" width="100px;" alt="Lundeen.Bryan"/><br /><sub><b>Lundeen.Bryan</b></sub></a><br /><a href="#ideas-lundeen-bryan" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/DucoG"><img src="https://avatars.githubusercontent.com/u/67788719?v=4?s=100" width="100px;" alt="DucoG"/><br /><sub><b>DucoG</b></sub></a><br /><a href="#ideas-DucoG" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/sbstn87"><img src="https://avatars.githubusercontent.com/u/37237675?v=4?s=100" width="100px;" alt="sbstn87"/><br /><sub><b>sbstn87</b></sub></a><br /><a href="#ideas-sbstn87" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://dev.page/tennox"><img src="https://avatars.githubusercontent.com/u/2084639?v=4?s=100" width="100px;" alt="Manuel"/><br /><sub><b>Manuel</b></sub></a><br /><a href="#ideas-tennox" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/alessandro-newzoo"><img src="https://avatars.githubusercontent.com/u/47320294?v=4?s=100" width="100px;" alt="alessandro-newzoo"/><br /><sub><b>alessandro-newzoo</b></sub></a><br /><a href="#ideas-alessandro-newzoo" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/Void-n-Null"><img src="https://avatars.githubusercontent.com/u/70048414?v=4?s=100" width="100px;" alt="Void&Null"/><br /><sub><b>Void&Null</b></sub></a><br /><a href="#ideas-Void-n-Null" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://github.com/WittyDingo"><img src="https://avatars.githubusercontent.com/u/63050074?v=4?s=100" width="100px;" alt="WittyDingo"/><br /><sub><b>WittyDingo</b></sub></a><br /><a href="#ideas-WittyDingo" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/eva-lam"><img src="https://avatars.githubusercontent.com/u/29745387?v=4?s=100" width="100px;" alt="Eva"/><br /><sub><b>Eva</b></sub></a><br /><a href="#ideas-eva-lam" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/AlexeyLavrentev"><img src="https://avatars.githubusercontent.com/u/105936590?v=4?s=100" width="100px;" alt="AlexeyLavrentev"/><br /><sub><b>AlexeyLavrentev</b></sub></a><br /><a href="#ideas-AlexeyLavrentev" title="Ideas, Planning, & Feedback">🤔</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/linshu123"><img src="https://avatars.githubusercontent.com/u/2569559?v=4?s=100" width="100px;" alt="linshu123"/><br /><sub><b>linshu123</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=linshu123" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="25%"><a href="https://unquietwiki.com"><img src="https://avatars.githubusercontent.com/u/1007551?v=4?s=100" width="100px;" alt="Michael Adams"/><br /><sub><b>Michael Adams</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=unquietwiki" title="Code">💻</a> <a href="https://github.com/rubberduck-ai/rubberduck-vscode/issues?q=author%3Aunquietwiki" title="Bug reports">🐛</a></td>
      <td align="center" valign="top" width="25%"><a href="https://github.com/restlessronin"><img src="https://avatars.githubusercontent.com/u/88921269?v=4?s=100" width="100px;" alt="restlessronin"/><br /><sub><b>restlessronin</b></sub></a><br /><a href="https://github.com/rubberduck-ai/rubberduck-vscode/commits?author=restlessronin" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

## Code Contributions

### [Contributing Guide][contributing]

Read our [contributing guide][contributing] to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

### [Good First Issues][good-first-issues]

To help you get your feet wet and become familiar with our contribution process, we have a list of [good first issues][good-first-issues] that contains things with a relatively limited scope. This is a great place to get started!

<!-- Links -->

[contributing]: https://github.com/srikanth235/privy/blob/master/CONTRIBUTING.md
[good-first-issues]: https://github.com/srikanth235/privy/labels/good%20first%20issue

## ⭐️ Star History

<a href="https://star-history.com/#ise-uiuc/magicoder&Timeline">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=srikanth235/privy&type=Timeline&theme=dark" />
    <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=srikanth235/privy&type=Timeline" />
    <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=srikanth235/privy&type=Timeline" />
  </picture>
</a>
