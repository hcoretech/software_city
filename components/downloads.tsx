'use client'
import { Input } from "./ui/input"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image"
import Link from "next/link";
import { FormEvent } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/navigation";




export default function GetDownload () {

   const [search,setSearch] = useState<string>("");
   const [error,setError] = useState(null);
   const [loading,setLoading] = useState<Boolean>(false);
   const [data,setData]= useState(null);


   const abortController = new AbortController();
   
   const router = useRouter();
    const handleSubmit = async(event:FormEvent<HTMLFormElement>)=>{
      setData(null)
      setError(null)

      setLoading(true)
    event.preventDefault();

      try{ 

         if(!search){
          setError("input value  and try agtain");
          return ;
         }
          const response = await fetch(`/api/getFile?search=${search}`,{
            method:'GET',
            cache:'force-cache',
            next:{ revalidate: 0},
            signal:abortController.signal
          }
        )
 
        
         const data = await response.json();
            console.log(data)
         if(response.ok){
            setData(data)
          }else{
           setError(data)
         }

         setLoading(false)
  
        }
        catch(error){
          setError(error)
        }
    }

  return(
        <section className="flex-center gap-5 flex-col flex py-5 ">
            <div className="flex-center flex  shadow-md bg-light-300 shadow-gray-300  w-full">
              <h1 className="text-md font-semibold  font-sans">search</h1>
              </div>

             <div className="flex items-center flex-center justify-around">            
                 <div className=" p-[5px] rounded-md">
                    <CiMenuKebab  className=" w-[23px] h-[23px]  text-black"/>
                 </div>
                 <form className="flex gap-3" onSubmit={handleSubmit} >
                   <Input 
                      className="shadow-md w-[250px]"
                      value={search}
                      placeholder="searching...."
                      onChange={(text)=>{setSearch(text.target.value)}}
                      type="text"
                     />
                 
                   {
                      loading ?(
                          <Button onClick={()=>{
                           abortController.abort;
                           setLoading(false);
                            }}>
                             cancel
                           </Button>
                         )
                         :(
                            <Button>
                              {loading ? "Searching ":"search" }
                             </Button>
                           )
                    }


                </form>
               </div>
           
            <div className=""> 
            
             <div className="w-full">
              {
                 data && (
                    <div className="justify-between w-full border-black shadow-lg shadow-blue-200 border-t-[1px] p-2 items-center flex flex-row">
                      <div className="flex flex-col gap-4">
                        <p className="bg-black text-white w-[70px] text-center rounded-sm"> {data?.response?.type} </p>                 
                         <span className="flex flex-row">
                        <Image
                          src={data?.response?.imageLink}
                          width={30}
                          height={30}
                          alt="image"
                         /> 
                          <p className=" rounded-full w-[70px] font-sans font-semibold  text-[15px] text-center"> {data?.response?.title}</p>  
                          </span>            
                        <p className=" text-[13px] w-[250px] font-sans"> {data?.response?.description}<span className="text-[15px] ">...</span></p>
                     </div>

                     <div className="flex flex-col items-center gap-4  justify-between">
                      <div className="flex flex-row items-center">
                        <Image
                          src="/apple.svg"
                          width={25}
                          height={25}
                          alt="image"
                         />
                         <Image
                         src="/windows.svg"
                         width={25}
                         height={25}
                         alt="image"        
                          />
                      </div>
                      <div>
                         <Button onClick={()=>{
                             const link = document.createElement("a");
                             link.href = data?.response?.downloadUrl;
                              link.click();
                            }}>
                             download
                           </Button>
                           </div>
                   
                  
                   <div>
                     <Link className="text-blue-600 pointer underline " href='/'> Install guide</Link>
                   </div>
                 </div>
               </div>
              )
             }
             
           </div>    
        </div>
     
          { error &&(
            <p>
              {error?.message}
            </p>
           )
         }
        
        </section>
    )
}