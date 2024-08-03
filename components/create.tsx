'use client'

import {useRef, useState,useEffect} from "react";
import { Button } from "./ui/button";
import { Suspense } from "react";
import Image from "next/image";
import { FormEvent } from 'react'
 
import { useRouter } from 'next/navigation'
import renderImage from "../app/(root)/downloads/[id]/page";



export const dynamic = 'auto'
export const runtime = 'edge'



export const Create = ({type}:{type:string}) => {
    const router = useRouter();
    const[loading,setLoading] = useState(false);
    const [title,setTitle] =useState("");
    const [file,setFile] =useState(null);
    const[search,setSearch]= useState('')
    const [image,setImage]=useState(null);


    const fileInput =useRef<HTMLInputElement>(null)
const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true)
      try{
        if(type==='create'){

            let formData =new FormData();
            formData.append("title",title);
            formData.append('file',file);
            formData.append('search',search);
     
         const upload = await fetch('/api/postRoute',
              {
          method:'POST',
          body:formData,
          next:{revalidate:0}
        //   headers:{
        //     Content-Type:'application/form-data'
        // }
         }
        )

         const response = await upload.json();
         console.log(response)
    //    setImg(response.insert.image)
            // "blob:http://localhost:3000/2f11c027-5de3-4d7f-a714-2e0d4847d54a"
        }
        if(type === "downloads")
            {
 
              

            const res = await fetch(`/api/getImage?name=${search}`,{
            

                // body:formData,
                cache:'force-cache',
                next:{ revalidate: 0},
                headers:{
                    // "Content-Type":'application/form-data',
                    "Accept":"image/jpeg,image/png,"
                }
    
            })
            // setLoading(data.ok)
            const data = await res.json()
            // renderImage(data)
            // router.push(`/downloads/1`);
            console.log(data);
            setImage(data)

            // console.log(img)
            // if(data.status = 200){
            // setImg(stream);
            // console.log(data)
            // }
        }
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
                 {type ==="create" ?(
                   <div>                  
                     <input 
                      name="title"
                      type='text' 
                      onChange={(e)=>setTitle(e.target.value)}
                      value={title}         
                      placeholder="enter title"
                      />
                      <input 
                       name="file"
                       type='file'
                       ref={fileInput}
                       onChange={(e)=>setFile(e.target.files[0])} 
  
                       />
                    </div>
                    ):(
                     <div>
                        <input 
                        name="search"
                        type='text' 
                         onChange={(e)=>setSearch(e.target.value)}
                         value={search}         
                        placeholder="enter title"
                        />
                      <div>
                       {
                        image  ?
                        <div>                                          
                        <div>
                      <Image
                       src={image.response.path}
                       width={100}
                       height={100}
                       alt="image"
                       className="w-[100px] h-[100px]"
                       />
                       <p>{image.response.name}</p>
                       </div>
                       
                       </div>:
                       <div>
                        loading
                        </div>
                      }
                       </div>
                    </div> 
                    )
                    
                }
                   <Button type='submit'>
                        {type==='create' ?'upload' :'get'}
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