'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { navLinks } from '@/constants/data';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '@/hooks/useThemes';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-shadow duration-300 ${
        isScrolled ? 'shadow-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg' : 'bg-transparent'
      }`}
    >
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" passHref>
          <motion.span
            className="font-semibold text-2xl dark:text-white bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent cursor-pointer"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <span style={{ fontFamily: 'var(--font-great-vibes)' }}>Alok Kumar</span>
          </motion.span>
        </Link>

        {/* Desktop NavLinks */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul className="flex bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg py-1 rounded-full shadow-md">
            {navLinks.map((link) => (
              <li key={link.label}>
                <Link href={link.href}>
                  <motion.span
                    className="flex items-center gap-2 px-4 py-2 rounded-full border border-transparent text-gray-700 dark:text-gray-200 hover:bg-white/40 dark:hover:bg-blue-900/40 transition cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {link.icon && <span className="text-lg">{link.icon}</span>}
                    <span>{link.label}</span>
                  </motion.span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Dark Mode Toggle */}
        <div className="hidden md:flex items-center space-x-4">
          <ThemeToggle />
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2"
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            ) : (
              <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200" />
            )}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="md:hidden bg-white dark:bg-gray-900/95 shadow-md overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-hidden={!isMenuOpen}
          >
            <ul className="flex flex-col px-6 py-4 space-y-4">
              {navLinks.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <motion.span
                      className="flex gap-4 px-4 py-2.5 border rounded-md border-transparent text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer"
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
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="w-full flex items-center gap-4 px-4 py-2 border rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  whileHover={{ scale: 1.02 }}
                >
                  {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {isDarkMode ? 'Light Mode' : 'Dark Mode'}
                </motion.button>
              </li>
              <li>
                <a
                  href="/ALOK_KUMAR_RESUME.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center gap-4 px-4 py-2 border rounded-md bg-gradient-to-r from-blue-600 to-blue-800 text-white hover:shadow-md transition"
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
