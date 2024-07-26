'use client'

import { redirect, useRouter } from "next/navigation"
import { Children, useEffect,useState } from "react";
import { Button } from "../../components/ui/button";
import { logOut } from "../../lib/clientAction";
import { getCurrentUser } from "../../lib/clientAction";
import { getUser } from "../../lib/clientAction";

export default  function Home ({Children} ) {
  const [message,setmessage] =  useState('');
   const [datas,setData] =useState([]);
//  const loggedIn = await getUser();
const getData = async ()=>{
  const user =await getCurrentUser();
  if(user.status ===200){
    setData(JSON.parse(user.data))
    
  }
}
console.log (datas)
 useEffect(()=>{
  getData();
 },[])
  
const handleLogOut = async() => {
   logOut();

}
const deleteUser = async ()=>{

}


    //     
    //  }

    return(
        <section>
        <div>
          {

          // datas.lastName
          }
          
        </div>
        <Button onClick={handleLogOut}>
          logOut
        </Button>
        {/* <Button onclick={deleteUser}>
        delete user
        </Button> */}
        {message}
        </section>
    )
}
