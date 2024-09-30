'use client'

import {useRef, useState,useEffect, ChangeEvent} from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
// import {upload} from "@vercel/blob/client"
import { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { put } from "@vercel/blob";
import { LuLoader2 } from "react-icons/lu";
import { LuFileInput } from "react-icons/lu";
export const runtime = 'edge'
// import { streamLine } from "../app/api/serverStream/route";

export default function Create ()  {
    const router = useRouter();
    const[loading,setLoading] = useState<boolean>(false);
    const [title,setTitle] =useState<string>("");
    const [file,setFile] = useState <File | null>(null);
    const [blob,setBlob] = useState<PutBlobResult>(null);
    const [description,setDescription] = useState<string>('');
    const [imageLink,setImageLink] = useState<string>('')
    // const [stream,setStream] =useState(null)
    const abortController = new AbortController();
    
    const fileSend = async()=>{
     const files = file
       if(files === null){
        console.log( "no file found")
        throw new Error('no file found');
     }

     
     const uploadFile = await upload(file.name,file,{
        access:'public',
        contentType:file.type,
        handleUploadUrl:'/api/uploadFile',
        clientPayload:title,
        abortSignal:abortController.signal,
        

        
           
        
        
        // abortSignal:new()=>{
        //     const abort = AbortController;
        //     return abort
        // }

     })

    //  setBlob(uploadFile)
    //  console.log(blob)
     return uploadFile
    //  const insertFile = await fetch(`/api/fileUpload?id=${title}`,{
    //     method:"POST",
    //     body:file,
    //     headers:{
    //         'content-type':file?.type ||'application/octet-stream'
    //     }
    //   })
    //   const url = await insertFile.json() as PutBlobResult ;
    //   return url  

    }


    // const uploadDoc = async ()=>{
    //       const bloburl = await blob
    //       try{
    //         if(!bloburl){
    //             return null
    //         }
    //     const docFile = {
    //         title:title,
    //         blobb :bloburl?.downloadUrl,
    //         description:description,
    //         imageLink:imageLink
    //     }

    //      const stringFy = JSON.stringify(docFile)
    //      const upload = await fetch('/api/createFileIndex',{
    //         method:'POST',
    //         body:stringFy,
    //         next:{revalidate:0},
    //         headers:{
    //            'Content-Type':'application/json'
    //         }
    //    }
    //  )
    //  const newBlob = await upload.json();
    //  console.log(newBlob);
   
    //       }
    //       catch(error){
    //         return error
    //       }

    // }
 
    
    const fileInput = useRef<HTMLInputElement>(null)
const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
      try{
          const filepath = await fileSend();
             console.log(filepath)
            //  setBlob(filepath);
         
            //  const result =  await uploadDoc(); 
            //  console.log(result);
                     
             setLoading(false)
    
    }  
    catch(error){
        console.log( error)
            //    setLoading(false)
      }
   
}
// useEffect(()=>{
//    uploadDoc();
// },[blob])

    return (
        <section className="pt-10">
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
                {/* //    disabled={loading} */}
                      
                        stop
                   </Button>
                  }  
             </div>        
               </form>
                 {/* <div>
                    {
                 
                
                    <Image
                  
                         src={img}
                         width={200}
                        height={200}
                         alt="image"                   
                         />
                  
                     }
                 </div> */}
        </section>
    )
}

// const imageLoader = () => {
//     return `loading`
//   }