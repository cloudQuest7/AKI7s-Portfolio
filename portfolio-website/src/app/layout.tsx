// app/layout.tsx
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import NavBar from '@/components/NavBar';
import GalacticBackground from '@/components/GalacticBackground';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Anjali Jayakumar | Game & Web Developer',
  description: 'Portfolio of Anjali Jayakumar - Game Developer, Web Developer, and Coder',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#0d1117] text-gray-100 min-h-screen relative`}>
        {/* Galactic background with higher z-index than -10 */}
        <GalacticBackground />
        <NavBar />
        <main className="pt-16 min-h-screen relative z-10">
          {children}
        </main>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}