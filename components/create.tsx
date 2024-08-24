'use client'

import {useRef, useState,useEffect} from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation'
export const dynamic = 'auto'
import { FormEvent } from 'react'

export default function Create ()  {
    const router = useRouter();
    const[loading,setLoading] = useState(false);
    const [title,setTitle] =useState("");
    const [file,setFile] =useState(null);
    const [description,setDescription] = useState('')
    const [imageLink,setImageLink] = useState('')

    

    const fileInput =useRef<HTMLInputElement>(null)
const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    // event.preventDefault();
    setLoading(true)
      try{

            let formData =new FormData();
            formData.append("title",title);
            formData.append('file',file);
            formData.append('description',description);
            formData.append('imageLink',imageLink);
            
     
         const upload = await fetch('/api/postRoute',
              {
          method:'POST',
          body:formData,
          next:{revalidate:0},
        //   headers:{
        //     'Content-Type':'application/form-data'
        // }
         }
        )

         const response = await upload.json();
         console.log(response)
    //    setImg(response.insert.image)
            // "blob:http://localhost:3000/2f11c027-5de3-4d7f-a714-2e0d4847d54a"
       
      }catch(error){
        throw error
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