
import { aboutData } from '@/constants/data';
import About from './AboutPage';

// Static generation
export const dynamic = 'force-static';

export function generateMetadata() {
  const { name, description, photo } = aboutData.bio;
  return {
    title: `${name} – Full-Stack Developer`,
    description,
    keywords: ['Alok Kumar', 'Full-Stack Developer', 'Portfolio', 'React', 'MERN', 'Next.js', 'JavaScript'],
    openGraph: {
      title: `${name} – Portfolio`,
      description,
      url: 'https://whoisalok.tech/about',
      type: 'profile',
      images: [{ url: `https://whoisalok.tech${photo}`, width: 1200, height: 630, alt: `${name} Profile` }],
    },  
  };
}

export default function Page() {
  return <About />
}