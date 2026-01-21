import React, { useState, useRef, useEffect } from 'react';
import type { QueuedMessage } from '../types';

interface QueueSectionProps {
  queuedMessages: QueuedMessage[];
  steeringQueue: QueuedMessage[];
  onSendNow: (id: string) => void;
  onDismiss: (id: string) => void;
  onDismissSteering: (id: string) => void;
  onEditQueued: (id: string, newText: string) => void;
}

interface EditableQueueItemProps {
  msg: QueuedMessage;
  onEdit: (id: string, newText: string) => void;
  children?: React.ReactNode;
}

const EditableQueueItem: React.FC<EditableQueueItemProps> = ({ msg, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(msg.text);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleClick = () => {
    setIsEditing(true);
    setEditText(msg.text);
  };

  const handleBlur = () => {
    setIsEditing(false);
    if (editText.trim() && editText !== msg.text) {
      onEdit(msg.id, editText.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      setIsEditing(false);
      if (editText.trim() && editText !== msg.text) {
        onEdit(msg.id, editText.trim());
      }
    } else if (e.key === 'Escape') {
      setIsEditing(false);
      setEditText(msg.text);
    }
  };

  if (isEditing) {
    return (
      <input
        ref={inputRef}
        type="text"
        className="queued-item-edit"
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
      />
    );
  }

  return (
    <span className="queued-item-text" onClick={handleClick}>
      {msg.text}
    </span>
  );
};

export const QueueSection: React.FC<QueueSectionProps> = ({
  queuedMessages,
  steeringQueue,
  onSendNow,
  onDismiss,
  onDismissSteering,
  onEditQueued,
}) => {
  if (queuedMessages.length === 0 && steeringQueue.length === 0) return null;

  return (
    <div className="queue-section">
      {/* Steering items (prioritized) */}
      {steeringQueue.length > 0 && (
        <>
          <div className="queue-header steering-header">
            <span className="queue-icon steering-icon">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 1L1 8h4.5v7h5V8H15L8 1z"/>
              </svg>
            </span>
            <span className="queue-title">{steeringQueue.length} Steering Request{steeringQueue.length > 1 ? 's' : ''}</span>
            <span className="queue-hint">Next up</span>
          </div>
          
          {steeringQueue.map((msg) => (
            <div key={msg.id} className="queued-item steering-item">
              <span className="queued-item-text">{msg.text}</span>
              <div className="queued-item-actions">
                <button 
                  className="queued-item-dismiss"
                  onClick={() => onDismissSteering(msg.id)}
                  title="Dismiss"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Regular queued items */}
      {queuedMessages.length > 0 && (
        <>
          <div className="queue-header">
            <span className="queue-icon">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                <path d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3zM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8z"/>
                <path d="M8 5v3.5l2.5 1.5-.5.87L7 9V5h1z"/>
              </svg>
            </span>
            <span className="queue-title">{queuedMessages.length} Queued Request{queuedMessages.length > 1 ? 's' : ''}</span>
            <span className="queue-hint">Send now: <kbd>Enter</kbd> ↵</span>
          </div>
          
          {queuedMessages.map((msg) => (
            <div key={msg.id} className="queued-item">
              <EditableQueueItem msg={msg} onEdit={onEditQueued}>
                {msg.text}
              </EditableQueueItem>
              <div className="queued-item-actions">
                <button 
                  className="queued-item-send"
                  onClick={() => onSendNow(msg.id)}
                  title="Move to steering"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 1L1 8h4.5v7h5V8H15L8 1z"/>
                  </svg>
                </button>
                <button 
                  className="queued-item-dismiss"
                  onClick={() => onDismiss(msg.id)}
                  title="Dismiss"
                >
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 8.707l3.646 3.647.708-.707L8.707 8l3.647-3.646-.707-.708L8 7.293 4.354 3.646l-.707.708L7.293 8l-3.646 3.646.707.708L8 8.707z"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
