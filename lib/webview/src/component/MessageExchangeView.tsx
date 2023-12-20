import { webviewApi } from "@privy/common";
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { ChatInput } from "./ChatInput";
import { ErrorMessage } from "./ErrorMessage";
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import CodeBlock from "./CodeBlock";


export function MessageExchangeView ({
  content,
  onClickDismissError,
  onClickRetry,
  onSendMessage,
}: {
  content: webviewApi.MessageExchangeContent;
  onSendMessage: (message: string) => void;
  onClickDismissError: () => void;
  onClickRetry: () => void;
}) {
  const [inputText, setInputText] = useState("");

  return (
    <div className="message-exchange">
      {content.messages.map((message, i) => (
        <div className={`message ${message.author}`} key={i}>
          {message.author === "user" && message.content}
          {message.author === "bot" && (
            <ReactMarkdown children={message.content} components={{code: CodeBlock}}></ReactMarkdown>
          )}
        </div>
      ))}
      {(() => {
        const type = content.state.type;
        switch (type)
        {
          case "waitingForBotAnswer":
            return (
              <div className="message bot">
                {content.state.botAction ?? ""}
                <span className={"in-progress"} />
              </div>
            );
          case "botAnswerStreaming":
            return (
              <div className="message bot">
                <ReactMarkdown children={content.state.partialAnswer ?? ""}
                  components={{
                    code: CodeBlock
                  }}
                ></ReactMarkdown>
                <span className={"in-progress"} />
              </div>
            );
          case "userCanReply":
            return (
              <ChatInput
                placeholder={
                  content.state.responsePlaceholder ??
                  content.messages.length > 0
                    ? "Reply…"
                    : "Ask…"
                }
                text={inputText}
                onChange={setInputText}
                onSubmit={() => {
                  onSendMessage(inputText);
                  setInputText("");
                }}
              />
            );
          default: {
            const exhaustiveCheck: never = type;
            throw new Error(`unsupported type: ${exhaustiveCheck}`);
          }
        }
      })()}

      {content.error && (
        <ErrorMessage
          error={content.error}
          onClickDismiss={onClickDismissError}
          onClickRetry={onClickRetry}
        />
      )}
    </div>
  );
}
