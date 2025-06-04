import Hero from '@/components/Hero'
import React from 'react'
import Project from '../components/Project'
import About from '@/components/About'
import BlogPost from '../components/BlogPost'
import NewsletterForm from '@/components/NewsletterForm'
import Contact from '@/components/Contact'

const Home = () => {
  return (
    <>
      <Hero />
      <Project />
      <About />
      <BlogPost />
      <NewsletterForm />
      <Contact />
    </>
  )
}

export default Home
