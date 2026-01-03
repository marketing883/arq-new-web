'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = {
  product: [
    { name: 'Platform', href: '/platform', description: 'AI governance infrastructure' },
    { name: 'Security', href: '/security', description: 'Enterprise-grade security' },
  ],
  company: [
    { name: 'About', href: '/about', description: 'Our story and team' },
    { name: 'Investors', href: '/investors', description: 'Partner with us' },
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
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
      scrolled
        ? "bg-[#0a0a0f]/90 backdrop-blur-xl border-b border-[#1a1a24]"
        : "bg-transparent"
    )}>
      <nav className="container mx-auto px-6 lg:px-8" aria-label="Global">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-[#00ff88] flex items-center justify-center group-hover:shadow-lg group-hover:shadow-[#00ff88]/20 transition-all">
                <span className="font-bold text-xl text-[#0a0a0f]">A</span>
              </div>
              <span className="text-2xl font-bold text-white">ArqAI</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="text-white p-2"
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
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">
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
                    <div className="w-64 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] p-3 shadow-2xl">
                      {navigation.product.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 hover:bg-[#1a1a24] transition-colors"
                        >
                          <span className="block text-sm font-semibold text-white">{item.name}</span>
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
              <button className="flex items-center gap-1 text-sm font-medium text-gray-300 hover:text-white transition-colors py-2">
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
                    <div className="w-64 rounded-2xl bg-[#0d0d12] border border-[#1a1a24] p-3 shadow-2xl">
                      {navigation.company.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-xl px-4 py-3 hover:bg-[#1a1a24] transition-colors"
                        >
                          <span className="block text-sm font-semibold text-white">{item.name}</span>
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
              variant="ghost"
              asChild
              className="text-gray-300 hover:text-white hover:bg-white/5"
            >
              <Link href="/contact">Contact</Link>
            </Button>
            <Button
              asChild
              className="bg-[#00ff88] hover:bg-[#00cc6a] text-black font-semibold px-6 rounded-xl shadow-lg shadow-[#00ff88]/20"
            >
              <Link href="/#functions">Book Demo</Link>
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
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto bg-[#0a0a0f] border-l border-[#1a1a24] px-6 py-6 lg:hidden"
            >
              <div className="flex items-center justify-between mb-8">
                <Link href="/" className="flex items-center gap-3" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-10 h-10 rounded-xl bg-[#00ff88] flex items-center justify-center">
                    <span className="font-bold text-xl text-[#0a0a0f]">A</span>
                  </div>
                  <span className="text-2xl font-bold text-white">ArqAI</span>
                </Link>
                <button
                  type="button"
                  className="text-gray-400 hover:text-white"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Product</p>
                  {navigation.product.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-white hover:text-[#00ff88] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">Company</p>
                  {navigation.company.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block py-3 text-lg font-medium text-white hover:text-[#00ff88] transition-colors"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="pt-6 space-y-3">
                  <Button variant="outline" className="w-full border-[#1a1a24] text-white rounded-xl" asChild>
                    <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                  </Button>
                  <Button className="w-full bg-[#00ff88] hover:bg-[#00cc6a] text-black font-semibold rounded-xl" asChild>
                    <Link href="/#functions" onClick={() => setMobileMenuOpen(false)}>Book Demo</Link>
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
