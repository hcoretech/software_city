'use client'
import React, { useEffect } from 'react';
import Navbar from '../../components/navBar';
import SideBar from '../../components/sideBar';
import { useState } from 'react';
import { Header } from '../../components/header';


export default function RootLayout({
 children,
  }:Readonly<{
    children:React.ReactNode,

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
    interface osType {
        android:string,
        mac:string
    }
    const [click,setClick]= useState<Boolean>(false);
    const [os,setOs] = useState<string>('Windows');

    // setOs("android");
    useEffect(()=>{
      
    },[os]);


    return(
        <main className="flex h-screen  text-inter">
            
            {
                click && (
            <SideBar /> ) 
              
              }  
          <div className='flex flex-col size-full'>
          <div className=''>
          <Header osType={os} set={setOs}/>
          {children }                
               </div>   
           </div> 
           <Navbar />        
        </main>
    )
}