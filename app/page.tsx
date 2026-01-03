import { Hero } from '@/components/homepage/hero';
import { FunctionSelector } from '@/components/homepage/function-selector';
import { ArchitectureSection } from '@/components/homepage/architecture-section';
import { ValueProposition } from '@/components/homepage/value-proposition';
import { CTASection } from '@/components/homepage/cta-section';

export default function Home() {
  return (
    <>
      <Hero />
      <FunctionSelector />
      <ArchitectureSection />
      <ValueProposition />
      <CTASection />
    </>
  );
}
