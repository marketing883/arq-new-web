'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, TrendingUp, Clock, Quote, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FunctionType } from '@/types';

interface CaseStudyProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const caseStudies: Record<FunctionType, { industry: string; quote: string; metrics: { label: string; value: string }[]; logo: string }> = {
  'it-infrastructure': {
    industry: 'Telecom',
    quote: 'ArqAI reduced our deployment time by 40% while ensuring complete compliance with our governance policies. The automated incident response has transformed our operations.',
    metrics: [
      { label: 'Faster Deployments', value: '40%' },
      { label: 'MTTR Reduction', value: '70%' },
      { label: 'Compliance Score', value: '100%' },
    ],
    logo: 'Telecom Enterprise',
  },
  'revenue-ops': {
    industry: 'Finance',
    quote: 'Data accuracy went from 75% to 95% in the first month. Our sales team now trusts the pipeline data and can make faster decisions.',
    metrics: [
      { label: 'Data Accuracy', value: '95%' },
      { label: 'Lead Routing Speed', value: '80%' },
      { label: 'Pipeline Visibility', value: '100%' },
    ],
    logo: 'Financial Services',
  },
  'customer-success': {
    industry: 'Healthcare',
    quote: 'Tier-1 support automation with proper HIPAA compliance was a game-changer. We handle 70% of tickets automatically now.',
    metrics: [
      { label: 'Auto-Resolution', value: '70%' },
      { label: 'Response Time', value: '-85%' },
      { label: 'HIPAA Compliance', value: '100%' },
    ],
    logo: 'Healthcare Provider',
  },
  'demand-gen': {
    industry: 'Retail',
    quote: 'GDPR-compliant campaign automation increased our qualified leads by 60% while reducing compliance risks to zero.',
    metrics: [
      { label: 'Lead Quality', value: '+60%' },
      { label: 'Compliance', value: '100%' },
      { label: 'Campaign Speed', value: '3x' },
    ],
    logo: 'Retail Enterprise',
  },
};

export function CaseStudy({ data, functionType }: CaseStudyProps) {
  const study = caseStudies[functionType];

  return (
    <div className="space-y-6">
      {/* Industry badge */}
      <div className="flex items-center gap-2">
        <Building2 className="h-5 w-5 text-[#0A2463]" />
        <span className="text-sm font-medium text-gray-500">{study.industry} Industry</span>
      </div>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative bg-[#F8F9FA] rounded-xl p-6"
      >
        <Quote className="absolute top-4 left-4 h-6 w-6 text-[#A7FF83] opacity-50" />
        <p className="text-gray-700 italic pl-8 pr-4">
          "{study.quote}"
        </p>
        <div className="mt-4 pl-8">
          <div className="font-medium text-[#0A2463]">{study.logo}</div>
          <div className="text-sm text-gray-500">Enterprise Customer</div>
        </div>
      </motion.div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-3">
        {study.metrics.map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-[#0A2463] rounded-xl p-4 text-center text-white"
          >
            <TrendingUp className="h-5 w-5 mx-auto mb-1 text-[#A7FF83]" />
            <div className="text-xl font-bold">{metric.value}</div>
            <div className="text-xs text-gray-300">{metric.label}</div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <Button variant="outline" className="w-full">
        Read Full Case Study
        <ArrowRight className="h-4 w-4 ml-2" />
      </Button>

      <p className="text-xs text-gray-400 text-center">
        * Customer names protected under NDA. Results are typical for similar implementations.
      </p>
    </div>
  );
}
