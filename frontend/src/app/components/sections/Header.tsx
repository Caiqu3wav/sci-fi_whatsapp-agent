import React from 'react'
import Image from 'next/image'
import SciFiLogo from '../../../../public/assets/img/logo/sci-fi_logo-1.png';

export default function Header() {
  return (
    <header className='flex h-[120px] justify-between bg-gradient-to-b from-black to-transparent px-3 items-center'>
        <Image src={SciFiLogo} className='w-[80px]' alt='sci-fi logo' />
        <nav className='flex items-center justify-between w-[400px]'>
            <ul className='flex items-center justify-between w-[400px]'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
        <button>login</button>
    </header>
  )
}
