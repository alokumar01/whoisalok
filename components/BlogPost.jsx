'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const blogs = [
  {
    title: 'Building Better Backend Workflows with Next.js',
    summary: 'Notes on structuring route handlers, data flow, and project architecture for maintainable full-stack apps.',
    date: 'May 27, 2025',
    readTime: '3 min read',
    slug: '',
  },
  {
    title: 'Presenting Developer Projects with Clear Technical Storytelling',
    summary: 'A practical approach to writing about projects so the product value and engineering decisions are easy to understand.',
    date: 'May 20, 2025',
    readTime: '2 min read',
    slug: '',
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' },
  }),
};

const BlogPost = () => {
  return (
    <section className="section-shell" style={{ fontFamily: 'var(--font-geist)' }}>
      <div className="section-inner">
        <div className="mb-12 space-y-4 text-center">
          <p className="section-kicker">Writing</p>
          <h2 className="section-title">Latest Blog</h2>
          <p className="section-copy mx-auto max-w-2xl">
            Short reads on backend thinking, modern web development, and how I approach building dependable products.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {blogs.map((blog, i) => (
            <motion.div
              key={blog.title}
              className="surface-card surface-card-hover p-6 sm:p-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              custom={i}
              variants={fadeUp}
            >
              <div className="flex h-full flex-col justify-between gap-6">
                <div className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
                    <span className="tag-chip">{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white sm:text-2xl">
                      {blog.title}
                    </h3>
                    <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                      {blog.summary}
                    </p>
                  </div>
                </div>

                <Link
                  href={blog.slug ? `/blog/${blog.slug}` : '/blog'}
                  className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
                >
                  Read Article
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/blog" className="secondary-button">
            View All Posts
            <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogPost;
