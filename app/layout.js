// app/layout.jsx
import '../styles/globals.css'
import CanvasCursor from '../components/CanvasCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Welcome from '@/components/Welcome';
import { Space_Grotesk, Work_Sans, Geist, Great_Vibes } from 'next/font/google';
import ThemeProviderClient from "@/components/ThemeProviderClient";
import { Toaster } from "@/components/ui/sonner";
import ConditionalUI from '@/components/ConditionalUI';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work' });
const geist = Geist({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-geist' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes' });

export const metadata = {
  title: 'Alok | Portfolio',
  description: 'Developer & Creative Portfolio',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${workSans.variable} ${geist.variable} ${greatVibes.variable}`}>
      <body className="bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950 antialiased text-black dark:text-white">
        <Toaster richColors position="top-right" />
        <div className="flex flex-col min-h-screen">
          <ThemeProviderClient>
            <ConditionalUI>
              <Welcome />
              <Navbar />
              <CanvasCursor />
            </ConditionalUI>

            <main className="flex-grow">{children}</main>

            <ConditionalUI>
              <Footer />
            </ConditionalUI>
            
          </ThemeProviderClient>
        </div>
      </body>
    </html>
  );
}
