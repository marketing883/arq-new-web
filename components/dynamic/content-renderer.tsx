'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatContext, ContentView } from '@/components/chat/chat-provider';
import { ArchitectureContent } from './architecture-content';
import { FeaturesContent } from './features-content';
import { DemoContent } from './demo-content';
import { WelcomeContent } from './welcome-content';
import { PricingContent } from './pricing-content';

// Glass panel wrapper for all dynamic content
const GlassPanel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`backdrop-blur-xl bg-white/60 border border-white/50 rounded-3xl shadow-xl shadow-black/5 ${className}`}>
    {children}
  </div>
);

// Content component mapping
const ContentComponents: Record<ContentView['type'], React.ComponentType<{ data?: Record<string, unknown> }>> = {
  welcome: WelcomeContent,
  architecture: ArchitectureContent,
  features: FeaturesContent,
  demo: DemoContent,
  pricing: PricingContent,
  about: WelcomeContent, // Fallback
  contact: DemoContent,  // Fallback to demo for contact
  custom: WelcomeContent,
};

export function DynamicContentRenderer() {
  const { activeContent, contentHistory } = useChatContext();

  const ContentComponent = ContentComponents[activeContent.type] || WelcomeContent;

  return (
    <div className="relative min-h-[60vh]">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-20 -left-32 w-96 h-96 bg-[#0047BA]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 -right-32 w-96 h-96 bg-[#C5F82A]/20 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(to right, #0047BA 1px, transparent 1px),
              linear-gradient(to bottom, #0047BA 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Main content area with transitions */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeContent.type}
          initial={{ opacity: 0, y: 20, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.98 }}
          transition={{
            type: 'spring',
            damping: 25,
            stiffness: 200,
            duration: 0.4,
          }}
          className="relative z-10"
        >
          <GlassPanel className="p-8 md:p-12">
            <ContentComponent data={activeContent.data} />
          </GlassPanel>
        </motion.div>
      </AnimatePresence>

      {/* Content history breadcrumbs (subtle) */}
      {contentHistory.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-6 flex justify-center gap-2"
        >
          {contentHistory.slice(-3).map((content, idx) => (
            <div
              key={idx}
              className="w-2 h-2 rounded-full bg-gray-300"
              title={content.type}
            />
          ))}
          <div className="w-2 h-2 rounded-full bg-[#0047BA]" />
        </motion.div>
      )}
    </div>
  );
}
