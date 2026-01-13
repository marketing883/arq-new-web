'use client';

import React from 'react';
import { motion } from 'framer-motion';

const features = [
  {
    category: 'Governance & Compliance',
    icon: '🔐',
    items: [
      { title: 'Zero-Trust Architecture', description: 'Capability tokens for every action' },
      { title: 'Automatic Audit Evidence', description: 'Cryptographic receipts for all decisions' },
      { title: 'Regulatory Guardrails', description: 'Built-in HIPAA, GDPR, SOC 2 compliance' },
    ],
  },
  {
    category: 'Deployment & Scale',
    icon: '🚀',
    items: [
      { title: '30-Day Deployment', description: 'Production-ready in weeks, not quarters' },
      { title: 'Multi-Cloud Support', description: 'AWS, Azure, GCP, or on-premise' },
      { title: 'Model Agnostic', description: 'Works with any LLM provider' },
    ],
  },
  {
    category: 'Intelligence & Automation',
    icon: '🤖',
    items: [
      { title: 'Adaptive RAG', description: 'Self-improving knowledge retrieval' },
      { title: 'Agent Orchestration', description: 'Coordinate multi-step workflows' },
      { title: 'Real-Time Observability', description: 'Monitor every AI decision' },
    ],
  },
];

const useCases = [
  { icon: '💼', label: 'Finance', description: 'Automated compliance, risk assessment' },
  { icon: '🏥', label: 'Healthcare', description: 'HIPAA-compliant patient support' },
  { icon: '📡', label: 'Telecom', description: 'Intelligent network operations' },
  { icon: '🏭', label: 'Industrial', description: 'Predictive maintenance AI' },
  { icon: '🏠', label: 'Real Estate', description: 'Automated property management' },
  { icon: '🛒', label: 'Retail', description: 'Smart inventory & support' },
];

export function FeaturesContent() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Platform Capabilities
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Everything you need to deploy, manage, and scale AI agents with
          <span className="text-[#0047BA] font-semibold"> enterprise-grade governance</span>.
        </p>
      </motion.div>

      {/* Feature categories */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {features.map((category, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            className="space-y-4"
          >
            {/* Category header */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#0047BA]/10 flex items-center justify-center text-xl">
                {category.icon}
              </div>
              <h3 className="font-bold text-gray-900">{category.category}</h3>
            </div>

            {/* Feature items */}
            <div className="space-y-3">
              {category.items.map((item, itemIdx) => (
                <motion.div
                  key={itemIdx}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + 0.1 * itemIdx }}
                  className="p-4 rounded-xl bg-white/80 border border-gray-200/50 hover:border-[#0047BA]/30 hover:shadow-md transition-all"
                >
                  <h4 className="font-semibold text-gray-800 mb-1">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Why 87% fail section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mb-16 p-8 rounded-3xl bg-gradient-to-r from-[#0047BA]/5 to-[#C5F82A]/10 border border-[#0047BA]/10"
      >
        <div className="max-w-3xl mx-auto text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Why 87% of AI Pilots Fail to Deploy
          </h3>
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            {[
              { problem: 'No Governance', solution: 'Zero-trust by default', percent: '45%' },
              { problem: 'Compliance Gaps', solution: 'Built-in guardrails', percent: '30%' },
              { problem: 'No Observability', solution: 'Full audit trails', percent: '12%' },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
                <div className="text-3xl font-bold text-[#0047BA] mb-2">{item.percent}</div>
                <div className="text-sm text-gray-600 mb-1">{item.problem}</div>
                <div className="text-sm font-medium text-[#0047BA]">→ {item.solution}</div>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Use cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-xl font-bold text-center text-gray-900 mb-6">
          Trusted Across Industries
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {useCases.map((useCase, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              className="p-4 rounded-xl bg-white/80 border border-gray-200/50 text-center hover:border-[#0047BA]/30 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="text-2xl mb-2">{useCase.icon}</div>
              <div className="font-semibold text-gray-800 text-sm">{useCase.label}</div>
              <div className="text-xs text-gray-500 mt-1">{useCase.description}</div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
