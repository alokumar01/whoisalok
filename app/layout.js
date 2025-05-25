// app/layout.tsx or app/layout.js

import "../styles/globals.css";
import CanvasCursor from '../components/CanvasCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

import { Space_Grotesk, Work_Sans, Geist, Great_Vibes } from 'next/font/google';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
});

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work',
});

const geist = Geist({
  weight: ['400', '600'],
  subsets: ['latin'],
  variable: '--font-geist',
});

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
});

export const metadata = {
  title: 'Alok | Portfolio',
  description: 'Developer & Creative Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${workSans.variable} ${geist.variable} ${greatVibes.variable}`}>
      <body className="bg-gradient-to-br from-blue-100 via-white to-blue-50 antialiased text-black">
        <Navbar />
        <CanvasCursor />
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
