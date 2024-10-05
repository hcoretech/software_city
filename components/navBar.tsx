// 'use client'
import React from 'react' ;
// import { MdOutlineHome } from 'react-icons/md';
import Link from 'next/link';
import { Suspense } from 'react';



import Image from 'next/image';
import { usePathname } from 'next/navigation';

export 

const navLink = [

    {
        label:"Home",
        route:"/Home",
        icon1: "/cloud1.svg",
        icon2: "/cloud2.svg"
        
    },
    {
        label:"Search",
        route:"/search",
        icon1:"/search1.svg",
        icon2:"/search2.svg"
    },
    {
        label:"Downloads",
        route:"/downloads",
        icon1:"/hardrive1.svg",
        icon2:"/hardrive2.svg"
    },
    {
        label:"Community",
        route:"/community",
        icon1:"download.svg",
        icon2:"download.svg"

    }
]

const Navbar = () => {
    const pathname = usePathname();

    function pulse (){
        return (<div className='animate-pulse bg-gray-200 p-2'></div>);
    }
    // const nav = navLink ;

return(
    <section>
        <div className=''>
            
        {/* <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" /> */}
            <ul className='navbar '>
                
        {navLink.map((value,index)=>{
           const active = pathname === value.route;
           const color = active && (" text-[#29C665] ");
           const round = active && ("p-1 border-2  rounded-full  text-[#29C665] shadow-md shadow-[#29C665] bg-white");
         return (
           
            
            <li key={index} className=''>
                
            <Link href={value.route} className=''>
                <span className='items-center flex flex-col  ' >
                    <span className={`${round}`}>
                        <Suspense fallback={<div className=' animate-pulse bg-gray-300'></div>}>
                <Image   className = {`${color}  w-[23px] h-[23px] `}  src={active ? value.icon2:value.icon1} width={20} height={20} alt='menu'
               
                    
                />
                </Suspense>
                </span>
               {/* < {value.icon?} /> */}
                {/* //  width={25} */}
                {/* //  height={25}
                 alt="home"
             */}
               <span className={`${color} text-[11px] font-semibold `}>
               {value.label}
               </span>
               </span>
            </Link>
            </li>
         )
        }
          
        )
        
        }
        </ul>
       
        </div>
    </section>
)
}
export default Navbar;

