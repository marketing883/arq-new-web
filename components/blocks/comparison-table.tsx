'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, MinusCircle } from 'lucide-react';
import type { FunctionType } from '@/types';

interface ComparisonTableProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const features = [
  { name: 'Governance Built-In', arqai: 'full', competitor1: 'partial', competitor2: 'none' },
  { name: 'Policy Enforcement', arqai: 'full', competitor1: 'partial', competitor2: 'none' },
  { name: 'Audit Evidence', arqai: 'full', competitor1: 'none', competitor2: 'partial' },
  { name: 'Zero-Trust Architecture', arqai: 'full', competitor1: 'none', competitor2: 'none' },
  { name: 'Capability Tokens', arqai: 'full', competitor1: 'none', competitor2: 'none' },
  { name: '30-Day Deployment', arqai: 'full', competitor1: 'partial', competitor2: 'none' },
  { name: 'Multi-Cloud Support', arqai: 'full', competitor1: 'full', competitor2: 'partial' },
  { name: 'Model Agnostic', arqai: 'full', competitor1: 'partial', competitor2: 'partial' },
  { name: 'Real-Time Monitoring', arqai: 'full', competitor1: 'full', competitor2: 'full' },
  { name: 'Adaptive RAG', arqai: 'full', competitor1: 'none', competitor2: 'none' },
];

const StatusIcon = ({ status }: { status: string }) => {
  switch (status) {
    case 'full':
      return <CheckCircle className="h-5 w-5 text-green-500" />;
    case 'partial':
      return <MinusCircle className="h-5 w-5 text-yellow-500" />;
    case 'none':
      return <XCircle className="h-5 w-5 text-gray-300" />;
    default:
      return null;
  }
};

export function ComparisonTable({ data, functionType }: ComparisonTableProps) {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="text-center">
        <h3 className="font-semibold text-[#0A2463]">ArqAI vs Alternatives</h3>
        <p className="text-sm text-gray-500">Objective comparison of key capabilities</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-2 font-medium text-gray-500">Feature</th>
              <th className="text-center py-3 px-2">
                <span className="font-bold text-[#0A2463]">ArqAI</span>
              </th>
              <th className="text-center py-3 px-2 text-gray-400">Alternative A</th>
              <th className="text-center py-3 px-2 text-gray-400">Alternative B</th>
            </tr>
          </thead>
          <tbody>
            {features.map((feature, index) => (
              <motion.tr
                key={feature.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="border-b border-gray-100"
              >
                <td className="py-2 px-2 text-gray-700">{feature.name}</td>
                <td className="py-2 px-2 text-center bg-[#A7FF83]/10">
                  <div className="flex justify-center">
                    <StatusIcon status={feature.arqai} />
                  </div>
                </td>
                <td className="py-2 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusIcon status={feature.competitor1} />
                  </div>
                </td>
                <td className="py-2 px-2 text-center">
                  <div className="flex justify-center">
                    <StatusIcon status={feature.competitor2} />
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-6 text-xs text-gray-500">
        <div className="flex items-center gap-1">
          <CheckCircle className="h-4 w-4 text-green-500" />
          <span>Full support</span>
        </div>
        <div className="flex items-center gap-1">
          <MinusCircle className="h-4 w-4 text-yellow-500" />
          <span>Partial</span>
        </div>
        <div className="flex items-center gap-1">
          <XCircle className="h-4 w-4 text-gray-300" />
          <span>Not available</span>
        </div>
      </div>

      <p className="text-xs text-gray-400 text-center">
        * Comparison based on publicly available information. Contact us for detailed technical comparison.
      </p>
    </div>
  );
}
