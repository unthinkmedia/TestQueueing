import React from 'react';

export const ChatHeader: React.FC = () => {
  return (
    <div className="chat-header">
      <div className="header-left">
        <div className="header-icons">
          <button className="header-icon" title="Sparkle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 1l1.5 4.5L14 7l-4.5 1.5L8 13l-1.5-4.5L2 7l4.5-1.5L8 1z"/>
            </svg>
          </button>
          <button className="header-icon" title="Split view">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M2 2h5v12H2V2zm7 0h5v12H9V2z"/>
            </svg>
          </button>
        </div>
        <span className="header-title">Refining preview layout and icons</span>
        <span className="header-progress">50%</span>
      </div>
      
      <div className="header-right">
        <button className="header-icon" title="Add">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
          </svg>
        </button>
        <button className="header-icon" title="History">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 3a5 5 0 1 0 0 10A5 5 0 0 0 8 3zM2 8a6 6 0 1 1 12 0A6 6 0 0 1 2 8z"/>
            <path d="M8 5v3.5l2.5 1.5"/>
          </svg>
        </button>
        <button className="header-icon" title="Settings">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm0 1a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
            <path d="M6.5 1h3l.5 2 1.5.5 1.5-1 2 2-1 1.5.5 1.5 2 .5v3l-2 .5-.5 1.5 1 1.5-2 2-1.5-1-1.5.5-.5 2h-3l-.5-2-1.5-.5-1.5 1-2-2 1-1.5-.5-1.5-2-.5v-3l2-.5.5-1.5-1-1.5 2-2 1.5 1 1.5-.5.5-2z"/>
          </svg>
        </button>
        <button className="header-icon" title="More">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <circle cx="3" cy="8" r="1.5"/>
            <circle cx="8" cy="8" r="1.5"/>
            <circle cx="13" cy="8" r="1.5"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
