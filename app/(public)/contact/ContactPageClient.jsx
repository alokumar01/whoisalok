'use client';

import React, { useState } from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Mail, Github, Linkedin, ArrowRight } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { ShimmerBorder } from '@/components/ui/shimmer-border';

const contactLinks = [
  {
    label: 'Email',
    value: 'alokkumar012148@gmail.com',
    href: 'mailto:alokkumar012148@gmail.com',
    icon: Mail,
  },
  {
    label: 'GitHub',
    value: 'github.com/alokumar01',
    href: 'https://github.com/alokumar01',
    icon: Github,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/alokumar01',
    href: 'https://linkedin.com/in/alokumar01',
    icon: Linkedin,
  },
];

export default function ContactPageClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const resdata = await res.json();

      if (res.ok) {
        toast.success(resdata.message || 'Message sent!');
        form.reset();
      } else {
        toast.error(resdata.message || 'Failed to send message.');
      }
    } catch (error) {
      toast.error('Server error. Try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      className="px-6 py-16 pt-28 text-slate-900 dark:text-slate-100 sm:pt-32"
      style={{ fontFamily: 'var(--font-geist)' }}
    >
      <div className="mx-auto flex max-w-5xl flex-col gap-14">
        <section className="space-y-4 text-center">
          <p className="section-kicker">Contact</p>
          <h1 className="text-4xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            Let’s talk about building something meaningful
          </h1>
          <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 dark:text-slate-300 sm:text-base">
            Whether it’s a project collaboration, internship opportunity, or a technical discussion, you can reach me through the form or direct links below.
          </p>
        </section>

        <ShimmerBorder contentClassName="surface-panel overflow-hidden p-1">
          <div className="grid gap-0 lg:grid-cols-[minmax(280px,0.85fr)_minmax(0,1.15fr)]">
            <div className="border-b border-slate-200/70 p-8 dark:border-white/10 lg:border-b-0 lg:border-r">
              <div className="space-y-6">
                <div className="space-y-3">
                  <h2 className="text-2xl font-semibold text-slate-900 dark:text-white">
                    Reach out directly
                  </h2>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">
                    I’m especially interested in backend-focused full-stack work, scalable web applications, and thoughtful product engineering.
                  </p>
                </div>

                <div className="space-y-3">
                  {contactLinks.map((item) => {
                    const Icon = item.icon;

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="surface-card surface-card-hover flex items-center gap-4 p-4"
                      >
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-sky-700 dark:border-white/10 dark:bg-white/[0.05] dark:text-sky-300">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-sm font-medium text-slate-900 dark:text-white">{item.label}</p>
                          <p className="text-sm text-slate-600 dark:text-slate-300">{item.value}</p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="p-8 sm:p-10">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Your name"
                              className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-white/[0.04]"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="Your email"
                              className="h-12 rounded-2xl border-slate-200 bg-slate-50 px-4 dark:border-white/10 dark:bg-white/[0.04]"
                              {...field}
                              required
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium text-slate-700 dark:text-slate-200">Message</FormLabel>
                        <FormControl>
                          <Textarea
                            rows={8}
                            placeholder="Tell me a bit about your project or opportunity"
                            className="rounded-3xl border-slate-200 bg-slate-50 px-4 py-3 dark:border-white/10 dark:bg-white/[0.04]"
                            {...field}
                            required
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-12 w-full rounded-full bg-sky-500 text-slate-950 hover:bg-sky-400 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                    {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </ShimmerBorder>
      </div>
    </main>
  );
}
