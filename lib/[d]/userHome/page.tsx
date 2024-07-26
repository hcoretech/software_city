'use client'
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";

export const dynamic = 'force-dynamic';

export default  function UserHome(){

    const[id,setId]= useState (null);
    // const params =useParams
    // const searchParams = useSearchParams()
 
    
    const search =  useSearchParams();
    
    const query = async () => {
        const data =  search.get('sort');
        const set = setId(data);
         console.log(set)
        return set
    }

    useEffect(() => {
        // const search = router.query.id
        // if(search){
        //   setId(search);
        // }
       query(); 
        
    },[])

 

    return(
        <div>
            userHome
            <div>
                {id}
                {/* {router.query.id} */}
            </div>
        </div>
    )
}