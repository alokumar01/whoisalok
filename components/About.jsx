"use client";

import React from "react";
import Link from "next/link";
import { MoveRightIcon } from "lucide-react";
import { motion } from "framer-motion";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const stagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const focusAreas = [
  {
    title: "Backend Systems",
    description: "Designing scalable server-side flows, structured APIs, and data models that support reliable product growth.",
  },
  {
    title: "Full-Stack Delivery",
    description: "Connecting backend logic with responsive interfaces so the final product feels smooth, clear, and production-ready.",
  },
  {
    title: "Developer Mindset",
    description: "Prioritizing maintainable code, thoughtful architecture, and practical engineering choices over unnecessary complexity.",
  },
];

const About = () => {
  return (
    <motion.section
      className="section-shell"
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="section-inner">
        <motion.div className="mb-12 space-y-4 text-center" variants={fadeInUp}>
          <p className="section-kicker">About</p>
          <h2 className="section-title">Building products with stronger backend foundations</h2>
          <p className="section-copy mx-auto max-w-3xl">
            I enjoy creating full-stack applications that balance dependable backend architecture with clean, modern presentation on the frontend.
          </p>
        </motion.div>

        <motion.div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]" variants={stagger}>
          <motion.div className="surface-panel p-8 sm:p-10" variants={fadeInUp}>
            <div className="space-y-6">
              <p className="text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">
                I’m Alok Kumar, a full-stack developer focused on building reliable backend systems, maintainable APIs, and modern web applications that are easy to use and scale.
              </p>
              <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                My work usually starts with structuring the data flow, planning backend responsibilities, and making sure the product logic is stable before layering on a polished interface. I care about code clarity, thoughtful architecture, and building projects that feel production-ready instead of just visually complete.
              </p>
              <div className="flex justify-center md:justify-start">
                <Link href="/about" className="group secondary-button">
                  More About Me
                  <MoveRightIcon className="w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div className="surface-panel p-8" variants={fadeInUp}>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">
                  Focus Areas
                </p>
                <h3 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">
                  What I bring to projects
                </h3>
              </div>

              <div className="space-y-4">
                {focusAreas.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200/70 bg-slate-50/70 p-5 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <h4 className="text-base font-semibold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default About;
