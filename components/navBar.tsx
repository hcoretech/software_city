// 'use client'
import React from 'react' ;
import { MdOutlineHome } from 'react-icons/md';
import Link from 'next/link';

import Image from 'next/image';

const navLink = [

    {
        label:"Home",
        route:"/home",
        icon: "/download.svg"
        
    },
    {
        label:"Search",
        route:"search",
        icon:"/download.svg"
    },
    {
        label:"Downloads",
        route:"/downloads",
        icon:"/download.svg"
    },
    {
        label:"Community",
        route:"Chat",
        icon:"download.svg"

    }
]

const Navbar = () => {
    const nav = navLink ;

return(
    <section>
        <div >
            <ul className='navbar'>
        {navLink.map((value,index)=>
        (
            <li key={index}>
            <Link href={value.route} className='text-white'>
                <span className='items-center flex flex-col p-1' >
                    <span>
                <Image   className=' rounded-full w-[25px]  h-[25px]  bg-white' src="/cloud.svg" width={25} height={25} alt='menu'
               
                    
                />
                </span>
               {/* < {value.icon?} /> */}
                {/* //  width={25} */}
                {/* //  height={25}
                 alt="home"
             */}
               <span>
               {value.label}
               </span>
               </span>
            </Link>
            </li>
        )
          
        )
        
        }
        </ul>
       
        </div>
    </section>
)
}
export default Navbar;

