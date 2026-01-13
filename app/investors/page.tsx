'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Users,
  Building2,
  Award,
  ArrowRight,
  Download,
  Mail,
  Fingerprint,
  FileCode,
  Eye,
  Globe,
  BarChart3,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const metrics = [
  { label: 'ARR', value: '$500K', icon: TrendingUp },
  { label: 'Pipeline', value: '$3.2M', icon: BarChart3 },
  { label: 'Enterprise Customers', value: '12', icon: Building2 },
  { label: 'Churn Rate', value: '0%', icon: Users },
];

const verticals = [
  'Finance',
  'Healthcare',
  'Telecom',
  'Industrial',
  'Real Estate',
  'Retail',
];

const patents = [
  {
    icon: Fingerprint,
    title: 'Trust-Aware Agent Orchestration',
    trademarked: true,
    description: 'Lineage-driven risk engine computing contextual risk scores.',
  },
  {
    icon: FileCode,
    title: 'Compliance-Aware Prompt Compiler',
    trademarked: true,
    description: 'Transforms requests into compliance-annotated execution plans.',
  },
  {
    icon: Eye,
    title: 'Observability-Driven Adaptive RAG',
    trademarked: true,
    description: 'Closed-loop retrieval that auto-adapts to maintain accuracy.',
  },
];

const teamHighlights = [
  '150+ years collective enterprise experience',
  'ACI InfoTech pedigree (20-year Fortune 500 company)',
  'Deep expertise in regulated industries',
  'Three patented AI governance technologies',
];

export default function InvestorsPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would trigger an API call
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2463] to-[#0A2463]/95 text-white py-24">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6"
            >
              <TrendingUp className="h-4 w-4 text-[#A7FF83]" />
              <span>Investor Relations</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              87% of Enterprise AI Pilots Never Deploy
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl text-[#A7FF83] font-semibold mb-4"
            >
              ArqAI is the Governed Control Plane
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl text-gray-300 mb-8"
            >
              We are raising a $20M seed round to accelerate enterprise AI governance adoption.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Market Opportunity */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Market Opportunity
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[#F8F9FA] rounded-2xl p-8"
            >
              <div className="text-4xl font-bold text-[#0A2463] mb-2">$28B</div>
              <div className="text-lg text-gray-600 mb-4">AI Governance Market</div>
              <p className="text-gray-500">
                Growing rapidly as enterprises face increasing regulatory pressure and governance requirements.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-[#F8F9FA] rounded-2xl p-8"
            >
              <div className="text-4xl font-bold text-[#0A2463] mb-2">$235B</div>
              <div className="text-lg text-gray-600 mb-4">Enterprise Workflow Automation</div>
              <p className="text-gray-500">
                Massive opportunity in regulated industries where governance is the key blocker.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Traction */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Traction & Metrics
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <metric.icon className="h-8 w-8 text-[#A7FF83] mx-auto mb-3" />
                <div className="text-3xl font-bold text-[#0A2463] mb-1">{metric.value}</div>
                <div className="text-sm text-gray-500">{metric.label}</div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-4">
              <Award className="h-6 w-6 text-[#A7FF83]" />
              <span className="text-lg font-semibold text-[#0A2463]">GEC 2025 Winner</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3">
              {verticals.map((vertical) => (
                <span
                  key={vertical}
                  className="px-4 py-2 bg-white rounded-full text-sm font-medium text-gray-700 shadow-sm"
                >
                  {vertical}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Patents */}
      <section className="section bg-[#0A2463] text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
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
              Defensible IP Moat
            </motion.h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {patents.map((patent, index) => (
              <motion.div
                key={patent.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10"
              >
                <div className="w-14 h-14 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center mb-6">
                  <patent.icon className="h-7 w-7 text-[#A7FF83]" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {patent.title}
                  {patent.trademarked && <span className="text-[#A7FF83] text-sm ml-1">™</span>}
                </h3>
                <p className="text-gray-300">{patent.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
              >
                World-Class Team
              </motion.h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {teamHighlights.map((highlight, index) => (
                <motion.div
                  key={highlight}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3 p-4 bg-[#F8F9FA] rounded-xl"
                >
                  <CheckCircle className="h-6 w-6 text-[#A7FF83] flex-shrink-0" />
                  <span className="text-gray-700">{highlight}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Deck Download */}
      <section className="section bg-gradient-to-br from-[#A7FF83] to-[#8ae066]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Download Full Pitch Deck
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#0A2463]/80 mb-8"
            >
              Get access to our complete investor presentation with detailed financials and roadmap.
            </motion.p>

            {!submitted ? (
              <motion.form
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                onSubmit={handleSubmit}
                className="space-y-4"
              >
                <div className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 h-12 bg-white border-[#0A2463]/20"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="bg-[#0A2463] text-white hover:bg-[#0A2463]/90"
                  >
                    <Download className="h-5 w-5 mr-2" />
                    Download Deck
                  </Button>
                </div>
                <p className="text-xs text-[#0A2463]/60">
                  By submitting, you agree to receive investor updates from ArqAI.
                </p>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-xl p-8 shadow-lg"
              >
                <CheckCircle className="h-12 w-12 text-[#0A2463] mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-[#0A2463] mb-2">
                  Check Your Email
                </h3>
                <p className="text-gray-600">
                  We have sent the pitch deck to your email address. If you do not see it, please check your spam folder.
                </p>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              <p className="text-sm text-[#0A2463]/60 mb-3">Or contact us directly:</p>
              <a
                href="mailto:investors@thearq.ai"
                className="inline-flex items-center gap-2 text-[#0A2463] font-medium hover:underline"
              >
                <Mail className="h-5 w-5" />
                investors@thearq.ai
              </a>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
