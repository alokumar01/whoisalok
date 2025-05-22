import { Space_Grotesk, Work_Sans } from 'next/font/google'
import "./styles/globals.css";


const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space',
})

const workSans = Work_Sans({
  subsets: ['latin'],
  variable: '--font-work',
})

export const metadata = {
  title: 'Alok | Portfolio',
  description: 'Developer & Creative Portfolio',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${workSans.variable}`}
      >
        {children}
      </body>
    </html>
  );
}
