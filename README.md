<div align="center">
  <h1><b>💬 Privy</b></h1>
  <p>
    <strong>A privacy-first coding assistant.</strong>
  </p>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="License: MIT"/>
  <a href="https://twitter.com/getprivydev"  style="text-decoration: none; outline: none"><img src="https://img.shields.io/twitter/url/https/twitter.com/getprivydev.svg?style=social&label=%20%40getprivydev" alt="Twitter: @getprivydev"/></a>
  <a href="https://discord.gg/wykDxGyUHA"  style="text-decoration: none; outline: none">
  <img src="https://dcbadge.vercel.app/api/server/vAcVQ7XhR2?style=flat&compact=true" alt="Discord"/>
  </a>
</div>

## Pre-requisites

If you haven't done already, please pick one of the following platforms to run LLM of your choice on your system **locally**.

- [Ollama](https://github.com/jmorganca/ollama)
- [llamafile](https://github.com/Mozilla-Ocho/llamafile)
- [llama.cpp](https://github.com/ggerganov/llama.cpp)

Some of the popular LLMs that we recommend are:

- [Mistral](https://mistral.ai/)
- [CodeLLama](https://github.com/facebookresearch/codellama)

## Quick Install

You can install Privy extension from the Visual Studio Code Marketplace or from the Open VSX Registry.

- [Visual Studio Code Marketplace](https://marketplace.visualstudio.com/items?itemName=privy.privy-vscode)
- [Open VSX Registry](https://open-vsx.org/extension/Privy/privy-vscode)

## Configuration Options

Please set the following options in the **settings** for Privy extension.

- **privy.model**: Select the LLM that you want to use. Supports Mistral and CodeLLama. Experimental support for GPT-3.5-Turbo and GPT-4.
- **privy.provider**: Pick the platform that is being used for running LLMs locally. There is support for using OpenAI, but this will affect the privacy aspects of the solution. The default is `Ollama`.
- **privy.providerUrl**: The URL of the platform that is being used for running LLMs locally. The default is `http://localhost:11434`.

# Features

[AI Chat](#ai-chat) | [Explain Code](#explain-code) | [Generate Tests](#generate-tests) | [Find Bugs](#find-bugs) | [Diagnose Errors](#diagnose-errors)

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

## Code Contributions

### [Contributing Guide][contributing]

Read our [contributing guide][contributing] to learn about our development process, how to propose bugfixes and improvements, and how to build and test your changes.

### [Good First Issues][good-first-issues]

To help you get your feet wet and become familiar with our contribution process, we have a list of [good first issues][good-first-issues] that contains things with a relatively limited scope. This is a great place to get started!

<!-- Links -->

[contributing]: https://github.com/srikanth235/privy/blob/master/CONTRIBUTING.md
[good-first-issues]: https://github.com/srikanth235/privy/labels/good%20first%20issue
