'use client';
import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRightCircle } from 'lucide-react';

const blogs = [
  {
    title: 'Intro About Getting Started with Next.js',
    summary: 'A beginner-friendly guide to build fast, scalable apps using Next.js.',
    date: 'May 27, 2025',
    readTime: '3 min read',
    slug: ''
  },
  {
    title: 'Why Tailwind CSS Rocks and Better than other',
    summary: 'Discover why Tailwind CSS is a favorite utility-first framework.',
    date: 'May 20, 2025',
    readTime: '2 min read',
    slug: ' '
  }
];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6, ease: 'easeOut' }
  })
};

const BlogPost = () => {
  return (
    <section 
  className="max-w-5xl mx-auto px-6 md:px-1 py-20 dark:text-white"
  style={{ fontFamily: 'var(--font-geist)' }}
>
  <div className="text-center mb-12">
    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
      Latest Blog
    </h2>
    <div className="mt-3 flex justify-center">
      <hr className="w-20 border-2 border-indigo-500 rounded" />
    </div>
  </div>

  <div className="grid md:grid-cols-2 gap-10">
    {blogs.map((blog, i) => (
      <motion.div
        key={i}
        className="border-1  rounded-xl shadow-md p-6 transition-all dark:shadow-xl shadow-indigo-900/10 hover:text-indigo-400 dark:hover:text-indigo-300"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        custom={i}
        variants={fadeUp}
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-1 dark:text-white">
          {blog.title}
        </h3>
        <p className="text-sm text-indigo-500 mb-2 dark:text-blue-200">
          {blog.date} • {blog.readTime}
        </p>
        <p className="text-gray-700 mb-4 dark:text-gray-400">
          {blog.summary}
        </p>
        <Link
          href={`/blog/${blog.slug}`}
          className="text-indigo-600 hover:underline font-medium"
        >
          Read More →
        </Link>
      </motion.div>
    ))}
  </div>

  <motion.div
    className="mt-10 flex justify-center"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    transition={{ delay: 0.4, duration: 0.6 }}
    viewport={{ once: true }}
  >
    <Link href="/blog">
      <button className="bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-8 py-3 rounded-full flex items-center gap-2 transition-all shadow-md cursor-pointer">
        View All Posts <ArrowRightCircle size={20} />
      </button>
    </Link>
  </motion.div>
</section>

  );
};

export default BlogPost;
