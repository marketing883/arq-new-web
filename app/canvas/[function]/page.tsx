'use client';

import React, { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import { CanvasLayout } from '@/components/canvas/canvas-layout';
import { useConversationStore } from '@/stores/conversation-store';
import type { FunctionType } from '@/types';

const validFunctions: FunctionType[] = [
  'it-infrastructure',
  'revenue-ops',
  'customer-success',
  'demand-gen',
];

export default function CanvasPage() {
  const params = useParams();
  const functionType = params.function as string;
  const { setCurrentFunction, resetConversation } = useConversationStore();

  // Validate function type
  if (!validFunctions.includes(functionType as FunctionType)) {
    notFound();
  }

  // Set function context on mount
  useEffect(() => {
    resetConversation();
    setCurrentFunction(functionType as FunctionType);
  }, [functionType, setCurrentFunction, resetConversation]);

  return <CanvasLayout functionType={functionType as FunctionType} />;
}
