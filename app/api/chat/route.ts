import { NextRequest, NextResponse } from 'next/server';
import { retrieveRelevantChunks, buildContextFromChunks, logEvidence } from '@/lib/rag';

// Lead-generation focused system prompt
const SYSTEM_PROMPT = `You are ArqBot, ArqAI's intelligent sales assistant. You are friendly, professional, and genuinely helpful. Your goals are:

1. **Help visitors** understand ArqAI's value proposition
2. **Build rapport** through natural, conversational engagement
3. **Qualify leads** by understanding their needs and challenges
4. **Capture information** naturally during conversation (name, email, company, role)
5. **Guide to action** - schedule demos, answer questions, connect with team

PERSONALITY:
- Warm but professional
- Knowledgeable without being arrogant
- Curious about the visitor's situation
- Helpful and solution-oriented
- Concise - respect their time

ABOUT ARQAI:
ArqAI is the AI Agent Platform Enterprises Trust to Run in Production. Key facts:
- Deploy governed AI agents in 30 days, not quarters
- Three patented technologies:
  • Trust-Aware Agent Orchestration™ - Zero-trust with capability tokens
  • Compliance-Aware Prompt Compiler™ - Built-in regulatory guardrails
  • Observability-Driven Adaptive RAG™ - Cryptographic audit trails
- One control plane for all AI systems across any cloud, any model
- $500K ARR, 12 enterprise customers, 0% churn
- 6 industry verticals: Finance, Healthcare, Telecom, Industrial, Real Estate, Retail
- GEC 2025 Winner for AI Governance Innovation

LEAD CAPTURE STRATEGY:
Naturally weave in questions to learn about the visitor. Don't ask all at once - spread throughout conversation:
- "By the way, what should I call you?" (name)
- "What company are you with?" / "Which organization are you exploring this for?" (company)
- "What's your role there?" / "Are you on the technical side or business side?" (job title)
- "Would you like me to send you more details? What's the best email?" (email)
- "If you'd prefer a call, I can have someone reach out. What's a good number?" (phone - optional)

CONTENT GUIDANCE:
When users ask about specific topics, mention that you can show them more details:
- Architecture questions → "I can show you our architecture diagram"
- Features/capabilities → "Let me highlight our key features"
- Demo/meeting → "I can help you schedule a demo"
- Use cases → "I can share how similar companies use ArqAI"

CRITICAL RULES - NEVER VIOLATE:
1. **PRICING**: NEVER quote specific dollar amounts. Always say:
   "Pricing is customized based on your specific requirements. I'd love to understand your use case first - then I can connect you with our team for a detailed discussion. What workflows are you looking to automate?"

2. **DEPLOYMENT**: Never promise deployment faster than 30 days

3. **ROI**: Don't guarantee specific ROI numbers without qualification. Use phrases like:
   "Customers typically see..." or "Based on similar engagements..."

4. **CUSTOMERS**: Never name specific customers. Say "12 enterprise customers across 6 verticals"

5. **COMPLIANCE STATUS**:
   - SOC 2: "In progress, expected Q2 2026"
   - FedRAMP: "Architecture ready" (not authorized)
   - HIPAA/GDPR: "Compliant"

6. **HEDGING**: Use "typically", "generally", "based on similar engagements"

7. **SAY**: "ArqAI enables compliance" NOT "ArqAI guarantees compliance"

RESPONSE STYLE:
- Keep responses concise (2-4 sentences typically)
- Ask one clarifying question per response when appropriate
- Be genuinely helpful, not pushy
- If they seem ready to schedule, make it easy for them
- Reference the Cal.com booking link: https://cal.com/arqai/discovery

Remember: You're having a conversation, not interrogating. Be natural and helpful.`;

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface LeadData {
  name?: string;
  email?: string;
  company?: string;
  jobTitle?: string;
}

// Detect content type suggestions based on conversation
function detectContentSuggestion(message: string): { type: string; title?: string } | null {
  const lower = message.toLowerCase();

  if (/architecture|platform|how.*work|technical|system|diagram/i.test(lower)) {
    return { type: 'architecture', title: 'Platform Architecture' };
  }
  if (/feature|capability|can.*do|what.*offer|security|compliance/i.test(lower)) {
    return { type: 'features', title: 'Platform Features' };
  }
  if (/demo|meeting|schedule|call|talk|discuss|book/i.test(lower)) {
    return { type: 'demo', title: 'Schedule a Demo' };
  }
  if (/price|pricing|cost|pay|subscription|quote/i.test(lower)) {
    return { type: 'pricing', title: 'Enterprise Pricing' };
  }

  return null;
}

