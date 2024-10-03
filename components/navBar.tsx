// 'use client'
import React from 'react' ;
// import { MdOutlineHome } from 'react-icons/md';
import Link from 'next/link';



import Image from 'next/image';
import { usePathname } from 'next/navigation';

const navLink = [

    {
        label:"Home",
        route:"/Home",
        icon: "/download.svg"
        
    },
    {
        label:"Search",
        route:"/search",
        icon:"/download.svg"
    },
    {
        label:"Downloads",
        route:"/downloads",
        icon:"/hardrive.svg"
    },
    {
        label:"Community",
        route:"/community",
        icon:"download.svg"

    }
]

const Navbar = () => {
    const pathname = usePathname();
    // const nav = navLink ;

return(
    <section>
        <div className='shadow-md shadow-green-400'>
        {/* <FontAwesomeIcon icon="fa-solid fa-cloud-arrow-up" /> */}
            <ul className='navbar z-100 '>
        {navLink.map((value,index)=>{
           const active = pathname === value.route;
           const color = active && ("  text-red-700");
         return (
           
            
            <li key={index}>
                
            <Link href={value.route} className=''>
                <span className='items-center flex flex-col p-1' >
                    <span>
                <Image   className = {`${color} w-[20px] h-[20px] `}  src={value.icon} width={20} height={200} alt='menu'
               
                    
                />
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

