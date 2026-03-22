import { aboutData } from '@/constants/data';
import About from './AboutPage';
import { buildMetadata } from '@/lib/site';

// Static generation
export const dynamic = 'force-static';

export function generateMetadata() {
  const { description } = aboutData.bio;

  return buildMetadata({
    title: 'About',
    description,
    path: '/about',
    keywords: ['About Alok Kumar', 'Backend Developer', 'Full-Stack Developer', 'Computer Science Student'],
    type: 'profile',
  });
}

export default function Page() {
  return <About />
}
