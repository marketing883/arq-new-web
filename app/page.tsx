import { Hero } from '@/components/homepage/hero';
import { FunctionSelector } from '@/components/homepage/function-selector';
import { TrustIndicators } from '@/components/homepage/trust-indicators';
import { ValueProposition } from '@/components/homepage/value-proposition';
import { PatentsSection } from '@/components/homepage/patents-section';
import { CTASection } from '@/components/homepage/cta-section';

export default function Home() {
  return (
    <>
      <Hero />
      <FunctionSelector />
      <ValueProposition />
      <TrustIndicators />
      <PatentsSection />
      <CTASection />
    </>
  );
}
