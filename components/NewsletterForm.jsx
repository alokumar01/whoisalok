'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useSonner, toast } from 'sonner';

const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

const NewsletterForm = () => {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = emailRef.current.value.trim();
    console.log(email);
    if (!validateEmail(email)) {
      toast.error('Please enter a valid email.');
      return;
    }

    try {
      setLoading(true);

      // const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // console.log("Status:", res.status);
      const data = await res.json();
      // console.log("Response:", data);

      if (!res.ok) {
        toast.error(data.message || 'Subscription failed.');
        return;
      }

      toast.success(data.message || 'Successfully Subscribed!');
      emailRef.current.value = '';
    } catch (err) {
      // console.error('Subscribe error:', err);
      toast.error('Server error. Try again later.');
    } finally {
      setLoading(false);
    }
  };

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
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto">
          <Input
            type="email"
            placeholder="Enter your email"
            ref={emailRef}
            required
            disabled={loading}
            className="flex-1 h-14 px-5 py-4 text-base bg-transparent border-0 border-b border-indigo-300 dark:border-indigo-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 hover:rounded-md transition-all duration-200 disabled:opacity-60"
          />
          
          <Button
            type="submit"
            disabled={loading}
            className="h-14 w-full sm:w-auto px-6 text-base rounded-full bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900 text-white font-semibold shadow-md transition-all duration-300 cursor-pointer disabled:opacity-60"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
