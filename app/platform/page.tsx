'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Shield,
  Zap,
  Eye,
  Layers,
  Cloud,
  Database,
  Lock,
  CheckCircle,
  ArrowRight,
  Fingerprint,
  FileCode,
  Server,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const capabilities = [
  {
    icon: Shield,
    title: 'Policy Enforcement',
    description: 'Every AI action checked against customer-defined rules before execution. Blocks compliance violations before they happen.',
  },
  {
    icon: Zap,
    title: 'Controlled Autonomy',
    description: 'AI agents receive one-time, scoped permissions for each action. Fully traceable and reversible with least-privilege by default.',
  },
  {
    icon: Eye,
    title: 'Accurate Knowledge',
    description: 'System detects when answers drift from source data and auto-corrects retrieval in real-time.',
  },
  {
    icon: FileCode,
    title: 'Automatic Audit Evidence',
    description: 'Cryptographic evidence packets for every action. Immutable and verifiable by auditors.',
  },
  {
    icon: Lock,
    title: 'Zero-Trust Architecture',
    description: 'No implicit trust. Every action requires fresh authorization with continuous verification.',
  },
  {
    icon: Database,
    title: 'Multi-Source Integration',
    description: 'Works with any cloud, any model, any vertical. API-first architecture for seamless integration.',
  },
];

const patents = [
  {
    icon: Fingerprint,
    title: 'Trust-Aware Agent Orchestration',
    trademarked: true,
    description: 'Lineage-driven risk engine computing contextual risk scores and issuing scoped capability tokens.',
  },
  {
    icon: FileCode,
    title: 'Compliance-Aware Prompt Compiler',
    trademarked: true,
    description: 'Transforms natural language into compliance-annotated execution plans validated before execution.',
  },
  {
    icon: Eye,
    title: 'Observability-Driven Adaptive RAG',
    trademarked: true,
    description: 'Closed-loop retrieval monitoring answer quality and auto-adapting to maintain accuracy.',
  },
];

const integrations = [
  { category: 'Cloud', items: ['AWS', 'Azure', 'GCP', 'On-Premises'] },
  { category: 'Models', items: ['OpenAI', 'Anthropic', 'Open-Source', 'Custom'] },
  { category: 'Systems', items: ['CRM', 'ITSM', 'ERP', 'Databases'] },
];

export default function PlatformPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2463] to-[#0A2463]/95 text-white py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6"
            >
              <Layers className="h-4 w-4 text-[#A7FF83]" />
              <span>Platform Overview</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              The Governed AI Platform Built for Production
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              ArqAI sits as a governance layer between enterprise teams and their systems.
              Every AI action flows through our control plane before execution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Button variant="accent" size="lg" asChild>
                <Link href="/#explore">
                  Explore Use Cases
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              87% of Enterprise AI Pilots Never Deploy
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Governance and compliance gaps keep enterprises stuck in pilot mode.
              ArqAI eliminates this bottleneck by making governance the foundation, not an afterthought.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-[#0A2463]/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center mb-4">
                  <capability.icon className="h-6 w-6 text-[#0A2463]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0A2463] mb-2">
                  {capability.title}
                </h3>
                <p className="text-gray-600">
                  {capability.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Patents Section */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Three Core Technologies
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Patented innovations that solve the fundamental bottleneck preventing enterprise AI adoption.
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
                className="bg-white rounded-2xl p-8 shadow-sm"
              >
                <div className="w-14 h-14 bg-[#0A2463] rounded-xl flex items-center justify-center mb-6">
                  <patent.icon className="h-7 w-7 text-[#A7FF83]" />
                </div>
                <h3 className="text-xl font-semibold text-[#0A2463] mb-3">
                  {patent.title}
                  {patent.trademarked && <span className="text-[#A7FF83] text-sm ml-1">™</span>}
                </h3>
                <p className="text-gray-600">
                  {patent.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Works With Everything
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Cloud agnostic. Model agnostic. Vertical agnostic.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {integrations.map((integration, index) => (
              <motion.div
                key={integration.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-[#0A2463] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-6 w-6 text-[#A7FF83]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0A2463] mb-4">
                  {integration.category}
                </h3>
                <div className="space-y-2">
                  {integration.items.map((item) => (
                    <div key={item} className="flex items-center justify-center gap-2 text-gray-600">
                      <CheckCircle className="h-4 w-4 text-[#A7FF83]" />
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#0A2463] text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready to Deploy Governed AI?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 mb-8"
            >
              Start with a 30-day blueprint and see governance in action.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button variant="accent" size="lg">
                Book a Demo
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
