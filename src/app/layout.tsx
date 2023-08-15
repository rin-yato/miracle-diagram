import { ThemeProvider } from '@/components/theme/provider';
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
      <body className={inter.className}>
        <ThemeProvider attribute="class" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
