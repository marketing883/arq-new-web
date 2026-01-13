'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext } from './chat-provider';

// Icons as inline SVGs for cleaner code
const SendIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13" />
    <polygon points="22,2 15,22 11,13 2,9" />
  </svg>
);

const MinimizeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChatBubbleIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// Typing indicator
const TypingIndicator = () => (
  <div className="flex items-center gap-1 px-4 py-3">
    <div className="flex gap-1">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-2 h-2 rounded-full bg-[#0047BA]"
          animate={{ y: [0, -6, 0] }}
          transition={{
            duration: 0.6,
            repeat: Infinity,
            delay: i * 0.15,
          }}
        />
      ))}
    </div>
    <span className="text-sm text-gray-500 ml-2">ArqBot is typing...</span>
  </div>
);

// Message bubble component
const MessageBubble = ({ message }: { message: { role: string; content: string; timestamp: Date } }) => {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-3`}
    >
      <div
        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
          isUser
            ? 'bg-[#0047BA] text-white rounded-br-md'
            : 'bg-white/80 text-gray-800 border border-gray-200/50 rounded-bl-md shadow-sm'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
        <p className={`text-[10px] mt-1 ${isUser ? 'text-blue-200' : 'text-gray-400'}`}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
};

export function ChatInterface() {
  const {
    messages,
    isOpen,
    isMinimized,
    isTyping,
    sendMessage,
    toggleChat,
    minimizeChat,
  } = useChatContext();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen, isMinimized]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const message = input;
    setInput('');
    await sendMessage(message);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  // Mobile bubble view
  if (isMinimized) {
    return (
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0, opacity: 0 }}
        onClick={toggleChat}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#0047BA] text-white shadow-lg shadow-blue-500/30 flex items-center justify-center hover:bg-[#003594] transition-colors group md:hidden"
      >
        <ChatBubbleIcon />
        {/* Pulse indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5F82A] rounded-full animate-pulse" />
      </motion.button>
    );
  }

  return (
    <AnimatePresence>
      {!isMinimized && (
        <>
          {/* Desktop: Bottom center chat bar */}
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-4 hidden md:block"
          >
            {/* Chat container with glass effect */}
            <div className="relative backdrop-blur-xl bg-white/70 border border-white/50 rounded-3xl shadow-2xl shadow-black/10 overflow-hidden">
              {/* Messages area - expandable */}
              <AnimatePresence>
                {isOpen && messages.length > 0 && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="max-h-[400px] overflow-y-auto"
                  >
                    <div className="p-4 space-y-1">
                      {messages.map((message) => (
                        <MessageBubble key={message.id} message={message} />
                      ))}
                      {isTyping && <TypingIndicator />}
                      <div ref={messagesEndRef} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Input area */}
              <form onSubmit={handleSubmit} className="flex items-center gap-3 p-4">
                {/* ArqAI Logo icon */}
                <div className="w-10 h-10 rounded-full bg-[#0047BA] flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">Arq</span>
                </div>

                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask ArqBot anything..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400 text-base"
                />

                {/* Action buttons */}
                <div className="flex items-center gap-2">
                  {messages.length > 0 && (
                    <button
                      type="button"
                      onClick={() => toggleChat()}
                      className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                      title={isOpen ? 'Collapse' : 'Expand'}
                    >
                      <MinimizeIcon />
                    </button>
                  )}
                  <button
                    type="submit"
                    disabled={!input.trim() || isTyping}
                    className="p-3 rounded-full bg-[#0047BA] text-white hover:bg-[#003594] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-blue-500/20"
                  >
                    <SendIcon />
                  </button>
                </div>
              </form>

              {/* Subtle glow effect */}
              <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 h-20 bg-[#C5F82A]/20 blur-3xl pointer-events-none" />
            </div>
          </motion.div>

          {/* Mobile: Full screen chat */}
          <motion.div
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 bg-gray-50/95 backdrop-blur-xl md:hidden flex flex-col"
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200/50 bg-white/50 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#0047BA] flex items-center justify-center">
                  <span className="text-white font-bold text-sm">Arq</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">ArqBot</h3>
                  <p className="text-xs text-gray-500">Online • Ready to help</p>
                </div>
              </div>
              <button
                onClick={minimizeChat}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <CloseIcon />
              </button>
            </div>

            {/* Mobile messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {messages.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-[#0047BA]/10 flex items-center justify-center mx-auto mb-4">
                    <ChatBubbleIcon />
                  </div>
                  <p className="text-gray-500">Start a conversation with ArqBot</p>
                </div>
              )}
              {messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </div>

            {/* Mobile input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 bg-white/80 backdrop-blur-sm border-t border-gray-200/50"
            >
              <div className="flex items-center gap-3 bg-gray-100/80 rounded-full px-4 py-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 bg-transparent border-none outline-none text-gray-800 placeholder-gray-400"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isTyping}
                  className="p-2 rounded-full bg-[#0047BA] text-white disabled:opacity-50"
                >
                  <SendIcon />
                </button>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
