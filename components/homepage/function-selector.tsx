'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Server, DollarSign, HeadphonesIcon, Megaphone, ArrowRight, MessageCircle, Send } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const functions = [
  {
    id: 'it-infrastructure',
    title: 'Autonomous IT Infrastructure',
    description: 'Governed CI/CD pipelines and infrastructure automation with compliance built-in.',
    icon: Server,
    features: ['Automated incident response', 'Policy-driven releases', '40% faster deployments'],
    gradient: 'from-blue-500 to-indigo-600',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    id: 'revenue-ops',
    title: 'Revenue Operations Automation',
    description: 'Governed automation for revenue workflows: lead routing, data enrichment, forecasting.',
    icon: DollarSign,
    features: ['Lead scoring & routing', 'CRM data quality', '95% data accuracy'],
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
  },
  {
    id: 'customer-success',
    title: 'Autonomous Customer Success',
    description: 'Governed customer support automation with agent orchestration for ticket resolution.',
    icon: HeadphonesIcon,
    features: ['Tier-1 automation', 'Smart escalation', '70% auto-resolution'],
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    id: 'demand-gen',
    title: 'Autonomous Demand Generation',
    description: 'Governed marketing automation for campaigns, content generation, and lead nurturing.',
    icon: Megaphone,
    features: ['Campaign automation', 'Content generation', '100% GDPR compliance'],
    gradient: 'from-orange-500 to-red-500',
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
];

export function FunctionSelector() {
  const [chatOpen, setChatOpen] = useState(false);
  const [message, setMessage] = useState('');

  return (
    <section id="explore" className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A2463]/5 rounded-full text-sm text-[#0A2463] font-medium mb-6"
          >
            <MessageCircle className="h-4 w-4" />
            Talk to ArqBot to explore
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-[#0A2463] mb-6"
          >
            Choose Your Function
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-gray-600 max-w-2xl mx-auto"
          >
            Select your area of focus to explore how ArqAI can transform your operations with governed AI agents.
          </motion.p>
        </div>

        {/* Function Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {functions.map((func, index) => (
            <motion.div
              key={func.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/canvas/${func.id}`}>
                <div className="group relative overflow-hidden rounded-2xl p-8 h-full transition-all duration-500 bg-white border-2 border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/50 hover:-translate-y-1">
                  {/* Hover gradient overlay */}
                  <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br",
                    func.gradient
                  )} />

                  {/* Content */}
                  <div className="relative z-10">
                    <div className="flex items-start gap-5">
                      <div className={cn(
                        "flex-shrink-0 w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500",
                        func.iconBg,
                        "group-hover:bg-white/20"
                      )}>
                        <func.icon className={cn(
                          "h-7 w-7 transition-colors duration-500",
                          func.iconColor,
                          "group-hover:text-white"
                        )} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#0A2463] group-hover:text-white mb-3 transition-colors duration-500">
                          {func.title}
                        </h3>
                        <p className="text-gray-600 group-hover:text-white/90 mb-5 transition-colors duration-500 leading-relaxed">
                          {func.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {func.features.map((feature) => (
                            <span
                              key={feature}
                              className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 group-hover:bg-white/20 group-hover:text-white transition-all duration-500"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="absolute top-8 right-8">
                      <ArrowRight className="h-6 w-6 text-gray-300 group-hover:text-white transition-all duration-500 group-hover:translate-x-2" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Chat Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-[#0A2463] rounded-3xl p-8 shadow-2xl shadow-[#0A2463]/20">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#A7FF83] flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-[#0A2463]" />
              </div>
              <div>
                <h3 className="text-white font-semibold">Ask ArqBot</h3>
                <p className="text-gray-400 text-sm">Get instant answers about ArqAI</p>
              </div>
            </div>

            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Ask about AI governance, deployment, security..."
                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-5 py-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#A7FF83]/50 focus:border-transparent"
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && message.trim()) {
                    window.location.href = `/canvas/it-infrastructure?q=${encodeURIComponent(message)}`;
                  }
                }}
              />
              <Button
                onClick={() => {
                  if (message.trim()) {
                    window.location.href = `/canvas/it-infrastructure?q=${encodeURIComponent(message)}`;
                  }
                }}
                className="bg-[#A7FF83] text-[#0A2463] hover:bg-[#8FE86B] px-6 rounded-xl font-semibold"
              >
                <Send className="h-5 w-5" />
              </Button>
            </div>

            {/* Quick prompts */}
            <div className="flex flex-wrap gap-2 mt-4">
              {['How does governance work?', 'What about security?', 'Show me ROI'].map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => {
                    window.location.href = `/canvas/it-infrastructure?q=${encodeURIComponent(prompt)}`;
                  }}
                  className="text-sm px-4 py-2 rounded-full bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
