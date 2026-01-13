'use client';

import React from 'react';
import { motion } from 'framer-motion';

const timelineSteps = [
  {
    week: 'Week 1',
    title: 'Blueprint',
    description: 'We map your workflow, identify integration points, and design the governance model.',
    icon: '📋',
  },
  {
    week: 'Week 2-3',
    title: 'Build & Integrate',
    description: 'Connect to your systems, configure compliance rules, and train the AI on your data.',
    icon: '⚙️',
  },
  {
    week: 'Week 4',
    title: 'Deploy & Monitor',
    description: 'Go live with full observability. Your first governed AI workflow is in production.',
    icon: '🚀',
  },
];

const benefits = [
  { icon: '✓', text: 'Free 30-minute consultation' },
  { icon: '✓', text: 'Custom demo for your use case' },
  { icon: '✓', text: 'ROI projection for your workflow' },
  { icon: '✓', text: 'No commitment required' },
];

export function DemoContent() {
  const calcomUrl = process.env.NEXT_PUBLIC_CALCOM_BOOKING_URL || 'https://cal.com/arqai/discovery';

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          See ArqAI in Action
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Schedule a personalized demo and discover how you can deploy governed AI agents in
          <span className="text-[#0047BA] font-semibold"> 30 days or less</span>.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Left: Timeline */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="text-xl font-bold text-gray-900 mb-6">
            Your Path to Production
          </h3>

          {timelineSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + 0.1 * idx }}
              className="relative pl-8"
            >
              {/* Timeline line */}
              {idx < timelineSteps.length - 1 && (
                <div className="absolute left-3 top-10 w-0.5 h-16 bg-gradient-to-b from-[#0047BA] to-[#0047BA]/20" />
              )}

              {/* Timeline dot */}
              <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-[#0047BA] flex items-center justify-center text-white text-xs font-bold">
                {idx + 1}
              </div>

              <div className="p-5 rounded-2xl bg-white/80 border border-gray-200/50 hover:border-[#0047BA]/30 hover:shadow-md transition-all">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xl">{step.icon}</span>
                  <div>
                    <span className="text-xs font-medium text-[#0047BA] uppercase tracking-wide">
                      {step.week}
                    </span>
                    <h4 className="font-bold text-gray-900">{step.title}</h4>
                  </div>
                </div>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Right: Booking card */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="p-8 rounded-3xl bg-gradient-to-br from-[#0047BA] to-[#003594] text-white shadow-xl shadow-blue-500/20">
            <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl mb-6">
              📅
            </div>

            <h3 className="text-2xl font-bold mb-4">Book Your Demo</h3>
            <p className="text-blue-100 mb-6">
              Talk to our team about your specific use case and see how ArqAI can transform your AI operations.
            </p>

            {/* Benefits list */}
            <ul className="space-y-3 mb-8">
              {benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-center gap-3 text-blue-100">
                  <span className="w-5 h-5 rounded-full bg-[#C5F82A] flex items-center justify-center text-[#0047BA] text-xs font-bold">
                    {benefit.icon}
                  </span>
                  {benefit.text}
                </li>
              ))}
            </ul>

            {/* CTA Button */}
            <a
              href={calcomUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full py-4 px-6 rounded-xl bg-[#C5F82A] text-[#0047BA] font-bold text-center hover:bg-[#d4ff4a] transition-colors shadow-lg"
            >
              Schedule Your Demo →
            </a>

            <p className="text-center text-xs text-blue-200 mt-4">
              No credit card required • 30-minute call
            </p>
          </div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-6 p-4 rounded-xl bg-gray-50 border border-gray-200"
          >
            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                12 Enterprise Customers
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                0% Churn Rate
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
