'use client'
import Image from "next/image";
import { useState,useEffect } from "react";

 export const Header =  ({osType,set})=>{

  const [change,setChange] = useState<string>();
   
  const handleChange = (event)=>{
    set(event.target.value);
  }
  useEffect(()=>{

  },[set])

     return(
     
         <header className=" justify-between max-h-screen left-0  top-0 right-0  flex items-center  p-2 shadow-md shadow-green-200 fixed ">
          <div className="gap-2 flex items-center">

          <div className="p-2 bg-[#05140C] rounded-full"> 
            <Image className="w-[25px] h-[25px]" width={50} height={50} src='/main.svg' alt="logo"/>
            </div>
            <h1 className="font-sans font-bold text-md"> softwareCity</h1>
            </div>
          <div className="flex items-center">
            <div>
              <select value={change} >
                <option value="Windows" onChange={handleChange}>
                     win

                </option>
                <option value="Mac"  onChange={handleChange}>
                   mac
                </option>
              </select>
            </div>
            <div>
            {
              (osType === "Windows") ?(
                       <Image
                         src="/windows.svg"
                         width={25}
                         height={25}
                         alt="image"        
                          />

              ): (osType === "Mac") && (
                <Image
                src="/apple.svg"
                width={25}
                height={25}
                alt="image"
               />
              )
            }
            </div>
          </div>
        </header>
      
    );
} 