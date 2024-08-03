// import Image from "next/image"

// export default function renderImage({props}:{props:string}){
//     return(
//         <section>
//             <div>
//               <Image
//               src={props}
//               width={100}
//               height={100}
//               alt="image"
//               />
//             </div>
//         </section>
//     )
// }
'use client'
import Image from "next/image"
import { useEffect, useState } from "react";

export default function renderImage(props) {
    const[img,setImg]=useState('');
   const getImage =async()=>{
    const response =await fetch (`/api/getImage?name=cole.jpg`)
    const data = await response.json();
    setImg(data.streamFile);
   }
  
    useEffect(()=>{
        getImage();
    },[])
    return(
        <section>
            <div>
              <Image
              src={img}
              width={100}
              height={100}
              alt="image"
              />
            </div>
        </section>
    )
}