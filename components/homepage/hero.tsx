'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  const [message, setMessage] = useState('');

  return (
    <section className="relative min-h-screen bg-[#0a0a0f] overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        {/* Main gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-[#00ff88]/20 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-[#0066ff]/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px]" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 136, 0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 136, 0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#00ff88]/40 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Decorative lines */}
      <div className="absolute top-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />
      <div className="absolute bottom-20 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#00ff88]/20 to-transparent" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 lg:px-8 pt-32 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#00ff88]/30 bg-[#00ff88]/5 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-[#00ff88]" />
              <span className="text-[#00ff88] text-sm font-medium">GEC 2025 Winner</span>
              <span className="text-gray-400 text-sm">— AI Governance Innovation</span>
            </div>
          </motion.div>

          {/* Main headline */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="text-white">The AI Agent Platform</span>
              <br />
              <span className="bg-gradient-to-r from-[#00ff88] via-[#00cc6a] to-[#00ff88] bg-clip-text text-transparent">
                Enterprises Trust
              </span>
              <br />
              <span className="text-gray-300">to Run in Production</span>
            </h1>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 text-center max-w-3xl mx-auto mb-12"
          >
            Governed agents deployed in <span className="text-white font-semibold">30 days</span>, not quarters.
            One control plane for all AI systems across any cloud, any model, any vertical.
          </motion.p>

          {/* Chat input box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="max-w-2xl mx-auto mb-12"
          >
            <div className="relative">
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00ff88]/20 via-[#00ff88]/10 to-[#00ff88]/20 rounded-2xl blur-xl" />

              <div className="relative bg-[#0d0d12] border border-[#1a1a24] rounded-2xl p-2">
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Ask ArqBot about AI governance, deployment, security..."
                    className="flex-1 bg-transparent px-4 py-4 text-white placeholder-gray-500 focus:outline-none text-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        window.location.href = `/canvas/it-infrastructure?q=${encodeURIComponent(message)}`;
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (message.trim()) {
                        window.location.href = `/canvas/it-infrastructure?q=${encodeURIComponent(message)}`;
                      }
                    }}
                    className="bg-[#00ff88] hover:bg-[#00cc6a] text-black font-semibold px-6 py-6 rounded-xl"
                  >
                    <Send className="w-5 h-5" />
                  </Button>
                </div>

                {/* Quick prompts */}
                <div className="flex flex-wrap gap-2 px-4 pb-3 pt-1">
                  {['How does governance work?', 'Show me ROI', 'Security features'].map((prompt) => (
                    <button
                      key={prompt}
                      onClick={() => {
                        window.location.href = `/canvas/it-infrastructure?q=${encodeURIComponent(prompt)}`;
                      }}
                      className="text-xs px-3 py-1.5 rounded-full bg-[#1a1a24] text-gray-400 hover:text-white hover:bg-[#252530] transition-colors border border-[#252530]"
                    >
                      {prompt}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
          >
            <Button
              asChild
              size="lg"
              className="bg-[#00ff88] hover:bg-[#00cc6a] text-black font-semibold px-8 py-6 rounded-xl text-lg shadow-lg shadow-[#00ff88]/20"
            >
              <Link href="#functions">
                Explore Platform
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#252530] bg-[#0d0d12] hover:bg-[#1a1a24] text-white px-8 py-6 rounded-xl text-lg"
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
          >
            {[
              { value: '30', label: 'Days to Deploy', suffix: '' },
              { value: '12', label: 'Enterprise Customers', suffix: '+' },
              { value: '0', label: 'Customer Churn', suffix: '%' },
              { value: '$500K', label: 'ARR', suffix: '' },
            ].map((stat, index) => (
              <div
                key={stat.label}
                className="text-center p-6 rounded-2xl bg-[#0d0d12]/80 border border-[#1a1a24] backdrop-blur-sm"
              >
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">
                  {stat.value}<span className="text-[#00ff88]">{stat.suffix}</span>
                </div>
                <div className="text-sm text-gray-500">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
    </section>
  );
}
