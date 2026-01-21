import React from 'react';
import type { ToolCall } from '../types';

interface ToolCallItemProps {
  toolCall: ToolCall;
}

export const ToolCallItem: React.FC<ToolCallItemProps> = ({ toolCall }) => {
  const getIcon = () => {
    if (toolCall.status === 'completed') {
      return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M6.5 10.5L3.5 7.5L2.5 8.5L6.5 12.5L14 5L13 4L6.5 10.5Z" />
        </svg>
      );
    }
    return (
      <div className="thinking-spinner" style={{ width: 12, height: 12 }} />
    );
  };

  const getLabel = () => {
    switch (toolCall.type) {
      case 'read':
        return 'Read';
      case 'edit':
        return '';
      case 'create':
        return '';
      default:
        return '';
    }
  };

  const getFileType = () => {
    const ext = toolCall.fileName.split('.').pop();
    switch (ext) {
      case 'tsx':
      case 'ts':
        return 'TS';
      case 'js':
      case 'jsx':
        return 'JS';
      case 'json':
        return 'JSON';
      case 'css':
        return 'CSS';
      default:
        return ext?.toUpperCase() || '';
    }
  };

  const parseChanges = () => {
    if (!toolCall.changes) return null;
    const parts = toolCall.changes.split(' ');
    return parts.map((part, i) => {
      if (part.startsWith('+')) {
        return (
          <span key={i} className="file-changes-add">
            {part}
          </span>
        );
      }
      if (part.startsWith('-')) {
        return (
          <span key={i} className="file-changes-remove">
            {' '}{part}
          </span>
        );
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="tool-call">
      <span className={`tool-icon ${toolCall.status}`}>{getIcon()}</span>
      {getLabel() && <span className="tool-label">{getLabel()}</span>}
      <span className="file-badge">
        <span className="file-type">{getFileType()}</span>
        <span className="file-name">{toolCall.fileName.split('/').pop()}</span>
        {toolCall.changes && (
          <span className="file-changes">{parseChanges()}</span>
        )}
      </span>
    </div>
  );
};
