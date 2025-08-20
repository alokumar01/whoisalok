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
import { Mail, Github, Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';

export default function ContactPage() {
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
        toast.success(resdata.message || 'Message sent!' );
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
    <section className="w-full px-4 sm:px-8 py-20 dark:text-white">
      <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl p-8 sm:p-12 shadow-xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold dark:text-white">Contact Me</h2>
          <p className="mt-2 text-base text-gray-500 dark:text-gray-300">
            Reach out through the form or links below.
          </p>
          <div className="mt-4 flex justify-center">
            <hr className="w-20 border-2 border-indigo-500 rounded" />
          </div>
        </div>

        {/* Form */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 max-w-2xl mx-auto">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input className='py-5.5' placeholder="Your Name" {...field} required />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input className="py-5.5" type="email" placeholder="Your Email" {...field} required  />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea rows={9} className="py-5.5" placeholder="Your Message" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" disabled={isSubmitting} className="w-full py-5.5 dark:bg-blue-600 dark:text-white cursor-pointer">
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </form>
        </Form>

        {/* Social Links */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold mb-4 dark:text-blue-500">Connect with me</h3>
          <div className="flex justify-center space-x-6">
            <a
              href="mailto:alokkumar012148@gmail.com"
              className="text-gray-500 hover:text-indigo-500"
              aria-label="Email"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/alokumar01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-500"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href="https://linkedin.com/in/alokumar01"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-indigo-500"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
