// ArqAI Type Definitions

export type FunctionType =
  | 'it-infrastructure'
  | 'revenue-ops'
  | 'customer-success'
  | 'demand-gen';

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface ContentBlock {
  id: string;
  type:
    | 'roi-calculator'
    | 'demo-video'
    | 'security-review'
    | 'architecture-diagram'
    | 'integration-checklist'
    | 'deployment-timeline'
    | 'case-study'
    | 'live-stats'
    | 'code-snippet'
    | 'comparison-table';
  data?: Record<string, unknown>;
  visible: boolean;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  company?: string;
  title?: string;
  phone?: string;
  location?: string;
  leadScore: number;
  segmentLabel: string;
  readinessLevel: 'Hot' | 'Warm' | 'Nurture' | 'Research';
  companySizeTier: 'Enterprise' | 'Mid-Market' | 'SMB' | 'Startup';
  industryVertical?: string;
  budgetAuthorityLevel: 'C-Suite' | 'VP' | 'Director' | 'Manager' | 'IC';
  conversationId: string;
  conversationDepth: number;
  conversationTranscript?: Message[];
  primaryPainPoint?: string;
  useCasesDiscussed?: string[];
  urgencyLevel: 'Immediate' | 'Exploring' | 'Learning';
  objectionsRaised?: string;
  competingToolsMentioned?: string[];
  technicalSophisticationLevel: 'High' | 'Medium' | 'Low';
  artifactsGenerated?: string[];
  nextActionSuggested?: string;
  functionExplored?: FunctionType;
  status: 'New' | 'Contacted' | 'Qualified' | 'Unqualified';
  createdAt: Date;
  updatedAt: Date;
}

export interface RetrievalResult {
  chunks: Array<{
    chunkId: string;
    content: string;
    score: number;
    category: string;
    confidence: string;
  }>;
  confidence: number;
  breakdown: {
    semanticSimilarity: number;
    keywordMatch: number;
    metadataConfidence: number;
    recency: number;
  };
}

export interface PolicyViolation {
  policyId: string;
  policyName: string;
  severity: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  matchedText: string;
  action: 'BLOCK' | 'REWRITE' | 'REDACT' | 'ESCALATE' | 'HEDGE';
}

export interface CompilationResult {
  originalResponse: string;
  finalResponse: string;
  violations: PolicyViolation[];
  actions: Array<{
    policy: string;
    action: string;
    before: string;
    after: string;
  }>;
  shouldEscalate: boolean;
  escalationReason?: string;
}

export interface RiskContext {
  leadScore: number;
  conversationDepth: number;
  engagementSignals: string[];
  roleDetected?: string;
  companySize?: string;
  industry?: string;
  actionType: 'calendar' | 'email' | 'crm';
}

export interface CapabilityToken {
  tokenId: string;
  issuedAt: string;
  expiresAt: string;
  singleUse: boolean;
  scope: {
    action: string;
    resource: string;
    parameters: Record<string, unknown>;
  };
  constraints?: {
    maxAttendees?: number;
    maxDuration?: number;
    maxFileSize?: number;
  };
  riskScore: number;
  userContext: {
    leadId?: string;
    conversationId: string;
    userEmail: string;
  };
  signature: string;
}
