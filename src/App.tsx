import { useState, useRef, useCallback, useEffect } from 'react';
import type { Message as MessageType, QueuedMessage } from './types';
import { getResponseForMessage } from './mockResponses';
import { ChatHeader } from './components/ChatHeader';
import { Message } from './components/Message';
import { QueueSection } from './components/QueueSection';
import { ChatInput } from './components/ChatInput';
import { FilesUpdatedBar } from './components/FilesUpdatedBar';
import type { ToolCall } from './types';
import './styles.css';

function App() {
  const [messages, setMessages] = useState<MessageType[]>([]);
  const [queuedMessages, setQueuedMessages] = useState<QueuedMessage[]>([]);
  const [steeringQueue, setSteeringQueue] = useState<QueuedMessage[]>([]);
  const [pendingSteerMessage, setPendingSteerMessage] = useState<string | null>(null);
  const [steeringInProgress, setSteeringInProgress] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isQueueInteracting, setIsQueueInteracting] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const currentResponseRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const prevQueueLengthRef = useRef(0);

  const isNearBottom = useCallback(() => {
    const container = messagesContainerRef.current;
    if (!container) return true;
    const threshold = 150; // pixels from bottom
    return container.scrollHeight - container.scrollTop - container.clientHeight < threshold;
  }, []);

  const scrollToBottom = useCallback(() => {
    // Don't scroll if user is interacting with queue or is scrolled away from bottom
    if (isQueueInteracting || !isNearBottom()) return;
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [isQueueInteracting, isNearBottom]);

  // Only scroll to bottom when a new queued item is added
  useEffect(() => {
    if (queuedMessages.length > prevQueueLengthRef.current) {
      scrollToBottom();
    }
    prevQueueLengthRef.current = queuedMessages.length;
  }, [queuedMessages.length, scrollToBottom]);

  const clearCurrentResponse = () => {
    currentResponseRef.current.forEach(clearTimeout);
    currentResponseRef.current = [];
  };

  // Stop current AI response and finalize the last message (remove thinking)
  const stopCurrentResponse = useCallback(() => {
    clearCurrentResponse();
    // Update the current streaming message to stop thinking and remove the spinner
    setMessages((prev) => {
      const updated = [...prev];
      // Find the last assistant message that's still thinking
      for (let i = updated.length - 1; i >= 0; i--) {
        if (updated[i].role === 'assistant' && updated[i].content.thinking) {
          updated[i] = {
            ...updated[i],
            content: {
              ...updated[i].content,
              thinking: false,
            },
            isStreaming: false,
          };
          break;
        }
      }
      return updated;
    });
    setIsLoading(false);
  }, []);

  const simulateAIResponse = useCallback((userMessageText: string) => {
    setIsLoading(true);
    clearCurrentResponse();

    // Stop any previous thinking animations before starting new one
    setMessages((prev) => {
      return prev.map((msg) => {
        if (msg.role === 'assistant' && msg.content.thinking) {
          return {
            ...msg,
            content: { ...msg.content, thinking: false },
            isStreaming: false,
          };
        }
        return msg;
      });
    });

    const responseSteps = getResponseForMessage(userMessageText);
    const assistantMessageId = `assistant-${Date.now()}`;

    // Add initial assistant message
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        role: 'assistant',
        content: { thinking: true },
        isStreaming: true,
      },
    ]);

    let totalDelay = 0;

    responseSteps.forEach((step, index) => {
      totalDelay += step.delay;
      
      const timer = setTimeout(() => {
        setMessages((prev) => {
          const updated = [...prev];
          const msgIndex = updated.findIndex((m) => m.id === assistantMessageId);
          if (msgIndex !== -1) {
            updated[msgIndex] = {
              ...updated[msgIndex],
              content: step.content,
              isStreaming: index < responseSteps.length - 1,
            };
          }
          return updated;
        });

        // Check if this is the last step
        if (index === responseSteps.length - 1) {
          setIsLoading(false);
        }
      }, totalDelay);

      currentResponseRef.current.push(timer);
    });
  }, []);

  const addUserMessage = useCallback((text: string) => {
    const userMessage: MessageType = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: { text },
    };
    setMessages((prev) => [...prev, userMessage]);
    return userMessage;
  }, []);

  const sendQueuedMessage = useCallback((id: string, queue: QueuedMessage[]) => {
    const msg = queue.find((m) => m.id === id);
    if (!msg) return;

    // Remove from queue
    setQueuedMessages((prev) => prev.filter((m) => m.id !== id));
    
    // Add as user message and get response
    addUserMessage(msg.text);
    simulateAIResponse(msg.text);
  }, [addUserMessage, simulateAIResponse]);

  const sendSteeringMessage = useCallback((id: string, queue: QueuedMessage[]) => {
    const msg = queue.find((m) => m.id === id);
    if (!msg) return;

    // Remove from steering queue
    setSteeringQueue((prev) => prev.filter((m) => m.id !== id));
    
    // Add as user message and get response
    addUserMessage(msg.text);
    simulateAIResponse(msg.text);
  }, [addUserMessage, simulateAIResponse]);

  // Auto-send pending steer message or top queued message when AI completes
  useEffect(() => {
    // Don't auto-send while steering is in progress (react interrupt has its own timer)
    if (!isLoading && !steeringInProgress) {
      // Priority: pending steer message first
      if (pendingSteerMessage) {
        const text = pendingSteerMessage;
        setPendingSteerMessage(null);
        const timer = setTimeout(() => {
          simulateAIResponse(text);
        }, 500);
        return () => clearTimeout(timer);
      }
      // Then steering queue (higher priority than regular queue)
      if (steeringQueue.length > 0) {
        const timer = setTimeout(() => {
          sendSteeringMessage(steeringQueue[0].id, steeringQueue);
        }, 500);
        return () => clearTimeout(timer);
      }
      // Then regular queued messages
      if (queuedMessages.length > 0) {
        const timer = setTimeout(() => {
          sendQueuedMessage(queuedMessages[0].id, queuedMessages);
        }, 500);
        return () => clearTimeout(timer);
      }
    }
  }, [isLoading, steeringInProgress, pendingSteerMessage, steeringQueue, queuedMessages, sendSteeringMessage, sendQueuedMessage, simulateAIResponse]);

  const handleSend = useCallback(() => {
    const text = inputValue.trim();

    // If input is empty, check if we should send from queue
    if (!text) {
      if (!isLoading && queuedMessages.length > 0) {
        sendQueuedMessage(queuedMessages[0].id, queuedMessages);
      }
      return;
    }

    // Single enter always adds to queue
    const queuedMsg: QueuedMessage = {
      id: `queued-${Date.now()}`,
      text,
      timestamp: Date.now(),
    };
    setQueuedMessages((prev) => [...prev, queuedMsg]);
    setInputValue('');
  }, [inputValue, isLoading, queuedMessages, sendQueuedMessage]);

  const handleDoubleEnter = useCallback((text: string) => {
    if (!text) return;

    const isSteerMessage = text.toLowerCase().includes('react');

    // Double enter sends immediately, bypassing queue
    // This "steers" the conversation - message appears immediately in chat
    addUserMessage(text);
    setInputValue('');

    // If it's a steer message (contains "react"), stop thinking immediately, wait 5 seconds, then respond
    if (isSteerMessage && isLoading) {
      // Set flag to prevent auto-send from firing when isLoading becomes false
      setSteeringInProgress(true);
      // Stop the thinking animation immediately
      stopCurrentResponse();
      // Wait 5 seconds, then start the react response
      setTimeout(() => {
        setSteeringInProgress(false);
        simulateAIResponse(text);
      }, 5000);
      return;
    }

    // If AI is still loading, store as pending steer (not in visible queue)
    // The current thinking continues, then this message gets processed
    if (!isLoading) {
      simulateAIResponse(text);
    } else {
      // Store as pending steer - will be processed when AI finishes
      // This does NOT appear in the queue UI
      setPendingSteerMessage(text);
    }
  }, [isLoading, addUserMessage, simulateAIResponse, stopCurrentResponse]);

  const handleDismissQueued = useCallback((id: string) => {
    setQueuedMessages((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleEditQueued = useCallback((id: string, newText: string) => {
    setQueuedMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, text: newText } : m))
    );
  }, []);

  const handleSendQueuedNow = useCallback((id: string) => {
    // Move from regular queue to steering - waits for current thinking to finish
    const msg = queuedMessages.find((m) => m.id === id);
    if (!msg) return;
    
    // Remove from regular queue
    setQueuedMessages((prev) => prev.filter((m) => m.id !== id));
    
    // Add to feed as user message
    addUserMessage(msg.text);
    
    if (isLoading) {
      // Wait for current response to finish, then respond with steering
      setPendingSteerMessage(msg.text);
    } else {
      // Not loading, send immediately
      simulateAIResponse(msg.text);
    }
  }, [queuedMessages, addUserMessage, isLoading, simulateAIResponse]);

  const handleDismissSteering = useCallback((id: string) => {
    setSteeringQueue((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const lastGlobalEnterTime = useRef<number>(0);

  // Pop and send top queued item - waits for current thinking to finish
  const popAndSendTopQueued = useCallback(() => {
    if (queuedMessages.length === 0) return;
    
    const topMsg = queuedMessages[0];
    // Remove from queue
    setQueuedMessages((prev) => prev.filter((m) => m.id !== topMsg.id));
    // Add to feed
    addUserMessage(topMsg.text);
    
    if (isLoading) {
      // Wait for current response to finish, then respond
      setPendingSteerMessage(topMsg.text);
    } else {
      simulateAIResponse(topMsg.text);
    }
  }, [queuedMessages, addUserMessage, isLoading, simulateAIResponse]);

  // Global keyboard listener for Enter when input is not focused
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      // Check if Enter was pressed and input is not focused
      if (e.key === 'Enter' && !e.shiftKey) {
        const now = Date.now();
        const timeSinceLastEnter = now - lastGlobalEnterTime.current;
        lastGlobalEnterTime.current = now;
        
        // Only pop queue if more than 1.5 seconds since last Enter
        // Quick succession Enter should not pop the queue
        if (timeSinceLastEnter < 1500) {
          return;
        }
        
        // Don't pop if user is typing in the input (they're submitting a new message)
        const activeElement = document.activeElement;
        if (activeElement?.tagName === 'TEXTAREA' || activeElement?.tagName === 'INPUT') {
          const inputElement = activeElement as HTMLTextAreaElement | HTMLInputElement;
          if (inputElement.value.trim()) {
            return; // User is submitting new text, don't pop queue
          }
        }
        
        if (queuedMessages.length > 0) {
          e.preventDefault();
          popAndSendTopQueued();
        }
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [queuedMessages, popAndSendTopQueued]);

  // Get tool calls from the last completed assistant message
  const getCompletedToolCalls = useCallback((): ToolCall[] => {
    // Find the last assistant message that is not loading
    for (let i = messages.length - 1; i >= 0; i--) {
      const msg = messages[i];
      if (msg.role === 'assistant' && !msg.content.thinking && msg.content.toolCalls) {
        return msg.content.toolCalls;
      }
    }
    return [];
  }, [messages]);

  return (
    <div className="chat-container">
      <ChatHeader />
      
      <div className="messages-container" ref={messagesContainerRef}>
        {messages.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">💬</div>
            <p>Start a conversation with Copilot</p>
          </div>
        ) : (
          messages.map((msg) => <Message key={msg.id} message={msg} />)
        )}
        
        <QueueSection
          queuedMessages={queuedMessages}
          steeringQueue={steeringQueue}
          onSendNow={handleSendQueuedNow}
          onDismiss={handleDismissQueued}
          onDismissSteering={handleDismissSteering}
          onEditQueued={handleEditQueued}
          onInteractionChange={setIsQueueInteracting}
        />
        
        <div ref={messagesEndRef} />
      </div>

      <FilesUpdatedBar toolCalls={getCompletedToolCalls()} />

      <ChatInput
        value={inputValue}
        onChange={setInputValue}
        onSend={handleSend}
        onDoubleEnter={handleDoubleEnter}
        isLoading={isLoading}
        hasQueuedItems={queuedMessages.length > 0}
      />
    </div>
  );
}

export default App;
