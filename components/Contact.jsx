'use client';

import React, { useState } from 'react';
import { toast } from 'sonner';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';

const ContactForm = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const { name, email, message } = form;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || 'Message Not Sent!');
        return;
      }

      toast.success(data.message || 'Message sent successfully!');
      setForm({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error('Server error. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-shell" style={{ fontFamily: 'var(--font-geist)' }}>
      <div className="section-inner">
        <div className="mb-12 space-y-4 text-center">
          <p className="section-kicker">Contact</p>
          <h2 className="section-title">Get in Touch</h2>
          <p className="section-copy mx-auto max-w-2xl">
            If you’d like to collaborate, discuss an opportunity, or talk through a project idea, feel free to reach out.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
          <div className="surface-panel p-8 sm:p-10">
            <div className="space-y-6">
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">Let’s build something solid</h3>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
                  I’m especially interested in backend-focused full-stack work, scalable web applications, and developer-friendly product experiences.
                </p>
              </div>

              <div className="space-y-3">
                <a
                  href="mailto:alokkumar012148@gmail.com"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-4 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                >
                  <Mail className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  alokkumar012148@gmail.com
                </a>
                <a
                  href="https://github.com/alokumar01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-4 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                >
                  <Github className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  github.com/alokumar01
                </a>
                <a
                  href="https://www.linkedin.com/in/alokumar01"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-slate-200/70 bg-slate-50/70 px-4 py-4 text-sm text-slate-700 transition hover:border-slate-300 dark:border-white/10 dark:bg-white/[0.04] dark:text-slate-200"
                >
                  <Linkedin className="h-4 w-4 text-sky-600 dark:text-sky-300" />
                  linkedin.com/in/alokumar01
                </a>
              </div>

              <p className="text-sm leading-7 text-slate-500 dark:text-slate-400">
                The contact form still uses the same backend handler, so this update is presentation-only.
              </p>
            </div>
          </div>

          <div className="surface-panel p-8 sm:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your email"
                    required
                    value={form.email}
                    onChange={handleChange}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me a bit about your project or opportunity"
                  rows={6}
                  required
                  value={form.message}
                  onChange={handleChange}
                  className="form-input resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`primary-button w-full justify-center ${isSubmitting ? 'cursor-not-allowed opacity-60' : ''}`}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
                {!isSubmitting && <ArrowRight className="h-4 w-4" />}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
