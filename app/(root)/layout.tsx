'use client'
import React from 'react';
import Navbar from '../../components/navBar';
import SideBar from '../../components/sideBar';
import { useState } from 'react';


export default function RootLayout({
 children
  }:Readonly<{
    children:React.ReactNode
}>){
    // const router = useRouter();

    // const checkUser =async()=>{
    // //   const loggedIn = await getUser();
    //   const getUserValid = await fetch('/api/authenticate',{
    //    method:'GET'
    //   })
    //    connst Response = await getUserValid
    
      
    // const loggedIn = false;
    // console.log(loggedIn)
    
    //  useEffect(() =>{
    //   checkUser();
     
    //  },[])
    const [click,setClick]= useState<Boolean>(false);


    return(
        <main className="flex h-screen  text-inter">
            {
                click && (
            <SideBar /> ) 
              
              }     
          <div className='flex flex-col size-full'>
          <div className=''>
          {children}                
               </div>   
           </div> 
           <Navbar />        
        </main>
    )
}