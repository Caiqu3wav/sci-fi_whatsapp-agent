import React from 'react'
import SciFiWhatsapp from '../../../../public/assets/img/logo/scifi-whatsapp-removebg-preview.png'
import Image from 'next/image'

export default function Hero() {
  return (
    <div className='hero w-full flex items-center min-h-[400px]'>
      <div className='flex flex-col max-w-[400px] items-center justify-center h-screen px-6 text-center'>
        <Image src={SciFiWhatsapp} className='w-[170px]' alt='Sci-Fi Whatsapp logo' />
  <h1 className='text-4xl font-bold text-white mb-4'>Welcome to your new smart attendant</h1>
  <p className='text-2xl text-gray-300 mb-6 max-w-2xl'>
    Automate conversations with clients on WhatsApp with an AI that responds using your business information.
  </p>
  <button className='px-6 py-3 bg-purple-600 text-white font-semibold rounded-xl hover:bg-purple-700 transition'>
    Start Now
  </button>
</div>
    </div>
  )
}
