'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FunctionType } from '@/types';

interface CodeSnippetProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const codeSnippets: Record<FunctionType, { language: string; title: string; code: string }> = {
  'it-infrastructure': {
    language: 'typescript',
    title: 'ArqAI Infrastructure Agent Integration',
    code: `import { ArqAI } from '@arqai/sdk';

// Initialize with governance
const arq = new ArqAI({
  apiKey: process.env.ARQAI_API_KEY,
  policies: ['deploy-approval', 'env-validation']
});

// Create governed deployment agent
const deployAgent = arq.createAgent({
  name: 'deploy-agent',
  capabilities: ['ci-cd', 'rollback'],
  constraints: {
    maxConcurrentDeploys: 3,
    requireApproval: ['production']
  }
});

// Execute with automatic compliance
await deployAgent.execute({
  action: 'deploy',
  environment: 'staging',
  version: 'v2.1.0'
});
// All actions logged with evidence`,
  },
  'revenue-ops': {
    language: 'typescript',
    title: 'ArqAI Revenue Ops Integration',
    code: `import { ArqAI } from '@arqai/sdk';

const arq = new ArqAI({
  apiKey: process.env.ARQAI_API_KEY,
  policies: ['data-quality', 'lead-routing']
});

// Lead enrichment with governance
const leadAgent = arq.createAgent({
  name: 'lead-enrichment',
  capabilities: ['enrich', 'score', 'route'],
  constraints: {
    dataRetention: '90d',
    piiHandling: 'encrypt'
  }
});

// Process lead with compliance
const enrichedLead = await leadAgent.execute({
  action: 'enrich',
  lead: { email: 'contact@company.com' }
});
// Automatic audit trail generated`,
  },
  'customer-success': {
    language: 'typescript',
    title: 'ArqAI Support Automation',
    code: `import { ArqAI } from '@arqai/sdk';

const arq = new ArqAI({
  apiKey: process.env.ARQAI_API_KEY,
  policies: ['hipaa', 'escalation-rules']
});

// Support agent with tier-1 automation
const supportAgent = arq.createAgent({
  name: 'support-tier1',
  capabilities: ['classify', 'respond', 'escalate'],
  constraints: {
    maxAutoResolve: true,
    escalateTo: 'human-agent'
  }
});

// Handle ticket with governance
await supportAgent.execute({
  action: 'process-ticket',
  ticket: ticketData
});
// HIPAA compliance enforced`,
  },
  'demand-gen': {
    language: 'typescript',
    title: 'ArqAI Marketing Automation',
    code: `import { ArqAI } from '@arqai/sdk';

const arq = new ArqAI({
  apiKey: process.env.ARQAI_API_KEY,
  policies: ['gdpr', 'content-approval']
});

// Marketing agent with compliance
const marketingAgent = arq.createAgent({
  name: 'campaign-manager',
  capabilities: ['segment', 'content', 'deploy'],
  constraints: {
    consentRequired: true,
    regionRules: 'eu-strict'
  }
});

// Launch campaign with governance
await marketingAgent.execute({
  action: 'launch-campaign',
  campaign: campaignData
});
// GDPR consent verified`,
  },
};

export function CodeSnippet({ data, functionType }: CodeSnippetProps) {
  const [copied, setCopied] = useState(false);
  const snippet = codeSnippets[functionType];

  const handleCopy = () => {
    navigator.clipboard.writeText(snippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-[#0A2463]">{snippet.title}</h4>
          <span className="text-xs text-gray-500">{snippet.language}</span>
        </div>
        <Button variant="ghost" size="sm" onClick={handleCopy}>
          {copied ? (
            <>
              <Check className="h-4 w-4 mr-1 text-green-500" />
              Copied
            </>
          ) : (
            <>
              <Copy className="h-4 w-4 mr-1" />
              Copy
            </>
          )}
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-[#1E1E24] rounded-xl p-4 overflow-x-auto"
      >
        <pre className="text-sm text-gray-300 font-mono">
          <code>{snippet.code}</code>
        </pre>
      </motion.div>

      <p className="text-xs text-gray-400 text-center">
        Full SDK documentation available after demo
      </p>
    </div>
  );
}
