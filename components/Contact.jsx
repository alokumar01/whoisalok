'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // console.log('Form Data:', form);
    const {name, email, message} = form;
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   toast.success('Message sent successfully!');
    // }, 1000);
    
    try {
      // isSubmitting(true);
      const res = await fetch('/api/contact', 
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, email, message })
        }
      );
      
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Message Not Sent!');
        return;
      }

      toast.success(data.message || 'Message sent successfully!')
      setForm({ name: '', email: '', message: '' });

    } catch (error) {
      toast.error('Server error. Try again later.')
      
    } finally {
      setIsSubmitting(false);
    }

  };

  return (
    <section
      className="w-full px-4 sm:px-8 py-20 dark:text-white"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-8 sm:p-12 shadow-xl dark:shadow-lg transition-all duration-300">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
            Get in Touch
          </h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
            Quick note? Drop it here.
          </p>
          <div className="mt-4 flex justify-center">
            <hr className="w-20 border-2 border-indigo-500 rounded" />
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl mx-auto">
          {/* Name */}
          <div>
            <input
              id="name"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              className="w-full text-gray-900 dark:text-white text-base bg-transparent border-0 border-b border-indigo-300 dark:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 dark:placeholder-gray-400 py-3 transition-all duration-200 px-4 hover:rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Your Email"
              required
              value={form.email}
              onChange={handleChange}
              className="w-full text-gray-900 dark:text-white text-base bg-transparent border-0 border-b border-indigo-300 dark:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 dark:placeholder-gray-400 py-3 transition-all duration-200 px-4 hover:rounded-md"
            />
          </div>

          {/* Message */}
          <div>
            <textarea
              id="message"
              name="message"
              placeholder="Your Message"
              rows={4}
              required
              value={form.message}
              onChange={handleChange}
              className="w-full text-gray-900 dark:text-white text-base bg-transparent border-0 border-b border-indigo-300 dark:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-400 placeholder-gray-500 dark:placeholder-gray-400 py-3 transition-all duration-200 resize-none px-4 hover:rounded-md"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 text-base font-medium text-white rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer ${
              isSubmitting
                ? 'opacity-50 cursor-not-allowed bg-indigo-600'
                : 'bg-gradient-to-r from-indigo-600 to-indigo-800 hover:from-indigo-700 hover:to-indigo-900'
            }`}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
