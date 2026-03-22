'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Globe, Github, FileText, Wrench, Users } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { projectsMain } from '@/constants/data';
import { ShimmerBorder } from '@/components/ui/shimmer-border';

const fadeUp = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const ProjectMeta = ({ project }) => (
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
);

const ProjectActions = ({ project }) => (
  <div className="flex flex-wrap gap-3">
    {project.liveLink && (
      <a
        href={project.liveLink}
        target="_blank"
        rel="noopener noreferrer"
        className="primary-button"
      >
        Live Demo
        <Globe className="h-4 w-4" />
      </a>
    )}
    {project.githubLink && (
      <a
        href={project.githubLink}
        target="_blank"
        rel="noopener noreferrer"
        className="secondary-button"
      >
        GitHub
        <Github className="h-4 w-4" />
      </a>
    )}
    {project.slug && (
      <Link href={`/projects/${project.slug}`} className="secondary-button">
        Case Study
        <FileText className="h-4 w-4" />
      </Link>
    )}
  </div>
);

const FeaturedProjectCard = ({ project, index }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={fadeUp}
    transition={{ delay: index * 0.08 }}
  >
    <ShimmerBorder contentClassName="surface-card overflow-hidden">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(360px,0.95fr)]">
        <div className="relative min-h-[260px] overflow-hidden">
          <Image
            src={Array.isArray(project.images) ? project.images[0] : project.images}
            alt={project.name}
            width={1200}
            height={800}
            className="h-full w-full object-cover"
            priority={index === 0}
          />
        </div>

        <div className="space-y-6 p-6 sm:p-8">
          <div className="space-y-3">
            <p className="section-kicker">Featured Project</p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              {project.name}
            </h2>
            <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              {project.description}
            </p>
          </div>

          <ProjectMeta project={project} />

          <div className="space-y-3">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
              Key Highlights
            </h3>
            <ul className="space-y-3">
              {project.keyHighlights.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <span key={tech} className="tag-chip">
                {tech}
              </span>
            ))}
          </div>

          <ProjectActions project={project} />
        </div>
      </div>
    </ShimmerBorder>
  </motion.div>
);

const OtherProjectCard = ({ project }) => (
  <motion.div
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.15 }}
    variants={fadeUp}
    className="surface-card surface-card-hover flex h-full flex-col overflow-hidden"
  >
    <div className="relative h-48 overflow-hidden">
      <Image
        src={Array.isArray(project.images) ? project.images[0] : project.images}
        alt={project.name}
        width={900}
        height={600}
        className="h-full w-full object-cover"
      />
    </div>

    <div className="flex h-full flex-col gap-5 p-6">
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">{project.name}</h3>
        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{project.description}</p>
      </div>

      <ProjectMeta project={project} />

      <div className="space-y-3">
        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
          Key Highlights
        </h4>
        <ul className="space-y-2">
          {project.keyHighlights.slice(0, 3).map((item) => (
            <li key={item} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {project.tech.slice(0, 4).map((tech) => (
          <span key={tech} className="tag-chip">
            {tech}
          </span>
        ))}
      </div>

      <ProjectActions project={project} />
    </div>
  </motion.div>
);

export default function ProjectsPageClient() {
  const featuredProjects = projectsMain.filter((project) => project.featured).slice(0, 2);
  const otherProjects = projectsMain.filter((project) => !project.featured || !featuredProjects.includes(project));

  return (
    <main
      className="px-6 py-16 pt-28 text-slate-900 dark:text-slate-100 sm:pt-32"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <motion.section
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="space-y-4 text-center"
        >
          <p className="section-kicker">Projects</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Selected full-stack work
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            A structured view of the projects I’ve built, with emphasis on backend thinking, product flow, and the engineering decisions behind each build.
          </p>
        </motion.section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="section-kicker">Featured Projects</p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Detailed case studies
            </h2>
          </div>

          <div className="space-y-8">
            {featuredProjects.map((project, index) => (
              <FeaturedProjectCard key={project.slug} project={project} index={index} />
            ))}
          </div>
        </section>

        <section className="space-y-6">
          <div className="space-y-2">
            <p className="section-kicker">Other Projects</p>
            <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
              Additional builds
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {otherProjects.map((project) => (
              <OtherProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
