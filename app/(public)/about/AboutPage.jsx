'use client';

import { useEffect, useState } from 'react';
import { aboutData } from '@/constants/data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { BookOpen, Code, Award, Briefcase, BarChart2 } from 'lucide-react';


const SectionWrapper = ({ children, icon, title }) => (
  <motion.section
    className="bg-white/20 dark:bg-[#0f172a]/80 backdrop-blur-lg p-6 sm:p-8 rounded-xl shadow-md"
    initial="hidden"
    animate="visible"
    variants={{
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
    }}
  >
    <h2 className="text-xl sm:text-3xl font-semibold flex items-center gap-2 mb-4 sm:mb-6 text-gray-900 dark:text-white font-geist">
      {icon} {title}
    </h2>
    {children}
  </motion.section>
);

export default function About() {
  const { bio, education, skills, projects, achievements, certifications, codingProfiles: staticProfiles,} = aboutData;

  const [codingProfiles, setCodingProfiles] = useState([]);

  useEffect(() => {
    const fetchProfiles = async () => {
      const dummyData = [
        {
          platform: 'LeetCode',
          stats: '150+ problems solved, Top 10% globally',
          link: 'https://leetcode.com/u/your-username',
        },
        {
          platform: 'GitHub',
          stats: '15+ repos, 200+ commits',
          link: 'https://github.com/your-username',
        },
        {
          platform: 'GeeksforGeeks',
          stats: '100+ problems solved',
          link: 'https://geeksforgeeks.org/user/your-username',
        },
      ];
      setCodingProfiles(dummyData);
    };
    fetchProfiles();
  }, []);

  // Uncomment this block if you use a real API
  // const fetcher = url => fetch(url).then(res => res.json());
  // const { data: codingProfiles, error, isLoading } = useSWR('/api/coding-profiles', fetcher);

  return (
    <div className="min-h-screen py-25 px-4 sm:px-6 md:px-10 lg:px-16 bg-gradient-to-b from-blue-100 to-blue-50 dark:from-[#0f172a] dark:to-[#131f3c] text-gray-900 dark:text-white " style={{ fontFamily: 'var(--font-geist)' }}>
      <div className="max-w-6xl mx-auto space-y-16 sm:space-y-20 ">
        {/* Bio */}
        <motion.section
          className="flex flex-col items-center text-center space-y-4 sm:space-y-6 dark:bg-gradient-to-br from-gray-900 via-gray-950 to-gray-850 p-6 sm:p-8 rounded-xl shadow-2xl dark:border-b-2"
          initial="hidden"
          animate="visible"
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        >
          <Image
            src={bio.photo}
            alt={bio.name}
            width={300}
            height={200}
            priority={true}
            className="rounded-full border-4 border-blue-400 dark:border-blue-500 shadow-xl w-[200px] md:w-[300px] "
          />
          <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 font-great-vibes whitespace-nowrap leading-tight tracking-tight text-center">
            {bio.name}
          </h1>
          <h2 className="text-lg sm:text-2xl text-indigo-700 dark:text-blue-400 font-bold">{bio.tagline}</h2>
          <p className="pl-2 md:pl-10 text-left leading-relaxed tracking-widest text-sm sm:text-base font-semibold text-gray-700 dark:text-gray-300 max-w-2xl">{bio.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            {bio.ctas.map((cta) => (
              <Link
                key={cta.href}
                href={cta.href}
                className={`px-5 py-2.5 rounded-full font-medium transition ${
                  cta.primary
                    ? 'bg-indigo-700 text-white hover:bg-indigo-800 shadow-md'
                    : 'border border-blue-600 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30'
                }`}
              >
                {cta.label}
              </Link>
            ))}
          </div>
        </motion.section>

        {/* Education */}
        <SectionWrapper icon={<BookOpen size={24} />} title="Education">
          <div className="space-y-6 max-w-6xl">
            {education.map((edu, index) => (
              <div key={index} className="bg-white/20 dark:bg-white/5 p-5 border rounded-lg shadow-inner space-y-2">

                <div className="flex flex-col sm:flex-row sm:justify-between">
                  <h3 className="text-lg sm:text-xl font-semibold">{edu.degree}</h3>
                  <span className="text-sm text-gray-600 dark:text-gray-400">{edu.duration}</span>
                </div>

                <p className="text-indigo-700 dark:text-indigo-400 font-medium">{edu.institution}</p>

                <div>
                  <h4 className="text-sm font-semibold mb-1 text-gray-700 dark:text-gray-300">Coursework:</h4>
                  <div className="flex flex-wrap gap-2">
                    {edu.coursework.map((course) => (
                      <span key={course} className="px-3 py-1 rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-xs sm:text-sm">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Skills */}
        <SectionWrapper icon={<Code size={24} />} title="Skills">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 sm:gap-4">
            {skills.map((skill) => (
              <div
                key={skill}
                className=" dark:bg-[#131f3c]/50 p-3 rounded-lg text-center shadow font-medium text-sm sm:text-base border-l-3 border-indigo-500 dark:border-l-3 dark:border-green-700"
              >
                {skill}
              </div>
            ))}
          </div>
        </SectionWrapper>

        {/* Projects */}
        {/* <SectionWrapper icon={<Briefcase size={24} />} title="Projects">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {projects.map(({ name, description, tech, link }) => (
              <div key={name} className="bg-white/20 dark:bg-[#0f172a]/60 p-5 rounded-lg shadow space-y-3">
                <h3 className="text-lg sm:text-xl font-semibold">{name}</h3>
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300">{description}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400"><strong>Tech:</strong> {tech.join(', ')}</p>
                <Link href={link} className="text-blue-600 dark:text-blue-400 hover:underline">View Project</Link>
              </div>
            ))}
          </div>
        </SectionWrapper> */}

        {/* Achievements */}
        <SectionWrapper icon={<Award size={24} />} title="Achievements">
          <ul className="list-disc pl-5 space-y-4 text-sm sm:text-base">
            {achievements.map(({ title, description }) => (
              <li key={title}>
                <strong>{title}</strong>: {description}
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* Certifications */}
        <SectionWrapper icon={<Award size={24} />} title="Certifications">
          <ul className="list-disc pl-5 space-y-4 text-sm sm:text-base">
            {certifications.map(({ title, issuer, year, link }) => (
              <li key={title}>
                <strong>{title}</strong> ({issuer}, {year}) —{' '}
                <Link href={link} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                  View
                </Link>
              </li>
            ))}
          </ul>
        </SectionWrapper>

        {/* Coding Profiles */}
        {/* <SectionWrapper icon={<BarChart2 size={24} />} title="Coding Profiles">
          <div className="space-y-4">
            {codingProfiles.map(({ platform, stats, link }) => (
              <div key={platform}>
                <h3 className="text-lg font-semibold">{platform}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">{stats}</p>
                <Link href={link} target="_blank" className="text-blue-600 dark:text-blue-400 hover:underline">
                  Visit Profile
                </Link>
              </div>
            ))}
          </div>
        </SectionWrapper> */}
      </div>
    </div>
  );
}
