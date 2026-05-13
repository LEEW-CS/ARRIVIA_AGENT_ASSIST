import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Arrivia Agent Assist',
  description:
    'Conceptual demo of the Arrivia agent console, Symphony AI talk track, recommended offers, and connector platform.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen bg-arrivia-cream-50 text-arrivia-slate-800 antialiased">
        {children}
        <Toaster
          position="bottom-right"
          theme="light"
          toastOptions={{
            classNames: {
              toast:
                'bg-white border border-arrivia-slate-200 shadow-lg text-arrivia-slate-800',
              title: 'text-sm font-medium text-arrivia-slate-900',
              description: 'text-xs text-arrivia-slate-500',
            },
          }}
        />
      </body>
    </html>
  );
}
