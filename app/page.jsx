import Hero from '@/components/Hero';
import Project from '@/components/Project';
import About from '@/components/About';
import BlogPost from '@/components/BlogPost';
import NewsletterForm from '@/components/NewsletterForm';
import Contact from '@/components/Contact';
import { buildMetadata, siteConfig } from '@/lib/site';

export const metadata = buildMetadata({
  title: siteConfig.title,
  description: siteConfig.description,
  path: '/',
  keywords: ['Portfolio', 'Full-Stack Developer', 'Backend Systems', 'Next.js'],
  absoluteTitle: true,
});

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: siteConfig.name,
  url: siteConfig.url,
  image: `${siteConfig.url}/og-image.png`,
  jobTitle: 'Full-Stack Developer',
  description: siteConfig.description,
  sameAs: [siteConfig.socialLinks.github, siteConfig.socialLinks.linkedin],
  knowsAbout: ['Backend Systems', 'APIs', 'Next.js', 'Node.js', 'MongoDB', 'Web Applications'],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Hero />
      <Project />
      <About />
      <BlogPost />
      <NewsletterForm />
      <Contact />
    </>
  );
}
