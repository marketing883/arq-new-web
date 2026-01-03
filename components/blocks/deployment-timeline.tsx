'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Circle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FunctionType } from '@/types';

interface DeploymentTimelineProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const phases = [
  {
    week: 1,
    title: 'Blueprint',
    items: ['Workflow discovery', 'Policy mapping', 'Integration assessment', 'Success metrics'],
    status: 'upcoming',
  },
  {
    week: 2,
    title: 'Integration',
    items: ['System connections', 'Data flow setup', 'Policy configuration', 'Agent training'],
    status: 'upcoming',
  },
  {
    week: 3,
    title: 'Testing',
    items: ['Pilot deployment', 'User acceptance', 'Performance tuning', 'Compliance validation'],
    status: 'upcoming',
  },
  {
    week: 4,
    title: 'Go Live',
    items: ['Production deployment', 'Monitoring setup', 'Team training', 'Support handoff'],
    status: 'upcoming',
  },
];

export function DeploymentTimeline({ data, functionType }: DeploymentTimelineProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-lg font-bold text-[#0A2463]">30-Day Deployment</h3>
        <p className="text-sm text-gray-500">From blueprint to production in one month</p>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

        <div className="space-y-6">
          {phases.map((phase, index) => (
            <motion.div
              key={phase.week}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="relative pl-16"
            >
              {/* Week indicator */}
              <div className="absolute left-0 w-12 h-12 bg-[#0A2463] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">W{phase.week}</span>
              </div>

              {/* Content */}
              <div className="bg-[#F8F9FA] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#0A2463]">{phase.title}</h4>
                  <span className="text-xs text-gray-500">Week {phase.week}</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {phase.items.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Circle className="h-3 w-3 text-[#A7FF83]" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Completion indicator */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6 }}
        className="bg-[#A7FF83] rounded-xl p-4 text-center"
      >
        <CheckCircle className="h-8 w-8 mx-auto mb-2 text-[#0A2463]" />
        <p className="font-semibold text-[#0A2463]">Production-Ready in 30 Days</p>
        <p className="text-sm text-[#0A2463]/70">With governance built-in from day one</p>
      </motion.div>

      <Button variant="outline" size="sm" className="w-full">
        <Download className="h-4 w-4 mr-2" />
        Download Custom Timeline
      </Button>
    </div>
  );
}
