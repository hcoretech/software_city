'use client'
import Link from 'next/link';
import Image from 'next/image';
import { sideBarLink } from '../constants/icon';
import React from 'react'
import { usePathname } from 'next/navigation';
import { GoHome } from "react-icons/go";

const SideBar = ()=>{
    const pathName = usePathname();

    return(
<section className='sidebar'>
      {/* <Link href='/home'>
         <Image width={200} height={200} className='cursor-pointer' 
         src='/logos3.svg'  alt='logo'/>
      </Link>
      {sideBarLink.map((item) =>{
        const active = pathName === item.route
        return(
            <a key={item.label} href={item.route}>
             
                 {item.icon className ="w-30 h-30"}
  
            </a>
        )
      })

      } */}
</section>
    );
}
export default SideBar;