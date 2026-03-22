'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { navLinks } from '@/constants/data';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled
          ? 'border-slate-200/70 bg-white/75 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-[#050816]/75'
          : 'border-transparent bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
        aria-label="Main navigation"
      >
        <Link href="/" passHref>
          <motion.span
            className="cursor-pointer text-2xl font-semibold text-slate-900 dark:text-white"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.35 }}
          >
            <span style={{ fontFamily: 'var(--font-great-vibes)' }}>Alok Kumar</span>
          </motion.span>
        </Link>

        <div className="hidden flex-1 justify-center md:flex">
          <ul className="flex items-center gap-1 rounded-full border border-slate-200/70 bg-white/70 px-2 py-1 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-white/[0.04]">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  <motion.span
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-transparent px-4 py-2 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/[0.08]"
                    whileHover={{ y: -1 }}
                  >
                    {link.icon && <span className="text-base">{link.icon}</span>}
                    <span>{link.label}</span>
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/70 bg-white/70 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200 dark:hover:bg-white/[0.08]"
          >
            {mounted && resolvedTheme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="/ALOK_KUMAR_RESUME.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="primary-button px-4 py-2.5"
          >
            Resume
          </a>
        </div>

        <div className="flex items-center md:hidden">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="rounded-full border border-slate-200/70 bg-white/70 p-2 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-400 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </motion.button>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="overflow-hidden border-t border-slate-200/70 bg-white/90 shadow-md backdrop-blur-xl dark:border-white/10 dark:bg-[#050816]/95 md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-hidden={!isMenuOpen}
          >
            <ul className="flex flex-col space-y-3 px-6 py-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <motion.span
                      className="flex cursor-pointer gap-4 rounded-2xl border border-slate-200/70 px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.08]"
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ scale: 1.02 }}
                    >
                      {link.icon && <span className="text-lg">{link.icon}</span>}
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
              <li>
                <motion.button
                  onClick={toggleTheme}
                  className="flex w-full items-center gap-4 rounded-2xl border border-slate-200/70 px-4 py-3 text-slate-700 transition hover:bg-slate-100 dark:border-white/10 dark:text-slate-200 dark:hover:bg-white/[0.08]"
                  whileHover={{ scale: 1.02 }}
                >
                  {mounted && resolvedTheme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                  {mounted && resolvedTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
              </li>
              <li>
                <a
                  href="/ALOK_KUMAR_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="primary-button w-full justify-center rounded-2xl"
                >
                  View Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
