'use client'
import React from 'react';
import Navbar from '../../components/navBar';
import SideBar from '../../components/sideBar';
import { useRouter } from 'next/navigation';
import { getUser } from '../../lib/clientAction';
import { useEffect } from 'react';

export default function RootLayout({
 children
  }:Readonly<{
    children:React.ReactNode
}>){
    const router = useRouter();

    const checkUser =async()=>{
    //   const loggedIn = await getUser();
      const getUserValid = await fetch('/api/authenticate',{
       method:'GET'
      })
      console.log (getUserValid);
     try {
        if(getUserValid.ok){
            console
        }
      if (getUserValid.status !== 200){
        // setmessage("session expired ")    
        router.push('/sign-in');
      }
    
      } catch(error){
       throw error
      }
     }
    
    
      
    // const loggedIn = false;
    // console.log(loggedIn)
    
     useEffect(() =>{
      checkUser();
     
     },[])

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