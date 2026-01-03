import { create } from 'zustand';
import type { Message, ContentBlock, FunctionType } from '@/types';
import { v4 as uuidv4 } from 'uuid';

interface ConversationState {
  // Conversation
  conversationId: string;
  messages: Message[];
  isStreaming: boolean;

  // Function context
  currentFunction: FunctionType | null;

  // Content blocks
  displayedBlocks: ContentBlock[];

  // Navigation history
  history: string[];
  historyIndex: number;

  // Lead capture
  leadCaptured: boolean;
  leadEmail: string | null;

  // Actions
  addMessage: (role: 'user' | 'assistant', content: string) => void;
  updateLastMessage: (content: string) => void;
  setStreaming: (isStreaming: boolean) => void;
  setCurrentFunction: (func: FunctionType) => void;
  addContentBlock: (block: Omit<ContentBlock, 'id' | 'visible'>) => void;
  removeContentBlock: (blockId: string) => void;
  toggleBlockVisibility: (blockId: string) => void;
  setLeadCaptured: (email: string) => void;
  goBack: () => void;
  goForward: () => void;
  resetConversation: () => void;
}

export const useConversationStore = create<ConversationState>((set, get) => ({
  // Initial state
  conversationId: uuidv4(),
  messages: [],
  isStreaming: false,
  currentFunction: null,
  displayedBlocks: [],
  history: [],
  historyIndex: -1,
  leadCaptured: false,
  leadEmail: null,

  // Actions
  addMessage: (role, content) => {
    const newMessage: Message = {
      id: uuidv4(),
      role,
      content,
      timestamp: new Date(),
    };

    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  updateLastMessage: (content) => {
    set((state) => {
      const messages = [...state.messages];
      if (messages.length > 0) {
        messages[messages.length - 1] = {
          ...messages[messages.length - 1],
          content,
        };
      }
      return { messages };
    });
  },

  setStreaming: (isStreaming) => {
    set({ isStreaming });
  },

  setCurrentFunction: (func) => {
    set({ currentFunction: func });
  },

  addContentBlock: (block) => {
    const newBlock: ContentBlock = {
      id: uuidv4(),
      visible: true,
      ...block,
    };

    set((state) => ({
      displayedBlocks: [...state.displayedBlocks, newBlock],
    }));
  },

  removeContentBlock: (blockId) => {
    set((state) => ({
      displayedBlocks: state.displayedBlocks.filter((b) => b.id !== blockId),
    }));
  },

  toggleBlockVisibility: (blockId) => {
    set((state) => ({
      displayedBlocks: state.displayedBlocks.map((b) =>
        b.id === blockId ? { ...b, visible: !b.visible } : b
      ),
    }));
  },

  setLeadCaptured: (email) => {
    set({ leadCaptured: true, leadEmail: email });
  },

  goBack: () => {
    const { historyIndex, history } = get();
    if (historyIndex > 0) {
      set({ historyIndex: historyIndex - 1 });
    }
  },

  goForward: () => {
    const { historyIndex, history } = get();
    if (historyIndex < history.length - 1) {
      set({ historyIndex: historyIndex + 1 });
    }
  },

  resetConversation: () => {
    set({
      conversationId: uuidv4(),
      messages: [],
      isStreaming: false,
      displayedBlocks: [],
      history: [],
      historyIndex: -1,
      leadCaptured: false,
      leadEmail: null,
    });
  },
}));
