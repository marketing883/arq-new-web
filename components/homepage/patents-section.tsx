'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, FileCode, Database, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const patents = [
  {
    icon: Fingerprint,
    title: 'Trust-Aware Agent Orchestration',
    trademarked: true,
    description: 'A lineage-driven risk engine that governs every autonomous action by computing contextual risk scores and issuing scoped, single-use capability tokens.',
    outcomes: ['Zero-trust by default', 'Complete auditability', 'Risk reduction'],
  },
  {
    icon: FileCode,
    title: 'Compliance-Aware Prompt Compiler',
    trademarked: true,
    description: 'A compiler that transforms natural language requests into compliance-annotated execution plans, validated against policy rules before execution.',
    outcomes: ['Proactive compliance', 'Audit readiness', 'Policy consistency'],
  },
  {
    icon: Database,
    title: 'Observability-Driven Adaptive RAG',
    trademarked: true,
    description: 'A closed-loop retrieval system that monitors answer quality in real-time and automatically adapts retrieval parameters to maintain accuracy.',
    outcomes: ['Always current', 'No manual tuning', 'Cost efficiency'],
  },
];

export function PatentsSection() {
  return (
    <section className="section bg-[#0A2463] text-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6"
          >
            <span className="text-[#A7FF83]">3 Patented Technologies</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            The Technology Behind ArqAI
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Three patented innovations that solve the fundamental bottleneck preventing enterprise AI adoption.
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {patents.map((patent, index) => (
            <motion.div
              key={patent.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-[#A7FF83]/50 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center mb-6">
                <patent.icon className="h-7 w-7 text-[#A7FF83]" />
              </div>
              <h3 className="text-xl font-semibold mb-3">
                {patent.title}
                {patent.trademarked && <span className="text-[#A7FF83] text-sm ml-1">™</span>}
              </h3>
              <p className="text-gray-300 mb-6">
                {patent.description}
              </p>
              <div className="space-y-2">
                {patent.outcomes.map((outcome) => (
                  <div key={outcome} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-1.5 h-1.5 bg-[#A7FF83] rounded-full" />
                    {outcome}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Button variant="accent" size="lg" asChild>
            <Link href="/platform">
              Learn More About Our Platform
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
