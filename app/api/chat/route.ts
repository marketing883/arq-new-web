import { NextRequest, NextResponse } from 'next/server';
import { retrieveRelevantChunks, buildContextFromChunks, logEvidence } from '@/lib/rag';

// Agent system prompt based on the knowledge base
const SYSTEM_PROMPT = `You are ArqBot, ArqAI's executive sales consultant. You blend three personas:

1. **Executive Consultant**: Strategic, speaks to business outcomes
2. **Technical Expert**: Deep platform knowledge, architecture fluency
3. **Trusted Advisor**: Direct, no fluff, outcome-focused

CORE BEHAVIORS:
- Never use marketing speak
- Be direct and confident, not arrogant
- Adapt to user's technical level
- Ask strategic questions to qualify
- Focus on outcomes, not features

ABOUT ARQAI:
ArqAI is the AI Agent Platform Enterprises Trust to Run in Production. We enable governed AI agent deployment in 30 days, not quarters. Key differentiators:
- Three patented technologies: Trust-Aware Agent Orchestration™, Compliance-Aware Prompt Compiler™, and Observability-Driven Adaptive RAG™
- One control plane for all AI systems across any cloud, any model, any vertical
- Zero-trust architecture with capability tokens for every action
- Automatic audit evidence with cryptographic receipts

CURRENT TRACTION:
- $500K ARR
- 12 enterprise customers
- 0% churn
- 6 industry verticals: Finance, Healthcare, Telecom, Industrial, Real Estate, Retail
- GEC 2025 Winner for AI Governance Innovation

CRITICAL RULES (NEVER VIOLATE):
- Never promise deployment < 30 days
- Never guarantee specific ROI without assessment
- Never name specific customers (we serve "12 enterprise customers across 6 verticals")
- Never quote specific dollar pricing
- Always use hedging language: "typically", "generally", "based on similar engagements"
- SOC 2 is "in progress, expected Q2 2026" (not complete)
- FedRAMP is "architecture ready" (not authorized)
- Say "ArqAI enables compliance" not "ArqAI guarantees compliance"

If asked about pricing: "Pricing is customized based on scope. Let me connect you with our team for a detailed discussion."

Keep responses concise and conversational. Ask clarifying questions to understand the user's specific needs.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { messages, conversationId, functionArea } = await request.json();
    const lastUserMessage = messages.filter((m: ChatMessage) => m.role === 'user').pop();

    // Check if Anthropic API key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message: getFallbackResponse(messages),
      });
    }

    // Try to retrieve relevant context from RAG (only if Supabase is configured)
    let ragContext = '';
    let retrievedChunks: { chunk_id: string; similarity: number }[] = [];

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && lastUserMessage) {
      try {
        const chunks = await retrieveRelevantChunks(lastUserMessage.content, {
          matchThreshold: 0.65,
          matchCount: 4,
          filterFunction: functionArea || undefined,
        });

        if (chunks.length > 0) {
          ragContext = buildContextFromChunks(chunks);
          retrievedChunks = chunks.map((c) => ({
            chunk_id: c.chunk_id,
            similarity: c.similarity,
          }));
        }
      } catch (error) {
        console.warn('RAG retrieval failed, continuing without context:', error);
      }
    }

    // Build the system prompt with RAG context
    const systemPromptWithContext = ragContext
      ? `${SYSTEM_PROMPT}\n\n${ragContext}`
      : SYSTEM_PROMPT;

    // Call Claude API
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1024,
        system: systemPromptWithContext,
        messages: messages.map((m: ChatMessage) => ({
          role: m.role,
          content: m.content,
        })),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Claude API error:', response.status, errorText);
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    const assistantMessage = data.content[0].text;

    // Log evidence if configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && conversationId && lastUserMessage) {
      const responseTime = Date.now() - startTime;
      const avgSimilarity =
        retrievedChunks.length > 0
          ? retrievedChunks.reduce((sum, c) => sum + c.similarity, 0) / retrievedChunks.length
          : 0;

      logEvidence(
        conversationId,
        lastUserMessage.content,
        retrievedChunks.map((c) => c.chunk_id),
        avgSimilarity,
        assistantMessage,
        responseTime
      ).catch((error) => console.warn('Failed to log evidence:', error));
    }

    return NextResponse.json({
      message: assistantMessage,
      sources: retrievedChunks.length > 0 ? retrievedChunks : undefined,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      message:
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our team directly at hello@thearq.ai.",
    });
  }
}

// Fallback responses when API key is not configured
function getFallbackResponse(messages: ChatMessage[]): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';

  if (lastMessage.includes('roi') || lastMessage.includes('cost') || lastMessage.includes('save')) {
    return "Great question about ROI! Customers typically see significant efficiency gains - we've seen 40% faster deployments and 70% reduction in manual work. Every organization is different, so I'd recommend a Blueprint assessment where we can model the expected outcomes for your specific situation. Would you like to explore what that looks like?";
  }

  if (
    lastMessage.includes('security') ||
    lastMessage.includes('compliance') ||
    lastMessage.includes('soc')
  ) {
    return "Security is fundamental to ArqAI - it's not a feature we added, it's the foundation we built on. We have a zero-trust architecture with capability tokens for every action, automatic audit evidence generation, and we're pursuing SOC 2 Type II (expected Q2 2026). Our architecture is also FedRAMP-ready. Would you like me to walk you through our security framework?";
  }

  if (
    lastMessage.includes('deploy') ||
    lastMessage.includes('timeline') ||
    lastMessage.includes('how long')
  ) {
    return "We typically deploy the first governed workflow in 30 days. Week 1 is the Blueprint phase where we map your workflow, then 2-3 weeks of integration and testing, and you're live by week 4. This includes governance built in from day one. What workflow are you thinking about automating first?";
  }

  if (
    lastMessage.includes('price') ||
    lastMessage.includes('pricing') ||
    lastMessage.includes('cost')
  ) {
    return "Pricing is customized based on your specific scope and requirements. Rather than throwing out numbers, I'd love to understand your use case first so we can give you an accurate picture. What workflows are you looking to automate, and roughly how many users would be involved?";
  }

  if (
    lastMessage.includes('competitor') ||
    lastMessage.includes('vs') ||
    lastMessage.includes('compare')
  ) {
    return "What sets ArqAI apart is that governance is our foundation, not an afterthought. While other platforms focus on the AI capabilities first, we built the control plane first. That's why 87% of enterprise AI pilots never deploy - they hit governance walls. Our three patented technologies solve this at the architecture level. What's driving your evaluation?";
  }

  if (
    lastMessage.includes('customer') ||
    lastMessage.includes('case study') ||
    lastMessage.includes('example')
  ) {
    return "We serve 12 enterprise customers across Finance, Healthcare, Telecom, Industrial, Real Estate, and Retail. Due to NDAs I can't share names, but I can tell you about results: one telecom customer reduced deployment time by 40%, a healthcare organization automated 70% of tier-1 support while maintaining HIPAA compliance. What industry are you in?";
  }

  // Default response
  return "Thanks for your interest in ArqAI! I'd love to understand more about your situation. What's the biggest challenge you're facing with AI deployment today - is it governance, compliance, getting to production, or something else?";
}
