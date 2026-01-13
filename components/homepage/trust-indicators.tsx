'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Building2, TrendingUp, Users, Shield, Zap } from 'lucide-react';

const trustBadges = [
  {
    icon: Award,
    title: 'GEC 2025 Winner',
    description: 'AI Governance & Compliance Innovation',
  },
  {
    icon: Shield,
    title: 'SOC 2 Type II',
    description: 'In Progress - Q2 2026',
  },
  {
    icon: Zap,
    title: 'FedRAMP Ready',
    description: 'Architecture certified',
  },
];

const metrics = [
  {
    value: '$500K',
    label: 'ARR',
    icon: TrendingUp,
  },
  {
    value: '12',
    label: 'Enterprise Customers',
    icon: Building2,
  },
  {
    value: '$3.2M',
    label: 'Pipeline',
    icon: TrendingUp,
  },
  {
    value: '6',
    label: 'Industry Verticals',
    icon: Users,
  },
];

const verticals = [
  'Finance',
  'Healthcare',
  'Telecom',
  'Industrial',
  'Real Estate',
  'Retail',
];

export function TrustIndicators() {
  return (
    <section className="section bg-[#F8F9FA]">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 mb-16"
        >
          {trustBadges.map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 bg-white rounded-xl px-6 py-4 shadow-sm"
            >
              <div className="w-12 h-12 bg-[#0A2463]/5 rounded-lg flex items-center justify-center">
                <badge.icon className="h-6 w-6 text-[#0A2463]" />
              </div>
              <div>
                <h3 className="font-semibold text-[#0A2463]">{badge.title}</h3>
                <p className="text-sm text-gray-500">{badge.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Metrics grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 text-center shadow-sm"
            >
              <metric.icon className="h-6 w-6 text-[#A7FF83] mx-auto mb-3" />
              <div className="text-3xl font-bold text-[#0A2463] mb-1">
                {metric.value}
              </div>
              <div className="text-sm text-gray-500">{metric.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Verticals */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-lg font-semibold text-[#0A2463] mb-6">
            Trusted Across Industries
          </h3>
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
  );
}
