# Generate Unit Test

Generate unit test cases for the selected code.

## Template

### Configuration

```json conversation-template
{
  "id": "generate-unit-test",
  "engineVersion": 0,
  "label": "Generate Unit Test",
  "tags": ["generate", "test"],
  "description": "Generate a unit test for the selected code.",
  "header": {
    "title": "Generate Unit Test ({{location}})",
    "icon": {
      "type": "codicon",
      "value": "beaker"
    }
  },
  "variables": [
    {
      "name": "selectedText",
      "time": "conversation-start",
      "type": "selected-text",
      "constraints": [{ "type": "text-length", "min": 1 }]
    },
    {
      "name": "language",
      "time": "conversation-start",
      "type": "language",
      "constraints": [{ "type": "text-length", "min": 1 }]
    },
    {
      "name": "location",
      "time": "conversation-start",
      "type": "selected-location-text"
    },
    {
      "name": "lastMessage",
      "time": "message",
      "type": "message",
      "property": "content",
      "index": -1
    }
  ],
  "initialMessage": {
    "placeholder": "Generating Test",
    "maxTokens": 1024
  },
  "response": {
    "placeholder": "Updating Test",
    "maxTokens": 1024,
    "stop": ["Bot:", "Developer:"]
  }
}
```

### Initial Message Prompt

```template-initial-message
## Instructions
Write a unit test for the code below.

## Selected Code
\`\`\`
{{selectedText}}
\`\`\`

## Task
Write a unit test that contains test cases for the happy path and for all edge cases.
The programming language is {{language}}.

## Response

```

### Response Prompt

```template-response
## Instructions
Rewrite the code below as follows: "{{lastMessage}}"

## Code
\`\`\`
{{temporaryEditorContent}}
\`\`\`

## Task
Write a response that continues the conversation.
Stay focused on current developer request.
Ask for clarification if the message does not make sense or more input is needed.
Omit any links.
Include code snippets (using Markdown) and examples where appropriate.

## Response
Bot:
```
