import ProjectsPageClient from './ProjectsPageClient';
import { buildMetadata } from '@/lib/site';

export const metadata = buildMetadata({
  title: 'Projects',
  description:
    'Explore featured full-stack projects by Alok Kumar, including backend-focused builds, modern web applications, and detailed project case studies.',
  path: '/projects',
  keywords: ['Projects', 'Portfolio Projects', 'Full-Stack Projects', 'Backend Systems', 'Case Studies'],
});

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
