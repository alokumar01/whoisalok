"use client";
import React from "react";
import Link from "next/link";
import TerminalBox from "./TerminalBox";
import { MoveRightIcon } from "lucide-react";
import { motion } from "framer-motion";

// Animation settings
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

const About = () => {
  return (
    <motion.section
      className="max-w-6xl md:dark:max-w-5xl mx-auto px-6 md:px-20 py-20 dark:bg-gradient-to-br from-gray-900 via-gray-950 to-gray-800 rounded-lg "
      variants={stagger}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      {/* Section Title */}
      <motion.div className="text-center mb-12" variants={fadeInUp}>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          About Me
        </h2>
        <div className="mt-3 flex justify-center">
          <hr className="w-20 border-2 border-indigo-500 dark:border-indigo-400 rounded" />
        </div>
      </motion.div>

      {/* Content Grid */}  
      <motion.div className="grid md:grid-cols-2 gap-10 items-center" variants={stagger}>
        {/* Left Column - Text and Button */}
        <motion.div variants={fadeInUp}>
          <p className="text-gray-600 dark:text-gray-300 text-[20px] leading-loose mt-7 text-left px-2 mb-20">
            I’m Alok Kumar, a Full Stack Developer who builds fast and clean web apps
            using React, Next.js, and Tailwind CSS. I turn ideas into smooth user
            experiences.
          </p>


          {/* CTA Button */}
          <div className="flex justify-center md:justify-start">
            <Link
                href="/about"
                className="group inline-block bg-gradient-to-r from-indigo-600 to-indigo-800 text-white px-6 py-3 rounded-full hover:from-indigo-700 hover:to-indigo-900 transition-all duration-300 shadow-md"
              >
                <span className="flex items-center gap-2">
                  More About Me
                  <MoveRightIcon className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-5" />
                </span>
            </Link>
          </div>
        </motion.div>

        {/* Right Column - Terminal */}
        <motion.div className="flex justify-center md:justify-end" variants={fadeInUp}>
          <TerminalBox />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default About;