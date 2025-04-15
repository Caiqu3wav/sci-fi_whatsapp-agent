import React from 'react'
import Header from './Header'

export default function Hero() {
  return (
    <div className='bg-hero-pattern bg-cover bg-center bg-no-repeat'>
      <Header />
      <div className='flex flex-col items-center justify-center h-screen'>
        <h1 className='text-5xl font-bold text-white text-center'>Welcome to my portfolio</h1>
        <p className='text-2xl text-white text-center'>Im a web developer</p>
      </div>
    </div>
  )
}
