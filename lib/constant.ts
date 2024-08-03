import { error } from "console";

const jwtSecret :string |undefined = process.env.my_SECRET 

export function  jwtCheck():string{
    if(!jwtSecret || jwtSecret.length ===0){
       throw error("no jwt secret found in your environment")
    }
    
    return jwtSecret;
   }