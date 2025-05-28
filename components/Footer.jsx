'use client';

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className=" bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 px-6 py-6 mt-20">
      <div
        className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left font-medium"
        style={{ fontFamily: 'var(--font-geist)' }}
      >
        {/* Copyright */}
        <div className="text-sm px-10">
          &copy; {new Date().getFullYear()} Alok Kumar. All rights reserved.
        </div>

        {/* Social Icons */}
        <div className="flex gap-6 text-xl">
          <a
            href="mailto:alokkumar012148@gmail.com"
            aria-label="Email"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            <FaEnvelope />
          </a>
          <a
            href="https://github.com/alokumar01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/alokumar01"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-indigo-600 transition-colors duration-200"
          >
            <FaLinkedin />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
