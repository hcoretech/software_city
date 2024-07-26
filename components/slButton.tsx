import { useState } from "react";
import { Button } from "./ui/button";
import { useFormStatus } from "react-dom";

export const LsButton = ({type}:{type:string})=>{
    const[pending,setPending]=useState(false);
    
    const pendState = ()=>{
      setPending(true);
    }

 return(

 <Button 
 type="submit"
 onClick={pendState}
 disabled={pending}>
    {type==="sign-up"
    ?(pending ? "Loading":"signup")
    :(pending ? "Loading":"signin")
    }

 </Button>

 )
}