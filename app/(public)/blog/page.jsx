import React from 'react';
import { BookText } from 'lucide-react'; // optional: for a nice icon, or use any

const Blog = () => {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center px-6 text-center dark:text-white">
      <div className="max-w-xl">
        <div className="text-indigo-500 dark:text-indigo-400 mb-4 flex justify-center">
          <BookText size={48} />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          Blog is Under Construction 🛠️
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">
          I’m currently writing and building this section. Come back soon for articles on full-stack development, projects, and tech insights. 🚀
        </p>
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-500">
          Meanwhile, explore the rest of my portfolio or connect with me on LinkedIn!
        </p>
      </div>
    </section>
  );
};

export default Blog;
