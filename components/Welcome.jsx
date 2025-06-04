'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Great_Vibes, Inter } from 'next/font/google';
import { useTheme } from 'next-themes';

const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400' });
const inter = Inter({ subsets: ['latin'], weight: ['400', '700'] });

export default function Welcome({ fullName = 'Alok Kumar', quote = 'Turning imagination into innovation.' }) {
  const [showLoader, setShowLoader] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowLoader(true);
      sessionStorage.setItem('hasVisited', 'true');
    }
  }, []);

  useEffect(() => {
    if (showLoader) {
      const timer = setTimeout(() => setShowLoader(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [showLoader]);

  const handleSkip = () => setShowLoader(false);

  return (
    <AnimatePresence>
      {showLoader && (
        <motion.div
          onClick={handleSkip}
          className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center transition-colors duration-500
            ${theme === 'dark'
              ? 'bg-gradient-to-br from-[#0f172a] via-[#0a192f] to-[#112240] text-white'
              : 'bg-gradient-to-br from-[#e0f7fa] via-[#f1f5f9] to-[#e0f2f1] text-gray-900'}
          `}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        >
          {/* Background Glow */}
          <div className="absolute w-[400px] h-[400px] bg-teal-500/20 rounded-full blur-[160px] animate-fade-pulse" />

          {/* Progress Bar */}
          <motion.div
            className="absolute top-0 left-0 h-[4px] bg-teal-400"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ duration: 3.8, ease: 'easeInOut' }}
          />

          {/* Name */}
          <motion.h1
            className={`${greatVibes.className} text-[3rem] md:text-[4.5rem] text-teal-400 drop-shadow-md`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 1.3, ease: 'easeOut' }}
          >
            {fullName}
          </motion.h1>

          {/* Divider */}
          <motion.div
            className="h-[2px] w-24 bg-teal-300 mt-4 mb-4 opacity-30"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.6, ease: 'easeInOut', delay: 0.4 }}
          />

          {/* Quote */}
          <motion.p
            className={`${inter.className} text-center text-sm md:text-base font-light tracking-wide px-4 max-w-xl`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 1, delay: 1.3 }}
          >
            {quote}
          </motion.p>

          {/* Hint to skip */}
          <motion.span
            className="mt-8 text-xs text-teal-200/60 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.2 }}
          >
            Tap anywhere to continue →
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
