'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Zap, Eye, Clock, FileCheck, Lock } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Governance Built-In',
    description: 'Every AI action flows through our control plane. Policies enforced before execution, not after.',
  },
  {
    icon: Zap,
    title: 'Controlled Autonomy',
    description: 'AI agents receive scoped, one-time permissions. Fully traceable and reversible actions.',
  },
  {
    icon: Eye,
    title: 'Always-Accurate Knowledge',
    description: 'System detects when answers drift from source data and auto-corrects in real-time.',
  },
  {
    icon: Clock,
    title: '30-Day Deployment',
    description: 'From blueprint to production in one month. No lengthy discovery phases or pilots that stall.',
  },
  {
    icon: FileCheck,
    title: 'Automatic Audit Evidence',
    description: 'Cryptographic receipts for every action. Compliance evidence generated automatically.',
  },
  {
    icon: Lock,
    title: 'Zero-Trust Architecture',
    description: 'Every action requires fresh authorization. Least-privilege access by default.',
  },
];

export function ValueProposition() {
  return (
    <section className="section bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
          >
            Why 87% of AI Pilots Never Deploy
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-3xl mx-auto"
          >
            Governance and compliance gaps keep enterprises stuck in pilot mode. ArqAI eliminates this bottleneck by making governance the foundation, not an afterthought.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="relative p-6 rounded-2xl border border-gray-100 hover:border-[#0A2463]/20 transition-all duration-300 hover:shadow-lg h-full">
                <div className="w-12 h-12 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#A7FF83]/30 transition-colors">
                  <feature.icon className="h-6 w-6 text-[#0A2463]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0A2463] mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
