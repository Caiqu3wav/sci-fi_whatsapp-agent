'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import SciFiLogo from '../../../../public/assets/img/logo/sci-fi_logo-1.png';
import { VscActivateBreakpoints } from "react-icons/vsc";
import Link from 'next/link';
import { useSession } from 'next-auth/react'
import ProfileModal from '../ProfileModal';

export default function Header() {
  const { data: session } = useSession();
  const [profileModalOpen, setProfileModalOpen] = useState(false);

  const data = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "About",
      path: "/about"
    },
    {
      name: "Management",
      path: "/management"
    },
  ]

  return (
    <header className='flex w-full fixed top-0 left-0 z-50 h-[120px] justify-between bg-gradient-to-b from-black to-transparent text-white px-3 items-center'>
        <Image src={SciFiLogo} className='w-[80px]' alt='sci-fi logo' />
        <nav className='flex items-center justify-between w-[400px]'>
            <ul className='flex items-center justify-between w-[400px]'>
                {data.map((item, index) => (
                    <Link href={item.path} key={index}><li>{item.name}</li></Link>
                ))}
            </ul>
        </nav>
        {!session ? (
        <Link href={"auth/login"} className='w-[120px] gap-2 bg-gradient-to-b from-purple-900 to-transparent py-3.5 rounded-2xl flex items-center justify-center'><VscActivateBreakpoints size={20} /> <span>login</span></Link>
        ) : (
          <>
          <button onClick={() => setProfileModalOpen(!profileModalOpen)} 
          className='w-[120px] gap-2 bg-gradient-to-b from-purple-900 to-transparent py-3.5 
          rounded-2xl flex items-center justify-center'>{session.user.name}</button>
          {profileModalOpen && <ProfileModal isOpen={profileModalOpen} setIsOpen={setProfileModalOpen} />}
          </>
        )}
    </header>
  )
}
