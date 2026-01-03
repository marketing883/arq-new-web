'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Clock, Shield, Zap, CheckCircle } from 'lucide-react';
import type { FunctionType } from '@/types';

interface LiveStatsProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

interface Stat {
  label: string;
  value: number;
  suffix: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const statsConfig: Record<FunctionType, Stat[]> = {
  'it-infrastructure': [
    { label: 'Faster Deployments', value: 40, suffix: '%', icon: Zap, color: 'text-blue-500' },
    { label: 'Incidents Auto-Resolved', value: 65, suffix: '%', icon: CheckCircle, color: 'text-green-500' },
    { label: 'MTTR Reduction', value: 70, suffix: '%', icon: Clock, color: 'text-purple-500' },
    { label: 'Compliance Score', value: 100, suffix: '%', icon: Shield, color: 'text-orange-500' },
  ],
  'revenue-ops': [
    { label: 'Data Accuracy', value: 95, suffix: '%', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Lead Routing Speed', value: 80, suffix: '%', icon: Zap, color: 'text-blue-500' },
    { label: 'Pipeline Visibility', value: 100, suffix: '%', icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Manual Work Reduced', value: 60, suffix: '%', icon: Users, color: 'text-orange-500' },
  ],
  'customer-success': [
    { label: 'Tier-1 Auto-Resolution', value: 70, suffix: '%', icon: CheckCircle, color: 'text-green-500' },
    { label: 'Response Time', value: 85, suffix: '%', icon: Clock, color: 'text-blue-500' },
    { label: 'Customer Satisfaction', value: 92, suffix: '%', icon: Users, color: 'text-purple-500' },
    { label: 'Escalation Reduction', value: 45, suffix: '%', icon: TrendingUp, color: 'text-orange-500' },
  ],
  'demand-gen': [
    { label: 'GDPR Compliance', value: 100, suffix: '%', icon: Shield, color: 'text-green-500' },
    { label: 'Campaign Automation', value: 75, suffix: '%', icon: Zap, color: 'text-blue-500' },
    { label: 'Lead Quality Score', value: 88, suffix: '%', icon: TrendingUp, color: 'text-purple-500' },
    { label: 'Content Generation', value: 60, suffix: '%', icon: CheckCircle, color: 'text-orange-500' },
  ],
};

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const steps = 60;
    const increment = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

export function LiveStats({ data, functionType }: LiveStatsProps) {
  const stats = statsConfig[functionType] || statsConfig['it-infrastructure'];

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-[#F8F9FA] rounded-xl p-4 text-center"
        >
          <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
          <div className="text-2xl font-bold text-[#0A2463]">
            <AnimatedCounter value={stat.value} suffix={stat.suffix} />
          </div>
          <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
        </motion.div>
      ))}
    </div>
  );
}
