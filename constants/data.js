
import { Home, User, Briefcase, Book, Mail } from 'lucide-react';


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
    description:
      'A full-stack platform for handling event operations with secure workflows, role-aware dashboards, and a reliable backend data layer.',
    highlights: [
      'Role-based dashboards for users and admins',
      'Event creation, updates, and registration workflows',
      'MongoDB-backed architecture with secure authentication',
    ],
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS', 'NextAuth', 'React Hook Form'],
    github: 'https://github.com/alok/event-management-system',
    demo: 'https://whoisalok.tech',
    image: '/images/try.jpg',
  },
  {
    title: 'React Portfolio Website',
    description:
      'A developer portfolio built to present projects, writing, and contact workflows with a polished UI and manageable content structure.',
    highlights: [
      'Sanity-powered blog and content workflow',
      'Reusable UI sections with responsive layouts',
      'Integrated contact and newsletter experiences',
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Sanity CMS', 'Framer Motion'],
    github: 'https://github.com/alok/portfolio',
    demo: 'https://whoisalok.tech',
    image: '/images/ems.webp',
  },
]

export const aboutData = {
  bio: {
    name: 'Alok Kumar',
    tagline: 'Full-Stack Developer focused on scalable backend systems',
    description:
      'I’m Alok Kumar, a full-stack developer and computer science student focused on building maintainable backend systems, clean APIs, and responsive web applications. I enjoy working across Next.js, Node.js, and MongoDB to deliver products that are reliable, scalable, and straightforward to use.',
    photo: '/images/alok4cropped.jpeg',
    ctas: [
      { label: 'View My Projects', href: '/projects', primary: true },
      { label: 'Get in Touch', href: '/contact', primary: false },
    ],
  },

  focusAreas: [
    {
      title: 'Backend Systems',
      description: 'I focus on building clean APIs, dependable server-side workflows, and data models that can support product growth without unnecessary complexity.',
    },
    {
      title: 'Full-Stack Delivery',
      description: 'I connect backend logic with responsive interfaces so the final experience feels clear, efficient, and production-ready across devices.',
    },
    {
      title: 'Maintainable Engineering',
      description: 'I care about readable code, practical architecture, and making implementation choices that stay easy to extend over time.',
    },
  ],

  education: [
    {
      level: 'Graduation',
      degree: 'B.Tech in Computer Science and Engineering',
      institution: 'Lovely Professional University, Punjab',
      duration: '2023 – 2027',
      coursework: [
        'Data Structures and Algorithms',
        'Web Development',
        'C++',
        'Java',
        'Python',
        'DBMS',
      ],
    },
    {
      level: 'Intermediate (12th)',
      degree: 'Senior Secondary',
      institution: 'Delhi Public School, Jubilee',
      duration: '2021 – 2023',
      coursework: ['Physics', 'Chemistry', 'Maths'],
    },
    {
      level: 'High School (10th)',
      degree: 'Matriculation',
      institution: 'Delhi Public School, Jubilee',
      duration: '2018 – 2021',
      coursework: ['Maths', 'Science', 'Social Science', 'English', 'Hindi'],
    },
  ],
  
  skills: [
    'HTML',
    'CSS',
    'JavaScript',
    'MongoDB',
    'Express',
    'React',
    'Node.js',
    'Next.js',
    'Tailwind CSS',
    'C++',
    'Python',
    'C',
    'Java',
    'Git',
    'Supabase',
    'RSS'
  ],

  proficiencyMap: {
    HTML: 90,
    CSS: 85,
    JavaScript: 88,
    MongoDB: 75,
    Express: 78,
    React: 87,
    Nodejs: 80,
    'Node.js': 80, // be careful with keys!
    Nextjs: 82,
    'Next.js': 82,
    'Tailwind CSS': 84,
    'C++': 70,
    Python: 76,
    C: 65,
    Java: 72,
    Git: 85,
    Supabase: 60,
    RSS: 55,
  },

  projects: [
    {
      name: 'Portfolio Website',
      description: 'My personal portfolio showcasing full-stack skills.',
      tech: ['Next.js', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion'],
      link: '/projects',
    },
    {
      name: 'Event Management System',
      description: 'A full-stack app for event planning, developed with a team.',
      tech: ['Next.js', 'MongoDB', 'Tailwind CSS'],
      link: '/projects',
    },
  ],

  achievements: [
    {
      title: 'Hackathon Participant',
      description: 'Participated in 5 hackathons, gaining skills in teamwork, rapid prototyping, and problem-solving.',
    },
    {
      title: 'Zenvetst Club Member',
      description: 'Technical Team Member at Zenvetst Club, LPU (1 year), contributed to organizing tech events.',
    },
  ],

  certifications: [
    {
      title: 'Advanced Computer Network',
      issuer: 'NPTEL',
      year: 2025,
      link: 'https://internalapp.nptel.ac.in/NOC/NOC25/SEM1/Ecertificates/106/noc25-cs02/Course/NPTEL25CS02S54750066004198065.pdf',
    },
    {
      title: 'The Bits and Byte of Computer Networking',
      issuer: 'Coursera',
      year: 2024,
      link: 'https://www.coursera.org/account/accomplishments/certificate/H9EGM5CLZM55',
    },
    {
      title: 'Full Stack Development',
      issuer: 'Apna College',
      year: 2024,
      link: 'https://mycourse.app/rvcRTQacJzvTAYgn8',
    },
    {
      title: 'Python Basic',
      issuer: 'HackerRank',
      year: 2023,
      link: 'https://www.hackerrank.com/certificates/7674a93ad0df',
    },
  ],

  codingProfiles: [
    // {
    //   platform: 'LeetCode',
    //   stats: '150+ problems solved (50 Easy, 80 Medium, 20 Hard), Top 10% rank',
    //   link: 'https://leetcode.com/u/your-username',
    // },
    // {
    //   platform: 'GitHub',
    //   stats: '15+ repositories, 200+ commits, Top Language: JavaScript',
    //   link: 'https://github.com/your-username',
    // },
    // {
    //   platform: 'GeeksforGeeks',
    //   stats: '100+ problems solved, Active contributor',
    //   link: 'https://www.geeksforgeeks.org/user/your-username',
    // },
  ],
};


export const projectsMain = [
  {
    name: 'Portfolio Website',
    description: 'My personal portfolio showcasing full-stack skills with Next.js, Tailwind, and advanced UI/UX animations using Framer Motion and Shadcn/UI.',
    images: ['/images/ems.webp', '/images/try.jpg'],
    tech: ['Next.js', 'Tailwind CSS', 'Shadcn/UI', 'Framer Motion'],
    liveLink: 'https://whoisalok.tech',
    githubLink: 'https://github.com/alokumar01/whoisalok',
    slug: 'portfolio-website',
    status: 'In-progress',
    type: 'Personal Project',
    category: 'Web Application',
    featured: true,
    keyHighlights: [
      'Sanity-powered blog workflow with dynamic content rendering',
      'Responsive portfolio sections for projects, writing, and contact',
      'Reusable UI patterns designed for a polished developer presentation',
    ],
    problem:
      'I needed a portfolio that could present projects, blogs, and contact workflows in a structured way while still being easy to maintain and update.',
    solution:
      'I built a modular Next.js application with reusable UI sections, Sanity-backed content for blogging, and dedicated routes for portfolio pages without overcomplicating the architecture.',
    keyFeatures: [
      'Dedicated project, blog, and contact pages',
      'CMS-backed blog management with portable content rendering',
      'Responsive dark-theme interface with reusable section patterns',
    ],
    learnings: [
      'How to structure a portfolio around maintainable content and reusable sections',
      'How to balance visual polish with clarity and performance',
      'How to improve presentation quality without changing backend logic',
    ],
  },
  {
    name: 'Airbnb-Like Website',
    description: 'A web app for listing and viewing hostels with maps integration, built during a web development course using MongoDB Atlas, Express, Node.js, and Tailwind CSS.',
    images: ['/images/ems.webp', '/images/try.jpg'],
    tech: ['MongoDB Atlas', 'Express', 'Node.js', 'Tailwind CSS', 'HTML', 'CSS'],
    liveLink: 'https://alokkumar-projects.onrender.com/listings',
    githubLink: 'https://github.com/alokumar01/projects-alokkumar',
    slug: 'airbnb-website',
    status: 'Completed',
    type: 'Personal Project',
    category: 'Web Application',
    featured: true,
    keyHighlights: [
      'Listing and browsing flow for hostel-style properties',
      'Backend CRUD operations with MongoDB Atlas',
      'Map-based discovery integrated into the user journey',
    ],
    problem:
      'The goal was to build a full-stack accommodation listing platform that handled property data, browsing, and location-aware discovery in one experience.',
    solution:
      'I created a MERN-style application with server-rendered listing flows, persistent data storage, and map integration to make searching and exploring properties straightforward.',
    keyFeatures: [
      'Property listing and detail views',
      'Backend-connected create, read, update, and delete flows',
      'Location and map integration for browsing',
    ],
    learnings: [
      'How backend data modeling affects listing and filtering experiences',
      'How to connect map-based UI with structured resource data',
      'How to keep a multi-page product flow easy to navigate',
    ],
  },
  {
    name: 'Event Management System',
    description: 'A full-stack app for event planning, with user registration, scheduling, and notifications, developed collaboratively.',
    images: ['/images/ems.webp', '/images/try.jpg'],
    tech: ['Next.js', 'MongoDB', 'Tailwind CSS'],
    liveLink: 'https://whoisalok.tech',
    githubLink: 'https://github.com/niyojanems/EMS',
    slug: 'event-management-system',
    status: 'In-progress',
    type: 'Group Project',
    category: 'Web Application',
    featured: false,
    keyHighlights: [
      'Registration and scheduling flows for event participation',
      'Collaborative development with shared product responsibilities',
      'Full-stack architecture centered on event operations',
    ],
    problem:
      'Managing event creation, registrations, and schedules across different users can quickly become hard to organize without a structured system.',
    solution:
      'We built a full-stack event workflow that centralizes scheduling, registration, and role-based actions in one application experience.',
    keyFeatures: [
      'Event creation and management workflows',
      'User participation and registration handling',
      'Shared dashboards and operational views',
    ],
    learnings: [
      'How to collaborate on a multi-role product with shared ownership',
      'How event-oriented workflows benefit from clear backend structure',
      'How to communicate feature responsibilities across a team project',
    ],
  },
];
