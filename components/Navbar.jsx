'use client';

import React, { useState } from 'react'
import { navLinks } from '@/constants/data'
import { ToggleRightIcon } from 'lucide-react'
import { MenuIcon, X } from 'lucide-react'
import { motion } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 w-full">
      <nav
        className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
        aria-label="Main navigation"
      >
        {/* Logo */}
        <motion.a
          href="/"
          className="font-semibold text-lg text-gray-900 dark:text-white "
          // initial={{ x: -30, opacity: 0 }}
          // animate={{ x: 0, opacity: 1 }}
          // transition={{ duration: 0.5 }}
        >
          <span className='text-2xl' style={ {fontFamily: 'var(--font-great-vibes)'}}>Alok Kumar</span> 
        </motion.a>

        {/* Desktop NavLinks centered with frosted glass */}
        <div className="hidden md:flex flex-1 justify-center">
          <ul
            className="flex  bg-white/20 dark:bg-gray-800/40 backdrop-blur-lg
                       py-1 rounded-full shadow-md"
          >
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="
                    flex items-center gap-2 px-4 py-2 rounded-full border border-transparent
                    text-gray-700 dark:text-gray-200 hover:bg-white/40  
                    dark:hover:bg-blue-900 
                    transition
                  "
                >
                  {link.icon && <span className="text-lg">{link.icon}</span>}
                  <span>{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

      {/* dark mode */}
        <div className="hidden md:flex">
              <button
                className="p-2 text-gray-700 dark:text-gray-200 border rounded-full hover:bg-gray-100/20 dark:hover:bg-gray-800 transition"
                aria-label="Toggle dark mode"
              >
                Resume
              </button>
        </div>

        {/* Mobile hamburger and logo */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-label="Toggle menu"
            className="p-2 rounded-md focus:outline-none focus:ring-2 "
           >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-800 dark:text-gray-200 transition-transform" />
            ) : (
              <MenuIcon className="w-6 h-6 text-gray-800 dark:text-gray-200 transition-transform" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden bg-white shadow-md overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-1 opacity-0'
        }`}
        aria-hidden={!isMenuOpen}
        >
        <ul className="flex flex-col px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="flex gap-4 px- py-2.5 border rounded-md border-transparent text-gray-700 hover:bg-gray-100 hover:border-gray-300 transition"
                onClick={() => setIsMenuOpen(false)}
              >
                {<span className="">{link.icon}</span>}
                {link.label}
              </a>
            </li>
          ))}

          {/* Placeholder for Dark mode toggle later */}
          <li>
            <button className="w-full px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100 transition">
              Dark Mode Toggle
            </button>
          </li>

        </ul>
      </div>
    </header>
  )
}

export default Navbar
