import { createSupabaseAdmin } from '@/lib/supabase/client';
import { generateEmbeddings } from '@/lib/openai/embeddings';
import type { KBChunk } from './index';

interface ParsedSection {
  title: string;
  content: string;
  category: string;
  subcategory?: string;
  functionArea?: string;
}

export function parseKnowledgeBase(markdown: string): ParsedSection[] {
  const sections: ParsedSection[] = [];
  const lines = markdown.split('\n');

  let currentCategory = '';
  let currentSubcategory = '';
  let currentTitle = '';
  let currentContent: string[] = [];
  let currentFunctionArea: string | undefined;

  const categoryMap: Record<string, string> = {
    'company overview': 'company',
    'platform capabilities': 'platform',
    'security & compliance': 'security',
    'use cases': 'use-cases',
    'pricing': 'pricing',
    'integration': 'integration',
    'support': 'support',
    'faqs': 'faq',
  };

  const functionMap: Record<string, string> = {
    'it infrastructure': 'it-infrastructure',
    'revenue operations': 'revenue-ops',
    'customer success': 'customer-success',
    'demand generation': 'demand-gen',
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Detect H1 headers (main categories)
    if (line.startsWith('# ')) {
      // Save previous section if exists
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join('\n').trim(),
          category: currentCategory,
          subcategory: currentSubcategory,
          functionArea: currentFunctionArea,
        });
      }

      const headerText = line.substring(2).toLowerCase();
      currentCategory = categoryMap[headerText] || headerText.replace(/\s+/g, '-');
      currentSubcategory = '';
      currentTitle = line.substring(2);
      currentContent = [];
      currentFunctionArea = undefined;
    }
    // Detect H2 headers (subcategories)
    else if (line.startsWith('## ')) {
      // Save previous section if exists
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join('\n').trim(),
          category: currentCategory,
          subcategory: currentSubcategory,
          functionArea: currentFunctionArea,
        });
      }

      const headerText = line.substring(3).toLowerCase();
      currentSubcategory = headerText.replace(/\s+/g, '-');
      currentTitle = line.substring(3);
      currentContent = [];

      // Check if this is a function-specific section
      for (const [key, value] of Object.entries(functionMap)) {
        if (headerText.includes(key)) {
          currentFunctionArea = value;
          break;
        }
      }
    }
    // Detect H3 headers (subsections)
    else if (line.startsWith('### ')) {
      // Save previous section if exists
      if (currentTitle && currentContent.length > 0) {
        sections.push({
          title: currentTitle,
          content: currentContent.join('\n').trim(),
          category: currentCategory,
          subcategory: currentSubcategory,
          functionArea: currentFunctionArea,
        });
      }

      currentTitle = line.substring(4);
      currentContent = [];
    }
    // Regular content
    else if (line.trim()) {
      currentContent.push(line);
    }
  }

  // Don't forget the last section
  if (currentTitle && currentContent.length > 0) {
    sections.push({
      title: currentTitle,
      content: currentContent.join('\n').trim(),
      category: currentCategory,
      subcategory: currentSubcategory,
      functionArea: currentFunctionArea,
    });
  }

  return sections;
}

export function chunkSection(section: ParsedSection, maxChunkSize: number = 1000): KBChunk[] {
  const chunks: KBChunk[] = [];
  const content = section.content;

  // If content is small enough, create single chunk
  if (content.length <= maxChunkSize) {
    chunks.push({
      chunk_id: `${section.category}-${section.subcategory || 'main'}-${chunks.length}`,
      content: `${section.title}\n\n${content}`,
      category: section.category,
      subcategory: section.subcategory,
      function_area: section.functionArea,
      confidence: 'high',
    });
    return chunks;
  }

  // Split by paragraphs first
  const paragraphs = content.split('\n\n');
  let currentChunk: string[] = [];
  let currentSize = 0;

  for (const paragraph of paragraphs) {
    if (currentSize + paragraph.length > maxChunkSize && currentChunk.length > 0) {
      // Save current chunk
      chunks.push({
        chunk_id: `${section.category}-${section.subcategory || 'main'}-${chunks.length}`,
        content: `${section.title}\n\n${currentChunk.join('\n\n')}`,
        category: section.category,
        subcategory: section.subcategory,
        function_area: section.functionArea,
        confidence: 'high',
      });
      currentChunk = [];
      currentSize = 0;
    }

    currentChunk.push(paragraph);
    currentSize += paragraph.length;
  }

  // Don't forget the last chunk
  if (currentChunk.length > 0) {
    chunks.push({
      chunk_id: `${section.category}-${section.subcategory || 'main'}-${chunks.length}`,
      content: `${section.title}\n\n${currentChunk.join('\n\n')}`,
      category: section.category,
      subcategory: section.subcategory,
      function_area: section.functionArea,
      confidence: 'high',
    });
  }

  return chunks;
}

export async function indexKnowledgeBase(markdown: string): Promise<{ success: boolean; indexed: number; errors: string[] }> {
  const errors: string[] = [];
  let indexed = 0;

  try {
    const supabase = createSupabaseAdmin();
    if (!supabase) {
      return { success: false, indexed: 0, errors: ['Supabase not configured'] };
    }

    // Parse the knowledge base into sections
    const sections = parseKnowledgeBase(markdown);
    console.log(`Parsed ${sections.length} sections from knowledge base`);

    // Chunk each section
    const allChunks: KBChunk[] = [];
    for (const section of sections) {
      const chunks = chunkSection(section);
      allChunks.push(...chunks);
    }
    console.log(`Created ${allChunks.length} chunks`);

    // Process in batches to avoid rate limits
    const batchSize = 20;
    for (let i = 0; i < allChunks.length; i += batchSize) {
      const batch = allChunks.slice(i, i + batchSize);

      // Generate embeddings for the batch
      const texts = batch.map((chunk) => chunk.content);
      const embeddings = await generateEmbeddings(texts);

      // Insert chunks with embeddings
      const chunksWithEmbeddings = batch.map((chunk, idx) => ({
        chunk_id: chunk.chunk_id,
        content: chunk.content,
        category: chunk.category,
        subcategory: chunk.subcategory,
        function_area: chunk.function_area,
        confidence: chunk.confidence,
        embedding: embeddings[idx],
        metadata: chunk.metadata || {},
      }));

      const { error } = await supabase.from('kb_chunks').upsert(chunksWithEmbeddings, {
        onConflict: 'chunk_id',
      });

      if (error) {
        errors.push(`Batch ${i / batchSize + 1}: ${error.message}`);
      } else {
        indexed += batch.length;
      }

      // Small delay to avoid rate limits
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    return { success: errors.length === 0, indexed, errors };
  } catch (error) {
    errors.push(`Fatal error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    return { success: false, indexed, errors };
  }
}
