'use client'

import React from 'react';
import Image from 'next/image';
import { projectsMain } from '@/constants/data';
import { motion } from 'framer-motion';
import { Globe, Github, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Wrench, Users } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 50 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
}

const ProjectsPage = () => {
  return (
    <div className="min-h-screen px-4 py-20 sm:px-6 md:px-10 lg:px-16 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-[#0f172a] dark:to-[#131f3c] text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-geist)' }}>
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Page Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">My Projects</h1>
          <hr className="border-2 border-indigo-500 dark:border-indigo-400 w-32 mx-auto rounded" />
        </div>

        {/* Project List */}
        {projectsMain.map((project, index) => (
          <motion.div
            key={index}
            custom={index}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="dark:bg-gradient-to-br from-gray-900 via-gray-950 to-gray-850 backdrop-blur-lg p-6 rounded-xl shadow-md transition-all duration-300"
          >
            {/* Project Image */}
              {project.images && (Array.isArray(project.images) ? project.images[0] : project.images) ? (
                <Image
                  src={Array.isArray(project.images) ? project.images[0] : project.images}
                  alt={project.name}
                  width={1500}
                  height={800}  
                  priority={true}
                  className="w-full h-[250px] sm:h-[400px] object-cover rounded-md mb-6 shadow-lg"
                />
              ) : null}

            {/* Project Title */}
            <h2 className="text-2xl sm:text-3xl font-semibold mb-2">{project.name}</h2>

            {/* Project Description */}
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm sm:text-base leading-relaxed tracking-wider">
              {project.description}
            </p>

            {/* Tech Stack */}
            <div className="mb-4">
              <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-2">Tech Stack:</h3>
              <ul className="flex flex-wrap gap-2">
                {project.tech.map((tech, i) => (
                  <li
                    key={i}
                    className="px-3 py-1 text-sm bg-blue-200 text-black dark:bg-blue-900 dark:text-blue-300 rounded"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
              {/* Project Meta Info */}
              <div className="flex flex-wrap gap-3 mt-4">
                {/* Type */}
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 text-sm">
                  <Users size={14} /> {project.type}
                </Badge>

                {/* Status */}
                <Badge
                  variant="secondary"
                  className={`flex items-center gap-1 px-3 py-1 text-sm ${
                    project.status === 'Completed'
                      ? 'bg-green-200 text-green-900 dark:bg-green-900 dark:text-green-200'
                      : project.status === 'In-progress'
                      ? 'bg-yellow-200 text-yellow-900 dark:bg-yellow-900 dark:text-yellow-200'
                      : 'bg-gray-200 text-gray-900 dark:bg-gray-800 dark:text-gray-300'
                  }`}
                >
                  <Wrench size={14} /> {project.status}
                </Badge>

                {/* Category */}
                <Badge variant="outline" className="flex items-center gap-1 px-3 py-1 text-sm">
                  <Globe size={14} /> {project.category}
                </Badge>
              </div>



            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4 mt-6">
              {project.liveLink && (
                <a
                  href={project.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium bg-indigo-700 text-white hover:bg-indigo-800 transition"
                >
                  <Globe size={18} /> Live Demo
                </a>
              )}
              {project.githubLink && (
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                >
                  <Github size={18} /> GitHub
                </a>
              )}
              {/* {project.slug && (
                <a
                  href={`/projects/${project.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full font-medium border border-gray-600 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 transition"
                >
                  <FileText size={18} /> Case Study
                </a>
              )} */}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default ProjectsPage
