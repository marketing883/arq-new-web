'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';

// Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  contentType?: 'text' | 'architecture' | 'features' | 'demo' | 'contact';
}

export interface LeadData {
  name?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
  location?: string;
  phone?: string;
}

export interface ContentView {
  type: 'welcome' | 'architecture' | 'features' | 'demo' | 'pricing' | 'about' | 'contact' | 'custom';
  title?: string;
  data?: Record<string, unknown>;
  priority?: number;
}

interface ChatContextType {
  // Chat state
  messages: ChatMessage[];
  isOpen: boolean;
  isMinimized: boolean;
  isTyping: boolean;
  conversationId: string;

  // Lead data
  leadData: LeadData;
  leadScore: number;

  // Content state
  activeContent: ContentView;
  contentHistory: ContentView[];

  // Current page context
  currentPage: string;

  // Actions
  sendMessage: (content: string) => Promise<void>;
  toggleChat: () => void;
  minimizeChat: () => void;
  expandChat: () => void;
  setCurrentPage: (page: string) => void;
  updateLeadData: (data: Partial<LeadData>) => void;
  triggerContent: (content: ContentView) => void;
  clearChat: () => void;
}

const ChatContext = createContext<ChatContextType | null>(null);

export function useChatContext() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
}

// Content detection patterns
const CONTENT_PATTERNS: { pattern: RegExp; contentType: ContentView['type'] }[] = [
  { pattern: /architecture|platform|how.*work|technical|system/i, contentType: 'architecture' },
  { pattern: /feature|capability|can.*do|what.*offer/i, contentType: 'features' },
  { pattern: /demo|meeting|schedule|call|talk|discuss/i, contentType: 'demo' },
  { pattern: /price|pricing|cost|pay|subscription/i, contentType: 'pricing' },
  { pattern: /about|company|team|who|story/i, contentType: 'about' },
  { pattern: /contact|reach|email|support/i, contentType: 'contact' },
];

