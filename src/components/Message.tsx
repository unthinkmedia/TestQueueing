import React from 'react';
import type { Message as MessageType } from '../types';
import { ToolCallItem } from './ToolCallItem';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  if (message.role === 'user') {
    return (
      <div className="message message-user">
        <div className="message-text">{message.content.text}</div>
      </div>
    );
  }

  const { text, toolCalls, bulletPoints, thinking } = message.content;

  return (
    <div className="message message-assistant">
      {text && <div className="message-text">{text}</div>}
      
      {toolCalls && toolCalls.length > 0 && (
        <div className="tool-calls">
          {toolCalls.map((tc, index) => (
            <ToolCallItem key={index} toolCall={tc} />
          ))}
        </div>
      )}

      {bulletPoints && bulletPoints.length > 0 && (
        <>
          <div className="message-text" style={{ marginTop: 12 }}>
            Done! I've added:
          </div>
          <ul className="bullet-list">
            {bulletPoints.map((point, index) => (
              <li key={index}>{point}</li>
            ))}
          </ul>
        </>
      )}

      {thinking && (
        <div className="thinking-indicator">
          <div className="thinking-spinner" />
          <span>Thinking</span>
        </div>
      )}
    </div>
  );
};
