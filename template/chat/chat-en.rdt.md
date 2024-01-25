# AI Chat in English

This template lets you chat with Privy in English.

## Template

### Configuration

```json conversation-template
{
  "id": "chat-en",
  "engineVersion": 0,
  "label": "Start chat",
  "description": "Start a basic chat with Privy.",
  "header": {
    "title": "New chat",
    "useFirstMessageAsTitle": true,
    "icon": {
      "type": "codicon",
      "value": "comment-discussion"
    }
  },
  "variables": [
    {
      "name": "selectedText",
      "time": "conversation-start",
      "type": "selected-text"
    },
    {
      "name": "lastMessage",
      "time": "message",
      "type": "message",
      "property": "content",
      "index": -1
    }
  ],
  "response": {
    "maxTokens": 1024,
    "stop": ["Bot:", "Developer:"]
  }
}
```

### Response Prompt

```template-response
## Instructions
Continue the conversation below.
Pay special attention to the current developer request.

## Current Request
Developer: {{lastMessage}}

{{#if selectedText}}
## Selected Code
\`\`\`
{{selectedText}}
\`\`\`
{{/if}}

## Conversation
{{#each messages}}
{{#if (eq author "bot")}}
Bot: {{content}}
{{else}}
Developer: {{content}}
{{/if}}
{{/each}}


## Response
Bot:
```
