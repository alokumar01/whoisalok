
import { Home, User, Briefcase, Book, Mail } from 'lucide-react';

import img from '../public/images/try.jpg'


export const navLinks = [
  { label: 'Home', href: '/', icon: <Home size={18} /> },
  { label: 'About', href: '/about', icon: <User size={18} /> },
  { label: 'Projects', href: '/projects', icon: <Briefcase size={18} /> },
  { label: 'Blog', href: '/blog', icon: <Book size={18} /> },
  { label: 'Contact', href: '/contact', icon: <Mail size={18} /> },
];


export const projectsData = [
  {
    title: 'Event Management System',
    description: 'Built a full-stack EMS with user login, admin panel, event CRUD, and real-time updates.',
    tech: ['Next.js', 'MongoDB', 'Tailwind', 'NextAuth'],
    github: 'https://github.com/alok/event-management-system',
    demo: 'https://whoisalok.tech',
    image: '/images/try.jpg', 
  },
  {
    title: 'React Portfolio',
    description: 'Personal portfolio built with Next.js, Tailwind, and Sanity CMS, featuring blog and auth.',
    tech: ['Next.js', 'Sanity', 'Tailwind'],
    github: 'https://github.com/alok/portfolio',
    demo: 'https://whoisalok.tech',
    image: '/images/ems.webp', 
  },
]
