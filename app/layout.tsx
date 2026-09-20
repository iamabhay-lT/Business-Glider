import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';

const plusJakartaSans = Plus_Jakarta_Sans({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Business Glider',
  description: 'Move Your Career. Grow Your Business.',
  openGraph: {
    title: 'Business Glider',
    description: 'Move Your Career. Grow Your Business.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Business Glider',
    description: 'Move Your Career. Grow Your Business.',
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${plusJakartaSans.className} antialiased text-white bg-black`} suppressHydrationWarning>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
