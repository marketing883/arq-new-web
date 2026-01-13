'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatSidebar } from './chat-sidebar';
import { ContentArea } from './content-area';
import { cn } from '@/lib/utils';
import type { FunctionType } from '@/types';

interface CanvasLayoutProps {
  functionType: FunctionType;
}

const functionConfig = {
  'it-infrastructure': {
    title: 'Autonomous IT Infrastructure',
    description: 'Governed CI/CD pipelines and infrastructure automation',
    gradient: 'from-blue-500 to-blue-600',
    welcomeMessage: "Hi! I'm ArqAI's infrastructure specialist. I can help you understand how governed AI agents can automate your IT operations - from incident response to CI/CD pipelines. What challenges are you facing?",
  },
  'revenue-ops': {
    title: 'Revenue Operations Automation',
    description: 'Governed automation for revenue workflows',
    gradient: 'from-green-500 to-green-600',
    welcomeMessage: "Hello! I specialize in revenue operations automation. I can show you how ArqAI governs lead routing, data enrichment, and forecasting workflows. What's your biggest RevOps challenge?",
  },
  'customer-success': {
    title: 'Autonomous Customer Success',
    description: 'Governed customer support automation',
    gradient: 'from-purple-500 to-purple-600',
    welcomeMessage: "Hi there! I focus on customer success automation. Let me show you how ArqAI can automate tier-1 support while maintaining governance and compliance. What's on your mind?",
  },
  'demand-gen': {
    title: 'Autonomous Demand Generation',
    description: 'Governed marketing automation',
    gradient: 'from-orange-500 to-orange-600',
    welcomeMessage: "Welcome! I'm your demand generation specialist. I can explain how ArqAI governs marketing automation - from campaigns to content generation - while ensuring compliance. What would you like to explore?",
  },
};

export function CanvasLayout({ functionType }: CanvasLayoutProps) {
  const config = functionConfig[functionType];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Function Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={cn(
          "bg-gradient-to-r text-white py-6 px-6",
          config.gradient
        )}
      >
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold">{config.title}</h1>
          <p className="text-white/80">{config.description}</p>
        </div>
      </motion.div>

      {/* Main Canvas Area */}
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1fr,400px] gap-6 h-[calc(100vh-200px)]">
          {/* Content Blocks Area */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-2 lg:order-1"
          >
            <ContentArea functionType={functionType} />
          </motion.div>

          {/* Chat Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="order-1 lg:order-2"
          >
            <ChatSidebar welcomeMessage={config.welcomeMessage} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
