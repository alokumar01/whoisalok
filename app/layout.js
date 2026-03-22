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
import { getOgImage, siteConfig } from '@/lib/site';

const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-space' });
const workSans = Work_Sans({ subsets: ['latin'], variable: '--font-work' });
const geist = Geist({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-geist' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes' });

export const metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: '%s | Alok Kumar',
  },
  description: siteConfig.description,
  keywords: siteConfig.keywords,
  authors: siteConfig.authors,
  creator: siteConfig.creator,
  applicationName: siteConfig.siteName,
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.siteName,
    locale: siteConfig.locale,
    type: 'website',
    images: [getOgImage()],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [new URL(siteConfig.ogImage, siteConfig.url).toString()],
    creator: siteConfig.creator,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning
      className={`${spaceGrotesk.variable} ${workSans.variable} ${geist.variable} ${greatVibes.variable}`}>
      <body className="bg-transparent antialiased text-slate-900 dark:text-slate-100">
        <Toaster richColors position="top-right" />
        <div className="flex flex-col min-h-screen">
          <ThemeProviderClient>
            <ConditionalUI>
              <Welcome />
              <Navbar />
              <CanvasCursor />
            </ConditionalUI>

            <main className="flex-grow overflow-x-hidden">{children}</main>

            <ConditionalUI>
              <Footer />
            </ConditionalUI>
            
          </ThemeProviderClient>
        </div>
      </body>
    </html>
  );
}
