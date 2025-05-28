'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NewsletterForm = () => {
  return (
    <section
      className="w-full px-4 sm:px-8 py-20 dark:text-white"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-8 sm:p-12 shadow-xl dark:shadow-lg transition-all duration-300">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Subscribe to Alok's Newsletter
          </h2>
          <p className="text-gray-600 sm:text-lg max-w-xl mx-auto dark:text-gray-300">
            Get the latest blogs, updates, and dev insights straight to your inbox.
          </p>
          <div className="mt-4 flex justify-center">
            <hr className="w-20 border-2 border-indigo-500 rounded" />
          </div>
        </div>

        {/* Form */}
        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 h-14 px-5 py-4 text-base rounded-full shadow-sm focus:ring-2 focus:ring-indigo-400 dark:bg-gray-900 dark:text-white dark:placeholder-gray-400"
          />
          <Button
            type="submit"
            className="h-14 w-full sm:w-auto px-6 text-base rounded-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
