'use client';

import { DynamicContentRenderer } from '@/components/dynamic';
import { useChatContext } from '@/components/chat/chat-provider';
import { useEffect } from 'react';

export default function Home() {
  const { setCurrentPage } = useChatContext();

  useEffect(() => {
    setCurrentPage('/');
  }, [setCurrentPage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Top gradient orb */}
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#0047BA]/5 rounded-full blur-3xl" />
        {/* Bottom gradient orb */}
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#C5F82A]/10 rounded-full blur-3xl" />
      </div>

      {/* Main content area */}
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        <DynamicContentRenderer />
      </div>

      {/* Bottom padding for chat interface */}
      <div className="h-32 md:h-40" />
    </div>
  );
}
