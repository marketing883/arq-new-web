'use client';

import React from 'react';
import { motion } from 'framer-motion';

const valuePoints = [
  {
    icon: '⏱️',
    title: 'Time to Value',
    description: '30-day deployment vs. industry average of 6+ months',
    highlight: '5x faster',
  },
  {
    icon: '🛡️',
    title: 'Risk Reduction',
    description: 'Built-in governance prevents costly compliance violations',
    highlight: '70% less risk',
  },
  {
    icon: '📈',
    title: 'Efficiency Gains',
    description: 'Automate manual processes with full auditability',
    highlight: '40% savings',
  },
];

const includedFeatures = [
  'Full platform access',
  'Unlimited AI agents',
  'Multi-cloud deployment',
  'Compliance guardrails',
  'Audit trail & evidence',
  'Dedicated support',
  'Custom integrations',
  'Training & onboarding',
];

export function PricingContent() {
  const calcomUrl = process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL || 'https://cal.com/arqai/discovery';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Enterprise-Grade Value
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Pricing is customized based on your specific requirements, deployment scope, and use cases.
          <span className="block mt-2 text-[#0047BA] font-medium">
            Let&apos;s discuss your needs and create a tailored solution.
          </span>
        </p>
      </motion.div>

      {/* Value proposition cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid md:grid-cols-3 gap-6 mb-12"
      >
        {valuePoints.map((point, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + 0.1 * idx }}
            className="p-6 rounded-2xl bg-white/80 border border-gray-200/50 text-center hover:border-[#0047BA]/30 hover:shadow-lg transition-all"
          >
            <div className="w-12 h-12 rounded-xl bg-[#0047BA]/10 flex items-center justify-center text-2xl mx-auto mb-4">
              {point.icon}
            </div>
            <div className="text-2xl font-bold text-[#0047BA] mb-2">{point.highlight}</div>
            <h3 className="font-bold text-gray-900 mb-1">{point.title}</h3>
            <p className="text-sm text-gray-500">{point.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Custom pricing card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-8 md:p-12 rounded-3xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Left: Features */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-6">
              What&apos;s Included
            </h3>
            <ul className="grid grid-cols-2 gap-3">
              {includedFeatures.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="w-5 h-5 rounded-full bg-[#C5F82A] flex items-center justify-center text-[#0047BA] text-xs font-bold">
                    ✓
                  </span>
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: CTA */}
          <div className="text-center md:text-left">
            <div className="inline-block p-6 rounded-2xl bg-white shadow-lg">
              <div className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                Enterprise Pricing
              </div>
              <div className="text-3xl font-bold text-gray-900 mb-4">
                Custom Quote
              </div>
              <p className="text-gray-600 mb-6 text-sm">
                Based on your specific requirements, scale, and integration needs.
              </p>
              <a
                href={calcomUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 px-6 rounded-xl bg-[#0047BA] text-white font-bold text-center hover:bg-[#003594] transition-colors"
              >
                Get Custom Pricing →
              </a>
              <p className="text-xs text-gray-400 mt-3">
                Talk to us about your use case
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FAQ-style note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="mt-8 p-6 rounded-2xl bg-[#0047BA]/5 border border-[#0047BA]/10"
      >
        <h4 className="font-bold text-gray-900 mb-2">Why Custom Pricing?</h4>
        <p className="text-gray-600 text-sm">
          Every enterprise has unique requirements. We tailor our solution to your specific workflows,
          compliance needs, and scale. This ensures you only pay for what you need while getting
          maximum value from the platform. Our team will work with you to create a pricing model
          that aligns with your budget and ROI expectations.
        </p>
      </motion.div>
    </div>
  );
}
