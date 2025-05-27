"use client";
import React from 'react'
import { projectsData } from '../constants/data.js'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

const Project = () => {
  const featuredProjects = projectsData.slice(0, 2)

  return (
    <section 
      className="py-20 px-6"
      style={ {fontFamily: 'var(--font-geist)'} }>
      <div className="max-w-7xl md:px-18 mx-auto">
        {/* Animate heading */}
        <motion.h2 
          className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          // viewport={{ once: true }}
        >
          Projects
        <div className="flex justify-center mt-3">
          <hr className="border-2 border-black w-20 " />
        </div>

        </motion.h2>
        <div className="grid grid-cols-1 gap-8">
          {featuredProjects.map((project, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2, duration: 0.5 }}
              // viewport={{ once: true }}
            >
              <Link href="/projects" className="group block">
                <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/10 dark:border-gray-700 hover:shadow-2xl transition duration-300 cursor-pointer">
                  {project.image && (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={600}
                      height={500}
                      className="w-full object-cover h-48 md:h-72 lg:h-96"
                    />
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-30">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <Link href="/projects">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition">
              View All Projects
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default Project
