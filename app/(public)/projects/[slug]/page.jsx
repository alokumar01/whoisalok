import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Globe, Github, ArrowLeft, Wrench, Users, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { projectsMain } from '@/constants/data';
import { ShimmerBorder } from '@/components/ui/shimmer-border';
import { buildMetadata, getOgImage } from '@/lib/site';

export async function generateStaticParams() {
  return projectsMain.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const project = projectsMain.find((item) => item.slug === params.slug);

  if (!project) {
    return buildMetadata({
      title: 'Projects',
      description: 'Explore full-stack project case studies by Alok Kumar.',
      path: '/projects',
    });
  }

  return buildMetadata({
    title: project.name,
    description: project.description,
    path: `/projects/${project.slug}`,
    keywords: [project.name, ...project.tech, project.category],
    type: 'article',
    images: [getOgImage()],
  });
}

const DetailSection = ({ eyebrow, title, children }) => (
  <section className="space-y-4">
    <div className="space-y-2">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h2>
    </div>
    {children}
  </section>
);

export default function ProjectPage({ params }) {
  const project = projectsMain.find((item) => item.slug === params.slug);

  if (!project) return notFound();

  const coverImage = Array.isArray(project.images) ? project.images[0] : project.images;

  return (
    <main
      className="px-6 py-16 pt-28 text-slate-900 dark:text-slate-100 sm:pt-32"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link href="/projects" className="secondary-button">
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>
        </div>

        <ShimmerBorder contentClassName="surface-card overflow-hidden">
          <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(340px,0.9fr)]">
            <div className="relative min-h-[280px] overflow-hidden">
              <Image
                src={coverImage}
                alt={project.name}
                width={1400}
                height={900}
                priority
                className="h-full w-full object-cover"
              />
            </div>

            <div className="space-y-6 p-6 sm:p-8">
              <div className="space-y-3">
                <p className="section-kicker">Project Detail</p>
                <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  {project.name}
                </h1>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {project.description}
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <Badge variant="outline" className="flex items-center gap-1 border-slate-200 bg-white/60 px-3 py-1 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                  <Users size={14} /> {project.type}
                </Badge>
                <Badge
                  variant="secondary"
                  className={`flex items-center gap-1 px-3 py-1 ${
                    project.status === 'Completed'
                      ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                      : 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                  }`}
                >
                  <Wrench size={14} /> {project.status}
                </Badge>
                <Badge variant="outline" className="border-slate-200 bg-white/60 px-3 py-1 text-slate-700 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200">
                  {project.category}
                </Badge>
              </div>

              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Key Highlights
                </h2>
                <ul className="space-y-3">
                  {project.keyHighlights.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-3">
                {project.liveLink && (
                  <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="primary-button">
                    Live Demo
                    <Globe className="h-4 w-4" />
                  </a>
                )}
                {project.githubLink && (
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="secondary-button">
                    GitHub
                    <Github className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </ShimmerBorder>

        <div className="grid gap-10 lg:grid-cols-2">
          <DetailSection eyebrow="Overview" title="Problem">
            <div className="surface-card p-6">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {project.problem}
              </p>
            </div>
          </DetailSection>

          <DetailSection eyebrow="Approach" title="Solution">
            <div className="surface-card p-6">
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                {project.solution}
              </p>
            </div>
          </DetailSection>
        </div>

        <DetailSection eyebrow="Stack" title="Tech Stack">
          <div className="surface-card p-6">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="tag-chip">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </DetailSection>

        <div className="grid gap-10 lg:grid-cols-2">
          <DetailSection eyebrow="Build" title="Key Features">
            <div className="surface-card p-6">
              <ul className="space-y-3">
                {project.keyFeatures.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <FileText className="mt-0.5 h-4 w-4 text-sky-600 dark:text-sky-300" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </DetailSection>

          <DetailSection eyebrow="Reflection" title="Learnings">
            <div className="surface-card p-6">
              <ul className="space-y-3">
                {project.learnings.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </DetailSection>
        </div>
      </div>
    </main>
  );
}
