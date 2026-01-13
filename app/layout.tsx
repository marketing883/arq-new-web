import type { Metadata } from 'next';
import './globals.css';
import { ChatProvider } from '@/components/chat/chat-provider';
import { ChatInterface } from '@/components/chat/chat-interface';
import { Header } from '@/components/layout/header';

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
      <body className="font-sans antialiased bg-gray-50">
        <ChatProvider>
          <Header />
          <main className="min-h-screen">
            {children}
          </main>
          <ChatInterface />
        </ChatProvider>
      </body>
    </html>
  );
}
