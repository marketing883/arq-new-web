'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle, Cloud, Database, Lock, Zap, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FunctionType } from '@/types';

interface IntegrationChecklistProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

interface ChecklistItem {
  id: string;
  label: string;
  description: string;
  category: string;
}

const checklistItems: ChecklistItem[] = [
  { id: '1', label: 'Cloud Provider Access', description: 'AWS/Azure/GCP credentials or service account', category: 'Infrastructure' },
  { id: '2', label: 'API Gateway Setup', description: 'Configure API endpoints for ArqAI integration', category: 'Infrastructure' },
  { id: '3', label: 'SSO Configuration', description: 'Connect enterprise identity provider', category: 'Security' },
  { id: '4', label: 'Policy Templates', description: 'Define governance rules and constraints', category: 'Security' },
  { id: '5', label: 'Data Sources', description: 'Connect knowledge base and data sources', category: 'Data' },
  { id: '6', label: 'CRM Integration', description: 'Salesforce, HubSpot, or custom CRM', category: 'Systems' },
  { id: '7', label: 'ITSM Integration', description: 'ServiceNow, Jira, or ticketing system', category: 'Systems' },
  { id: '8', label: 'Notification Channels', description: 'Slack, Teams, email for alerts', category: 'Systems' },
];

export function IntegrationChecklist({ data, functionType }: IntegrationChecklistProps) {
  const [completed, setCompleted] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const categories = Array.from(new Set(checklistItems.map((i) => i.category)));
  const progress = Math.round((completed.length / checklistItems.length) * 100);

  const categoryIcons: Record<string, React.ComponentType<{ className?: string }>> = {
    Infrastructure: Cloud,
    Security: Lock,
    Data: Database,
    Systems: Zap,
  };

  return (
    <div className="space-y-4">
      {/* Progress bar */}
      <div className="bg-[#F8F9FA] rounded-xl p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Integration Progress</span>
          <span className="text-sm font-bold text-[#0A2463]">{progress}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full bg-[#A7FF83] rounded-full"
          />
        </div>
      </div>

      {/* Checklist by category */}
      <div className="space-y-4">
        {categories.map((category) => {
          const Icon = categoryIcons[category] || Circle;
          const items = checklistItems.filter((i) => i.category === category);

          return (
            <div key={category}>
              <div className="flex items-center gap-2 mb-2">
                <Icon className="h-4 w-4 text-[#0A2463]" />
                <span className="text-sm font-medium text-[#0A2463]">{category}</span>
              </div>
              <div className="space-y-2">
                {items.map((item) => {
                  const isCompleted = completed.includes(item.id);

                  return (
                    <motion.div
                      key={item.id}
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => toggleItem(item.id)}
                      className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                        isCompleted
                          ? 'bg-[#A7FF83]/20 border border-[#A7FF83]'
                          : 'bg-[#F8F9FA] hover:bg-gray-100'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-300 flex-shrink-0 mt-0.5" />
                      )}
                      <div>
                        <span
                          className={`text-sm font-medium ${
                            isCompleted ? 'text-green-700' : 'text-gray-700'
                          }`}
                        >
                          {item.label}
                        </span>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        <Download className="h-4 w-4 mr-2" />
        Export Checklist
      </Button>
    </div>
  );
}
