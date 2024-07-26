import React from 'react';
import Navbar from '../../components/navBar';
import SideBar from '../../components/sideBar';
export default function RootLayout({
 children
  }:Readonly<{
    children:React.ReactNode
}>){

    return(
        <main className="flex h-screen w-full  text-inter">
            <SideBar />       
          <div className='flex flex-col justify-between size-full'>
          <div>
          {children}                
               </div>   
           </div> 
           <Navbar />        
        </main>
    )
}