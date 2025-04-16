import React from 'react'
import Image from 'next/image'
import SciFiLogo from '../../../../public/assets/img/logo/sci-fi_logo-1.png';
import { VscActivateBreakpoints } from "react-icons/vsc";
import Link from 'next/link';

export default function Header() {
  return (
    <header className='flex w-full fixed top-0 left-0 z-50 h-[120px] justify-between bg-gradient-to-b from-black to-transparent text-white px-3 items-center'>
        <Image src={SciFiLogo} className='w-[80px]' alt='sci-fi logo' />
        <nav className='flex items-center justify-between w-[400px]'>
            <ul className='flex items-center justify-between w-[400px]'>
                <li>Home</li>
                <li>About</li>
                <li>Contact</li>
            </ul>
        </nav>
        <Link href={"auth/login"} className='w-[120px] gap-2 bg-gradient-to-b from-purple-900 to-transparent py-3.5 rounded-2xl flex items-center justify-center'><VscActivateBreakpoints size={20} /> <span>login</span></Link>
    </header>
  )
}
