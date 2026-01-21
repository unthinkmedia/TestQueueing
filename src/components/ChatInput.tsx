import React, { useRef, useEffect } from 'react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onDoubleEnter: (text: string) => void;
  isLoading: boolean;
  hasQueuedItems: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  value,
  onChange,
  onSend,
  onDoubleEnter,
  isLoading,
  hasQueuedItems,
}) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastEnterTime = useRef<number>(0);
  const lastEnteredText = useRef<string>('');
  const pendingSendTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const now = Date.now();
      const timeSinceLastEnter = now - lastEnterTime.current;
      const currentText = value.trim();
      
      // Double enter (within 300ms) - use the text from first enter
      if (timeSinceLastEnter < 300 && lastEnteredText.current) {
        // Cancel pending single-enter send
        if (pendingSendTimeout.current) {
          clearTimeout(pendingSendTimeout.current);
          pendingSendTimeout.current = null;
        }
        const textToSend = lastEnteredText.current;
        lastEnterTime.current = 0;
        lastEnteredText.current = '';
        onDoubleEnter(textToSend);
        return;
      }

      lastEnterTime.current = now;
      
      // Single enter when field has text - delay to check for double enter
      if (currentText) {
        lastEnteredText.current = currentText;
        pendingSendTimeout.current = setTimeout(() => {
          onSend();
          lastEnteredText.current = '';
          pendingSendTimeout.current = null;
        }, 300);
        return;
      }

      // Single enter when field is empty but has queued items
      if (!currentText && hasQueuedItems) {
        onSend();
      }
    }
  };

  const handleSendClick = () => {
    if (isLoading && !value.trim()) {
      // Stop button clicked - would stop the AI
      console.log('Stop requested');
      return;
    }
    onSend();
  };

  const showStopButton = isLoading && !value.trim();

  return (
    <div className="input-area">
      <div className="input-wrapper">
        <textarea
          ref={inputRef}
          className="input-field"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask Copilot or type / for commands"
          rows={1}
        />

        <button className="attachment-btn" title="Voice input">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 10a2 2 0 0 0 2-2V4a2 2 0 1 0-4 0v4a2 2 0 0 0 2 2zm4-2a4 4 0 0 1-3.5 3.97V14h-1v-2.03A4 4 0 0 1 4 8h1a3 3 0 1 0 6 0h1z"/>
          </svg>
        </button>

        <button
          className={`send-btn ${showStopButton ? 'stop' : 'send'}`}
          onClick={handleSendClick}
          title={showStopButton ? 'Stop' : 'Send'}
        >
          {showStopButton ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <rect x="3" y="3" width="10" height="10" rx="1" />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M1.5 1.5l13 6.5-13 6.5v-5l8-1.5-8-1.5v-5z"/>
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};
