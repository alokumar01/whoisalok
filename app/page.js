import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'
import Project from '../components/Project'
import About from '@/components/About'
import BlogPost from '../components/BlogPost'
import NewsletterForm from '@/components/NewsletterForm'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
const Home = () => {
  return (
    <main className="w-full">
  
      <Navbar />
      <Hero />
      <Project />
      <About />
      <BlogPost />
      <NewsletterForm />
      <Contact />
      {/* <Footer/> */}


    
    </main>
  )
}

export default Home
