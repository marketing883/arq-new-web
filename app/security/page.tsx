'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Shield,
  Lock,
  FileCheck,
  Eye,
  Server,
  Key,
  CheckCircle,
  ArrowRight,
  Award,
  Globe,
  Database,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const securityPrinciples = [
  {
    icon: Lock,
    title: 'Zero-Trust Architecture',
    description: 'No implicit trust based on network location. Every action requires fresh authorization with continuous verification.',
  },
  {
    icon: Shield,
    title: 'Defense in Depth',
    description: 'Multiple security layers with policy enforcement at compile and runtime. Automatic quarantine for violations.',
  },
  {
    icon: FileCheck,
    title: 'Cryptographic Audit Trails',
    description: 'Every action generates signed evidence. Immutable logs verifiable by third parties without exposing secrets.',
  },
  {
    icon: Database,
    title: 'Data Protection',
    description: 'Encryption at rest and in transit. Data residency controls and minimal retention policies.',
  },
  {
    icon: Key,
    title: 'Capability Tokens',
    description: 'Scoped, single-use permissions for each action. Automatic expiration and immediate revocation support.',
  },
  {
    icon: Eye,
    title: 'Real-Time Monitoring',
    description: 'Continuous anomaly detection across all actions. Automatic escalation for suspicious activity.',
  },
];

const complianceFrameworks = [
  {
    category: 'Privacy',
    frameworks: [
      { name: 'GDPR', status: 'Supported', description: 'EU data protection' },
      { name: 'CCPA', status: 'Supported', description: 'California privacy' },
      { name: 'Colorado AI Act', status: 'Supported', description: 'AI governance' },
    ],
  },
  {
    category: 'Healthcare',
    frameworks: [
      { name: 'HIPAA', status: 'Supported', description: 'Health data protection' },
    ],
  },
  {
    category: 'Financial',
    frameworks: [
      { name: 'Fed SR 11-7', status: 'Supported', description: 'Model risk management' },
      { name: 'SOX', status: 'Supported', description: 'Financial controls' },
    ],
  },
  {
    category: 'AI-Specific',
    frameworks: [
      { name: 'EU AI Act', status: 'Ready', description: 'EU AI regulation' },
      { name: 'NIST AI RMF', status: 'Supported', description: 'Risk management framework' },
    ],
  },
];

const certifications = [
  {
    name: 'GEC 2025 Winner',
    status: 'Achieved',
    description: 'AI Governance and Compliance Innovation',
    icon: Award,
  },
  {
    name: 'SOC 2 Type II',
    status: 'In Progress',
    description: 'Expected Q2 2026',
    icon: Shield,
  },
  {
    name: 'FedRAMP',
    status: 'Architecture Ready',
    description: 'Moderate impact level',
    icon: Server,
  },
  {
    name: 'ISO 27001',
    status: 'Planned',
    description: '2026 roadmap',
    icon: Globe,
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2463] to-[#0A2463]/95 text-white py-24">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6"
            >
              <Shield className="h-4 w-4 text-[#A7FF83]" />
              <span>Security & Compliance</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Enterprise-Grade Security by Design
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300 mb-8"
            >
              Security is not a feature we added. It is the foundation ArqAI is built on.
              Every component is designed for regulated industries from day one.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Security Principles */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Security Principles
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              Our architecture follows industry best practices with security built into every layer.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {securityPrinciples.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 hover:border-[#0A2463]/20 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center mb-4">
                  <principle.icon className="h-6 w-6 text-[#0A2463]" />
                </div>
                <h3 className="text-lg font-semibold text-[#0A2463] mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Certifications & Attestations
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm"
              >
                <div className="w-12 h-12 bg-[#0A2463] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <cert.icon className="h-6 w-6 text-[#A7FF83]" />
                </div>
                <h3 className="font-semibold text-[#0A2463] mb-1">{cert.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mb-2 ${
                  cert.status === 'Achieved'
                    ? 'bg-[#A7FF83] text-[#0A2463]'
                    : cert.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {cert.status}
                </span>
                <p className="text-sm text-gray-500">{cert.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Frameworks */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Compliance Frameworks Supported
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600 max-w-2xl mx-auto"
            >
              ArqAI enables compliance by enforcing your policies and providing technical controls to support your compliance program.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {complianceFrameworks.map((category, index) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-lg font-semibold text-[#0A2463] mb-4 pb-2 border-b border-gray-200">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.frameworks.map((framework) => (
                    <div key={framework.name} className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-[#A7FF83] flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900">{framework.name}</span>
                        <p className="text-sm text-gray-500">{framework.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-[#0A2463] text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Ready for a Security Review?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300 mb-8"
            >
              Request a detailed security review package for your compliance team.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="accent" size="lg">
                Download Security Overview
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent text-white border-white/30 hover:bg-white/10 hover:text-white">
                Contact Security Team
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
