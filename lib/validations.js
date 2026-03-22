import { z } from 'zod';

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Name is required.'),
  email: z.string().trim().email('Please provide a valid email address.'),
  message: z.string().trim().min(1, 'Message is required.'),
});

export const telegramReplySchema = z.object({
  email: z.string().trim().email('Please provide a valid email address.'),
  message: z.string().trim().min(1, 'Reply message is required.'),
});

export const newsletterEmailSchema = z.object({
  email: z.string().trim().email('Please provide a valid email address.'),
});
