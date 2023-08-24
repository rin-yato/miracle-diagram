import { AppHeader } from '@/components/app-header';
import { ThemeProvider } from '@/components/theme/provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Miracle Diagram',
  description:
    'A miraculous tool for designing database diagram. Just code it!',
  creator: 'RinYato',
  authors: {
    name: 'RinYato',
    url: 'https://rinyato.com',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://miracle-diagram.vercel.app',
    title: 'Miracle Diagram',
    siteName: 'Miracle Diagram',
    description:
      'A miraculous tool for designing database diagram. Just code it!',
    images: '/og-dark.png',
    emails: 'chearithorn@gmail.com',
  },
  twitter: {
    site: 'Miracle Diagram',
    siteId: 'https://miracle-diagram.vercel.apps',
    title: 'Miracle Diagram',
    card: 'summary_large_image',
    creator: 'RinYato',
    creatorId: '@chearithorn',
    description:
      'A miraculous tool for designing database diagram. Just code it!',
    images: '/og-dark.png',
  },
  category: 'Software',
  viewport: 'width=device-width, initial-scale=1.0',
  keywords: [
    'miracle',
    'diagram',
    'database',
    'design',
    'tool',
    'miracle diagram',
    'miracle-diagram',
    'database design',
    'dbd',
    'database diagram',
    'design tool',
    'design database with code',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          'h-screen max-h-screen overflow-hidden flex flex-col antialiased',
        )}
      >
        <ThemeProvider attribute="class" enableSystem>
          <AppHeader />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
