'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = {
  product: [
    { name: 'Platform', href: '/platform', description: 'AI governance infrastructure' },
    { name: 'Architecture', href: '/architecture', description: 'How ArqAI works' },
    { name: 'Security', href: '/security', description: 'Enterprise-grade security' },
  ],
  solutions: [
    { name: 'Finance', href: '/solutions/finance', description: 'Compliance-first AI' },
    { name: 'Healthcare', href: '/solutions/healthcare', description: 'HIPAA-compliant agents' },
    { name: 'Enterprise', href: '/solutions/enterprise', description: 'Scale with governance' },
  ],
  company: [
    { name: 'About', href: '/about', description: 'Our story and team' },
    { name: 'Contact', href: '/contact', description: 'Get in touch' },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
      scrolled
        ? "bg-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-sm"
        : "bg-transparent"
    )}>
      <nav className="container mx-auto px-6 lg:px-8" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-3 group">
              <Image
                src="/assets/images/arqai-logo.svg"
                alt="ArqAI"
                width={140}
                height={40}
                className="h-10 w-auto"
                priority
              />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-gray-700 p-2"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:gap-x-8">
            {/* Product dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('product')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0047BA] transition-colors py-2">
                Product
                <ChevronDown className={cn(
                  'h-4 w-4 transition-transform',
                  activeDropdown === 'product' && 'rotate-180'
                )} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'product' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-64 rounded-2xl bg-white border border-gray-200 p-3 shadow-xl shadow-gray-200/50">
                      {navigation.product.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-gray-900">{item.name}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Solutions dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('solutions')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0047BA] transition-colors py-2">
                Solutions
                <ChevronDown className={cn(
                  'h-4 w-4 transition-transform',
                  activeDropdown === 'solutions' && 'rotate-180'
                )} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-64 rounded-2xl bg-white border border-gray-200 p-3 shadow-xl shadow-gray-200/50">
                      {navigation.solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-gray-900">{item.name}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('company')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0047BA] transition-colors py-2">
                Company
                <ChevronDown className={cn(
                  'h-4 w-4 transition-transform',
                  activeDropdown === 'company' && 'rotate-180'
                )} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'company' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-64 rounded-2xl bg-white border border-gray-200 p-3 shadow-xl shadow-gray-200/50">
                      {navigation.company.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 hover:bg-gray-50 transition-colors"
                        >
                          <span className="block text-sm font-semibold text-gray-900">{item.name}</span>
                          <span className="block text-xs text-gray-500 mt-0.5">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button
              asChild
              className="bg-[#0047BA] hover:bg-[#003594] text-white font-semibold px-6 rounded-xl shadow-lg shadow-blue-500/20"
            >
              <Link href="https://cal.com/arqai/discovery" target="_blank" rel="noopener noreferrer">
                Book Demo
              </Link>
            </Button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-white border-l border-gray-200 px-6 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <Image
                    src="/assets/images/arqai-logo.svg"
                    alt="ArqAI"
                    width={120}
                    height={36}
                    className="h-9 w-auto"
                  />
                </Link>
                <button
                  type="button"
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Product</p>
                  {navigation.product.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-gray-900 hover:text-[#0047BA] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Solutions</p>
                  {navigation.solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-gray-900 hover:text-[#0047BA] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Company</p>
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-gray-900 hover:text-[#0047BA] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-6">
                  <Button className="w-full bg-[#0047BA] hover:bg-[#003594] text-white font-semibold rounded-xl" asChild>
                    <Link
                      href="https://cal.com/arqai/discovery"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Book Demo
                    </Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
