import React from 'react' ;
import { MdOutlineHome } from 'react-icons/md';
import Link from 'next/link';

const Navbar = ()=>{
return(
    <section className='navbar'>
        <Link href='/home' className='border rounded-full bg-green-300'>
        <MdOutlineHome className='text-green-700 w-[34px] h-[34px] ' />
        </Link>
        <Link href='/search' className='border rounded-full'>
        <MdOutlineHome className='text-gray w-[34px] h-[34px]' />
        </Link>
        <Link href='/downloads' className='border rounded-full'>
        <MdOutlineHome className='text-white w-[34px] h-[34px]' />
        </Link>
        <Link href='settings' className='border rounded-full'>
        <MdOutlineHome className='text-white w-[34px] h-[34px]' />
        </Link>
    </section>
)
}
export default Navbar;

