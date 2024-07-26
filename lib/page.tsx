'use client'

import { useSearchParams, usePathname } from "next/navigation";
import Link from "next/link";
import { useState,useCallback } from "react"
import { useRouter } from "next/navigation";

export default function Home ( ) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const url ='/2/userHome';

    const createQueryString = useCallback(
        (name: string, value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set(name, value)
     
          return params.toString()
        },
        [searchParams]
      )
// const  router = useRouter();

// const[licence,setLicense] = useState(true);

// const ld = "2";

// if(licence){
   
// }
// redirect(`'/${ld}/userHome'`);
return(
    <section>
        mmain
        <button
        onClick={() => {
          // <pathname>?sort=asc
          router.push(url + '?' + createQueryString('sort', '2'))
        }}
      >
        ASC
      </button>
    </section>
)


}