// Lead extraction patterns
const LEAD_PATTERNS = {
  email: /[\w.-]+@[\w.-]+\.\w+/i,
  phone: /(?:\+?1[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/,
  name: /(?:my name is|i'm|i am|call me)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/i,
  company: /(?:work(?:ing)? (?:at|for)|from|at|with)\s+([A-Z][A-Za-z0-9\s&]+?)(?:\s+(?:and|as|,|\.)|$)/i,
  jobTitle: /(?:i'm a|i am a|work as|title is|position is)\s+([A-Za-z\s]+?)(?:\s+(?:at|and|,|\.)|$)/i,
};

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const [conversationId] = useState(() => generateId());
  const [leadData, setLeadData] = useState<LeadData>({});
  const [leadScore, setLeadScore] = useState(0);
  const [activeContent, setActiveContent] = useState<ContentView>({ type: 'welcome' });
  const [contentHistory, setContentHistory] = useState<ContentView[]>([]);
  const [currentPage, setCurrentPage] = useState('/');
  const hasGreeted = useRef(false);

  // Calculate lead score based on data completeness and engagement
  useEffect(() => {
    let score = 0;
    if (leadData.name) score += 15;
    if (leadData.email) score += 25;
    if (leadData.company) score += 20;
    if (leadData.jobTitle) score += 15;
    if (leadData.phone) score += 15;
    score += Math.min(messages.length * 2, 10); // Engagement bonus
    setLeadScore(score);
  }, [leadData, messages]);

  // Save lead data when we have enough info
  useEffect(() => {
    if (leadData.email && leadData.name) {
      fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...leadData,
          conversationId,
          leadScore,
        }),
      }).catch(console.error);
    }
  }, [leadData, leadScore, conversationId]);

  // Proactive greeting based on page context
  useEffect(() => {
    if (!hasGreeted.current && !isMinimized && messages.length === 0) {
      hasGreeted.current = true;
      const greetings: Record<string, string> = {
        '/': "Hi! I'm ArqBot. I can help you explore how ArqAI helps enterprises deploy AI agents in production. What would you like to know?",
        '/architecture': "I see you're interested in our architecture! Our platform is built on three patented technologies. Want me to walk you through how they work together?",
        '/solutions': "Looking for solutions? I can help you find the right fit for your team. What challenges are you facing with AI deployment?",
        '/about': "Curious about ArqAI? We're an enterprise AI governance company. Ask me anything!",
      };

      const greeting = greetings[currentPage] || greetings['/'];

      setTimeout(() => {
        setMessages([{
          id: generateId(),
          role: 'assistant',
          content: greeting,
          timestamp: new Date(),
        }]);
      }, 500);
    }
  }, [isMinimized, currentPage, messages.length]);

  // Extract lead data from message
  const extractLeadData = useCallback((message: string) => {
    const updates: Partial<LeadData> = {};

    const emailMatch = message.match(LEAD_PATTERNS.email);
    if (emailMatch) updates.email = emailMatch[0];

    const phoneMatch = message.match(LEAD_PATTERNS.phone);
    if (phoneMatch) updates.phone = phoneMatch[0];

    const nameMatch = message.match(LEAD_PATTERNS.name);
    if (nameMatch) updates.name = nameMatch[1];

    const companyMatch = message.match(LEAD_PATTERNS.company);
    if (companyMatch) updates.company = companyMatch[1].trim();

    const titleMatch = message.match(LEAD_PATTERNS.jobTitle);
    if (titleMatch) updates.jobTitle = titleMatch[1].trim();

    if (Object.keys(updates).length > 0) {
      setLeadData(prev => ({ ...prev, ...updates }));
    }
  }, []);

  // Detect content type from message
  const detectContentType = useCallback((message: string): ContentView['type'] | null => {
    for (const { pattern, contentType } of CONTENT_PATTERNS) {
      if (pattern.test(message)) {
        return contentType;
      }
    }
    return null;
  }, []);

  // Send message
  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    // Extract lead data from user message
    extractLeadData(content);

    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Detect if we should change content view
    const detectedContent = detectContentType(content);
    if (detectedContent) {
      const newContent: ContentView = { type: detectedContent };
      setContentHistory(prev => [...prev, activeContent]);
      setActiveContent(newContent);
    }

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.role,
            content: m.content,
          })),
          conversationId,
          leadData,
          currentPage,
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: generateId(),
        role: 'assistant',
        content: data.message,
        timestamp: new Date(),
        contentType: data.contentType,
      };

      setMessages(prev => [...prev, assistantMessage]);

      // If API returned a content suggestion, apply it
      if (data.suggestedContent) {
        setContentHistory(prev => [...prev, activeContent]);
        setActiveContent(data.suggestedContent);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, {
        id: generateId(),
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again or email us at hello@thearq.ai.",
        timestamp: new Date(),
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, conversationId, extractLeadData, detectContentType, activeContent, leadData, currentPage]);

  const toggleChat = useCallback(() => {
    if (isMinimized) {
      setIsMinimized(false);
      setIsOpen(true);
    } else {
      setIsOpen(!isOpen);
    }
  }, [isMinimized, isOpen]);

  const minimizeChat = useCallback(() => {
    setIsMinimized(true);
    setIsOpen(false);
  }, []);

  const expandChat = useCallback(() => {
    setIsMinimized(false);
    setIsOpen(true);
  }, []);

  const updateLeadData = useCallback((data: Partial<LeadData>) => {
    setLeadData(prev => ({ ...prev, ...data }));
  }, []);

  const triggerContent = useCallback((content: ContentView) => {
    setContentHistory(prev => [...prev, activeContent]);
    setActiveContent(content);
  }, [activeContent]);

  const clearChat = useCallback(() => {
    setMessages([]);
    hasGreeted.current = false;
  }, []);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isOpen,
        isMinimized,
        isTyping,
        conversationId,
        leadData,
        leadScore,
        activeContent,
        contentHistory,
        currentPage,
        sendMessage,
        toggleChat,
        minimizeChat,
        expandChat,
        setCurrentPage,
        updateLeadData,
        triggerContent,
        clearChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
