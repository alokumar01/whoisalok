'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const NewsletterForm = () => {
  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 py-16" style={{ fontFamily: 'var(--font-geist)' }}>
      <div className="bg-white/80 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-xl p-6 sm:p-10 shadow-xl">
        
        <div className="text-left mb-8">
          <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4 md:text-center px-4 ">
            Subscribe to Alok's Newsletter
          </h2>
          <p className="text-gray-600 dark:text-gray-300  sm:text-lg md:text-center px-4 ">
            Get the latest blogs, updates, and dev insights straight to your inbox.
          </p>

          <div className="mt-4 flex justify-center">
            <hr className="w-20 border-2 border-black dark:border-white" />
          </div>
        </div>

        <form className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1  h-12 px-4 py-4 text-base rounded-full"
          />
          <Button type="submit" className="h-12 w-full sm:w-auto px-6 text-base rounded-full  cursor-pointer">
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
