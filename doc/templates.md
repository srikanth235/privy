# Privy Templates

Privy comes with handy built-in commands, such as Explain Code, Edit Code, Generate Tests, etc.

But what if you have a specific need that isn't entirely covered? What if you want to craft an AI Chat that knows specifically about your project or your conventions? How cool would it be to have the answers in your language?

That's what you can get with Privy Templates! 🌈

Here are some ideas of what you can do with them:

- Have conversations in a different language, e.g., [in French](https://github.com/srikanth235/privy/blob/main/template/chat/chat-fr.rdt.md)
- Let [Shakespeare write a sonnet about your code](https://github.com/srikanth235/privy/blob/main/template/fun/code-sonnet.rdt.md)
- Define dedicated tasks, e.g., [improving code readability](https://github.com/srikanth235/privy/blob/main/template/task/improve-readability.rdt.md)
- Create project, language, or framework-specific templates

The best part is that you can share them with your colleagues, friends, or enemies.

## How to define your own templates?

Add Template File (`.rdt.md`) files to the `.privy/template` folder in your workspace. See the [templates in the Privy repository for examples](https://github.com/srikanth235/privy/tree/main/template).

Run the "Privy: Start Custom Chat… 💬" command to use your custom conversations.

After you have changed a template, use the "Privy: Reload Templates" command to see your updates.

To help you debug, use the "Privy: Show logs" command to open the Output panel and see the prompt.

## Example: Drunken Pirate

The ["Drunken Pirate" template](https://github.com/srikanth235/privy/blob/main/template/fun/drunken-pirate.rdt.md) will expose a new custom conversation: **Ask a drunken pirate to describe your code**.

To see it in action:

1. Save the template as `.privy/template/drunken-pirate.rdt.md` in your workspace
2. Use "Privy: Reload Templates"
3. Use "Privy: Start Custom Chat… 💬"
4. Pick "Ask a drunken pirate"

This template is a conversation between a developer and a drunken pirate. The drunken pirate starts by describing the selected code.

Want to craft your own? Let's dig into how Privy Templates are structured.

## Privy Template Structure

Privy Templates are [GitHub-flavored Markdown](https://github.github.com/gfm/) files with special fenced code sections. You can use regular markdown to document your template and the fenced code sections to define it.

There are two types of fenced code sections:

- the `json conversation-template` configuration section
- the `template-initial-message` and `template-response` prompt template sections

## Configuration Section

The configuration section is a JSON object that defines the template. It is a fenced code block with the language `json conversation-template`:

<pre>
```json conversation-template
{
  "id": "drunken-pirate",
  "engineVersion": 0,
  "label": "Ask a drunken pirate",
  "description": "Ask a drunken pirate about the meaning of your code",
  "tags": ["fun"],
  "header": {
    "title": "Drunken Pirate ({{location}})",
    "icon": {
      "type": "codicon",
      "value": "feedback"
    }
  },
  …
}

```
</pre>

### Basic Properties

Configuration sections have the following basic properties:

- `id`: Id of the conversation type. It needs to be unique.
- `engineVersion`: Must be 0 for now. Warning: we might make breaking changes to the template format while we are on version 0.
- `label`: Short description of the conversation type. It will be displayed when you run the "Privy: Start Custom Chat… 💬" command.
- `description`: Longer description of the conversation type. It will be displayed when you run the "Privy: Start Custom Chat… 💬" command.
- `tags`: An optional list of tags that can be used to filter the conversation types in the "Privy: Start Custom Chat… 💬" command. Defaults to `[]`.
- `header`: The header that is shown in the Privy side panel for conversations of this type. It has 3 properties:
  - `title`: The title of the conversation. It will be shown in the Privy side panel. You can use [template variables](#variables) here with `{{variableName}}`.
  - `useFirstMessageAsTitle`: An optional boolean value. Defaults to `false`. If it is `true`, the first message of the conversation will be used as the title once there is a message.
  - `icon`: The icon that is shown in the Privy side panel for conversations of this type. Only the [Codicon](https://microsoft.github.io/vscode-codicons/dist/codicon.html) `type` is supported at the moment. You can set the `value` property to the codicon that you want to show.
- `isEnabled`: Whether the conversation type is enabled. If it is disabled, it will not be shown in the "Privy: Start Custom Chat… 💬" command. Defaults to `true`.
- `chatInterface`: Optional. The chat interface that is used for this conversation type. Defaults to `message-exchange`. Set to `instruction-refinement` if you want to show a single edit box that the user can change instead of a message exchange.

### Variables

Variables are values that you can expand in the header title and in the prompt templates using the `{{variableName}}` syntax. Here is an example:

<pre>
  …
  "variables": [
    {
      "name": "selectedText",
      "type": "selected-text",
      "constraints": [{ "type": "text-length", "min": 1 }]
    },
    {
      "name": "location",
      "type": "selected-location-text"
    },
    {
      "name": "lastMessage",
      "type": "message",
      "property": "content",
      "index": -1
    },
    {
      "name": "botRole",
      "type": "constant",
      "value": "drunken pirate"
    }
  ],
  …
</pre>

They are defined in the `variables` property of the configuration section. The property contains an array of variable definitions. There are the following kinds of variables:

- **Selected text** (`type: selected-text`): The currently selected text in the active editor. The resolution `time` is `conversation-start` or `message`.
- **Selected text with diagnostics** (`type: selected-text-with-diagnostics`): The currently selected text in the active editor, with diagnostics. The resolution `time` is `conversation-start`. The `severities` property contains an array of the included severities (possible values: `error`, `warning`, `information`, `hint`).
- **Constants** (`type: constant`): A constant value that is always the same. You can use it to extract common parts from your templates, e.g. the bot role, and tweak it quickly to explore different responses while you are developing the template. The `time` property needs to be set to `conversation-start`.
- **Message**: (`type: message`): Get properties of a message at an index. Only the message content (`property: content`) is supported at the moment. You can e.g. use it to access the first (index 0) or the last (index -1) message of the conversation. The `time` property needs to be set to `message`.
- **Language** (`type: language`): The language of the active editor. The resolution `time` can be `conversation-start`.
- **Filename** (`type: filename`): The name of the active editor. The resolution `time` can be `conversation-start`.
- **Location of the selected text** (`type: selected-location-text`): The filename and the start/end lines of the selection. This is useful for including in the header title. The resolution `time` can be `conversation-start`.

The `time` property defines when the variable is resolved. It can be one of the following values (it depends on the variable type which values are supported):

- `conversation-start`: The variable is resolved when the conversation is started. It is not resolved again when the user sends a message.
- `message`: The variable is resolved when the user sends a message.

You can also add **constraints** to the variables. Right now only a minimal text length constraint is available (`type: text-length`). It is useful to make sure that the user has selected some text before starting the conversation. If the constraint is not met, an error popup is shown and the conversation will not be started.

In addition to user-defined variables, there are some predefined variables that are always available:

- **Messages**: The messages of the conversation. It is an array of messages. Each message has an `author` property (either `user` or `bot`) and a `content` property.

### Prompt Definitions

There are two properties where you can define the prompts for the conversation:

- `initialMessage`: The initial message that is sent by the bot. It is optional. If it is not defined, the conversation starts with a user message.
- `response`: The response that is sent by the bot after the user message.

Example:

<pre>
  …
  "initialMessage": {
    "placeholder": "Drinking rum",
    "maxTokens": 512,
    "temperature": 0.8
  },
  "response": {
    "maxTokens": 1024,
    "stop": ["Drunken Pirate:", "Developer:"],
    "temperature": 0.7
  }
</pre>

Prompts describe how a user message in a chat (or the initial analysis) is processed. The prompt definitions contain parameters for a call to the OpenAI API and additional properties. Privy calls the [OpenAI Completion API](https://platform.openai.com/docs/api-reference/completions) with the `text-davinci-003` model.

- `placeholder`: The placeholder text that is shown in the chat while the message is being processed.
- `maxTokens`: Upper bound on how many tokens will be returned.
- `stop`: Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence. Optional.
- `temperature`: The randomness of the model. Higher values will make the model more random, lower values will make it more predictable. Optional, defaults to 0.
- `completionHandler`: Defines how the completion result is handled. There are currently 2 handlers: "message" (default) and "update-temporary-editor".
  - `message`: The completion result is added as a new message to the chat. `"completionHandler": { "type": "message" }`
  - `update-temporary-editor`: The completion result is shown in a temporary editor. The handle has a `botMessage` property for the message that is shown in the chat, and an optional 'language' template property that can be used to the the VS Code language id of the temporary editor. `"completionHandler": { "type": "update-temporary-editor", "botMessage": "Test generated.", "language": "typescript" }`
  - `active-editor-diff`: The completion result is shown in a diff editor. It requires an active editor with a selection. The selection at the conversation start will be diffed against the completion result. `"completionHandler": { "type": "active-editor-diff" }`

## Prompt Templates

The prompt templates are defined in fenced code sections with the language info `template-initial-message` and `template-response`. The name must match the prompt definition, i.e. for `initialMessage` you need to define a `template-initial-message` section, and for `response` you need to define a `template-response` section.

They use the [Handlebars templating language](https://handlebarsjs.com/guide/). Variables that you have defined can be expanded using the `{{variableName}}` syntax.

There are a few additional extensions to Handlebars:

- \\\`\\\`\\\` is replaced with \`\`\` in the template. This is useful to create markdown code snippets section in the template.
- `eq`, `neq`, `lt`, `gt`, `lte`, `gte` are added as comparison operators. They can be used to create if statements in the template.

Example:

<pre>
```template-analysis
## Instructions
You are a {{botRole}}.
Describe the code below.

## Selected Code
\`\`\`
{{selectedText}}
\`\`\`

## Task
You are a {{botRole}}.
Describe the code.
You pirate speak and refer to sailing and the sea where possible.

## Description

```
</pre>

## Get started with Privy Templates

The easiest way to get started with templates is to copy [some example templates](https://github.com/srikanth235/privy/tree/master/template) and start modifying them.

Run the "Privy: Start Custom Chat… 💬" command to use your custom conversations.

After you have changed a Privy template, use the "Privy: Reload Templates" command to see your updates.

To help you debug, use the "Privy: Show logs" command to open the Output panel and see the prompt that is sent to OpenAI.
