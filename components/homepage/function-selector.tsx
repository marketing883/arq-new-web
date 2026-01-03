'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Server, DollarSign, HeadphonesIcon, Megaphone, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const functions = [
  {
    id: 'it-infrastructure',
    title: 'Autonomous IT Infrastructure',
    description: 'Governed CI/CD pipelines and infrastructure automation with compliance built-in.',
    icon: Server,
    features: ['Automated incident response', 'Policy-driven releases', '40% faster deployments'],
    color: 'from-blue-500 to-blue-600',
    lightColor: 'bg-blue-50',
  },
  {
    id: 'revenue-ops',
    title: 'Revenue Operations Automation',
    description: 'Governed automation for revenue workflows: lead routing, data enrichment, forecasting.',
    icon: DollarSign,
    features: ['Lead scoring & routing', 'CRM data quality', '95% data accuracy'],
    color: 'from-green-500 to-green-600',
    lightColor: 'bg-green-50',
  },
  {
    id: 'customer-success',
    title: 'Autonomous Customer Success',
    description: 'Governed customer support automation with agent orchestration for ticket resolution.',
    icon: HeadphonesIcon,
    features: ['Tier-1 automation', 'Smart escalation', '70% auto-resolution'],
    color: 'from-purple-500 to-purple-600',
    lightColor: 'bg-purple-50',
  },
  {
    id: 'demand-gen',
    title: 'Autonomous Demand Generation',
    description: 'Governed marketing automation for campaigns, content generation, and lead nurturing.',
    icon: Megaphone,
    features: ['Campaign automation', 'Content generation', '100% GDPR compliance'],
    color: 'from-orange-500 to-orange-600',
    lightColor: 'bg-orange-50',
  },
];

export function FunctionSelector() {
  return (
    <section id="explore" className="section bg-white">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
          >
            Choose Your Function
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Select your area of focus to explore how ArqAI can transform your operations with governed AI agents.
          </motion.p>
        </div>

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
                  "group relative overflow-hidden rounded-2xl p-6 h-full transition-all duration-300",
                  "border border-gray-200 hover:border-transparent hover:shadow-xl",
                  "bg-white hover:bg-gradient-to-br hover:text-white",
                  `hover:${func.color}`
                )}>
                  <div className="flex items-start gap-4">
                    <div className={cn(
                      "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                      func.lightColor,
                      "group-hover:bg-white/20"
                    )}>
                      <func.icon className={cn(
                        "h-6 w-6 transition-colors",
                        "text-gray-700 group-hover:text-white"
                      )} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-[#0A2463] group-hover:text-white mb-2">
                        {func.title}
                      </h3>
                      <p className="text-sm text-gray-600 group-hover:text-white/90 mb-4">
                        {func.description}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {func.features.map((feature) => (
                          <span
                            key={feature}
                            className={cn(
                              "text-xs px-2 py-1 rounded-full transition-colors",
                              "bg-gray-100 text-gray-600",
                              "group-hover:bg-white/20 group-hover:text-white"
                            )}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-white transition-transform group-hover:translate-x-1" />
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
