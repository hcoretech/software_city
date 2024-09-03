'use client'

import {useRef, useState,useEffect} from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import { PutBlobResult } from "@vercel/blob";
import { uploadPart } from "@vercel/blob";
import { put } from "@vercel/blob";
export const runtime = 'edge'
// import { streamLine } from "../app/api/serverStream/route";

export default function Create ()  {
    const router = useRouter();
    const[loading,setLoading] = useState(false);
    const [title,setTitle] =useState("");
    const [file,setFile] =useState(null);
    const [description,setDescription] = useState('')
    const [imageLink,setImageLink] = useState('')
    const [stream,setStream] =useState(null)

    

    const fileInput =useRef<HTMLInputElement>(null)
const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
      try{

            let formData =new FormData();
            formData.append("title",title);
            formData.append('file',file);
            formData.append('description',description);
            formData.append('imageLink',imageLink);
            
     
        //    const upload = await fetch('/api/createFileIndex',
        //       {
        //        method:'POST',
        //       body:formData,
        //     next:{revalidate:0},
         //   headers:{
         //     'Content-Type':'application/form-data'
         // }
        //  }
        //  )
         const newBlob = await put(file.name,file,{
            access:'public'
         }) 

         const response = newBlob 
        
         console.log(response)

        //  if(upload.status===200){

        //     const d = 
        //     console.log(file)
        //     const result = await streamLine(d)
            // console.log(result)
            // const Uploadstream = await fetch('/api/streamFile',{
            //     method:'POST',
            //     body:formData
            // })
            // const value = await Uploadstream.json()
            // console.log(value)
            // // setStream(value);
            // if(Uploadstream.status === 200){
            //     console.log(value.itemId)
            //     formData.append('itemId',value.itemId);
            //     formData.append('filename',value.filename)
            //   const postItem = await fetch('/api/postRoute',{
            //      method:'POST',
            //      body:formData
            //     })
            //     const result = await postItem.json();
            //     console.log(result)

            // }
         }
        //  if(stream.)  itemId,
        // filename
            // console.log(stream.itemId)

    //    setImg(response.insert.image)
            // "blob:http://localhost:3000/2f11c027-5de3-4d7f-a714-2e0d4847d54a"
       
       catch(error){
        console.log( error)
            //    setLoading(false)
      }
   
}
// useEffect(()=>{
   
// },[img])

    return (
        <section className="pt-10">
             <form onSubmit={handleSubmit} encType="multipart/form-data" >                  
                     <input 
                      name="title"
                      type='text' 
                      onChange={(e)=>setTitle(e.target.value)}
                      value={title}         
                      placeholder="enter title"
                      />
                      <input 
                      name="imageLink"
                      type='text' 
                      onChange={(e)=>setImageLink(e.target.value)}
                      value={imageLink}         
                      placeholder="enter image link"
                      />
                      <textarea
                      name="description"
                      onChange={(e)=>setDescription(e.target.value)}
                      value={description}
                      placeholder="write about"
                      />
                      <input 
                       name="file"
                       type='file'
                       ref={fileInput}
                       onChange={(e)=>setFile(e.target.files[0])} 
  
                       />
                      
                   <Button type='submit'>
                        Upload
                   </Button>
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