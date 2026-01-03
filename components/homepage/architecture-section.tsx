'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Cpu, Database, Cloud, Lock, Eye, Workflow, Layers, ArrowRight, CheckCircle } from 'lucide-react';

export function ArchitectureSection() {
  return (
    <section className="relative py-32 bg-[#060609] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#00ff88]/5 rounded-full blur-[200px]" />

        {/* Grid lines */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '100px 100px',
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/20 bg-[#00ff88]/5 mb-6"
          >
            <Layers className="w-4 h-4 text-[#00ff88]" />
            <span className="text-[#00ff88] text-sm font-medium">Platform Architecture</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Built for Enterprise
            <br />
            <span className="bg-gradient-to-r from-[#00ff88] to-cyan-400 bg-clip-text text-transparent">
              AI Governance
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Three patented technologies that solve the fundamental bottleneck preventing enterprise AI adoption.
          </motion.p>
        </div>

        {/* Architecture Diagram */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto mb-20"
        >
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff88]/10 via-cyan-500/10 to-purple-500/10 rounded-[40px] blur-2xl" />

            {/* Main container */}
            <div className="relative bg-[#0a0a0f] border border-[#1a1a24] rounded-[32px] p-8 md:p-12">
              {/* Top: External Systems */}
              <div className="mb-8">
                <p className="text-gray-500 text-sm mb-4 text-center">External Systems</p>
                <div className="flex flex-wrap justify-center gap-4">
                  {['Any Cloud', 'Any Model', 'Any Vertical', 'Any Data Source'].map((item) => (
                    <div
                      key={item}
                      className="px-6 py-3 rounded-xl bg-[#1a1a24] border border-[#252530] text-gray-300 text-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Connection lines */}
              <div className="flex justify-center mb-8">
                <div className="w-px h-12 bg-gradient-to-b from-[#252530] to-[#00ff88]/50" />
              </div>

              {/* Middle: ArqAI Control Plane */}
              <div className="relative mb-8">
                <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff88]/5 to-cyan-500/5 rounded-3xl" />
                <div className="relative bg-[#0d0d12] border-2 border-[#00ff88]/30 rounded-3xl p-8">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00ff88]/10 border border-[#00ff88]/30 mb-4">
                      <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
                      <span className="text-[#00ff88] font-semibold">ArqAI Control Plane</span>
                    </div>
                    <p className="text-gray-400">One unified platform for all AI governance</p>
                  </div>

                  {/* Three core technologies */}
                  <div className="grid md:grid-cols-3 gap-6">
                    {/* Trust-Aware Agent Orchestration */}
                    <div className="bg-[#0a0a0f] rounded-2xl p-6 border border-[#1a1a24]">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                        <Workflow className="w-6 h-6 text-blue-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Trust-Aware Agent Orchestration™</h4>
                      <p className="text-gray-500 text-sm mb-4">Governs every autonomous action with capability tokens</p>
                      <ul className="space-y-2">
                        {['Zero-trust by default', 'Complete auditability', 'Risk reduction'].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 text-[#00ff88]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Compliance-Aware Prompt Compiler */}
                    <div className="bg-[#0a0a0f] rounded-2xl p-6 border border-[#1a1a24]">
                      <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                        <Shield className="w-6 h-6 text-purple-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Compliance-Aware Prompt Compiler™</h4>
                      <p className="text-gray-500 text-sm mb-4">Validates requests against policy before execution</p>
                      <ul className="space-y-2">
                        {['Proactive compliance', 'Audit readiness', 'Policy consistency'].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 text-[#00ff88]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Observability-Driven Adaptive RAG */}
                    <div className="bg-[#0a0a0f] rounded-2xl p-6 border border-[#1a1a24]">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-4">
                        <Eye className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h4 className="text-white font-semibold mb-2">Observability-Driven Adaptive RAG™</h4>
                      <p className="text-gray-500 text-sm mb-4">Self-correcting retrieval for always-accurate answers</p>
                      <ul className="space-y-2">
                        {['Always current', 'No manual tuning', 'Cost efficiency'].map((item) => (
                          <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                            <CheckCircle className="w-3 h-3 text-[#00ff88]" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Connection lines */}
              <div className="flex justify-center mb-8">
                <div className="w-px h-12 bg-gradient-to-b from-[#00ff88]/50 to-[#252530]" />
              </div>

              {/* Bottom: Outputs */}
              <div>
                <p className="text-gray-500 text-sm mb-4 text-center">Automated Outputs</p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { icon: Lock, label: 'Cryptographic Receipts', color: 'text-yellow-400' },
                    { icon: Database, label: 'Audit Evidence', color: 'text-blue-400' },
                    { icon: Cpu, label: 'Governed Actions', color: 'text-purple-400' },
                    { icon: Cloud, label: 'Compliance Reports', color: 'text-cyan-400' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex flex-col items-center gap-3 p-4 rounded-xl bg-[#1a1a24] border border-[#252530]"
                    >
                      <item.icon className={`w-6 h-6 ${item.color}`} />
                      <span className="text-gray-300 text-sm text-center">{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {[
            { value: '3', label: 'Patents Filed' },
            { value: '6', label: 'Industry Verticals' },
            { value: 'SOC 2', label: 'In Progress Q2 2026' },
            { value: 'FedRAMP', label: 'Architecture Ready' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold text-[#00ff88] mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
