import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import clsx from 'clsx';
import { Toaster } from '@/ui/elements/toaster';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'TuChanchito',
  description: 'Aplicación para registrar y visualizar tus ingresos y gastos.',
  appleWebApp: {
    title: 'TuChanchito',
    capable: true,
    statusBarStyle: 'black-translucent',
  },
};

export const viewport: Viewport = {
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`dark ${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div
          className={clsx(
            'border-grid flex flex-1 flex-col items-center min-h-screen',
            'font-[family-name:var(--font-geist-sans)]',
          )}
        >
          {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
