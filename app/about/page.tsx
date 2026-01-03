'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Globe,
  Award,
  Building2,
  ArrowRight,
  MapPin,
  Target,
  Heart,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const leadership = [
  {
    name: 'Jag Kanumuri',
    title: 'President & CEO',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Krish Karanam',
    title: 'SVP, Global Resources',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Habib Mehmoodi',
    title: 'VP, Strategy & Innovation',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Amit Alshaikh',
    title: 'VP, Client Success',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Narayanan N',
    title: 'VP, Project Delivery',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Amit Khare',
    title: 'AVP, Client Success',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Thomas George',
    title: 'Director, Client Success',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Bhupender Singh',
    title: 'Sr. Platform Architect',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
  {
    name: 'Junaid Abdul',
    title: 'Sr. AI Architect',
    image: '/assets/images/team/placeholder.jpg',
    linkedin: '#',
  },
];

const advisors = [
  {
    name: 'Sunil Pal',
    title: 'Healthcare Advisor',
    description: 'Healthcare industry expertise',
    image: '/assets/images/team/placeholder.jpg',
  },
  {
    name: 'Krishna Borusu',
    title: 'Retail & IT Advisor',
    description: 'IT Director at RaceTrac',
    image: '/assets/images/team/placeholder.jpg',
  },
  {
    name: 'John Hadi',
    title: 'Manufacturing & Global IT Advisor',
    description: 'International expansion strategy',
    image: '/assets/images/team/placeholder.jpg',
  },
];

const locations = [
  {
    region: 'North America',
    offices: ['New Jersey (HQ)', 'Atlanta, GA', 'Charlotte, NC', 'Texas', 'Canada'],
  },
  {
    region: 'MENA',
    offices: ['UAE', 'Saudi Arabia', 'Egypt'],
  },
  {
    region: 'India',
    offices: ['Hyderabad', 'Mumbai', 'Noida', 'Bengaluru'],
  },
  {
    region: 'Europe',
    offices: ['Frankfurt', 'Brussels', 'Paris', 'London'],
  },
];

const principles = [
  {
    icon: Target,
    title: 'Customer-First',
    description: 'Every decision starts with customer impact.',
  },
  {
    icon: Zap,
    title: 'Production-Ready',
    description: 'We ship what enterprises can deploy today.',
  },
  {
    icon: Shield,
    title: 'Governance-Native',
    description: 'Security and compliance from day one.',
  },
  {
    icon: Heart,
    title: 'Capital-Efficient',
    description: 'Sustainable growth over vanity metrics.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#0A2463] to-[#0A2463]/95 text-white py-24">
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm mb-6"
            >
              <Building2 className="h-4 w-4 text-[#A7FF83]" />
              <span>About ArqAI</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Making AI Safe for Production
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-300"
            >
              We enable enterprises to deploy AI agents with confidence by building governance into the foundation, not bolting it on later.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-6">
                  Our Story
                </h2>
                <p className="text-gray-600 mb-4">
                  ArqAI was spun off from ACI InfoTech, a 20-year Fortune 500 services company. We observed enterprise customers repeatedly struggling with the same problem: AI pilots that never reached production due to governance gaps.
                </p>
                <p className="text-gray-600 mb-4">
                  Rather than treating governance as an afterthought, we built a platform where governance enables deployment. Founded in 2024, ArqAI brings together decades of enterprise experience with cutting-edge AI innovation.
                </p>
                <p className="text-gray-600">
                  Today, we serve 12 enterprise customers across 6 industry verticals, helping them move from AI experiments to production-ready solutions in 30 days.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="bg-[#F8F9FA] rounded-2xl p-8"
              >
                <div className="space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-[#0A2463]">2024</div>
                    <div className="text-gray-600">Founded from ACI InfoTech</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#0A2463]">20+</div>
                    <div className="text-gray-600">Years of Enterprise Experience</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-[#0A2463]">12</div>
                    <div className="text-gray-600">Enterprise Customers</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Award className="h-6 w-6 text-[#A7FF83]" />
                    <span className="text-gray-600">GEC 2025 Winner</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="section bg-[#F8F9FA]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Leadership Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-600"
            >
              Experienced leaders driving AI governance innovation.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
            {leadership.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-20 h-20 bg-[#0A2463]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-8 w-8 text-[#0A2463]" />
                </div>
                <h3 className="font-semibold text-[#0A2463]">{member.name}</h3>
                <p className="text-sm text-gray-500">{member.title}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Advisory Board
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {advisors.map((advisor, index) => (
              <motion.div
                key={advisor.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-24 h-24 bg-[#0A2463]/10 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Users className="h-10 w-10 text-[#0A2463]" />
                </div>
                <h3 className="font-semibold text-[#0A2463]">{advisor.name}</h3>
                <p className="text-sm text-gray-500 mb-1">{advisor.title}</p>
                <p className="text-xs text-gray-400">{advisor.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section bg-[#0A2463] text-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-4"
            >
              Global Presence
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-gray-300"
            >
              Serving enterprises across the globe.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {locations.map((location, index) => (
              <motion.div
                key={location.region}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <Globe className="h-5 w-5 text-[#A7FF83]" />
                  <h3 className="font-semibold">{location.region}</h3>
                </div>
                <div className="space-y-2">
                  {location.offices.map((office) => (
                    <div key={office} className="flex items-center gap-2 text-sm text-gray-300">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {office}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="section bg-white">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Our Principles
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={principle.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 bg-[#A7FF83]/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="h-7 w-7 text-[#0A2463]" />
                </div>
                <h3 className="font-semibold text-[#0A2463] mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-600">{principle.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-gradient-to-br from-[#A7FF83] to-[#8ae066]">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold text-[#0A2463] mb-4"
            >
              Join Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-[#0A2463]/80 mb-8"
            >
              Help us build the future of AI governance. We are always looking for exceptional talent.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Button size="lg" className="bg-[#0A2463] text-white hover:bg-[#0A2463]/90" asChild>
                <Link href="/careers">
                  View Open Positions
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
