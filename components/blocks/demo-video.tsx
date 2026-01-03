'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { FunctionType } from '@/types';

interface DemoVideoProps {
  data?: Record<string, unknown>;
  functionType: FunctionType;
}

const videoConfig: Record<FunctionType, { title: string; description: string }> = {
  'it-infrastructure': {
    title: 'IT Infrastructure Automation Demo',
    description: 'See how ArqAI governs CI/CD pipelines and automates incident response',
  },
  'revenue-ops': {
    title: 'Revenue Operations Demo',
    description: 'Watch ArqAI automate lead routing and data enrichment with governance',
  },
  'customer-success': {
    title: 'Customer Success Automation Demo',
    description: 'See tier-1 support automation with smart escalation in action',
  },
  'demand-gen': {
    title: 'Demand Generation Demo',
    description: 'Watch GDPR-compliant campaign automation and content generation',
  },
};

export function DemoVideo({ data, functionType }: DemoVideoProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const config = videoConfig[functionType];

  return (
    <div className="space-y-4">
      {/* Video placeholder */}
      <div className="relative aspect-video bg-[#0A2463] rounded-xl overflow-hidden">
        {/* Placeholder content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying ? (
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsPlaying(true)}
              className="w-20 h-20 bg-[#A7FF83] rounded-full flex items-center justify-center shadow-lg"
            >
              <Play className="h-8 w-8 text-[#0A2463] ml-1" />
            </motion.button>
          ) : (
            <div className="text-white text-center p-8">
              <p className="text-lg font-medium mb-2">Video Player</p>
              <p className="text-sm text-gray-300">
                Demo video would play here with actual video content
              </p>
            </div>
          )}
        </div>

        {/* Video controls */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>

              {/* Progress bar placeholder */}
              <div className="flex-1 h-1 bg-white/30 rounded-full">
                <div className="w-1/3 h-full bg-[#A7FF83] rounded-full" />
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsMuted(!isMuted)}
              >
                {isMuted ? (
                  <VolumeX className="h-5 w-5" />
                ) : (
                  <Volume2 className="h-5 w-5" />
                )}
              </Button>

              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-5 w-5" />
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Video info */}
      <div>
        <h3 className="font-semibold text-[#0A2463]">{config.title}</h3>
        <p className="text-sm text-gray-500">{config.description}</p>
      </div>
    </div>
  );
}
