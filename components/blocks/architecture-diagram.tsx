'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Network, Cloud, Database, Shield, Eye, Zap, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FunctionType } from '@/types';

interface ArchitectureDiagramProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const components = [
  { id: 'user', label: 'Enterprise Users', icon: Network, x: 50, y: 20, color: '#0A2463' },
  { id: 'control', label: 'ArqAI Control Plane', icon: Shield, x: 50, y: 45, color: '#A7FF83' },
  { id: 'rag', label: 'Adaptive RAG', icon: Eye, x: 20, y: 70, color: '#0A2463' },
  { id: 'compiler', label: 'Prompt Compiler', icon: Zap, x: 50, y: 70, color: '#0A2463' },
  { id: 'orchestration', label: 'Orchestration', icon: Network, x: 80, y: 70, color: '#0A2463' },
  { id: 'systems', label: 'Enterprise Systems', icon: Database, x: 50, y: 95, color: '#0A2463' },
];

const connections = [
  { from: 'user', to: 'control' },
  { from: 'control', to: 'rag' },
  { from: 'control', to: 'compiler' },
  { from: 'control', to: 'orchestration' },
  { from: 'rag', to: 'systems' },
  { from: 'compiler', to: 'systems' },
  { from: 'orchestration', to: 'systems' },
];

export function ArchitectureDiagram({ data, functionType }: ArchitectureDiagramProps) {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [zoom, setZoom] = useState(1);

  const getComponentInfo = (id: string) => {
    const info: Record<string, string> = {
      user: 'Enterprise users and applications that interact with AI agents.',
      control: 'Central governance layer that enforces policies and manages all AI actions.',
      rag: 'Observability-Driven Adaptive RAG for accurate, always-current knowledge retrieval.',
      compiler: 'Compliance-Aware Prompt Compiler that validates requests against policy rules.',
      orchestration: 'Trust-Aware Agent Orchestration for controlled, auditable actions.',
      systems: 'Your existing enterprise systems, databases, and APIs.',
    };
    return info[id] || '';
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex justify-end gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Diagram */}
      <div
        className="relative bg-[#F8F9FA] rounded-xl overflow-hidden"
        style={{ height: 300, transform: `scale(${zoom})`, transformOrigin: 'center' }}
      >
        {/* Connections */}
        <svg className="absolute inset-0 w-full h-full">
          {connections.map((conn, index) => {
            const from = components.find((c) => c.id === conn.from);
            const to = components.find((c) => c.id === conn.to);
            if (!from || !to) return null;

            return (
              <motion.line
                key={`${conn.from}-${conn.to}`}
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                x1={`${from.x}%`}
                y1={`${from.y}%`}
                x2={`${to.x}%`}
                y2={`${to.y}%`}
                stroke="#0A2463"
                strokeWidth="2"
                strokeDasharray="4"
                opacity="0.3"
              />
            );
          })}
        </svg>

        {/* Components */}
        {components.map((comp, index) => (
          <motion.div
            key={comp.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{ left: `${comp.x}%`, top: `${comp.y}%` }}
            onClick={() => setSelectedComponent(comp.id === selectedComponent ? null : comp.id)}
          >
            <div
              className={`p-3 rounded-xl shadow-md transition-transform hover:scale-110 ${
                selectedComponent === comp.id ? 'ring-2 ring-[#A7FF83]' : ''
              }`}
              style={{ backgroundColor: comp.color }}
            >
              <comp.icon
                className={`h-6 w-6 ${
                  comp.color === '#A7FF83' ? 'text-[#0A2463]' : 'text-white'
                }`}
              />
            </div>
            <div className="text-xs text-center mt-1 font-medium text-gray-700 whitespace-nowrap">
              {comp.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Component info */}
      {selectedComponent && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#0A2463] text-white rounded-xl p-4"
        >
          <h4 className="font-medium mb-1">
            {components.find((c) => c.id === selectedComponent)?.label}
          </h4>
          <p className="text-sm text-gray-300">
            {getComponentInfo(selectedComponent)}
          </p>
        </motion.div>
      )}
    </div>
  );
}
