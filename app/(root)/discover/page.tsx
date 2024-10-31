// 'use client'
// import { useEffect, useState } from "react";
import { Discovers } from "../../../components/discover";

import { Metadata } from "next";


 export const metadata :Metadata = {
  title:'discover',
  description:'discover updated softwares'

}


export default function Discover(){

  // const osType = {
  //    Android:"string",
  //    Mac:"string"
  // }
//   const [os,setOs]=useState<string>(null);

// useEffect(()=>{
//   if(os === null){
//     setOs('android')
//   }
// },[])
  

    return(
        <main>
           <Discovers/>
        </main>
    );
}