'use client'

import {useRef, useState} from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { FormEvent } from "react";
// import { CommonUploadOptions } from "@vercel/blob/client";
import { upload } from "@vercel/blob/client";


import { LuLoader2 } from "react-icons/lu";
export const runtime = 'edge'
// import { streamLine } from "../app/api/serverStream/route";

export default function Create ()  {
    const router = useRouter();

    const[loading,setLoading] = useState<boolean>(false);
    const [title,setTitle] = useState<string>("");
    const [type,setType] = useState<string>("");
    const [file,setFile] = useState <File | null>(null);
    const [imageLink,setImageLink] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [error,setError]= useState(null);
    const [progress,setProgress] = useState<number>(0);


   const abortController = new AbortController();
    
   const fileSend = async()=>{
      try {
         

       
            if(file === null){
            throw ( "no file selected");
        
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
              onUploadProgress:(e)=>{
                 setProgress(e.percentage);
              },
              clientPayload:JSON.stringify(fileSet),

              }
           )
        

        return uploadFile
     }catch (error) {
          setError(error)
     }

    }

   const fileInput = useRef<HTMLInputElement>(null);
   const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);

      try{
          const filepath = fileSend();
             console.log(filepath)                  
             setLoading(false)   
        }  
      catch(error){
        setError(error);
      }
   
 }


    return (
        <section className=" py-14">
             <form onSubmit={handleSubmit} encType="multipart/form-data" className="gap-5 flex flex-col px-4 " >
             <div>
               <h1 className="text-[30px] text-center font-sans   font-bold">
                  Upload software  
               </h1>
             </div>
                <div className="flex flex-col ">  
                    <div className=" justify-between flex flex-row shadow-sm ">
                     <label className="">
                       <h1 className="font-bold text-[14px] font-inter"> SELECT FILE LOCATION </h1>
                       <input  className=""
                          name="file"
                          type='file'
                          ref={fileInput}
                          onChange={(event)=> setFile(event.currentTarget.files[0])} 
                          placeholder="select file"
                        />   
                        </label>
                        {/* <span> OR </span> */}

                       <label className="">
                         <h1 className="font-bold text-[14px] font-inter"> FILE URL </h1>
                         <input  className=" border border-[#29C665] "
                          name="fileurl"
                          type='text'
                          onChange={(event)=> setFile(event.currentTarget.files[0])} 
                          placeholder="enter file url"
                         />   
                      </label>
                         
                    </div>

                    <div className="flex flex-col gap-4 py-4 ">
                     <div>
                     <label className="flex flex-row justify-between">
                       <h1 className="font-bold"> Select a type:</h1>
                     <select className="w-[200px] border-2 border-[#29C665]"   onChange={(e)=>{
                        setType(e.target.value)
                     }}>
                        <option value=''>
                             
                         </option>
                     <option value='office'>
                             Office
                         </option>
                         <option value='utlities'>
                             Utilities
                         </option>
                     </select>

                     </label>
                     </div>

                     <div className="flex flex-col  gap-6">
                     <label className="flex flex-col">
                     <p className="font-bold font-sans">App Title</p>
                       <input 
                        className= " py-2 border-[#29C665]   border rounded-[5px] "
                        name="title"
                        type='text' 
                        onChange={(e)=>setTitle(e.target.value)}
                        value={title}         
                        placeholder="type in a title"
                       />
                       </label>
                       <label className="flex flex-col">
                       <p className="font-bold font-sans">App icon</p>
                       <input 
                       className="py-2 border-[#29C665]  border rounded-[5px]"
                        name="imageLink"
                        type='text' 
                        onChange={(e)=>setImageLink(e.target.value)}
                        value={imageLink}         
                        placeholder="enter software icon for upload  "
                       />
                       </label>
                       <label className="flex flex-col">
                        <p className="font-bold font-sans">About App</p>
                       <textarea
                        className="py-2 border-[#29C665]  border rounded-[5px]"
                        name="description"
                        lang="eng"
                        onChange={(e)=>setDescription(e.target.value)}
                        value={description}
                        placeholder="write about file"
                       />
                       </label>
                       </div>
                    </div>
                   
                  </div>
                  <div className="flex flex-row  gap-3">
                     <div>
                     <input type="checkbox" />
                     </div>
                     <div>
                        <p className=" wrap text-[14px]"> Agree to terms and condition that you will not push
                           a software for the purpose of affecting the community but rather help the community.
                        </p>
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
                 Upload progress: <progress color="" value={progress} max={100} />
             </div> 

          </form>

       </section>
    )
}

