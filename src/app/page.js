'use client'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'



export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <Navbar />
      <Hero />
    
    </main>
  )
}