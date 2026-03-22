'use client';

import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

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
      className="section-shell"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="section-inner">
        <div className="surface-panel p-8 sm:p-12">
          <div className="mb-10 text-center">
            <p className="section-kicker">Newsletter</p>
            <h2 className="mt-4 text-3xl font-semibold text-slate-900 dark:text-white sm:text-4xl">
              Subscribe for updates
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
              Get new blog posts, project updates, and development notes delivered to your inbox.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="mx-auto flex max-w-2xl flex-col items-center gap-4 sm:flex-row">
            <Input
              type="email"
              placeholder="Enter your email"
              ref={emailRef}
              required
              disabled={loading}
              className="h-14 flex-1 rounded-full border border-slate-200 bg-slate-50 px-5 text-base text-slate-900 placeholder:text-slate-400 focus-visible:ring-sky-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
            />

            <Button
              type="submit"
              disabled={loading}
              className="h-14 w-full rounded-full px-6 text-base font-semibold sm:w-auto dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
            >
              {loading ? 'Subscribing...' : 'Subscribe'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default NewsletterForm;
