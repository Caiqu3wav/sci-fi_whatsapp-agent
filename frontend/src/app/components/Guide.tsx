'use client'
import React from 'react'
import FAQSection from './InfoAccordions'

export default function Guide() {

  return (
    <div className='flex flex-col mt-10 gap-1 items-center justify-center'>
        <h1 className="text-white">How to use it?</h1>
        <div className='rounded-2xl py-2 flex flex-col bg-gradient-to-b from-purple-700 to-gray-900 w-[400px] min-h-[400px]'>
            <FAQSection/>
        </div>
    </div>
  )
}
