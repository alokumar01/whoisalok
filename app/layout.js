import { Space_Grotesk, Work_Sans, Geist, Great_Vibes } from 'next/font/google'
import "../styles/globals.css";
import CanvasCursor from '../components/CanvasCursor';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work',
})

const geist = Geist({
  weight: ['400', '600'],   // specify weights you want
  subsets: ['latin'],
  variable: '--font-geist',
})

const greatVibes = Great_Vibes({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-great-vibes',
});

export const metadata = {
  title: 'Alok | Portfolio',
  description: 'Developer & Creative Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body 
        className={`${spaceGrotesk.variable} ${workSans.variable} ${geist.variable} ${greatVibes.variable}`} 
      >
        <Navbar />
        <CanvasCursor />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
