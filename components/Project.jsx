
import React from 'react'
import { projectsData } from '../constants/data.js'
import Link from 'next/link'
import Image from 'next/image.js'

const Project = () => {
  // Take only first 2 projects
  const featuredProjects = projectsData.slice(0, 2)

  return (
    <section className="py-20 px-6" id="projects">
      <div className="max-w-7xl md:px-18">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          Featured Projects
        </h2>

        <div className="grid grid-cols-1 gap-8">
          {featuredProjects.map((project, i) => (
            <Link href="/projects" key={i} className="group block">
              <div className="bg-white/30 dark:bg-gray-800/30 backdrop-blur-lg rounded-xl shadow-lg overflow-hidden border border-white/10 dark:border-gray-700 hover:shadow-2xl transition duration-300 cursor-pointer">
                {project.image && (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={600}
                    height={500}
                    className="w-full object-cover h-48 md:h-72 lg:h-96"  // taller image on md and lg
                  />
                )}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>



        <div className="text-center mt-12">
          <Link href="/projects">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition">
              View All Projects
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Project
