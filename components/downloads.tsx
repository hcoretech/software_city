'use client'
import { Input } from "./ui/input"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image"
import Link from "next/link";
import { CiMenuBurger } from "react-icons/ci";
import { FormEvent } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { downloadFile } from "../lib/clientAction";
import { useRouter } from "next/navigation";
// const fs = require ("node:fs/promises")


export default function GetDownload () {
   const [search,setSearch] = useState("");
   const [image,setImage] = useState(null);
   const [error,setError] = useState(null);
   const [loading,setLoading] = useState(false);
   const [data,setData]= useState(null);
   const [download,setDownload]= useState(false)
   
   const router =useRouter();
    const handleSubmit = async(event:FormEvent<HTMLFormElement>)=>{
      setError(null)

      setLoading(true)
    event.preventDefault();
    const formData = new FormData();
    formData.append('search',search)
      try{
            
        const response = await fetch(`/api/getImage`,{
            method:'POST',
            body:formData,
            // body:formData,
            cache:'force-cache',
            next:{ revalidate: 0},
            // headers:{
            //     "Content-Type":'application/form-data',
            //     "Accept":"image/jpeg,image/png,"
            // }

        })
        // setLoading(data.ok)
        const data = await response.json()
        if(response.ok){
          setData(data)
        }else{
          setError(data)
        }
        // renderImage(data)
        // router.push(`/downloads/1`);
        console.log(data);
       
        setLoading(false)
  
      }catch(error){
       console.log(error)
      }

    }
      const getFile = async() => {
            //  setDownload(true)
            console.log('staring')
            router.prefetch(` ./public${data.response.path}`)
            console.log(data.response.path)
        const downloadData:fileDownload =  {
           fileLink:data.response.path,
           filezie:data.response.FileSize
        }

        const download = await downloadFile(downloadData)
         const response = download;
         console.log(response)
            setDownload(false)
            if(response.status ===300){
              setDownload(false)
              alert('no download path found')
            }
           if(response.status ==="pending"){
               setDownload(false)
           }
           else if(response.status ==="downloading"){
                setDownload(true)
                // console.log('file ready')
           }
           else{
               setLoading(false) 
           }
      }
        // const HREF = download ?data.response.path : data.response.path;

    useEffect(()=>{
       getFile()
    },[download])
    return(
        <section className="flex-center gap-5 flex-col flex py-5 ">
             <div className="flex-center flex  shadow-md bg-light-300 shadow-gray-300  w-full">
                {/* <Image  
                    src='/logos3.svg'
                    width={150}
                    height={100}
                    alt="image"
                    
                    /> */}
                    <p className="text-[25px] font-bold ">
                      Search
                    </p>
             </div>
            <div className="flex items-center flex-center  justify-around">
                   <div className=" p-[5px] rounded-md">
                <CiMenuKebab  className=" w-[23px] h-[23px]  text-black"/>
                </div>
            <form className="flex gap-3" onSubmit={handleSubmit} encType="multipart/form-data">
                <Input 
                className="shadow-md w-[250px]"
                value={search}
                placeholder="searching...."
                onChange={(text)=>{setSearch(text.target.value)}}
                 type="text"
                />

                <Button>
                 {loading ? "Searching ":"search" }
                </Button>
            </form>
            </div>
            <div className=""> 
            
             <div className="w-full">
              {
                data && (
              <div className="justify-between w-full border-black shadow-lg shadow-blue-200 border-t-[1px] p-2 items-center flex flex-row">
                <div>
                  <p className="bg-black text-white w-[70px] text-center rounded-md">
                    Utilities
                  </p>
                <p className=" rounded-full w-[70px] font-sans font-semibold  text-[15px] text-center"> {data?.response?.name}</p>
                    <Image
                    src={data?.response?.ImageLink}
                    width={60}
                    height={60}
                    alt="image"
                    
                    />
                
                <p className=" text-[13px] w-[250px] font-sans"> {data?.response?.Description}<span className="text-[15px] ">...</span></p>
               </div>
               <div className="flex flex-col items-center gap-7  justify-between">
                <div className="flex  items-center">
               <Image
                    src="/apple.svg"
                    width={30}
                    height={30}
                    alt="image"
                    
                    />
               <Image
                    src="/windows.svg"
                    width={30}
                    height={30}
                    alt="image"
                    
                    />
                    </div>
               
                    
                     <Button onClick={()=>{
                    
                     }}  className="bg-blue-500 rounded-md text-white p-2 text-" >  
                                                      
                        <Link href={data?.response?.path} prefetch={true}>
                          succes
                       </Link>
                     

                   
                      
                     
                      </Button>
                  
              <div>
                <Link className="text-blue-600 pointer underline " href='/'> Install guide</Link>
                </div>
             </div>
           </div>
   
                )
             }
             
            </div>
        
        </div>
        {
          error &&(
            <p>
              {error?.message}
            </p>
          )
        }
        </section>
    )
}