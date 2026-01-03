'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="section bg-gradient-to-br from-[#A7FF83] to-[#8ae066]">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
          >
            Ready to Deploy AI in Production?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-[#0A2463]/80 mb-8 max-w-2xl mx-auto"
          >
            Start with a 30-day blueprint engagement. We&apos;ll map one high-impact workflow, deploy it with governance built-in, and prove value before you commit to more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="xl" className="group bg-[#0A2463] text-white hover:bg-[#0A2463]/90">
              <Calendar className="h-5 w-5 mr-2" />
              Schedule a Demo
              <ArrowRight className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="border-[#0A2463] text-[#0A2463] hover:bg-[#0A2463]/10"
            >
              <Mail className="h-5 w-5 mr-2" />
              Contact Sales
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2463]">Week 1</div>
              <div className="text-sm text-[#0A2463]/70">Blueprint</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2463]">Week 2-3</div>
              <div className="text-sm text-[#0A2463]/70">Integration</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0A2463]">Week 4</div>
              <div className="text-sm text-[#0A2463]/70">Go Live</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
