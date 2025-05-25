
'use client';

import { motion } from 'framer-motion';
import { User, BookOpen, Code, Award, Briefcase} from 'lucide-react';
import Link from 'next/link';

const About = () => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const cardVariants = {
    hover: { scale: 1.05, transition: { duration: 0.2 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-200 to-slate-50 text-gray-900 py-20">
      <div className="max-w-4xl mx-auto px-6">
        {/* Profile Section */}
        <motion.section
          className="text-center mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <img
            src="/profile-placeholder.jpg" // Replace with your photo or placeholder
            alt="Alok Kumar"
            className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-200"
          />
          <h1 className="text-4xl font-bold mb-2">Alok Kumar</h1>
          <p className="text-lg text-gray-700">
            3rd-year B.Tech CSE student at Lovely Professional University, passionate about building full-stack applications and solving real-world problems.
          </p>
          <Link href="/contact" className="text-blue-600 hover:underline mt-2 inline-block">
            Get in Touch
          </Link>
        </motion.section>

        {/* Education Section */}
        <motion.section
          className="mb-12 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <BookOpen size={24} /> Education
          </h2>
          <p>
            <strong>B.Tech in Computer Science and Engineering</strong><br />
            Lovely Professional University, Punjab<br />
            2022 – Present (3rd Year)<br />
            Relevant Coursework: Data Structures, Algorithms, Web Development, Database Systems
          </p>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          className="mb-12"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Code size={24} /> Skills
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS', 'C++', 'JavaScript', 'Git'].map((skill) => (
              <motion.div
                key={skill}
                className="bg-white/30 backdrop-blur-lg p-4 rounded-lg text-center border border-gray-200"
                variants={cardVariants}
                whileHover="hover"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
          className="mb-12 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Briefcase size={24} /> Experience
          </h2>
          <p>
            <strong>Event Management System</strong> (Group Project with Abhishek)<br />
            Developed a full-stack web application for event planning using Next.js, MongoDB, and Tailwind CSS.<br />
            Features: User authentication, event creation, and real-time updates.<br />
            <Link href="/projects" className="text-blue-600 hover:underline">View Projects</Link>
          </p>
        </motion.section>

        {/* Certifications (Optional) */}
        <motion.section
          className="mb-12 bg-white/30 backdrop-blur-lg p-6 rounded-lg shadow-md"
          variants={sectionVariants}
          initial="hidden"
          animate="visible"
        >
          <h2 className="text-2xl font-semibold flex items-center gap-2 mb-4">
            <Award size={24} /> Certifications
          </h2>
          <p>
            - Full-Stack Web Development (Online Course, 2024)<br />
            - Data Structures and Algorithms in C++ (Online Course, 2023)
          </p>
        </motion.section>
      </div>
    </div>
  );
};

export default About;
