'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function CTASection() {
  return (
    <section className="relative py-32 bg-[#0a0a0f] overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#00ff88]/10 rounded-full blur-[200px]" />
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Main CTA card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00ff88]/20 via-cyan-500/10 to-[#00ff88]/20 rounded-[40px] blur-2xl" />

            <div className="relative bg-gradient-to-br from-[#00ff88] to-[#00cc6a] rounded-[32px] p-12 md:p-16 text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold text-[#0a0a0f] mb-6"
              >
                Ready to Deploy AI
                <br />
                in Production?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-lg text-[#0a0a0f]/70 mb-10 max-w-2xl mx-auto"
              >
                Start with a 30-day blueprint engagement. We&apos;ll map one high-impact workflow, deploy it with governance built-in, and prove value before you commit to more.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-[#0a0a0f] text-white hover:bg-[#1a1a24] font-semibold px-8 py-6 rounded-xl text-lg shadow-xl"
                >
                  <Link href="https://cal.com/habib-mehmoodi-rj394w/30min" target="_blank">
                    <Calendar className="w-5 h-5 mr-2" />
                    Schedule a Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#0a0a0f]/30 text-[#0a0a0f] hover:bg-[#0a0a0f]/10 font-semibold px-8 py-6 rounded-xl text-lg"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Sales
                </Button>
              </motion.div>

              {/* Timeline */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="flex justify-center items-center gap-4 md:gap-8"
              >
                {[
                  { week: 'Week 1', label: 'Blueprint' },
                  { week: 'Week 2-3', label: 'Integration' },
                  { week: 'Week 4', label: 'Go Live' },
                ].map((step, index) => (
                  <React.Fragment key={step.week}>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-[#0a0a0f] flex items-center justify-center mb-2 mx-auto">
                        <CheckCircle className="w-6 h-6 text-[#00ff88]" />
                      </div>
                      <div className="text-sm font-bold text-[#0a0a0f]">{step.week}</div>
                      <div className="text-xs text-[#0a0a0f]/60">{step.label}</div>
                    </div>
                    {index < 2 && (
                      <div className="w-12 md:w-24 h-px bg-[#0a0a0f]/30" />
                    )}
                  </React.Fragment>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
