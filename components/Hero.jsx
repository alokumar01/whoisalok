'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, FileText } from 'lucide-react';

const Hero = () => {
  return (
    <section
      className="section-shell flex min-h-screen items-center pt-28 sm:pt-32 md:pt-36"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="section-inner">
        <motion.div
          className="surface-panel relative overflow-hidden p-8 sm:p-10 md:p-14"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

          <div className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(260px,0.75fr)] lg:items-end">
            <div className="space-y-6">
              <p className="section-kicker">Developer Portfolio</p>

              <div className="space-y-4">
                <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl md:text-6xl">
                  Alok Kumar
                </h1>
                <h2 className="max-w-3xl text-2xl font-medium leading-tight text-slate-800 dark:text-slate-100 sm:text-3xl md:text-4xl">
                  Full-Stack Developer focused on building scalable backend systems and modern web applications.
                </h2>
              </div>

              <p className="max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                I build dependable APIs, responsive interfaces, and clean product experiences with a strong focus on performance,
                maintainability, and practical engineering decisions.
              </p>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row">
                <Link href="/projects" className="primary-button">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="/ALOK_KUMAR_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="secondary-button"
                >
                  View Resume
                  <FileText className="h-4 w-4" />
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              {[
                { label: 'Backend Focus', value: 'APIs, data flow, and scalability' },
                { label: 'Core Stack', value: 'Next.js, Node.js, MongoDB' },
                { label: 'Approach', value: 'Clean systems with polished UI' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.04]"
                >
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm leading-6 text-slate-800 dark:text-slate-100">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
