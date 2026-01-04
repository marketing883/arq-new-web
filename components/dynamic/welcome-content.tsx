'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const suggestedQuestions = [
  { icon: '🏗️', text: 'How does your architecture work?', type: 'architecture' },
  { icon: '✨', text: 'What features do you offer?', type: 'features' },
  { icon: '📅', text: 'I want to schedule a demo', type: 'demo' },
  { icon: '🔒', text: 'Tell me about security & compliance', type: 'features' },
];

export function WelcomeContent() {
  return (
    <div className="text-center max-w-3xl mx-auto">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <Image
          src="/assets/images/arqai-logo.svg"
          alt="ArqAI"
          width={200}
          height={60}
          className="mx-auto"
          priority
        />
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
      >
        The AI Agent Platform
        <br />
        <span className="text-[#0047BA]">Enterprises Trust</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-xl text-gray-600 mb-12"
      >
        Deploy governed AI agents in <span className="font-semibold text-[#0047BA]">30 days</span>, not quarters.
        <br />
        One control plane for all AI systems across any cloud, any model, any vertical.
      </motion.p>

      {/* Stats row */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
      >
        {[
          { value: '$500K', label: 'ARR' },
          { value: '12', label: 'Enterprise Customers' },
          { value: '0%', label: 'Churn Rate' },
          { value: '6', label: 'Industry Verticals' },
        ].map((stat, idx) => (
          <div key={idx} className="p-4 rounded-2xl bg-white/50 border border-gray-100">
            <div className="text-2xl md:text-3xl font-bold text-[#0047BA]">{stat.value}</div>
            <div className="text-sm text-gray-500">{stat.label}</div>
          </div>
        ))}
      </motion.div>

      {/* Suggested questions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <p className="text-sm text-gray-500 mb-4">Ask me about:</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {suggestedQuestions.map((question, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 p-4 rounded-xl bg-white/80 border border-gray-200/50 text-left hover:border-[#0047BA]/30 hover:shadow-md transition-all group"
            >
              <span className="text-2xl">{question.icon}</span>
              <span className="text-gray-700 group-hover:text-[#0047BA] transition-colors">
                {question.text}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Trust badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-12 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#C5F82A]/20 border border-[#C5F82A]/30"
      >
        <span className="w-2 h-2 rounded-full bg-[#C5F82A] animate-pulse" />
        <span className="text-sm text-gray-700">
          GEC 2025 Winner for AI Governance Innovation
        </span>
      </motion.div>
    </div>
  );
}
