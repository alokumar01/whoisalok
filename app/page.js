import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import React from 'react'

const Home = () => {
  return (
    <main className="relative min-h-screen">
      
      <Navbar />

      <section className='p-7'><Hero /></section>
      


      
    </main>
  )
}

export default Home
