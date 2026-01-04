'use client';

import React from 'react';
import { motion } from 'framer-motion';

const technologies = [
  {
    name: 'Trust-Aware Agent Orchestration™',
    description: 'Zero-trust architecture with capability tokens for every action. Agents only do what they are explicitly authorized to do.',
    icon: '🛡️',
    color: '#0047BA',
  },
  {
    name: 'Compliance-Aware Prompt Compiler™',
    description: 'Automatically injects regulatory guardrails into every AI interaction. Built-in compliance for HIPAA, GDPR, SOC 2, and more.',
    icon: '⚖️',
    color: '#003594',
  },
  {
    name: 'Observability-Driven Adaptive RAG™',
    description: 'Real-time monitoring with cryptographic audit trails. Every decision is logged, explained, and auditable.',
    icon: '🔍',
    color: '#002266',
  },
];

const flowSteps = [
  { label: 'External Systems', items: ['CRM', 'ERP', 'Databases', 'APIs'] },
  { label: 'ArqAI Control Plane', items: ['Orchestration', 'Compliance', 'RAG'] },
  { label: 'Enterprise Outputs', items: ['Decisions', 'Automations', 'Reports'] },
];

export function ArchitectureContent() {
  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Platform Architecture
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Built on three patented technologies that solve why{' '}
          <span className="font-semibold text-[#0047BA]">87% of enterprise AI pilots fail</span>{' '}
          to reach production.
        </p>
      </motion.div>

      {/* Architecture Flow Diagram */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-16"
      >
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-8">
          {flowSteps.map((step, idx) => (
            <React.Fragment key={idx}>
              {/* Step card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 * idx }}
                className={`flex-1 p-6 rounded-2xl border ${
                  idx === 1
                    ? 'bg-[#0047BA] text-white border-[#0047BA] shadow-xl shadow-blue-500/20'
                    : 'bg-white/80 border-gray-200'
                }`}
              >
                <h3 className={`font-bold text-lg mb-3 ${idx === 1 ? 'text-white' : 'text-gray-800'}`}>
                  {step.label}
                </h3>
                <ul className="space-y-2">
                  {step.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className={`text-sm flex items-center gap-2 ${
                        idx === 1 ? 'text-blue-100' : 'text-gray-600'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${idx === 1 ? 'bg-[#C5F82A]' : 'bg-[#0047BA]'}`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Arrow between steps */}
              {idx < flowSteps.length - 1 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + 0.1 * idx }}
                  className="hidden md:flex items-center"
                >
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#0047BA] to-[#C5F82A]" />
                  <div className="w-0 h-0 border-t-4 border-b-4 border-l-8 border-transparent border-l-[#C5F82A]" />
                </motion.div>
              )}
            </React.Fragment>
          ))}
        </div>
      </motion.div>

      {/* Three Technologies */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-3 gap-6"
      >
        {technologies.map((tech, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + 0.1 * idx }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-2xl bg-white/80 border border-gray-200/50 hover:border-[#0047BA]/30 hover:shadow-lg transition-all"
          >
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
              style={{ backgroundColor: `${tech.color}15` }}
            >
              {tech.icon}
            </div>
            <h3 className="font-bold text-gray-900 mb-2">{tech.name}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{tech.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Security badges */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 flex flex-wrap justify-center gap-4"
      >
        {[
          { label: 'SOC 2 Type II', status: 'In Progress (Q2 2026)' },
          { label: 'FedRAMP', status: 'Architecture Ready' },
          { label: 'HIPAA', status: 'Compliant' },
          { label: 'GDPR', status: 'Compliant' },
        ].map((badge, idx) => (
          <div
            key={idx}
            className="px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm"
          >
            <span className="font-medium text-gray-700">{badge.label}</span>
            <span className="text-gray-400 ml-2">• {badge.status}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
