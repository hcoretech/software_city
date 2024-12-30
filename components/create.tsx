'use client'

import {createElement, useRef, useState} from "react";
import { Button } from "./ui/button";
import { useRouter } from 'next/navigation';
import { FormEvent } from "react";
// import { CommonUploadOptions } from "@vercel/blob/client";
import { upload } from "@vercel/blob/client";
import Image from "next/image";

import { LuLoader2 } from "react-icons/lu";
export const runtime = 'edge'
// import { streamLine } from "../app/api/serverStream/route";

export default function Create ()  {
    const router = useRouter();

    const[loading,setLoading] = useState<boolean>(false);
    const [title,setTitle] = useState<string>("");
    const [type,setType] = useState<string>("");
    const [file,setFile] = useState<File|null> (null);
    const [blob,setBlob]= useState<string|null>(null)
    const [imageLink,setImageLink] = useState<string>('');
    const [description,setDescription] = useState<string>('');
    const [error,setError]= useState(null);
    const [progress,setProgress] = useState<number>(0);

   
   const abortController = new AbortController();
   console.log(file)

   const fileSend = async() => {
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

             const data = await uploadFile;
             return data

     }catch (error) {

          setError(error)
     }

    }

   const fileInput = useRef<HTMLInputElement>(null);
   
   const handleSubmit = async(event:FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setLoading(true);
      try{

         const filepath = await fileSend();
           console.log(filepath)  
           return filepath

            
        }  
      catch(error){
        setError(error);
      }
      finally{
         setLoading(false)
      }
   
 }


    return (
        <section className=" py-16 ">
             <form onSubmit={handleSubmit} encType="multipart/form-data" className="  " >
             <div>
               {/* <h1 className="text-[20px] text-center font-sans sm:text-[15px]   font-bold">
                  Upload software  
               </h1> */}
             </div>
             <div className=" flex flex-col ">
                <div  className=" flex justify-around  my-10 border bg-gray-200 py-4">
                  {
                   
                   blob?(
                     <div>
                     <Image className="w-[80px] h-[80px] " width={60} height={60}  src="/file.png" alt="logo"/>
                     <p> {file.name}</p>
                     </div>
                 ):(
                    <Button onClick={
                    ()=>{
                   
                       let input = document.getElementById("inputs");
                       input.click();
                    }
                }  
                className= "hover:text-white  transition delay-300 duration-300 ease-in-out bg-white text-gray-400 p-20 shadow-md font-bold  ">
                 <span className="flex flex-col  items-center">
                 <span className=" text-[30px]">
                   +
                 </span>
                 <span>
                    select from device
                 </span>
                 
                 </span>                     
                </Button>
                 )
                
                   }
                    
                    

                  </div>  
                  {
                     <input  id="inputs"  className=""
                     name="file"
                     type='file'
                     ref={fileInput}
                     onChange={(event)=> 
                        {
                           setFile(event.currentTarget.files[0])
                                                        
                           const url = URL.createObjectURL(event.currentTarget.files[0]);
                              setBlob(url)
                              console.log(blob)
                          
                          
                        }
                        } 
                     placeholder="select file"
                     hidden
                   
                   />
                  }
                    {/* <div className=" justify-between flex flex-row shadow-sm  ">
                     <div>
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
                        </div>
                       <div>
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
                         
                    </div> */}

                    <div className="flex flex-col py-4  ">
                     <div>
                     <label className="flex flex-row justify-around items-center ">
                       <h1 className="font-bold text-[14px]"> SELECT APP TYPE:</h1>
                     <select className=" py-2  border   text-gray-900"    onChange={(e)=>{
                        setType(e.target.value)
                     }}>
                        <option value='browser'>
                             Browser
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

                     <div className="flex flex-col items-center  gap-6">
                     <label className="flex flex-col w-[80%]">
                     <p className="font-bold ">APP TITLE</p>
                       <input 
                        className= " py-2 pl-2 text-sm  placeholder-gray-900 border-gray-900   hover:shadow-sm hover:border-none hover:shadow-gray-900   border rounded-[5px] "
                        name="title"
                        type='text' 
                        onChange={(e)=>setTitle(e.target.value)}
                        value={title}         
                        placeholder="Type in a title"
                        
                       />
                       </label>
                       <label className="flex flex-col w-[80%]">
                       <p className="font-bold ">APP ICON URL</p>
                       <input 
                       className="py-2 pl-2 text-sm placeholder-gray-900 border border-gray-900 hover:shadow-sm hover:border-none hover:shadow-gray-900  rounded-[5px]"
                        name="imageLink"
                        type='text' 
                        onChange={(e)=>setImageLink(e.target.value)}
                        value={imageLink}         
                        placeholder="Enter software icon url for upload  "
                       />
                       </label>
                       <label className="flex flex-col w-[80%] ">
                        <p className="font-bold ">ABOUT APP</p>
                       <textarea
                        className="h-[160px] py-2 pl-2 rounded-[5px] bg-gray-900  text-white flex flex-center   text-sm placeholder-white hover:shadow-sm hover:border-none hover:shadow-gray-900   border-gray-900 "
                        name="description"
                        lang="eng"
                        onChange={(e)=>setDescription(e.target.value)}
                        value={description}
                        placeholder="write about App"
                       />
                       </label>
                       </div>
                    </div>
                   
                  </div>
                  <div className="flex flex-row px-14 gap-2 ">
                    <div>
                     <input type="checkbox" />
                     </div>
                  
                     <div>
                        <p className=" wrap text-[14px] "> Agree to terms and condition that you will not push
                           a software for the purpose of affecting the community but rather help the community.
                        </p>
                     </div>   
                     
                  </div> 
                 
                  <div className="flex flex-row gap-5 mt-5 mb-5 items-center justify-center ">   
                    <Button type='submit'
                       className="bg-gray-900 hover:bg-blue-200"
                       disabled={loading}>
                        {loading ? <LuLoader2  className="animate-spin text-white w-[25px] h-[25px]"/>:'submit'}
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

                 { 
                 loading &&(
               <div className="border-b-4 border-l-4 border-l-[#29c665]  border-t-[#29C665] border-t-4 p-2 w-[40px] h-[40px]  rounded-full">
                  <p className="text-center animate-pulse">
                      {progress}
                  </p>
               </div>
                 )
               }
             </div> 

          </form>

       </section>
    )
}