export async function POST(request: NextRequest) {
  const startTime = Date.now();

  try {
    const { messages, conversationId, leadData, currentPage } = await request.json() as {
      messages: ChatMessage[];
      conversationId?: string;
      leadData?: LeadData;
      currentPage?: string;
    };

    const lastUserMessage = messages.filter((m: ChatMessage) => m.role === 'user').pop();

    // Check if Anthropic API key is available
    const apiKey = process.env.ANTHROPIC_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        message: getFallbackResponse(messages, leadData),
        suggestedContent: lastUserMessage ? detectContentSuggestion(lastUserMessage.content) : null,
      });
    }

    // Try to retrieve relevant context from RAG
    let ragContext = '';
    let retrievedChunks: { chunk_id: string; similarity: number }[] = [];

    if (process.env.NEXT_PUBLIC_SUPABASE_URL && lastUserMessage) {
      try {
        const chunks = await retrieveRelevantChunks(lastUserMessage.content, {
          matchThreshold: 0.65,
          matchCount: 4,
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

    // Build context about the lead and current page
    let contextNotes = '';
    if (leadData) {
      const known = [];
      if (leadData.name) known.push(`Name: ${leadData.name}`);
      if (leadData.company) known.push(`Company: ${leadData.company}`);
      if (leadData.jobTitle) known.push(`Role: ${leadData.jobTitle}`);
      if (leadData.email) known.push(`Email: ${leadData.email}`);

      if (known.length > 0) {
        contextNotes += `\n\nKNOWN VISITOR INFO:\n${known.join('\n')}\n(Don't ask for information you already have)`;
      }
    }

    if (currentPage && currentPage !== '/') {
      contextNotes += `\n\nVISITOR CONTEXT: Currently viewing the ${currentPage} page.`;
    }

    // Build the system prompt with RAG context
    const systemPromptWithContext = ragContext
      ? `${SYSTEM_PROMPT}${contextNotes}\n\n${ragContext}`
      : `${SYSTEM_PROMPT}${contextNotes}`;

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

    // Detect content suggestion from the conversation
    const suggestedContent = lastUserMessage ? detectContentSuggestion(lastUserMessage.content) : null;

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
      suggestedContent,
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({
      message:
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment, or contact our team directly at hello@thearq.ai.",
    });
  }
}

// Enhanced fallback responses with lead capture focus
function getFallbackResponse(messages: ChatMessage[], leadData?: LeadData): string {
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
  const hasName = leadData?.name;
  const nameGreeting = hasName ? `${leadData.name}, ` : '';

  // Pricing - always redirect to meeting
  if (/price|pricing|cost|pay|subscription|quote|how much/i.test(lastMessage)) {
    return `${nameGreeting}Pricing is customized based on your specific requirements and scale. Rather than throwing out numbers, I'd love to understand your use case first - then I can connect you with our team for a detailed discussion. What workflows are you looking to automate?`;
  }

  // ROI and cost savings
  if (/roi|return|savings?|save|invest/i.test(lastMessage)) {
    return `Great question about ROI! ${nameGreeting}Customers typically see significant efficiency gains - 40% faster deployments and 70% reduction in manual work are common. Every organization is different, so we'd recommend a Blueprint assessment where we can model expected outcomes for your situation. Would you like to schedule one?`;
  }

  // Security and compliance
  if (/security|compliance|soc|hipaa|gdpr|audit/i.test(lastMessage)) {
    return `${nameGreeting}Security is fundamental to ArqAI - it's not a feature we added, it's the foundation we built on. We have a zero-trust architecture with capability tokens for every action, automatic audit evidence generation, and we're pursuing SOC 2 Type II (expected Q2 2026). Would you like me to show you our security architecture?`;
  }

  // Deployment timeline
  if (/deploy|timeline|how long|time.*prod|implementation/i.test(lastMessage)) {
    return `${nameGreeting}We typically deploy the first governed workflow in 30 days. Week 1 is the Blueprint phase where we map your workflow, then 2-3 weeks of integration and testing, and you're live by week 4 with governance built in from day one. What workflow are you thinking about automating first?`;
  }

  // Demo or meeting
  if (/demo|meeting|schedule|call|talk|speak|book/i.test(lastMessage)) {
    return `${nameGreeting}I'd be happy to set that up! You can book directly at cal.com/arqai/discovery - we have slots available this week. It's a 30-minute call where we'll understand your use case and show you relevant parts of the platform. What's the best email to send a calendar invite to?`;
  }

  // Competitors or comparison
  if (/competitor|vs|compare|different|alternative/i.test(lastMessage)) {
    return `${nameGreeting}What sets ArqAI apart is that governance is our foundation, not an afterthought. While other platforms focus on AI capabilities first, we built the control plane first. That's why 87% of enterprise AI pilots never deploy - they hit governance walls. Our three patented technologies solve this at the architecture level. What's driving your evaluation?`;
  }

  // Customers or case studies
  if (/customer|case study|example|success|who.*use/i.test(lastMessage)) {
    return `${nameGreeting}We serve 12 enterprise customers across Finance, Healthcare, Telecom, Industrial, Real Estate, and Retail with 0% churn. Due to NDAs I can't share names, but I can tell you about results: one telecom customer reduced deployment time by 40%, a healthcare organization automated 70% of tier-1 support while maintaining HIPAA compliance. What industry are you in?`;
  }

  // Architecture or how it works
  if (/architecture|how.*work|technical|platform|system/i.test(lastMessage)) {
    return `${nameGreeting}ArqAI is built on three patented technologies: Trust-Aware Agent Orchestration for zero-trust security, Compliance-Aware Prompt Compiler for automatic regulatory guardrails, and Observability-Driven Adaptive RAG for full audit trails. I can show you the architecture diagram - would that be helpful?`;
  }

  // Greeting
  if (/^(hi|hello|hey|good morning|good afternoon)/i.test(lastMessage)) {
    return "Hi there! I'm ArqBot, here to help you learn about ArqAI. We help enterprises deploy governed AI agents in 30 days instead of quarters. What brings you here today?";
  }

  // Default - try to understand their needs
  if (!hasName) {
    return "Thanks for your interest in ArqAI! I'd love to understand more about your situation. What's the biggest challenge you're facing with AI deployment today? And by the way, what should I call you?";
  }

  return `Thanks for your interest, ${leadData.name}! I'd love to understand more about your situation. What's the biggest challenge you're facing with AI deployment today - is it governance, compliance, getting to production, or something else?`;
}
