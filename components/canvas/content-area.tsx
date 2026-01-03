'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useConversationStore } from '@/stores/conversation-store';
import { ROICalculator } from '@/components/blocks/roi-calculator';
import { DemoVideo } from '@/components/blocks/demo-video';
import { SecurityReview } from '@/components/blocks/security-review';
import { ArchitectureDiagram } from '@/components/blocks/architecture-diagram';
import { IntegrationChecklist } from '@/components/blocks/integration-checklist';
import { DeploymentTimeline } from '@/components/blocks/deployment-timeline';
import { CaseStudy } from '@/components/blocks/case-study';
import { LiveStats } from '@/components/blocks/live-stats';
import { CodeSnippet } from '@/components/blocks/code-snippet';
import { ComparisonTable } from '@/components/blocks/comparison-table';
import type { FunctionType, ContentBlock } from '@/types';
import { Calculator, Play, Shield, Network, CheckSquare, Calendar, FileText, BarChart3, Code, GitCompare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ContentAreaProps {
  functionType: FunctionType;
}

const blockComponents: Record<ContentBlock['type'], React.ComponentType<{ data?: Record<string, unknown>; functionType: FunctionType }>> = {
  'roi-calculator': ROICalculator,
  'demo-video': DemoVideo,
  'security-review': SecurityReview,
  'architecture-diagram': ArchitectureDiagram,
  'integration-checklist': IntegrationChecklist,
  'deployment-timeline': DeploymentTimeline,
  'case-study': CaseStudy,
  'live-stats': LiveStats,
  'code-snippet': CodeSnippet,
  'comparison-table': ComparisonTable,
};

const blockIcons: Record<ContentBlock['type'], React.ComponentType<{ className?: string }>> = {
  'roi-calculator': Calculator,
  'demo-video': Play,
  'security-review': Shield,
  'architecture-diagram': Network,
  'integration-checklist': CheckSquare,
  'deployment-timeline': Calendar,
  'case-study': FileText,
  'live-stats': BarChart3,
  'code-snippet': Code,
  'comparison-table': GitCompare,
};

const blockTitles: Record<ContentBlock['type'], string> = {
  'roi-calculator': 'ROI Calculator',
  'demo-video': 'Demo Video',
  'security-review': 'Security Review',
  'architecture-diagram': 'Architecture Diagram',
  'integration-checklist': 'Integration Checklist',
  'deployment-timeline': '30-Day Deployment',
  'case-study': 'Case Study',
  'live-stats': 'Live Stats',
  'code-snippet': 'Code Snippet',
  'comparison-table': 'Comparison Table',
};

export function ContentArea({ functionType }: ContentAreaProps) {
  const { displayedBlocks, removeContentBlock, addContentBlock } = useConversationStore();

  // For demo purposes, let's show a live stats block by default
  React.useEffect(() => {
    if (displayedBlocks.length === 0) {
      addContentBlock({ type: 'live-stats' });
    }
  }, [displayedBlocks.length, addContentBlock]);

  return (
    <div className="bg-white rounded-2xl shadow-lg h-full overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <h2 className="font-semibold text-[#0A2463]">Content & Artifacts</h2>
        <p className="text-sm text-gray-500">
          Interactive content will appear here based on your conversation
        </p>
      </div>

      <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
        {displayedBlocks.length === 0 ? (
          <div className="text-center py-12 text-gray-400">
            <Network className="h-12 w-12 mx-auto mb-4 opacity-50" />
            <p>Start chatting to see relevant content blocks</p>
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {displayedBlocks
                .filter((block) => block.visible)
                .map((block) => {
                  const BlockComponent = blockComponents[block.type];
                  const Icon = blockIcons[block.type];
                  const title = blockTitles[block.type];

                  return (
                    <motion.div
                      key={block.id}
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -20, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <div className="flex items-center justify-between px-4 py-3 bg-[#F8F9FA] border-b border-gray-200">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-[#0A2463]" />
                          <span className="font-medium text-[#0A2463]">{title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-gray-400 hover:text-gray-600"
                          onClick={() => removeContentBlock(block.id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="p-4">
                        <BlockComponent data={block.data} functionType={functionType} />
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
