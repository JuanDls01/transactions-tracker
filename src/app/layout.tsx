import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import './globals.css';
import { Toaster } from '@/ui/toaster';
import { TooltipProvider } from '@/ui/tooltip';
import { cn } from '@/lib/utils';
import Header from '@/features/navigation/header';
import { ThemeProvider } from '@/providers/theme-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const inter = Inter({
  subsets: ['latin'], // Subconjunto para mejorar el rendimiento
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'], // Pesos disponibles
  variable: '--font-inter', // Definir una variable CSS opcional
});

export const metadata: Metadata = {
  title: 'TuChanchito',
  description: 'Aplicación para registrar y visualizar tus ingresos y gastos.',
  appleWebApp: {
    title: 'TuChanchito',
    capable: true,
    statusBarStyle: 'default',
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
      <head>
        <meta name="theme-color" content="#ffffff" />
        <meta name="theme-color" content="#0f172a" media="(prefers-color-scheme: dark)" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased min-h-screen bg-background`}
      >
        <ThemeProvider defaultTheme='system'>
          <TooltipProvider>
            <Header />
            <div className={cn('border-grid flex flex-1 flex-col', 'font-inter')}>{children}</div>
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
