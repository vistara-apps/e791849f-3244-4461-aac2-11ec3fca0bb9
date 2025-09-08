import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RightCheck - Know Your Rights, Instantly',
  description: 'On-demand legal checklists and emergency rights alerts for common life situations.',
  openGraph: {
    title: 'RightCheck - Know Your Rights, Instantly',
    description: 'On-demand legal checklists and emergency rights alerts for common life situations.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
