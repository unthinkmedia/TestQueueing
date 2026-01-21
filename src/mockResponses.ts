import type { ToolCall } from './types';

interface MockResponseStep {
  delay: number;
  content: {
    text?: string;
    toolCalls?: ToolCall[];
    bulletPoints?: string[];
    thinking?: boolean;
  };
}

export const todoAppResponse: MockResponseStep[] = [
  {
    delay: 2000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoItem.tsx', changes: '+42', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoItem.tsx', changes: '+42', status: 'completed' },
        { type: 'create', fileName: 'src/components/AddTodo.tsx', changes: '+38', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoItem.tsx', changes: '+42', status: 'completed' },
        { type: 'create', fileName: 'src/components/AddTodo.tsx', changes: '+38', status: 'completed' },
        { type: 'create', fileName: 'src/hooks/useTodos.ts', changes: '+52', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoItem.tsx', changes: '+42', status: 'completed' },
        { type: 'create', fileName: 'src/components/AddTodo.tsx', changes: '+38', status: 'completed' },
        { type: 'create', fileName: 'src/hooks/useTodos.ts', changes: '+52', status: 'completed' },
        { type: 'create', fileName: 'src/styles/todo.css', changes: '+67', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "I'll create a todo application for you. Let me start by setting up the project structure.",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoItem.tsx', changes: '+42', status: 'completed' },
        { type: 'create', fileName: 'src/components/AddTodo.tsx', changes: '+38', status: 'completed' },
        { type: 'create', fileName: 'src/hooks/useTodos.ts', changes: '+52', status: 'completed' },
        { type: 'create', fileName: 'src/styles/todo.css', changes: '+67', status: 'completed' },
        { type: 'edit', fileName: 'src/App.tsx', changes: '+12 -5', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Done! I've created a todo application with the following features:",
      toolCalls: [
        { type: 'read', fileName: 'package.json', status: 'completed' },
        { type: 'read', fileName: 'tsconfig.json', status: 'completed' },
        { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        { type: 'create', fileName: 'src/types/todo.ts', changes: '+15', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoList.tsx', changes: '+85', status: 'completed' },
        { type: 'create', fileName: 'src/components/TodoItem.tsx', changes: '+42', status: 'completed' },
        { type: 'create', fileName: 'src/components/AddTodo.tsx', changes: '+38', status: 'completed' },
        { type: 'create', fileName: 'src/hooks/useTodos.ts', changes: '+52', status: 'completed' },
        { type: 'create', fileName: 'src/styles/todo.css', changes: '+67', status: 'completed' },
        { type: 'edit', fileName: 'src/App.tsx', changes: '+12 -5', status: 'completed' },
      ],
      bulletPoints: [
        'TodoList component with add/remove functionality',
        'TodoItem component with checkbox and delete',
        'AddTodo component for new items',
        'useTodos hook for state management',
        'Custom CSS styling',
        'Integrated into main App component',
      ],
      thinking: false,
    },
  },
];

export const useReactResponse: MockResponseStep[] = [
  {
    delay: 2000,
    content: {
      text: "Got it! I'll use React for this implementation.",
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoList.tsx', changes: '+15 -8', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoList.tsx', changes: '+15 -8', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoItem.tsx', changes: '+8 -3', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoList.tsx', changes: '+15 -8', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoItem.tsx', changes: '+8 -3', status: 'completed' },
        { type: 'edit', fileName: 'src/hooks/useTodos.ts', changes: '+12 -4', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoList.tsx', changes: '+15 -8', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoItem.tsx', changes: '+8 -3', status: 'completed' },
        { type: 'edit', fileName: 'src/hooks/useTodos.ts', changes: '+12 -4', status: 'completed' },
        { type: 'edit', fileName: 'src/components/AddTodo.tsx', changes: '+6 -2', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Got it! I'll use React for this implementation. Let me update the components.",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoList.tsx', changes: '+15 -8', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoItem.tsx', changes: '+8 -3', status: 'completed' },
        { type: 'edit', fileName: 'src/hooks/useTodos.ts', changes: '+12 -4', status: 'completed' },
        { type: 'edit', fileName: 'src/components/AddTodo.tsx', changes: '+6 -2', status: 'completed' },
        { type: 'create', fileName: 'src/utils/todoHelpers.ts', changes: '+24', status: 'completed' },
      ],
      thinking: true,
    },
  },
  {
    delay: 3000,
    content: {
      text: "Updated! The components now use:",
      toolCalls: [
        { type: 'read', fileName: 'src/components/TodoList.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/components/TodoItem.tsx', status: 'completed' },
        { type: 'read', fileName: 'src/hooks/useTodos.ts', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoList.tsx', changes: '+15 -8', status: 'completed' },
        { type: 'edit', fileName: 'src/components/TodoItem.tsx', changes: '+8 -3', status: 'completed' },
        { type: 'edit', fileName: 'src/hooks/useTodos.ts', changes: '+12 -4', status: 'completed' },
        { type: 'edit', fileName: 'src/components/AddTodo.tsx', changes: '+6 -2', status: 'completed' },
        { type: 'create', fileName: 'src/utils/todoHelpers.ts', changes: '+24', status: 'completed' },
      ],
      bulletPoints: [
        'React hooks (useState, useCallback, useMemo)',
        'Proper TypeScript interfaces',
        'Memoized components for performance',
        'Helper utilities for todo operations',
      ],
      thinking: false,
    },
  },
];

export const genericResponses: MockResponseStep[][] = [
  [
    {
      delay: 2000,
      content: {
        text: "I understand. Let me work on that for you.",
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
          { type: 'edit', fileName: 'src/App.tsx', changes: '+5 -2', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
          { type: 'edit', fileName: 'src/App.tsx', changes: '+5 -2', status: 'completed' },
          { type: 'edit', fileName: 'src/styles.css', changes: '+12 -3', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
          { type: 'edit', fileName: 'src/App.tsx', changes: '+5 -2', status: 'completed' },
          { type: 'edit', fileName: 'src/styles.css', changes: '+12 -3', status: 'completed' },
          { type: 'create', fileName: 'src/utils/helpers.ts', changes: '+18', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
          { type: 'edit', fileName: 'src/App.tsx', changes: '+5 -2', status: 'completed' },
          { type: 'edit', fileName: 'src/styles.css', changes: '+12 -3', status: 'completed' },
          { type: 'create', fileName: 'src/utils/helpers.ts', changes: '+18', status: 'completed' },
          { type: 'edit', fileName: 'src/components/index.ts', changes: '+3 -1', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "I understand. Let me work on that for you.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
          { type: 'edit', fileName: 'src/App.tsx', changes: '+5 -2', status: 'completed' },
          { type: 'edit', fileName: 'src/styles.css', changes: '+12 -3', status: 'completed' },
          { type: 'create', fileName: 'src/utils/helpers.ts', changes: '+18', status: 'completed' },
          { type: 'edit', fileName: 'src/components/index.ts', changes: '+3 -1', status: 'completed' },
          { type: 'edit', fileName: 'package.json', changes: '+2 -0', status: 'completed' },
        ],
        thinking: true,
      },
    },
    {
      delay: 3000,
      content: {
        text: "Done! I've made the requested changes.",
        toolCalls: [
          { type: 'read', fileName: 'src/App.tsx', status: 'completed' },
          { type: 'read', fileName: 'src/styles.css', status: 'completed' },
          { type: 'read', fileName: 'src/components/index.ts', status: 'completed' },
          { type: 'edit', fileName: 'src/App.tsx', changes: '+5 -2', status: 'completed' },
          { type: 'edit', fileName: 'src/styles.css', changes: '+12 -3', status: 'completed' },
          { type: 'create', fileName: 'src/utils/helpers.ts', changes: '+18', status: 'completed' },
          { type: 'edit', fileName: 'src/components/index.ts', changes: '+3 -1', status: 'completed' },
          { type: 'edit', fileName: 'package.json', changes: '+2 -0', status: 'completed' },
        ],
        thinking: false,
      },
    },
  ],
];

export function getResponseForMessage(messageText: string): MockResponseStep[] {
  const lowerText = messageText.toLowerCase();
  
  if (lowerText.includes('todo') || lowerText.includes('task')) {
    return todoAppResponse;
  }
  
  if (lowerText.includes('react')) {
    return useReactResponse;
  }
  
  return genericResponses[0];
}
