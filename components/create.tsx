'use client'

import {useRef, useState} from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { FormEvent } from "react";
// import { FormEvent } from 'react'
// import {upload} from "@vercel/blob/client"
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";


import { LuLoader2 } from "react-icons/lu";
import { LuFileInput } from "react-icons/lu";
export const runtime = 'edge'
// import { streamLine } from "../app/api/serverStream/route";

export default function Create ()  {
    const router = useRouter();

    const[loading,setLoading] = useState<boolean>(false);
    const [title,setTitle] = useState<string>("");
    const [type,setType] = useState<string>('');
    const [file,setFile] = useState <File | null>(null);
    const [imageLink,setImageLink] = useState<string>('');
    const [description,setDescription] = useState<string>('');


    const abortController = new AbortController();
    
    const fileSend = async()=>{

         if(file === null){
          console.log( "no file found")
        return ;
      }
    
     const fileSet = {
      type,
      title,
      imageLink,
      description

     }
     
     const uploadFile = await upload(file.name,file,{
      
        access:'public',
        contentType:file.type,
        handleUploadUrl:'/api/uploadFile',
        clientPayload:JSON.stringify(fileSet),
        
      //   onUploadProgess(event){
      //    console.log(event.loaded,event.total,event.percentage);
      //   }

      
        
        
        
        
        
        
       
        
        
        
        
        
        
        
        
        
        
      //   abortSignal:abortController.signal,
      
        
        
        
       }
      )

      return uploadFile

    }

 const fileInput = useRef<HTMLInputElement>(null);
const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      try{
          const filepath = await fileSend();
             console.log(filepath)                  
             setLoading(false)   
        }  
      catch(error){
        console.log( error);
      }
   
 }


    return (
        <section className=" py-14">
             <form onSubmit={handleSubmit} encType="multipart/form-data" className="gap-5 flex flex-col" >
                <div className="flex flex-col gap-3 ">
                
                    <div className=" p-10 rounded-md   border border-blue-200 shadow-md">
                        
    
                       <input  className=""
                          name="file"
                          type='file'
                          ref={fileInput}
                          onChange={(event)=> setFile(event.currentTarget.files[0])} 
                          placeholder="select file"
                        />   
                         
                    </div>
                    <div className="flex flex-col gap-3">
                     <select value={type} onChange={(e)=>{
                        setType(e.target.value)
                     }}>
                        <option value=''>
                             
                         </option>
                     <option value='office'>
                             offices
                         </option>
                         <option value='utlities'>
                             Utilities
                         </option>
                     </select>
                       <input 
                        className= " p-1 border-gray-700 border-b "
                        name="title"
                        type='text' 
                        onChange={(e)=>setTitle(e.target.value)}
                        value={title}         
                        placeholder="Title"
                       />
                       <input 
                       className="p-1 border-gray-700 border-b "
                        name="imageLink"
                        type='text' 
                        onChange={(e)=>setImageLink(e.target.value)}
                        value={imageLink}         
                        placeholder="Image link "
                       />
                       <textarea
                        className="p-1 border-gray-700 border rounded-md"
                        name="description"
                        lang="eng"
                        onChange={(e)=>setDescription(e.target.value)}
                        value={description}
                        placeholder="write about file"
                       />
                    </div>
                  </div> 
                  <div className="flex flex-row gap-5 justify-space-between ">   
                    <Button type='submit'
                       className="bg-blue-400 hover:bg-blue-200"
                       disabled={loading}>
                        {loading ? <LuLoader2  className="animate-spin text-white w-[25px] h-[25px]"/>:'Upload'}
                    </Button>
                   {
                    loading &&
                   <Button type='submit'
                    className="bg-red-500 hover:bg-red-200"
                   onClick={()=>{
                     abortController.abort;
                     setLoading(false);
                   }}
                   >  
                      stop
                   </Button>
                 }  
            
             </div> 

          </form>

       </section>
    )
}

