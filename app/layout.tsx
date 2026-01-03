import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

export const metadata: Metadata = {
  title: 'ArqAI - The AI Agent Platform Enterprises Trust to Run in Production',
  description: 'Deploy governed AI agents in 30 days, not quarters. One control plane for all AI systems across any cloud, any model, any vertical.',
  keywords: ['AI governance', 'enterprise AI', 'AI agents', 'compliance', 'production AI'],
  authors: [{ name: 'ArqAI' }],
  openGraph: {
    title: 'ArqAI - Intelligence, By Design',
    description: 'The AI Agent Platform Enterprises Trust to Run in Production',
    url: 'https://thearq.ai',
    siteName: 'ArqAI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ArqAI - Intelligence, By Design',
    description: 'The AI Agent Platform Enterprises Trust to Run in Production',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-sans antialiased">
        <Header />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
