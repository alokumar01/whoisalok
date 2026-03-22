"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, ExternalLink, Github } from 'lucide-react';
import { projectsData } from '../constants/data.js';

const Project = () => {
  const featuredProjects = projectsData.slice(0, 2);

  return (
    <section className="section-shell" style={{ fontFamily: 'var(--font-geist)' }}>
      <div className="section-inner">
        <motion.div
          className="mb-12 space-y-4 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <p className="section-kicker">Selected Work</p>
          <h2 className="section-title">Projects</h2>
          <p className="section-copy mx-auto max-w-2xl">
            A few projects that reflect how I approach full-stack product development, backend systems, and clean user-facing experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15, duration: 0.45 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <div className="group surface-card surface-card-hover overflow-hidden">
                <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(320px,0.95fr)]">
                  {project.image && (
                    <div className="relative min-h-[260px] overflow-hidden lg:min-h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={900}
                        height={720}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  <div className="flex flex-col justify-between p-6 sm:p-8">
                    <div className="space-y-5">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="tag-chip">Featured Project</span>
                        <span className="text-sm text-slate-500 dark:text-slate-400">{project.tech.slice(0, 3).join(' • ')}</span>
                      </div>

                      <div className="space-y-3">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                        <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                          {project.description}
                        </p>
                      </div>

                      <div className="space-y-3">
                        <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                          Key Highlights
                        </h4>
                        <ul className="space-y-3">
                          {project.highlights.map((highlight) => (
                            <li key={highlight} className="flex items-start gap-3 text-sm leading-6 text-slate-700 dark:text-slate-300">
                              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-sky-500 dark:bg-sky-400" />
                              <span>{highlight}</span>
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
                    </div>

                    <div className="mt-8 flex flex-wrap gap-3">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="primary-button"
                      >
                        Live Demo
                        <ExternalLink className="h-4 w-4" />
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="secondary-button"
                      >
                        GitHub
                        <Github className="h-4 w-4" />
                      </a>
                      <Link href="/projects" className="secondary-button">
                        View Details
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/projects" className="secondary-button">
            View All Projects
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Project;
