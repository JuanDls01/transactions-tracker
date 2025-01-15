import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className='grid items-center justify-items-center min-h-screen p-2.5 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
          <header>This is the Header</header>
          <main>{children}</main>
          <footer className='flex gap-6 items-center justify-center'>Created with ❤️ by JuanDls01</footer>
        </div>
      </body>
    </html>
  );
}
