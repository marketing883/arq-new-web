'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle, AlertCircle, Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import type { FunctionType } from '@/types';

interface SecurityReviewProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const securityItems = [
  { category: 'Data Protection', items: ['Encryption at rest (AES-256)', 'Encryption in transit (TLS 1.3)', 'Data residency controls', 'Minimal retention policies'] },
  { category: 'Access Control', items: ['Zero-trust architecture', 'Capability tokens', 'Role-based access', 'Audit logging'] },
  { category: 'Compliance', items: ['SOC 2 Type II (in progress)', 'FedRAMP-ready architecture', 'GDPR compliant', 'HIPAA ready'] },
  { category: 'AI Governance', items: ['Policy enforcement', 'Prompt compilation', 'Evidence generation', 'Risk scoring'] },
];

export function SecurityReview({ data, functionType }: SecurityReviewProps) {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (email) {
      setSent(true);
    }
  };

  return (
    <div className="space-y-6">
      {/* Security checklist */}
      <div className="space-y-4">
        {securityItems.map((section, index) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <h4 className="font-medium text-[#0A2463] mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#A7FF83]" />
              {section.category}
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {section.items.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 text-sm text-gray-600 bg-[#F8F9FA] rounded-lg px-3 py-2"
                >
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Email delivery */}
      <div className="border-t border-gray-100 pt-4">
        <h4 className="font-medium text-[#0A2463] mb-3">
          Get Full Security Review Package
        </h4>
        {!sent ? (
          <div className="flex gap-2">
            <Input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={!email}>
              <Mail className="h-4 w-4 mr-2" />
              Send
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-lg p-3">
            <CheckCircle className="h-5 w-5" />
            <span>Security review package sent to {email}</span>
          </div>
        )}
      </div>

      <Button variant="outline" size="sm" className="w-full">
        <Download className="h-4 w-4 mr-2" />
        Download Security Overview PDF
      </Button>
    </div>
  );
}
