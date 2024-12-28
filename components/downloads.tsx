'use client'
import { Input } from "./ui/input"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image"
import { FormEvent } from 'react';
import { CiMenuKebab } from "react-icons/ci";
import { useRouter } from "next/navigation";
import { Suspense } from "react";
import { MdStar } from "react-icons/md";
import { MdStarHalf } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { searchLinks } from "../lib/searchLink";
import Link from "next/link";




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
        <section className="items-center gap-5 flex-col flex  py-14 ">
            {/* <div className="flex-center flex  shadow-md bg-light-300 shadow-gray-300  w-full">
              <h1 className="text-md font-semibold  font-sans">search</h1>
              </div> */}

             <div className="flex flex-row items-center pt-4 justify-between">            
                 {/* <div className="  rounded-md">
                    <CiMenuKebab  className=" w-[23px] h-[23px]  text-black"/>
                 </div> */}
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
           
            <div className="flex gap-5 flex-wrap p-5 " > 
               {
                searchLinks.map((data,index)=>{

                  const active = 0 === index;
                  const color = active && (" text-[#29C665] ");
                  const round = active ? ("p-1 text-[#fff] shadow-sm shadow-[#29C665] bg-[#29C665] items-center"):(" items-center rounded-[5px] p-2 border border-[#29c665] ");
                  return(
                      //  <ul className="flex flex-row">
                        <li className={`${round} flex flex-row`} key={index}>
                           <Link href="">
                             {data.title}                          
                           </Link>
                        </li>
                      //  </ul>
                  )
                })
                  
               }
            <div>
                
            </div>
            
             <div className="w-full">
              {
                 data && (
                    <div className="justify-between w-full border-gray border  p-2 items-center flex flex-row">
                      <div className="flex flex-col gap-1 ">
                         {/* <p className="bg-black text-white w-[70px] text-center rounded-sm"> {data?.response?.type} </p>                  */}
                         <span className="flex flex-row items-center">
                         <Suspense fallback={<h1>loading..</h1>}>
                           <Image
                              className="w-[45px] h-[45px]"
                              src={data?.response?.imageLink}
                              width={30}
                              height={30}
                              alt="image"
                           /> 
                          </Suspense>
                          <p className=" rounded-full w-[70px] font-sans   text-[15px] text-center"> {data?.response?.title}</p>  
                          </span>   
                          <p className=" text-[12px] w-[250px] font-sans"><span className="font-sans  text-[14px]">Type:</span> Internet</p>    
                          <p className=" text-[12px] w-[250px] font-sans"><span className="font-sans  text-[14px]">Size:</span> 95mb</p>      
                        <details className=" text-[12px] w-[250px] font-sans"><summary className="font-sans  text-[14px]">Description:</summary> {data?.response?.description}<span className="text-[15px] ">...</span></details>
                     </div>

                     <div className="flex flex-col items-center gap-2  justify-between">
                      <div className="flex flex-row items-center">
                        {/* <Image
                          src="/apple.svg"
                          width={25}
                          height={25}
                          alt="image"
                         /> */}
                         <Image
                         src="/windows.svg"
                         width={25}
                         height={25}
                         alt="image"        
                          />
                      </div>
                      <div>
                         <Button className="border-2 border-[#29C665] bg-transparent text-black hover:text-white " onClick={()=>{
                             const link = document.createElement("a");
                             link.href = data?.response?.downloadUrl;
                              link.click();
                            }}>
                             Get App
                           </Button>
                           </div>
                   <div className=" rounded-sm p-1  w-[70px] text-center ">
                    <p className=" flex text-center items-center gap-1" >
                    {/* <MdStar width={5} height={5} color="yellow" />
                    <MdStar width={5} height={5} color="yellow" />
                    <MdStar width={5} height={5} color="yellow" />
                    <MdStarHalf width={5} height={5} color="yellow" /> */}
                       <span>  <MdVerified width={5} height={5} color="blue" /></span>
                        verified
                    </p>
                     {/* <Link className="text-blue-600 pointer underline " href='/'> Install guide</Link> */}
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