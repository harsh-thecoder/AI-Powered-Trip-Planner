import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9 mt-10'>
        <h1 className='font-extrabold text-[40px] text-center'>
            <span className='text-[#F56551]'>Discover Your Next Adventure with AI:</span> Personalized Itineraries at Your Fingertips </h1>
            <p className='text-xl text-gray-500 text-center'>Your Personal Trip Planner and travel curator  </p>
            <Link to = {'/create-trip'}>
            <Button>Get started it's free</Button>
            </Link>
    </div>
  )
}

export default Hero