'use client'
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useState,useEffect } from "react";
import { usePathname } from "next/navigation";
import { navLink } from "../lib/navBaricon";
import { resolve } from "node:path";



 export const Header =  ({osType,set})=>{
  //  const navi = navigator.platform

  // console.log(navi)
  const pathname = usePathname();

  const [change,setChange] = useState<string>("");
  const [rotate,setRotate] = useState<number>(0);

  console.log(change)

  const handleChange = (event)=>{
    setChange(event.target.value);
    pathname
    console.log(change)
  }
  

    function rotateFunction (){
    if(rotate < 0){
      setRotate(500);
      return rotate
    }
    if(rotate > 0){
      setRotate(0)
      return rotate;
    }
   }

   async function intervalFunction(){
      rotateFunction();
     console.log(rotate)
    let animate = "animate-spin";
    // const interval =  setInterval(()=>{
    //   console.log( animate);
    // },rotate);

    setTimeout(
     ()=> { 
      return new Promise((resolve,reject)=>{

          if(rotate>0){
            resolve("animate-spin");
          }  
      })   
     },5000
    )
      
   }
 
  let spin;
  let stop;

  useEffect(()=>{
    rotateFunction();
 
    const  value = rotateFunction();
    console.log(value)
     const active = rotate === 500 ;
     const  inactive = rotate > 500;
     spin = active && "animate-spin";
     stop =inactive &&  "" ;
  //  console.log( intervalFunction());

    // setTimeout(
    //   ()=>{
    //     clearInterval(interval);
    //   },
    //   500
    // )
  },[]);

     return(
     
         <header className=" justify-between  max-h-screen left-0  top-0 right-0  flex items-center bg-gray-900  p-2 shadow-md  fixed z-10 ">
          <div className="gap-2 flex items-center">

          <div className="p-2 bg-[#05140C] rounded-full"> 
            

            <Image className="w-[25px] h-[25px] animate-spin  duration-1 delay-100 "  width={50} height={50} src='/main.svg' alt="logo"/>
              
              
            </div>
            
               {navLink.map((value,index)=>{
                         const active = pathname === value.route;
                         const color = active && (" text-[#29C665] ");
                         const round = active && ("p-1 border-2  rounded-full  text-[#29C665] shadow-md shadow-[#29C665] bg-white");
                       return (
                           <h1 className="font-sans text-white font-bold text-md" key={value.heading}>
                             {active &&(value.heading)}
                          </h1>
                       )
             }
               )
              }
            </div>
          <div className="flex items-center">
            <div>
              <select value={change} name="device" className="bg-gray-900 text-white" onChange={handleChange} >
              <option className="bg-gray-900 " value="android" >
                     android
                </option>
                <option className="bg-gray-900 " value="Windows" >
                     window
                </option>
                <option className="bg-gray-900 " value="Mac" >
                   mac
                </option>
              </select>
            </div>
            <div>
            {
              change === "Windows" ?(

                       <Image
                         src="/windows.svg"
                         width={25}
                         height={25}
                         alt="image"        
                          />

              ): change === "Mac" ?(
                <Image
                src="/apple.svg"
                width={25}
                height={25}
                alt="image"
               />
              ):change === "android"?(
                <Image
                         src="/android.png"
                         width={25}
                         height={25}
                         alt="image"        
                          /> 
              ):(
                <Image
                src="/android.png"
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
