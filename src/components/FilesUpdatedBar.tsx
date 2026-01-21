import React from 'react';
import type { ToolCall } from '../types';

interface FilesUpdatedBarProps {
  toolCalls: ToolCall[];
}

export const FilesUpdatedBar: React.FC<FilesUpdatedBarProps> = ({ toolCalls }) => {
  if (toolCalls.length === 0) return null;

  const removedLines = toolCalls.reduce((acc, tc) => {
    const match = tc.changes?.match(/-(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  const addedLines = toolCalls.reduce((acc, tc) => {
    const match = tc.changes?.match(/\+(\d+)/);
    return acc + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <div className="files-updated-bar">
      <span className="files-updated-count">
        &gt; {toolCalls.length} files updated
      </span>
      <span className="files-updated-changes">
        <span className="file-changes-remove">-{removedLines}</span>
        {' '}
        <span className="file-changes-add">+{addedLines}</span>
      </span>
      <button className="files-updated-btn">Keep</button>
      <button className="undo-btn">Undo</button>
    </div>
  );
};
