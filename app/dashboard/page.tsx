'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  TrendingUp,
  MessageSquare,
  Filter,
  Download,
  Search,
  ChevronDown,
  Eye,
  Mail,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

// Mock data for demonstration
const mockLeads = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john@enterprise.com',
    company: 'Enterprise Corp',
    title: 'CTO',
    leadScore: 85,
    segmentLabel: 'Hot',
    readinessLevel: 'Hot',
    functionExplored: 'it-infrastructure',
    createdAt: new Date('2026-01-02'),
    status: 'New',
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah@fintech.io',
    company: 'FinTech Solutions',
    title: 'VP Engineering',
    leadScore: 72,
    segmentLabel: 'Warm',
    readinessLevel: 'Warm',
    functionExplored: 'revenue-ops',
    createdAt: new Date('2026-01-01'),
    status: 'Contacted',
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'mchen@healthcare.org',
    company: 'HealthCare Plus',
    title: 'Director of IT',
    leadScore: 65,
    segmentLabel: 'Warm',
    readinessLevel: 'Warm',
    functionExplored: 'customer-success',
    createdAt: new Date('2025-12-30'),
    status: 'New',
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily@retail.com',
    company: 'RetailMax',
    title: 'CMO',
    leadScore: 45,
    segmentLabel: 'Nurture',
    readinessLevel: 'Nurture',
    functionExplored: 'demand-gen',
    createdAt: new Date('2025-12-28'),
    status: 'New',
  },
];

const metrics = [
  { label: 'Total Leads', value: '127', change: '+12%', icon: Users },
  { label: 'Avg Score', value: '68', change: '+5%', icon: TrendingUp },
  { label: 'Conversations', value: '342', change: '+23%', icon: MessageSquare },
  { label: 'Conversion Rate', value: '32%', change: '+8%', icon: BarChart3 },
];

const getReadinessColor = (level: string) => {
  switch (level) {
    case 'Hot':
      return 'hot';
    case 'Warm':
      return 'warm';
    case 'Nurture':
      return 'nurture';
    case 'Research':
      return 'research';
    default:
      return 'secondary';
  }
};

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLead, setSelectedLead] = useState<string | null>(null);

  const filteredLeads = mockLeads.filter(
    (lead) =>
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8F9FA] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#0A2463]">Sales Dashboard</h1>
          <p className="text-gray-500">Manage leads and track conversations</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{metric.label}</p>
                      <p className="text-3xl font-bold text-[#0A2463]">{metric.value}</p>
                    </div>
                    <div className="w-12 h-12 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center">
                      <metric.icon className="h-6 w-6 text-[#0A2463]" />
                    </div>
                  </div>
                  <p className="text-sm text-green-600 mt-2">{metric.change} from last week</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Leads Table */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Leads</CardTitle>
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search leads..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 w-64"
                  />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export CSV
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Name</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Company</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Score</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Readiness</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Function</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <motion.tr
                      key={lead.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-3 px-4">
                        <div>
                          <p className="font-medium text-[#0A2463]">{lead.name}</p>
                          <p className="text-sm text-gray-500">{lead.email}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div>
                          <p className="text-gray-700">{lead.company}</p>
                          <p className="text-sm text-gray-500">{lead.title}</p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-full bg-[#0A2463] text-white flex items-center justify-center font-bold">
                            {lead.leadScore}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={getReadinessColor(lead.readinessLevel) as any}>
                          {lead.readinessLevel}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-gray-600 capitalize">
                          {lead.functionExplored.replace('-', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{lead.status}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Mail className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLeads.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No leads found matching your search</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
