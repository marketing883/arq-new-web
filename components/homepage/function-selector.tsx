'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Server, DollarSign, HeadphonesIcon, Megaphone, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const functions = [
  {
    id: 'it-infrastructure',
    title: 'IT Infrastructure',
    subtitle: 'Autonomous Operations',
    description: 'Governed CI/CD pipelines and infrastructure automation with compliance built-in.',
    icon: Server,
    stats: '40% faster deployments',
    gradient: 'from-blue-500/20 to-cyan-500/20',
    borderColor: 'hover:border-blue-500/50',
    iconColor: 'text-blue-400',
  },
  {
    id: 'revenue-ops',
    title: 'Revenue Operations',
    subtitle: 'Intelligent Automation',
    description: 'Governed automation for revenue workflows: lead routing, data enrichment, forecasting.',
    icon: DollarSign,
    stats: '95% data accuracy',
    gradient: 'from-emerald-500/20 to-green-500/20',
    borderColor: 'hover:border-emerald-500/50',
    iconColor: 'text-emerald-400',
  },
  {
    id: 'customer-success',
    title: 'Customer Success',
    subtitle: 'AI-Powered Support',
    description: 'Governed customer support automation with agent orchestration for ticket resolution.',
    icon: HeadphonesIcon,
    stats: '70% auto-resolution',
    gradient: 'from-violet-500/20 to-purple-500/20',
    borderColor: 'hover:border-violet-500/50',
    iconColor: 'text-violet-400',
  },
  {
    id: 'demand-gen',
    title: 'Demand Generation',
    subtitle: 'Marketing Intelligence',
    description: 'Governed marketing automation for campaigns, content generation, and lead nurturing.',
    icon: Megaphone,
    stats: '100% GDPR compliance',
    gradient: 'from-orange-500/20 to-amber-500/20',
    borderColor: 'hover:border-orange-500/50',
    iconColor: 'text-orange-400',
  },
];

export function FunctionSelector() {
  return (
    <section id="functions" className="relative py-32 bg-[#0a0a0f]">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px]" />
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
            <div className="w-2 h-2 rounded-full bg-[#00ff88] animate-pulse" />
            <span className="text-[#00ff88] text-sm font-medium">Explore Use Cases</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Transform Your Operations
            <br />
            <span className="text-gray-500">with Governed AI Agents</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-2xl mx-auto"
          >
            Select your function to explore how ArqAI can automate your workflows while maintaining full governance and compliance.
          </motion.p>
        </div>

        {/* Function cards grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {functions.map((func, index) => (
            <motion.div
              key={func.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/canvas/${func.id}`}>
                <div className={cn(
                  "group relative overflow-hidden rounded-3xl p-8 h-full transition-all duration-500",
                  "bg-[#0d0d12] border border-[#1a1a24]",
                  func.borderColor
                )}>
                  {/* Gradient background on hover */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                    func.gradient
                  )} />

                  {/* Glow effect */}
                  <div className="absolute -inset-px rounded-3xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                  {/* Content */}
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={cn(
                        "w-14 h-14 rounded-2xl flex items-center justify-center",
                        "bg-[#1a1a24] group-hover:bg-[#252530] transition-colors"
                      )}>
                        <func.icon className={cn("w-7 h-7", func.iconColor)} />
                      </div>
                      <ArrowUpRight className="w-6 h-6 text-gray-600 group-hover:text-white transition-colors transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">{func.subtitle}</p>
                      <h3 className="text-2xl font-bold text-white">{func.title}</h3>
                    </div>

                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {func.description}
                    </p>

                    {/* Stats badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-[#1a1a24] border border-[#252530]">
                      <span className="text-sm text-[#00ff88] font-medium">{func.stats}</span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
