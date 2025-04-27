"use client";
import "./topicbar.css"
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import TopicsLogo from "../../../../public/assets/img/topicslogo.png";
import { FaLowVision } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa";

export default function TopicsBar() {
    const [isListVisible, setListVisible] = useState(false);
    const [isListTwoVisible, setListTwoVisible] = useState(false);

    const toggleList = () => {
        setListVisible(!isListVisible);
    };

    const toggleListTwo = () => {
      setListTwoVisible(!isListTwoVisible);
  };


    return (
        <div className="topic-bar text-xl midthree:text-sm pt-4 flex flex-col w-[30%] h-fit pb-4 rounded-2xl mt-4">
            <Image src={TopicsLogo} alt="Topics Logo" className="self-center w-16 pb-4"/>
           <div className="ml-2 mr-2 h-[100px] border-t-2 border-b-2">
           <button onClick={toggleList} className="mt-[10%] w-[90%] flex justify-between midtwo2:flex-col">
            <h1 className=" font-semibold">Blogs</h1>{isListVisible ? <FaLowVision size={26} className="midthree:size-5" /> : <FaAngleDown size={30} />}
            </button>
            </div>
            <ul
        className={`flex flex-col ml-2 mr-2 h-fit text-lg midthree:text-[13px] text-blue-dark gap-4 ${
          isListVisible ? "visible" : "hidden"
        }`}
      >           <li className="pt-2"><Link href="/actuallanguages"><button>Linguagens de programação atualidade</button></Link></li>
           <li className="border-t-2 border-violet-700 pt-2">
            <Link href="/ia" className=""><button>Inteligência artificial</button></Link>
            </li>
            <li className="border-t-2 border-violet-700 pt-2">
            <Link href="/bancos_de_dados" className=""><button>Bancos de dados</button></Link>
            </li>
            <li className="border-t-2 border-violet-700 pt-2">
            <Link href="/goodcode" className=""><button>Guia para um bom código</button></Link>
            </li>
           </ul>
           <div className="ml-2 mr-2 h-[100px] border-t-2 border-b-2">
           <button onClick={toggleListTwo} className="mt-[10%] w-[90%] flex justify-between midtwo2:flex-col">
            <h1 className=" font-semibold">Tópicos</h1>{isListTwoVisible ? <FaLowVision size={26} className="midthree:size-5" /> : <FaAngleDown size={30} />}
            </button>
            </div>
            <ul
        className={`flex flex-col ml-2 mr-2 h-fit text-lg midthree:text-[13px] text-blue-dark gap-4 ${
          isListTwoVisible ? "visible" : "hidden"
        }`}
      >           <li className="pt-2"><Link href="/blogs"><button>Página de Blogs</button></Link></li>
           <li className="border-t-2 border-violet-700 pt-2">
            <Link href="/about" className=""><button>Sobre/contato</button></Link>
            </li>
           </ul>
        </div>
    );
}