'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';

const Hero = () => {
  return (
    <section
      className="h-screen w-full flex flex-col justify-center px-4 md:px-[6rem]   md:items-start  dark:from-blue-900 dark:via-gray-900 dark:to-blue-800"
      style={{
        className:"bg-gradient-to-br from-blue-100 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950",

        fontFamily: 'var(--font-geist)'
      }}

    >
      <motion.div
        className="flex flex-col items-center md:items-start space-y-6 relative z-10"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        {/* Intro Badge */}
        <motion.div
          className="bg-gradient-to-r from-indigo-100 to-blue-50 text-blue-800 dark:from-blue-900 dark:to-gray-900 dark:text-blue-300 font-semibold px-4 py-1 rounded-full text-sm sm:text-base shadow-md border border-blue-800/50"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Welcome to Alok's Portfolio
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          Hi, I'm Alok Kumar
        </motion.h1>

        {/* Subheading with Typing Effect */}
        <motion.h2
          className="text-[1.75rem] sm:text-3xl md:text-5xl font-bold text-indigo-700 dark:text-blue-400"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          I'm a{' '}
          <TypeAnimation
            sequence={['Web Developer', 2000, 'React Enthusiast', 2000, 'UI/UX Lover', 2000]}
            wrapper="span"
            speed={60}  
            repeat={Infinity}
            
            className="text-black dark:text-white"
          />
        </motion.h2>

        {/* Description */}
        <motion.p
          className=" sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl text-start px-7 md:p-px"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
        >
          I craft beautiful, fast, and responsive web interfaces using React.js and Tailwind CSS, with a passion for clean code and user-centric design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex space-x-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <a
            href="/Alok_Kumar_Resume.pdf"
            // download
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition duration-300"
          >
            Download Resume
          </a>
          {/* <a
            href="#contact"
            className="inline-block bg-transparent border-2 border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400 px-6 py-3 rounded-full hover:bg-blue-600 hover:text-white transition duration-300"
          >
            Contact Me
          </a> */}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;