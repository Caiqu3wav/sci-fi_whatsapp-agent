/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link"
import { signOut } from "next-auth/react"
import { CgProfile } from 'react-icons/cg'
import {useSession } from 'next-auth/react'
import {LiaSignOutAltSolid} from 'react-icons/lia'

interface ModalProps {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void;
}

export default function ProfileModal({ isOpen, setIsOpen }: ModalProps) {
    const { data: session } = useSession();

    const handleOutsideClick = (e: any) => {
        if (e.target.id === 'modal-backdrop') {
            setIsOpen(false);
        }
    };

    return(
        <>
        {isOpen && (
            <div id="modal-backdrop" onClick={handleOutsideClick} className="fixed inset-0 bg-black bg-opacity-25 flex justify-center items-start">
                <div className="absolute top-20 right-6 gap-6 bg-white text-black p-4 rounded-lg shadow-lg">
                    <div className="flex flex-col gap-2">
                    <Link href={`/profile/${session?.user.id}`} className="flex items-center"><CgProfile size={20}/> 
                        <strong className="ml-2">Profile</strong>
                        </Link>
                        <Link href="" className="flex items-center"><CgProfile size={20}/> 
                        <strong className="ml-2">Profile</strong>
                        </Link>
                        <hr />
                    </div>
                    <button onClick={() => signOut()} className="mt-4 flex items-center gap-2 text-red-500">Sign Out <LiaSignOutAltSolid/></button>
                </div>
            </div>
        )}
        </>
    )
}