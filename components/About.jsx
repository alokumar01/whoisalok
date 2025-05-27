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
      className="max-w-6xl mx-auto px-6 md:px-20 py-20 "
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
          <hr className="w-20 border-2 border-black dark:border-white" />
        </div>
      </motion.div>

      {/* Content Grid */}  
      <motion.div className="grid md:grid-cols-2 gap-10 items-center" variants={stagger}>
        {/* Left Column - Text and Button */}
        <motion.div variants={fadeInUp}>
          <p className="text-gray-700 px-2 dark:text-gray-300 mb-20 
          text-[20px] leading-loose mt-7 text-left md:text-left">
            I’m Alok Kumar, a Full Stack Developer who builds fast and clean web apps
            using React, Next.js, and Tailwind CSS. I turn ideas into smooth user
            experiences.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center md:justify-start">
            <Link
              href="/about"
              className="group inline-block border  border-gray-800 text-gray-800 px-2 py-3 rounded-full hover:bg-gray-800 hover:text-white transition-colors duration-300 "
            >
              <span className="flex items-center gap-2">
                More About Me
                <MoveRightIcon className=" opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 w-5" />
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
