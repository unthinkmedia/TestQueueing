export interface ToolCall {
  type: 'read' | 'edit' | 'create';
  fileName: string;
  changes?: string;
  status: 'pending' | 'completed';
}

export interface MessageContent {
  text?: string;
  toolCalls?: ToolCall[];
  bulletPoints?: string[];
  thinking?: boolean;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: MessageContent;
  isStreaming?: boolean;
}

export interface QueuedMessage {
  id: string;
  text: string;
  timestamp: number;
}
