'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Clock, Eye, CheckCircle, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Governance Built-In',
    description: 'Every AI action flows through our control plane. Policies enforced before execution, not after.',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
  },
  {
    icon: Zap,
    title: 'Controlled Autonomy',
    description: 'AI agents receive scoped, one-time permissions. Fully traceable and reversible actions.',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
  },
  {
    icon: Eye,
    title: 'Always-Accurate Knowledge',
    description: 'System detects when answers drift from source data and auto-corrects in real-time.',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
  },
  {
    icon: Clock,
    title: '30-Day Deployment',
    description: 'From blueprint to production in one month. No lengthy discovery phases or pilots that stall.',
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
  },
  {
    icon: CheckCircle,
    title: 'Automatic Audit Evidence',
    description: 'Cryptographic receipts for every action. Compliance evidence generated automatically.',
    color: 'text-cyan-400',
    bgColor: 'bg-cyan-500/10',
    borderColor: 'border-cyan-500/20',
  },
  {
    icon: TrendingUp,
    title: 'Zero-Trust Architecture',
    description: 'Every action requires fresh authorization. Least-privilege access by default.',
    color: 'text-pink-400',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/20',
  },
];

export function ValueProposition() {
  return (
    <section className="relative py-32 bg-[#0a0a0f]">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#00ff88]/5 rounded-full blur-[120px]" />
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
            <span className="text-[#00ff88] text-sm font-medium">Why 87% of AI Pilots Fail</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            Governance is the
            <br />
            <span className="bg-gradient-to-r from-[#00ff88] to-cyan-400 bg-clip-text text-transparent">
              Foundation, Not an Afterthought
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Governance and compliance gaps keep enterprises stuck in pilot mode. ArqAI eliminates this bottleneck by making governance the foundation, not an afterthought.
          </motion.p>
        </div>

        {/* Features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="h-full p-8 rounded-3xl bg-[#0d0d12] border border-[#1a1a24] hover:border-[#252530] transition-all duration-300">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-2xl ${feature.bgColor} border ${feature.borderColor} flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-7 h-7 ${feature.color}`} />
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
