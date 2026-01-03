import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Platform', href: '/platform' },
    { name: 'Security', href: '/security' },
  ],
  resources: [
    { name: 'Blog', href: '/blog', comingSoon: true },
    { name: 'Documentation', href: '/docs', comingSoon: true },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Investors', href: '/investors' },
    { name: 'Careers', href: '/careers', comingSoon: true },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#0A2463] text-white">
      <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Logo and tagline */}
          <div className="col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#A7FF83] rounded-lg flex items-center justify-center">
                <span className="text-[#0A2463] font-bold text-lg">A</span>
              </div>
              <span className="text-xl font-bold">ArqAI</span>
            </Link>
            <p className="text-sm text-gray-300 mb-6">
              Intelligence, By Design
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/arqai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#A7FF83] transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://twitter.com/arqai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#A7FF83] transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#A7FF83] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.comingSoon ? '#' : link.href}
                    className={`text-sm text-gray-300 hover:text-[#A7FF83] transition-colors ${
                      link.comingSoon ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {link.name}
                    {link.comingSoon && <span className="ml-1 text-xs">(Soon)</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.comingSoon ? '#' : link.href}
                    className={`text-sm text-gray-300 hover:text-[#A7FF83] transition-colors ${
                      link.comingSoon ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {link.name}
                    {link.comingSoon && <span className="ml-1 text-xs">(Soon)</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-300 hover:text-[#A7FF83] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} ArqAI. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-[#A7FF83]/10 text-[#A7FF83] text-xs rounded-full">
                <span className="w-2 h-2 bg-[#A7FF83] rounded-full animate-pulse"></span>
                GEC 2025 Winner
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
