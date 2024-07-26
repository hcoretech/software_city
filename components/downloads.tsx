'use client'
import { Input } from "./ui/input"
import { useState } from "react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function DownloadP(){
    const [search,setSearch]=useState('');
    const[loading,setLoading]=useState(false);
    const[file,setFile]=useState({});
    const [img,setImg]=useState("");

    const handleSubmit = async()=>{
        setLoading(true)

      let formData = new FormData();
      formData.append('search',search);
      try{
        const res = await fetch('/api/getImage',{
            method:'POST',
            body:formData,
            // headers:{
            //     "Content-Type":'application/-www-form-urlencoded'
            // }

        })
        const data = await res.json();
        const fil = data
        setFile(data)
        // setImg((fil.response.image).toString())
        console.log(fil)
        // console.log(data);
        // const img = data.get.image.toString()
        // console.log(data)
        // setFile(img)
        
      }catch(error){
        throw error
      }
    }

    return(
        <section>
            <div>
            <form action={handleSubmit}>
            <Input
            name='search'
            type="text"
            onChange={(e)=>setSearch(e.target.value)}
            value ={search}
            />
            <Button type="submit">
            search
            </Button>
           </form>
           </div>
           {
          

        //    <div>
        //    <Image
        //    src={img}
        //    width={50}
        //    height={50}
        //    alt='image'
        //    />
        //    </div>
          
               }
            </section>
    )
}