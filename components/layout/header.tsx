'use client';

import React, { useState } from 'react';
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
  resources: [
    { name: 'Blog', href: '/blog', description: 'Latest insights', comingSoon: true },
  ],
  company: [
    { name: 'About', href: '/about', description: 'Our story and team' },
    { name: 'Investors', href: '/investors', description: 'Partner with us' },
    { name: 'Careers', href: '/careers', description: 'Join our team', comingSoon: true },
  ],
};

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <nav className="container mx-auto px-6 lg:px-8" aria-label="Global">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
              <div className="w-8 h-8 bg-[#0A2463] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold text-[#0A2463]">ArqAI</span>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Menu className="h-6 w-6" aria-hidden="true" />
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
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0A2463] transition-colors">
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
                    <div className="w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                      {navigation.product.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors"
                        >
                          <span className="block text-sm font-medium text-gray-900">{item.name}</span>
                          <span className="block text-xs text-gray-500">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown('resources')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0A2463] transition-colors">
                Resources
                <ChevronDown className={cn(
                  'h-4 w-4 transition-transform',
                  activeDropdown === 'resources' && 'rotate-180'
                )} />
              </button>
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 top-full pt-3"
                  >
                    <div className="w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                      {navigation.resources.map((item) => (
                        <Link
                          key={item.name}
                          href={item.comingSoon ? '#' : item.href}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors",
                            item.comingSoon && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span className="block text-sm font-medium text-gray-900">
                            {item.name}
                            {item.comingSoon && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
                          </span>
                          <span className="block text-xs text-gray-500">{item.description}</span>
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
              <button className="flex items-center gap-1 text-sm font-medium text-gray-700 hover:text-[#0A2463] transition-colors">
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
                    <div className="w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                      {navigation.company.map((item) => (
                        <Link
                          key={item.name}
                          href={item.comingSoon ? '#' : item.href}
                          className={cn(
                            "block rounded-lg px-3 py-2.5 hover:bg-gray-50 transition-colors",
                            item.comingSoon && "opacity-50 cursor-not-allowed"
                          )}
                        >
                          <span className="block text-sm font-medium text-gray-900">
                            {item.name}
                            {item.comingSoon && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
                          </span>
                          <span className="block text-xs text-gray-500">{item.description}</span>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop CTA buttons */}
          <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
            <Button variant="ghost" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
            <Button variant="default" asChild>
              <Link href="/#explore">Book Demo</Link>
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
              className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-8 h-8 bg-[#0A2463] rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-lg">A</span>
                  </div>
                  <span className="text-xl font-bold text-[#0A2463]">ArqAI</span>
                </Link>
                <button
                  type="button"
                  className="-m-2.5 rounded-md p-2.5 text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <X className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div className="mt-6 flow-root">
                <div className="-my-6 divide-y divide-gray-200">
                  <div className="space-y-2 py-6">
                    <div className="space-y-1">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Product</p>
                      {navigation.product.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                    <div className="space-y-1 pt-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">Company</p>
                      {navigation.company.map((item) => (
                        <Link
                          key={item.name}
                          href={item.comingSoon ? '#' : item.href}
                          className={cn(
                            "block rounded-lg px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-50",
                            item.comingSoon && "opacity-50"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                          {item.comingSoon && <span className="ml-2 text-xs text-gray-400">(Coming Soon)</span>}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="py-6 space-y-3">
                    <Button variant="outline" className="w-full" asChild>
                      <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href="/#explore" onClick={() => setMobileMenuOpen(false)}>Book Demo</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
