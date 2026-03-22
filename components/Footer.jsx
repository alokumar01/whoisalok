'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-slate-200/70 px-6 py-8 text-slate-600 dark:border-white/10 dark:text-slate-300">
      <div
        className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 text-center font-medium md:flex-row md:text-left"
        style={{ fontFamily: 'var(--font-geist)' }}
      >
        <div className="text-sm">
          &copy; {new Date().getFullYear()} Alok Kumar. All rights reserved.
        </div>

        <div className="flex gap-5 text-lg">
          <a
            href="mailto:alokkumar012148@gmail.com"
            aria-label="Email"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 transition-colors duration-200 hover:text-sky-600 dark:border-white/10 dark:hover:text-sky-300"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/alokumar01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 transition-colors duration-200 hover:text-sky-600 dark:border-white/10 dark:hover:text-sky-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/alokumar01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/70 transition-colors duration-200 hover:text-sky-600 dark:border-white/10 dark:hover:text-sky-300"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
