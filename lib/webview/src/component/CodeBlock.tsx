import React, { useState } from 'react';
import { CodeProps } from 'react-markdown/lib/ast-to-react';
// @ts-ignore
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// @ts-ignore
import { dracula as codeStyle } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';


export default function CodeBlock ({ node, inline, className, children, ...props }: CodeProps) {
  const match = /language-(\w+)/.exec(className || '');
  const [copied, setCopied] = useState(false);

  let widget;
  const classes = `${className} `;

  if (!inline && match)
  {
    widget = (
      <div style={{ position: 'relative' }}>
        <SyntaxHighlighter
          style={codeStyle}
          language={match[1]}
          className={classes}
          PreTag="div"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
        <div
          style={{
            position: 'absolute',
            top: '0',
            right: '0',
            display: 'flex',
            alignItems: 'center',
            padding: '0.5rem',
            borderRadius: '5px',
          }}
        >
          {copied ? (
            <span className="copied">Copied!</span>
          ) : (
              <CopyToClipboard text={String(children).replace(/\n$/, '')}
                  onCopy={() => {
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                }}
              >
                <i className="codicon codicon-copy"/>
              </CopyToClipboard>

          )}
        </div>
      </div>
    );
  } else
  {
    widget = (
      <code className={classes} {...props}>
        {children}
      </code>
    );
  }

  return widget;
}