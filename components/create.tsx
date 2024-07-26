'use client'
import { Form } from "./ui/form";
import CustomFileInput from "./customfileInput";
import {useRef, useState} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import Image from "next/image";
import { Blob } from "buffer";
// import { Blob } from "buffer";


export const Create = ({type}:{type:string}) => {

    const[loading,setLoading] = useState(false);
    const [title,setTitle] =useState("");
    const [file,setFile] =useState(null);
    const [img,setImg]=useState(null);

    const fileInput =useRef<HTMLInputElement>(null)
const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
        // formData.append('title',title[0])
        // formData.append('file',file[0]);
    //  console.log(titles)
    // let formData = new FormData();
    //  const string = formData.get('file').toString();
    //  console.log(string);
    // new Blob(file,{
    //     type:file.type
    // })
    // var url = URL.createObjectURL(blob)
    // console.log(url)
    let formData =new FormData();
     formData.append("title",title);
     formData.append('file',file);
    // const form =  formData.get('file');
    // setFile(form)
    // console.log(form);
    // console.log(url)

      try{
        if(type==='create'){

        
        // const up =  await files(form);
    //     const userData ={
    //         title:formData.get('title'),
    //         form
    //   }
        
         const upload = await fetch('/api/postRoute',
         {
          method:'POST',
          body:formData,
          
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
        if(type==='download'){
            const res = await fetch('/api/getImage',{
                method:'POST',
                body:formData,
                // headers:{
                //     "Content-Type":'application/form-data'
                // }
    
            })
            const data =await res.json();
             setImg(data)
            // setImg(data.response.image)
            // setImg(fil.response.image)
            console.log(img)
           
        }
      }catch(error){
        throw error
      }
   
}

    return (
        <section className="pt-10">
                <form  encType="multipart/form-data" >
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
                        <input 
                        name="title"
                        type='text' 
                         onChange={(e)=>setTitle(e.target.value)}
                         value={title}         
                        placeholder="enter title"
                        />
                    )
                }
                   <Button type='submit' onClick={handleSubmit}>
                        {type==='create' ?'upload' :'get'}
                   </Button>
               </form>
               <div>

             {
             
                img !== null && (                                          
              <Image src={`/${img}`} width={300} height={300} alt="image" />        
                )
            }
        </div>    
        </section>
    )
}