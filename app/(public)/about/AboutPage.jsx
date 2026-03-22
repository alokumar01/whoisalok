'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Award, BookOpen, Code, Layers } from 'lucide-react';
import { aboutData } from '@/constants/data';
import { ShimmerBorder } from '@/components/ui/shimmer-border';

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

const SectionBlock = ({ icon, eyebrow, title, children }) => (
  <motion.section
    className="space-y-6"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
  >
    <div className="space-y-3">
      <div className="flex items-center gap-3 text-sm font-medium uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">
        {icon}
        <span>{eyebrow}</span>
      </div>
      <h2 className="text-2xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
        {title}
      </h2>
    </div>
    {children}
  </motion.section>
);

export default function About() {
  const { bio, focusAreas, education, skills, achievements, certifications } = aboutData;

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
          className="space-y-8"
        >
          <ShimmerBorder contentClassName="surface-panel overflow-hidden p-8 sm:p-10">
            <div className="grid gap-8 lg:grid-cols-[220px_minmax(0,1fr)] lg:items-center">
              <div className="flex justify-center lg:justify-start">
                <Image
                  src={bio.photo}
                  alt={bio.name}
                  width={320}
                  height={320}
                  priority
                  className="h-44 w-44 rounded-3xl object-cover ring-1 ring-slate-200 dark:ring-white/10 sm:h-52 sm:w-52"
                />
              </div>

              <div className="space-y-5 text-center lg:text-left">
                <div className="space-y-3">
                  <p className="section-kicker">About</p>
                  <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
                    {bio.name}
                  </h1>
                  <p className="text-lg font-medium text-slate-700 dark:text-slate-200 sm:text-xl">
                    {bio.tagline}
                  </p>
                </div>

                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  {bio.description}
                </p>

                <div className="flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
                  {bio.ctas.map((cta) => (
                    <Link
                      key={cta.href}
                      href={cta.href}
                      className={cta.primary ? 'primary-button' : 'secondary-button'}
                    >
                      {cta.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </ShimmerBorder>
        </motion.section>

        <SectionBlock
          icon={<Layers className="h-4 w-4" />}
          eyebrow="Focus Areas"
          title="How I approach engineering work"
        >
          <div className="grid gap-4 md:grid-cols-3">
            {focusAreas.map((item) => (
              <div key={item.title} className="surface-card surface-card-hover p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<BookOpen className="h-4 w-4" />}
          eyebrow="Education"
          title="Academic background"
        >
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={`${edu.degree}-${edu.duration}`} className="surface-card p-6 sm:p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{edu.degree}</h3>
                    <p className="text-sm font-medium text-sky-700 dark:text-sky-300">{edu.institution}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{edu.level}</p>
                  </div>
                  <span className="tag-chip w-fit">{edu.duration}</span>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {edu.coursework.map((course) => (
                    <span key={course} className="tag-chip">
                      {course}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<Code className="h-4 w-4" />}
          eyebrow="Skills"
          title="Technologies I work with"
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className="surface-card surface-card-hover flex items-center justify-center px-4 py-4 text-center text-sm font-medium text-slate-700 dark:text-slate-200"
              >
                {skill}
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<Award className="h-4 w-4" />}
          eyebrow="Achievements"
          title="Experience and milestones"
        >
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((item) => (
              <div key={item.title} className="surface-card p-6">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </div>
            ))}
          </div>
        </SectionBlock>

        <SectionBlock
          icon={<Award className="h-4 w-4" />}
          eyebrow="Certifications"
          title="Courses and credentials"
        >
          <div className="space-y-4">
            {certifications.map((item) => (
              <div
                key={item.title}
                className="surface-card surface-card-hover flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-300">
                    {item.issuer} • {item.year}
                  </p>
                </div>

                <Link
                  href={item.link}
                  target="_blank"
                  className="secondary-button w-fit"
                >
                  View Credential
                </Link>
              </div>
            ))}
          </div>
        </SectionBlock>
      </div>
    </main>
  );
}
