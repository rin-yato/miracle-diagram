import { AppHeader } from '@/components/app-header';
import { ThemeProvider } from '@/components/theme/provider';
import { cn } from '@/lib/utils';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Miracle Diagram',
  description: 'A miraculous database diagram tool.',
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
      </body>
    </html>
  );
}
