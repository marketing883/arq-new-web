import React from 'react';
import Link from 'next/link';
import { Linkedin, Twitter } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Platform', href: '/platform' },
    { name: 'Security', href: '/security' },
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Investors', href: '/investors' },
    { name: 'Contact', href: '/contact' },
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#060609] border-t border-[#1a1a24]">
      <div className="container mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Logo and tagline */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[#00ff88] rounded-xl flex items-center justify-center">
                <span className="text-[#0a0a0f] font-bold text-xl">A</span>
              </div>
              <span className="text-2xl font-bold text-white">ArqAI</span>
            </Link>
            <p className="text-gray-500 mb-6">
              Intelligence, By Design
            </p>
            <div className="flex gap-4">
              <a
                href="https://linkedin.com/company/arqai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1a1a24] flex items-center justify-center text-gray-400 hover:text-[#00ff88] hover:bg-[#252530] transition-all"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/arqai"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-[#1a1a24] flex items-center justify-center text-gray-400 hover:text-[#00ff88] hover:bg-[#252530] transition-all"
              >
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-[#00ff88] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-[#00ff88] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-500 hover:text-[#00ff88] transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-16 pt-8 border-t border-[#1a1a24]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} ArqAI. All rights reserved.
            </p>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-[#00ff88]/10 border border-[#00ff88]/20 text-[#00ff88] text-sm rounded-full">
                <span className="w-2 h-2 bg-[#00ff88] rounded-full animate-pulse"></span>
                GEC 2025 Winner
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
