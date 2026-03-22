import ContactPageClient from './ContactPageClient';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Contact Alok Kumar for project collaborations, backend-focused full-stack work, internships, or technical discussions.',
  path: '/contact',
  keywords: ['Contact Alok Kumar', 'Hire Full-Stack Developer', 'Backend Developer Contact', 'Portfolio Contact'],
});

export default function ContactPage() {
  return <ContactPageClient />;
}
