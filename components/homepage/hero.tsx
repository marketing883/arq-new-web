'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Play, Shield, Zap, BarChart3, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0A1628] via-[#0A2463] to-[#1a3a7a] text-white min-h-screen flex items-center pt-16">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(167, 255, 131, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(167, 255, 131, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient orbs */}
      <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-[#A7FF83] rounded-full filter blur-[180px] opacity-15 animate-pulse" />
      <div className="absolute bottom-20 left-20 w-[400px] h-[400px] bg-blue-500 rounded-full filter blur-[150px] opacity-10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-500 rounded-full filter blur-[200px] opacity-5" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10 py-20">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#A7FF83]/20 to-[#A7FF83]/10 backdrop-blur-sm rounded-full text-sm mb-10 border border-[#A7FF83]/30"
          >
            <Sparkles className="h-4 w-4 text-[#A7FF83]" />
            <span className="text-[#A7FF83] font-medium">GEC 2025 Winner</span>
            <span className="text-gray-300">— AI Governance Innovation</span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] mb-8 tracking-tight"
          >
            <span className="block">The AI Agent Platform</span>
            <span className="block mt-2">
              <span className="bg-gradient-to-r from-[#A7FF83] to-[#6FCF97] bg-clip-text text-transparent">
                Enterprises Trust
              </span>
            </span>
            <span className="block mt-2 text-white/90">to Run in Production</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Governed agents deployed in <span className="text-white font-semibold">30 days</span>, not quarters.
            One control plane for all AI systems across any cloud, any model, any vertical.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button
              asChild
              className="bg-[#A7FF83] text-[#0A2463] hover:bg-[#8FE86B] font-semibold text-lg px-8 py-6 rounded-xl shadow-lg shadow-[#A7FF83]/25 transition-all hover:shadow-xl hover:shadow-[#A7FF83]/30 hover:scale-105"
            >
              <Link href="#explore">
                Book a Demo
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              className="bg-white/5 text-white border-white/20 hover:bg-white/10 hover:border-white/40 font-semibold text-lg px-8 py-6 rounded-xl backdrop-blur-sm transition-all"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Video
            </Button>
          </motion.div>

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-3 gap-6 md:gap-12 max-w-3xl mx-auto"
          >
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-6 w-6 text-[#A7FF83]" />
                <span className="text-4xl md:text-5xl font-bold">30</span>
              </div>
              <p className="text-sm text-gray-400 font-medium">Days to Production</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Zap className="h-6 w-6 text-[#A7FF83]" />
                <span className="text-4xl md:text-5xl font-bold">12</span>
              </div>
              <p className="text-sm text-gray-400 font-medium">Enterprise Customers</p>
            </div>
            <div className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-center gap-2 mb-2">
                <BarChart3 className="h-6 w-6 text-[#A7FF83]" />
                <span className="text-4xl md:text-5xl font-bold">0%</span>
              </div>
              <p className="text-sm text-gray-400 font-medium">Customer Churn</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <Link href="#explore" className="flex flex-col items-center gap-2 text-gray-400 hover:text-white transition-colors">
          <span className="text-xs uppercase tracking-widest font-medium">Explore</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 bg-current rounded-full mt-2"
            />
          </div>
        </Link>
      </motion.div>
    </section>
  );
}
